import { useEffect, useRef } from "react";

type Props = {
  base: string;
  reveal: string;
  alt: string;
  className?: string;
  radius?: number;
};

/**
 * Two stacked images. The top one is masked to a soft radial spotlight that
 * follows the cursor with smoothing (no canvas — a live CSS mask, so it stays
 * cheap at any resolution).
 */
export default function SpotlightReveal({
  base,
  reveal,
  alt,
  className = "",
  radius = 320,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const top = topRef.current;
    if (!wrap || !top) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let raf = 0;
    let R = radius;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const loop = () => {
      const rect = wrap.getBoundingClientRect();
      if (!reduced) {
        smooth.x += (mouse.x - smooth.x) * 0.12;
        smooth.y += (mouse.y - smooth.y) * 0.12;
      } else {
        smooth.x = rect.width / 2;
        smooth.y = rect.height / 2;
      }
      const cx = smooth.x < 0 ? rect.width / 2 : smooth.x;
      const cy = smooth.y < 0 ? rect.height / 2 : smooth.y;
      top.style.maskImage = top.style.webkitMaskImage =
        `radial-gradient(circle ${R}px at ${cx}px ${cy}px, black 0%, black 58%, rgba(0,0,0,0.85) 72%, transparent 100%)`;
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      R = window.innerWidth < 640 ? Math.min(radius, 180) : radius;
    };
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [radius]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden select-none ${className}`}
    >
      <img src={base} alt={alt} draggable={false} className="block h-full w-full object-cover" />
      <img
        ref={topRef}
        src={reveal}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute inset-0 block h-full w-full object-cover"
      />
    </div>
  );
}
