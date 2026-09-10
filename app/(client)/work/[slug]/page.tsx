import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { getPublishedProject, getPublishedProjects } from '@/lib/projects/get-project';

import { ProjectDetail } from './project-detail';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getPublishedProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${project.title} | ${project.category}`;

  const description =
    project.description || `${project.category} project by ST Photography in ${project.location}.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/work/${project.slug}`,
    },

    openGraph: {
      type: 'article',
      title,
      description,
      url: `/work/${project.slug}`,
      siteName: 'ST Photography',

      ...(project.cover_image
        ? {
            images: [
              {
                url: project.cover_image,
                alt: `${project.title} — ${project.category}`,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: project.cover_image ? 'summary_large_image' : 'summary',
      title,
      description,

      ...(project.cover_image
        ? {
            images: [project.cover_image],
          }
        : {}),
    },
  };
}

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

  const projectUrl = `https://stphotography.bd/work/${project.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: projectUrl,
    dateCreated: `${project.year}-01-01`,
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    creator: {
      '@type': 'Organization',
      name: 'ST Photography',
      url: 'https://stphotography.bd',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ST Photography',
      url: 'https://stphotography.bd',
    },
    genre:
      project.category === 'Interior Photography'
        ? 'Interior Photography'
        : 'Interior Cinematography',

    ...(project.cover_image
      ? {
          image: project.cover_image,
        }
      : {}),

    ...(project.youtube_url
      ? {
          video: {
            '@type': 'VideoObject',
            name: project.title,
            description: project.description,
            thumbnailUrl: project.cover_image ? [project.cover_image] : undefined,
            contentUrl: project.youtube_url,
            embedUrl: project.youtube_url,
            uploadDate: `${project.year}-01-01`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ProjectDetail
        project={project}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </>
  );
}
