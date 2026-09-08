'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import type { Project, ProjectCategory } from '@/lib/projects/get-project';

type Filter = 'All' | ProjectCategory;

const filters: Filter[] = ['All', 'Interior Photography', 'Interior Cinematography'];

type WorkGridProps = {
  projects: Project[];
};

function getYoutubeVideoId(url: string | null) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname === 'youtu.be') {
      return parsedUrl.pathname.replace(/^\/+/, '').split('/')[0].split('?')[0];
    }

    if (
      hostname === 'youtube.com' ||
      hostname === 'www.youtube.com' ||
      hostname === 'm.youtube.com'
    ) {
      const videoId = parsedUrl.searchParams.get('v');

      if (videoId) {
        return videoId;
      }

      const embedMatch = parsedUrl.pathname.match(/^\/embed\/([^/?]+)/);

      if (embedMatch) {
        return embedMatch[1];
      }

      const shortsMatch = parsedUrl.pathname.match(/^\/shorts\/([^/?]+)/);

      if (shortsMatch) {
        return shortsMatch[1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

type WorkProjectCardProps = {
  project: Project;
  index: number;
};

function WorkProjectCard({ project, index }: WorkProjectCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const hasImage = Boolean(project.cover_image?.trim());
  const isCinematography = project.category === 'Interior Cinematography';

  const youtubeVideoId = getYoutubeVideoId(project.youtube_url);

  function handlePlay(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsPlaying(true);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="bg-subtle relative aspect-[16/10] overflow-hidden">
        {isPlaying && youtubeVideoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
            title={`${project.title} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 z-30 h-full w-full"
          />
        ) : (
          <>
            {hasImage ? (
              <motion.div
                className="absolute inset-0"
                whileHover={{
                  scale: isCinematography ? 1 : 1.035,
                }}
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
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="type-label-sm text-muted">ST Photography</span>
              </div>
            )}

            {isCinematography && youtubeVideoId && (
              <button
                type="button"
                aria-label={`Play ${project.title}`}
                onClick={handlePlay}
                className="absolute top-1/2 left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/80 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-black/60 sm:h-20 sm:w-20"
              >
                <span aria-hidden="true" className="ml-1 text-lg sm:text-xl">
                  ▶
                </span>
              </button>
            )}

            <Link
              href={`/work/${project.slug}`}
              aria-label={`View ${project.title}`}
              className="absolute inset-0 z-10"
            >
              <span className="sr-only">View project</span>
            </Link>

            <div className="pointer-events-none absolute inset-0 z-[5] bg-black/0 transition-colors duration-700 hover:bg-black/10" />
          </>
        )}
      </div>

      <div className="border-foreground/10 mt-5 border-t pt-4">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <Link href={`/work/${project.slug}`}>
              <h2 className="text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[0.95] font-medium tracking-[-0.035em]">
                {project.title}
              </h2>
            </Link>

            <div className="text-muted mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-medium tracking-[0.2em] uppercase sm:text-[10px]">
              <span>{project.category.replace('Interior ', '')}</span>

              <span aria-hidden="true" className="bg-foreground/20 h-px w-4" />

              <span>{project.location}</span>

              <span aria-hidden="true" className="bg-foreground/20 h-px w-4" />

              <span>{project.year}</span>
            </div>
          </div>

          <Link
            href={`/work/${project.slug}`}
            aria-label={`View ${project.title}`}
            className="text-muted mt-1 shrink-0 text-sm transition-transform duration-500 hover:translate-x-1 hover:-translate-y-1"
          >
            ↗
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

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
          {visibleProjects.map((project, index) => (
            <WorkProjectCard key={project.id} project={project} index={index} />
          ))}
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
