"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const instagramLink = "https://www.instagram.com/st_photography_interior?igsi=MTk4cHk4enJhNW50cg==";

const youtubeLink = "https://youtube.com/@stphotography01?si=UuuBA6z8vunGAAD5";

const facebookLink = "https://www.facebook.com/share/1EiPXQt7tZ/";

const whatsappNumber = "8801839050341";

const whatsappMessage = "Hello Sraban, I would like to discuss a photography or cinematography project with ST Photography.";

const whatsappLink = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background px-6 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:px-10 lg:pt-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-0">
          <div>
            <motion.a href="#hero" whileHover={{ opacity: 0.55 }} transition={{ duration: 0.3 }} className="inline-block font-serif text-5xl leading-none tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              ST
            </motion.a>

            <p className="mt-6 max-w-xs text-sm leading-7 text-secondary">Photography & Cinematography</p>

            <a href="mailto:sahatammalphotography@gmail.com" className="mt-8 inline-block text-sm tracking-[0.02em] transition-opacity duration-300 hover:opacity-50">
              sahatammalphotography@gmail.com
            </a>
          </div>

          <div className="lg:pl-12">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-muted">Explore</p>

            <nav className="flex flex-col gap-3 text-sm">
              <a href="/" className="transition-opacity duration-300 hover:opacity-50">
                Home
              </a>

              <a href="/work" className="transition-opacity duration-300 hover:opacity-50">
                Work
              </a>

              <a href="/photography" className="transition-opacity duration-300 hover:opacity-50">
                Photography
              </a>

              <a href="/cinematography" className="transition-opacity duration-300 hover:opacity-50">
                Cinematography
              </a>

              <a href="/about" className="transition-opacity duration-300 hover:opacity-50">
                About
              </a>

              <a href="/contact" className="transition-opacity duration-300 hover:opacity-50">
                Contact
              </a>
            </nav>
          </div>

          <div className="grid grid-cols-2 gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-muted">Social</p>

              <nav className="flex flex-col gap-3 text-sm">
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-50">
                  Instagram
                  <ArrowUpRight size={13} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-50">
                  YouTube
                  <ArrowUpRight size={13} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-50">
                  Facebook
                  <ArrowUpRight size={13} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-50">
                  WhatsApp
                  <ArrowUpRight size={13} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </nav>
            </div>

            <div>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-muted">Back to top</p>

              <a href="#hero" className="group inline-flex items-center gap-3 text-sm transition-opacity duration-300 hover:opacity-50">
                Return to top
                <ArrowDown size={14} strokeWidth={1.3} className="rotate-180 transition-transform duration-300 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-foreground/10 pt-6 sm:mt-28 sm:pt-8">
          <div className="grid gap-4 text-[10px] uppercase tracking-[0.2em] text-muted sm:grid-cols-3 sm:text-[11px]">
            <span>ST Photography</span>

            <span className="sm:text-center">Sraban Kumar Saha</span>

            <span className="sm:text-right">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
