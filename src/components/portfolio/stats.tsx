"use client";

import Image from "next/image";
import { MODEL, VITAL_STATS } from "./data";
import { Reveal } from "./reveal";

export function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-foreground py-24 text-background sm:py-32"
    >
      {/* subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={MODEL.heroImage}
                  alt={`${MODEL.name} comp card`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
            </Reveal>
          </div>

          {/* Stats */}
          <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-7">
            <Reveal>
              <span className="mb-4 text-[0.7rem] uppercase tracking-luxe text-background/60">
                Vital Statistics
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Comp Card
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-background/70">
                Measurements and details for casting directors and clients.
                All figures are current and verified by{" "}
                <span className="text-background">{MODEL.agency}</span>.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-background/15 sm:grid-cols-4">
              {VITAL_STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.05}>
                  <div className="flex h-full flex-col gap-1 bg-foreground p-6">
                    <span className="text-[0.65rem] uppercase tracking-wide-2 text-background/50">
                      {s.label}
                    </span>
                    <span className="font-serif text-2xl font-medium text-background">
                      {s.value}
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
