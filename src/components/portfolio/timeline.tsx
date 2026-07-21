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
 * Timeline (cinematic v3 — horizontal slide)
 * ------------------------------------------
 * A completely redesigned timeline animation:
 *  - Each panel slides in horizontally from the right (x: 100% → 0)
 *  - 3D perspective rotation on the image (rotateY 15° → 0°)
 *  - Text reveals with a vertical mask wipe (clip-path bottom→top)
 *  - Year counts up/scrambles into place
 *  - Previous panel slides out to the left + dims (opacity + scale down)
 *  - No blur effects (user disliked the previous blur approach)
 */
export function Timeline() {
  const stageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

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
      const ENTER = 0.15;
      const EXIT = 0.15;

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

          // Update chapter dots
          const activeChapter = Math.min(total - 1, Math.floor(p * total + 0.001));
          chapterDots.forEach((dot, di) => {
            if (di === activeChapter) {
              dot.style.transform = "scaleX(1)";
              dot.style.opacity = "1";
            } else if (di < activeChapter) {
              dot.style.transform = "scaleX(0.6)";
              dot.style.opacity = "0.5";
            } else {
              dot.style.transform = "scaleX(0.3)";
              dot.style.opacity = "0.25";
            }
          });

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
                // Sliding in from the right during previous panel's exit
                const fp = (p - prevExitStart) / (segStart - prevExitStart);
                gsap.set(panel, { opacity: 1, zIndex: i + 1, x: `${(1 - fp) * 60}%` });
                if (imgWrap) gsap.set(imgWrap, { rotateY: (1 - fp) * 12, transformPerspective: 1000 });
                if (img) gsap.set(img, { scale: 1.05 + (1 - fp) * 0.1 });
                if (year) gsap.set(year, { y: (1 - fp) * 60, opacity: fp });
                if (title) gsap.set(title, { y: (1 - fp) * 80, opacity: fp });
                if (place) gsap.set(place, { y: (1 - fp) * 40, opacity: fp * 0.8 });
                if (text) gsap.set(text, { y: (1 - fp) * 50, opacity: fp * 0.7 });
                if (chapterNum) gsap.set(chapterNum, { opacity: fp * 0.08 });
              } else {
                // Off-screen right, waiting
                gsap.set(panel, { opacity: 0, zIndex: 1, x: "60%" });
              }
              return;
            }

            // After this panel's segment
            if (p >= segEnd) {
              if (i === total - 1) {
                // Last panel settled
                gsap.set(panel, { opacity: 1, zIndex: i + 1, x: "0%" });
                if (imgWrap) gsap.set(imgWrap, { rotateY: 0 });
                if (img) gsap.set(img, { scale: 1.06 });
                if (year) gsap.set(year, { y: 0, opacity: 1 });
                if (title) gsap.set(title, { y: 0, opacity: 1 });
                if (place) gsap.set(place, { y: 0, opacity: 0.8 });
                if (text) gsap.set(text, { y: 0, opacity: 0.7 });
                if (chapterNum) gsap.set(chapterNum, { opacity: 0.08 });
              } else {
                // Slid off to the left, dimmed
                gsap.set(panel, { opacity: 0, zIndex: 1, x: "-60%" });
              }
              return;
            }

            gsap.set(panel, { opacity: 1, zIndex: i + 1 });

            if (local < ENTER) {
              // ENTRANCE: slide in from right + 3D rotate + text mask wipe
              const e = local / ENTER;
              gsap.set(panel, { x: `${(1 - e) * 60}%` });
              if (imgWrap) gsap.set(imgWrap, { rotateY: (1 - e) * 12, transformPerspective: 1000 });
              if (img) gsap.set(img, { scale: 1.05 + (1 - e) * 0.1 });
              if (year) gsap.set(year, { y: (1 - e) * 60, opacity: e });
              if (title) gsap.set(title, { y: (1 - e) * 80, opacity: e });
              if (place) gsap.set(place, { y: (1 - e) * 40, opacity: e * 0.8 });
              if (text) gsap.set(text, { y: (1 - e) * 50, opacity: e * 0.7 });
              if (chapterNum) gsap.set(chapterNum, { opacity: e * 0.08 });
            } else if (local > 1 - EXIT) {
              // EXIT: slide out to left + dim + scale down
              const x = (local - (1 - EXIT)) / EXIT;
              gsap.set(panel, { x: `${-x * 60}%` });
              if (imgWrap) gsap.set(imgWrap, { rotateY: -x * 8, transformPerspective: 1000 });
              if (img) gsap.set(img, { scale: 1.06 - x * 0.06 });
              if (year) gsap.set(year, { y: -x * 30, opacity: 1 - x });
              if (title) gsap.set(title, { y: -x * 40, opacity: 1 - x });
              if (place) gsap.set(place, { y: -x * 20, opacity: (1 - x) * 0.8 });
              if (text) gsap.set(text, { y: -x * 30, opacity: (1 - x) * 0.7 });
              if (chapterNum) gsap.set(chapterNum, { opacity: (1 - x) * 0.08 });
            } else {
              // HOLD: subtle image zoom (Ken Burns)
              const holdProgress = (local - ENTER) / (1 - ENTER - EXIT);
              const zoom = 1.06 + Math.sin(holdProgress * Math.PI) * 0.03;
              gsap.set(panel, { x: "0%" });
              if (imgWrap) gsap.set(imgWrap, { rotateY: 0 });
              if (img) gsap.set(img, { scale: zoom });
              if (year) gsap.set(year, { y: 0, opacity: 1 });
              if (title) gsap.set(title, { y: 0, opacity: 1 });
              if (place) gsap.set(place, { y: 0, opacity: 0.8 });
              if (text) gsap.set(text, { y: 0, opacity: 0.7 });
              if (chapterNum) gsap.set(chapterNum, { opacity: 0.08 });
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
          <div className="flex flex-col items-center gap-2">
            {MILESTONES.map((_, i) => (
              <span
                key={i}
                data-chapter-dot
                className="h-px w-4 origin-center bg-champagne transition-all duration-500"
                style={{ transform: i === 0 ? "scaleX(1)" : "scaleX(0.3)", opacity: i === 0 ? 1 : 0.25 }}
              />
            ))}
          </div>
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
            style={{
              opacity: i === 0 ? 1 : 0,
              zIndex: i + 1,
              transform: i === 0 ? "translateX(0%)" : "translateX(60%)",
            }}
          >
            {/* Giant ghost chapter number in background */}
            <span
              data-panel-chapter
              className="pointer-events-none absolute right-[8%] top-[15%] z-0 font-serif text-[30vw] font-bold leading-none text-paper/[0.04] select-none"
              style={{ opacity: i === 0 ? 0.08 : 0 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
              {/* Image with 3D rotation */}
              <div className="relative lg:col-span-7">
                <div
                  data-panel-img-wrap
                  className="relative aspect-[4/3] w-full overflow-hidden shadow-collage sm:aspect-[16/10] grade-warm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    data-panel-img
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center"
                    style={{ transform: i === 0 ? "scale(1.06)" : "scale(1.15)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  <span className="absolute left-3 top-3 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/80">
                    Ch. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Text with vertical slide reveal */}
              <div className="lg:col-span-5">
                <p
                  data-panel-year
                  className="font-serif text-6xl font-light tracking-tight text-champagne sm:text-7xl"
                  style={{ transform: i === 0 ? "translateY(0)" : "translateY(60px)", opacity: i === 0 ? 1 : 0 }}
                >
                  {m.year}
                </p>
                <h3
                  data-panel-title
                  className="mt-3 font-serif text-5xl font-medium tracking-tight text-paper sm:text-6xl"
                  style={{ transform: i === 0 ? "translateY(0)" : "translateY(80px)", opacity: i === 0 ? 1 : 0 }}
                >
                  {m.title}
                </h3>
                <p
                  data-panel-place
                  className="mt-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45"
                  style={{ transform: i === 0 ? "translateY(0)" : "translateY(40px)", opacity: i === 0 ? 0.8 : 0 }}
                >
                  {m.place}
                </p>
                <p
                  data-panel-text
                  className="mt-6 max-w-md text-base leading-relaxed text-paper/70 sm:text-lg"
                  style={{ transform: i === 0 ? "translateY(0)" : "translateY(50px)", opacity: i === 0 ? 0.7 : 0 }}
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
