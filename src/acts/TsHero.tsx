import { useEffect, useRef } from "react";
import WordReveal from "../components/WordReveal";
import SpotlightReveal from "../components/SpotlightReveal";
import PillCta from "../components/PillCta";
import TsMenu from "../components/TsMenu";

interface PillCtaWithDelayProps {
  label: string;
  delay?: number;
}

const PillCtaWithDelay = PillCta as unknown as React.FC<PillCtaWithDelayProps>;

const BASE_URL =
  "https://soft-zoom-63098134.figma.site/_assets/v11";

/** The pasted page used two separate Figma exports for the base and reveal layers.
 *  Swap these for your own assets when you have them.
 */
const HERO_BASE = `${BASE_URL}/5c9f982199fde1d9b85a20e5396f0fa7bacaf9a3.png?w=2560`;
const HERO_REVEAL = `${BASE_URL}/6be2165e31648955b4e071f4cf2a50bc572b9bfd.png?w=1536`;

const LOGO_URL = "https://framerusercontent.com/images/VMcS7YYTM5PXfXvlHc9u3hSCMM.svg";

export default function TsHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;    const onIntersect: IntersectionObserverCallback = (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  el.classList.add("ts-hero-image-animate");
                }
              }
            };
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ts-hero relative w-full overflow-hidden bg-[var(--color-ts-bg)]">
      {/* Existing splash is rendered by App.tsx; this keeps the pasted page rhythm
          available if you ever want a standalone TS page. */}

      <div className="logo-wrapper fixed top-[30px] left-0 z-10 w-[50%] flex items-center md:top-[40px]">
        <div className="inner px-[20px] md:px-[40px]">
          <a href="/" aria-label="Home" className="block">
            <img src={LOGO_URL} alt="" className="h-[32px] w-[32px]" />
          </a>
        </div>
      </div>

      <TsMenu />

      <main ref={heroRef} className="hero relative w-full min-h-screen overflow-hidden bg-ts-bg">
        {/* Big text behind image */}
        <div className="hero-big-text z-2 absolute bottom-[-30px] left-0 right-0 w-full text-center pointer-events-none md:bottom-[-40px]">
          <h2
            className="creator-text-animate ts-creator-text-animate text-ts-cream font-manrope font-medium leading-[80%] tracking-[-0.04em] whitespace-nowrap"
            style={{
              fontSize: "clamp(180px,28vw,560px)",
              animationDelay: "1.5s",
              animation: "tsCreatorSlideUp 1s cubic-bezier(0.16,1,0.3,1) forwards",
              transform: "translateY(330px)",
            }}
          >
            Visuals
          </h2>
        </div>

        {/* Base image */}
        <div
          className="hero-base-img hero-image-animate ts-hero-image-animate absolute top-[30vh] left-0 right-0 bottom-0 select-none bg-cover bg-center z-5 md:top-0 md:bg-center"
          style={{
            backgroundImage: `url(${HERO_BASE})`,
            opacity: 0,
            transform: "scale(1.5) rotate(3deg)",
            animation: "tsHeroImageIn 1.2s cubic-bezier(0.25,0.46,0.45,0.94) forwards 1s",
          }}
        />

        <SpotlightReveal
          base={HERO_BASE}
          reveal={HERO_REVEAL}
          alt="Studio showcase"
          className="hero-reveal-img z-[7] absolute top-[30vh] left-0 right-0 bottom-0 pointer-events-none select-none bg-cover bg-center md:top-0 md:bg-center"
          radius={260}
        />

        {/* Content */}
        <div className="hero-content relative z-8 w-full max-w-[1600px] mx-auto flex flex-col justify-start items-start px-6 py-[110px] pb-24 pointer-events-none md:inset-0 md:justify-between md:px-[40px] md:py-[160px] md:pb-[100px]">
          <div className="hero-content-inner flex flex-col items-start gap-[30px] w-full pointer-events-auto">
            <WordReveal
              text="I build compelling visual stories & motion that make ideas shine."
              className="hero-headline max-w-[447px] text-[var(--color-ts-ink)] font-manrope font-medium leading-[120%] tracking-[-0.02em] text-[clamp(22px,4vw,28px)]"
              delay={1}
              stagger={0.05}
            />

            <PillCtaWithDelay label="Start a project now" delay={1} />
          </div>
        </div>
      </main>
    </div>
  );
}
