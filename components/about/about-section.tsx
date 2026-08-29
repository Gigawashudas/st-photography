"use client";

import Image from "next/image";
import { motion } from "motion/react";

const aboutImage = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1400&q=90";

export function AboutSection() {
  return (
    <section id="about" className="bg-background px-6 py-32 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-20 flex items-center gap-4 lg:mb-28"
        >
          <span className="h-px w-8 bg-foreground/40" />

          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">02 / About</p>
        </motion.div>

        <div className="grid gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-4xl font-serif text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.86] tracking-[-0.045em]"
            >
              We photograph
              <br />
              <span className="ml-[7vw]">what deserves</span>
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
              className="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted sm:mt-16 sm:text-xs"
            >
              <span>Photography</span>
              <span>Cinematography</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
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
                <Image src={aboutImage} alt="ST Photography portrait" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </motion.div>
            </div>

            <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
              <span>ST Photography</span>
              <span>02</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
