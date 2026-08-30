import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProjectEditForm } from '@/components/admin/project-edit-form';
type ProjectPageProps = { params: Promise<{ id: string }> };
export default async function AdminProjectEditPage({ params }: ProjectPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }
  const { id } = await params;
  const { data: project, error } = await supabase
    .from('projects')
    .select(
      'id, slug, title, category, location, year, description, cover_image, images, youtube_url, featured, featured_order, published',
    )
    .eq('id', id)
    .single();
  if (error || !project) {
    notFound();
  }
  return (
    <main className="bg-background text-foreground min-h-screen transition-colors duration-500">
      {' '}
      <div className="mx-auto max-w-360 px-5 py-6 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        {' '}
        <header className="border-foreground/10 flex items-center justify-between border-b pb-6 sm:pb-8">
          {' '}
          <Link
            href="/admin/projects"
            className="group text-muted hover:text-foreground flex min-h-11 items-center gap-3 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors"
          >
            {' '}
            <ArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />{' '}
            Projects{' '}
          </Link>{' '}
          <span className="text-muted text-right text-[9px] font-medium tracking-[0.2em] uppercase sm:text-[10px]">
            {' '}
            Edit Project{' '}
          </span>{' '}
        </header>{' '}
        <section className="pt-16 sm:pt-28 lg:pt-32">
          {' '}
          <div className="mb-6 flex items-center gap-4 sm:mb-7">
            {' '}
            <span className="bg-foreground/40 h-px w-6 sm:w-8" />{' '}
            <p className="text-muted text-[9px] font-medium tracking-[0.25em] uppercase sm:text-[10px]">
              {' '}
              Portfolio CMS{' '}
            </p>{' '}
          </div>{' '}
          <h1 className="font-serif text-[clamp(4rem,13vw,9rem)] leading-[0.8] tracking-[-0.055em]">
            {' '}
            Edit.{' '}
          </h1>{' '}
          <p className="text-secondary mt-7 max-w-xl text-sm leading-7 sm:mt-8 sm:text-base sm:leading-8">
            {' '}
            Update the project information, images, publication status, and featured placement.{' '}
          </p>{' '}
        </section>{' '}
        <section className="mt-16 sm:mt-28">
          {' '}
          <ProjectEditForm project={project} />{' '}
        </section>{' '}
      </div>{' '}
    </main>
  );
}
