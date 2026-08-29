import { AboutSection } from "@/components/about/about-section";
import { CinematicHero } from "@/components/hero/cinematic-hero";
import { ContactSection } from "@/components/contact/contact-section";
import { FeaturedWork } from "@/components/projects/featured-work";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navigation/navbar";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <CinematicHero />

      <FeaturedWork />

      <AboutSection />

      <ContactSection />

      <Footer />
    </main>
  );
}
