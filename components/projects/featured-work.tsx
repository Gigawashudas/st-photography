'use client';

import { motion } from 'motion/react';
import { ProjectCard } from './project-card';

type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  cover_image: string | null;
  featured: boolean;
  featured_order: number;
};

type FeaturedWorkProps = {
  projects: Project[];
};

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section id="work" className="bg-background px-5 py-24 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
      {' '}
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 grid gap-8 md:mb-36 md:grid-cols-[1fr_280px] md:items-end lg:grid-cols-[1fr_340px]"
        >
          {' '}
          <div>
            {' '}
            <div className="mb-7 flex items-center gap-3 sm:mb-8 sm:gap-4">
              {' '}
              <span className="h-px w-6 bg-foreground/40 sm:w-8" />
              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-muted sm:text-xs sm:tracking-[0.25em]">
                01 / Selected Work
              </p>
            </div>
            <h2 className="max-w-4xl font-serif text-[clamp(3.7rem,17vw,9rem)] leading-[0.82] tracking-[-0.055em] sm:text-[clamp(4rem,9vw,9rem)] sm:tracking-[-0.045em]">
              Stories
              <br />
              <span className="ml-[13vw] sm:ml-[8vw]">in frames.</span>
            </h2>
          </div>
          <div className="max-w-[230px] md:max-w-xs md:pb-2">
            <p className="text-[11px] font-light leading-6 tracking-[0.1em] text-secondary sm:text-base sm:leading-8 sm:tracking-[0.08em]">
              Still images.
              <br />
              Moving stories.
            </p>
          </div>
        </motion.div>

        {projects.length > 0 ? (
          <div className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-36">
            {projects.map((project, index) => {
              if (!project.cover_image) {
                return null;
              }

              const aspectClass =
                index === 0 ? 'aspect-[4/5]' : index === 1 ? 'aspect-[3/4]' : 'aspect-[16/10]';

              if (index === 0) {
                return (
                  <div key={project.id} className="md:pt-24">
                    <ProjectCard
                      title={project.title}
                      category={project.category}
                      number={String(index + 1).padStart(2, '0')}
                      image={project.cover_image}
                      aspectClass={aspectClass}
                      slug={project.slug}
                      priority
                    />
                  </div>
                );
              }

              if (index === 1) {
                return (
                  <div key={project.id}>
                    <ProjectCard
                      title={project.title}
                      category={project.category}
                      number={String(index + 1).padStart(2, '0')}
                      image={project.cover_image}
                      aspectClass={aspectClass}
                      slug={project.slug}
                    />
                  </div>
                );
              }

              return (
                <div key={project.id} className="md:col-span-2 md:mx-auto md:w-[70%]">
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    number={String(index + 1).padStart(2, '0')}
                    image={project.cover_image}
                    aspectClass={aspectClass}
                    slug={project.slug}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-y border-foreground/10 py-20 text-center">
            <p className="font-serif text-3xl tracking-[-0.03em]">Selected work coming soon.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="mt-20 flex justify-center sm:mt-32"
        >
          <a
            href="/work"
            className="group flex min-h-11 items-center gap-5 text-[9px] font-medium uppercase tracking-[0.35em] text-secondary transition-colors duration-300 hover:text-foreground sm:gap-6 sm:text-[10px]"
          >
            <span className="relative">
              View all work
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
            </span>

            <span className="text-base font-light transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
