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
    <section id="services" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Services" title="How we can work together" />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted-foreground md:text-right">
              Available for select bookings worldwide. All engagements are
              handled exclusively through the agency.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Camera;
            return (
              <Reveal key={s.title} delay={(i % 4) * 0.08}>
                <div className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-accent">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-medium text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <span className="mt-8 text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
