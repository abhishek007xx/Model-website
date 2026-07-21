"use client";

import { useEffect, useRef, type ElementType } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type SplitMode = "chars" | "words" | "lines";

/**
 * SplitText
 * ---------
 * Animated text reveal using SplitType + GSAP.
 *  - mode="chars"  → character-by-character stagger (hero titles)
 *  - mode="words"  → word stagger (headlines)
 *  - mode="lines"  → line mask reveal (paragraphs)
 *
 * When `mask` is true, each line is wrapped in an overflow-hidden box so
 * children slide up cleanly behind an invisible edge.
 *
 * `trigger`:
 *  - "load"   → play on mount (hero)
 *  - "scroll" → play when scrolled into view
 */
export function SplitText({
  children,
  as: Tag = "div",
  mode = "chars",
  trigger = "scroll",
  delay = 0,
  stagger = 0.03,
  duration = 1,
  y = 110,
  className,
  mask = true,
}: {
  children: string;
  as?: ElementType;
  mode?: SplitMode;
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
  className?: string;
  mask?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof children !== "string") return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Always split into lines too so we can mask per-line.
    const types = mask ? `lines, ${mode}` : mode;
    const split = new SplitType(el, { types, tagName: "span" });

    const targets =
      mode === "chars"
        ? split.chars
        : mode === "words"
          ? split.words
          : split.lines;

    if (!targets || targets.length === 0) return;

    if (mask && split.lines) {
      split.lines.forEach((line) => {
        (line as HTMLElement).style.overflow = "hidden";
        (line as HTMLElement).style.paddingBottom = "0.06em";
        (line as HTMLElement).style.marginBottom = "-0.06em";
      });
    }

    if (reduce) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(targets, { yPercent: y, opacity: 0 });

    const play = () => {
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: "power4.out",
      });
    };

    let st: ScrollTrigger | undefined;
    if (trigger === "load") {
      play();
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        once: true,
        onEnter: play,
      });
    }

    return () => {
      st?.kill();
      split.revert();
    };
  }, [mode, trigger, delay, stagger, duration, y, mask, children]);

  return (
    <Tag ref={ref as any} className={cn(className)}>
      {children}
    </Tag>
  );
}
