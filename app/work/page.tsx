import Link from "next/link";
import { WorkGrid } from "./work-grid";
import { getPublishedProjects } from "@/lib/projects/get-project";
import { WorkHeader } from "./work-header";

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="min-h-screen bg-background">
      <section className="px-6 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44 lg:px-10 lg:pb-40 lg:pt-52">
        <div className="mx-auto max-w-[1440px]">
          <WorkHeader>
            <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <span className="h-px w-8 bg-foreground/40" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted sm:text-xs">Selected Work</p>
                </div>

                <h1 className="max-w-5xl font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-[-0.055em]">
                  Spaces
                  <br />
                  <span className="ml-[8vw]">worth remembering.</span>
                </h1>
              </div>

              <p className="max-w-sm text-sm font-light leading-7 tracking-[0.05em] text-secondary sm:text-base sm:leading-8 lg:pb-2">Interior photography and cinematography for spaces, architecture, designers, developers, hospitality, and brands.</p>
            </div>
          </WorkHeader>

          <WorkGrid projects={projects} />
        </div>
      </section>

      <section className="border-t border-foreground/10 px-6 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted sm:text-xs">Have a space to photograph?</p>

            <h2 className="max-w-3xl font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.84] tracking-[-0.05em]">
              Let&apos;s make
              <br />
              it memorable.
            </h2>
          </div>

          <Link href="/#contact" className="group flex items-center gap-5 border-b border-foreground pb-3 text-[10px] font-medium uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-50 sm:text-xs">
            Start a project
            <span className="text-base transition-transform duration-500 group-hover:translate-x-1">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
