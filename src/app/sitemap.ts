import type { MetadataRoute } from 'next';

import { staticRoutes } from '@/config/routes';
import { content } from '@/content/source';
import { absoluteUrl } from '@/lib/metadata';

/**
 * XML sitemap, generated from the route registry and the content graph.
 *
 * Excluded automatically: routes flagged `excludeFromSitemap`, placeholder and
 * draft content, and unverified partners. Nothing that carries an unresolved
 * [CONTENT REQUIRED] marker is ever advertised to a crawler.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [solutions, industries, services, projects, partners, resources] =
    await Promise.all([
      content.getSolutions(),
      content.getIndustries(),
      content.getServices(),
      content.getProjects(),
      content.getPartners(),
      content.getResources(),
    ]);

  const lastModified = new Date();

  const fixed: MetadataRoute.Sitemap = staticRoutes
    .filter((route) => route.excludeFromSitemap !== true)
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }));

  const solutionPages: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: absoluteUrl(`/solutions/${solution.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: absoluteUrl(`/industries/${industry.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // getProjects() already excludes anything that is not `published`.
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  // getPartners() already excludes unverified partners.
  const partnerPages: MetadataRoute.Sitemap = partners.map((partner) => ({
    url: absoluteUrl(`/partners/${partner.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const resourcePages: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: absoluteUrl(`/resources/${resource.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...fixed,
    ...solutionPages,
    ...industryPages,
    ...servicePages,
    ...projectPages,
    ...partnerPages,
    ...resourcePages,
  ];
}
