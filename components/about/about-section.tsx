'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const aboutImage =
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1400&q=90';

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-background text-foreground px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
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
          className="mb-12 flex items-center gap-4 sm:mb-16"
        >
          <span className="editorial-rule" />
          <p className="type-label text-muted">About the studio</p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-8"
          >
            <h2 className="max-w-6xl text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.86] font-medium tracking-[-0.055em]">
              We photograph
              <br />
              spaces with
              <br />
              <span className="ml-[8vw]">purpose.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-end lg:col-span-4 lg:pb-2"
          >
            <p className="type-body-lg text-secondary max-w-md">
              ST Photography creates considered visual stories for interiors, architecture, and the
              people behind the spaces.
            </p>

            <div className="text-muted mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-medium tracking-[0.2em] uppercase sm:mt-10 sm:text-[11px]">
              <span>Interior Photography</span>
              <span aria-hidden="true" className="bg-foreground/20 h-px w-5" />
              <span>Interior Cinematography</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 lg:col-start-2"
          >
            <div className="bg-subtle relative aspect-[4/5] overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.035 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={aboutImage}
                  alt="ST Photography studio portrait"
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-end lg:col-span-5 lg:col-start-8 lg:pb-1"
          >
            <div className="border-foreground/10 border-t pt-6">
              <p className="type-label-sm text-muted mb-8">The approach</p>

              <p className="max-w-xl text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.035em]">
                Every space has its own character. Our work is about finding it, understanding it,
                and making it visible.
              </p>
            </div>

            <div className="border-foreground/10 mt-10 border-t pt-6 sm:mt-14">
              <p className="type-body text-secondary max-w-lg">
                From natural light and material details to movement through a room, we create images
                and films that communicate how a space actually feels.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
