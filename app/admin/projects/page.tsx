import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus, Star, Eye, EyeOff } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }
  const { data: projects, error } = await supabase.from("projects").select("id, slug, title, category, location, year, cover_image, featured, featured_order, published").order("featured", { ascending: false }).order("featured_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) {
    console.error("Projects fetch error:", error);
  }
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {" "}
      <div className="mx-auto max-w-360 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        {" "}
        <header className="flex items-center justify-between border-b border-foreground/10 pb-8">
          {" "}
          <Link href="/admin" className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground">
            {" "}
            <ArrowLeft size={14} strokeWidth={1.4} className="transition-transform duration-300 group-hover:-translate-x-1" /> Dashboard{" "}
          </Link>{" "}
          <Link href="/admin/projects/new" className="group flex items-center gap-3 border border-foreground/20 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background">
            {" "}
            <Plus size={14} strokeWidth={1.4} /> New Project{" "}
          </Link>{" "}
        </header>{" "}
        <section className="pt-20 sm:pt-28 lg:pt-32">
          {" "}
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            {" "}
            <div>
              {" "}
              <div className="mb-7 flex items-center gap-4">
                {" "}
                <span className="h-px w-8 bg-foreground/40" /> <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted"> Portfolio CMS </p>{" "}
              </div>{" "}
              <h1 className="font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-tighter"> Projects. </h1>{" "}
            </div>{" "}
            <p className="max-w-sm text-sm leading-7 text-secondary"> Manage your interior photography and cinematography portfolio. </p>{" "}
          </div>{" "}
        </section>{" "}
        <section className="mt-20 sm:mt-28">
          {" "}
          <div className="mb-6 flex items-center justify-between border-b border-foreground/10 pb-5">
            {" "}
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted"> {projects?.length ?? 0} Projects </p> <p className="hidden text-[10px] uppercase tracking-[0.2em] text-muted sm:block"> Featured / Status </p>{" "}
          </div>{" "}
          {!projects || projects.length === 0 ? (
            <div className="border border-dashed border-foreground/20 py-24 text-center">
              {" "}
              <p className="font-serif text-4xl tracking-[-0.03em]"> No projects yet. </p> <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-secondary"> Create your first project to start building the portfolio. </p>{" "}
              <Link href="/admin/projects/new" className="mt-8 inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background">
                {" "}
                <Plus size={14} strokeWidth={1.4} /> Create Project{" "}
              </Link>{" "}
            </div>
          ) : (
            <div className="divide-y divide-foreground/10 border-b border-foreground/10">
              {" "}
              {projects.map((project, index) => (
                <Link key={project.id} href={`/admin/projects/${project.id}`} className="group grid gap-6 py-7 transition-opacity duration-300 hover:opacity-70 sm:grid-cols-[56px_1fr_auto] sm:items-center">
                  {" "}
                  <span className="text-[10px] font-medium tracking-[0.2em] text-muted"> {String(index + 1).padStart(2, "0")} </span>{" "}
                  <div className="flex min-w-0 items-center gap-5">
                    {" "}
                    {project.cover_image ? (
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-subtle sm:h-20 sm:w-28">
                        <Image src={project.cover_image} alt={project.title} fill sizes="(max-width: 640px) 80px, 112px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    ) : (
                      <div className="flex h-16 w-20 shrink-0 items-center justify-center bg-subtle text-[9px] uppercase tracking-[0.15em] text-muted sm:h-20 sm:w-28"> No Image </div>
                    )}{" "}
                    <div className="min-w-0">
                      {" "}
                      <h2 className="truncate font-serif text-2xl tracking-[-0.02em] sm:text-3xl"> {project.title} </h2>{" "}
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] font-medium uppercase tracking-[0.16em] text-muted">
                        {" "}
                        <span>{project.category}</span> <span>{project.location}</span> <span>{project.year}</span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center justify-between gap-8 sm:justify-end">
                    {" "}
                    <div className="flex items-center gap-4">
                      {" "}
                      {project.featured ? (
                        <span className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em]">
                          {" "}
                          <Star size={13} strokeWidth={1.4} /> Featured{" "}
                        </span>
                      ) : (
                        <span className="text-[9px] uppercase tracking-[0.15em] text-muted"> Not Featured </span>
                      )}{" "}
                      {project.published ? (
                        <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-muted">
                          {" "}
                          <Eye size={13} strokeWidth={1.4} /> Live{" "}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-muted">
                          {" "}
                          <EyeOff size={13} strokeWidth={1.4} /> Draft{" "}
                        </span>
                      )}{" "}
                    </div>{" "}
                    <ArrowUpRight size={17} strokeWidth={1.3} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
                  </div>{" "}
                </Link>
              ))}{" "}
            </div>
          )}{" "}
        </section>{" "}
        <footer className="mt-20 flex flex-col gap-4 border-t border-foreground/10 pt-8 text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
          {" "}
          <span>ST Photography</span> <span>Portfolio CMS</span>{" "}
        </footer>{" "}
      </div>{" "}
    </main>
  );
}
