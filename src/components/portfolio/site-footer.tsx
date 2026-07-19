"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { MODEL, NAV_LINKS } from "./data";
import { Marquee } from "./marquee";
import { Magnetic } from "./magnetic";
import { SplitText } from "./split-text";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-paper">
      {/* Marquee on top */}
      <Marquee variant="light" duration={46} />

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand + newsletter-style CTA */}
          <div className="md:col-span-5">
            <SplitText as="span" mode="words" className="mb-4 block font-sans text-[0.55rem] uppercase tracking-luxe text-ink/45">
              {MODEL.tagline}
            </SplitText>
            <a
              href="#top"
              className="group inline-block font-serif text-5xl font-semibold tracking-tight text-ink sm:text-6xl"
            >
              {MODEL.name}
              <span className="text-champagne">.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
              Represented worldwide by {MODEL.agency}. Available for select editorial, runway, campaign, and film bookings.
            </p>
            <p className="mt-4 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/45">
              {MODEL.location}
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3 md:col-span-3">
            <p className="font-sans text-[0.55rem] uppercase tracking-luxe text-ink/45">Explore</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="group flex items-center gap-3">
                  <span className="font-sans text-[0.5rem] uppercase tracking-wide-2 text-ink/30 transition-colors group-hover:text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={l.href}
                    className="link-underline font-serif text-lg text-ink/80 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact with magnetic links */}
          <div className="flex flex-col gap-3 md:col-span-4">
            <p className="font-sans text-[0.55rem] uppercase tracking-luxe text-ink/45">Booking</p>
            {[
              { label: MODEL.email, href: `mailto:${MODEL.email}` },
              { label: MODEL.phone, href: `tel:${MODEL.phone.replace(/[^+\d]/g, "")}` },
              { label: MODEL.instagram, href: `https://instagram.com/${MODEL.instagram.replace("@", "")}` },
            ].map((c) => (
              <Magnetic key={c.label} strength={0.08}>
                <a
                  href={c.href}
                  className="group flex items-center justify-between border-b border-ink/10 pb-2 font-serif text-lg text-ink/80 transition-colors hover:text-ink"
                >
                  {c.label}
                  <ArrowUpRight className="h-4 w-4 text-ink/40 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne" />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* bottom bar with animated divider */}
        <div className="mt-12 border-t border-ink/15 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
              © {year} {MODEL.name} — All rights reserved
            </p>
            <p className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/40">
              {MODEL.issue} · {MODEL.season} · The Portfolio Edition
            </p>
            <Magnetic strength={0.3}>
              <a
                href="#top"
                className="btn-glow group flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                Back to top
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-paper/40 group-hover:bg-paper/10">
                  <ArrowUp className="h-3 w-3 transition-transform duration-500 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
