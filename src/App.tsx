import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/* ================================================================
   LOGO SVG — Hardik™ wordmark (pear-style)
   ================================================================ */
const LOGO_SVG = (
  <svg
    width={64}
    height={64}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-lg"
  >
    <path
      d="M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z"
      fill="white"
    />
  </svg>
)

/* ================================================================
   SECTION 01 — VIDEO HERO
   ================================================================ */
function VideoHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: containerRef })
  const cloudYDesktop = useTransform(scrollY, [0, 300], [0, -100])
  const cloudYMobile = useTransform(scrollY, [0, 300], [0, -24])

  return (
    <section ref={containerRef} className="relative h-screen w-full flex-shrink-0 overflow-hidden">
      {/* Background video — fullscreen cinematic */}
      <video
        className="absolute inset-0 z-10 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://res.cloudinary.com/daklr2whx/video/upload/v1778592404/baby-track-video_e968wn.mp4"
      />

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 60%, #000 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(255,255,255,0.03) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Film grain */}
      <div className="grain"/>

      {/* Cloud parallax — separates reality from the personal world below */}
      <motion.div
        className="absolute top-0 left-0 w-full h-auto z-[100] pointer-events-none -translate-y-1/2 hidden md:block"
        style={{ y: cloudYDesktop }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block opacity-60"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-full h-auto z-[100] pointer-events-none -translate-y-1/2 block md:hidden"
        style={{ y: cloudYMobile }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block opacity-40"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* ── TOP LEFT: Logo + tagline ── */}
      <div className="absolute top-[24px] left-[20px] md:top-[64px] md:left-[64px] pointer-events-auto max-w-[calc(100vw-140px)] md:max-w-none">
        <div className="flex items-center gap-[16px] md:gap-[24px]">
          {/* SVG logo — white, 48px mobile / 64px desktop */}
          <div className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] flex-shrink-0">
            {LOGO_SVG}
          </div>
          {/* Hardik™ wordmark */}
          <div className="text-white text-[11px] md:text-[16px] w-[112px] md:w-auto leading-[1.2] font-semibold tracking-[0.02em]">
            <span className="block md:hidden">Hardik™</span>
            <span className="hidden md:block">Hardik™</span>
          </div>
        </div>
        {/* Roles — desktop */}
        <div className="hidden md:flex mt-[8px] flex-wrap gap-x-[24px] gap-y-[4px] text-white text-[11px] tracking-[0.25em] uppercase opacity-60">
          <span className="text-[12px]">Photography</span>
          <span className="text-[12px]">Football</span>
          <span className="text-[12px]">Guitar</span>
          <span className="text-[12px]">Creative Dev</span>
        </div>
        {/* Roles — mobile */}
        <div className="md:hidden flex flex-wrap gap-x-[12px] gap-y-[2px] text-white text-[9px] tracking-[0.2em] uppercase opacity-50 mt-[6px]">
          <span>Photography</span>
          <span>Football</span>
          <span>Guitar</span>
          <span>Creative Dev</span>
        </div>
      </div>

      {/* ── TOP RIGHT: Continue button ── */}
      <div className="absolute top-[24px] right-[20px] md:top-[64px] md:right-[64px]">
        <button className="px-5 py-3 md:px-10 md:py-7 border border-white rounded-[100%] text-white text-[12px] md:text-[18px] font-italiana uppercase tracking-widest hover:bg-white/10 hover:backdrop-blur-[48px] transition-all duration-300 cursor-pointer bg-black/10 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
          Continue
        </button>
      </div>

      {/* ── LEFT SIDE DESCRIPTION (desktop only) ── */}
      <div className="hidden md:flex mt-[400px] flex-col gap-[24px] w-full max-w-[320px] text-white text-[14px] font-normal leading-relaxed">
        <p>Most people wait until they&apos;re ready.</p>
        <p>I build while learning.</p>
        <p>Every project teaches something.</p>
        <p>Every experiment becomes experience.</p>
        <p>Every version becomes better than the last.</p>
        <p>I&apos;m not trying to reach a finish line.</p>
        <p>I&apos;m trying to keep moving forward.</p>
      </div>

      {/* ── MAIN HERO HEADLINE ── */}
      <div className="absolute bottom-[32px] left-[20px] right-[20px] md:left-auto md:bottom-[64px] md:right-[64px] md:max-w-[1200px] text-left">
        {/* Mobile paragraphs */}
        <div className="md:hidden flex flex-col gap-[16px] max-w-[280px] text-white text-[12px] font-normal mb-[32px]">
          <p>Still Learning.</p>
          <p>Still Building.</p>
          <p>Still Becoming.</p>
        </div>

        {/* Massive editorial headline — Italiana */}
        <h1 className="text-white text-[36px] leading-[1.1] md:text-[96px] font-italiana md:leading-[88px] tracking-[-0.02em]">
          <span className="block md:hidden">NOT DONE YET.</span>
          <span className="hidden md:block whitespace-nowrap">NOT DONE YET.</span>
        </h1>

        {/* Desktop sub-lines */}
        <div className="hidden md:flex flex-col gap-[12px] mt-[8px] text-white/60 text-[16px] md:text-[22px] font-light tracking-wide">
          <p>Still Learning.</p>
          <p>Still Building.</p>
          <p>Still Becoming.</p>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-[16px] right-[20px] md:bottom-[24px] md:right-[24px] flex flex-col items-end gap-[6px]">
        <span className="text-white/30 text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          className="w-[1px] h-[24px] bg-white/30"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </section>
  )
}

/* ================================================================
   SECTION 02 — RED BACKGROUND MANIFESTO
   ================================================================ */
function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: containerRef })
  const cloudYDesktop = useTransform(scrollY, [0, 300], [0, -100])
  const cloudYMobile = useTransform(scrollY, [0, 300], [0, -24])

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-[#FF0000] flex flex-col z-10">
      {/* Cloud overlays — parallax depth */}
      <motion.div
        className="absolute top-0 left-0 w-full z-[100] pointer-events-none -translate-y-1/2 hidden md:block"
        style={{ y: cloudYDesktop }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-full z-[100] pointer-events-none -translate-y-1/2 block md:hidden"
        style={{ y: cloudYMobile }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block opacity-70"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col items-center w-full pt-[100px] md:pt-[400px]">
        {/* Inner content block — centered, editorial */}
        <div className="flex flex-col items-center w-full px-8 text-center z-20 relative max-w-[900px] h-auto md:h-[620px] mx-auto">
          {/* Logo — 80x80, white */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mb-[40px]"
          >
            <div className="w-[80px] h-[80px]">
              <svg
                width={80}
                height={80}
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z"
                  fill="white"
                />
              </svg>
            </div>
          </motion.div>

          {/* ── SIGNATURE — actual signature.png, huge, centered, white ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="relative mb-[40px] animate-float"
          >
            <img
              src="/signature.png"
              alt="Hardik Madan signature"
              className="mx-auto block w-[200px] md:w-[260px] drop-shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* ── MANIFESTO ── */}
          <p className="text-white text-[16px] h-[100px] max-w-[400px] leading-[1.6] mb-[40px] uppercase tracking-wider mx-auto font-light">
            Photography taught me to notice.
            <br/>
            Football taught me discipline.
            <br/>
            Guitar taught me patience.
            <br/>
            Building taught me everything else.
          </p>

          {/* Two centered paragraphs */}
          <p className="text-white text-[16px] w-[400px] max-w-full font-light leading-[1.7] mb-[24px] opacity-80">
            Photography influences how I see.
            <br/>
            Music influences how I feel.
            <br/>
            Football influences how I think.
            <br/>
            Building is where everything comes together.
          </p>
          <p className="text-white/50 text-[16px] w-[400px] max-w-full font-light leading-[1.7]">
            Still learning.
            <br/>
            Still building.
            <br/>
            Still becoming.
          </p>

          {/* ── SELECTED WORK ── */}
          <div className="flex flex-col gap-[48px] mt-[56px] w-full max-w-[700px]">
            {/* Aura Audio */}
            <div className="flex items-start gap-[20px]">
              <div className="w-[120px] md:w-[320px] flex-shrink-0 overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                <img
                  src="/aura-screenshot.png"
                  alt="Aura Audio"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pt-[8px]">
                <span className="text-white/50 text-[10px] md:text-[12px] tracking-[0.3em] uppercase font-light">
                  Selected Work
                </span>
                <h3 className="text-white text-[16px] md:text-[28px] font-italiana mt-[4px] leading-tight tracking-tight">
                  Aura Audio
                </h3>
                <p className="text-white/60 text-[12px] md:text-[14px] leading-[1.6] font-light mt-[6px] max-w-[280px] md:max-w-[420px]">
                  A cinematic luxury audio experience built around storytelling, motion design and immersive presentation.
                </p>
                <a
                  href="https://aura-audio-chi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-[10px] text-white/50 text-[11px] md:text-[12px] tracking-[0.2em] uppercase border border-white/10 rounded-full px-4 py-1.5 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  aura-audio-chi.vercel.app
                  <span className="ml-[6px]">→</span>
                </a>
              </div>
            </div>

            {/* Voltage */}
            <div className="flex items-start gap-[20px]">
              <div className="w-[120px] md:w-[320px] flex-shrink-0 overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                <img
                  src="/voltage-screenshot.png"
                  alt="Voltage"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pt-[8px]">
                <span className="text-white/50 text-[10px] md:text-[12px] tracking-[0.3em] uppercase font-light">
                  Selected Work
                </span>
                <h3 className="text-white text-[16px] md:text-[28px] font-italiana mt-[4px] leading-tight tracking-tight">
                  Voltage
                </h3>
                <p className="text-white/60 text-[12px] md:text-[14px] leading-[1.6] font-light mt-[6px] max-w-[280px] md:max-w-[420px]">
                  An experimental digital experience exploring futuristic visuals, bold typography and interaction-heavy design.
                </p>
                <a
                  href="https://voltage-tau.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-[10px] text-white/50 text-[11px] md:text-[12px] tracking-[0.2em] uppercase border border-white/10 rounded-full px-4 py-1.5 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  voltage-tau.vercel.app
                  <span className="ml-[6px]">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FINAL VIDEO REVEAL ── */}
      <div className="relative w-full shrink-0">
        {/* Red-to-transparent fade on top */}
        <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-[#FF0000] to-transparent z-10 pointer-events-none"/>
        <video
          className="w-full h-auto block object-contain"
          autoPlay
          loop
          muted
          playsInline
          src="https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4"
        />
      </div>
    </section>
  )
}

/* ================================================================
   APP — root
   ================================================================ */
export default function App() {
  return (
    <main className="h-screen overflow-y-auto overflow-x-hidden font-manrope bg-black relative">
      <VideoHeroSection />
      <ManifestoSection />
    </main>
  )
}
