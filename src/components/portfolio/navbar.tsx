"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { MODEL, NAV_LINKS } from "./data";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // hide on scroll-down, reveal on scroll-up (after 120px threshold)
      if (y > 120 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[80] transition-all duration-500",
        hidden
          ? "-translate-y-full"
          : "translate-y-0",
        scrolled
          ? "glass-dark border-b border-white/10 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <Magnetic strength={0.2}>
          <a
            href="#top"
            className={cn(
              "font-serif text-xl sm:text-2xl font-semibold tracking-tight transition-colors",
              scrolled ? "text-paper" : "text-paper"
            )}
          >
            {MODEL.name}
            <span className="text-champagne">.</span>
          </a>
        </Magnetic>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href}>
              <Magnetic strength={0.15}>
                <a
                  href={l.href}
                  className="group relative flex items-center gap-2 font-sans text-[0.62rem] uppercase tracking-wide-2 text-paper/70 transition-colors hover:text-paper"
                >
                  <span className="text-[0.5rem] text-paper/35 transition-colors group-hover:text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="link-underline">{l.label}</span>
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        {/* Book CTA */}
        <div className="hidden md:block">
          <Magnetic strength={0.35}>
            <a
              href="#contact"
              className="btn-glow group inline-flex items-center gap-2 rounded-full border border-paper/30 px-5 py-2.5 font-sans text-[0.6rem] uppercase tracking-wide-2 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Book
              <span className="h-1 w-1 rounded-full bg-champagne transition-transform duration-500 group-hover:scale-150" />
            </a>
          </Magnetic>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-paper"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="mesh-bg grain w-full max-w-sm border-l border-white/10 bg-ink p-0"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <span className="font-serif text-xl font-semibold text-paper">
                  {MODEL.name}
                  <span className="text-champagne">.</span>
                </span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu" className="text-paper">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <ul className="flex flex-col px-2 py-4">
                {NAV_LINKS.map((l, i) => (
                  <li key={l.href}>
                    <SheetClose asChild>
                      <a
                        href={l.href}
                        className="flex items-baseline justify-between px-6 py-4 transition-colors hover:bg-white/5"
                      >
                        <span className="font-serif text-2xl text-paper">{l.label}</span>
                        <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="px-6 pt-4">
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className="btn-glow flex w-full items-center justify-center gap-2 rounded-full bg-paper py-3.5 font-sans text-[0.65rem] uppercase tracking-wide-2 text-ink"
                  >
                    Book Mizuhara
                  </a>
                </SheetClose>
              </div>
              <div className="mt-auto px-6 py-6 font-sans text-[0.55rem] uppercase tracking-wide-2 text-paper/50">
                {MODEL.location}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
