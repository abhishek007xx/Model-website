"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  // Colors inherit from the parent via `currentColor`, so passing a
  // text color (e.g. text-paper) on `className` recolors both the
  // eyebrow and the heading consistently — useful on dark sections.
  return (
    <div
      className={
        (align === "center"
          ? "flex flex-col items-center text-center "
          : "flex flex-col items-start ") + (className ?? "")
      }
    >
      {eyebrow && (
        <Reveal>
          <span className="mb-4 font-sans text-[0.6rem] uppercase tracking-luxe text-current opacity-50">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-serif text-4xl font-medium tracking-tight text-current sm:text-5xl md:text-6xl text-balance">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
