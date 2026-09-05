import { useEffect, useRef } from "react";

type Blob = {
  x: number; // center x (fraction)
  y: number; // center y (fraction)
  rx: number; // radius x (fraction of width)
  ry: number; // radius y (fraction of height)
  a: number; // alpha
  sp: number; // drift speed
  amp: number; // horizontal sway amplitude (fraction)
  hue: number; // 0 = white fog, 1 = cobalt-tinted
};

/**
 * A generative stand-in for the hero film: a deep cobalt-night sky with
 * dust, drifting fog banks and an occasional wide cloud front crossing.
 * Renders offline, at any resolution, forever — no mp4 required.
 */
export default function SkyFilm({ className = "" }: { className?: string }) {
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

    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.72,
      r: 0.3 + Math.random() * 1.1,
      ph: Math.random() * Math.PI * 2,
      sp: 0.4 + Math.random() * 1.6,
    }));

    const blobs: Blob[] = [
      // low drifting fog bands
      { x: 0.2, y: 0.86, rx: 0.55, ry: 0.16, a: 0.10, sp: 0.02, amp: 0.06, hue: 1 },
      { x: 0.75, y: 0.9, rx: 0.5, ry: 0.18, a: 0.09, sp: 0.014, amp: 0.09, hue: 1 },
      { x: 0.5, y: 0.72, rx: 0.62, ry: 0.12, a: 0.05, sp: 0.01, amp: 0.07, hue: 0 },
      // a big slow front passing overhead
      { x: -0.2, y: 0.4, rx: 0.6, ry: 0.22, a: 0.06, sp: 0.006, amp: 0.4, hue: 0 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const sec = t / 1000;
      // night sky gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#04050a");
      g.addColorStop(0.55, "#070d16");
      g.addColorStop(1, "#0a1c2e");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // horizon cobalt bloom
      const bloom = ctx.createRadialGradient(w / 2, h * 1.05, 0, w / 2, h * 1.05, h * 0.9);
      bloom.addColorStop(0, "rgba(8,112,168,0.34)");
      bloom.addColorStop(0.6, "rgba(8,112,168,0.08)");
      bloom.addColorStop(1, "rgba(8,112,168,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      // dust
      for (const s of stars) {
        const tw = reduced ? 0.6 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(sec * s.sp + s.ph));
        ctx.beginPath();
        ctx.fillStyle = `rgba(190,215,235,${(0.14 * tw).toFixed(3)})`;
        ctx.arc(s.x * w, s.y * h, s.r * (0.7 + 0.5 * tw), 0, Math.PI * 2);
        ctx.fill();
      }

      // fog layers
      for (const b of blobs) {
        const drift = reduced ? b.x : b.x + Math.sin(sec * b.sp) * b.amp;
        const cx = drift * w;
        const grad = ctx.createRadialGradient(cx, b.y * h, 0, cx, b.y * h, Math.max(w * b.rx, h * b.ry));
        const col = b.hue
          ? `255,255,255`
          : `210,225,240`;
        grad.addColorStop(0, `rgba(${col},${b.a})`);
        grad.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, b.y * h, w * b.rx, h * b.ry, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
