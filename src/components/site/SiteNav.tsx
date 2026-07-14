import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Tours", to: "/tours" },
  { label: "Destinations", to: "/#destinations" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-xl border-b border-ink/5 py-4"
          : "bg-gradient-to-b from-ink/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link
          to="/"
          className={`font-display text-2xl tracking-tight transition-colors ${
            scrolled ? "text-ocean" : "text-paper"
          }`}
        >
          VAYA CEYLON
        </Link>

        <div
          className={`hidden md:flex items-center gap-9 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors ${
            scrolled ? "text-ink/70" : "text-paper/90"
          }`}
        >
          {NAV_LINKS.map((link) =>
            link.to.startsWith("/#") ? (
              <a key={link.to} href={link.to} className="hover:text-sunset transition-colors">
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-sunset transition-colors"
                activeProps={{ className: "text-sunset" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>

        <a
          href="#plan"
          className={`hidden md:inline-block px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium transition-all rounded-full ${
            scrolled
              ? "bg-ocean text-paper hover:bg-ink"
              : "bg-paper/10 text-paper backdrop-blur-md border border-paper/25 hover:bg-paper hover:text-ink"
          }`}
        >
          Plan My Trip
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`md:hidden size-10 grid place-items-center rounded-full ${
            scrolled ? "text-ink" : "text-paper"
          }`}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-paper border-t border-ink/5 px-6 py-6 space-y-4 text-sm">
          {NAV_LINKS.map((link) =>
            link.to.startsWith("/#") ? (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setOpen(false)}
                className="block text-ink uppercase tracking-[0.22em] text-[11px]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block text-ink uppercase tracking-[0.22em] text-[11px]"
              >
                {link.label}
              </Link>
            ),
          )}
          <a
            href="#plan"
            onClick={() => setOpen(false)}
            className="block text-center px-6 py-3 bg-ocean text-paper rounded-full text-[11px] uppercase tracking-[0.22em]"
          >
            Plan My Trip
          </a>
        </div>
      )}
    </nav>
  );
}
