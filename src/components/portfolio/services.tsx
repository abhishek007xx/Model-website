"use client";

import Image from "next/image";
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
import { ScrambleText, KerningText } from "./text-effects";
import { Magnetic } from "./magnetic";
import { RevealImage } from "./reveal-image";

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
            <ScrambleText as="span" duration={1} className="mb-4 block font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50">
              Services — 05
            </ScrambleText>
            <h2 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl text-balance">
              <KerningText as="span" from="0.15em" to="-0.02em" duration={1.4} className="block">
                How we can
              </KerningText>
              <KerningText as="span" from="0.15em" to="-0.02em" duration={1.4} delay={0.3} className="block italic text-champagne">
                work together
              </KerningText>
            </h2>
          </div>
          <SplitText as="p" mode="lines" delay={0.2} stagger={0.08} className="max-w-sm text-sm text-paper/60 md:text-right">
            Available for select bookings worldwide. All engagements handled exclusively through the agency.
          </SplitText>
        </div>

        {/* Service cards — image header + glass body */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Camera;
            return (
              <Magnetic key={s.title} strength={0.06}>
                <div className="group relative h-full overflow-hidden border border-paper/15 bg-paper/[0.03] backdrop-blur-sm transition-all duration-700 hover:border-paper/30 hover:shadow-soft">
                  {/* image header with reveal */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <RevealImage
                      src={s.image}
                      alt={s.title}
                      variant={i % 2 === 0 ? "mask-bottom" : "blur-sharp"}
                      className="h-full w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    {/* moving light sweep on hover */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute -inset-y-4 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[120%] group-hover:opacity-100" />
                    </div>
                    {/* number + icon overlay */}
                    <span className="absolute left-4 top-4 font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 bg-ink/40 text-paper backdrop-blur-sm transition-all duration-500 group-hover:bg-paper group-hover:text-ink">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  {/* body */}
                  <div className="relative p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-2xl font-medium tracking-tight text-paper">
                        {s.title}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 text-paper/30 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-paper/60">
                      {s.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/35">
                      <span>0{i + 1}</span>
                      <span className="h-2 w-px bg-paper/20" />
                      <span>{MODEL.season}</span>
                    </div>
                  </div>
                </div>
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
