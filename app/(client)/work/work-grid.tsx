'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
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

      <section className="px-6 pb-32 sm:px-8 sm:pb-40 lg:px-10 lg:pb-52">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            layout
            className="grid gap-x-8 gap-y-24 md:grid-cols-2 md:gap-x-10 md:gap-y-36"
          >
            {visibleProjects.map((project, index) => {
              const isWide = index % 5 === 2;

              if (!project.cover_image) {
                return null;
              }

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
                  <Link href={`/work/${project.slug}`} className="group block">
                    <div className="relative overflow-hidden bg-subtle">
                      <div
                        className={`relative ${isWide ? 'aspect-[16/10]' : index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}
                      >
                        <Image
                          src={project.cover_image}
                          alt={project.title}
                          fill
                          sizes={
                            isWide
                              ? '(max-width: 768px) 100vw, 72vw'
                              : '(max-width: 768px) 100vw, 50vw'
                          }
                          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                        />

                        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
                      </div>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-8">
                      <div>
                        <h2 className="font-serif text-2xl leading-none tracking-[-0.025em] sm:text-3xl lg:text-4xl">
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
    </>
  );
}
