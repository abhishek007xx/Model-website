"use client";

import { MODEL } from "./data";

type MarqueeProps = {
  items?: string[];
  variant?: "dark" | "light";
  reverse?: boolean;
  duration?: number;
};

export function Marquee({
  items,
  variant = "dark",
  reverse = false,
  duration = 32,
}: MarqueeProps) {
  const words =
    items && items.length > 0
      ? items
      : [
          MODEL.name,
          "Editorial",
          "Runway",
          "Campaign",
          "Tokyo",
          "Paris",
          "New York",
          MODEL.season,
        ];

  // duplicate the list so the animation loops seamlessly
  const loop = [...words, ...words];

  const isDark = variant === "dark";

  return (
    <div
      className={`marquee-paused relative flex w-full overflow-hidden border-y ${
        isDark
          ? "border-paper/15 bg-ink text-paper"
          : "border-ink/15 bg-paper text-ink"
      }`}
    >
      <div
        className="marquee flex shrink-0 items-center gap-8 py-4 sm:py-6"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-serif text-3xl font-medium tracking-wide-display uppercase sm:text-5xl">
              {w}
            </span>
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                isDark ? "bg-champagne" : "bg-champagne"
              }`}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
