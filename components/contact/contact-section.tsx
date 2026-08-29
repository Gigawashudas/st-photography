"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const whatsappNumber = "8801839050341";

const whatsappMessage = "Hello Sraban, I would like to discuss a photography or cinematography project with ST Photography.";

const whatsappLink = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);

const instagramLink = "https://www.instagram.com/st_photography_interior?igsi=MTk4cHk4enJhNW50cg==";

const youtubeLink = "https://youtube.com/@stphotography01?si=UuuBA6z8vunGAAD5";

const facebookLink = "https://www.facebook.com/share/1EiPXQt7tZ/";

export function ContactSection() {
  return (
    <section id="contact" className="bg-background px-6 py-32 sm:px-8 sm:py-40 lg:px-10 lg:py-52">
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

          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">03 / Contact</p>
        </motion.div>

        <div className="grid gap-20 lg:grid-cols-[1fr_0.65fr] lg:gap-32">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-5xl font-serif text-[clamp(4rem,9vw,10rem)] leading-[0.82] tracking-[-0.05em]"
            >
              Let&apos;s make
              <br />
              something
              <br />
              worth keeping.
            </motion.h2>

            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              href="mailto:sahatammalphotography@gmail.com"
              className="group mt-14 inline-flex items-center gap-4 border-b border-foreground/30 pb-2 text-sm tracking-[0.04em] transition-colors duration-300 hover:border-foreground sm:mt-20 sm:text-base"
            >
              sahatammalphotography@gmail.com
              <ArrowUpRight size={15} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1,
              delay: 0.15,
            }}
            className="flex flex-col justify-end lg:pb-2"
          >
            <p className="max-w-sm text-sm leading-7 text-secondary sm:text-base sm:leading-8">Available for photography, cinematography, events, portraits, interiors, and creative commissions.</p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-[11px] font-medium uppercase tracking-[0.2em] sm:mt-14 sm:text-xs">
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 transition-opacity duration-300 hover:opacity-50">
                Instagram
                <ArrowUpRight size={11} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 transition-opacity duration-300 hover:opacity-50">
                YouTube
                <ArrowUpRight size={11} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 transition-opacity duration-300 hover:opacity-50">
                Facebook
                <ArrowUpRight size={11} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 transition-opacity duration-300 hover:opacity-50">
                WhatsApp
                <ArrowUpRight size={11} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-32 border-t border-foreground/10 pt-8 sm:mt-40 lg:mt-52">
          <div className="flex flex-col justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:text-[11px]">
            <span>ST Photography</span>
            <span>Photography & Cinematography</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
