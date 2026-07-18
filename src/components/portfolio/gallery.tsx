"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section id="portfolio" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected Work"
          />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted-foreground md:text-right">
              A curated selection of editorial, beauty, runway, and campaign
              imagery. {MODEL.name} collaborates with photographers and houses
              worldwide.
            </p>
          </Reveal>
        </div>

        {/* Filter */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-wide-2 transition-all",
                  filter === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {items.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActive(GALLERY.indexOf(item))}
                className="group relative block w-full overflow-hidden rounded-sm bg-muted text-left"
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    item.tall ? "aspect-[3/4]" : "aspect-square"
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div>
                      <p className="text-[0.6rem] uppercase tracking-luxe text-background/70">
                        {item.category}
                      </p>
                      <p className="font-serif text-xl text-background">
                        {item.title}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-background/40 text-background">
                      <Plus className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/95 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-background/30 text-background transition-colors hover:bg-background hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(-1);
            }}
            aria-label="Previous"
            className="absolute left-3 sm:left-8 flex h-11 w-11 items-center justify-center rounded-full border border-background/30 text-background transition-colors hover:bg-background hover:text-foreground"
          >
            <span className="font-serif text-2xl">‹</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(1);
            }}
            aria-label="Next"
            className="absolute right-3 sm:right-8 flex h-11 w-11 items-center justify-center rounded-full border border-background/30 text-background transition-colors hover:bg-background hover:text-foreground"
          >
            <span className="font-serif text-2xl">›</span>
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[88vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[78vh] w-auto">
              <Image
                src={item.src}
                alt={item.title}
                width={900}
                height={1200}
                className="max-h-[78vh] w-auto object-contain"
              />
            </div>
            <div className="mt-4 flex items-center gap-4 text-background">
              <span className="text-[0.65rem] uppercase tracking-luxe text-background/60">
                {item.category}
              </span>
              <span className="h-3 w-px bg-background/30" />
              <span className="font-serif text-lg">{item.title}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
