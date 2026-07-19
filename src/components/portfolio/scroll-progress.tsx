"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["top", "about", "stats", "portfolio", "experience", "services", "contact"];

/**
 * ScrollProgress
 * --------------
 * A thin champagne progress bar pinned to the top of the viewport,
 * tracking scroll position. Plus a small fixed section indicator
 * (current section name + index) on the right edge.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [section, setSection] = useState("01");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollH > 0 ? window.scrollY / scrollH : 0;
      setProgress(p);

      // determine current section
      const mid = window.scrollY + window.innerHeight * 0.4;
      let currentIdx = 0;
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= mid) currentIdx = i;
      }
      setSection(String(currentIdx + 1).padStart(2, "0"));
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* top progress bar */}
      <div className="fixed left-0 top-0 z-[90] h-[2px] w-full bg-transparent">
        <div
          className="h-full origin-left bg-champagne"
          style={{
            transform: `scaleX(${progress})`,
            transition: "transform 0.1s linear",
          }}
        />
      </div>

      {/* right-edge section indicator */}
      <div className="pointer-events-none fixed right-5 top-1/2 z-[90] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/40">
          {section}
        </span>
        <span className="h-12 w-px bg-ink/20" />
        <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/40">
          07
        </span>
      </div>
    </>
  );
}
