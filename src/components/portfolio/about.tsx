"use client";

import Image from "next/image";
import { ABOUT, MODEL } from "./data";
import { Reveal, SectionHeading } from "./reveal";

export function About() {
  return (
    <section id="about" className="relative grain-light overflow-hidden bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Collage images — overlapping */}
          <div className="relative lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] w-[78%] overflow-hidden bg-muted shadow-collage">
                <Image
                  src={ABOUT.image}
                  alt={`Portrait of ${MODEL.name}`}
                  fill
                  sizes="(max-width: 1024px) 70vw, 32vw"
                  className="object-cover object-center"
                />
                <span className="absolute left-2 top-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/90">
                  #004
                </span>
              </div>
            </Reveal>
            {/* overlapping secondary image */}
            <Reveal delay={0.15}>
              <div className="absolute -bottom-10 right-0 aspect-[3/4] w-[48%] overflow-hidden border-4 border-paper bg-muted shadow-collage sm:right-4">
                <Image
                  src={ABOUT.secondary}
                  alt={`${MODEL.name} editorial`}
                  fill
                  sizes="(max-width: 1024px) 45vw, 20vw"
                  className="object-cover object-center"
                />
                <span className="absolute left-2 top-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/90">
                  #005
                </span>
              </div>
            </Reveal>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <SectionHeading eyebrow="About — 01" title="A modern muse" />
            <div className="mt-8 space-y-6">
              {ABOUT.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p className="max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Highlights — bordered grid */}
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-4">
              {ABOUT.highlights.map((h, i) => (
                <Reveal key={h.label} delay={0.15 + i * 0.08}>
                  <div className="flex h-full flex-col gap-1 bg-paper p-5">
                    <span className="font-serif text-4xl font-semibold tracking-display text-ink">
                      {h.value}
                    </span>
                    <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/55">
                      {h.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* editorial credit line */}
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-6 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
                <span>Based in {MODEL.location}</span>
                <span className="hidden h-3 w-px bg-ink/25 sm:block" />
                <span>Represented by {MODEL.agency}</span>
                <span className="hidden h-3 w-px bg-ink/25 sm:block" />
                <span>Available worldwide</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
