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
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-ink/15 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-ink"
        >
          {MODEL.name}
          <span className="text-champagne">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative font-sans text-[0.65rem] uppercase tracking-wide-2 text-ink/60 transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-full border-ink/30 font-sans text-[0.6rem] uppercase tracking-wide-2 text-ink hover:bg-ink hover:text-paper"
          >
            <a href="#contact">Book</a>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-ink"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm border-l border-ink/15 bg-paper p-0"
            >
              <div className="flex items-center justify-between border-b border-ink/15 px-6 py-5">
                <span className="font-serif text-xl font-semibold text-ink">
                  {MODEL.name}
                  <span className="text-champagne">.</span>
                </span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu" className="text-ink">
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
                        className="flex items-baseline justify-between px-6 py-4 transition-colors hover:bg-accent/40"
                      >
                        <span className="font-serif text-2xl text-ink">
                          {l.label}
                        </span>
                        <span className="font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="px-6 pt-4">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full rounded-full bg-ink font-sans text-[0.65rem] uppercase tracking-wide-2 text-paper hover:bg-ink/85"
                  >
                    <a href="#contact">Book Mizuhara</a>
                  </Button>
                </SheetClose>
              </div>
              <div className="mt-auto px-6 py-6 font-sans text-[0.55rem] uppercase tracking-wide-2 text-ink/50">
                {MODEL.location}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
