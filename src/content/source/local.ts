import { siteConfig, type SiteConfig } from '@/config/site';
import { industries } from '@/content/data/industries';
import {
  partners as allPartners,
  projects as allProjects,
  resources as allResources,
  testimonials as allTestimonials,
} from '@/content/data/proof';
import { processStages, services } from '@/content/data/services';
import { solutions } from '@/content/data/solutions';
import {
  industrySummarySchema,
  isPublishablePartner,
  partnerSchema,
  processStageSchema,
  projectSummarySchema,
  resourceSummarySchema,
  serviceSummarySchema,
  solutionSummarySchema,
  testimonialSchema,
  type IndustrySummary,
  type Partner,
  type ProcessStage,
  type ProjectSummary,
  type ResourceSummary,
  type ServiceSummary,
  type SolutionSummary,
  type Testimonial,
} from '@/content/schemas';

import type { ContentSource, ProjectFilter } from './types';

/**
 * Local content source.
 *
 * Reads typed modules from src/content/data and validates every record against
 * the same Zod schemas the CMS will use. Validation runs once per module at
 * first access, so a malformed record fails the production build rather than
 * rendering a broken page.
 */

/** Validates a collection once and caches the result. */
function validated<T>(
  label: string,
  schema: { parse: (value: unknown) => T },
  records: unknown[]
): () => T[] {
  let cache: T[] | null = null;

  return () => {
    if (cache !== null) return cache;

    cache = records.map((record, index) => {
      try {
        return schema.parse(record);
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(
          `Invalid ${label} record at index ${index}:\n${detail}`
        );
      }
    });

    return cache;
  };
}

const getValidatedSolutions = validated<SolutionSummary>(
  'solution',
  solutionSummarySchema,
  solutions
);
const getValidatedIndustries = validated<IndustrySummary>(
  'industry',
  industrySummarySchema,
  industries
);
const getValidatedServices = validated<ServiceSummary>(
  'service',
  serviceSummarySchema,
  services
);
const getValidatedProcess = validated<ProcessStage>(
  'process stage',
  processStageSchema,
  processStages
);
const getValidatedProjects = validated<ProjectSummary>(
  'project',
  projectSummarySchema,
  allProjects
);
const getValidatedPartners = validated<Partner>(
  'partner',
  partnerSchema,
  allPartners
);
const getValidatedResources = validated<ResourceSummary>(
  'resource',
  resourceSummarySchema,
  allResources
);
const getValidatedTestimonials = validated<Testimonial>(
  'testimonial',
  testimonialSchema,
  allTestimonials
);

function byOrder<T extends { order: number }>(records: T[]): T[] {
  return [...records].sort((a, b) => a.order - b.order);
}

export const localContentSource: ContentSource = {
  async getSiteSettings(): Promise<SiteConfig> {
    return siteConfig;
  },

  async getSolutions(): Promise<SolutionSummary[]> {
    return byOrder(getValidatedSolutions());
  },

  async getSolution(slug: string): Promise<SolutionSummary | null> {
    return getValidatedSolutions().find((s) => s.slug === slug) ?? null;
  },

  async getIndustries(): Promise<IndustrySummary[]> {
    return byOrder(getValidatedIndustries());
  },

  async getIndustry(slug: string): Promise<IndustrySummary | null> {
    return getValidatedIndustries().find((i) => i.slug === slug) ?? null;
  },

  async getServices(): Promise<ServiceSummary[]> {
    return byOrder(getValidatedServices());
  },

  async getService(slug: string): Promise<ServiceSummary | null> {
    return getValidatedServices().find((s) => s.slug === slug) ?? null;
  },

  async getProcessStages(): Promise<ProcessStage[]> {
    return getValidatedProcess();
  },

  async getProjects(filter?: ProjectFilter): Promise<ProjectSummary[]> {
    let results = getValidatedProjects().filter(
      (project) => project.status === 'published'
    );

    if (filter?.industry) {
      results = results.filter((p) => p.industry === filter.industry);
    }
    if (filter?.solution) {
      results = results.filter((p) => p.solutions.includes(filter.solution!));
    }
    if (filter?.location) {
      results = results.filter((p) => p.location === filter.location);
    }
    if (filter?.roomType) {
      results = results.filter((p) => p.roomTypes.includes(filter.roomType!));
    }

    results = [...results].sort((a, b) => b.year - a.year);

    return filter?.limit !== undefined
      ? results.slice(0, filter.limit)
      : results;
  },

  async getProject(slug: string): Promise<ProjectSummary | null> {
    return (
      getValidatedProjects().find(
        (p) => p.slug === slug && p.status !== 'draft'
      ) ?? null
    );
  },

  async getPartners(): Promise<Partner[]> {
    // The verification gate. An unverified partner is invisible sitewide:
    // no page, no logo, no card. See docs/CONTENT_STRATEGY.md §4.4.
    return getValidatedPartners().filter(isPublishablePartner);
  },

  async getPartner(slug: string): Promise<Partner | null> {
    return (
      getValidatedPartners().find(
        (p) => p.slug === slug && isPublishablePartner(p)
      ) ?? null
    );
  },

  async getResources(): Promise<ResourceSummary[]> {
    return getValidatedResources().filter((r) => r.status === 'published');
  },

  async getResource(slug: string): Promise<ResourceSummary | null> {
    return (
      getValidatedResources().find(
        (r) => r.slug === slug && r.status !== 'draft'
      ) ?? null
    );
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return getValidatedTestimonials().filter(
      (t) => t.permissionStatus === 'granted'
    );
  },
};
