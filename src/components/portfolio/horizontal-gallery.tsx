"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY, MODEL } from "./data";
import { SplitText } from "./split-text";

gsap.registerPlugin(ScrollTrigger);

// Curated selection for the horizontal filmstrip — varied aspects.
const HORIZONTAL_ITEMS = [
  GALLERY[0], // Quiet Strength — tall
  GALLERY[6], // Reverie — wide
  GALLERY[3], // Linen & Light — std
  GALLERY[8], // In Motion — tall
  GALLERY[4], // Golden Hour — square
  GALLERY[10], // Detail — square
  GALLERY[5], // Noir — tall
];

const aspectClass: Record<string, string> = {
  tall: "h-[70vh] w-[42vw] sm:w-[32vw] lg:w-[26vw]",
  square: "h-[70vh] w-[42vw] sm:w-[32vw] lg:w-[26vw]",
  wide: "h-[60vh] w-[70vw] sm:w-[55vw] lg:w-[42vw]",
  std: "h-[70vh] w-[42vw] sm:w-[32vw] lg:w-[26vw]",
};

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, {
                scaleX: self.progress,
              });
            }
          },
        },
      });

      // Parallax depth: each image moves at a slightly different rate
      // than its card, creating layered depth.
      const imgs = track.querySelectorAll<HTMLElement>("[data-depth]");
      imgs.forEach((img) => {
        const depth = parseFloat(img.dataset.depth || "0.1");
        gsap.fromTo(
          img,
          { xPercent: -depth * 100 },
          {
            xPercent: depth * 100,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              scrub: 1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-ink"
    >
      {/* top label */}
      <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-5 py-4 sm:px-8">
        <SplitText
          as="span"
          mode="words"
          className="font-sans text-[0.6rem] uppercase tracking-luxe text-white/50"
        >
          The Filmstrip
        </SplitText>
        <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/40">
          {String(HORIZONTAL_ITEMS.length).padStart(2, "0")} Frames
        </span>
      </div>

      {/* horizontal track */}
      <div className="flex h-full items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-6 px-[10vw] sm:gap-10 sm:px-[12vw]"
        >
          {HORIZONTAL_ITEMS.map((item, i) => (
            <div
              key={item.src}
              className={`group relative shrink-0 overflow-hidden ${aspectClass[item.aspect]}`}
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="40vw"
                  className="object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  data-depth={i % 2 === 0 ? "0.08" : "-0.06"}
                />
              </div>
              {/* gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              {/* number */}
              <span className="absolute left-3 top-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/80">
                #{String(i + 1).padStart(3, "0")}
              </span>
              {/* caption */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/55">
                  {item.category}
                </p>
                <p className="font-serif text-xl text-white sm:text-2xl">
                  {item.title}
                </p>
              </div>
            </div>
          ))}

          {/* end card */}
          <div className="flex h-[60vh] w-[40vw] shrink-0 flex-col items-center justify-center sm:w-[30vw]">
            <p className="font-serif text-3xl italic text-white/60 sm:text-4xl">
              Continue
            </p>
            <p className="mt-2 font-sans text-[0.55rem] uppercase tracking-luxe text-white/40">
              to the full gallery
            </p>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="absolute bottom-0 left-0 z-20 h-px w-full bg-white/10">
        <div
          ref={progressRef}
          className="h-full origin-left bg-champagne"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
