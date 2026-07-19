"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/**
 * RippleButton
 * ------------
 * A button/link with a soft ripple emanating from the click point.
 * GPU-only (scale + opacity on an absolutely-positioned span).
 */
export function RippleButton({
  children,
  onClick,
  className,
  href,
  rippleColor = "rgba(255,255,255,0.4)",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  rippleColor?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:50%;background:${rippleColor};transform:translate(-50%,-50%) scale(0);opacity:0.6;pointer-events:none;z-index:0;`;
    el.appendChild(ripple);

    gsap.to(ripple, {
      scale: 1,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => ripple.remove(),
    });

    onClick?.();
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      className={cn("relative overflow-hidden", className)}
    >
      <span className="relative z-10">{children}</span>
    </a>
  );
}

/**
 * AnimatedBorder
 * --------------
 * A container whose border traces around it on hover (clip-path sweep).
 */
export function AnimatedBorder({
  children,
  className,
  color = "var(--champagne)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={cn("group relative", className)}>
      {/* base border */}
      <div className="absolute inset-0 border border-ink/15 transition-opacity duration-500 group-hover:opacity-0" />
      {/* animated border — sweeps in on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}) no-repeat`,
          backgroundSize: "100% 1px, 1px 100%, 100% 1px, 1px 100%",
          backgroundPosition:
            "0 0, 100% 0, 100% 100%, 0 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * GlassHover
 * ----------
 * A panel that lifts + glows + shifts its glass tint on hover.
 */
export function GlassHover({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-ink/10 bg-ink/[0.02] backdrop-blur-sm transition-all duration-700 hover:border-ink/25 hover:bg-ink/[0.05] hover:shadow-soft",
        className
      )}
    >
      {/* moving light sweep on hover */}
      <div className="pointer-events-none absolute -inset-y-4 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[120%] group-hover:opacity-100" />
      {children}
    </div>
  );
}
