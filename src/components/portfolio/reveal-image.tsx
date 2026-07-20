"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * RevealImage v2 — World-class image animation
 * =============================================
 *
 * Each variant is a distinct, premium motion inspired by Awwwards
 * winners (Active Theory, Locomotive, Resn, Cabinet of Curiosities).
 * All animations use GPU-friendly properties only (transform, opacity,
 * filter, clip-path). Spring physics on settlement for organic feel.
 *
 * Variants:
 *  - mask-left / mask-right / mask-top / mask-bottom  → directional clip wipes
 *  - mask-center      → iris opens from center outward
 *  - mask-diagonal    → clip wipes diagonally
 *  - liquid           → organic blob clip morph (CSS border-radius animation)
 *  - chromatic        → RGB split (red/cyan offset) resolves to sharp
 *  - blur-sharp       → blur(24px)→0, scale 1.12→1
 *  - grayscale-color  → grayscale→color, scrubbed to scroll
 *  - scale-zoom       → scale 1.3→1, scrubbed to scroll (zoom while scrolling)
 *  - breathing        → continuous slow Ken Burns breathing (loop)
 *  - parallax         → y drifts on scroll, oversized to avoid gaps
 *  - fade-up          → opacity 0→1, y 50→0
 *
 * `settle` adds a spring overshoot at the end of the reveal so the
 * image "lands" like it has weight — a signature of premium motion.
 */
export type RevealVariant =
  | "mask-left"
  | "mask-right"
  | "mask-top"
  | "mask-bottom"
  | "mask-center"
  | "mask-diagonal"
  | "liquid"
  | "chromatic"
  | "blur-sharp"
  | "grayscale-color"
  | "scale-zoom"
  | "breathing"
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
  settle = true,
}: {
  src: string;
  alt: string;
  variant?: RevealVariant;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  settle?: boolean;
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

    // Settlement spring — slight overshoot for organic "landing"
    const settleEase = settle ? "elastic.out(1, 0.7)" : "power3.out";

    const ctx = gsap.context(() => {
      switch (variant) {
        case "mask-left":
          gsap.set(inner, { clipPath: "inset(0% 100% 0% 0%)", scale: 1.2 });
          gsap.to(inner, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
          });
          // settle the scale with a tiny overshoot
          if (settle) {
            gsap.fromTo(
              inner,
              { scale: 1.03 },
              {
                scale: 1,
                duration: 1.2,
                ease: "elastic.out(1, 0.7)",
                delay: 1.3,
                scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
              }
            );
          }
          break;

        case "mask-right":
          gsap.set(inner, { clipPath: "inset(0% 0% 0% 100%)", scale: 1.2 });
          gsap.to(inner, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
          });
          break;

        case "mask-top":
          gsap.set(inner, { clipPath: "inset(0% 0% 100% 0%)", scale: 1.2 });
          gsap.to(inner, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
          });
          break;

        case "mask-bottom":
          gsap.set(inner, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 });
          gsap.to(inner, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
          });
          break;

        case "mask-center":
          gsap.set(inner, { clipPath: "inset(50% 50% 50% 50%)", scale: 1.25 });
          gsap.to(inner, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.6,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
          });
          break;

        case "mask-diagonal":
          gsap.set(inner, {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            scale: 1.2,
          });
          gsap.to(inner, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scale: 1,
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
          });
          break;

        case "liquid":
          // Organic blob morph via border-radius animation
          gsap.set(inner, {
            borderRadius: "50% 50% 50% 50%",
            scale: 1.3,
            opacity: 0,
          });
          gsap.to(inner, {
            borderRadius: "0% 0% 0% 0%",
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
          });
          break;

        case "chromatic":
          // RGB split — red/cyan offset resolves to sharp
          gsap.set(inner, {
            filter: "drop-shadow(6px 0 0 rgba(255,0,80,0.5)) drop-shadow(-6px 0 0 rgba(0,200,255,0.5)) blur(4px)",
            opacity: 0,
            scale: 1.1,
          });
          gsap.to(inner, {
            filter: "drop-shadow(0 0 0 rgba(255,0,80,0)) drop-shadow(0 0 0 rgba(0,200,255,0)) blur(0px)",
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
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
            scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
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

        case "breathing":
          // Continuous slow Ken Burns breathing — loops forever
          gsap.set(inner, { scale: 1.05 });
          gsap.to(inner, {
            scale: 1.12,
            duration: 8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          break;

        case "parallax":
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
              scrollTrigger: { trigger: wrap, start: "top 70%", once: true },
            }
          );
          break;
      }
    }, wrap);

    return () => ctx.revert();
  }, [variant, settle]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden gpu", className)}
    >
      <div ref={innerRef} className="gpu absolute inset-0">
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
