"use client";

import { motion } from "motion/react";
import { ProjectCard } from "./project-card";

const projects = [
  {
    title: "Still / Moving",
    category: "Portraits",
    number: "01",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=90",
    aspectClass: "aspect-[4/5]",
  },
  {
    title: "Between Light",
    category: "Photography",
    number: "02",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=90",
    aspectClass: "aspect-[3/4]",
  },
  {
    title: "After Hours",
    category: "Cinematography",
    number: "03",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=90",
    aspectClass: "aspect-[16/10]",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="bg-background px-6 py-32 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-24 grid gap-10 md:mb-36 md:grid-cols-[1fr_280px] md:items-end lg:grid-cols-[1fr_340px]"
        >
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-8 bg-foreground/40" />

              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">01 / Selected Work</p>
            </div>

            <h2 className="max-w-4xl font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.82] tracking-[-0.045em]">
              Stories
              <br />
              <span className="ml-[8vw]">in frames.</span>
            </h2>
          </div>

          <div className="md:pb-2">
            <p className="max-w-xs text-sm font-light leading-7 tracking-[0.08em] text-secondary sm:text-base sm:leading-8">
              Still images.
              <br />
              Moving stories.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-20 md:grid-cols-2 md:gap-x-10 md:gap-y-36">
          <div className="md:pt-24">
            <ProjectCard {...projects[0]} priority />
          </div>

          <div>
            <ProjectCard {...projects[1]} />
          </div>

          <div className="md:col-span-2 md:mx-auto md:w-[70%]">
            <ProjectCard {...projects[2]} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="mt-24 flex justify-center sm:mt-32"
        >
          <a href="/work" className="group flex items-center gap-6 text-[9px] font-medium uppercase tracking-[0.35em] text-secondary transition-colors duration-300 hover:text-foreground sm:text-[10px]">
            <span className="relative">
              View all work
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
            </span>

            <span className="text-base font-light transition-transform duration-500 group-hover:translate-x-2">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
