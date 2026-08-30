import { createClient } from "@/lib/supabase/server";

export type ProjectCategory = "Interior Photography" | "Interior Cinematography";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  description: string;
  cover_image: string | null;
  images: string[] | null;
  featured: boolean;
  featured_order: number;
  published: boolean;
};

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("projects").select("id, slug, title, category, location, year, description, cover_image, images, featured, featured_order, published").eq("published", true).order("year", { ascending: false });

  if (error) {
    console.error("Published projects fetch error:", error);
    return [];
  }

  return (data ?? []).map((project) => ({
    ...project,
    category: project.category as ProjectCategory,
    images: Array.isArray(project.images) ? project.images.filter((image): image is string => typeof image === "string") : [],
  }));
}
