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
 * CursorFollower (v2)
 * -------------------
 * A premium dual-layer cursor with magnetic snap:
 *  - small precise dot tracks instantly (with magnetic snap to element centers)
 *  - larger ring eases behind (lerp trailing)
 *  - grows + fills champagne when hovering interactive elements
 *  - supports [data-cursor="text"] to show a custom label
 *  - magnetic snap: dot eases toward the hovered element's center
 *
 * Disabled on touch devices and when prefers-reduced-motion.
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: pos.x, y: pos.y }; // dot now also lerps (for magnetic snap)
    const ring = { x: pos.x, y: pos.y };
    const snap = { x: 0, y: 0, active: false };
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        setHidden(false);
      }

      const t = e.target as HTMLElement;
      const interactiveEl = t.closest(
        'a, button, [data-cursor="hover"], input, textarea, select, [role="button"]'
      ) as HTMLElement | null;
      const interactive = !!interactiveEl;
      setActive(interactive);

      // Magnetic snap: if hovering an interactive element, ease dot toward its center
      if (interactiveEl) {
        const r = interactiveEl.getBoundingClientRect();
        snap.x = r.left + r.width / 2;
        snap.y = r.top + r.height / 2;
        snap.active = true;
      } else {
        snap.active = false;
      }

      // Custom label via data-cursor-text
      const labelEl = t.closest("[data-cursor-text]") as HTMLElement | null;
      setLabel(labelEl?.dataset.cursorText || "");

      // Ring follows raw mouse position (no snap)
      if (ringRef.current) {
        // ring updated in loop for trailing effect
      }
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    const loop = () => {
      // Dot: magnetic snap toward element center, else follow mouse
      const dotTargetX = snap.active ? snap.x : pos.x;
      const dotTargetY = snap.active ? snap.y : pos.y;
      // Snap faster when active, normal lerp otherwise
      const dotLerp = snap.active ? 0.22 : 0.45;
      dot.x += (dotTargetX - dot.x) * dotLerp;
      dot.y += (dotTargetY - dot.y) * dotLerp;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }

      // Ring: trails behind mouse (no snap)
      ring.x += (pos.x - ring.x) * 0.14;
      ring.y += (pos.y - ring.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      // Label follows ring
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, calc(-50% + 2.5rem))`;
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
        className={`fixed left-0 top-0 rounded-full border transition-[width,height,background-color,border-color] duration-300 ${
          active
            ? "h-12 w-12 border-champagne/0 bg-champagne/15"
            : label
              ? "h-20 w-20 border-champagne/40 bg-champagne/10"
              : "h-8 w-8 border-ink/40"
        }`}
        style={{ mixBlendMode: active || label ? "normal" : "difference" }}
      />
      {/* Precise dot (hidden when label active) */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 rounded-full bg-ink transition-[opacity] duration-200 ${
          label ? "opacity-0" : "opacity-100"
        } h-1.5 w-1.5`}
        style={{ mixBlendMode: "difference" }}
      />
      {/* Custom label */}
      <div
        ref={labelRef}
        className={`fixed left-0 top-0 font-sans text-[0.5rem] uppercase tracking-wide-2 text-ink transition-opacity duration-300 ${
          label ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
