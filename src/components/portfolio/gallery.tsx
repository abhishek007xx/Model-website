"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { GALLERY, MODEL, type GalleryItem } from "./data";
import { RevealImage, type RevealVariant } from "./reveal-image";
import { SplitText } from "./split-text";
import { ScrambleText, KerningText } from "./text-effects";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Editorial", "Beauty", "Runway", "Campaign"];

// Each image gets a unique reveal variant — premium variety, no repetition.
const VARIANTS: RevealVariant[] = [
  "chromatic",      // 1
  "liquid",         // 2
  "mask-diagonal",  // 3
  "mask-bottom",    // 4
  "blur-sharp",     // 5
  "scale-zoom",     // 6
  "mask-center",    // 7
  "parallax",       // 8
  "mask-left",      // 9
  "chromatic",      // 10
  "grayscale-color",// 11
  "mask-right",     // 12
  "liquid",         // 13
  "mask-diagonal",  // 14
  "blur-sharp",     // 15
  "mask-top",       // 16
  "chromatic",      // 17
  "fade-up",        // 18
];

// Slight organic rotation per slot for the "scattered photos" feel.
const ROTATIONS = [-4, 3, -2, 4, -3, 2, -4, 3, -2, 4, -3, 2, -3, 4, -2, 3, -4, 2];

// Grid placement on desktop (12-col grid) — asymmetric, never templated.
const PLACEMENTS = [
  "lg:col-span-4 lg:col-start-1", // 1 — tall, left
  "lg:col-span-3 lg:col-start-6 lg:mt-16", // 2 — square, offset right + down
  "lg:col-span-4 lg:col-start-9", // 3 — tall, right
  "lg:col-span-3 lg:col-start-2 lg:mt-8", // 4 — std, slightly inset
  "lg:col-span-3 lg:col-start-6", // 5 — square, center
  "lg:col-span-3 lg:col-start-10 lg:mt-12", // 6 — tall, right offset
  "lg:col-span-5 lg:col-start-1", // 7 — wide, left
  "lg:col-span-3 lg:col-start-7 lg:mt-8", // 8 — square
  "lg:col-span-4 lg:col-start-10", // 9 — tall, right
  "lg:col-span-4 lg:col-start-2 lg:mt-8", // 10 — std, inset
  "lg:col-span-3 lg:col-start-7", // 11 — square
  "lg:col-span-4 lg:col-start-10 lg:mt-16", // 12 — tall, right offset
  "lg:col-span-4 lg:col-start-1 lg:mt-12", // 13 — tall, left offset
  "lg:col-span-5 lg:col-start-6", // 14 — wide, center
  "lg:col-span-3 lg:col-start-1 lg:mt-8", // 15 — square, left
  "lg:col-span-4 lg:col-start-5 lg:mt-16", // 16 — std, center offset
  "lg:col-span-3 lg:col-start-10", // 17 — square, right
  "lg:col-span-4 lg:col-start-2 lg:mt-12", // 18 — tall, inset offset
];

const aspectClass: Record<GalleryItem["aspect"], string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[16/10]",
  std: "aspect-[4/5]",
};

// Cinematic color grades cycling through gallery images for variety.
const GRADES = [
  "grade-teal-orange",
  "grade-warm",
  "grade-noir",
  "grade-champagne",
  "grade-faded",
  "grade-warm",
  "grade-teal-orange",
  "grade-champagne",
  "grade-noir",
  "grade-faded",
  "grade-warm",
  "grade-teal-orange",
  "grade-champagne",
  "grade-noir",
  "grade-faded",
  "grade-warm",
  "grade-teal-orange",
  "grade-champagne",
];

export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const items =
    filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <section id="portfolio" className="relative bg-paper py-24 sm:py-32">
      {/* subtle mesh */}
      <div className="mesh-bg-paper pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-ink/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <ScrambleText
              as="span"
              duration={1}
              className="mb-4 block font-sans text-[0.6rem] uppercase tracking-luxe text-ink/50"
            >
              The Archive — 03b
            </ScrambleText>
            <KerningText as="h2" from="0.15em" to="-0.02em" duration={1.4} className="font-serif text-5xl font-medium text-ink sm:text-6xl md:text-7xl text-balance">
              Selected Work
            </KerningText>
          </div>
          <div className="flex items-center gap-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/55">
            <span>{String(GALLERY.length).padStart(2, "0")} Stories</span>
            <span className="h-3 w-px bg-ink/25" />
            <span>{MODEL.season}</span>
          </div>
        </div>

        {/* Filter */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 font-sans text-[0.6rem] uppercase tracking-wide-2 transition-all duration-400",
                filter === c
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/25 text-ink/60 hover:border-ink/60 hover:text-ink"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Asymmetric collage */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-12 lg:auto-rows-auto">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              const realIndex = GALLERY.indexOf(item);
              const variant = VARIANTS[realIndex % VARIANTS.length];
              const rotation = ROTATIONS[realIndex % ROTATIONS.length];
              const placement = PLACEMENTS[realIndex % PLACEMENTS.length];

              return (
                <motion.button
                  key={item.src}
                  layout
                  data-cursor-text="View"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActive(realIndex)}
                  className={cn(
                    "group relative block text-left",
                    placement
                  )}
                >
                  <div
                    style={{ "--rot": `${rotation}deg` } as React.CSSProperties}
                    className={cn(
                      "chromatic-hover relative overflow-hidden shadow-collage transition-transform duration-700 ease-out rotate-[var(--rot)] group-hover:rotate-0 group-hover:scale-[1.03] group-hover:z-20",
                      aspectClass[item.aspect],
                      GRADES[realIndex % GRADES.length]
                    )}
                  >
                    <RevealImage
                      src={item.src}
                      alt={item.title}
                      variant={variant}
                      className="h-full w-full"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 30vw"
                    />

                    {/* Moving light reflection on hover */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute -inset-y-4 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[120%] group-hover:opacity-100" />
                    </div>

                    {/* gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* number badge */}
                    <span className="absolute left-3 top-3 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/85">
                      #{String(realIndex + 1).padStart(3, "0")}
                    </span>

                    {/* category chip */}
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-sans text-[0.5rem] uppercase tracking-wide-2 text-ink opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                      {item.category}
                    </span>

                    {/* caption */}
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div>
                        <p className="font-serif text-lg text-white sm:text-xl">
                          {item.title}
                        </p>
                        <p className="mt-0.5 font-sans text-[0.5rem] uppercase tracking-wide-2 text-white/60">
                          View story
                        </p>
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white transition-colors group-hover:bg-white group-hover:text-ink">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* bottom CTA */}
        <div className="mt-12 flex items-center justify-between border-t border-ink/15 pt-6">
          <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
            Full archive available on request
          </span>
          <a
            href="#contact"
            className="link-underline group inline-flex items-center gap-2 font-sans text-[0.6rem] uppercase tracking-wide-2 text-ink"
          >
            Request full book
            <Plus className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-90" />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        index={active}
        onClose={() => setActive(null)}
        onNavigate={(dir) =>
          setActive((cur) => {
            if (cur === null) return cur;
            const n = GALLERY.length;
            return (cur + dir + n) % n;
          })
        }
      />
    </section>
  );
}

function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number | null;
  onClose: () => void;
  onNavigate: (dir: number) => void;
}) {
  const open = index !== null;
  const item = open ? GALLERY[index!] : null;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grain fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          {/* top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/12 px-5 py-4">
            <span className="font-sans text-[0.6rem] uppercase tracking-wide-2 text-white/55">
              {String(index! + 1).padStart(3, "0")} /{" "}
              {String(GALLERY.length).padStart(3, "0")}
            </span>
            <span className="font-serif text-lg italic text-white">
              {MODEL.name}
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* prev / next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(-1);
            }}
            aria-label="Previous"
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-ink sm:left-8"
          >
            <span className="font-serif text-3xl leading-none">‹</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(1);
            }}
            aria-label="Next"
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-ink sm:right-8"
          >
            <span className="font-serif text-3xl leading-none">›</span>
          </button>

          {/* image with clip-path reveal on change */}
          <motion.div
            key={index}
            initial={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0.6 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[80vh] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[68vh]">
              <Image
                src={item.src}
                alt={item.title}
                width={900}
                height={1200}
                className="max-h-[68vh] w-auto object-contain shadow-collage"
              />
              <span className="absolute left-3 top-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/85">
                #{String(index! + 1).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4 text-white">
              <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/55">
                {item.category}
              </span>
              <span className="h-3 w-px bg-white/30" />
              <span className="font-serif text-xl italic">{item.title}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
