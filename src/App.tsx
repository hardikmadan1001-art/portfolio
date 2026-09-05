import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

/* ================================================================
   LOGO SVG — Hardik™ wordmark
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
  const cloudYDesktop = useTransform(scrollY, [0, 280], [0, -90])
  const cloudYMobile = useTransform(scrollY, [0, 280], [0, -24])

  return (
    <section ref={containerRef} className="relative h-screen w-full flex-shrink-0 overflow-hidden">
      {/* Background video — cinematic cinematic loop */}
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
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 60%, #000 100%)',
          }}
        />
        {/* Bottom dark gradient for text readability */}
        <div
          className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }}
        />
        {/* Atmospheric top-left gradient */}
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

      {/* Cloud parallax layer (separate scrolling entity) */}
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
          {/* Logo */}
          <div className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] flex-shrink-0">
            {LOGO_SVG}
          </div>
          {/* Tagline */}
          <div className="text-white text-[11px] md:text-[16px] w-[112px] md:w-auto leading-[1.3] font-semibold tracking-[0.04em]">
            <span className="block md:hidden">Hardik™</span>
            <span className="hidden md:block">Hardik™</span>
          </div>
        </div>
        {/* Roles — desktop */}
        <div className="hidden md:flex mt-[8px] flex-wrap gap-x-[24px] gap-y-[4px] text-white text-[11px] tracking-[0.25em] uppercase opacity-60">
          <span className="text-[10px] md:text-[12px]">Photography</span>
          <span className="text-[10px] md:text-[12px]">Football</span>
          <span className="text-[10px] md:text-[12px]">Guitar</span>
          <span className="text-[10px] md:text-[12px]">Creative Dev</span>
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
        <button className="btn-continue">
          Continue
        </button>
      </div>

      {/* ── LEFT SIDE DESCRIPTION (desktop only) ── */}
      <div className="hidden md:block absolute top-[480px] left-[64px] max-w-[340px] text-white text-[13px] font-light leading-relaxed opacity-70">
        <p>
          Most people wait until they&apos;re ready.
        </p>
        <p>I build while learning.</p>
        <p>Every project teaches something.</p>
        <p>Every experiment becomes experience.</p>
        <p>Every version becomes better than the last.</p>
        <p>I&apos;m not trying to reach a finish line.</p>
        <p>I&apos;m trying to keep moving forward.</p>
      </div>

      {/* ── MAIN HERO HEADLINE ── */}
      <div className="absolute bottom-[32px] left-[20px] right-[20px] md:bottom-[64px] md:left-auto md:right-[64px] md:max-w-[1200px] text-left">
        {/* Mobile paragraphs — small, above headline */}
        <div className="md:hidden flex flex-col gap-[14px] max-w-[300px] text-white/70 text-[11px] font-light mb-[28px]">
          <p>Still Learning.</p>
          <p>Still Building.</p>
          <p>Still Becoming.</p>
        </div>

        {/* The massive headline */}
        <h1 className="text-white text-[32px] md:text-[112px] font-italiana leading-[0.85] md:leading-[0.85] tracking-[-0.03em]">
          <span className="block md:hidden">NOT DONE YET.</span>
          <span className="hidden md:block whitespace-nowrap">
            NOT DONE YET.
          </span>
        </h1>

        {/* Desktop sub-lines — stacked under headline */}
        <div className="hidden md:block flex flex-col gap-[12px] mt-[8px] text-white/60 text-[16px] md:text-[22px] font-light tracking-wide">
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
   SECTION 02 — RED MANIFESTO
   ================================================================ */
function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: containerRef })
  const cloudYDesktop = useTransform(scrollY, [0, 220], [0, -80])
  const cloudYMobile = useTransform(scrollY, [0, 220], [0, -20])

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

      {/* ── CONTENT WRAPPER ── */}
      <div className="flex-1 flex flex-col items-center w-full pt-[120px] md:pt-[480px] px-6">
        {/* Centered content block */}
        <div className="flex flex-col items-center w-full px-6 text-center z-20 relative max-w-[820px] mx-auto">
          {/* Logo — big, white */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mb-[48px]"
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

          {/* ── SIGNATURE — emotional reveal ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="relative mb-[40px]"
            whileInView={{ y: [0, -8, 0] }}
            viewport={{ once: false }}
          >
            {/* Subtle float via CSS animation fallback */}
            <img
              src="/signature.png"
              alt="Hardik Madan signature"
              className="mx-auto block w-[200px] md:w-[260px] drop-shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              style={{
                filter: 'grayscale(20%) blur(0px)',
              }}
            />
          </motion.div>

          {/* ── MANIFESTO TEXT ── */}
          <motion.p
            className="text-white text-[14px] md:text-[17px] leading-[1.7] max-w-[560px] font-light tracking-wide opacity-85"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            Photography taught me to notice.
            <br/>
            Football taught me discipline.
            <br/>
            Guitar taught me patience.
            <br/>
            Building taught me everything else.
          </motion.p>

          {/* ── SECONDARY STATEMENT ── */}
          <motion.p
            className="text-white/60 text-[13px] md:text-[15px] leading-[1.6] max-w-[520px] mt-[32px] font-light tracking-wide uppercase"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 1.2, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Photography influences how I see.
            <br/>
            Music influences how I feel.
            <br/>
            Football influences how I think.
            <br/>
            Building is where everything comes together.
          </motion.p>

          {/* ── SELECTED WORKS — editorial, not portfolio cards ── */}
          <motion.div
            className="flex flex-col gap-[48px] mt-[56px] w-full max-w-[700px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            {/* Aura Audio */}
            <AuraAudioWork />
            {/* Voltage */}
            <VoltageWork />
          </motion.div>

          {/* ── FINAL STATEMENT — massive editorial typography ── */}
          <motion.div
            className="mt-[56px] text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-white text-[20px] md:text-[64px] lg:text-[80px] font-italiana leading-[0.9] tracking-[-0.02em] uppercase">
              This Isn&apos;t the Final Version.
              <br/>
              <span className="text-white/50 text-[16px] md:text-[28px] lg:text-[36px] mt-[4px] md:mt-[8px]">
                That&apos;s the Point.
              </span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* ── FINAL VIDEO REVEAL ── */}
      <div className="relative w-full shrink-0">
        {/* Red-to-transparent fade on top */}
        <div className="red-fade-top"/>

        <video
          className="w-full h-auto block object-contain max-h-[70vh]"
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
   AURA AUDIO — editorial project card
   ================================================================ */
function AuraAudioWork() {
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef, target: imgRef })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.02])

  return (
    <div className="flex flex-col gap-[16px]" ref={containerRef}>
      <div className="flex items-start gap-[20px]">
        {/* Screenshot — parallax depth on scroll */}
        <motion.div
          ref={imgRef}
          className="w-[120px] md:w-[320px] flex-shrink-0 overflow-hidden rounded-sm border border-white/10 shadow-2xl"
          style={{ y, opacity, scale }}
        >
          <img
            src="/aura-screenshot.png"
            alt="Aura Audio — cinematic luxury audio experience"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
        {/* Info */}
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
    </div>
  )
}

/* ================================================================
   VOLTAGE — editorial project card
   ================================================================ */
function VoltageWork() {
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef, target: imgRef })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.02])

  return (
    <div className="flex flex-col gap-[16px]" ref={containerRef}>
      <div className="flex items-start gap-[20px]">
        <motion.div
          ref={imgRef}
          className="w-[120px] md:w-[320px] flex-shrink-0 overflow-hidden rounded-sm border border-white/10 shadow-2xl"
          style={{ y, opacity, scale }}
        >
          <img
            src="/voltage-screenshot.png"
            alt="Voltage — experimental digital experience"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
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
