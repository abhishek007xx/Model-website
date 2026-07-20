"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CREDITS, MODEL } from "./data";
import { SplitText } from "./split-text";
import { ScrambleText } from "./text-effects";
import { Marquee } from "./marquee";

gsap.registerPlugin(ScrollTrigger);

/**
 * Experience — pinned horizontal credits scroll.
 *
 * The fashion houses scroll horizontally while the section is pinned,
 * with a morphing background that shifts hue subtly on scroll.
 * Publications sit below as an italic serif list, framed by marquee bands.
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Background morph — subtle hue/scale shift on scroll
      gsap.fromTo(
        bgRef.current,
        { scale: 1.05, opacity: 0.6 },
        {
          scale: 1.2,
          opacity: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={root} className="relative bg-ink">
      {/* Marquee band on top */}
      <Marquee variant="light" reverse duration={38} />

      {/* Morphing background layer */}
      <div
        ref={bgRef}
        className="mesh-bg pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 30%, oklch(0.30 0.05 70 / 0.5) 0px, transparent 50%), radial-gradient(at 80% 70%, oklch(0.25 0.03 50 / 0.5) 0px, transparent 50%)",
        }}
      />

      {/* Pinned horizontal houses scroll — fills viewport */}
      <div className="relative flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-10 flex items-center justify-between px-5 sm:px-8">
          <ScrambleText
            as="span"
            duration={1.2}
            className="font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50"
          >
            Experience — 04 · Fashion Houses
          </ScrambleText>
          <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/40">
            {String(CREDITS.houses.length).padStart(2, "0")} credits
          </span>
        </div>

        {/* horizontal track */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex items-center gap-8 px-[8vw] sm:gap-16 sm:px-[12vw]">
            {CREDITS.houses.map((h, i) => (
              <div
                key={h}
                className="group relative flex h-[40vh] shrink-0 flex-col justify-between border border-paper/15 bg-paper/[0.03] p-8 backdrop-blur-sm sm:h-[48vh] sm:w-[36vw] lg:w-[26vw]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/35">
                    {MODEL.season}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-4xl font-medium tracking-wide-display text-paper transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl">
                    {h}
                  </h3>
                  <p className="mt-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45">
                    House · Campaign
                  </p>
                </div>
                <div className="flex items-center justify-between font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/30">
                  <span>Couture & RTW</span>
                  <span>{MODEL.shotAt}</span>
                </div>
              </div>
            ))}
            {/* end card */}
            <div className="flex h-[40vh] w-[30vw] shrink-0 flex-col items-center justify-center sm:w-[24vw]">
              <p className="font-serif text-3xl italic text-paper/60 sm:text-4xl">
                &amp;
              </p>
              <p className="mt-3 font-sans text-[0.55rem] uppercase tracking-luxe text-paper/40">
                publications below
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Publications — italic serif list (not pinned) */}
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-12 flex items-center justify-between border-b border-paper/15 pb-4">
          <SplitText
            as="span"
            mode="words"
            className="font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50"
          >
            Publications
          </SplitText>
          <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/40">
            {String(CREDITS.publications.length).padStart(2, "0")} features
          </span>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden border border-paper/15 bg-paper/12 sm:grid-cols-4">
          {CREDITS.publications.map((p, i) => (
            <div
              key={p}
              className="flex h-28 items-center justify-center bg-ink transition-colors hover:bg-paper/5"
            >
              <span className="font-serif text-2xl italic text-paper/60 transition-colors hover:text-paper sm:text-3xl">
                {p}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45">
          <span>Selected credits · {MODEL.season}</span>
          <span>Full CV available on request</span>
          <span>{MODEL.agency}</span>
        </div>
      </div>

      {/* Marquee band on bottom */}
      <Marquee variant="dark" duration={42} />
    </section>
  );
}
