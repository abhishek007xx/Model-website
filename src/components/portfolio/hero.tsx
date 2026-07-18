"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MODEL } from "./data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative grain overflow-hidden bg-paper pt-24 sm:pt-28"
    >
      {/* Top meta strip — editorial issue info */}
      <div className="relative z-20 mx-auto flex max-w-[1600px] items-center justify-between border-b border-ink/15 px-5 py-3 sm:px-8">
        <span className="font-sans text-[0.6rem] uppercase tracking-wide-2 text-ink/70">
          {MODEL.issue} · {MODEL.season}
        </span>
        <span className="hidden font-sans text-[0.6rem] uppercase tracking-wide-2 text-ink/70 sm:block">
          The Portfolio Edition
        </span>
        <span className="font-sans text-[0.6rem] uppercase tracking-wide-2 text-ink/70">
          {MODEL.location}
        </span>
      </div>

      {/* Collage stage */}
      <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
        {/* Giant outline wordmark BEHIND everything */}
        <motion.h1
          aria-hidden="true"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 top-6 z-0 select-none text-center font-serif text-[26vw] font-semibold leading-none tracking-display text-outline sm:top-10 sm:text-[22vw]"
          style={{
            WebkitTextStrokeWidth: "1.5px",
          }}
        >
          MIZUHARA
        </motion.h1>

        <div className="relative z-10 grid grid-cols-12 gap-3 sm:gap-4">
          {/* Left rail — small close-up + caption (overlapping) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-5 mt-24 sm:col-span-4 sm:mt-44 lg:col-span-3 lg:mt-52"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted shadow-collage">
              <Image
                src={MODEL.heroCloseup}
                alt={`${MODEL.name} close-up`}
                fill
                sizes="(max-width: 640px) 45vw, 25vw"
                className="object-cover object-center"
              />
              <span className="absolute left-2 top-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/90">
                #001
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/60">
              <span>Close-up</span>
              <span>Shot. {MODEL.shotBy}</span>
            </div>
          </motion.div>

          {/* Center — main hero portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-span-7 sm:col-span-5 sm:col-start-5 lg:col-span-4 lg:col-start-5"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted shadow-collage">
              <Image
                src={MODEL.heroMain}
                alt={`${MODEL.name} — ${MODEL.tagline}`}
                fill
                priority
                sizes="(max-width: 640px) 60vw, 35vw"
                className="object-cover object-center"
              />
              {/* bottom gradient + name plate */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                <div>
                  <p className="font-sans text-[0.55rem] uppercase tracking-luxe text-white/70">
                    Cover Story
                  </p>
                  <p className="font-serif text-2xl font-medium text-white sm:text-3xl">
                    {MODEL.name}
                  </p>
                </div>
                <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/70">
                  #002
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right rail — secondary portrait + meta */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 mt-6 sm:col-span-3 sm:col-start-10 sm:mt-24 lg:col-span-3 lg:col-start-10 lg:mt-52"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted shadow-collage">
              <Image
                src={MODEL.heroAlt}
                alt={`${MODEL.name} editorial`}
                fill
                sizes="(max-width: 640px) 100vw, 22vw"
                className="object-cover object-center"
              />
              <span className="absolute left-2 top-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-white/90">
                #003
              </span>
            </div>

            {/* editorial meta block */}
            <div className="mt-4 space-y-2 border-t border-ink/20 pt-4">
              {[
                ["Location", MODEL.shotAt],
                ["Photographer", MODEL.shotBy],
                ["Represented", MODEL.agency],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-3"
                >
                  <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
                    {k}
                  </span>
                  <span className="text-right font-serif text-sm italic text-ink">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Headline + intro below collage */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-12 grid grid-cols-1 gap-8 border-t border-ink/15 pt-8 sm:mt-16 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <p className="font-sans text-[0.6rem] uppercase tracking-luxe text-ink/50">
              {MODEL.tagline}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl text-balance">
              A face that frames
              <br />
              <span className="italic text-champagne">a story.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-ink/70">
              {MODEL.heroIntro}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-[0.65rem] uppercase tracking-wide-2 text-paper transition-colors hover:bg-ink/85"
              >
                View Portfolio
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="font-sans text-[0.65rem] uppercase tracking-wide-2 text-ink/70 underline-offset-4 hover:text-ink hover:underline"
              >
                Book Mizuhara
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex items-center justify-center gap-2 font-sans text-[0.55rem] uppercase tracking-luxe text-ink/50"
          aria-label="Scroll to explore"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
