"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MODEL } from "./data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-background"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={MODEL.heroImage}
          alt={`${MODEL.name} — ${MODEL.tagline}`}
          className="h-full w-full object-cover object-center"
        />
        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-5 text-[0.7rem] uppercase tracking-luxe text-foreground/70">
            {MODEL.tagline}
          </p>
          <h1 className="font-serif text-[15vw] leading-[0.9] font-semibold tracking-tight text-foreground sm:text-[12vw] md:text-[9rem] lg:text-[11rem]">
            {MODEL.name}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/80 sm:text-lg">
            {MODEL.heroIntro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <span className="text-xs uppercase tracking-wide-2 text-foreground/60">
            {MODEL.location}
          </span>
          <span className="hidden h-4 w-px bg-foreground/30 sm:block" />
          <span className="text-xs uppercase tracking-wide-2 text-foreground/60">
            Represented by {MODEL.agency}
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-foreground/60 sm:flex"
        aria-label="Scroll to explore"
      >
        <span className="text-[0.6rem] uppercase tracking-luxe">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
