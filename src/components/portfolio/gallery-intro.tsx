"use client";

import { GALLERY, MODEL } from "./data";
import { SplitText } from "./split-text";
import { RevealImage } from "./reveal-image";
import { MagneticImage } from "./magnetic-image";

/**
 * GalleryIntro
 * ------------
 * A cinematic opener for the portfolio section. A large featured image
 * reveals through a center-iris mask while blurring to sharp, with an
 * animated title and editorial metadata overlay.
 */
export function GalleryIntro() {
  const featured = GALLERY[2]; // Couture Moment — dramatic

  return (
    <section className="relative bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1600px]">
        {/* Section label */}
        <div className="mb-10 flex items-center justify-between border-b border-white/12 pb-4">
          <SplitText
            as="span"
            mode="words"
            className="font-sans text-[0.6rem] uppercase tracking-luxe text-white/50"
          >
            Portfolio — 03
          </SplitText>
          <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/40">
            {String(GALLERY.length).padStart(2, "0")} Stories · {MODEL.season}
          </span>
        </div>

        {/* Featured cinematic image with magnetic tilt */}
        <MagneticImage className="relative aspect-[16/10] w-full grade-warm sm:aspect-[21/9]" maxTilt={4} parallax={12}>
          <RevealImage
            src={featured.src}
            alt={featured.title}
            variant="mask-center"
            className="h-full w-full"
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />

          {/* gradient + overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

          {/* Title overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12">
            <SplitText
              as="span"
              mode="words"
              className="mb-3 font-sans text-[0.6rem] uppercase tracking-luxe text-white/60"
            >
              {featured.category}
            </SplitText>
            <h2 className="font-serif text-[10vw] font-semibold leading-[0.95] tracking-display text-white sm:text-[6vw] lg:text-[5rem]">
              <SplitText as="span" mode="chars" stagger={0.04} duration={1.2} className="block">
                {featured.title}
              </SplitText>
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/45">
              <span>Shot. {MODEL.shotBy}</span>
              <span className="h-3 w-px bg-white/25" />
              <span>{MODEL.shotAt}</span>
              <span className="h-3 w-px bg-white/25" />
              <span>#{String(3).padStart(3, "0")}</span>
            </div>
          </div>
        </MagneticImage>

        {/* Intro text */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitText
              as="p"
              mode="lines"
              stagger={0.1}
              className="font-serif text-2xl font-light leading-relaxed text-white/85 sm:text-3xl text-balance"
            >
              Each frame is a conversation between the garment, the light, and the woman wearing it. This is a curated passage through editorial, beauty, runway, and campaign — a visual film in stills.
            </SplitText>
          </div>
          <div className="flex items-end lg:col-span-5 lg:justify-end">
            <div className="flex items-center gap-4 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/40">
              <span>Scroll to enter</span>
              <span className="h-px w-12 bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
