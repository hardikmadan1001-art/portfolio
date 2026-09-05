import { useRef } from "react";
import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ActChip from "../components/ActChip";

type Row = {
  words: string[];
  dur: number;
  reverse: boolean;
  ghost?: boolean;
  size: string;
  y: number;
};

const ROWS: Row[] = [
  {
    words: ["Motion", "Typography", "AI", "Design"],
    dur: 40,
    reverse: false,
    size: "text-[clamp(3.2rem,10vw,9.5rem)]",
    y: 0,
  },
  {
    words: ["Photography", "Guitar", "Football", "Storytelling"],
    dur: 55,
    reverse: true,
    ghost: true,
    size: "text-[clamp(3rem,9.5vw,9rem)]",
    y: -30,
  },
  {
    words: ["Creative Development", "Curiosity", "Aura", "Axiom", "Voltage"],
    dur: 70,
    reverse: false,
    size: "text-[clamp(3.4rem,11vw,10.5rem)]",
    y: 30,
  },
];

function MarqueeRow({ row }: { row: Row }) {
  const doubled = [...row.words, ...row.words];
  return (
    <div className="overflow-hidden py-2">
      <div
        className={`inline-flex w-max items-center ${
          row.reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
        style={{ "--marquee-duration": `${row.dur}s` } as CSSProperties}
      >
        {doubled.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center">
            <span
              className={`px-5 font-anton uppercase leading-[0.9] tracking-[0.01em] ${
                row.ghost ? "text-stroke-thin text-transparent" : "text-white"
              } ${row.size}`}
            >
              {w}
            </span>
            <span className="font-marck px-3 text-[clamp(1.6rem,4vw,3rem)] text-cobalt-glow">
              &amp;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Obsessions() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wrapY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-[20vh]"
    >
      <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <ActChip no="04" title="Obsessions" />
        <p className="mt-6 max-w-md text-sm leading-relaxed text-mist">
          A museum wall of the things running on loop.
        </p>
      </div>

      <motion.div style={{ y: wrapY }}>
        {ROWS.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: row.y }}
            className={i === 0 ? "" : "mt-6 md:mt-10"}
          >
            <MarqueeRow row={row} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
