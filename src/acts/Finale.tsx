import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import Particles from "../components/Particles";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Finale() {
  const outerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // camera pull-back over the pinned range
  const scale = useTransform(scrollYProgress, [0.02, 0.3], [1.45, 1]);
  const blurPx = useTransform(scrollYProgress, [0.02, 0.28], [10, 0]);
  const blur = useTransform(blurPx, (px) => `blur(${px.toFixed(2)}px)`);
  const frameOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);

  // statement 1 → statement 2 → signature → cta
  const s1Opacity = useTransform(scrollYProgress, [0.14, 0.26, 0.5, 0.6], [0, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0.14, 0.26, 0.5, 0.6], [40, 0, 0, -40]);
  const s2Opacity = useTransform(scrollYProgress, [0.56, 0.68, 0.8, 0.9], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.56, 0.68, 0.8, 0.9], [40, 0, 0, -40]);
  const sigOpacity = useTransform(scrollYProgress, [0.72, 0.84], [0, 1]);
  const sigY = useTransform(scrollYProgress, [0.72, 0.84], [50, 0]);

  const backToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section ref={outerRef} className="relative h-[360svh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Particles count={70} color="63,169,232" speed={0.5} size={1.1} />

        <motion.div
          style={{
            scale,
            filter: blur,
            opacity: frameOpacity,
          }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          {/* statement 1 */}
          <motion.div
            style={{ opacity: s1Opacity, y: s1Y }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="font-anton uppercase leading-[0.9] tracking-[0.01em] text-white">
              <span className="block text-[clamp(2.4rem,8vw,8rem)]">
                This isn't the
              </span>
              <span className="block text-[clamp(2.4rem,8vw,8rem)]">
                final version<span className="text-cobalt-glow">.</span>
              </span>
            </h2>
          </motion.div>

          {/* statement 2 */}
          <motion.div
            style={{ opacity: s2Opacity, y: s2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="font-anton uppercase leading-[0.9] tracking-[0.01em] text-cobalt-glow">
              <span className="block text-[clamp(2.6rem,9vw,9rem)]">
                That's the point
              </span>
            </h2>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="mt-6 h-px w-32 bg-white/40"
            />
          </motion.div>

          {/* signature + CTA */}
          <motion.div
            style={{ opacity: sigOpacity, y: sigY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <p className="font-marck text-[clamp(4rem,12vw,10rem)] leading-none text-white">
              Hardik
            </p>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.42em] text-mist">
              built in the dark · 2026
            </p>
            <button
              onClick={backToTop}
              className="mt-12 flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md transition-all duration-300 hover:border-cobalt-glow/70 hover:bg-cobalt/20"
            >
              Back to the top
              <ArrowUp className="h-4 w-4" />
            </button>
          </motion.div>

          {/* faint watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-anton text-[clamp(5rem,22vw,20rem)] uppercase leading-none text-white/[0.025]"
          >
            NIMBUS
          </div>
        </motion.div>
      </div>

      {/* tail footer after the pin releases */}
      <div className="relative z-10 flex min-h-[60svh] flex-col items-center justify-end gap-10 px-6 pb-12 text-center">
        <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
          <span className="font-anton text-2xl uppercase tracking-[0.12em] text-white">
            Nimbus
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/35">
            © 2026 — not done yet. that's the point.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cobalt-glow">
            v0.1.0
          </span>
        </div>
      </div>
    </section>
  );
}
