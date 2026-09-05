import { useEffect, useState } from "react";

export default function TsMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [open]);

  return (
    <>
      <div className="fixed top-[16px] z-10 w-[50%] pointer-events-none md:top-[27px]">
        <div className="pointer-events-auto flex justify-end px-[20px] md:px-[40px]">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className={[
              "burger-btn",
              "relative flex h-[59px] w-[59px] flex-col items-center justify-center gap-1 rounded-full border-0 bg-ts-cream transition bg-[var(--color-ts-cream)]",
              "hover:bg-ink hover:text-ts-cream",
              open ? "burger-btn-open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={[
                "bar",
                "h-[2px] w-[24px] block rounded",
                "transition-all duration-300",
                "bg-ink text-ts-cream",
                open ? "bar-open-1" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={open ? { transform: "rotate(45deg) translate(2px,2px)", background: "var(--color-ts-cream)" } : {}}
            />
            <span
              className={[
                "bar",
                "h-[2px] w-[24px] block rounded",
                "transition-all duration-300",
                "bg-ink text-ts-cream",
                open ? "bar-open-2" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={open ? { transform: "rotate(-45deg) translate(2px,-2px)", background: "var(--color-ts-cream)" } : {}}
            />
          </button>
        </div>
      </div>

      <div
        className={[
          "menu-panel",
          "pointer-events-none fixed left-[8px] right-[8px] z-9 rounded-2xl",
          "bg-[color:rgba(17,17,17,0.95)] backdrop-blur-[26px]",
          "flex flex-col justify-between pt-[90px] px-[32px] pb-[32px]",
          "transition-all duration-500 ease-[0.25_0.46_0.45_0.94]",
          "top-[-600px] opacity-0",
          open ? "menu-panel-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={open ? { top: "0", opacity: 1, pointerEvents: "auto" } : {}}
      >
        <nav>
          {[
            { href: "#work", label: "Work" },
            { href: "#about", label: "About" },
            { href: "#blog", label: "Blog" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-nav-link"
              onClick={() => setOpen(false)}
            >
              <span className="text-[var(--color-ts-cream)] font-medium leading-[130%] transition hover:[opacity:0.7]" style={{ fontSize: "36px" }}>
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="menu-contact flex flex-col gap-[20px] mt-[32px]">
          <a
            href="mailto:studio@norakessler.com"
            className="menu-email"
            onClick={() => setOpen(false)}
          >
            studio@norakessler.com
          </a>
          <div className="menu-socials flex gap-[24px]">
            {[
              { href: "#", label: "Pinterest" },
              { href: "#", label: "Behance" },
              { href: "#", label: "Letterboxd" },
            ].map((s) => (
              <a key={s.label} href={s.href} className="menu-social" onClick={() => setOpen(false)}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-[32px]">
          <a
            href="#"
            className="pill-cta pill-cta-sm"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            <span className="pill-cta-bg-sm absolute top-[5px] bottom-[5px] left-[8px] w-[calc(100%_-_8px_-_8px_-_38px_-_8px)] rounded-full bg-[var(--color-ts-cream)] z-0 transition-[width] duration-300 ease-[0.25_0.46_0.45_0.94]" />
            <span className="relative z-1 text-[var(--color-ts-ink)] font-medium text-[14px] px-32 whitespace-nowrap py-8">
              Let's talk
            </span>
            <span className="pill-cta-circle-sm relative z-1 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[var(--color-ts-sky)] flex-shrink-0 transition-transform duration-300 ease-[0.25_0.46_0.45_0.94]">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
