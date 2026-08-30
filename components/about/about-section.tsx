'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const aboutImage =
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1400&q=90';

export function AboutSection() {
  return (
    <section id="about" className="bg-background px-5 py-24 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 flex items-center gap-3 sm:mb-20 sm:gap-4 lg:mb-28"
        >
          <span className="h-px w-6 bg-foreground/40 sm:w-8" />

          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-muted sm:text-xs sm:tracking-[0.25em]">
            02 / About
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-4xl font-serif text-[clamp(3.25rem,14vw,7.5rem)] leading-[0.86] tracking-[-0.055em] sm:text-[clamp(3.5rem,7vw,7.5rem)] sm:tracking-[-0.045em]"
            >
              We photograph
              <br />
              <span className="ml-[10vw] sm:ml-[7vw]">what deserves</span>
              <br />
              to be remembered.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.25,
              }}
              className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[9px] font-medium uppercase tracking-[0.22em] text-muted sm:mt-16 sm:gap-x-10 sm:text-xs sm:tracking-[0.2em]"
            >
              <span>Photography</span>
              <span>Cinematography</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:ml-auto lg:w-[78%]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-subtle">
              <motion.div
                whileHover={{ scale: 1.035 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={aboutImage}
                  alt="ST Photography portrait"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.2em] text-muted sm:mt-4 sm:text-[11px]">
              <span>ST Photography</span>
              <span>02</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
