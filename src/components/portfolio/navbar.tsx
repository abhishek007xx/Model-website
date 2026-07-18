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
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-foreground"
        >
          {MODEL.name}
          <span className="text-accent-foreground/40">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[0.7rem] uppercase tracking-wide-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-full border-foreground/30 text-[0.7rem] uppercase tracking-wide-2 hover:bg-foreground hover:text-background"
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
                className="text-foreground"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm border-l border-border bg-background p-0"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="font-serif text-xl font-semibold">
                  {MODEL.name}
                </span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <ul className="flex flex-col px-2 py-4">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <SheetClose asChild>
                      <a
                        href={l.href}
                        className="block px-6 py-4 font-serif text-2xl text-foreground transition-colors hover:bg-accent"
                      >
                        {l.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <div className="px-6 pt-4">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    <a href="#contact">Book Mizuhara</a>
                  </Button>
                </SheetClose>
              </div>
              <div className="mt-auto px-6 py-6 text-xs uppercase tracking-wide-2 text-muted-foreground">
                {MODEL.location}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
