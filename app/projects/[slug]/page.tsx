import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPublishedProject } from '@/lib/projects/get-project';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found — ST Photography',
    };
  }

  return {
    title: `${project.title} — ST Photography`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ST Photography`,
      description: project.description,
      images: project.cover_image ? [project.cover_image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);

  if (!project) {
    notFound();
  }

  const galleryImages: string[] = Array.isArray(project.images)
    ? project.images.filter((image): image is string => typeof image === 'string')
    : [];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {' '}
      <div className="mx-auto max-w-[1600px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        {' '}
        <header className="flex items-center justify-between border-b border-foreground/10 pb-8">
          {' '}
          <Link
            href="/"
            className="text-sm font-medium tracking-[0.18em] transition-opacity duration-300 hover:opacity-50"
          >
            ST{' '}
          </Link>
          <Link
            href="/"
            className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to portfolio
          </Link>
        </header>
        <section className="pt-16 sm:pt-24 lg:pt-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-20">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-8 bg-foreground/40" />

                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
                  {project.category}
                </p>
              </div>

              <h1 className="max-w-6xl font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.82] tracking-[-0.055em]">
                {project.title}
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-foreground/10 pt-6 lg:grid-cols-1 lg:border-t-0 lg:pt-0">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
                  Location
                </p>

                <p className="mt-2 text-sm">{project.location}</p>
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted">Year</p>

                <p className="mt-2 text-sm">{project.year}</p>
              </div>
            </div>
          </div>
        </section>
        {project.cover_image && (
          <section className="mt-16 sm:mt-24 lg:mt-32">
            <div className="relative aspect-[16/9] overflow-hidden bg-subtle">
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </section>
        )}
        <section className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_420px] lg:gap-32 lg:py-32">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
              About the project
            </p>
          </div>

          <div>
            <p className="text-base leading-8 text-secondary sm:text-lg sm:leading-9">
              {project.description}
            </p>
          </div>
        </section>
        {galleryImages.length > 0 && (
          <section className="border-t border-foreground/10 pt-10 sm:pt-16">
            <div className="mb-10 flex items-end justify-between sm:mb-14">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                  Selected work
                </p>

                <p className="mt-2 text-xs text-secondary">
                  {galleryImages.length} {galleryImages.length === 1 ? 'image' : 'images'}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden bg-subtle ${index % 3 === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}`}
                >
                  <Image
                    src={image}
                    alt={`${project.title} — image ${index + 1}`}
                    fill
                    sizes={
                      index % 3 === 0
                        ? '(max-width: 640px) 100vw, 100vw'
                        : '(max-width: 640px) 100vw, 50vw'
                    }
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        <section className="border-t border-foreground/10 py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Next</p>

              <h2 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-7xl">
                Explore more.
              </h2>
            </div>

            <Link
              href="/"
              className="group flex items-center gap-3 border border-foreground/20 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              View portfolio
              <ArrowUpRight
                size={15}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </section>
        <footer className="flex flex-col gap-4 border-t border-foreground/10 pt-8 text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>ST Photography</span>
          <span>{project.category}</span>
        </footer>
      </div>
    </main>
  );
}
