"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic
 * --------
 * Wraps children in a magnetically-attracted container. As the cursor
 * approaches, the element eases toward it (GPU transform only) and snaps
 * back when the cursor leaves. Respects prefers-reduced-motion.
 *
 * Use for premium CTAs, arrows, and small icon buttons.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <Tag
      ref={ref as any}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("gpu transition-transform duration-500 ease-out", className)}
    >
      {children}
    </Tag>
  );
}
