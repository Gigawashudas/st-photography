'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Project } from '@/lib/projects/get-project';

type ProjectDetailProps = {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
};

function getYoutubeEmbedUrl(url: string | null) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === 'youtu.be') {
      const videoId = parsedUrl.pathname.replace('/', '').trim();

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (parsedUrl.hostname === 'youtube.com' || parsedUrl.hostname === 'www.youtube.com') {
      const videoId = parsedUrl.searchParams.get('v');

      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

export function ProjectDetail({ project, previousProject, nextProject }: ProjectDetailProps) {
  const isCinematography = project.category === 'Interior Cinematography';
  const youtubeEmbedUrl = getYoutubeEmbedUrl(project.youtube_url);

  return (
    <main className="bg-background min-h-screen">
      <section className="px-6 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-28 lg:px-10 lg:pt-52 lg:pb-36">
        <div className="mx-auto max-w-[1440px]">
          <Link
            href="/work"
            className="group text-muted hover:text-foreground mb-16 inline-flex items-center gap-4 text-[9px] font-medium tracking-[0.28em] uppercase transition-colors duration-300 sm:mb-24 sm:text-[10px]"
          >
            <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span>
            Back to work
          </Link>

          <div className="grid gap-16 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-8 flex items-center gap-4">
                <span className="bg-foreground/40 h-px w-8" />

                <p className="text-muted text-[10px] font-medium tracking-[0.28em] uppercase sm:text-xs">
                  {project.category}
                </p>
              </div>

              <h1 className="max-w-6xl font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-[-0.055em]">
                {project.title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-2 gap-x-8 gap-y-8 text-[10px] tracking-[0.2em] uppercase sm:text-[11px]"
            >
              <div>
                <p className="text-muted mb-2">Location</p>
                <p>{project.location || '—'}</p>
              </div>

              <div>
                <p className="text-muted mb-2">Year</p>
                <p>{project.year}</p>
              </div>

              <div>
                <p className="text-muted mb-2">Category</p>
                <p>{project.category.replace('Interior ', '')}</p>
              </div>

              <div>
                <p className="text-muted mb-2">Project</p>
                <p>{project.id}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {isCinematography && youtubeEmbedUrl ? (
        <section className="px-6 pb-24 sm:px-8 sm:pb-32 lg:px-10 lg:pb-40">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-video overflow-hidden bg-black"
            >
              <iframe
                src={youtubeEmbedUrl}
                title={`${project.title} — cinematography`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>

            <div className="text-muted mt-5 flex items-start justify-between gap-8 text-[9px] font-medium tracking-[0.2em] uppercase sm:text-[10px]">
              <span>{project.title}</span>
              <span>Interior Cinematography</span>
            </div>
          </div>
        </section>
      ) : project.cover_image ? (
        <section className="px-6 pb-24 sm:px-8 sm:pb-32 lg:px-10 lg:pb-40">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-subtle relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]"
            >
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>

            <div className="text-muted mt-5 flex items-start justify-between gap-8 text-[9px] font-medium tracking-[0.2em] uppercase sm:text-[10px]">
              <span>{project.title}</span>
              <span>{project.category}</span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-28 sm:px-8 sm:pb-40 lg:px-10 lg:pb-52">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
              About the project
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl font-serif text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.04em]"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {project.images.length > 0 && (
        <section className="px-6 pb-32 sm:px-8 sm:pb-40 lg:px-10 lg:pb-52">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex items-center gap-4 sm:mb-16">
              <span className="bg-foreground/40 h-px w-8" />

              <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
                Project Gallery
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              {project.images.map((image, index) => (
                <motion.div
                  key={`${project.id}-${index}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{
                    duration: 0.9,
                    delay: Math.min(index * 0.08, 0.24),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    index % 3 === 2
                      ? 'bg-subtle relative overflow-hidden sm:col-span-2 sm:mx-auto sm:w-[78%]'
                      : 'bg-subtle relative overflow-hidden'
                  }
                >
                  <div
                    className={
                      index % 3 === 2 ? 'relative aspect-[16/10]' : 'relative aspect-[4/5]'
                    }
                  >
                    <Image
                      src={image}
                      alt={`${project.title} — image ${index + 1}`}
                      fill
                      sizes={
                        index % 3 === 2
                          ? '(max-width: 640px) 100vw, 78vw'
                          : '(max-width: 640px) 100vw, 50vw'
                      }
                      className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.035]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-foreground/10 border-t">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          {previousProject ? (
            <Link
              href={`/work/${previousProject.slug}`}
              className="group border-foreground/10 hover:bg-foreground hover:text-background border-b px-6 py-20 transition-colors duration-500 sm:px-8 sm:py-28 md:border-r lg:px-10 lg:py-36"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="text-muted group-hover:text-background/60 text-[9px] font-medium tracking-[0.25em] uppercase transition-colors duration-500 sm:text-[10px]">
                  Previous project
                </span>

                <span className="text-lg font-light transition-transform duration-500 group-hover:-translate-x-2">
                  ←
                </span>
              </div>

              <p className="text-muted group-hover:text-background/60 mb-4 text-[9px] font-medium tracking-[0.2em] uppercase transition-colors duration-500 sm:text-[10px]">
                {previousProject.category}
              </p>

              <h2 className="max-w-xl font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.85] tracking-[-0.045em]">
                {previousProject.title}
              </h2>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group hover:bg-foreground hover:text-background px-6 py-20 text-left transition-colors duration-500 sm:px-8 sm:py-28 md:text-right lg:px-10 lg:py-36"
            >
              <div className="mb-12 flex items-center justify-between md:flex-row-reverse">
                <span className="text-muted group-hover:text-background/60 text-[9px] font-medium tracking-[0.25em] uppercase transition-colors duration-500 sm:text-[10px]">
                  Next project
                </span>

                <span className="text-lg font-light transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </div>

              <p className="text-muted group-hover:text-background/60 mb-4 text-[9px] font-medium tracking-[0.2em] uppercase transition-colors duration-500 sm:text-[10px]">
                {nextProject.category}
              </p>

              <h2 className="ml-auto max-w-xl font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.85] tracking-[-0.045em]">
                {nextProject.title}
              </h2>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="border-foreground/10 border-t px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
              Continue exploring
            </p>

            <h2 className="max-w-3xl font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.84] tracking-[-0.05em]">
              More
              <br />
              spaces.
            </h2>
          </div>

          <Link
            href="/work"
            className="group border-foreground flex items-center gap-5 border-b pb-3 text-[10px] font-medium tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-50 sm:text-xs"
          >
            View all work
            <span className="text-base transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
