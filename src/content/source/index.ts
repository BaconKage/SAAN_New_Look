import { localContentSource } from './local';
import type { ContentSource } from './types';

/**
 * Content source resolution.
 *
 * The local source is used unless Sanity credentials are present. This is the
 * mechanism that keeps the CMS off the critical path: the site is complete,
 * buildable and deployable before the CMS holds a single record, and adding
 * credentials later switches the source with no component changes.
 */
function resolveContentSource(): ContentSource {
  // Phase 4 will return SanityContentSource when this is configured.
  // const hasSanity = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  return localContentSource;
}

export const content: ContentSource = resolveContentSource();

export type { ContentSource, ProjectFilter } from './types';
