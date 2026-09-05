import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Camera, CircleDot, Code2, Guitar } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Particles from "../components/Particles";
import ActChip from "../components/ActChip";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE = [
  { text: "Welcome to the things" },
  { text: "that keep me" },
  { text: "up at night" },
];

type ObjectDef = {
  no: string;
  name: string;
  word: string;
  icon: LucideIcon;
  offset: string;
};

const OBJECTS: ObjectDef[] = [
  { no: "01", name: "Camera", word: "Photography", icon: Camera, offset: "md:translate-y-0" },
  { no: "02", name: "Guitar", word: "Rhythm", icon: Guitar, offset: "md:translate-y-14" },
  { no: "03", name: "Football", word: "Movement", icon: CircleDot, offset: "md:-translate-y-6" },
  { no: "04", name: "Development", word: "Creation", icon: Code2, offset: "md:translate-y-10" },
];

function FloatTile({ def }: { def: ObjectDef }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, on: false });

  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 14);
    rx.set((0.5 - py) * 12);
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setGlare((g) => ({ ...g, on: false }));
  };

  const Icon = def.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 90, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, ease: EASE }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-2/90 p-8 backdrop-blur-sm transition-colors duration-500 will-change-transform md:p-12 ${def.offset}`}
    >
      {/* glare that follows the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(640px circle at ${glare.x.toFixed(1)}% ${glare.y.toFixed(
            1,
          )}%, rgba(63,169,232,0.12), transparent 45%)`,
        }}
      />

      {/* ghost word */}
      <div
        aria-hidden
        className="text-stroke-cobalt pointer-events-none absolute -right-3 bottom-0 font-anton text-[clamp(3rem,8.5vw,8rem)] uppercase leading-none opacity-0 blur-[2px] transition-all duration-700 ease-out group-hover:opacity-100 group-hover:blur-0"
      >
        {def.word}
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-semibold tracking-[0.4em] text-mist uppercase">
            Object {def.no}
          </span>
          <Icon
            className={`h-7 w-7 transition-all duration-500 ${
              glare.on ? "scale-110 text-cobalt-glow" : "text-white/35"
            }`}
            strokeWidth={1.4}
          />
        </div>

        <h3 className="mt-16 font-anton text-[clamp(2.6rem,6.5vw,5.2rem)] uppercase leading-none text-white transition-transform duration-500 group-hover:-translate-y-1 md:mt-24">
          {def.name}
        </h3>

        <div className="mt-8 flex items-center gap-3">
          <span
            className={`h-px flex-1 origin-left transition-all duration-700 ${
              glare.on ? "scale-x-100 bg-cobalt-glow" : "scale-x-50 bg-white/15"
            }`}
          />
          <span className="text-[10px] font-medium tracking-[0.3em] text-white/45 uppercase">
            {glare.on ? def.word : "hover"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function World() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headY = useTransform(scrollYProgress, [0.02, 0.42], [0, -160]);
  const headOpacity = useTransform(scrollYProgress, [0.12, 0.42], [1, 0]);
  const headScale = useTransform(scrollYProgress, [0.02, 0.42], [1, 0.88]);

  return (
    <section ref={sectionRef} id="world" className="relative bg-ink">
      {/* ---- pinned intro ---- */}
      <div className="relative h-[230svh]">
        <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
          <Particles count={80} color="120,170,205" speed={0.6} size={1.2} />

          <motion.div
            style={{ y: headY, opacity: headOpacity, scale: headScale }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <ActChip no="02" title="Enter the world" className="mb-12" />
            <h2 className="font-anton uppercase leading-[0.92] tracking-[0.01em] text-white">
              {HEADLINE.map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1,
                      ease: EASE,
                      delay: 0.2 + i * 0.14,
                    }}
                    className={`block text-[clamp(2rem,7.6vw,7.4rem)] ${
                      i === 2 ? "text-cobalt-glow" : ""
                    }`}
                  >
                    {line.text}
                    {i === 2 && <span className="text-white">.</span>}
                  </motion.span>
                </span>
              ))}
            </h2>
          </motion.div>
        </div>
      </div>

      {/* ---- the four memories ---- */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-10 pb-[24vh] md:px-10 md:pt-24">
        <div className="mb-16 flex items-end justify-between px-1">
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            Not portfolio cards. <span className="text-white">Memories.</span>{" "}
            Each object is a door into a different part of the obsession.
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 md:block">
            26.9°N / drifting
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {OBJECTS.map((obj) => (
            <FloatTile key={obj.no} def={obj} />
          ))}
        </div>
      </div>
    </section>
  );
}
