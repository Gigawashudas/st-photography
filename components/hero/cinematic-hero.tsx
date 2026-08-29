"use client";

import Image from "next/image";
import { motion } from "motion/react";

const heroImage = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=90";

export function CinematicHero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-end overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image src={heroImage} alt="Cinematic photography" fill priority sizes="100vw" className="object-cover object-center" />
      </div>

      <div className="absolute inset-0 bg-black/30 sm:bg-black/35" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25 sm:from-black/70" />

      <div className="relative z-10 w-full px-5 pb-8 sm:px-8 sm:pb-12 lg:px-10 lg:pb-14">
        <div className="flex flex-col items-center text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-3 text-[9px] font-medium uppercase tracking-[0.38em] text-white/80 sm:mb-4 sm:text-xs"
          >
            ST Photography
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif text-[clamp(3.4rem,17vw,10rem)] leading-[0.82] tracking-[-0.055em] sm:text-[clamp(5rem,12vw,10rem)]"
          >
            Photography
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 max-w-[260px] text-[8px] font-medium uppercase leading-[1.7] tracking-[0.3em] text-white/80 sm:mt-5 sm:max-w-none sm:text-xs sm:leading-normal"
          >
            Photography &amp; Cinematography
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.2,
          }}
          className="mt-12 flex justify-center sm:mt-14"
        >
          <a href="#work" className="group flex flex-col items-center gap-2.5 text-[8px] font-medium uppercase tracking-[0.3em] text-white/65 transition-colors duration-300 hover:text-white sm:gap-3 sm:text-[9px]">
            <span>Scroll to explore</span>

            <span className="relative h-8 w-px overflow-hidden bg-white/25 sm:h-10">
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-x-0 top-0 h-1/2 bg-white"
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
