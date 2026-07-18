import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Stats } from "@/components/portfolio/stats";
import { Gallery } from "@/components/portfolio/gallery";
import { Experience } from "@/components/portfolio/experience";
import { Services } from "@/components/portfolio/services";
import { Contact } from "@/components/portfolio/contact";
import { SiteFooter } from "@/components/portfolio/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Stats />
        <Gallery />
        <Experience />
        <Services />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
