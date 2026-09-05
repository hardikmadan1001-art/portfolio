import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import SkyFilm from "../components/SkyFilm";
import useFile from "../hooks/useFile";
import { HERO_MP4 } from "../lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const hasHeroFilm = useFile(HERO_MP4);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Cinematic exit: the frame slowly pushes in while the title lifts away.
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] overflow-hidden bg-black"
    >
      {/* the film — real footage if dropped in public/video/, else the procedural sky */}
      <motion.div
        style={{ scale: frameScale, opacity: frameOpacity }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {hasHeroFilm ? (
          <video
            src={HERO_MP4}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full bg-black object-cover"
          />
        ) : (
          <SkyFilm />
        )}
      </motion.div>

      {/* atmosphere gradients */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_110%,rgba(6,6,7,0.92)_0%,transparent_58%)]" />
      </div>

      {/* the only text */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <h1 className="flex flex-col items-center text-center font-anton uppercase leading-[0.86] tracking-[0.01em] text-white">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
              className="block text-[clamp(3.2rem,13.5vw,14rem)] drop-shadow-[0_6px_50px_rgba(0,0,0,0.65)]"
            >
              Not done
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.42 }}
              className="block text-[clamp(3.2rem,13.5vw,14rem)] drop-shadow-[0_6px_50px_rgba(0,0,0,0.65)]"
            >
              Yet<span className="text-cobalt-glow">.</span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-white/60" />
      </motion.div>
    </section>
  );
}
