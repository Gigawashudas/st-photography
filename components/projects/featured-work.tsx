'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import type { Project } from '@/lib/projects/get-project';

type FeaturedWorkProps = {
  projects: Project[];
};

function getYoutubeVideoId(url: string | null) {
  if (!url) {
    return null;
  }

  const value = url.trim();

  if (!value) {
    return null;
  }

  // Raw YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) {
    return value;
  }

  try {
    const parsedUrl = new URL(value);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname === 'youtu.be') {
      const id = parsedUrl.pathname.replace(/^\/+/, '').split('/')[0];

      return id || null;
    }

    if (
      hostname === 'youtube.com' ||
      hostname === 'www.youtube.com' ||
      hostname === 'm.youtube.com'
    ) {
      const watchId = parsedUrl.searchParams.get('v');

      if (watchId) {
        return watchId;
      }

      const embedMatch = parsedUrl.pathname.match(/\/embed\/([^/?]+)/);

      if (embedMatch) {
        return embedMatch[1];
      }

      const shortsMatch = parsedUrl.pathname.match(/\/shorts\/([^/?]+)/);

      if (shortsMatch) {
        return shortsMatch[1];
      }
    }
  } catch {
    // Fall through to regex extraction.
  }

  // Final fallback: find an 11-character YouTube ID anywhere in the value.
  const fallbackMatch = value.match(
    /(?:v=|youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
  );

  return fallbackMatch?.[1] ?? null;
}

type FeaturedProjectCardProps = {
  project: Project;
  priority?: boolean;
};

function FeaturedProjectCard({ project, priority = false }: FeaturedProjectCardProps) {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: 0.8,
        delay: priority ? 0 : 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-w-0"
    >
      <div className="bg-subtle relative aspect-[16/10] w-full overflow-hidden">
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
                  duration: 1.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={project.cover_image as string}
                  alt={project.title}
                  fill
                  priority={priority}
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 720px"
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
        <div className="flex items-start justify-between gap-4 sm:gap-6">
          <div className="min-w-0">
            <Link href={`/work/${project.slug}`} className="group">
              <h3 className="project-card-title">{project.title}</h3>
            </Link>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
              <p className="project-card-category text-muted">
                {project.category.replace('Interior ', '')}
              </p>

              <span aria-hidden="true" className="bg-foreground/20 h-px w-3 shrink-0 sm:w-4" />

              <p className="project-card-category text-muted">{project.location}</p>

              <span aria-hidden="true" className="bg-foreground/20 h-px w-3 shrink-0 sm:w-4" />

              <p className="project-card-category text-muted">{project.year}</p>
            </div>
          </div>

          <Link
            href={`/work/${project.slug}`}
            aria-label={`View ${project.title}`}
            className="text-muted mt-1 shrink-0 text-base transition-transform duration-500 hover:translate-x-1 hover:-translate-y-1"
          >
            ↗
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const photographyProjects = projects
    .filter((project) => project.category === 'Interior Photography')
    .sort((a, b) => a.featured_order - b.featured_order)
    .slice(0, 2);

  const cinematographyProjects = projects
    .filter((project) => project.category === 'Interior Cinematography')
    .sort((a, b) => a.featured_order - b.featured_order)
    .slice(0, 2);

  function renderProjects(projectsToRender: Project[]) {
    if (projectsToRender.length === 0) {
      return (
        <div className="border-foreground/10 flex min-h-[280px] items-center border-y">
          <p className="type-label-sm text-muted">No featured projects</p>
        </div>
      );
    }

    return (
      <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-10">
        {projectsToRender.map((project, index) => (
          <FeaturedProjectCard key={project.id} project={project} priority={index < 2} />
        ))}
      </div>
    );
  }

  return (
    <section
      id="work"
      className="bg-background text-foreground px-5 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-32"
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
          <div className="flex items-center justify-between gap-6 sm:gap-8">
            <div className="flex min-w-0 items-center gap-4">
              <span className="editorial-rule shrink-0" />

              <p className="type-label text-muted">Featured work</p>
            </div>

            <Link href="/work" className="editorial-link group hidden shrink-0 sm:flex">
              <span className="text-2xl">View all work</span>
              <span
                aria-hidden="true"
                className="text-sm transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <h2 className="type-display-md w-full max-w-full text-center text-[clamp(2.25rem,7vw,6rem)] leading-[0.9]">
              Spaces We&apos;ve Captured
            </h2>

            <p className="w-full max-w-3xl text-center text-sm leading-6 sm:text-base">
              A curated collection of spaces we&apos;ve captured, showcasing the beauty, details,
              and design behind every project.
            </p>
          </div>
        </motion.div>

        <section className="mt-16 sm:mt-20 lg:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 flex items-center gap-4 sm:mb-10"
          ></motion.div>

          {renderProjects(photographyProjects)}
        </section>

        <section className="mt-20 sm:mt-24 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 flex items-center gap-4 sm:mb-10"
          ></motion.div>

          {renderProjects(cinematographyProjects)}
        </section>

        <div className="border-foreground/10 mt-12 border-t pt-6 sm:mt-16">
          <Link href="/work" className="editorial-link group">
            <span className="text-2xl">View all work</span>
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
