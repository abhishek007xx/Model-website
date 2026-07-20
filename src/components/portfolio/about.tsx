"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT, MODEL } from "./data";
import { RevealImage } from "./reveal-image";
import { SplitText } from "./split-text";
import { ScrambleText, KerningText } from "./text-effects";

gsap.registerPlugin(ScrollTrigger);

/**
 * About — sticky storytelling with parallax overlapping photos.
 *
 * Motion:
 *  - Left photo drifts up slowly (parallax, scrubbed)
 *  - Secondary overlapping photo drifts down faster (depth)
 *  - A small floating detail image crosses between them on scroll
 *  - Headline reveals char-by-char
 *  - Paragraphs fade up line-by-line
 *  - Highlight stats are glass panels with stagger reveal + animated counter
 */
export function About() {
  const root = useRef<HTMLElement>(null);
  const photoPrimary = useRef<HTMLDivElement>(null);
  const photoSecondary = useRef<HTMLDivElement>(null);
  const photoFloat = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Primary photo drifts up slowly
      gsap.to(photoPrimary.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      // Secondary photo drifts down faster (opposite = depth)
      gsap.to(photoSecondary.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      // Floating detail photo crosses diagonally
      gsap.fromTo(
        photoFloat.current,
        { yPercent: 30, xPercent: -10 },
        {
          yPercent: -30,
          xPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="grain-light mesh-bg-paper relative overflow-hidden bg-paper py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Section label */}
        <div className="mb-12 flex items-center justify-between border-b border-ink/15 pb-4">
          <ScrambleText
            as="span"
            duration={1}
            className="font-sans text-[0.6rem] uppercase tracking-luxe text-ink/50"
          >
            About — 01
          </ScrambleText>
          <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/40">
            {MODEL.issue} · {MODEL.season}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Parallax photo cluster */}
          <div className="relative h-[560px] sm:h-[680px] lg:col-span-5">
            {/* Primary photo */}
            <div
              ref={photoPrimary}
              className="gpu absolute left-0 top-0 aspect-[4/5] w-[72%] overflow-hidden shadow-collage"
            >
              <RevealImage
                src={ABOUT.image}
                alt={`Portrait of ${MODEL.name}`}
                variant="mask-left"
                className="h-full w-full"
                sizes="(max-width: 1024px) 65vw, 30vw"
              />
              <span className="absolute left-2 top-2 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/85">
                #004
              </span>
            </div>

            {/* Secondary overlapping photo */}
            <div
              ref={photoSecondary}
              className="gpu absolute bottom-0 right-0 aspect-[3/4] w-[52%] overflow-hidden border-4 border-paper shadow-collage"
            >
              <RevealImage
                src={ABOUT.secondary}
                alt={`${MODEL.name} editorial`}
                variant="mask-bottom"
                className="h-full w-full"
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
              <span className="absolute left-2 top-2 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/85">
                #005
              </span>
            </div>

            {/* Floating detail photo (crosses diagonally on scroll) */}
            <div
              ref={photoFloat}
              className="gpu absolute left-[38%] top-[42%] aspect-square w-[28%] overflow-hidden border-4 border-paper shadow-collage"
            >
              <RevealImage
                src="/portfolio/gallery-11.jpg"
                alt="detail"
                variant="blur-sharp"
                className="h-full w-full"
                sizes="18vw"
              />
            </div>
          </div>

          {/* Text + stats */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <SplitText
              as="span"
              mode="words"
              className="mb-4 block font-sans text-[0.6rem] uppercase tracking-luxe text-ink/50"
            >
              {MODEL.tagline}
            </SplitText>

            <h2 className="font-serif text-5xl font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl text-balance">
              <KerningText as="span" from="0.2em" to="-0.02em" duration={1.4} className="block">
                A modern muse
              </KerningText>
              <KerningText
                as="span"
                from="0.2em"
                to="-0.02em"
                duration={1.4}
                delay={0.3}
                className="block italic text-champagne"
              >
                for an editorial age
              </KerningText>
            </h2>

            <div className="mt-8 space-y-6">
              {ABOUT.paragraphs.map((p, i) => (
                <SplitText
                  key={i}
                  as="p"
                  mode="lines"
                  delay={i * 0.1}
                  stagger={0.08}
                  className="max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg"
                >
                  {p}
                </SplitText>
              ))}
            </div>

            {/* Glass stat panels */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ABOUT.highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="glass flex flex-col gap-1 rounded-sm p-5"
                >
                  <span className="font-serif text-4xl font-semibold tracking-display text-ink">
                    {h.value}
                  </span>
                  <span className="font-sans text-[0.5rem] uppercase tracking-wide-2 text-ink/55">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>

            {/* editorial credit line */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-6 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
              <span>Based in {MODEL.location}</span>
              <span className="hidden h-3 w-px bg-ink/25 sm:block" />
              <span>Represented by {MODEL.agency}</span>
              <span className="hidden h-3 w-px bg-ink/25 sm:block" />
              <span>Available worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
