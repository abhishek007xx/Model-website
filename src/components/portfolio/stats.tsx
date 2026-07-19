"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MODEL, VITAL_STATS } from "./data";
import { SplitText } from "./split-text";

gsap.registerPlugin(ScrollTrigger);

// Stacked photos for the depth transition — indices into GALLERY.
const STACK_PHOTOS = [
  "/portfolio/gallery-6.jpg", // Noir
  "/portfolio/gallery-3.jpg", // Couture Moment
  "/portfolio/gallery-9.jpg", // In Motion
  "/portfolio/gallery-1.jpg", // Quiet Strength
];

/**
 * Stats — pinned storytelling with image stacking.
 *
 * As you scroll through the pinned section, 4 photos stack on top of
 * each other one-by-one (each slides up + fades in, covering the
 * previous). Meanwhile the vital-stat counters animate on the right.
 */
export function Stats() {
  const root = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const stack = stackRef.current;
    if (!el || !stack) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const cards = stack.querySelectorAll<HTMLElement>("[data-stack-card]");
      // Initialize all but the first as hidden below.
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { yPercent: 0, opacity: 1, zIndex: i });
        } else {
          gsap.set(card, { yPercent: 60, opacity: 0, zIndex: i });
        }
      });

      // Pin the section and step through each card.
      const total = cards.length;
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${total * 90}%`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // segment progress: card i fully covers at progress = (i+1)/total
          cards.forEach((card, i) => {
            if (i === 0) {
              // first card always visible, slight recede as it gets covered
              const cover = gsap.utils.clamp(0, 1, p / (1 / total));
              gsap.set(card, {
                opacity: 1,
                scale: 1 - cover * 0.04,
                filter: `brightness(${1 - cover * 0.25})`,
              });
            } else {
              // each subsequent card slides up + fades in during its segment
              const segStart = (i - 1) / total;
              const segEnd = i / total;
              const sp = gsap.utils.clamp(
                0,
                1,
                (p - segStart) / (segEnd - segStart)
              );
              gsap.set(card, {
                yPercent: (1 - sp) * 60,
                opacity: sp,
                scale: 1 - (1 - sp) * 0.04,
                filter: `brightness(${1 - (1 - sp) * 0.1})`,
              });
              // recede when next card starts covering it
              if (i < total - 1) {
                const nextStart = i / total;
                const nextEnd = (i + 1) / total;
                const np = gsap.utils.clamp(0, 1, (p - nextStart) / (nextEnd - nextStart));
                gsap.set(card, {
                  scale: 1 - np * 0.04,
                  filter: `brightness(${1 - np * 0.25})`,
                });
              }
            }
          });
        },
      });

      // Animate the stat counters when the right column enters view
      const statEls = el.querySelectorAll<HTMLElement>("[data-counter]");
      statEls.forEach((stat) => {
        const target = parseFloat(stat.dataset.counter || "0");
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                stat.textContent = Math.round(obj.v).toString().padStart(2, "0");
              },
            });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={root}
      className="grain mesh-bg relative overflow-hidden bg-ink text-paper"
    >
      <div className="relative z-10 mx-auto grid h-[100svh] max-w-[1600px] grid-cols-1 items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Left — stacking photos */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div
            ref={stackRef}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm"
            style={{ perspective: 1200 }}
          >
            {STACK_PHOTOS.map((src, i) => (
              <div
                key={src}
                data-stack-card={i}
                className="gpu absolute inset-0 overflow-hidden shadow-collage"
              >
                <Image
                  src={src}
                  alt={`${MODEL.name} comp ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 35vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <span className="absolute left-3 top-3 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/80">
                  #00{6 + i}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — title + stats */}
        <div className="flex flex-col gap-6 lg:col-span-7 lg:pl-12">
          <div>
            <SplitText
              as="span"
              mode="words"
              className="mb-3 block font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50"
            >
              Comp Card — 02
            </SplitText>
            <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
              <SplitText as="span" mode="chars" stagger={0.04} duration={1.1} className="block">
                Measurements
              </SplitText>
            </h2>
            <SplitText
              as="p"
              mode="lines"
              delay={0.2}
              stagger={0.08}
              className="mt-3 max-w-md text-sm text-paper/70"
            >
              Verified by {MODEL.agency}. All figures current as of {MODEL.season}.
            </SplitText>
          </div>

          {/* Animated stat grid */}
          <div className="grid grid-cols-2 gap-px overflow-hidden bg-paper/12 sm:grid-cols-4">
            {VITAL_STATS.map((s, i) => {
              const numeric = parseInt(s.value.replace(/\D/g, ""), 10);
              const hasNumber = !isNaN(numeric);
              return (
                <div key={s.label} className="flex flex-col gap-1 bg-ink p-4">
                  <span className="font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/45">
                    {s.label}
                  </span>
                  <span className="font-serif text-xl font-medium tracking-display text-paper">
                    {hasNumber ? (
                      <>
                        <span data-counter={numeric}>00</span>
                        <span className="text-paper/50">
                          {s.value.replace(/[0-9]/g, "").trim()}
                        </span>
                      </>
                    ) : (
                      s.value
                    )}
                  </span>
                  <span className="mt-1 font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/30">
                    {String(i + 1).padStart(2, "0")} / {String(VITAL_STATS.length).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>

          {/* credit line */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-paper/15 pt-4 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45">
            <span>Scroll to stack</span>
            <span className="h-3 w-px bg-paper/25" />
            <span>{STACK_PHOTOS.length} frames</span>
            <span className="h-3 w-px bg-paper/25" />
            <span>Verified {MODEL.season}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
