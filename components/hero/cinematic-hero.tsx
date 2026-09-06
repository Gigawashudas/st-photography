'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const heroImage =
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=90';

export function CinematicHero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-end overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <Image
          src={heroImage}
          alt="Interior photography"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5"
      />

      <div className="relative z-10 w-full px-5 pb-8 sm:px-8 sm:pb-10 lg:px-10 lg:pb-12">
        <div className="mx-auto flex max-w-[1600px] justify-end">
          <motion.a
            href="#work"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex shrink-0 flex-col items-center gap-3 pb-1 text-[9px] font-medium tracking-[0.25em] text-white uppercase sm:text-[10px]"
          >
            <span className="text-white">Scroll</span>

            <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-white/30">
              <motion.span
                initial={{ y: '-100%' }}
                animate={{ y: '200%' }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-x-0 top-0 h-1/2 bg-white"
              />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
