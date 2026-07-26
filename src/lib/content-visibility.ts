/**
 * Controls whether unresolved content markers are visible.
 *
 * Two distinct behaviours, per the Phase 3A brief:
 *
 *   Development audit mode — `SHOW_CONTENT_TODOS=true` renders visible
 *   [CONTENT REQUIRED] markers so the team can see exactly what is missing
 *   while reviewing the real pages.
 *
 *   Preview and production — the default. Missing optional fields are omitted
 *   gracefully: a visitor never sees a marker, a placeholder email or an empty
 *   labelled row. Nothing is invented to fill the gap; the field simply does
 *   not render.
 *
 * Unresolved items are still tracked by `npm run audit:content` and enforced
 * by `npm run validate:launch`, so hiding them from visitors never means
 * losing track of them.
 */

/** True only when explicitly enabled. Defaults to false everywhere. */
export function showContentTodos(): boolean {
  return process.env.SHOW_CONTENT_TODOS === 'true';
}
