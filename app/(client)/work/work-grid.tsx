'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';

import type { Project, ProjectCategory } from '@/lib/projects/get-project';

type Filter = 'All' | ProjectCategory;

const filters: Filter[] = ['All', 'Interior Photography', 'Interior Cinematography'];

type WorkGridProps = {
  projects: Project[];
};

export function WorkGrid({ projects }: WorkGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.25,
        }}
        className="border-foreground/10 mt-16 border-y py-5 sm:mt-20 sm:py-6"
      >
        <div className="flex flex-wrap gap-x-7 gap-y-4 sm:gap-x-10">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={[
                  'relative text-[9px] font-medium tracking-[0.25em] uppercase sm:text-[10px]',
                  'transition-colors duration-300',
                  isActive ? 'text-foreground' : 'text-muted hover:text-foreground',
                ].join(' ')}
              >
                {filter}

                <span
                  aria-hidden="true"
                  className={[
                    'bg-foreground absolute -bottom-2 left-0 h-px',
                    'transition-all duration-500',
                    isActive ? 'w-full' : 'w-0',
                  ].join(' ')}
                />
              </button>
            );
          })}
        </div>
      </motion.div>

      <section className="pt-20 sm:pt-24 lg:pt-28">
        <motion.div
          layout
          className="grid gap-x-8 gap-y-20 md:grid-cols-2 md:gap-x-10 md:gap-y-28 lg:gap-x-12 lg:gap-y-32"
        >
          {visibleProjects.map((project, index) => {
            const hasImage = Boolean(project.cover_image?.trim());

            if (!hasImage) {
              return null;
            }

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: Math.min(index * 0.06, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="bg-subtle relative aspect-[16/10] overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.035 }}
                      transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image
                        src={project.cover_image as string}
                        alt={project.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
                  </div>

                  <div className="border-foreground/10 mt-5 border-t pt-4">
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[0.95] font-medium tracking-[-0.035em]">
                          {project.title}
                        </h2>

                        <div className="text-muted mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-medium tracking-[0.2em] uppercase sm:text-[10px]">
                          <span>{project.category.replace('Interior ', '')}</span>

                          <span aria-hidden="true" className="bg-foreground/20 h-px w-4" />

                          <span>{project.location}</span>

                          <span aria-hidden="true" className="bg-foreground/20 h-px w-4" />

                          <span>{project.year}</span>
                        </div>
                      </div>

                      <span
                        aria-hidden="true"
                        className="text-muted mt-1 shrink-0 text-sm transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        {visibleProjects.length === 0 && (
          <div className="border-foreground/10 flex min-h-[280px] items-center border-y">
            <p className="type-label-sm text-muted">No projects found</p>
          </div>
        )}
      </section>
    </>
  );
}
