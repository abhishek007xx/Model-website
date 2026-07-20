"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MODEL } from "./data";

/**
 * Preloader
 * ---------
 * A cinematic intro overlay. A counter 00→100 ticks while the brand
 * name reveals char-by-char, then the whole panel exits via a vertical
 * clip-path wipe. Respects prefers-reduced-motion (skips animation).
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  // Skip rendering entirely for reduced-motion users (lazy init, no effect).
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // skip preloader entirely for reduced-motion users
      return;
    }

    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          // Allow scroll after preloader
          document.body.style.overflow = "";
        },
      });

      // lock scroll during preload
      document.body.style.overflow = "hidden";

      // Counter 00 -> 100
      const obj = { v: 0 };
      tl.to(obj, {
        v: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = String(Math.round(obj.v)).padStart(3, "0");
        },
      });

      // Name char-by-char reveal (split manually to avoid SplitType race)
      const name = MODEL.name;
      if (nameRef.current) {
        nameRef.current.innerHTML = name
          .split("")
          .map(
            (c) =>
              `<span style="display:inline-block;opacity:0;transform:translateY(120%) rotate(8deg)">${c}</span>`
          )
          .join("");
        const chars = nameRef.current.querySelectorAll("span");
        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
          0.2
        );
      }

      // Small hold
      tl.to({}, { duration: 0.4 });

      // Clip-path wipe exit (top + bottom panels slide away)
      tl.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        ease: "power4.inOut",
      });

      // Fade side meta
      tl.to(
        el.querySelectorAll("[data-preloader-meta]"),
        { opacity: 0, duration: 0.5, ease: "power2.out" },
        "<"
      );
    }, el);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="mesh-bg grain fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink text-paper"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      {/* top meta */}
      <div
        data-preloader-meta
        className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/50 sm:px-8"
      >
        <span>{MODEL.issue} · {MODEL.season}</span>
        <span>The Portfolio Edition</span>
        <span>{MODEL.location}</span>
      </div>

      {/* center — name + counter */}
      <div className="flex flex-col items-center gap-6">
        <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50">
          Loading
        </span>
        <h1
          ref={nameRef}
          className="font-serif text-[18vw] font-semibold leading-none tracking-display sm:text-[12vw]"
        >
          {MODEL.name}
        </h1>
        <div className="mt-4 flex items-baseline gap-2">
          <span
            ref={counterRef}
            className="font-serif text-5xl font-light tabular-nums sm:text-7xl"
          >
            000
          </span>
          <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-paper/40">
            / 100
          </span>
        </div>
      </div>

      {/* bottom meta */}
      <div
        data-preloader-meta
        className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/50 sm:px-8"
      >
        <span>{MODEL.tagline}</span>
        <span className="hidden sm:block">An editorial experience</span>
        <span>Represented by {MODEL.agency}</span>
      </div>

      {/* progress line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-paper/10">
        <div
          className="h-full bg-champagne"
          style={{
            animation: "preloaderBar 2.4s ease-in-out forwards",
          }}
        />
      </div>
      <style>{`
        @keyframes preloaderBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
