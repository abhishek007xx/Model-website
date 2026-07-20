"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/**
 * MagneticImage
 * -------------
 * A premium image container that tilts toward the cursor (3D perspective)
 * while the inner image parallax-shifts in the opposite direction —
 * creating a layered depth effect on hover. Settles back on leave.
 *
 * Inspired by Active Theory / Cabinet of Curiosities image hovers.
 * GPU-only (transform). Respects prefers-reduced-motion.
 */
export function MagneticImage({
  children,
  className,
  maxTilt = 6,
  parallax = 18,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  parallax?: number;
  glare?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Tilt the container in 3D
      gsap.to(wrap, {
        rotateY: x * maxTilt * 2,
        rotateX: -y * maxTilt * 2,
        transformPerspective: 800,
        transformOrigin: "center",
        duration: 0.6,
        ease: "power2.out",
      });

      // Inner image parallax (opposite direction = depth)
      gsap.to(inner, {
        x: -x * parallax,
        y: -y * parallax,
        scale: 1.08,
        duration: 0.6,
        ease: "power2.out",
      });

      // Glare follows cursor
      if (glare && glareRef.current) {
        gsap.to(glareRef.current, {
          opacity: 0.25,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const onLeave = () => {
      gsap.to(wrap, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(inner, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
      if (glare && glareRef.current) {
        gsap.to(glareRef.current, { opacity: 0, duration: 0.6 });
      }
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTilt, parallax, glare]);

  return (
    <div
      ref={wrapRef}
      className={cn("gpu relative overflow-hidden", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div ref={innerRef} className="gpu relative h-full w-full">
        {children}
      </div>
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}
