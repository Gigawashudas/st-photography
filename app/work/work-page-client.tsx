'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

type ProjectCategory = 'Interior Photography' | 'Interior Cinematography';

type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  cover_image: string | null;
  featured: boolean;
  featured_order: number;
};

type Filter = 'All' | ProjectCategory;

type WorkPageClientProps = {
  projects: Project[];
};

const filters: Filter[] = ['All', 'Interior Photography', 'Interior Cinematography'];

export default function WorkPageClient({ projects }: WorkPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter === 'All') {
        return true;
      }

      return project.category === activeFilter;
    });
  }, [activeFilter, projects]);

  return (
    <main className="min-h-screen bg-background">
      {' '}
      <section className="px-6 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44 lg:px-10 lg:pb-40 lg:pt-52">
        {' '}
        <div className="mx-auto max-w-360">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end"
          >
            {' '}
            <div>
              {' '}
              <div className="mb-8 flex items-center gap-4">
                {' '}
                <span className="h-px w-8 bg-foreground/40" />
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted sm:text-xs">
                  Selected Work
                </p>
              </div>
              <h1 className="max-w-5xl font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-[-0.055em]">
                Spaces
                <br />
                <span className="ml-[8vw]">worth remembering.</span>
              </h1>
            </div>
            <p className="max-w-sm text-sm font-light leading-7 tracking-wider text-secondary sm:text-base sm:leading-8 lg:pb-2">
              Interior photography and cinematography for spaces, architecture, designers,
              developers, hospitality, and brands.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
            className="mt-20 border-y border-foreground/10 py-5 sm:mt-28 sm:py-6"
          >
            <div className="flex flex-wrap gap-x-7 gap-y-4 sm:gap-x-10">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`relative text-[9px] font-medium uppercase tracking-[0.25em] transition-opacity duration-300 sm:text-[10px] ${isActive ? 'text-foreground' : 'text-muted hover:text-foreground'}`}
                  >
                    {filter}

                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-foreground transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="px-6 pb-32 sm:px-8 sm:pb-40 lg:px-10 lg:pb-52">
        <div className="mx-auto max-w-360">
          <motion.div
            layout
            className="grid gap-x-8 gap-y-24 md:grid-cols-2 md:gap-x-10 md:gap-y-36"
          >
            {visibleProjects.map((project, index) => {
              if (!project.cover_image) {
                return null;
              }

              const isWide = index % 5 === 2;

              const aspectClass = isWide
                ? 'aspect-[16/10]'
                : index % 2 === 0
                  ? 'aspect-[4/5]'
                  : 'aspect-[3/4]';

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: Math.min(index * 0.06, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={isWide ? 'md:col-span-2 md:mx-auto md:w-[72%]' : ''}
                >
                  <Link href={`/projects/${project.slug}`} className="group block">
                    <div className="relative overflow-hidden bg-subtle">
                      <div className={`relative ${aspectClass}`}>
                        <Image
                          src={project.cover_image}
                          alt={project.title}
                          fill
                          sizes={
                            isWide
                              ? '(max-width: 768px) 100vw, 72vw'
                              : '(max-width: 768px) 100vw, 50vw'
                          }
                          className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.035]"
                        />

                        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
                      </div>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-8">
                      <div>
                        <h2 className="font-serif text-2xl leading-none tracking-tight sm:text-3xl lg:text-4xl">
                          {project.title}
                        </h2>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[9px] font-medium uppercase tracking-[0.2em] text-muted sm:text-[10px]">
                          <span>{project.category}</span>
                          <span>{project.location}</span>
                          <span>{project.year}</span>
                        </div>
                      </div>

                      <span className="pt-1 text-[10px] font-medium tracking-[0.2em] text-muted sm:text-[11px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>

          {visibleProjects.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-muted">No projects found</p>
            </div>
          )}
        </div>
      </section>
      <section className="border-t border-foreground/10 px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto flex max-w-360 flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">
              Have a space to photograph?
            </p>

            <h2 className="max-w-3xl font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.84] tracking-tighter">
              Let&apos;s make
              <br />
              it memorable.
            </h2>
          </div>

          <Link
            href="/#contact"
            className="group flex items-center gap-5 border-b border-foreground pb-3 text-[10px] font-medium uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-50 sm:text-xs"
          >
            Start a project
            <span className="text-base transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
