'use client';
import Link from 'next/link';
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
type FeaturedWorkProps = { projects: Project[] };
export function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section className="bg-background text-foreground px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
      {' '}
      <div className="mx-auto max-w-360">
        {' '}
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
          {' '}
          <div>
            {' '}
            <div className="mb-7 flex items-center gap-4">
              {' '}
              <span className="bg-foreground/40 h-px w-8" />{' '}
              <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-[11px]">
                {' '}
                Selected Work{' '}
              </p>{' '}
            </div>{' '}
            <h2 className="font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.82] tracking-[-0.055em]">
              {' '}
              Featured.{' '}
            </h2>{' '}
          </div>{' '}
          <p className="text-secondary max-w-sm text-sm leading-7 sm:pb-2">
            {' '}
            A selection of photography and cinematography created with intention, atmosphere, and
            attention to detail.{' '}
          </p>{' '}
        </div>{' '}
        {projects.length > 0 ? (
          <div className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:mt-24 lg:gap-7">
            {' '}
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
              >
                {' '}
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  number={String(index + 1).padStart(2, '0')}
                  image={project.cover_image ?? ''}
                  slug={project.slug}
                  priority={index < 2}
                  aspectClass={index % 3 === 2 ? 'aspect-[16/10] sm:col-span-2' : 'aspect-[4/5]'}
                />{' '}
              </motion.div>
            ))}{' '}
          </div>
        ) : (
          <div className="border-foreground/10 mt-16 border-y py-20 text-center sm:mt-20 sm:py-28">
            {' '}
            <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase">
              {' '}
              No featured projects{' '}
            </p>{' '}
            <p className="text-secondary mt-4 text-sm"> Featured work will appear here. </p>{' '}
          </div>
        )}{' '}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-20 flex justify-center sm:mt-32"
        >
          {' '}
          <Link
            href="/work"
            className="text-secondary hover:text-foreground group flex min-h-11 items-center gap-5 text-[9px] font-medium tracking-[0.35em] uppercase transition-colors duration-300 sm:gap-6 sm:text-[10px]"
          >
            {' '}
            <span className="relative">
              {' '}
              View all work{' '}
              <span className="bg-foreground absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />{' '}
            </span>{' '}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              {' '}
              →{' '}
            </span>{' '}
          </Link>{' '}
        </motion.div>{' '}
      </div>{' '}
    </section>
  );
}
