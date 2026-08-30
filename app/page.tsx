import { AboutSection } from '@/components/about/about-section';
import { CinematicHero } from '@/components/hero/cinematic-hero';
import { ContactSection } from '@/components/contact/contact-section';
import { FeaturedWork } from '@/components/projects/featured-work';
import { Footer } from '@/components/footer/footer';
import { Navbar } from '@/components/navigation/navbar';
import { getFeaturedProjects } from '@/lib/projects/get-project';

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <CinematicHero />

      <FeaturedWork projects={projects} />

      <AboutSection />

      <ContactSection />

      <Footer />
    </main>
  );
}
