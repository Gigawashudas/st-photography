'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  slug: string;
  priority?: boolean;
  aspectClass?: string;
}

export function ProjectCard({
  title,
  category,
  image,
  slug,
  priority = false,
  aspectClass = 'aspect-[4/5]',
}: ProjectCardProps) {
  const hasImage = Boolean(image?.trim());

  return (
    <Link href={`/work/${slug}`} className="block">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group"
      >
        <div className={`bg-subtle relative overflow-hidden ${aspectClass}`}>
          {hasImage ? (
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.035 }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src={image}
                alt={title}
                fill
                priority={priority}
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <span className="type-label-sm text-muted">ST Photography</span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
        </div>

        <div className="mt-4">
          <h3 className="project-card-title">{title}</h3>
          <p className="project-card-category text-muted mt-2">{category}</p>
        </div>
      </motion.article>
    </Link>
  );
}
