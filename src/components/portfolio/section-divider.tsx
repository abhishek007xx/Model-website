"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionDivider
 * --------------
 * A cinematic transition between sections. A clip-path wedge sweeps down
 * (or up), creating a morphing seam instead of a hard cut. The divider
 * itself is a colored band that reveals via clip-path on scroll.
 *
 * Variants:
 *  - "wedge-down"  → paper→ink, wedge sweeps downward
 *  - "wedge-up"    → ink→paper, wedge sweeps upward
 *  - "iris"        → circular iris open
 */
export function SectionDivider({
  variant = "wedge-down",
  height = "h-[12vh]",
  from = "bg-paper",
  to = "bg-ink",
}: {
  variant?: "wedge-down" | "wedge-up" | "iris";
  height?: string;
  from?: string;
  to?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const init =
        variant === "iris"
          ? "circle(0% at 50% 50%)"
          : variant === "wedge-up"
            ? "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
            : "polygon(0 0, 100% 0, 100% 0, 0 0)";
      const final = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      const irisFinal = "circle(150% at 50% 50%)";

      gsap.fromTo(
        el,
        { clipPath: init },
        {
          clipPath: variant === "iris" ? irisFinal : final,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div className={`relative w-full ${height} overflow-hidden ${from}`}>
      <div
        ref={ref}
        className={`absolute inset-0 ${to}`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      />
    </div>
  );
}
