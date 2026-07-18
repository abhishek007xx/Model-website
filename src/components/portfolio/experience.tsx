"use client";

import { CREDITS, MODEL } from "./data";
import { Reveal, SectionHeading } from "./reveal";
import { Marquee } from "./marquee";

export function Experience() {
  return (
    <section id="experience" className="relative bg-paper">
      {/* Marquee band on top */}
      <Marquee variant="light" reverse duration={38} />

      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-6 border-b border-ink/15 pb-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Experience — 04"
            title="Houses & Publications"
          />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-ink/60 md:text-right">
              A record built over years of disciplined, distinctive work
              across the world&apos;s leading titles and runways.
            </p>
          </Reveal>
        </div>

        {/* Houses — bordered grid (Vogue style) */}
        <div className="mt-12">
          <Reveal>
            <div className="mb-6 flex items-center justify-between font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
              <span>Fashion Houses</span>
              <span>{String(CREDITS.houses.length).padStart(2, "0")} credits</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 border-l border-t border-ink/15 sm:grid-cols-4">
            {CREDITS.houses.map((h, i) => (
              <Reveal key={h} delay={(i % 4) * 0.05}>
                <div className="group relative flex h-32 items-center justify-center border-b border-r border-ink/15 bg-paper transition-colors hover:bg-accent/40">
                  <span className="font-serif text-2xl tracking-wide-display text-ink transition-transform duration-300 group-hover:scale-105 sm:text-3xl">
                    {h}
                  </span>
                  <span className="absolute left-3 top-3 font-sans text-[0.5rem] uppercase tracking-wide-2 text-ink/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Publications — italic serif list */}
        <div className="mt-16">
          <Reveal>
            <div className="mb-6 flex items-center justify-between font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
              <span>Publications</span>
              <span>{String(CREDITS.publications.length).padStart(2, "0")} features</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-4">
              {CREDITS.publications.map((p, i) => (
                <div
                  key={p}
                  className="flex h-24 items-center justify-center bg-paper transition-colors hover:bg-accent/40"
                >
                  <span className="font-serif text-2xl italic text-ink/70 transition-colors hover:text-ink sm:text-3xl">
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* editorial credit line */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
            <span>Selected credits · {MODEL.season}</span>
            <span>Full CV available on request</span>
            <span>{MODEL.agency}</span>
          </div>
        </Reveal>
      </div>

      {/* Marquee band on bottom */}
      <Marquee variant="dark" duration={42} />
    </section>
  );
}
