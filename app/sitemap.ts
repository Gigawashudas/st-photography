import type { MetadataRoute } from 'next';

import { getPublishedProjects } from '@/lib/projects/get-project';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stphotography.bd';

  const projects = await getPublishedProjects();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
