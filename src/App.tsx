import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, AccumulativeShadows, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ================================================================
   LOGO SVG
   ================================================================ */
const LOGO_PATH = "M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z"

function LogoWordmark({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d={LOGO_PATH} fill="white"/>
    </svg>
  )
}

/* ================================================================
   LOADING SCREEN — cinematic count-up + glitch
   ================================================================ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const duration = 2200
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))

      if (progress > 0.3 && progress < 0.5 && Math.random() > 0.7) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 120)
      }

      if (progress >= 1) {
        clearInterval(interval)
        setTimeout(onComplete, 400)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center gap-[32px] select-none"
      style={{ perspective: '800px' }}
    >
      <LogoWordmark size={48} className="animate-float"/>
      <div className={`text-white font-italiana text-[120px] md:text-[160px] leading-none tracking-[-0.04em] ${glitchActive ? 'animate-glitch' : ''}`}>
        {String(count).padStart(3, '0')}
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <div className="h-[1px] w-[200px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase">Loading experience</span>
      </div>
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0); filter: blur(0); }
          20% { transform: translate(-3px, 2px); filter: blur(2px); }
          40% { transform: translate(3px, -2px); filter: blur(0); }
          60% { transform: translate(-2px, 1px); filter: blur(3px); }
          80% { transform: translate(2px, -1px); filter: blur(0); }
          100% { transform: translate(0); filter: blur(0); }
        }
      `}</style>
    </div>
  )
}

/* ================================================================
   3D BACKGROUND SCENE — Abstract torus knot, mouse-reactive
   ================================================================ */
function Orb({ position }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const scale = useSpring(hovered ? 1.15 : 1)
  const rotZ = useSpring(hovered ? 180 : 0)

  useFrame((state) => {
    if (!meshRef.current) return
    // Gentle idle rotation
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <mesh
      ref={meshRef}
      scale={Number(scale)}
      rotation-z={Number(rotZ)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusKnotGeometry args={[1, 0.3, 128, 16]}/>
      <meshStandardMaterial
        color="#ffffff"
        attach="material"
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}

function BackgroundOrbScene() {
  const three = useThree()
  const camera = three.camera
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame(() => {
    if (!camera) return
    camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.02
    camera.position.y += (-mouse.current.y * 2 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <ambientLight intensity={0.3}/>
      <pointLight position={[10, 10, 10]} intensity={1}/>
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e5ff"/>
      <Orb position={[0, 0, 0]}/>
      <AccumulativeShadows
        temporal
        frames={100}
        opacity={0.4}
        scale={10}
      >
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={4}/>
      </AccumulativeShadows>
    </>
  )
}

/* ================================================================
   ACT 01 — VIDEO HERO (fullscreen + 3D orb behind)
   ================================================================ */
function VideoHeroAct() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: heroRef })
  const cloudY = useTransform(scrollY, [0, 250], [0, -80])
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 20
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 20
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full flex-shrink-0 overflow-hidden">
      {/* 3D orb behind everything */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <BackgroundOrbScene/>
        </Canvas>
      </div>

      {/* Video background */}
      <video
        className="absolute inset-0 z-10 w-full h-full object-cover"
        autoPlay loop muted playsInline
        src="https://res.cloudinary.com/daklr2whx/video/upload/v1778592404/baby-track-video_e968wn.mp4"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 70%, #000 100%)',
        }}/>
        <div className="absolute bottom-0 left-0 w-full h-[45%]" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        }}/>
        <div className="absolute top-0 left-0 w-1/2 h-full" style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0.04) 0%, transparent 100%)',
        }}/>
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.6)',
        }}/>
      </div>

      {/* Grain */}
      <div className="grain"/>

      {/* Cloud parallax */}
      <motion.div
        className="absolute top-0 left-0 w-full h-auto z-[100] pointer-events-none -translate-y-1/2 hidden md:block"
        style={{ y: cloudY }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block opacity-50"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-full h-auto z-[100] pointer-events-none -translate-y-1/2 block md:hidden"
        style={{ y: useTransform(scrollY, [0, 250], [0, -20]) }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block opacity-35"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* TOP LEFT: Logo + tagline */}
      <div className="absolute top-[24px] left-[20px] md:top-[64px] md:left-[64px] pointer-events-auto max-w-[calc(100vw-140px)] md:max-w-none">
        <div className="flex items-center gap-[16px] md:gap-[24px]">
          <div className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] flex-shrink-0 drop-shadow-xl">
            <LogoWordmark size={64}/>
          </div>
          <div className="text-white text-[11px] md:text-[16px] w-[112px] md:w-auto leading-[1.3] font-semibold tracking-[0.04em]">
            Hardik™
          </div>
        </div>
        <div className="hidden md:flex mt-[10px] flex-wrap gap-x-[28px] gap-y-[4px] text-white text-[10px] tracking-[0.25em] uppercase opacity-50">
          <span className="text-[11px]">Photography</span>
          <span className="text-[11px]">Football</span>
          <span className="text-[11px]">Guitar</span>
          <span className="text-[11px]">Creative Dev</span>
        </div>
        <div className="md:hidden flex flex-wrap gap-x-[14px] gap-y-[2px] text-white text-[8px] tracking-[0.2em] uppercase opacity-40 mt-[6px]">
          <span>Photography</span>
          <span>Football</span>
          <span>Guitar</span>
          <span>Creative Dev</span>
        </div>
      </div>

      {/* TOP RIGHT: Continue button */}
      <div className="absolute top-[24px] right-[20px] md:top-[64px] md:right-[64px]">
        <button className="px-5 py-3 md:px-10 md:py-7 border border-white/40 text-white text-[12px] md:text-[18px] font-italiana uppercase tracking-widest rounded-full transition-all duration-500 ease-out cursor-pointer bg-black/20 backdrop-blur-sm hover:bg-white/10 hover:border-white/80 hover:backdrop-blur-[48px] hover:text-white">
          Continue
        </button>
      </div>

      {/* LEFT DESCRIPTION — desktop */}
      <div className="hidden md:block absolute top-[460px] left-[64px] max-w-[340px] text-white text-[13px] font-light leading-relaxed opacity-65">
        <p>Most people wait until they&apos;re ready.</p>
        <p>I build while learning.</p>
        <p>Every project teaches something.</p>
        <p>Every experiment becomes experience.</p>
        <p>Every version becomes better than the last.</p>
        <p>I&apos;m not trying to reach a finish line.</p>
        <p>I&apos;m trying to keep moving forward.</p>
      </div>

      {/* HEADLINE — massive editorial typography */}
      <div className="absolute bottom-[32px] left-[20px] right-[20px] md:bottom-[64px] md:left-auto md:right-[64px] md:max-w-[1200px] text-left">
        <div className="md:hidden flex flex-col gap-[14px] max-w-[300px] text-white/70 text-[11px] font-light mb-[28px]">
          <p>Still Learning.</p>
          <p>Still Building.</p>
          <p>Still Becoming.</p>
        </div>

        <h1 className="text-white text-[32px] md:text-[112px] font-italiana leading-[0.85] tracking-[-0.03em]">
          <span className="block md:hidden">NOT DONE YET.</span>
          <span className="hidden md:block whitespace-nowrap">NOT DONE YET.</span>
        </h1>

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
   ACT 02 — CLOUD TRANSITION CORRIDOR
   Scroll-driven parallax with multiple cloud layers, depth, atmosphere
   ================================================================ */
function CloudCorridorAct() {
  const corrRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: corrRef })
  const cloud1Y = useTransform(scrollY, [0, 600], [0, -160])
  const cloud2Y = useTransform(scrollY, [0, 600], [0, -60])
  const cloud3Y = useTransform(scrollY, [0, 600], [0, -120])
  const opacity = useTransform(scrollY, [0, 300, 600], [1, 0.6, 0])
  const scaleX = useTransform(scrollY, [0, 600], [1, 1.3])

  return (
    <section ref={corrRef} className="relative h-[300vh] w-full overflow-hidden bg-black flex-shrink-0">
      {/* Deep black atmosphere */}
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, #000 60%)',
      }}/>

      {/* Cloud layer 1 — largest, slowest */}
      <motion.div
        className="absolute top-[30%] left-[-10%] w-[120%] h-auto z-[10] pointer-events-none -translate-y-1/2 hidden md:block"
        style={{ y: cloud1Y, opacity, scaleX, scale: '1' }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Cloud layer 2 */}
      <motion.div
        className="absolute top-[50%] left-[20%] w-[80%] h-auto z-[20] pointer-events-none -translate-y-1/2 hidden md:block"
        style={{ y: cloud2Y, opacity: useTransform(scrollY, [0, 300, 600], [0.8, 0.5, 0]) }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block opacity-60"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Cloud layer 3 — small, fast */}
      <motion.div
        className="absolute top-[70%] right-[-10%] w-[60%] h-auto z-[30] pointer-events-none -translate-y-1/2 hidden md:block"
        style={{ y: cloud3Y, opacity: useTransform(scrollY, [0, 300, 600], [0.6, 0.4, 0]) }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Grain */}
      <div className="absolute inset-0 z-[50] grain opacity-[0.12]"/>

      {/* Transition text — appears mid-scroll */}
      <motion.div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        style={{ opacity }}
      >
        <span className="text-white/20 text-[14px] md:text-[20px] font-italiana tracking-[0.15em] uppercase whitespace-nowrap">
          Beyond the clouds
        </span>
      </motion.div>

      {/* Scroll progress indicator */}
      <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-[4px]">
        <motion.div
          className="w-[2px] h-[40px] bg-white/20"
          animate={{ scaleY: [0.2, 1] }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
        />
        <span className="text-white/20 text-[8px] tracking-[0.3em] uppercase">Entering the personal</span>
      </div>
    </section>
  )
}

/* ================================================================
   ACT 03 — RED MANIFESTO with signature reveal
   ================================================================ */
function ManifestoAct() {
  const manRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: manRef })
  const cloudY = useTransform(scrollY, [0, 200], [0, -55])
  const fadeInSection = useTransform(scrollY, [0, 100], [0, 1])

  return (
    <section ref={manRef} className="relative min-h-screen w-full bg-[#FF0000] flex flex-col z-10">
      {/* Cloud parallax */}
      <motion.div
        className="absolute top-0 left-0 w-full z-[100] pointer-events-none -translate-y-1/2 hidden md:block"
        style={{ y: cloudY }}
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
        style={{ y: useTransform(scrollY, [0, 200], [0, -16]) }}
      >
        <img
          src="https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png"
          alt=""
          className="w-full h-auto block opacity-70"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col items-center w-full pt-[120px] md:pt-[440px] px-6">
        <div className="flex flex-col items-center w-full px-6 text-center z-20 relative max-w-[820px] mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mb-[48px]"
          >
            <div className="w-[80px] h-[80px] drop-shadow-2xl">
              <LogoWordmark size={80}/>
            </div>
          </motion.div>

          {/* ── SIGNATURE — emotional reveal ── */}
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

          {/* Manifesto text */}
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

          {/* Secondary statement */}
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

          {/* Projects preview */}
          <motion.div
            className="flex flex-col gap-[48px] mt-[56px] w-full max-w-[700px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            <ProjectCard
              title="Aura Audio"
              desc="A cinematic luxury audio experience built around storytelling, motion design and immersive presentation."
              img="/aura-screenshot.png"
              link="https://aura-audio-chi.vercel.app/"
            />
            <ProjectCard
              title="Voltage"
              desc="An experimental digital experience exploring futuristic visuals, bold typography and interaction-heavy design."
              img="/voltage-screenshot.png"
              link="https://voltage-tau.vercel.app/"
            />
            <ProjectCard
              title="Axiom Guitars"
              desc="A boutique guitar brand identity — editorial design, visual storytelling and digital presence for a craft-focused brand."
              img="/axiom-screenshot.png"
              link="https://axiom-guitars.vercel.app/"
            />
          </motion.div>

          {/* Final statement */}
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

      {/* Final video */}
      <div className="relative w-full shrink-0">
        <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#FF0000] to-transparent pointer-events-none"/>
        <video
          className="w-full h-auto block object-contain max-h-[70vh]"
          autoPlay loop muted playsInline
          src="https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4"
        />
      </div>
    </section>
  )
}

/* ================================================================
   PROJECT CARD — editorial with 3D tilt on hover
   ================================================================ */
function ProjectCard({ title, desc, img, link }: { title: string; desc: string; img: string; link: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 12, y: y * 12 })
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col gap-[14px] p-[12px] rounded-sm border border-white/5 hover:border-white/20 transition-all duration-500 bg-black/20 backdrop-blur-sm hover:bg-black/40"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        transform: `perspective(800px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* 3D depth layer */}
      <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>

      {/* Screenshot — parallax depth */}
      <div className="w-[100px] md:w-[280px] flex-shrink-0 overflow-hidden rounded-sm border border-white/10 shadow-2xl group-hover:shadow-white/5 transition-shadow duration-500">
        <img
          src={img}
          alt={title}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="pt-[4px]">
        <span className="text-white/40 text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light">
          Selected Work
        </span>
        <h3 className="text-white text-[15px] md:text-[26px] font-italiana mt-[2px] leading-tight tracking-tight group-hover:text-white/90 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/50 text-[11px] md:text-[13px] leading-[1.6] font-light mt-[4px] max-w-[260px] md:max-w-[400px]">
          {desc}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-[8px] text-white/40 text-[10px] md:text-[11px] tracking-[0.2em] uppercase border border-white/8 rounded-full px-3 py-1 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 group-hover:translate-x-[4px]"
        >
          {link.split('//')[1]}
          <span className="ml-[4px]">→</span>
        </a>
      </div>
    </div>
  )
}

/* ================================================================
   ACT 04 — FINAL VIDEO REVEAL (standalone cinematic act)
   Full-width video with "NOT DONE YET" message, no red background
   ================================================================ */
function FinalVideoAct() {
  const fvRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ container: fvRef })
  const videoOpacity = useTransform(scrollY, [0, 80, 200], [0, 1, 1])
  const videoScale = useTransform(scrollY, [0, 80], [1.1, 1])
  const titleY = useTransform(scrollY, [0, 150], [40, 0])
  const titleOpacity = useTransform(scrollY, [0, 100], [0, 1])

  return (
    <section ref={fvRef} className="relative h-[250vh] w-full overflow-hidden bg-black flex-shrink-0">
      {/* Video — full width, large scale */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ opacity: videoOpacity }}
      >
        <motion.video
          className="w-[90vw] h-auto block object-cover max-h-[80vh]"
          style={{ scale: videoScale }}
          autoPlay loop muted playsInline
          src="https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4"
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 70%, #000 100%)',
      }}/>

      {/* Grain */}
      <div className="absolute inset-0 z-[30] grain opacity-[0.1]"/>

      {/* NOT DONE YET title — massive, centered, fades in as you scroll */}
      <motion.div
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-center pointer-events-none hidden md:block"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <h2 className="text-white text-[24px] md:text-[80px] lg:text-[120px] font-italiana leading-[0.85] tracking-[-0.03em] uppercase">
          Not Done Yet.
        </h2>
        <div className="flex flex-col gap-[8px] mt-[16px] text-white/50 text-[12px] md:text-[18px] font-light tracking-wider uppercase">
          <span>Still Learning.</span>
          <span>Still Building.</span>
          <span>Still Becoming.</span>
        </div>
      </motion.div>

      {/* Mobile version — smaller, but present */}
      <motion.div
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-center pointer-events-none md:hidden"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <h2 className="text-white text-[28px] md:text-[48px] font-italiana leading-[0.9] tracking-[-0.02em] uppercase">
          Not Done Yet.
        </h2>
        <div className="flex flex-col gap-[6px] mt-[12px] text-white/50 text-[10px] md:text-[14px] font-light tracking-wider uppercase">
          <span>Still Learning.</span>
          <span>Still Building.</span>
          <span>Still Becoming.</span>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-[4px]">
        <motion.div
          className="w-[2px] h-[32px] bg-white/20"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
        <span className="text-white/20 text-[8px] tracking-[0.3em] uppercase">End of the beginning</span>
      </div>
    </section>
  )
}

/* ================================================================
   APP — root, orchestrates all acts
   ================================================================ */
export default function App() {
  const [loadingDone, setLoadingDone] = useState(false)

  if (!loadingDone) {
    return <LoadingScreen onComplete={() => setLoadingDone(true)}/>
  }

  return (
    <main className="h-screen overflow-y-auto overflow-x-hidden font-manrope bg-black relative">
      {/* Act 01 — Video Hero with 3D orb */}
      <VideoHeroAct/>

      {/* Act 02 — Cloud Transition Corridor */}
      <CloudCorridorAct/>

      {/* Act 03 — Red Manifesto with Signature + Projects */}
      <ManifestoAct/>

      {/* Act 04 — Final Video Reveal */}
      <FinalVideoAct/>
    </main>
  )
}
