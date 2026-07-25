/**
 * Placeholder convention for unverified content.
 *
 * Every fact SAAN has not confirmed in writing is represented by one of these
 * markers rather than by an invented value. Markers are:
 *
 *  - rendered visibly (and obviously provisionally) in non-production builds;
 *  - never emitted into <title>, meta descriptions or structured data;
 *  - reported by `npm run audit:content`;
 *  - a hard launch blocker — the production launch build fails while any remain.
 *
 * See docs/CONTENT_STRATEGY.md §5 and docs/CONTENT_TODO.md.
 */

export const CONTENT_REQUIRED_PREFIX = '[CONTENT REQUIRED:';

/** Builds a placeholder marker. */
export function contentRequired(description: string): string {
  return `${CONTENT_REQUIRED_PREFIX} ${description}]`;
}

/** True when a string is an unresolved placeholder marker. */
export function isContentRequired(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.startsWith(CONTENT_REQUIRED_PREFIX);
}

/**
 * A value that may not have been supplied by SAAN yet.
 *
 * `value` is null until confirmed. `verified` records whether SAAN has
 * confirmed it in writing — a value carried across from the old website is
 * present but NOT verified, and must be re-checked before launch.
 */
export interface SiteValue {
  readonly value: string | null;
  readonly placeholder: string;
  readonly verified: boolean;
  readonly note?: string;
}

/** A value SAAN has confirmed. */
export function verified(value: string, note?: string): SiteValue {
  return note !== undefined
    ? { value, placeholder: '', verified: true, note }
    : { value, placeholder: '', verified: true };
}

/**
 * A value observed on the current public website but not yet confirmed.
 * It renders normally, but the audit reports it and the launch checklist
 * requires it to be checked.
 */
export function provisional(value: string, note: string): SiteValue {
  return { value, placeholder: '', verified: false, note };
}

/** A value SAAN has not supplied at all. */
export function missing(description: string): SiteValue {
  return {
    value: null,
    placeholder: contentRequired(description),
    verified: false,
  };
}

/** Resolves to the real value, or to the placeholder marker when absent. */
export function resolveValue(field: SiteValue): string {
  return field.value ?? field.placeholder;
}

/** True when the field has a usable value. */
export function hasValue(field: SiteValue): field is SiteValue & {
  value: string;
} {
  return field.value !== null && field.value.length > 0;
}
