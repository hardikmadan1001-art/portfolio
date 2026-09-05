import { motion } from "motion/react";
import ActChip from "../components/ActChip";
import Particles from "../components/Particles";

const LINES = [
  "I don't build because I know how.",
  "I build because I want to learn.",
  "Every project teaches something.",
  "Every failure becomes experience.",
  "Every version gets better.",
];

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-ink py-[22vh]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <Particles count={30} color="63,169,232" speed={0.4} size={1} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        <ActChip no="06" title="The manifesto" />

        <div className="mt-20 flex flex-col">
          {LINES.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-18% 0px" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 2) * 0.12,
              }}
              className={`flex items-baseline gap-5 py-3 md:gap-8 md:py-4 ${
                i % 2 === 1 ? "md:ml-[14%]" : "md:mr-[6%]"
              }`}
            >
              <span className="w-8 shrink-0 font-mono text-[10px] tracking-[0.3em] text-white/30">
                0{i + 1}
              </span>
              <p
                className={`font-anton uppercase leading-[1.02] tracking-[0.01em] ${
                  i === LINES.length - 1
                    ? "text-cobalt-glow"
                    : "text-white"
                } text-[clamp(1.7rem,4.6vw,4.2rem)]`}
              >
                {line}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
