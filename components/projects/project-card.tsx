"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface ProjectCardProps {
  title: string;
  category: string;
  number: string;
  image: string;
  priority?: boolean;
  aspectClass?: string;
}

export function ProjectCard({ title, category, number, image, priority = false, aspectClass = "aspect-[4/5]" }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className={`relative overflow-hidden bg-subtle ${aspectClass}`}>
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.035 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image src={image} alt={title} fill priority={priority} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </motion.div>

        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
      </div>

      <div className="mt-5 flex items-start justify-between gap-8">
        <div>
          <h3 className="font-serif text-2xl leading-none tracking-[-0.02em] sm:text-3xl">{title}</h3>

          <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.3em] text-muted">{category}</p>
        </div>

        <span className="pt-1 text-[9px] font-medium tracking-[0.25em] text-muted">{number}</span>
      </div>
    </motion.article>
  );
}
