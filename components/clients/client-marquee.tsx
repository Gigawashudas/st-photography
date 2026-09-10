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

export function ClientMarquee() {
  return (
    <section className="border-foreground/10 border-t">
      <div className="mx-auto max-w-[1440px] px-6 pt-16 sm:px-8 sm:pt-40 lg:px-10">
        <div className="editorial-label w-full text-center">
          <span className="w-full text-center text-2xl font-bold text-black dark:text-white">
            We Worked With
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-10 sm:px-14 lg:px-24">
        <div className="border-foreground/10 relative mt-14 overflow-hidden border-y py-8 sm:mt-16 sm:py-10">
          <div
            aria-hidden="true"
            className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent sm:w-24 lg:w-32"
          />

          <div
            aria-hidden="true"
            className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent sm:w-24 lg:w-32"
          />

          <motion.div
            className="flex w-max items-center"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 70,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {marqueeClients.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                aria-hidden={index >= clients.length}
                className="flex h-24 w-60 shrink-0 items-center justify-center px-6 sm:h-28 sm:w-72 sm:px-8"
              >
                <div className="flex h-10 w-28 items-center justify-center overflow-hidden bg-white sm:h-12 sm:w-36">
                  <Image
                    src={logo}
                    alt={index >= clients.length ? '' : `Client ${index + 1}`}
                    width={220}
                    height={100}
                    sizes="144px"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
