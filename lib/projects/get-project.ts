import { createClient } from '@/lib/supabase/server';

export type ProjectCategory = 'Interior Photography' | 'Interior Cinematography';

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  description: string;
  cover_image: string | null;
  youtube_url: string | null;
  images: string[];
  featured: boolean;
  featured_order: number;
  published: boolean;
};

function normalizeProject(project: Project): Project {
  return {
    ...project,
    category: project.category as ProjectCategory,
    images: Array.isArray(project.images)
      ? project.images.filter((image): image is string => typeof image === 'string')
      : [],
  };
}

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select(
      'id, slug, title, category, location, year, description, cover_image, youtube_url, images, featured, featured_order, published',
    )
    .eq('published', true)
    .order('year', { ascending: false });

  if (error) {
    console.error('Published projects fetch error:', error);
    return [];
  }

  return (data ?? []).map(normalizeProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const fields =
    'id, slug, title, category, location, year, description, cover_image, youtube_url, images, featured, featured_order, published';

  const [photographyResult, cinematographyResult] = await Promise.all([
    supabase
      .from('projects')
      .select(fields)
      .eq('published', true)
      .eq('featured', true)
      .eq('category', 'Interior Photography')
      .order('featured_order', { ascending: true })
      .order('year', { ascending: false })
      .limit(2),

    supabase
      .from('projects')
      .select(fields)
      .eq('published', true)
      .eq('featured', true)
      .eq('category', 'Interior Cinematography')
      .order('featured_order', { ascending: true })
      .order('year', { ascending: false })
      .limit(2),
  ]);

  if (photographyResult.error) {
    console.error('Featured photography projects fetch error:', photographyResult.error);
  }

  if (cinematographyResult.error) {
    console.error('Featured cinematography projects fetch error:', cinematographyResult.error);
  }

  const photographyProjects = (photographyResult.data ?? []).map(normalizeProject);
  const cinematographyProjects = (cinematographyResult.data ?? []).map(normalizeProject);

  return [...photographyProjects, ...cinematographyProjects];
}

export async function getPublishedProject(slug: string): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select(
      'id, slug, title, category, location, year, description, cover_image, youtube_url, images, featured, featured_order, published',
    )
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    console.error('Published project fetch error:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  return normalizeProject(data);
}
