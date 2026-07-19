"use client";

import {
  Camera,
  Footprints,
  Sparkles,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "./data";
import { Reveal, SectionHeading } from "./reveal";

const ICONS: Record<string, LucideIcon> = {
  Camera,
  Footprints,
  Sparkles,
  Clapperboard,
};

export function Services() {
  return (
    <section id="services" className="grain-light relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-ink/15 pb-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Services — 05" title="How we can work together" />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-ink/60 md:text-right">
              Available for select bookings worldwide. All engagements handled
              exclusively through the agency.
            </p>
          </Reveal>
        </div>

        {/* bordered grid */}
        <div className="mt-12 grid grid-cols-1 border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Camera;
            return (
              <Reveal key={s.title} delay={(i % 4) * 0.08}>
                <div className="group relative flex h-full flex-col border-b border-r border-ink/15 bg-paper p-8 transition-colors hover:bg-accent/40">
                  <span className="absolute left-3 top-3 font-sans text-[0.5rem] uppercase tracking-wide-2 text-ink/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-paper">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-medium tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
