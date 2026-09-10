import type { Metadata } from 'next';

import Link from 'next/link';

import { WorkGrid } from './work-grid';

import { WorkHeader } from './work-header';

import { Footer } from '@/components/footer/footer';

import { getPublishedProjects } from '@/lib/projects/get-project';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Explore ST Photography’s interior photography and cinematography projects across architecture, interiors, hospitality, design, development, and brands in Bangladesh.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work | ST Photography',
    description:
      'Explore ST Photography’s interior photography and cinematography work for architecture, interiors, hospitality, design, developers, and brands in Bangladesh.',
    url: '/work',
    type: 'website',
  },
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28 lg:px-10 lg:pt-44 lg:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <WorkHeader>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-full">
                <div className="mb-7 flex items-center gap-4" />

                <div className="flex flex-col gap-5">
                  <h1 className="w-full text-center leading-[0.88] font-medium tracking-tighter">
                    A collection of spaces,
                    <br />
                    captured with intention.
                  </h1>

                  <p className="type-body-lg text-secondary w-full text-center lg:col-span-4 lg:col-start-9 lg:pb-1">
                    Interior photography and cinematography for architecture, designers,
                    hospitality, developers, and brands.
                  </p>
                </div>
              </div>
            </div>
          </WorkHeader>

          <WorkGrid projects={projects} />
        </div>
      </section>

      <section className="border-foreground/10 border-t px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-36">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
              Have a space to photograph?
            </p>

            <h2 className="max-w-2xl text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.86] font-medium tracking-[-0.05em]">
              Let&apos;s create
              <br />
              something considered.
            </h2>
          </div>

          <Link
            href="/#contact"
            className="group border-foreground flex items-center gap-5 border-b pb-3 text-[10px] font-medium tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-50 sm:text-xs"
          >
            Start a project
            <span
              aria-hidden="true"
              className="text-base transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
