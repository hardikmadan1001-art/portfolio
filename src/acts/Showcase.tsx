import { MousePointer2 } from "lucide-react";
import WordReveal from "../components/WordReveal";
import SpotlightReveal from "../components/SpotlightReveal";
import PillCta from "../components/PillCta";
import Particles from "../components/Particles";
import { STUDIO_BASE, STUDIO_REVEAL } from "../lib/assets";

/**
 * Studio showcase — a quiet beat after the cobalt rift. Word-by-word reveal,
 * a portrait that follows your cursor with a spotlight, and a pill CTA into
 * the world.
 */
export default function Showcase() {
  const enterWorld = () =>
    document.getElementById("world")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="studio" className="relative overflow-hidden bg-ink py-[16vh] md:py-[20vh]">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <Particles count={35} color="63,169,232" speed={0.4} size={1} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <p className="mb-10 flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.42em] text-mist uppercase">
          <MousePointer2 className="h-4 w-4 text-cobalt-glow" />
          Move your cursor
        </p>

        <WordReveal
          text="I build compelling visual stories & motion that make ideas shine."
          className="mx-auto max-w-3xl text-balance text-[clamp(1.5rem,3.6vw,2.8rem)] font-light leading-[1.25] tracking-[-0.01em] text-white"
        />

        <div className="mt-12 w-full md:mt-16">
          <SpotlightReveal
            base={STUDIO_BASE}
            reveal={STUDIO_REVEAL}
            alt="Studio showcase"
            className="mx-auto aspect-[16/9] w-full max-w-[860px] rounded-2xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="mt-14">
          <PillCta label="Enter the world" onClick={enterWorld} />
        </div>
      </div>
    </section>
  );
}
