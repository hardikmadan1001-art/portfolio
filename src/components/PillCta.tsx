import { ArrowUpRight } from "lucide-react";

type Props = {
  label: string;
  onClick?: () => void;
  href?: string;
  small?: boolean;
};

export default function PillCta({ label, onClick, href, small = false }: Props) {
  const inner = (
    <>
      <span className={small ? "pill-cta-bg-sm" : "pill-cta-bg"} />
      <span className={small ? "pill-cta-text-sm" : "pill-cta-text"}>
        {label}
      </span>
      <span className={small ? "pill-cta-circle-sm" : "pill-cta-circle"}>
        <ArrowUpRight
          className={small ? "h-3.5 w-3.5 text-white" : "h-5 w-5 text-white"}
          strokeWidth={2}
        />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={small ? "pill-cta pill-cta-sm" : "pill-cta"}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={small ? "pill-cta pill-cta-sm" : "pill-cta"}
    >
      {inner}
    </button>
  );
}
