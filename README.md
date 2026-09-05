# NIMBUS — NOT DONE YET.

A cinematic, scroll-driven portfolio for Hardik Madan. Not a grid of cards —
a journey through the things that keep me up at night.

Built with **React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion (Framer Motion)**.

## Acts

| Act | Scene |
| --- | --- |
| 1 | Video/sky-film hero — massive Anton **NOT DONE YET.** |
| — | Cloud transition into pear-cobalt (#0870A8), signature reveal, rift into black |
| 2 | Enter the world — four floating memories (Camera · Guitar · Football · Development) |
| 3 | The project universe — Aura Audio, Axiom, Voltage (destinations, not cards) |
| 4 | Obsessions — infinite marquee word wall |
| 5 | The archive — polaroids, notes & code (like an opened hard drive) |
| 6 | The manifesto |
| 7 | Final boss — *"THIS ISN'T THE FINAL VERSION. THAT'S THE POINT."* + signature |

## Run it

```bash
npm install
npm run dev        # local dev
npm run build      # typecheck + production build
npm run preview    # serve the build
```

## Real footage (optional)

Drop `hero.mp4` and/or `door.mp4` into `public/video/` — the site auto-detects
them and swaps the procedural visuals for the real film. When a file is absent
it silently falls back to the procedural sky film / rift. See
`public/video/README.txt`.

## Project screenshots

`public/media/*.jpg` are live captures of the Aura Audio and Axiom sites,
regenerated with:

```bash
npm run harvest    # needs the aura-audio + axiom-guitars repos present locally
```

Requires a local Chrome install (used headless via puppeteer-core).

No external CDN dependencies — every visual renders locally.
