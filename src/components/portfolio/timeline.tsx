"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MODEL } from "./data";
import { SplitText } from "./split-text";
import { ScrambleText } from "./text-effects";

gsap.registerPlugin(ScrollTrigger);

// Career milestones — a scroll-driven cinematic timeline.
const MILESTONES = [
  {
    year: "2017",
    title: "Discovered",
    place: "Tokyo",
    image: "/portfolio/gallery-12.jpg",
    text: "Spotted on the streets of Shibuya at seventeen. A polaroid, a plane ticket, and a meeting that would quietly rewrite the next decade.",
  },
  {
    year: "2019",
    title: "First Cover",
    place: "Paris",
    image: "/portfolio/gallery-3.jpg",
    text: "The first Vogue cover — a black-and-white story shot at dawn in a Marais atelier. The industry took note.",
  },
  {
    year: "2021",
    title: "Runway Season",
    place: "Milan · Paris",
    image: "/portfolio/gallery-9.jpg",
    text: "Thirty-two shows in a single season. Opened for Prada, closed for Valentino. A presence the cameras could not look away from.",
  },
  {
    year: "2023",
    title: "Global Campaign",
    place: "Worldwide",
    image: "/portfolio/gallery-16.jpg",
    text: "Named the face of a global fragrance — film, print, and a 90-second cinema spot directed in Lisbon.",
  },
  {
    year: "2025",
    title: "Now",
    place: "Tokyo · Paris · New York",
    image: "/portfolio/gallery-18.jpg",
    text: "Selecting work that matters. Editorial that endures. A practice built on discipline, curiosity, and a love for the craft.",
  },
];

/**
 * Timeline
 * --------
 * A scroll-driven cinematic timeline. A sticky center column holds the
 * current milestone's image + text, which cross-fades as you scroll
 * through each segment. A vertical progress line on the left fills
 * champagne as the timeline advances. Each milestone's year scrambles in.
 */
export function Timeline() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const panels = el.querySelectorAll<HTMLElement>("[data-panel]");
      const progressLine = el.querySelector<HTMLElement>("[data-progress-line]");

      // Pin the sticky stage and cross-fade panels
      const total = panels.length;
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${total * 90}%`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (progressLine) {
            progressLine.style.transform = `scaleY(${p})`;
          }
          panels.forEach((panel, i) => {
            const segStart = i / total;
            const segEnd = (i + 1) / total;
            const segP = gsap.utils.clamp(0, 1, (p - segStart) / (segEnd - segStart));
            // active panel is the one whose segment we're in
            const isActive = p >= segStart && p < segEnd;
            if (isActive) {
              gsap.set(panel, { opacity: 1, zIndex: i + 1 });
            } else if (p < segStart) {
              gsap.set(panel, { opacity: 0, zIndex: 1 });
            } else {
              // fade out after its segment
              const fadeOut = gsap.utils.clamp(0, 1, (p - segEnd) / (segEnd - segStart) * 2);
              gsap.set(panel, { opacity: 1 - fadeOut, zIndex: i + 1 });
            }
            void segP;
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink">
      {/* Section header (not pinned) */}
      <div className="grain mesh-bg relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-8 flex items-center justify-between border-b border-paper/15 pb-4">
            <ScrambleText
              as="span"
              duration={1.2}
              className="font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50"
            >
              The Journey — 02b
            </ScrambleText>
            <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/40">
              {MILESTONES.length} chapters
            </span>
          </div>
          <h2 className="font-serif text-5xl font-medium leading-[1.02] tracking-tight text-paper sm:text-6xl md:text-7xl text-balance">
            <SplitText as="span" mode="chars" stagger={0.035} duration={1.1} className="block">
              A career in
            </SplitText>
            <SplitText as="span" mode="chars" stagger={0.035} duration={1.1} delay={0.3} className="block italic text-champagne">
              still frames
            </SplitText>
          </h2>
        </div>
      </div>

      {/* Pinned sticky stage */}
      <div className="relative h-[100svh] min-h-[600px] overflow-hidden">
        {/* Progress rail */}
        <div className="absolute left-5 top-1/2 z-30 hidden h-48 w-px -translate-y-1/2 bg-paper/15 sm:left-8 lg:block">
          <div
            data-progress-line
            className="h-full w-full origin-top bg-champagne"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {/* Panels */}
        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            data-panel={i}
            className="absolute inset-0 flex items-center"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i + 1 }}
          >
            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
              {/* Image */}
              <div className="relative lg:col-span-7">
                <div className="relative aspect-[4/3] w-full overflow-hidden shadow-collage sm:aspect-[16/10] grade-warm">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  <span className="absolute left-3 top-3 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/80">
                    Ch. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-5">
                <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-champagne">
                  {m.year}
                </p>
                <h3 className="mt-3 font-serif text-5xl font-medium tracking-tight text-paper sm:text-6xl">
                  {m.title}
                </h3>
                <p className="mt-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45">
                  {m.place}
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70 sm:text-lg">
                  {m.text}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Chapter counter */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/35">
          {MODEL.name} — The Portfolio Edition
        </div>
      </div>
    </section>
  );
}
