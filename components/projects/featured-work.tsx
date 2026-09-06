'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

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

type Category = 'Photography' | 'Cinematography';

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('Photography');

  const visibleProjects = useMemo(() => {
    const category =
      activeCategory === 'Photography' ? 'Interior Photography' : 'Interior Cinematography';

    return projects
      .filter((project) => project.category === category)
      .sort((a, b) => a.featured_order - b.featured_order)
      .slice(0, 2);
  }, [activeCategory, projects]);

  const photographyActive = activeCategory === 'Photography';
  const cinematographyActive = activeCategory === 'Cinematography';

  return (
    <section
      id="work"
      className="bg-background text-foreground px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <span className="editorial-rule" />
              <p className="type-label text-muted">Featured work</p>
            </div>

            <Link href="/work" className="editorial-link group hidden sm:flex">
              View all work
              <span
                aria-hidden="true"
                className="text-sm transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-full"
          >
            <div className="flex w-dvw flex-col items-center justify-center gap-5">
              <h2 className="type-display-md min-w-200 text-center whitespace-nowrap">
                Spaces We’ve Captured
              </h2>
              <p className="w-300 text-center">
                A curated collection of spaces we’ve captured, showcing the beauty, details, and
                design behind every projects.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-8 lg:flex lg:flex-col lg:items-end lg:justify-between lg:gap-12"
          >
            <div className="mt-8 flex shrink-0 flex-col items-start gap-5 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
              <button
                type="button"
                onClick={() => setActiveCategory('Photography')}
                aria-pressed={photographyActive}
                className={[
                  'relative pb-2',
                  'text-[10px] font-medium tracking-[0.2em] uppercase sm:text-[11px]',
                  'transition-colors duration-300',
                  photographyActive ? 'text-foreground' : 'text-muted hover:text-foreground',
                ].join(' ')}
              >
                Photography
                <span
                  aria-hidden="true"
                  className={[
                    'absolute inset-x-0 bottom-0 h-px origin-left',
                    'bg-foreground transition-transform duration-500',
                    photographyActive ? 'scale-x-100' : 'scale-x-0',
                  ].join(' ')}
                />
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('Cinematography')}
                aria-pressed={cinematographyActive}
                className={[
                  'relative pb-2',
                  'text-[10px] font-medium tracking-[0.2em] uppercase sm:text-[11px]',
                  'transition-colors duration-300',
                  cinematographyActive ? 'text-foreground' : 'text-muted hover:text-foreground',
                ].join(' ')}
              >
                Cinematography
                <span
                  aria-hidden="true"
                  className={[
                    'absolute inset-x-0 bottom-0 h-px origin-left',
                    'bg-foreground transition-transform duration-500',
                    cinematographyActive ? 'scale-x-100' : 'scale-x-0',
                  ].join(' ')}
                />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 sm:mt-16 lg:mt-20"
        >
          {visibleProjects.length > 0 ? (
            <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-10">
              {visibleProjects.map((project, index) => {
                const hasImage = Boolean(project.cover_image?.trim());

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link href={`/work/${project.slug}`} className="group block">
                      <article>
                        <div className="bg-subtle relative aspect-[16/10] overflow-hidden">
                          {hasImage ? (
                            <motion.div
                              className="absolute inset-0"
                              whileHover={{ scale: 1.035 }}
                              transition={{
                                duration: 1.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <Image
                                src={project.cover_image as string}
                                alt={project.title}
                                fill
                                priority={index < 2}
                                sizes="(max-width: 767px) 100vw, 50vw"
                                className="object-cover"
                              />
                            </motion.div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="type-label-sm text-muted">ST Photography</span>
                            </div>
                          )}
                        </div>

                        <div className="border-foreground/10 mt-5 border-t pt-4">
                          <div className="flex items-start justify-between gap-6">
                            <div className="min-w-0">
                              <h3 className="project-card-title">{project.title}</h3>

                              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                                <p className="project-card-category text-muted">
                                  {project.category.replace('Interior ', '')}
                                </p>

                                <span className="bg-foreground/20 h-px w-4" />

                                <p className="project-card-category text-muted">
                                  {project.location}
                                </p>

                                <span className="bg-foreground/20 h-px w-4" />

                                <p className="project-card-category text-muted">{project.year}</p>
                              </div>
                            </div>

                            <span
                              aria-hidden="true"
                              className="text-muted mt-1 shrink-0 text-base transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                            >
                              ↗
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="border-foreground/10 flex min-h-[280px] items-center border-y">
              <p className="type-label-sm text-muted">No featured projects</p>
            </div>
          )}
        </motion.div>

        <div className="border-foreground/10 mt-12 border-t pt-6 sm:mt-16 sm:hidden">
          <Link href="/work" className="editorial-link group">
            View all work
            <span
              aria-hidden="true"
              className="text-sm transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
