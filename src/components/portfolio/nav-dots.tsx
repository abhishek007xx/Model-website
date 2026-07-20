"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "./data";
import { cn } from "@/lib/utils";

/**
 * NavDots
 * -------
 * Premium fixed navigation dots on the right edge. Each dot represents
 * a section; clicking smoothly scrolls to it (via Lenis). The active
 * dot expands into a pill with the section label. Magnetic hover.
 * Hidden on mobile and for reduced-motion.
 */
export function NavDots() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let currentIdx = 0;
      NAV_LINKS.forEach((l, i) => {
        const el = document.getElementById(l.href.slice(1));
        if (el && el.offsetTop <= mid) currentIdx = i;
      });
      setActive(currentIdx);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleClick = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-[85] hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {NAV_LINKS.map((l, i) => {
        const isActive = active === i;
        const isHovered = hovered === i;
        return (
          <button
            key={l.href}
            onClick={() => handleClick(l.href)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group flex items-center gap-2"
            aria-label={`Go to ${l.label}`}
          >
            <span
              className={cn(
                "font-sans text-[0.55rem] uppercase tracking-wide-2 transition-all duration-400",
                isActive || isHovered
                  ? "opacity-100 text-ink"
                  : "opacity-0 text-ink/60"
              )}
            >
              {l.label}
            </span>
            <span
              className={cn(
                "relative flex items-center transition-all duration-500",
                isActive ? "h-6 w-px bg-champagne" : "h-2 w-2 rounded-full bg-ink/25 group-hover:bg-ink"
              )}
            >
              {isActive && (
                <span className="absolute -right-1 h-2 w-2 rounded-full bg-champagne" />
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
