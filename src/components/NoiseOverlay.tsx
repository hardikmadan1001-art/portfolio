const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function NoiseOverlay() {
  return (
    <>
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.42) 100%)",
        }}
      />
      {/* film grain */}
      <div
        aria-hidden
        className="grain-anim pointer-events-none fixed -inset-[10%] z-[95] opacity-[0.055] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: "180px 180px" }}
      />
    </>
  );
}
