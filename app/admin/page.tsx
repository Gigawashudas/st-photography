import Link from "next/link";
import { ArrowUpRight, FolderOpen, ImageIcon, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminLogout } from "@/components/admin/admin-logout";
import { AdminThemeToggle } from "@/components/admin/admin-theme-toggle";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [{ count: totalProjects }, { count: publishedProjects }, { count: featuredProjects }, { count: totalLeads }] = await Promise.all([supabase.from("projects").select("*", { count: "exact", head: true }), supabase.from("projects").select("*", { count: "exact", head: true }).eq("published", true), supabase.from("projects").select("*", { count: "exact", head: true }).eq("featured", true).eq("published", true), supabase.from("enquiries").select("*", { count: "exact", head: true })]);

  const stats = [
    {
      label: "Total projects",
      value: totalProjects ?? 0,
      icon: FolderOpen,
    },
    {
      label: "Published",
      value: publishedProjects ?? 0,
      icon: ImageIcon,
    },
    {
      label: "Featured",
      value: featuredProjects ?? 0,
      icon: ImageIcon,
    },
    {
      label: "Leads",
      value: totalLeads ?? 0,
      icon: Users,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <div className="mx-auto max-w-360 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-8">
          <Link href="/" className="text-sm font-medium tracking-[0.18em] transition-opacity duration-300 hover:opacity-50">
            ST
          </Link>

          <div className="flex items-center gap-6">
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-muted sm:block">Admin</span>

            <AdminThemeToggle />

            <AdminLogout />
          </div>
        </header>

        <section className="pt-20 sm:pt-28 lg:pt-32">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-8 bg-foreground/40" />

                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">Control Center</p>
              </div>

              <h1 className="font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-[-0.05em]">Dashboard.</h1>
            </div>

            <p className="max-w-xs text-sm leading-7 text-secondary">Manage your portfolio, featured work, and incoming enquiries.</p>
          </div>
        </section>

        <section className="mt-20 border-t border-foreground/10 sm:mt-28">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className={`border-b border-foreground/10 py-8 sm:px-6 lg:border-b-0 lg:border-r ${index === 0 ? "lg:pl-0" : ""} ${index === stats.length - 1 ? "lg:border-r-0 lg:pr-0" : ""}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">{stat.label}</p>

                    <Icon size={15} strokeWidth={1.2} className="text-muted" />
                  </div>

                  <p className="mt-8 font-serif text-6xl leading-none tracking-[-0.04em] sm:text-7xl">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20 grid gap-px border-y border-foreground/10 bg-foreground/10 sm:mt-28 sm:grid-cols-2">
          <Link href="/admin/projects" className="group bg-background p-8 transition-colors duration-500 hover:bg-subtle sm:p-12 lg:p-16">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">01</span>

              <ArrowUpRight size={18} strokeWidth={1.2} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>

            <h2 className="mt-20 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-6xl">Projects.</h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-secondary">Add, edit, publish, and feature photography and cinematography projects.</p>
          </Link>

          <Link href="/admin/leads" className="group bg-background p-8 transition-colors duration-500 hover:bg-subtle sm:p-12 lg:p-16">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">02</span>

              <ArrowUpRight size={18} strokeWidth={1.2} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>

            <h2 className="mt-20 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-6xl">Leads.</h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-secondary">View incoming enquiries and keep track of potential clients.</p>
          </Link>
        </section>

        <footer className="mt-20 flex flex-col gap-4 border-t border-foreground/10 pt-8 text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>ST Photography</span>
          <span>Admin Dashboard</span>
        </footer>
      </div>
    </main>
  );
}
