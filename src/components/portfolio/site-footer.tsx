"use client";

import { ArrowUp } from "lucide-react";
import { MODEL, NAV_LINKS } from "./data";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <a
              href="#top"
              className="font-serif text-3xl font-semibold tracking-tight"
            >
              {MODEL.name}
              <span className="text-accent-foreground/40">.</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {MODEL.tagline}. Represented worldwide by {MODEL.agency}.
            </p>
            <p className="mt-4 text-xs uppercase tracking-wide-2 text-muted-foreground">
              {MODEL.location}
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <p className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
              Explore
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-[0.65rem] uppercase tracking-luxe text-muted-foreground">
              Booking
            </p>
            <a
              href={`mailto:${MODEL.email}`}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {MODEL.email}
            </a>
            <a
              href={`tel:${MODEL.phone.replace(/[^+\d]/g, "")}`}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {MODEL.phone}
            </a>
            <a
              href={`https://instagram.com/${MODEL.instagram.replace("@", "")}`}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {MODEL.instagram}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {MODEL.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with care — a portfolio experience.
          </p>
          <a
            href="#top"
            className="flex items-center gap-2 text-xs uppercase tracking-wide-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
