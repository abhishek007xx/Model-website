"use client";

import { MODEL } from "./data";
import { RevealImage } from "./reveal-image";
import { SplitText } from "./split-text";
import { Magnetic } from "./magnetic";
import { ArrowUpRight } from "lucide-react";

/**
 * EditorialSplit
 * --------------
 * A cinematic image-led interlude between major sections. A large
 * atmospheric image with a pull-quote overlay — a breath in the pacing,
 * like a double-page spread in a magazine.
 */
export function EditorialSplit() {
  return (
    <section className="relative bg-ink">
      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Large image */}
          <div className="lg:col-span-8">
            <div className="relative grade-champagne">
              <RevealImage
                src="/portfolio/gallery-14.jpg"
                alt="Editorial — Corridor"
                variant="mask-left"
                className="aspect-[16/10] w-full shadow-collage"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          </div>

          {/* Pull quote */}
          <div className="lg:col-span-4">
            <SplitText
              as="span"
              mode="words"
              className="mb-4 block font-sans text-[0.6rem] uppercase tracking-luxe text-paper/50"
            >
              Interlude
            </SplitText>
            <SplitText
              as="blockquote"
              mode="lines"
              stagger={0.1}
              className="font-serif text-2xl font-light leading-snug text-paper/90 sm:text-3xl text-balance"
            >
              &ldquo;She doesn&apos;t wear the clothes — the clothes learn how to move from her.&rdquo;
            </SplitText>
            <SplitText
              as="p"
              mode="words"
              delay={0.3}
              className="mt-6 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/45"
            >
              — Creative Director, {MODEL.agency}
            </SplitText>

            <Magnetic strength={0.3}>
              <a
                href="#portfolio"
                className="btn-glow mt-8 inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 font-sans text-[0.6rem] uppercase tracking-wide-2 text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                View full archive
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
