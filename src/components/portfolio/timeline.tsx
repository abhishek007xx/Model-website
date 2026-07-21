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
 * Timeline (cinematic v2)
 * -----------------------
 * Enhanced scroll-driven timeline with layered animations:
 *  - Image: clip-path iris + scale + blur-to-sharp + Ken Burns drift
 *  - Year: huge typographic scale-down (1.5→1) + blur
 *  - Title: slide-up + blur-to-sharp
 *  - Text: parallax drift (moves slower than image = depth)
 *  - Animated chapter counter in corner
 *  - Per-chapter progress dots on the rail
 */
export function Timeline() {
  const stageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

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
      const chapterDots = stage.querySelectorAll<HTMLElement>("[data-chapter-dot]");
      const counter = counterRef.current;

      const total = panels.length;
      const ENTER = 0.14;
      const EXIT = 0.14;

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

          // Update chapter dots — active one expands
          const activeChapter = Math.min(total - 1, Math.floor(p * total));
          chapterDots.forEach((dot, di) => {
            if (di === activeChapter) {
              dot.style.transform = "scaleX(1)";
              dot.style.opacity = "1";
            } else {
              dot.style.transform = "scaleX(0.3)";
              dot.style.opacity = "0.3";
            }
          });

          // Update animated chapter counter
          if (counter) {
            counter.textContent = String(activeChapter + 1).padStart(2, "0");
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
            const chapterNum = panel.querySelector<HTMLElement>("[data-panel-chapter]");

            // Before this panel's segment
            if (p < segStart) {
              const prevExitStart = segStart - segSize * EXIT;
              if (i > 0 && p >= prevExitStart) {
                const fp = (p - prevExitStart) / (segStart - prevExitStart);
                gsap.set(panel, { opacity: 1, zIndex: i + 1 });
                if (imgWrap) gsap.set(imgWrap, { clipPath: `inset(${(1-fp)*50}% ${(1-fp)*50}% ${(1-fp)*50}% ${(1-fp)*50}%)` });
                if (img) gsap.set(img, { scale: 1.18 - fp * 0.08, opacity: fp, filter: `blur(${(1-fp)*12}px)` });
                if (year) gsap.set(year, { scale: 1.5 - fp * 0.5, opacity: fp, filter: `blur(${(1-fp)*8}px)` });
                if (title) gsap.set(title, { y: (1-fp)*50, opacity: fp, filter: `blur(${(1-fp)*6}px)` });
                if (place) gsap.set(place, { y: (1-fp)*30, opacity: fp * 0.8 });
                if (text) gsap.set(text, { y: (1-fp)*40, opacity: fp * 0.7 });
                if (chapterNum) gsap.set(chapterNum, { opacity: fp * 0.15 });
              } else {
                gsap.set(panel, { opacity: 0, zIndex: 1 });
              }
              return;
            }

            // After this panel's segment
            if (p >= segEnd) {
              if (i === total - 1) {
                gsap.set(panel, { opacity: 1, zIndex: i + 1 });
                if (imgWrap) gsap.set(imgWrap, { clipPath: "inset(0% 0% 0% 0%)" });
                if (img) gsap.set(img, { scale: 1.03, opacity: 1, filter: "blur(0px)" });
                if (year) gsap.set(year, { scale: 1, opacity: 1, filter: "blur(0px)" });
                if (title) gsap.set(title, { y: 0, opacity: 1, filter: "blur(0px)" });
                if (place) gsap.set(place, { y: 0, opacity: 0.8 });
                if (text) gsap.set(text, { y: 0, opacity: 0.7 });
                if (chapterNum) gsap.set(chapterNum, { opacity: 0.15 });
              } else {
                gsap.set(panel, { opacity: 0, zIndex: 1 });
              }
              return;
            }

            gsap.set(panel, { opacity: 1, zIndex: i + 1 });

            if (local < ENTER) {
              // ENTRANCE: dramatic iris + blur-to-sharp + scale
              const e = local / ENTER;
              if (imgWrap) gsap.set(imgWrap, { clipPath: `inset(${(1-e)*50}% ${(1-e)*50}% ${(1-e)*50}% ${(1-e)*50}%)` });
              if (img) gsap.set(img, { scale: 1.18 - e * 0.08, opacity: e, filter: `blur(${(1-e)*12}px)` });
              if (year) gsap.set(year, { scale: 1.5 - e * 0.5, opacity: e, filter: `blur(${(1-e)*8}px)` });
              if (title) gsap.set(title, { y: (1-e)*50, opacity: e, filter: `blur(${(1-e)*6}px)` });
              if (place) gsap.set(place, { y: (1-e)*30, opacity: e * 0.8 });
              if (text) gsap.set(text, { y: (1-e)*40, opacity: e * 0.7 });
              if (chapterNum) gsap.set(chapterNum, { opacity: e * 0.15 });
            } else if (local > 1 - EXIT) {
              // EXIT: recede + blur + slide up
              const x = (local - (1 - EXIT)) / EXIT;
              if (imgWrap) gsap.set(imgWrap, { clipPath: "inset(0% 0% 0% 0%)" });
              if (img) gsap.set(img, { scale: 1.10 + x * 0.08, opacity: 1 - x * 0.4, filter: `blur(${x*8}px)` });
              if (year) gsap.set(year, { scale: 1 + x * 0.15, opacity: 1 - x, filter: `blur(${x*6}px)` });
              if (title) gsap.set(title, { y: -x * 40, opacity: 1 - x, filter: `blur(${x*4}px)` });
              if (place) gsap.set(place, { y: -x * 20, opacity: (1 - x) * 0.8 });
              if (text) gsap.set(text, { y: -x * 30, opacity: (1 - x) * 0.7 });
              if (chapterNum) gsap.set(chapterNum, { opacity: (1 - x) * 0.15 });
            } else {
              // HOLD: Ken Burns drift + parallax depth
              const holdProgress = (local - ENTER) / (1 - ENTER - EXIT);
              const drift = Math.sin(holdProgress * Math.PI) * 0.04;
              const parallaxY = Math.sin(holdProgress * Math.PI) * 8; // text drifts for depth
              if (imgWrap) gsap.set(imgWrap, { clipPath: "inset(0% 0% 0% 0%)" });
              if (img) gsap.set(img, { scale: 1.10 + drift, opacity: 1, filter: "blur(0px)" });
              if (year) gsap.set(year, { scale: 1, opacity: 1, filter: "blur(0px)" });
              if (title) gsap.set(title, { y: 0, opacity: 1, filter: "blur(0px)" });
              if (place) gsap.set(place, { y: parallaxY * 0.5, opacity: 0.8 });
              if (text) gsap.set(text, { y: parallaxY, opacity: 0.7 });
              if (chapterNum) gsap.set(chapterNum, { opacity: 0.15 });
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

      {/* Pinned stage */}
      <div
        ref={stageRef}
        className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink"
      >
        {/* Progress rail with chapter dots */}
        <div className="absolute left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 sm:left-8 lg:flex">
          {/* chapter dots */}
          <div className="flex flex-col items-center gap-2">
            {MILESTONES.map((_, i) => (
              <span
                key={i}
                data-chapter-dot
                className="h-px w-4 origin-center bg-champagne transition-all duration-500"
                style={{ transform: i === 0 ? "scaleX(1)" : "scaleX(0.3)", opacity: i === 0 ? 1 : 0.3 }}
              />
            ))}
          </div>
          {/* vertical progress line */}
          <div className="relative mt-2 h-32 w-px bg-paper/15">
            <div
              data-progress-line
              className="absolute inset-0 origin-top bg-champagne"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
        </div>

        {/* Animated chapter counter (top-right) */}
        <div className="absolute right-5 top-8 z-30 hidden items-baseline gap-2 sm:right-8 lg:flex">
          <span
            ref={counterRef}
            className="font-serif text-6xl font-light tabular-nums text-paper/20"
          >
            01
          </span>
          <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/30">
            / {String(MILESTONES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Panels */}
        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            data-panel={i}
            className="absolute inset-0 flex items-center"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i + 1 }}
          >
            {/* Giant ghost chapter number in background */}
            <span
              data-panel-chapter
              className="pointer-events-none absolute right-[8%] top-[15%] z-0 font-serif text-[30vw] font-bold leading-none text-paper/[0.04] select-none"
              style={{ opacity: i === 0 ? 0.15 : 0 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
              {/* Image */}
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
                    style={{
                      transform: i === 0 ? "scale(1.10)" : "scale(1.18)",
                      opacity: i === 0 ? 1 : 0,
                      filter: i === 0 ? "blur(0px)" : "blur(12px)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  <span className="absolute left-3 top-3 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/80">
                    Ch. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-5">
                <p
                  data-panel-year
                  className="font-serif text-6xl font-light tracking-tight text-champagne sm:text-7xl"
                  style={{
                    transform: i === 0 ? "scale(1)" : "scale(1.5)",
                    opacity: i === 0 ? 1 : 0,
                    filter: i === 0 ? "blur(0px)" : "blur(8px)",
                  }}
                >
                  {m.year}
                </p>
                <h3
                  data-panel-title
                  className="mt-3 font-serif text-5xl font-medium tracking-tight text-paper sm:text-6xl"
                  style={{
                    transform: i === 0 ? "translateY(0)" : "translateY(50px)",
                    opacity: i === 0 ? 1 : 0,
                    filter: i === 0 ? "blur(0px)" : "blur(6px)",
                  }}
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

        {/* Footer label */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/35">
          {MODEL.name} — The Portfolio Edition
        </div>
      </div>
    </section>
  );
}
