import { z } from 'zod';

import {
  faqSchema,
  iconKeySchema,
  imageSchema,
  pointSchema,
  seoSchema,
  slugSchema,
} from './common';

/**
 * Solutions, industries and services — the pages that describe what SAAN does.
 *
 * Phase 2 ships the *summary* schemas, which are what navigation, the homepage
 * and the index pages consume. The full page schemas (challenges, capabilities,
 * architecture, FAQs and the rest of the 12 mandatory blocks in
 * docs/INFORMATION_ARCHITECTURE.md §4.2) extend these in Phase 5.
 *
 * Splitting it this way means Phase 2 content is genuinely complete and
 * validated rather than a stub full of empty required fields.
 */

export const solutionSummarySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  /** Short label for navigation, where the full title is too long. */
  navLabel: z.string().min(1),
  /** The customer outcome in one line. Leads every card and nav entry. */
  outcome: z.string().min(1),
  /** Two to three sentences for index pages. */
  summary: z.string().min(1),
  icon: iconKeySchema,
  /** Concrete capabilities, shown as a short list on cards. */
  highlights: z.array(z.string().min(1)).min(3),
  image: imageSchema,
  seo: seoSchema,
  order: z.number().int().nonnegative(),
});

export const industrySummarySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  navLabel: z.string().min(1),
  outcome: z.string().min(1),
  summary: z.string().min(1),
  icon: iconKeySchema,
  /** Typical spaces SAAN delivers in this sector. */
  environments: z.array(z.string().min(1)).min(3),
  image: imageSchema,
  seo: seoSchema,
  order: z.number().int().nonnegative(),
});

export const serviceSummarySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  navLabel: z.string().min(1),
  outcome: z.string().min(1),
  summary: z.string().min(1),
  icon: iconKeySchema,
  /** What the customer actually receives. Concrete deliverables only. */
  deliverables: z.array(z.string().min(1)).min(2),
  /**
   * Why these deliverables matter, in this stage's own terms.
   * Exists because a single shared paragraph appeared on all eight service
   * pages — see docs/CONTENT_REPETITION_AUDIT.md.
   */
  deliverableNote: z.string().min(1),
  /** How this stage relates to the rest of the sequence. Stage-specific. */
  positionNote: z.string().min(1),
  /** Who from SAAN and from your side is involved at this stage. */
  whoIsInvolved: z.string().min(1),
  /** Indicative duration. Never a commitment — always framed as typical. */
  typicalDuration: z.string().min(1),
  /** What the customer can do to make this stage go well. */
  whatHelps: z.array(z.string().min(1)).min(2),
  seo: seoSchema,
  order: z.number().int().nonnegative(),
});

/**
 * The four-stage delivery process. Used by the homepage scroll story and
 * repeated on every solution page.
 */
export const processStageSchema = pointSchema.extend({
  id: z.enum(['discover', 'design', 'deliver', 'support']),
  /** Ordinal shown in the UI, e.g. "01". */
  number: z.string().min(1),
  icon: iconKeySchema,
  /** What SAAN produces at this stage. */
  outputs: z.array(z.string().min(1)).min(2),
});

/**
 * Interactive solution explorer.
 *
 * A visitor picks the requirement they recognise — "an auditorium", "a signage
 * network" — rather than a product category, and is shown the challenges SAAN
 * expects to find, what SAAN does about them, and where it applies.
 *
 * Deliberately carries no pricing and never claims one product is always
 * correct: the recommendation is always to talk to a specialist.
 */
export const explorerOptionSchema = z.object({
  id: slugSchema,
  label: z.string().min(1),
  /** Restates the requirement in the visitor's own terms. */
  prompt: z.string().min(1),
  icon: iconKeySchema,
  /** Solution page this requirement maps to. */
  solutionSlug: slugSchema,
  challenges: z.array(z.string().min(1)).min(3),
  /** What SAAN would assess for this requirement, before specifying. */
  evaluates: z.array(z.string().min(1)).min(3),
  capabilities: z.array(pointSchema).min(3),
  environments: z.array(z.string().min(1)).min(3),
  /** Delivery services this requirement typically involves. */
  relatedServices: z.array(slugSchema).min(2),
});

/* -------------------------------------------------------------------------- */
/*                             Solution detail                                */
/* -------------------------------------------------------------------------- */

export const diagramNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  kind: z.enum([
    'display',
    'camera',
    'microphone',
    'speaker',
    'control',
    'player',
    'network',
    'cloud',
    'source',
  ]),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
});

export const diagramLinkSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  type: z.enum(['signal', 'data']).optional(),
});

export const systemDiagramSchema = z.object({
  nodes: z.array(diagramNodeSchema).min(3),
  links: z.array(diagramLinkSchema).min(2),
  caption: z.string().min(1),
});

/**
 * The depth behind each solution page.
 *
 * Held separately from the summary because it is only needed on one route, and
 * because every field here must be genuinely specific to its solution. The
 * minimums are what stop a page from being padded out with a template.
 *
 * `deliveryNote` and `ctaHeadline` exist specifically to prevent the repeated
 * closing paragraph and identical call to action that the Phase 3A content
 * audit found across all eight pages.
 */
export const solutionDetailSchema = z.object({
  slug: slugSchema,
  /** Opening statement. Must differ from the summary used on cards. */
  intro: z.string().min(1),
  challenges: z.array(pointSchema).min(3),
  /** What SAAN assesses before specifying anything. The credibility block. */
  evaluates: z.array(pointSchema).min(4),
  applications: z.array(pointSchema).min(3),
  architecture: systemDiagramSchema,
  /** Solution-specific delivery considerations, not the generic four stages. */
  deliveryNote: z.string().min(1),
  deliveryPoints: z.array(z.string().min(1)).min(3),
  /** Lifecycle and support considerations specific to this technology. */
  lifecycle: z.array(pointSchema).min(2),
  faqs: z.array(faqSchema).min(3),
  ctaHeadline: z.string().min(1),
  ctaBody: z.string().min(1),
});

/**
 * Depth content for the seven industry pages.
 *
 * Exists for the same reason as `solutionDetailSchema`: without it, every
 * industry page rendered the same six solution cards and the same closing
 * paragraph, which the Phase 3A repetition audit found on eight pages at once.
 * `relevantSolutions` is a genuine subset per sector, not the full list.
 */
export const industryDetailSchema = z.object({
  slug: slugSchema,
  intro: z.string().min(1),
  challenges: z.array(pointSchema).min(3),
  /** Operational, not marketing. What changes for the organisation. */
  benefits: z.array(pointSchema).min(3),
  deliveryApproach: z.object({
    summary: z.string().min(1),
    considerations: z.array(z.string().min(1)).min(3),
  }),
  relevantSolutions: z.array(slugSchema).min(3),
  ctaHeadline: z.string().min(1),
  ctaBody: z.string().min(1),
});

export type ExplorerOption = z.infer<typeof explorerOptionSchema>;
export type IndustryDetail = z.infer<typeof industryDetailSchema>;
export type SolutionSummary = z.infer<typeof solutionSummarySchema>;
export type SolutionDetail = z.infer<typeof solutionDetailSchema>;
export type SystemDiagram = z.infer<typeof systemDiagramSchema>;
export type IndustrySummary = z.infer<typeof industrySummarySchema>;
export type ServiceSummary = z.infer<typeof serviceSummarySchema>;
export type ProcessStage = z.infer<typeof processStageSchema>;
