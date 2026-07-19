"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * RevealImage
 * -----------
 * A premium image component where each instance animates into view with a
 * unique, cinematic variant. No two variants repeat the same motion.
 *
 * Variants:
 *  - mask-left       → clip-path wipes left→right, inner image scales down
 *  - mask-bottom     → clip-path wipes bottom→top
 *  - mask-center     → clip-path opens from center outward (iris)
 *  - blur-sharp      → blur(20px)→0, opacity 0→1, scale 1.12→1
 *  - grayscale-color → grayscale→color, scrubbed to scroll (slow)
 *  - scale-zoom      → scale 1.3→1, scrubbed to scroll (zoom while scrolling)
 *  - parallax        → y drifts on scroll, image oversized to avoid gaps
 *  - fade-up         → opacity 0→1, y 50→0
 *
 * Every animation uses GPU-friendly properties only (transform, opacity,
 * filter, clip-path). Respects prefers-reduced-motion.
 */
export type RevealVariant =
  | "mask-left"
  | "mask-bottom"
  | "mask-center"
  | "blur-sharp"
  | "grayscale-color"
  | "scale-zoom"
  | "parallax"
  | "fade-up";

export function RevealImage({
  src,
  alt,
  variant = "fade-up",
  className,
  imgClassName,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  variant?: RevealVariant;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(inner, {
        clipPath: "inset(0% 0% 0% 0%)",
        filter: "none",
        opacity: 1,
        scale: 1,
        y: 0,
        yPercent: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      switch (variant) {
        case "mask-left":
          gsap.set(inner, { clipPath: "inset(0% 100% 0% 0%)", scale: 1.18 });
          gsap.to(inner, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
          });
          break;

        case "mask-bottom":
          gsap.set(inner, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 });
          gsap.to(inner, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
          });
          break;

        case "mask-center":
          gsap.set(inner, { clipPath: "inset(50% 50% 50% 50%)", scale: 1.2 });
          gsap.to(inner, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.6,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
          });
          break;

        case "blur-sharp":
          gsap.set(inner, { filter: "blur(24px)", opacity: 0, scale: 1.12 });
          gsap.to(inner, {
            filter: "blur(0px)",
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
          });
          break;

        case "grayscale-color":
          gsap.set(inner, { filter: "grayscale(1) contrast(1.05)" });
          gsap.to(inner, {
            filter: "grayscale(0) contrast(1)",
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top 78%",
              end: "center 45%",
              scrub: 1.2,
            },
          });
          break;

        case "scale-zoom":
          gsap.fromTo(
            inner,
            { scale: 1.3 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top 90%",
                end: "bottom 15%",
                scrub: 1.5,
              },
            }
          );
          break;

        case "parallax":
          // Oversize so the drift never reveals a gap.
          gsap.set(inner, { scale: 1.18, yPercent: -6 });
          gsap.to(inner, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
          break;

        case "fade-up":
          gsap.fromTo(
            inner,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
            }
          );
          break;
      }
    }, wrap);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden gpu", className)}
    >
      <div ref={innerRef} className="gpu h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover object-center", imgClassName)}
        />
      </div>
    </div>
  );
}
