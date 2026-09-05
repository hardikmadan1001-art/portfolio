import { useState } from "react";

const COLS = [0, 1, 2, 3, 4];

/**
 * Splash intro — two rows of cobalt panels that wipe apart like a curtain,
 * then the overlay unmounts itself. Skipped entirely for reduced-motion users.
 */
export default function Splash() {
  const [render] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [gone, setGone] = useState(false);

  if (!render || gone) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1000] overflow-hidden bg-black"
      style={{ animation: "splash-hide 0.3s ease forwards 1.15s" }}
      onAnimationEnd={(e) => {
        if (e.animationName === "splash-hide") setGone(true);
      }}
    >
      <div className="flex h-1/2 w-full">
        {COLS.map((i) => (
          <div
            key={i}
            className="h-full w-1/5"
            style={{
              background: i % 2 ? "#0a5d8c" : "#0870a8",
              animation: `splash-up 0.95s cubic-bezier(0.96,-0.02,0.38,1.01) forwards ${
                0.28 + i * 0.06
              }s`,
            }}
          />
        ))}
      </div>
      <div className="flex h-1/2 w-full">
        {COLS.map((i) => (
          <div
            key={i}
            className="h-full w-1/5"
            style={{
              background: i % 2 ? "#0a5d8c" : "#0870a8",
              animation: `splash-down 0.95s cubic-bezier(0.96,-0.02,0.38,1.01) forwards ${
                0.28 + i * 0.06
              }s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
