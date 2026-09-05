import { motion } from "motion/react";
import ActChip from "../components/ActChip";
import { AURA_SHOTS, AXIOM_SHOTS } from "../lib/assets";

type Item =
  | { kind: "img"; src: string; rot: string; aspect: string; align: string }
  | { kind: "note"; rot: string }
  | { kind: "snippet"; rot: string };

const PHOTOS: Item[] = [
  ...AURA_SHOTS.map((src, i) => ({
    kind: "img" as const,
    src,
    rot: ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"][i % 4],
    aspect: ["aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[4/3]"][i % 4],
    align: i % 2 ? "object-center" : "object-top",
  })),
  ...AXIOM_SHOTS.map((src, i) => ({
    kind: "img" as const,
    src,
    rot: ["rotate-2", "-rotate-1", "rotate-1", "-rotate-2"][i % 4],
    aspect: ["aspect-[3/4]", "aspect-[4/3]", "aspect-[4/3]", "aspect-square"][i % 4],
    align: i % 2 ? "object-center" : "object-top",
  })),
  { kind: "note" as const, rot: "rotate-1" },
  { kind: "snippet" as const, rot: "-rotate-1" },
  { kind: "note" as const, rot: "rotate-2" },
  { kind: "snippet" as const, rot: "rotate-1" },
  { kind: "note" as const, rot: "-rotate-2" },
];

const NOTES = [
  { big: "v1 never ships.", small: "the first one always hurts" },
  { big: "01:00 am builds", small: "best ideas, worst sleep" },
  { big: "what if everything shipped on time?", small: "asking for a friend" },
];

function Card({ item, i }: { item: Item; i: number }) {
  if (item.kind === "img") {
    return (
      <motion.figure
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-4% 0px" }}
        transition={{ duration: 0.8, delay: (i % 4) * 0.07 }}
        className={`mb-5 inline-block w-full break-inside-avoid bg-[#ece5d5] p-2.5 pb-12 shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition-all duration-500 hover:z-20 hover:rotate-0 hover:scale-[1.04] ${item.rot}`}
      >
        <div className={`overflow-hidden ${item.aspect}`}>
          <img
            src={item.src}
            alt="archive capture"
            loading="lazy"
            className={`h-full w-full object-cover ${item.align}`}
          />
        </div>
      </motion.figure>
    );
  }

  if (item.kind === "note") {
    const note = NOTES[(i * 2) % NOTES.length];
    const cobalt = i % 3 === 1;
    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-4% 0px" }}
        transition={{ duration: 0.8, delay: (i % 4) * 0.07 }}
        className={`mb-5 inline-block w-full break-inside-avoid p-6 shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition-all duration-500 hover:rotate-0 hover:scale-[1.03] ${
          cobalt
            ? "bg-cobalt text-white"
            : "bg-[#ece5d5] text-[#242019]"
        } ${item.rot}`}
      >
        <p className="font-marck text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight">
          {note.big}
        </p>
        <p
          className={`mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] ${
            cobalt ? "text-white/70" : "text-[#242019]/55"
          }`}
        >
          {note.small}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ duration: 0.8, delay: (i % 4) * 0.07 }}
      className={`mb-5 inline-block w-full break-inside-avoid rounded-lg border border-white/10 bg-ink-2 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition-all duration-500 hover:rotate-0 hover:border-cobalt-glow/40 hover:scale-[1.02] ${item.rot}`}
    >
      <p className="font-mono text-[11px] leading-6 text-white/80">
        <span className="text-cobalt-glow">const</span>{" "}
        <span className="text-white">future</span> ={" "}
        <span className="text-white/60">async</span> () =&gt; {"{"}
        <br />
        {"  "}await <span className="text-white">learn</span>()
        <span className="text-white/60">()</span>;
        <br />
        {"  "}
        <span className="text-white/60">while</span> (
        <span className="text-white">!perfect</span>) {"{"}
        <br />
        {"    "}iterate<span className="text-white/60">()</span>;
        <br />
        {"  "}
        {"}"}
        <br />
        {"  "}
        <span className="text-white/60">return</span>{" "}
        <span className="text-white">ship</span>
        <span className="text-white/60">()</span>;
        <br />
        {"}"}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
        <span>idea_ship.ts</span>
        <span>✓ no errors… yet</span>
      </div>
    </motion.div>
  );
}

export default function Archive() {
  return (
    <section id="archive" className="relative bg-ink py-[18vh]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ActChip no="05" title="The archive" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mist">
              Screenshots, notes, sketches, code. Like someone opened the hard
              drive. Nothing is curated. Everything is evidence.
            </p>
          </div>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 md:block">
            {AURA_SHOTS.length + AXIOM_SHOTS.length + 7} items / uncurated
          </p>
        </div>

        <div className="mt-16 columns-2 gap-5 md:columns-3 lg:columns-4">
          {PHOTOS.map((item, i) => (
            <Card key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
