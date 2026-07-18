"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { MODEL, NAV_LINKS } from "./data";
import { Marquee } from "./marquee";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-paper">
      {/* Marquee on top of footer */}
      <Marquee variant="light" duration={46} />

      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a
              href="#top"
              className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            >
              {MODEL.name}
              <span className="text-champagne">.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
              {MODEL.tagline}. Represented worldwide by {MODEL.agency}.
            </p>
            <p className="mt-4 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/45">
              {MODEL.location}
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3 md:col-span-3">
            <p className="font-sans text-[0.55rem] uppercase tracking-luxe text-ink/45">
              Explore
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((l, i) => (
                <li key={l.href} className="flex items-center gap-3">
                  <span className="font-sans text-[0.5rem] uppercase tracking-wide-2 text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={l.href}
                    className="font-serif text-lg text-ink/80 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 md:col-span-4">
            <p className="font-sans text-[0.55rem] uppercase tracking-luxe text-ink/45">
              Booking
            </p>
            {[
              { label: MODEL.email, href: `mailto:${MODEL.email}` },
              { label: MODEL.phone, href: `tel:${MODEL.phone.replace(/[^+\d]/g, "")}` },
              { label: MODEL.instagram, href: `https://instagram.com/${MODEL.instagram.replace("@", "")}` },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex items-center justify-between border-b border-ink/10 pb-2 font-serif text-lg text-ink/80 transition-colors hover:text-ink"
              >
                {c.label}
                <ArrowUpRight className="h-4 w-4 text-ink/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
              </a>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/15 pt-6 sm:flex-row">
          <p className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
            © {year} {MODEL.name} — All rights reserved
          </p>
          <p className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/40">
            {MODEL.issue} · {MODEL.season} · The Portfolio Edition
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/60 transition-colors hover:text-ink"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 transition-colors group-hover:bg-ink group-hover:text-paper">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
