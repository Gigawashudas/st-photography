import { CinematicHero } from "../components/hero/cinematic-hero";
import { Navbar } from "../components/navigation/navbar";
import { FeaturedWork } from "../components/projects/featured-work";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <CinematicHero />

      <FeaturedWork />

      <section id="about" className="min-h-screen px-6 py-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">About</p>

          <h2 className="mt-6 max-w-4xl font-serif text-5xl tracking-tight sm:text-7xl">The story behind the lens.</h2>
        </div>
      </section>

      <section id="contact" className="min-h-screen px-6 py-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Contact</p>

          <h2 className="mt-6 max-w-4xl font-serif text-5xl tracking-tight sm:text-7xl">Let&apos;s create something.</h2>
        </div>
      </section>
    </main>
  );
}
