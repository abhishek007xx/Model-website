"use client";

import Image from "next/image";
import { ABOUT, MODEL } from "./data";
import { Reveal, SectionHeading } from "./reveal";

export function About() {
  return (
    <section id="about" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                <Image
                  src={ABOUT.image}
                  alt={`Portrait of ${MODEL.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
              <p className="mt-3 text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
                — Portrait, {new Date().getFullYear()}
              </p>
            </Reveal>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <SectionHeading eyebrow="About" title="A face that frames a story" />
            <div className="mt-8 space-y-6">
              {ABOUT.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.1}>
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Highlights */}
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
              {ABOUT.highlights.map((h, i) => (
                <Reveal key={h} delay={0.15 + i * 0.08}>
                  <div className="flex h-full flex-col justify-between bg-background p-5">
                    <span className="font-serif text-3xl font-semibold text-foreground">
                      0{i + 1}
                    </span>
                    <span className="mt-6 text-xs uppercase tracking-wide-2 text-muted-foreground">
                      {h}
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
