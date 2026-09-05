import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ActChip from "../components/ActChip";
import { AURA_SHOTS, AXIOM_SHOTS } from "../lib/assets";

type Project = {
  index: string;
  name: string;
  word: string;
  line: string;
  copy: string;
  chips: string[];
  media: string;
  accent: string;
  dot: string;
  flip?: boolean;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Aura Audio",
    word: "Hear everything.",
    line: "AURA ONE — an interactive engineering film for the future of wireless audio.",
    copy: "Graphene drivers, 48-hour playback, 3nm silicon. Shot as a WebGL film with acts, wipes and a chapter scrubber — a product page that plays like a movie.",
    chips: ["NEXT.JS", "THREE.JS", "WEBGL", "MOTION"],
    media: AURA_SHOTS[0],
    accent: "text-cobalt-glow",
    dot: "bg-cobalt-glow",
  },
  {
    index: "02",
    name: "Axiom",
    word: "Make it matter.",
    line: "AXIOM — guitars refined until nothing remains but the music itself.",
    copy: "The instrument disappears. What remains is intention, translated with absolute precision — a live WebGL instrument you can drag, hover and calibrate.",
    chips: ["NEXT.JS", "THREE.JS", "GSAP", "WEBGL"],
    media: AXIOM_SHOTS[0],
    accent: "text-amber",
    dot: "bg-amber",
    flip: true,
  },
  {
    index: "03",
    name: "Voltage",
    word: "Every version gets better.",
    line: "NEXT UP — the one that isn't built yet.",
    copy: "An energy cube with no shape yet. Every failure becomes experience, every version gets better. This slot is reserved for whatever keeps me up next.",
    chips: ["???", "TBA", "UNKNOWN"],
    media: "",
    accent: "text-cobalt-glow",
    dot: "bg-cobalt-glow",
  },
];

function Cube() {
  return (
    <div className="flex h-full w-full items-center justify-center [perspective:900px]">
      <motion.div
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-[150px] w-[150px] md:h-[190px] md:w-[190px]"
      >
        {[
          "rotateY(0deg)",
          "rotateY(90deg)",
          "rotateY(180deg)",
          "rotateY(-90deg)",
          "rotateX(90deg)",
          "rotateX(-90deg)",
        ].map((rot, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-cobalt-glow/50 bg-cobalt/10 [backface-visibility:hidden]"
            style={{ transform: `${rot} translateZ(75px)`, }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Destination({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const stageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -6]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const mediaScale = useTransform(scrollYProgress, [0.1, 0.55], [1.12, 1]);

  return (
    <div ref={ref} className="relative py-[14vh] md:py-[18vh]">
      <div
        className={`pointer-events-none absolute inset-0 ${
          p.flip ? "md:left-1/2" : "md:right-1/2"
        } hidden opacity-40 md:block`}
        style={{
          background: `radial-gradient(ellipse 55% 65% at ${
            p.flip ? "30% 50%" : "70% 50%"
          }, ${p.dot === "bg-amber" ? "rgba(255,138,28,0.16)" : "rgba(8,112,168,0.2)"}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
        {/* text */}
        <motion.div
          style={{ y: textY }}
          className={`${p.flip ? "md:order-2" : ""}`}
        >
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.4em] uppercase">
            <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
            <span className="text-mist">Project {p.index}</span>
            <span className="h-px w-8 bg-white/15" />
            <span className="text-mist">2025–2026</span>
          </div>

          <h3 className="mt-8 font-anton text-[clamp(3rem,8vw,7.5rem)] uppercase leading-[0.88] tracking-[0.01em] text-white">
            {p.name}
          </h3>

          <p className={`mt-4 font-marck text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight ${p.accent}`}>
            {p.word}
          </p>

          <p className="mt-8 max-w-md text-sm leading-relaxed text-mist">
            {p.copy}
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {p.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 px-4 py-1.5 text-[9px] font-semibold tracking-[0.25em] text-white/55 uppercase"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* media stage */}
        <motion.div
          style={{ y: mediaY, rotateX: stageRotate, transformPerspective: 1400 }}
          className={`relative ${p.flip ? "md:order-1" : ""}`}
        >
          {p.media ? (
            <motion.div
              style={{ scale: mediaScale }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink-2"
            >
              <img
                src={p.media}
                alt={`${p.name} — screen capture`}
                className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/80">
                <span className={`h-1 w-1 rounded-full ${p.dot} animate-pulse-dot`} />
                live build
              </div>
            </motion.div>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-cobalt-glow/20 bg-ink-2">
              <Cube />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,rgba(6,6,7,0.55))]" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative bg-ink">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-10">
        <ActChip no="03" title="The project universe" />
        <p className="mt-6 max-w-2xl text-mist">
          Not cards on a grid. Destinations — each one a place you walk into.
        </p>
      </div>
      {PROJECTS.map((p) => (
        <Destination key={p.name} p={p} />
      ))}
    </section>
  );
}
