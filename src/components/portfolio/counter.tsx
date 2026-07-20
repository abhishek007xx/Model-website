"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Counter
 * -------
 * Animated count-up number that triggers when scrolled into view.
 * Uses GSAP for smooth easing. Respects reduced-motion (shows final value).
 */
export function Counter({
  to,
  from = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
  pad = 0,
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  pad?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // For reduced-motion users, show the final value immediately (lazy init).
  const [display, setDisplay] = useState(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reduce ? String(to).padStart(pad, "0") : String(from).padStart(pad, "0");
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    const obj = { v: from };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: to,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            setDisplay(String(Math.round(obj.v)).padStart(pad, "0"));
          },
        });
      },
    });

    return () => st.kill();
  }, [to, from, duration, pad]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
