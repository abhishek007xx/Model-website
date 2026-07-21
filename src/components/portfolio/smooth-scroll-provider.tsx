"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScrollProvider
 * --------------------
 * Wires up Lenis (premium smooth/inertia scrolling) and syncs it with
 * GSAP ScrollTrigger so every scroll-driven animation rides the same
 * smoothed scroll position. Falls back to native scroll when the user
 * prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    if (reduce) {
      // Keep ScrollTrigger accurate without smooth scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.09,
    });

    // Drive Lenis with GSAP's ticker for a single rAF loop.
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Anchor links should use Lenis smoothing.
    const handleAnchor = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -10, duration: 1.4 });
    };
    document.addEventListener("click", handleAnchor);

    // Refresh ScrollTrigger after fonts/images settle.
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    // Also refresh when web fonts load (layout shift correction)
    const onFontsReady = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onFontsReady);
    }
    // Refresh when the window loads (all images)
    window.addEventListener("load", onFontsReady);

    return () => {
      document.removeEventListener("click", handleAnchor);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", onFontsReady);
    };
  }, []);

  return <>{children}</>;
}
