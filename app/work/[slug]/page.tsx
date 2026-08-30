import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectDetail } from './project-detail';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects
    .filter((project) => project.published)
    .map((project) => ({
      slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const publishedProjects = projects.filter((project) => project.published);

  const currentIndex = publishedProjects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = publishedProjects[currentIndex];
  const previousProject = currentIndex > 0 ? publishedProjects[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex < publishedProjects.length - 1 ? publishedProjects[currentIndex + 1] : undefined;

  return (
    <ProjectDetail project={project} previousProject={previousProject} nextProject={nextProject} />
  );
}
