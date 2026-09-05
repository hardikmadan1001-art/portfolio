/**
 * Headless capture + verification script (puppeteer-core + installed Chrome).
 *
 *   node scripts/shoot.mjs harvest   -> screenshots of aura-audio & axiom-guitars into public/media
 *   node scripts/shoot.mjs self      -> serves the built site, scrolls through every act,
 *                                       collects console errors, writes shots into screenshots/
 */
import { spawn } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HOME = process.env.HOME || process.env.USERPROFILE || "";
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const AURA_DIR = path.join(HOME, "aura-audio");
const AXIOM_DIR = path.join(HOME, "axiom-guitars");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitFor(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await sleep(500);
  }
  throw new Error(`server ${url} never came up`);
}

async function boot(dir, port) {
  const child = spawn("npx", ["next", "start", "-p", String(port)], {
    cwd: dir,
    stdio: "ignore",
    detached: false,
  });
  await waitFor(`http://localhost:${port}`);
  return child;
}

async function openBrowser() {
  return puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: [
      "--hide-scrollbars",
      "--mute-audio",
      "--enable-unsafe-swiftshader",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--force-color-profile=srgb",
      "--font-render-hinting=none",
    ],
  });
}

/** Wheel-scroll through a page capturing viewport shots at fractions of total height. */
async function captureSeries(page, outDir, prefix, fractions = [0, 0.15, 0.3, 0.5, 0.7, 0.9]) {
  await mkdir(outDir, { recursive: true });
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  const onErr = (e) => errors.push(String(e));
  page.on("pageerror", onErr);

  const dims = await page.evaluate(() => ({
    h: document.documentElement.scrollHeight,
    v: window.innerHeight,
  }));
  const max = Math.max(1, dims.h - dims.v);

  await page.mouse.move(720, 450);
  const progress = () =>
    page.evaluate(() => window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));

  for (let i = 0; i < fractions.length; i++) {
    const target = fractions[i];
    let p = await progress();
    let guard = 0;
    while (p < target && guard < 600) {
      await page.mouse.wheel({ deltaY: 1500 });
      await sleep(110);
      p = await progress();
      guard++;
    }
    if (target > 0 && p > target) {
      // overshoot — nudge back up a touch
      await page.mouse.wheel({ deltaY: -900 });
      await sleep(350);
    }
    await sleep(800); // let entrance animations settle
    const file = path.join(outDir, `${prefix}-${i + 1}.jpg`);
    await page.screenshot({ path: file, type: "jpeg", quality: 82 });
    console.log(`  shot ${prefix}-${i + 1}.jpg @ ${Math.round(p * 100)}%`);
  }

  const html = await page.evaluate(() => document.body.innerText.slice(0, 4000));
  page.off("pageerror", onErr);
  return { errors, html };
}

async function harvest() {
  console.log("booting aura-audio (next start :3101)…");
  const aura = await boot(AURA_DIR, 3101);
  console.log("booting axiom-guitars (next start :3102)…");
  const axiom = await boot(AXIOM_DIR, 3102);

  const browser = await openBrowser();
  try {
    for (const [name, url, prefix] of [
      ["aura-audio", "http://localhost:3101", "aura"],
      ["axiom-guitars", "http://localhost:3102", "axiom"],
    ]) {
      console.log(`capturing ${name}…`);
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
      await sleep(5000); // let loaders/fonts settle
      const { errors } = await captureSeries(
        page,
        path.join(ROOT, "public", "media"),
        prefix,
      );
      console.log(`  ${name} console errors: ${errors.length ? errors.join(" | ") : "none"}`);
      await page.close();
    }
  } finally {
    await browser.close();
    aura.kill();
    axiom.kill();
  }
  console.log("harvest done → nimbus/public/media/");
}

async function selfVerify() {
  const dist = path.join(ROOT, "dist");
  try {
    await stat(dist);
  } catch {
    throw new Error("no dist/ — run `npm run build` first");
  }
  const child = spawn(
    "npx",
    ["vite", "preview", "--port", "4173", "--strictPort"],
    { cwd: ROOT, stdio: "ignore" },
  );
  try {
    await waitFor("http://localhost:4173");
    const browser = await openBrowser();
    const page = await browser.newPage();
    const problems = [];
    page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error") problems.push(`console.error: ${m.text()}`);
    });
    page.on("response", (r) => {
      if (r.status() >= 400) problems.push(`HTTP ${r.status()} ${r.url()}`);
    });

    await page.goto("http://localhost:4173", { waitUntil: "networkidle2", timeout: 60000 });
    await sleep(2500);

    const { html } = await captureSeries(
      page,
      path.join(ROOT, "screenshots"),
      "nimbus",
      [0, 0.12, 0.28, 0.42, 0.55, 0.68, 0.8, 0.92],
    );

    const expected = [
      "Not done",
      "Yet",
      "Welcome to the things",
      "Aura",
      "Axiom",
      "Voltage",
      "Motion",
      "The archive",
      "manifesto",
      "That's the point",
      "Back to the top",
    ];
    const missing = expected.filter((t) => !html.toLowerCase().includes(t.toLowerCase()));

    // keep scrolling to the very bottom so stuck animations surface
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(1800);
    const bottomErr = await page.evaluate(() => document.body.innerText.includes("NIMBUS") ? "" : "footer text missing");
    await page.screenshot({
      path: path.join(ROOT, "screenshots", "nimbus-final.jpg"),
      type: "jpeg",
      quality: 85,
    });

    console.log("console/page errors:", problems.length ? problems.join("\n  ") : "none");
    console.log("missing expected copy:", missing.length ? missing.join(", ") : "none");
    console.log("bottom check:", bottomErr || "ok");
    await browser.close();
  } finally {
    child.kill();
  }
}

const mode = process.argv[2] ?? "self";
if (mode === "harvest") {
  await harvest();
} else if (mode === "self") {
  await selfVerify();
} else {
  console.error("usage: node scripts/shoot.mjs [harvest|self]");
  process.exit(1);
}
