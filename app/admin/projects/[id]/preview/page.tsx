import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Eye, Star } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

type PreviewPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: 'Project Preview — ST Photography',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProjectPreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: project, error } = await supabase
    .from('projects')
    .select(
      'id, slug, title, category, location, year, description, cover_image, images, featured, featured_order, published',
    )
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Project preview fetch error:', error);
  }

  if (!project) {
    notFound();
  }

  const galleryImages: string[] = Array.isArray(project.images)
    ? project.images.filter((image): image is string => typeof image === 'string')
    : [];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {' '}
      <div className="border-b border-foreground/10 bg-subtle">
        {' '}
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-10">
          {' '}
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/projects/${project.id}`}
              className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
            >
              {' '}
              <ArrowLeft
                size={13}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to editor{' '}
            </Link>
            ```
            <span className="h-3 w-px bg-foreground/15" />
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
              <Eye size={13} strokeWidth={1.4} />
              Preview
            </span>
          </div>
          <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-muted">
            <span>{project.published ? 'Published' : 'Draft'}</span>

            {project.featured && (
              <>
                <span className="h-3 w-px bg-foreground/15" />
                <span className="flex items-center gap-1.5">
                  <Star size={11} strokeWidth={1.4} />
                  Featured
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-8">
          <span className="text-sm font-medium tracking-[0.18em]">ST</span>

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            Project Preview
          </span>
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
            <div className="mb-10 sm:mb-14">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Selected work
              </p>

              <p className="mt-2 text-xs text-secondary">
                {galleryImages.length} {galleryImages.length === 1 ? 'image' : 'images'}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {galleryImages.map((image: string, index: number) => (
                <div
                  key={image}
                  className={`relative overflow-hidden bg-subtle ${index % 3 === 0 ? 'sm:col-span-2 aspect-video' : 'aspect-4/5'}`}
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
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-foreground/10 py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Preview only</p>

              <p className="mt-3 max-w-lg text-sm leading-7 text-secondary">
                This preview is available only to authenticated administrators. Publishing this
                project will make it available on the public portfolio.
              </p>
            </div>

            <Link
              href={`/admin/projects/${project.id}`}
              className="border border-foreground/20 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              Back to editor
            </Link>
          </div>
        </section>
        <footer className="flex flex-col gap-4 border-t border-foreground/10 pt-8 text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>ST Photography</span>
          <span>Private Preview</span>
        </footer>
      </div>
    </main>
  );
}
