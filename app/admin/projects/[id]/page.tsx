import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProjectEditForm } from "@/components/admin/project-edit-form";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminProjectEditPage({ params }: ProjectPageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const { data: project, error } = await supabase.from("projects").select("id, slug, title, category, location, year, description, cover_image, images, featured, featured_order, published").eq("id", id).single();

  if (error || !project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <div className="mx-auto max-w-360 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-8">
          <Link href="/admin/projects" className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground">
            <ArrowLeft size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Projects
          </Link>

          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Edit Project</span>
        </header>

        <section className="pt-20 sm:pt-28 lg:pt-32">
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-8 bg-foreground/40" />

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">Portfolio CMS</p>
          </div>

          <h1 className="font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-tighter">Edit.</h1>

          <p className="mt-8 max-w-xl text-sm leading-7 text-secondary">Update the project information, images, publication status, and featured placement.</p>
        </section>

        <section className="mt-20 sm:mt-28">
          <ProjectEditForm project={project} />
        </section>
      </div>
    </main>
  );
}
