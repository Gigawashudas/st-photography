'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const clients = [
  '/clients/client-01.svg.jpg',
  '/clients/client-02.svg.jpg',
  '/clients/client-03.svg.jpg',
  '/clients/client-04.svg.jpg',
  '/clients/client-05.svg.jpg',
  '/clients/client-06.svg.jpg',
  '/clients/client-07.svg.JPG',
  '/clients/client-08.svg.jpg',
  '/clients/client-09.svg.png',
  '/clients/client-10.svg.jpg',
  '/clients/client-11.svg.jpg',
  '/clients/client-12.svg.jpg',
  '/clients/client-13.svg.jpg',
  '/clients/client-14.svg.jpg',
  '/clients/client-15.svg.jpg',
  '/clients/client-16.svg.jpg',
  '/clients/client-17.svg.jpg',
  '/clients/client-18.svg.jpg',
  '/clients/client-19.svg.jpg',
  '/clients/client-20.svg.jpg',
  '/clients/client-21.svg.png',
  '/clients/client-22.svg.jpg',
  '/clients/client-23.svg.png',
  '/clients/client-24.svg.jpg',
  '/clients/client-25.svg.png',
  '/clients/client-26.svg.png',
  '/clients/client-27.svg.png',
  '/clients/client-28.svg.jpg',
  '/clients/client-29.svg.jpg',
];

const marqueeClients = [...clients, ...clients];

export function AchievementsSection() {
  return (
    <section className="border-foreground/10 border-t">
      <div className="mx-auto max-w-[1440px] px-6 pt-28 sm:px-8 sm:pt-40 lg:px-10 lg:pt-52">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <div className="editorial-label mb-8">
              <span className="editorial-rule" />

              <span className="type-label-sm text-muted">Our Achievements</span>
            </div>

            <h2 className="max-w-4xl text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.045em]">
              A growing portfolio. Trusted collaborations. A vision captured through every frame.
            </h2>
          </div>

          <div className="border-foreground/10 grid grid-cols-2 gap-x-8 border-t lg:mt-20">
            <div className="border-foreground/10 border-b py-8 sm:py-10">
              <p className="mb-4 text-[clamp(3.5rem,7vw,6.5rem)] leading-none font-medium tracking-[-0.055em]">
                150+
              </p>

              <p className="text-muted max-w-[180px] text-[10px] font-medium tracking-[0.2em] uppercase sm:text-xs">
                Interior Project Shooting
              </p>
            </div>

            <div className="border-foreground/10 border-b py-8 sm:py-10">
              <p className="mb-4 text-[clamp(3.5rem,7vw,6.5rem)] leading-none font-medium tracking-[-0.055em]">
                50+
              </p>

              <p className="text-muted max-w-[180px] text-[10px] font-medium tracking-[0.2em] uppercase sm:text-xs">
                Interior Companies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
