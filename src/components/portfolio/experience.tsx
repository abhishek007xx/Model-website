"use client";

import { CREDITS, MODEL } from "./data";
import { Reveal, SectionHeading } from "./reveal";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-secondary/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Houses & Publications"
          align="center"
          className="items-center"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg">
            {MODEL.name} has walked for and appeared in some of the most
            respected names in fashion — a record built over years of
            disciplined, distinctive work.
          </p>
        </Reveal>

        {/* Houses */}
        <div className="mt-16">
          <Reveal>
            <p className="mb-8 text-center text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
              Fashion Houses
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
            {CREDITS.houses.map((h, i) => (
              <Reveal key={h} delay={(i % 4) * 0.06}>
                <div className="group flex h-28 items-center justify-center bg-background transition-colors hover:bg-accent">
                  <span className="font-serif text-xl tracking-tight text-foreground transition-transform duration-300 group-hover:scale-105 sm:text-2xl">
                    {h}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="mt-16">
          <Reveal>
            <p className="mb-8 text-center text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
              Publications
            </p>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {CREDITS.publications.map((p, i) => (
              <Reveal key={p} delay={(i % 4) * 0.05}>
                <span className="font-serif text-2xl italic text-muted-foreground transition-colors hover:text-foreground sm:text-3xl">
                  {p}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
