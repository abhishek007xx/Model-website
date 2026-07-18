"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Detect fine-pointer + motion-OK without setState-in-effect.
const subscribe = () => () => {};
const getSnapshot = () =>
  typeof window !== "undefined"
    ? window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
const getServerSnapshot = () => false;

/**
 * CursorFollower
 * --------------
 * A premium dual-layer cursor:
 *  - a small precise dot that tracks instantly
 *  - a larger ring that eases behind it (lerp) for a "trailing" feel
 * Grows + inverts when hovering interactive elements (a, button, [data-cursor]).
 * Disabled on touch devices and when prefers-reduced-motion.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        setHidden(false);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement;
      const interactive = !!t.closest(
        'a, button, [data-cursor="hover"], input, textarea, select, [role="button"]'
      );
      setActive(interactive);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] ${hidden ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
    >
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 h-8 w-8 rounded-full border transition-[width,height,background-color,border-color] duration-300 ${
          active
            ? "h-14 w-14 border-champagne/0 bg-champagne/15"
            : "border-ink/40"
        }`}
        style={{ mixBlendMode: active ? "normal" : "difference" }}
      />
      {/* Precise dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 rounded-full bg-ink transition-[width,height] duration-300 ${
          active ? "h-1.5 w-1.5" : "h-1.5 w-1.5"
        }`}
        style={{ mixBlendMode: "difference" }}
      />
    </div>
  );
}
