import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
};

type Props = {
  className?: string;
  count?: number;
  color?: string; // "r,g,b"
  speed?: number;
  size?: number;
};

/**
 * Lightweight canvas particle field. Pure 2D, no deps.
 * Particles drift upward and twinkle; camera parallax can be added by
 * translating the parent on scroll.
 */
export default function Particles({
  className = "",
  count = 60,
  color = "255,255,255",
  speed = 1,
  size = 1.6,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let parts: Particle[] = [];

    const spawn = (randomY: boolean): Particle => ({
      x: Math.random(),
      y: randomY ? Math.random() : 1.02 + Math.random() * 0.05,
      z: 0.35 + Math.random() * 0.65,
      r: (0.4 + Math.random() * 1.6) * size,
      vy: (0.00002 + Math.random() * 0.00006) * speed,
      drift: (Math.random() - 0.5) * 0.00002,
      phase: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: count }, () => spawn(true));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.0012 + p.phase * 10));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${(0.1 + 0.55 * tw * p.z).toFixed(3)})`;
        ctx.arc(p.x * w, p.y * h, p.r * p.z * tw + 0.2, 0, Math.PI * 2);
        ctx.fill();
        if (!reduced) {
          p.y -= p.vy * (0.6 + p.z);
          p.x += p.drift;
          if (p.y < -0.05) Object.assign(p, spawn(false));
          if (p.x < -0.05) p.x = 1.05;
          if (p.x > 1.05) p.x = -0.05;
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count, color, speed, size]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
