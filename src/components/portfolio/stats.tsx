"use client";

import Image from "next/image";
import { MODEL, VITAL_STATS } from "./data";
import { Reveal } from "./reveal";

export function Stats() {
  return (
    <section
      id="stats"
      className="grain relative overflow-hidden bg-ink py-24 text-paper sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Section label */}
        <div className="mb-12 flex items-center justify-between border-b border-paper/15 pb-6">
          <Reveal>
            <span className="font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50">
              Comp Card — 02
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="font-sans text-[0.6rem] uppercase tracking-wide-2 text-paper/50">
              {MODEL.issue}
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={MODEL.heroMain}
                  alt={`${MODEL.name} comp card`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <span className="absolute left-3 top-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/70">
                  #006
                </span>
              </div>
            </Reveal>
          </div>

          {/* Stats */}
          <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-7">
            <Reveal>
              <h2 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
                Measurements
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-paper/70">
                Verified by {MODEL.agency}. All figures current as of{" "}
                {MODEL.season}.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden bg-paper/15 sm:grid-cols-4">
              {VITAL_STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.05}>
                  <div className="flex h-full flex-col gap-1 bg-ink p-6">
                    <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45">
                      {s.label}
                    </span>
                    <span className="font-serif text-2xl font-medium tracking-display text-paper">
                      {s.value}
                    </span>
                    <span className="mt-1 font-sans text-[0.5rem] uppercase tracking-wide-2 text-paper/30">
                      {String(i + 1).padStart(2, "0")} / {String(VITAL_STATS.length).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
