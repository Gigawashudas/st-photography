import { AboutSection } from "@/components/about/about-section";
import { CinematicHero } from "@/components/hero/cinematic-hero";
import { ContactSection } from "@/components/contact/contact-section";
import { FeaturedWork } from "@/components/projects/featured-work";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navigation/navbar";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase.from("projects").select("id, slug, title, category, location, year, cover_image, featured, featured_order").eq("published", true).eq("featured", true).order("featured_order", { ascending: true }).order("created_at", { ascending: false }).limit(3);

  if (error) {
    console.error("Featured projects fetch error:", error);
  }

  return (
    <main className="bg-background text-foreground">
      {" "}
      <Navbar />
      <CinematicHero />
      <FeaturedWork projects={projects ?? []} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
