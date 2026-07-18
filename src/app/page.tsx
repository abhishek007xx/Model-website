import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Stats } from "@/components/portfolio/stats";
import { GalleryIntro } from "@/components/portfolio/gallery-intro";
import { HorizontalGallery } from "@/components/portfolio/horizontal-gallery";
import { Gallery } from "@/components/portfolio/gallery";
import { Experience } from "@/components/portfolio/experience";
import { Services } from "@/components/portfolio/services";
import { Contact } from "@/components/portfolio/contact";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { Marquee } from "@/components/portfolio/marquee";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee variant="dark" duration={36} />
        <About />
        <Stats />
        {/* Cinematic gallery experience — intro → filmstrip → collage */}
        <GalleryIntro />
        <HorizontalGallery />
        <Gallery />
        <Experience />
        <Services />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
