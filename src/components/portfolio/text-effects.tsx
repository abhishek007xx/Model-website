"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

/**
 * ScrambleText
 * ------------
 * Premium decryption/scramble effect — each character cycles through random
 * glyphs before settling on the final letter, with a left-to-right wave.
 * Inspired by Awwwards winners (Resn, Active Theory). Respects reduced-motion.
 */
export function ScrambleText({
  children,
  as: Tag = "span",
  className,
  duration = 1.2,
  delay = 0,
  trigger = "scroll",
}: {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  delay?: number;
  trigger?: "load" | "scroll";
}) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(children);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof children !== "string") return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(children);
      return;
    }

    const final = children;
    let frame = 0;
    let raf = 0;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      const totalFrames = Math.round(duration * 60);
      const stepDelay = delay * 60;

      const tick = () => {
        if (frame < stepDelay) {
          frame++;
          raf = requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(1, (frame - stepDelay) / totalFrames);
        const revealed = Math.floor(progress * final.length);
        let result = "";
        for (let i = 0; i < final.length; i++) {
          if (i < revealed || final[i] === " ") {
            result += final[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(result);
        frame++;
        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(final);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    let st: ScrollTrigger | undefined;
    if (trigger === "load") {
      start();
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: start,
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      st?.kill();
    };
  }, [children, duration, delay, trigger]);

  return (
    <Tag ref={ref as any} className={className}>
      {display}
    </Tag>
  );
}

/**
 * VariableWeight
 * --------------
 * Animates font-weight from thin (200) to the target weight, creating
 * a "drawing" effect where the letters gain substance. Premium, subtle.
 */
export function VariableWeight({
  children,
  as: Tag = "span",
  className,
  from = 200,
  to = 600,
  duration = 1.8,
  delay = 0,
  trigger = "scroll",
}: {
  children: string;
  as?: ElementType;
  className?: string;
  from?: number;
  to?: number;
  duration?: number;
  delay?: number;
  trigger?: "load" | "scroll";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof children !== "string") return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const obj = { w: from };
    const play = () => {
      gsap.to(obj, {
        w: to,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          el.style.fontWeight = String(Math.round(obj.w));
        },
      });
    };

    gsap.set(el, { fontWeight: from });

    let st: ScrollTrigger | undefined;
    if (trigger === "load") {
      play();
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: play,
      });
    }

    return () => st?.kill();
  }, [children, from, to, duration, delay, trigger]);

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

/**
 * KerningText
 * -----------
 * Animates letter-spacing from wide (0.3em) to tight (-0.02em), so the
 * letters "settle" together. A signature of editorial luxury sites.
 */
export function KerningText({
  children,
  as: Tag = "span",
  className,
  from = "0.3em",
  to = "-0.02em",
  duration = 1.6,
  delay = 0,
  trigger = "scroll",
}: {
  children: string;
  as?: ElementType;
  className?: string;
  from?: string;
  to?: string;
  duration?: number;
  delay?: number;
  trigger?: "load" | "scroll";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof children !== "string") return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const obj = { v: parseFloat(from) };
    const targetVal = parseFloat(to);
    const unit = from.replace(/[\d.-]/g, "") || "em";

    const play = () => {
      gsap.to(obj, {
        v: targetVal,
        duration,
        delay,
        ease: "power3.out",
        onUpdate: () => {
          el.style.letterSpacing = `${obj.v}${unit}`;
        },
      });
    };

    gsap.set(el, { letterSpacing: from });

    let st: ScrollTrigger | undefined;
    if (trigger === "load") {
      play();
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: play,
      });
    }

    return () => st?.kill();
  }, [children, from, to, duration, delay, trigger]);

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

/**
 * GradientText
 * ------------
 * Animated gradient text — champagne sweep that continuously moves.
 * For luxury accent words.
 */
export function GradientText({
  children,
  as: Tag = "span",
  className,
}: {
  children: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={cn("shimmer-text", className)}>
      {children}
    </Tag>
  );
}
