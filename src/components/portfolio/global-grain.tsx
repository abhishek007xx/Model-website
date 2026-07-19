"use client";

/**
 * GlobalGrain
 * -----------
 * A fixed, full-viewport film grain overlay that sits above all content
 * but below the cursor. Adds a subtle, constant film texture for that
 * cinematic "shot on film" feel. Pointer-events disabled so it never
 * blocks interaction. Hidden via CSS for prefers-reduced-motion.
 */
export function GlobalGrain() {
  return (
    <div
      aria-hidden="true"
      className="global-grain pointer-events-none fixed inset-0 z-[70] opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  );
}
