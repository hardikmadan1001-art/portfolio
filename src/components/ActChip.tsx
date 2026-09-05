export default function ActChip({
  no,
  title,
  className = "",
}: {
  no: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 font-manrope text-[10px] font-medium tracking-[0.38em] text-mist uppercase ${className}`}
    >
      <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-cobalt-glow" />
      <span>ACT {no}</span>
      <span className="h-px w-8 bg-white/20" aria-hidden />
      <span>{title}</span>
    </div>
  );
}
