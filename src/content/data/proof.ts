import type {
  Partner,
  ProjectSummary,
  ResourceSummary,
  Testimonial,
} from '@/content/schemas';

/**
 * Evidence content: projects, partners, testimonials and resources.
 *
 * ALL FOUR COLLECTIONS ARE DELIBERATELY EMPTY.
 *
 * The previous website contained no photographs of actual SAAN installations,
 * no case studies, no testimonials and no verified partner status. None of it
 * can be invented — docs/CONTENT_STRATEGY.md §5 and the project brief both
 * prohibit fabricating customers, projects, partners or awards.
 *
 * The templates, filters, cards and schemas are all built and working. Each
 * section renders a clearly-labelled placeholder state that shows the
 * structure without pretending the content exists. As soon as SAAN supplies
 * real records they drop straight in with no code change.
 *
 * Tracked in docs/CONTENT_TODO.md §4 (partners) and §6 (projects).
 */

/** [CONTENT REQUIRED: Approved customer project details] */
export const projects: ProjectSummary[] = [];

/** [CONTENT REQUIRED: Current authorised partner status] */
export const partners: Partner[] = [];

/** [CONTENT REQUIRED: Verified customer quotation] */
export const testimonials: Testimonial[] = [];

/** Knowledge-centre articles. First set lands in Phase 7. */
export const resources: ResourceSummary[] = [];

/**
 * How many placeholder cards each empty section should render so the page
 * shows its real structure during development and client review.
 */
export const placeholderCounts = {
  featuredProjects: 3,
  partners: 6,
} as const;
