import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Particles from "../components/Particles";
import useFile from "../hooks/useFile";
import { DOOR_MP4 } from "../lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;
const ATMOSPHERE = ["SCROLL", "CLOUDS", "MUSIC", "ATMOSPHERE"];

/** Soft cloud bank built entirely from blurred white ellipses (offline-safe). */
function CloudShelf() {
  const blobs = [
    { l: "-10%", w: "30%", t: "6%", h: "120%", o: 0.95 },
    { l: "16%", w: "24%", t: "-2%", h: "140%", o: 0.9 },
    { l: "36%", w: "34%", t: "10%", h: "110%", o: 0.85 },
    { l: "62%", w: "26%", t: "0%", h: "150%", o: 0.92 },
    { l: "82%", w: "30%", t: "8%", h: "115%", o: 0.88 },
  ];
  return (
    <div className="relative h-[16vh] w-full overflow-hidden" aria-hidden>
      <motion.div
        animate={{ x: [0, 26, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {blobs.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[radial-gradient(circle_at_50%_60%,rgba(244,250,255,0.98),rgba(226,238,248,0.9)_55%,rgba(226,238,248,0)_72%)]"
            style={{
              left: b.l,
              top: b.t,
              width: b.w,
              height: b.h,
              opacity: b.o,
            }}
          />
        ))}
      </motion.div>
      {/* soften the seam between cloud base and cobalt */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-cobalt/0 to-cobalt" />
    </div>
  );
}

/**
 * The cloud transition. Pear-cobalt (#0870A8) beat between the hero and the
 * black world: you scroll up through the cloud layer, the signature reveals,
 * then a rift swallows the frame and drops you into the dark.
 */
export default function CobaltAct() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const hasDoor = useFile(DOOR_MP4);

  const cloudYDesktop = useTransform(scrollYProgress, [0.02, 0.3], [110, -60]);
  const cloudYMobile = useTransform(scrollYProgress, [0.02, 0.3], [70, -20]);
  const riftScale = useTransform(scrollYProgress, [0.52, 0.9], [0.001, 1]);
  const riftOpacity = useTransform(scrollYProgress, [0.46, 0.56], [0, 1]);

  return (
    <section ref={ref} id="cobalt" className="relative z-10 bg-cobalt text-white">
      {/* ---- clouds rolling over the seam into the hero ---- */}
      <motion.div
        style={{ y: cloudYDesktop }}
        className="pointer-events-none absolute -top-[7vh] left-0 z-30 hidden w-full md:block"
      >
        <CloudShelf />
      </motion.div>
      <motion.div
        style={{ y: cloudYMobile }}
        className="pointer-events-none absolute -top-[7vh] left-0 z-30 w-full md:hidden"
      >
        <CloudShelf />
      </motion.div>

      {/* ---- soft particles drifting over the cobalt sky ---- */}
      <div className="pointer-events-none absolute inset-0 z-[5] opacity-60">
        <Particles count={50} color="190,226,246" speed={0.8} size={1.3} />
      </div>

      {/* ---- atmosphere: signature reveal ---- */}
      <div className="relative z-10 flex min-h-[92svh] flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 46, rotate: -5, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="font-marck text-[clamp(3.4rem,9vw,7.5rem)] leading-none text-white"
        >
          Hardik
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="mt-10 flex items-center gap-3 text-[9px] font-semibold tracking-[0.42em] text-white/70 uppercase md:text-[11px]"
        >
          {ATMOSPHERE.map((word, i) => (
            <span key={word} className="flex items-center gap-3">
              {i > 0 && (
                <span className="h-1 w-1 rounded-full bg-cobalt-glow" aria-hidden />
              )}
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ---- the doorway into black ---- */}
      {hasDoor ? (
        /* real footage — door.mp4 plays full-bleed, bleeding to black */
        <div className="relative z-20 h-[78svh] w-full overflow-hidden">
          <video
            src={DOOR_MP4}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 z-0 h-full w-full bg-black object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[46vh] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>
      ) : (
        /* procedural fallback — a black rift swallows the frame */
        <div className="relative z-20 h-[78svh] w-full">
          <div className="absolute left-1/2 top-1/2 h-[130vmax] w-[130vmax] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              style={{ scale: riftScale, opacity: riftOpacity }}
              className="h-full w-full border border-cobalt-glow/20 bg-[#04050a] shadow-[0_0_140px_rgba(0,0,0,0.9)]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,transparent_30%,rgba(8,112,168,0.22)_100%)]" />
        </div>
      )}
    </section>
  );
}
