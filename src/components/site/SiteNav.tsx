import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-xl border-b border-ink/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Link
        to="/"
        className={`font-display text-2xl tracking-tight transition-colors ${
          scrolled ? "text-ocean" : "text-paper"
        }`}
      >
        VAYA CEYLON
      </Link>
      <div
        className={`hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors ${
          scrolled ? "text-ink/70" : "text-paper/90"
        }`}
      >
        <Link
          to="/tours/$slug"
          params={{ slug: "cultural-triangle-and-coast" }}
          className="hover:text-sunset transition-colors"
        >
          Journeys
        </Link>
        <a href="/#destinations" className="hover:text-sunset transition-colors">
          Destinations
        </a>
        <a href="/#experiences" className="hover:text-sunset transition-colors">
          Experiences
        </a>
        <a href="/#journal" className="hover:text-sunset transition-colors">
          Journal
        </a>
      </div>
      <a
        href="#plan"
        className={`px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] font-medium transition-all ${
          scrolled
            ? "bg-ocean text-paper hover:bg-ink"
            : "bg-paper/10 text-paper backdrop-blur-md border border-paper/20 hover:bg-paper hover:text-ink"
        }`}
      >
        Inquire
      </a>
    </nav>
  );
}
