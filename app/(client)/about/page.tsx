import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/footer/footer';

const services = [
  {
    number: '01',
    title: 'Photography',
    description:
      'Editorial, commercial, interior, portrait, and event photography shaped around atmosphere, detail, and authentic moments.',
  },
  {
    number: '02',
    title: 'Cinematography',
    description:
      'Visual storytelling for brands, spaces, people, and events with a cinematic approach to movement, light, and emotion.',
  },
  {
    number: '03',
    title: 'Creative Direction',
    description:
      'From visual concepts to final frames, we help shape a consistent visual language that feels considered and distinctive.',
  },
];

const principles = [
  {
    number: '01',
    title: 'Observe',
    text: 'We start by understanding the subject, the space, the people, and the feeling that needs to come through.',
  },
  {
    number: '02',
    title: 'Compose',
    text: 'Light, perspective, movement, and negative space are carefully considered to create images with intention.',
  },
  {
    number: '03',
    title: 'Refine',
    text: 'Every frame is edited with restraint. The goal is not simply to make an image beautiful, but to make it meaningful.',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="min-h-screen px-5 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-28 lg:px-10 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-360">
          <div className="flex min-h-[70vh] flex-col justify-between">
            <div>
              <div className="mb-8 flex items-center gap-4 sm:mb-10">
                <span className="bg-foreground/40 h-px w-8" />

                <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
                  02 / About
                </p>
              </div>

              <h1 className="max-w-6xl font-serif text-[clamp(4.5rem,13vw,12rem)] leading-[0.78] tracking-[-0.06em]">
                We create
                <br />
                <span className="text-secondary">what remains.</span>
              </h1>
            </div>

            <div className="mt-20 flex flex-col justify-between gap-10 sm:mt-28 lg:flex-row lg:items-end">
              <p className="text-secondary max-w-xl text-base leading-8 sm:text-lg sm:leading-9">
                ST Photography is a visual studio focused on photography and cinematography. We
                create considered imagery for people, places, events, and brands.
              </p>

              <a
                href="#story"
                className="group text-muted flex w-fit items-center gap-4 text-[10px] font-medium tracking-[0.22em] uppercase transition-opacity duration-300 hover:opacity-50 sm:text-xs"
              >
                Explore
                <ArrowDown
                  size={15}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="story"
        className="border-foreground/10 border-t px-5 py-24 sm:px-8 sm:py-36 lg:px-10 lg:py-48"
      >
        <div className="mx-auto max-w-360">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
                The Studio
              </p>
            </div>

            <div className="max-w-4xl">
              <h2 className="font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.84] tracking-tighter">
                Images should feel
                <br />
                <span className="text-secondary">like something.</span>
              </h2>

              <div className="text-secondary mt-12 max-w-2xl space-y-7 text-sm leading-8 sm:mt-16 sm:text-base sm:leading-9">
                <p>
                  We believe strong visual work begins with attention. Before we photograph
                  anything, we look at the details that make it unique: the way light enters a room,
                  the relationship between people, the character of a place, or the small moment
                  that would otherwise go unnoticed.
                </p>

                <p>
                  Our approach combines clean composition with a sense of atmosphere. We avoid
                  unnecessary styling and let the subject speak when it already has something to
                  say.
                </p>

                <p>
                  Whether we are documenting an intimate portrait, an interior, a celebration, or a
                  brand story, the intention remains the same: create visual work that feels honest
                  today and still holds meaning years from now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-foreground/10 border-t px-5 py-24 sm:px-8 sm:py-36 lg:px-10 lg:py-48">
        <div className="mx-auto max-w-360">
          <div className="mb-16 flex items-center gap-4 sm:mb-24">
            <span className="bg-foreground/40 h-px w-8" />

            <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
              What We Do
            </p>
          </div>

          <div className="divide-foreground/10 border-foreground/10 divide-y border-y">
            {services.map((service) => (
              <article
                key={service.number}
                className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[100px_0.8fr_1fr] lg:items-start lg:gap-16 lg:py-16"
              >
                <span className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
                  {service.number}
                </span>

                <h2 className="font-serif text-5xl leading-none tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  {service.title}
                </h2>

                <p className="text-secondary max-w-xl text-sm leading-7 sm:text-base sm:leading-8">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-foreground/10 border-t px-5 py-24 sm:px-8 sm:py-36 lg:px-10 lg:py-48">
        <div className="mx-auto max-w-360">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
                Our Approach
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.84] tracking-tighter">
                Quietly
                <br />
                <span className="text-secondary">intentional.</span>
              </h2>

              <div className="divide-foreground/10 border-foreground/10 mt-16 divide-y border-y">
                {principles.map((principle) => (
                  <div
                    key={principle.number}
                    className="grid gap-6 py-8 sm:grid-cols-[70px_220px_1fr] sm:gap-8 sm:py-10"
                  >
                    <span className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
                      {principle.number}
                    </span>

                    <h3 className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
                      {principle.title}
                    </h3>

                    <p className="text-secondary max-w-lg text-sm leading-7 sm:text-base sm:leading-8">
                      {principle.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-foreground/10 border-t px-5 py-28 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
        <div className="mx-auto max-w-360">
          <div className="max-w-5xl">
            <p className="text-muted mb-8 text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
              Start a Project
            </p>

            <h2 className="font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.78] tracking-[-0.06em]">
              Have something
              <br />
              <span className="text-secondary">in mind?</span>
            </h2>

            <Link
              href="/#contact"
              className="group border-foreground mt-12 inline-flex items-center gap-4 border-b pb-3 text-[10px] font-medium tracking-[0.22em] uppercase transition-opacity duration-300 hover:opacity-50 sm:mt-16 sm:text-xs"
            >
              Let&apos;s talk
              <ArrowUpRight
                size={16}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
