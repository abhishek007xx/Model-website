"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollVelocity
 * -----------------
 * Tracks scroll velocity (px per frame) and exposes a smoothed value.
 * Used by ScrollVelocity to distort images based on scroll speed.
 * Returns a ref whose `.current` updates each frame.
 */
function useScrollVelocity() {
  const velocity = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onUpdate = () => {
      const current = window.scrollY;
      const delta = current - lastScroll.current;
      lastScroll.current = current;
      // smooth the velocity toward the latest delta
      velocity.current += (delta - velocity.current) * 0.1;
      raf = requestAnimationFrame(onUpdate);
    };
    raf = requestAnimationFrame(onUpdate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return velocity;
}

/**
 * ScrollVelocityImage
 * -------------------
 * Distorts an image based on scroll velocity — scale up slightly and
 * skew in the direction of scroll. The faster you scroll, the stronger
 * the distortion. Settles back to neutral when scrolling stops.
 * Inspired by Active Theory / Locomotive premium scroll effects.
 */
export function ScrollVelocityImage({
  src,
  alt,
  className,
  imgClassName,
  sizes,
  maxSkew = 8,
  maxScale = 1.08,
  children,
}: {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  maxSkew?: number;
  maxScale?: number;
  children?: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const velocity = useScrollVelocity();

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const apply = () => {
      const el = innerRef.current;
      if (el) {
        const v = velocity.current;
        // normalize velocity to -1..1 range (clamped)
        const norm = Math.max(-1, Math.min(1, v / 30));
        const skew = norm * maxSkew;
        const scale = 1 + Math.abs(norm) * (maxScale - 1);
        gsap.to(el, {
          skewY: skew,
          scale: scale,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      raf = requestAnimationFrame(apply);
    };
    raf = requestAnimationFrame(apply);
    return () => cancelAnimationFrame(raf);
  }, [velocity, maxSkew, maxScale]);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden gpu", className)}>
      <div ref={innerRef} className="gpu absolute inset-0">
        {src && (
          <img
            src={src}
            alt={alt}
            sizes={sizes}
            className={cn("h-full w-full object-cover object-center", imgClassName)}
          />
        )}
        {children}
      </div>
    </div>
  );
}

/**
 * ScrollProgressIndicator
 * ----------------------
 * A vertical progress rail on the left edge showing scroll position
 * with a champagne fill. Premium, minimal.
 */
export function ScrollProgressRail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollH > 0 ? window.scrollY / scrollH : 0);
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

  return (
    <div className="pointer-events-none fixed left-5 top-1/2 z-[90] hidden h-40 w-px -translate-y-1/2 bg-ink/15 lg:block">
      <div
        className="w-full origin-top bg-champagne"
        style={{
          height: "100%",
          transform: `scaleY(${progress})`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
