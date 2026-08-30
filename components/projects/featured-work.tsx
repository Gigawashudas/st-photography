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

function ProjectSection({
  number,
  title,
  projects,
}: {
  number: string;
  title: string;
  projects: Project[];
}) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-20 sm:mt-28 lg:mt-36">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="border-foreground/10 mb-10 flex items-end justify-between gap-6 border-b pb-5 sm:mb-14 sm:pb-6"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="bg-foreground/40 h-px w-6 sm:w-8" />

          <p className="text-muted text-[9px] font-medium tracking-[0.28em] uppercase sm:text-[10px] sm:tracking-[0.25em]">
            {number}
          </p>

          <h3 className="font-serif text-3xl tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            {title}
          </h3>
        </div>

        <p className="text-muted hidden text-[9px] font-medium tracking-[0.2em] uppercase sm:block">
          {String(projects.length).padStart(2, '0')} projects
        </p>
      </motion.div>

      <div className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-32">
        {projects.slice(0, 2).map((project, index) => {
          if (!project.cover_image) {
            return null;
          }

          const aspectClass = index === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]';

          if (index === 0) {
            return (
              <div key={project.id} className="md:pt-20">
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  number={`${number.split(' ')[0]}.${String(index + 1).padStart(2, '0')}`}
                  image={project.cover_image}
                  aspectClass={aspectClass}
                  slug={project.slug}
                  priority
                />
              </div>
            );
          }

          return (
            <div key={project.id}>
              <ProjectCard
                title={project.title}
                category={project.category}
                number={`${number.split(' ')[0]}.${String(index + 1).padStart(2, '0')}`}
                image={project.cover_image}
                aspectClass={aspectClass}
                slug={project.slug}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const photographyProjects = projects
    .filter((project) => project.category === 'Interior Photography')
    .slice(0, 2);

  const cinematographyProjects = projects
    .filter((project) => project.category === 'Interior Cinematography')
    .slice(0, 2);

  const hasProjects = photographyProjects.length > 0 || cinematographyProjects.length > 0;

  return (
    <section id="work" className="bg-background px-5 py-24 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 grid gap-8 md:mb-28 md:grid-cols-[1fr_280px] md:items-end lg:grid-cols-[1fr_340px]"
        >
          <div>
            <div className="mb-7 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <span className="bg-foreground/40 h-px w-6 sm:w-8" />

              <p className="text-muted text-[9px] font-medium tracking-[0.28em] uppercase sm:text-xs sm:tracking-[0.25em]">
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
            <p className="text-secondary text-[11px] leading-6 font-light tracking-[0.1em] sm:text-base sm:leading-8 sm:tracking-[0.08em]">
              Still images.
              <br />
              Moving stories.
            </p>
          </div>
        </motion.div>

        {hasProjects ? (
          <>
            <ProjectSection number="01" title="Photography" projects={photographyProjects} />

            <ProjectSection number="02" title="Cinematography" projects={cinematographyProjects} />
          </>
        ) : (
          <div className="border-foreground/10 border-y py-20 text-center">
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
            className="group text-secondary hover:text-foreground flex min-h-11 items-center gap-5 text-[9px] font-medium tracking-[0.35em] uppercase transition-colors duration-300 sm:gap-6 sm:text-[10px]"
          >
            <span className="relative">
              View all work
              <span className="bg-foreground absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
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
