import { z } from 'zod';

import {
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
  capabilities: z.array(pointSchema).min(3),
  environments: z.array(z.string().min(1)).min(3),
});

export type ExplorerOption = z.infer<typeof explorerOptionSchema>;
export type SolutionSummary = z.infer<typeof solutionSummarySchema>;
export type IndustrySummary = z.infer<typeof industrySummarySchema>;
export type ServiceSummary = z.infer<typeof serviceSummarySchema>;
export type ProcessStage = z.infer<typeof processStageSchema>;
