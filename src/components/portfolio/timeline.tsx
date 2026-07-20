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
 * Timeline (cinematic)
 * --------------------
 * A scroll-driven cinematic timeline with animated panels.
 *
 * - Pin is attached to the STAGE only (after header scrolls away)
 * - Each panel: 12% animated entrance → 76% hold (with subtle Ken Burns) → 12% animated exit
 * - Entrance: image scales 1.15→1 + clip-path iris open, text slides up + fades in (staggered)
 * - Exit: image scales 1→1.08 + fades, text slides up + fades out
 * - During hold: image has a subtle continuous scale drift (Ken Burns)
 */
export function Timeline() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const panels = stage.querySelectorAll<HTMLElement>("[data-panel]");
      const progressLine = stage.querySelector<HTMLElement>("[data-progress-line]");

      const total = panels.length;
      // 12% entrance, 76% hold, 12% exit
      const ENTER = 0.12;
      const EXIT = 0.12;

      ScrollTrigger.create({
        trigger: stage,
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
            const segSize = segEnd - segStart;
            const local = gsap.utils.clamp(0, 1, (p - segStart) / segSize);

            const img = panel.querySelector<HTMLElement>("[data-panel-img]");
            const imgWrap = panel.querySelector<HTMLElement>("[data-panel-img-wrap]");
            const year = panel.querySelector<HTMLElement>("[data-panel-year]");
            const title = panel.querySelector<HTMLElement>("[data-panel-title]");
            const place = panel.querySelector<HTMLElement>("[data-panel-place]");
            const text = panel.querySelector<HTMLElement>("[data-panel-text]");

            // Before this panel's segment — hidden (unless entering from prev's exit)
            if (p < segStart) {
              const prevExitStart = segStart - segSize * EXIT;
              if (i > 0 && p >= prevExitStart) {
                // Entering during previous panel's exit
                const fp = (p - prevExitStart) / (segStart - prevExitStart);
                gsap.set(panel, { opacity: 1, zIndex: i + 1 });
                if (imgWrap) gsap.set(imgWrap, { clipPath: `inset(${(1-fp)*50}% ${(1-fp)*50}% ${(1-fp)*50}% ${(1-fp)*50}%)` });
                if (img) gsap.set(img, { scale: 1.15 - fp * 0.08, opacity: fp });
                if (year) gsap.set(year, { y: (1-fp)*40, opacity: fp });
                if (title) gsap.set(title, { y: (1-fp)*50, opacity: fp });
                if (place) gsap.set(place, { y: (1-fp)*30, opacity: fp * 0.8 });
                if (text) gsap.set(text, { y: (1-fp)*40, opacity: fp * 0.7 });
              } else {
                gsap.set(panel, { opacity: 0, zIndex: 1 });
              }
              return;
            }

            // After this panel's segment
            if (p >= segEnd) {
              if (i === total - 1) {
                // last panel stays visible, settled
                gsap.set(panel, { opacity: 1, zIndex: i + 1 });
                if (imgWrap) gsap.set(imgWrap, { clipPath: "inset(0% 0% 0% 0%)" });
                if (img) gsap.set(img, { scale: 1.02, opacity: 1 });
                if (year) gsap.set(year, { y: 0, opacity: 1 });
                if (title) gsap.set(title, { y: 0, opacity: 1 });
                if (place) gsap.set(place, { y: 0, opacity: 0.8 });
                if (text) gsap.set(text, { y: 0, opacity: 0.7 });
              } else {
                gsap.set(panel, { opacity: 0, zIndex: 1 });
              }
              return;
            }

            // Within this panel's segment
            gsap.set(panel, { opacity: 1, zIndex: i + 1 });

            if (local < ENTER) {
              // ENTRANCE: image iris-opens + scales down, text slides up
              const e = local / ENTER; // 0→1
              if (imgWrap) gsap.set(imgWrap, { clipPath: `inset(${(1-e)*50}% ${(1-e)*50}% ${(1-e)*50}% ${(1-e)*50}%)` });
              if (img) gsap.set(img, { scale: 1.15 - e * 0.08, opacity: e });
              if (year) gsap.set(year, { y: (1-e)*40, opacity: e });
              if (title) gsap.set(title, { y: (1-e)*50, opacity: e });
              if (place) gsap.set(place, { y: (1-e)*30, opacity: e * 0.8 });
              if (text) gsap.set(text, { y: (1-e)*40, opacity: e * 0.7 });
            } else if (local > 1 - EXIT) {
              // EXIT: image scales up + fades, text slides up + fades
              const x = (local - (1 - EXIT)) / EXIT; // 0→1
              if (imgWrap) gsap.set(imgWrap, { clipPath: "inset(0% 0% 0% 0%)" });
              if (img) gsap.set(img, { scale: 1.07 + x * 0.06, opacity: 1 - x * 0.5 });
              if (year) gsap.set(year, { y: -x * 30, opacity: 1 - x });
              if (title) gsap.set(title, { y: -x * 40, opacity: 1 - x });
              if (place) gsap.set(place, { y: -x * 20, opacity: (1 - x) * 0.8 });
              if (text) gsap.set(text, { y: -x * 30, opacity: (1 - x) * 0.7 });
            } else {
              // HOLD: subtle Ken Burns drift on the image
              const holdProgress = (local - ENTER) / (1 - ENTER - EXIT); // 0→1
              const drift = Math.sin(holdProgress * Math.PI) * 0.04; // 0→0.04→0
              if (imgWrap) gsap.set(imgWrap, { clipPath: "inset(0% 0% 0% 0%)" });
              if (img) gsap.set(img, { scale: 1.07 + drift, opacity: 1 });
              if (year) gsap.set(year, { y: 0, opacity: 1 });
              if (title) gsap.set(title, { y: 0, opacity: 1 });
              if (place) gsap.set(place, { y: 0, opacity: 0.8 });
              if (text) gsap.set(text, { y: 0, opacity: 0.7 });
            }
          });
        },
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-ink">
      {/* Section header (scrolls naturally, NOT pinned) */}
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

      {/* Pinned stage — pin triggers ONLY on this element */}
      <div
        ref={stageRef}
        className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink"
      >
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
              {/* Image with clip-path iris + scale animation */}
              <div className="relative lg:col-span-7">
                <div
                  data-panel-img-wrap
                  className="relative aspect-[4/3] w-full overflow-hidden shadow-collage sm:aspect-[16/10] grade-warm"
                  style={{ clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)" }}
                >
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    data-panel-img
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center"
                    style={{ transform: i === 0 ? "scale(1.07)" : "scale(1.15)", opacity: i === 0 ? 1 : 0 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  <span className="absolute left-3 top-3 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/80">
                    Ch. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Text with staggered slide-up animation */}
              <div className="lg:col-span-5">
                <p
                  data-panel-year
                  className="font-sans text-[0.6rem] uppercase tracking-luxe text-champagne"
                  style={{ transform: i === 0 ? "translateY(0)" : "translateY(40px)", opacity: i === 0 ? 1 : 0 }}
                >
                  {m.year}
                </p>
                <h3
                  data-panel-title
                  className="mt-3 font-serif text-5xl font-medium tracking-tight text-paper sm:text-6xl"
                  style={{ transform: i === 0 ? "translateY(0)" : "translateY(50px)", opacity: i === 0 ? 1 : 0 }}
                >
                  {m.title}
                </h3>
                <p
                  data-panel-place
                  className="mt-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45"
                  style={{ transform: i === 0 ? "translateY(0)" : "translateY(30px)", opacity: i === 0 ? 0.8 : 0 }}
                >
                  {m.place}
                </p>
                <p
                  data-panel-text
                  className="mt-6 max-w-md text-base leading-relaxed text-paper/70 sm:text-lg"
                  style={{ transform: i === 0 ? "translateY(0)" : "translateY(40px)", opacity: i === 0 ? 0.7 : 0 }}
                >
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
