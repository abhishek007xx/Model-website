import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { Marquee } from "@/components/portfolio/marquee";
import { About } from "@/components/portfolio/about";
import { Stats } from "@/components/portfolio/stats";
import { GalleryIntro } from "@/components/portfolio/gallery-intro";
import { HorizontalGallery } from "@/components/portfolio/horizontal-gallery";
import { Gallery } from "@/components/portfolio/gallery";
import { Experience } from "@/components/portfolio/experience";
import { Services } from "@/components/portfolio/services";
import { Contact } from "@/components/portfolio/contact";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SectionDivider } from "@/components/portfolio/section-divider";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        {/* Hero (dark, cinematic) */}
        <Hero />

        {/* Marquee seam */}
        <Marquee variant="dark" duration={36} />

        {/* About (paper, parallax collage) */}
        <About />

        {/* Wedge transition paper → ink */}
        <SectionDivider variant="wedge-down" from="bg-paper" to="bg-ink" />

        {/* Stats (ink, pinned image stacking) */}
        <Stats />

        {/* Gallery: intro → filmstrip → collage (ink → ink → paper) */}
        <GalleryIntro />
        <HorizontalGallery />
        <SectionDivider variant="wedge-up" from="bg-ink" to="bg-paper" />
        <Gallery />

        {/* Experience (ink, pinned horizontal credits) */}
        <Experience />

        {/* Services (paper) */}
        <Services />

        {/* Contact (ink) */}
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
