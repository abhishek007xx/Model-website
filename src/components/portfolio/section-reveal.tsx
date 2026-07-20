"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionReveal
 * -------------
 * A premium section-enter wrapper. When the section first scrolls into
 * view, it animates from a cinematic hidden state (clip-path mask + blur
 * + slight scale + opacity) to its final state. Each section can use a
 * different `variant` so no two sections enter the same way.
 *
 * Variants:
 *  - "rise"     → opacity + y + blur (default, subtle)
 *  - "iris"     → clip-path center iris open
 *  - "wipe-up"  → clip-path bottom-to-top wipe
 *  - "scale"    → scale 1.04→1 + blur
 *
 * Respects prefers-reduced-motion.
 */
export function SectionReveal({
  children,
  variant = "rise",
  className,
}: {
  children: ReactNode;
  variant?: "rise" | "iris" | "wipe-up" | "scale";
  className?: string;
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
      const start = "top 80%";
      switch (variant) {
        case "iris":
          gsap.fromTo(
            el,
            { clipPath: "inset(20% 20% 20% 20% round 40px)", opacity: 0.4, filter: "blur(12px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start, once: true },
            }
          );
          break;
        case "wipe-up":
          gsap.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)", filter: "blur(8px)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              filter: "blur(0px)",
              duration: 1.3,
              ease: "power4.inOut",
              scrollTrigger: { trigger: el, start, once: true },
            }
          );
          break;
        case "scale":
          gsap.fromTo(
            el,
            { scale: 1.04, opacity: 0, filter: "blur(10px)" },
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start, once: true },
            }
          );
          break;
        case "rise":
        default:
          gsap.fromTo(
            el,
            { opacity: 0, y: 60, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start, once: true },
            }
          );
          break;
      }
    }, el);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div ref={ref} className={cn("gpu", className)}>
      {children}
    </div>
  );
}
