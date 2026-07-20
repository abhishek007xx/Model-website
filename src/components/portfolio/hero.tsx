"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { MODEL } from "./data";
import { SplitText } from "./split-text";
import { Magnetic } from "./magnetic";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const bgImg = useRef<HTMLDivElement>(null);
  const fgCloseup = useRef<HTMLDivElement>(null);
  const fgAlt = useRef<HTMLDivElement>(null);
  const wordmark = useRef<HTMLHeadingElement>(null);
  const tiltWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) return;

      // 0. Chromatic entrance — RGB split resolves to sharp on load
      const introTl = gsap.timeline({ delay: 0.2 });
      introTl.fromTo(
        bgImg.current,
        {
          filter: "drop-shadow(8px 0 0 rgba(255,0,80,0.4)) drop-shadow(-8px 0 0 rgba(0,200,255,0.4)) blur(6px)",
          opacity: 0,
        },
        {
          filter: "drop-shadow(0 0 0 rgba(255,0,80,0)) drop-shadow(0 0 0 rgba(0,200,255,0)) blur(0px)",
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        }
      );

      // 1. Slow cinematic Ken Burns zoom on the background image (scrubbed).
      gsap.fromTo(
        bgImg.current,
        { scale: 1.12 },
        {
          scale: 1.22,
          duration: 14,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // 2. Foreground parallax — close-up drifts up slower, alt drifts faster.
      gsap.to(fgCloseup.current, {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(fgAlt.current, {
        yPercent: -55,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // 3. Giant outline wordmark drifts up + fades as you scroll (depth).
      gsap.to(wordmark.current, {
        yPercent: -40,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 4. Whole hero fades + scales slightly on scroll for a cinematic exit.
      gsap.to(tiltWrap.current, {
        opacity: 0,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "70% top",
          scrub: 1,
        },
      });
    }, el);

    // 5. Mouse perspective tilt — extremely subtle, GPU only.
    const onMove = (e: MouseEvent) => {
      if (reduce) return;
      const w = tiltWrap.current;
      if (!w) return;
      const rect = w.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(w, {
        rotateY: px * 3,
        rotateX: -py * 3,
        transformPerspective: 1200,
        transformOrigin: "center",
        duration: 1.2,
        ease: "power2.out",
      });
      // parallax layers move opposite amounts
      gsap.to(bgImg.current, { x: px * -14, y: py * -10, duration: 1.2, ease: "power2.out" });
      gsap.to(fgCloseup.current, { x: px * 18, y: py * 14, duration: 1.2, ease: "power2.out" });
      gsap.to(fgAlt.current, { x: px * 28, y: py * 22, duration: 1.2, ease: "power2.out" });
      gsap.to(wordmark.current, { x: px * -22, y: py * -12, duration: 1.4, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="mesh-bg grain relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Background hero image with slow zoom + parallax */}
      <div
        ref={tiltWrap}
        className="gpu absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div ref={bgImg} className="gpu absolute inset-0 grade-teal-orange">
          <Image
            src={MODEL.heroMain}
            alt={`${MODEL.name} — ${MODEL.tagline}`}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* cinematic depth: vignette + gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.14_0.006_50/0.7)_100%)]" />
        </div>

        {/* Giant outline wordmark behind everything */}
        <h1
          ref={wordmark}
          aria-hidden="true"
          className="text-outline-light pointer-events-none absolute inset-x-0 top-[16%] select-none text-center font-serif text-[24vw] font-semibold leading-none tracking-display sm:text-[20vw]"
        >
          MIZUHARA
        </h1>

        {/* Foreground floating close-up (left) */}
        <div
          ref={fgCloseup}
          className="gpu absolute left-[4%] top-[22%] hidden aspect-[3/4] w-[20%] overflow-hidden shadow-collage sm:block lg:w-[16%]"
        >
          <Image
            src={MODEL.heroCloseup}
            alt="close-up"
            fill
            sizes="18vw"
            className="object-cover object-center"
          />
          <span className="absolute left-2 top-2 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/85">
            #001
          </span>
        </div>

        {/* Foreground floating alt (right) */}
        <div
          ref={fgAlt}
          className="gpu absolute right-[5%] top-[30%] hidden aspect-[3/4] w-[16%] overflow-hidden border-2 border-white/10 shadow-collage lg:block"
        >
          <Image
            src={MODEL.heroAlt}
            alt="editorial"
            fill
            sizes="16vw"
            className="object-cover object-center"
          />
          <span className="absolute left-2 top-2 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/85">
            #002
          </span>
        </div>
      </div>

      {/* Content layer (no tilt, sits above) */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-10 pt-24 sm:px-8 sm:pb-14">
        {/* top meta strip */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/55">
          <span>{MODEL.issue} · {MODEL.season}</span>
          <span className="hidden sm:block">The Portfolio Edition</span>
          <span>{MODEL.location}</span>
        </div>

        {/* center/bottom — title block */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SplitText
              as="p"
              mode="words"
              trigger="load"
              delay={0.2}
              stagger={0.06}
              className="mb-4 font-sans text-[0.6rem] uppercase tracking-luxe text-white/60 sm:text-[0.65rem]"
            >
              {MODEL.tagline}
            </SplitText>

            <h2 className="font-serif text-[14vw] font-semibold leading-[0.92] tracking-display text-white sm:text-[10vw] lg:text-[8.5rem]">
              <SplitText
                as="span"
                mode="chars"
                trigger="load"
                delay={0.4}
                stagger={0.035}
                duration={1.2}
                className="block"
              >
                {"A face that"}
              </SplitText>
              <SplitText
                as="span"
                mode="chars"
                trigger="load"
                delay={0.9}
                stagger={0.035}
                duration={1.2}
                className="block italic text-champagne"
              >
                {"frames a story"}
              </SplitText>
            </h2>
          </div>

          {/* intro + CTAs */}
          <div className="max-w-sm lg:pb-4">
            <SplitText
              as="p"
              mode="lines"
              trigger="load"
              delay={1.4}
              stagger={0.08}
              className="mb-7 text-base leading-relaxed text-white/75"
            >
              {MODEL.heroIntro}
            </SplitText>

            <div className="flex flex-wrap items-center gap-4">
              <Magnetic strength={0.4}>
                <a
                  href="#portfolio"
                  className="btn-glow group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-[0.6rem] uppercase tracking-wide-2 text-ink"
                >
                  View Portfolio
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  className="link-underline font-sans text-[0.6rem] uppercase tracking-wide-2 text-white/70 hover:text-white"
                >
                  Book Mizuhara
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-4">
          <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/45">
            Scroll to explore
          </span>
          <div className="flex items-center gap-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/45">
            <span>Shot. {MODEL.shotBy}</span>
            <span className="h-3 w-px bg-white/25" />
            <span>{MODEL.shotAt}</span>
          </div>
          <ArrowDown className="h-4 w-4 animate-pulse text-white/45" />
        </div>
      </div>
    </section>
  );
}
