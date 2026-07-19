"use client";

import {
  Camera,
  Footprints,
  Sparkles,
  Clapperboard,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, MODEL } from "./data";
import { SplitText } from "./split-text";
import { GlassHover } from "./micro-interactions";
import { Magnetic } from "./magnetic";

const ICONS: Record<string, LucideIcon> = {
  Camera,
  Footprints,
  Sparkles,
  Clapperboard,
};

export function Services() {
  return (
    <section id="services" className="grain mesh-bg relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-paper/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SplitText as="span" mode="words" className="mb-4 block font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50">
              Services — 05
            </SplitText>
            <h2 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl text-balance">
              <SplitText as="span" mode="chars" stagger={0.035} duration={1.1} className="block">
                How we can
              </SplitText>
              <SplitText as="span" mode="chars" stagger={0.035} duration={1.1} delay={0.3} className="block italic text-champagne">
                work together
              </SplitText>
            </h2>
          </div>
          <SplitText as="p" mode="lines" delay={0.2} stagger={0.08} className="max-w-sm text-sm text-paper/60 md:text-right">
            Available for select bookings worldwide. All engagements handled exclusively through the agency.
          </SplitText>
        </div>

        {/* Service cards — glass hover with light sweep */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Camera;
            return (
              <Magnetic key={s.title} strength={0.08}>
                <GlassHover className="group relative h-full p-8">
                  {/* number */}
                  <span className="absolute left-5 top-5 font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* arrow */}
                  <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-paper/30 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne" />
                  {/* icon */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/25 text-paper transition-all duration-500 group-hover:bg-paper group-hover:text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  {/* title */}
                  <h3 className="mt-8 font-serif text-2xl font-medium tracking-tight text-paper">
                    {s.title}
                  </h3>
                  {/* description */}
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">
                    {s.description}
                  </p>
                  {/* bottom line */}
                  <div className="mt-6 flex items-center gap-2 font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/35">
                    <span>0{i + 1}</span>
                    <span className="h-2 w-px bg-paper/20" />
                    <span>{MODEL.season}</span>
                  </div>
                </GlassHover>
              </Magnetic>
            );
          })}
        </div>

        {/* credit line */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45">
          <span>Select bookings · Worldwide</span>
          <span>Coordinated through {MODEL.agency}</span>
          <span>{MODEL.issue} · {MODEL.season}</span>
        </div>
      </div>
    </section>
  );
}
