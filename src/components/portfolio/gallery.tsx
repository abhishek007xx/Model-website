"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { GALLERY, MODEL } from "./data";
import { Reveal, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Editorial", "Beauty", "Runway", "Campaign"];

export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const items =
    filter === "All"
      ? GALLERY
      : GALLERY.filter((g) => g.category === filter);

  return (
    <section id="portfolio" className="grain-light relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Header row */}
        <div className="flex flex-col gap-6 border-b border-ink/15 pb-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Portfolio — 03" title="Selected Work" />
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/55">
              <span>{String(GALLERY.length).padStart(2, "0")} Stories</span>
              <span className="h-3 w-px bg-ink/25" />
              <span>{MODEL.season}</span>
              <span className="h-3 w-px bg-ink/25" />
              <span>Shot in {MODEL.shotAt}</span>
            </div>
          </Reveal>
        </div>

        {/* Filter */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 font-sans text-[0.6rem] uppercase tracking-wide-2 transition-all",
                  filter === c
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/25 text-ink/60 hover:border-ink/60 hover:text-ink"
                )}
              >
                {c}
              </button>
            ))}
            <span className="ml-auto hidden font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/45 sm:block">
              {String(items.length).padStart(2, "0")} of {String(GALLERY.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        {/* Grid — magazine collage */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          {items.map((item, i) => {
            const realIndex = GALLERY.indexOf(item);
            // Layout: tall items span 2 rows on lg
            const colSpan = item.tall
              ? "lg:col-span-4"
              : "lg:col-span-4";
            return (
              <Reveal
                key={item.src}
                delay={(i % 3) * 0.08}
                className={cn("col-span-1", colSpan)}
              >
                <button
                  onClick={() => setActive(realIndex)}
                  className="group relative block w-full overflow-hidden bg-muted text-left"
                >
                  <div
                    className={cn(
                      "relative w-full overflow-hidden",
                      item.tall ? "aspect-[3/4]" : "aspect-[4/5]"
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                    />
                    {/* corner number */}
                    <span className="absolute left-3 top-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/90">
                      #{String(realIndex + 1).padStart(3, "0")}
                    </span>
                    {/* category chip */}
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-sans text-[0.5rem] uppercase tracking-wide-2 text-ink backdrop-blur">
                      {item.category}
                    </span>
                    {/* hover gradient + caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div>
                        <p className="font-serif text-xl text-white">
                          {item.title}
                        </p>
                        <p className="mt-0.5 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/70">
                          View story
                        </p>
                      </div>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-colors group-hover:bg-white group-hover:text-ink">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* bottom CTA */}
        <Reveal>
          <div className="mt-12 flex items-center justify-between border-t border-ink/15 pt-6">
            <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
              Full archive available on request
            </span>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 font-sans text-[0.6rem] uppercase tracking-wide-2 text-ink"
            >
              Request full book
              <Plus className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
            </a>
          </div>
        </Reveal>
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
          transition={{ duration: 0.3 }}
          className="grain fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-paper/15 px-5 py-4">
            <span className="font-sans text-[0.6rem] uppercase tracking-wide-2 text-paper/60">
              {String(index! + 1).padStart(3, "0")} / {String(GALLERY.length).padStart(3, "0")}
            </span>
            <span className="font-serif text-lg italic text-paper">
              {MODEL.name}
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(-1);
            }}
            aria-label="Previous"
            className="absolute left-3 sm:left-8 flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <span className="font-serif text-3xl leading-none">‹</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(1);
            }}
            aria-label="Next"
            className="absolute right-3 sm:right-8 flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <span className="font-serif text-3xl leading-none">›</span>
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
              <span className="absolute left-3 top-3 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/90">
                #{String(index! + 1).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-4 text-paper">
              <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/55">
                {item.category}
              </span>
              <span className="h-3 w-px bg-paper/30" />
              <span className="font-serif text-xl italic">{item.title}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
