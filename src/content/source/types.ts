import type {
  IndustrySummary,
  IndustryDetail,
  Partner,
  SolutionDetail,
  ProcessStage,
  ProjectSummary,
  ResourceSummary,
  ServiceSummary,
  SolutionSummary,
  Testimonial,
} from '@/content/schemas';
import type { SiteConfig } from '@/config/site';

/**
 * The content contract.
 *
 * Every page reads content through this interface and never touches a data
 * module or a CMS client directly. Two implementations satisfy it:
 *
 *   LocalContentSource   typed modules in src/content/data   (Phase 2 onward)
 *   SanityContentSource  GROQ queries                        (Phase 4)
 *
 * Because the interface and the Zod schemas behind it are identical for both,
 * the CMS can be introduced without touching a single page component — and
 * the application builds and runs with no CMS credentials at all.
 */
export interface ContentSource {
  getSiteSettings(): Promise<SiteConfig>;

  getSolutions(): Promise<SolutionSummary[]>;
  getSolution(slug: string): Promise<SolutionSummary | null>;
  /** The depth content behind a solution page. Null while unwritten. */
  getSolutionDetail(slug: string): Promise<SolutionDetail | null>;

  getIndustries(): Promise<IndustrySummary[]>;
  getIndustry(slug: string): Promise<IndustrySummary | null>;
  /** The depth content behind an industry page. Null while unwritten. */
  getIndustryDetail(slug: string): Promise<IndustryDetail | null>;

  getServices(): Promise<ServiceSummary[]>;
  getService(slug: string): Promise<ServiceSummary | null>;

  getProcessStages(): Promise<ProcessStage[]>;

  getProjects(filter?: ProjectFilter): Promise<ProjectSummary[]>;
  getProject(slug: string): Promise<ProjectSummary | null>;

  /** Returns verified partners only. Unverified partners are never exposed. */
  getPartners(): Promise<Partner[]>;
  getPartner(slug: string): Promise<Partner | null>;

  getResources(): Promise<ResourceSummary[]>;
  getResource(slug: string): Promise<ResourceSummary | null>;

  /** Returns approved testimonials only. */
  getTestimonials(): Promise<Testimonial[]>;
}

export interface ProjectFilter {
  readonly industry?: string;
  readonly solution?: string;
  readonly location?: string;
  readonly roomType?: string;
  readonly limit?: number;
}
