'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import aboutImage from './about.jpg';

// const aboutImage ='https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1400&q=90';

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-background text-foreground px-5 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-32"
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
          <p className="type-label text-muted">About ST Photography</p>
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
            className="lg:col-span-full"
          >
            <div className="flex flex-col items-center">
              <h2 className="max-w-235 text-center text-4xl! leading-[0.86] font-medium tracking-[-0.055em]">
                We are a creative visual production agency dedicated to transforming ideas, spaces,
                products, and experiences into powerful visual stories
                <p className="type-body-lg text-secondary w-full pt-3 text-center">
                  At ST Photography, we combine professional photography, cinematic storytelling,
                  and creative expertise to create high-quality visual content that helps brands
                  stand out in a competitive market. Our experienced team of photographers,
                  cinematographers, and editors works with precision and purpose from concept and
                  production to the final frame
                </p>
              </h2>
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
            <div className="relative overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.035 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <Image
                  src={aboutImage}
                  alt="ST Photography studio portrait"
                  width={1200}
                  height={1200}
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="h-auto w-full"
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
              <p className="max-w-xl text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.035em]">
                With a strong focus on quality, creativity, and attention to detail, we turn every
                project into a visual experience that represents your brand at its best
              </p>
            </div>

            <div className="border-foreground/10 mt-10 border-t pt-6 sm:mt-14">
              <p className="type-body text-secondary max-w-lg">
                We believe great visuals are more than just beautiful images. They are a powerful
                tool to communicate your brand’s identity, showcase your work, attract the right
                audience, and create lasting impressions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
