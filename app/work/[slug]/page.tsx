import { notFound } from 'next/navigation';
import { getPublishedProject, getPublishedProjects } from '@/lib/projects/get-project';
import { ProjectDetail } from './project-detail';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const [project, publishedProjects] = await Promise.all([
    getPublishedProject(slug),
    getPublishedProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const currentIndex = publishedProjects.findIndex((item) => item.slug === project.slug);

  const previousProject = currentIndex > 0 ? publishedProjects[currentIndex - 1] : undefined;

  const nextProject =
    currentIndex >= 0 && currentIndex < publishedProjects.length - 1
      ? publishedProjects[currentIndex + 1]
      : undefined;

  return (
    <ProjectDetail project={project} previousProject={previousProject} nextProject={nextProject} />
  );
}
