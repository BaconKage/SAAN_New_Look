/**
 * Skip-to-content link.
 *
 * First element in the tab order. Visually hidden until focused, then rendered
 * as a solid, high-contrast control rather than a faint outline — a skip link
 * that is hard to see is not much better than no skip link.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only rounded-sm bg-ink-900 px-5 py-3 text-[0.9375rem] font-medium text-ink-0 focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
    >
      Skip to main content
    </a>
  );
}
