"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";

type ProjectDetailProps = {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
};

export function ProjectDetail({ project, previousProject, nextProject }: ProjectDetailProps) {
  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44 lg:px-10 lg:pb-36 lg:pt-52">
        <div className="mx-auto max-w-[1440px]">
          <Link href="/work" className="group mb-16 inline-flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.28em] text-muted transition-colors duration-300 hover:text-foreground sm:mb-24 sm:text-[10px]">
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
                <span className="h-px w-8 bg-foreground/40" />

                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted sm:text-xs">{project.category}</p>
              </div>

              <h1 className="max-w-6xl font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-[-0.055em]">{project.title}</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-2 gap-x-8 gap-y-8 text-[10px] uppercase tracking-[0.2em] sm:text-[11px]"
            >
              <div>
                <p className="mb-2 text-muted">Location</p>
                <p>{project.location}</p>
              </div>

              <div>
                <p className="mb-2 text-muted">Year</p>
                <p>{project.year}</p>
              </div>

              <div>
                <p className="mb-2 text-muted">Category</p>
                <p>{project.category.replace("Interior ", "")}</p>
              </div>

              <div>
                <p className="mb-2 text-muted">Project</p>
                <p>{project.id}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            className="relative aspect-[4/3] overflow-hidden bg-subtle sm:aspect-[16/10]"
          >
            <Image src={project.coverImage} alt={project.title} fill priority sizes="100vw" className="object-cover" />
          </motion.div>

          <div className="mt-5 flex items-start justify-between gap-8 text-[9px] font-medium uppercase tracking-[0.2em] text-muted sm:text-[10px]">
            <span>{project.title}</span>
            <span>{project.category}</span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 sm:px-8 sm:pb-40 lg:px-10 lg:pb-52">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">About the project</p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
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

      <section className="px-6 pb-32 sm:px-8 sm:pb-40 lg:px-10 lg:pb-52">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex items-center gap-4 sm:mb-16">
            <span className="h-px w-8 bg-foreground/40" />

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">Project Gallery</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {project.images.map((image, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.9,
                  delay: Math.min(index * 0.08, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={index % 3 === 2 ? "relative overflow-hidden bg-subtle sm:col-span-2 sm:mx-auto sm:w-[78%]" : "relative overflow-hidden bg-subtle"}
              >
                <div className={index % 3 === 2 ? "relative aspect-[16/10]" : "relative aspect-[4/5]"}>
                  <Image src={image} alt={`${project.title} — image ${index + 1}`} fill sizes={index % 3 === 2 ? "(max-width: 640px) 100vw, 78vw" : "(max-width: 640px) 100vw, 50vw"} className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.035]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          {previousProject ? (
            <Link href={`/work/${previousProject.slug}`} className="group border-b border-foreground/10 px-6 py-20 transition-colors duration-500 hover:bg-foreground hover:text-background sm:px-8 sm:py-28 lg:px-10 lg:py-36 md:border-r">
              <div className="mb-12 flex items-center justify-between">
                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted transition-colors duration-500 group-hover:text-background/60 sm:text-[10px]">Previous project</span>

                <span className="text-lg font-light transition-transform duration-500 group-hover:-translate-x-2">←</span>
              </div>

              <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-500 group-hover:text-background/60 sm:text-[10px]">{previousProject.category}</p>

              <h2 className="max-w-xl font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.85] tracking-[-0.045em]">{previousProject.title}</h2>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}

          {nextProject ? (
            <Link href={`/work/${nextProject.slug}`} className="group px-6 py-20 text-left transition-colors duration-500 hover:bg-foreground hover:text-background sm:px-8 sm:py-28 lg:px-10 lg:py-36 md:text-right">
              <div className="mb-12 flex items-center justify-between md:flex-row-reverse">
                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted transition-colors duration-500 group-hover:text-background/60 sm:text-[10px]">Next project</span>

                <span className="text-lg font-light transition-transform duration-500 group-hover:translate-x-2">→</span>
              </div>

              <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-500 group-hover:text-background/60 sm:text-[10px]">{nextProject.category}</p>

              <h2 className="ml-auto max-w-xl font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.85] tracking-[-0.045em]">{nextProject.title}</h2>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">Continue exploring</p>

            <h2 className="max-w-3xl font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.84] tracking-[-0.05em]">
              More
              <br />
              spaces.
            </h2>
          </div>

          <Link href="/work" className="group flex items-center gap-5 border-b border-foreground pb-3 text-[10px] font-medium uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-50 sm:text-xs">
            View all work
            <span className="text-base transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
