'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
interface ProjectCardProps {
  title: string;
  category: string;
  number: string;
  image: string;
  slug: string;
  priority?: boolean;
  aspectClass?: string;
}
export function ProjectCard({
  title,
  category,
  number,
  image,
  slug,
  priority = false,
  aspectClass = 'aspect-[4/5]',
}: ProjectCardProps) {
  const hasImage = Boolean(image?.trim());
  return (
    <Link href={`/work/${slug}`} className="block">
      {' '}
      <motion.article
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="group"
      >
        {' '}
        <div className={`bg-subtle relative overflow-hidden ${aspectClass}`}>
          {' '}
          {hasImage ? (
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.035 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {' '}
              <Image
                src={image}
                alt={title}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />{' '}
            </motion.div>
          ) : (
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              {' '}
              <span className="text-muted text-[9px] font-medium tracking-[0.25em] uppercase">
                {' '}
                ST Photography{' '}
              </span>{' '}
            </div>
          )}{' '}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />{' '}
        </div>{' '}
        <div className="mt-5 flex items-start justify-between gap-8">
          {' '}
          <div>
            {' '}
            <h3 className="font-serif text-2xl leading-none tracking-[-0.02em] sm:text-3xl">
              {' '}
              {title}{' '}
            </h3>{' '}
            <p className="text-muted mt-3 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[11px]">
              {' '}
              {category}{' '}
            </p>{' '}
          </div>{' '}
          <span className="text-muted pt-1 text-[10px] font-medium tracking-[0.2em] sm:text-[11px]">
            {' '}
            {number}{' '}
          </span>{' '}
        </div>{' '}
      </motion.article>{' '}
    </Link>
  );
}
