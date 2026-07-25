/**
 * Legacy URL redirect map.
 *
 * Single source of truth, consumed by `next.config.ts` and by the Playwright
 * redirect suite. The map is never duplicated.
 *
 * Every URL discovered on the current public website is either preserved,
 * consolidated into a new page with a 301, or deliberately excluded with a
 * documented reason. See docs/REDIRECT_PLAN.md for the full rationale.
 */

export interface RedirectRule {
  readonly source: string;
  readonly destination: string;
  readonly permanent: boolean;
  /** Why this mapping was chosen. Surfaced in the verification test output. */
  readonly note: string;
}

/** Solution page that absorbs the nine fragmented meeting/VC legacy URLs. */
const MEETING = '/solutions/meeting-and-collaboration-spaces';
const DISPLAYS = '/solutions/commercial-displays-and-projection';

export const redirects: readonly RedirectRule[] = [
  // --- Top-level pages ---------------------------------------------------
  {
    source: '/about-us',
    destination: '/about',
    permanent: true,
    note: 'Slug normalised.',
  },
  {
    source: '/products',
    destination: '/solutions',
    permanent: true,
    note: 'Repositioning: the product directory is replaced by the solution index.',
  },
  {
    source: '/awards',
    destination: '/recognition',
    permanent: true,
    note: 'Broader page covering awards, partner programmes and certifications.',
  },
  {
    source: '/contact-us',
    destination: '/contact',
    permanent: true,
    note: 'Slug normalised.',
  },

  // --- Product pages consolidate into solutions --------------------------
  {
    source: '/audio-systems',
    destination: '/solutions/professional-audio-and-auditoriums',
    permanent: true,
    note: 'Direct intent match.',
  },
  {
    source: '/av-accessories',
    destination: '/services/supply-and-installation',
    permanent: true,
    note: 'Accessories are a delivery concern, not a solution.',
  },
  {
    source: '/av-mounting-kits',
    destination: '/services/supply-and-installation',
    permanent: true,
    note: 'Mounting is part of installation.',
  },
  {
    source: '/displays',
    destination: DISPLAYS,
    permanent: true,
    note: 'Direct intent match.',
  },
  {
    source: '/projector',
    destination: DISPLAYS,
    permanent: true,
    note: 'Direct intent match.',
  },
  {
    source: '/screen',
    destination: DISPLAYS,
    permanent: true,
    note: 'Projection screens belong with projection.',
  },
  {
    source: '/video-conferences',
    destination: MEETING,
    permanent: true,
    note: 'Direct intent match; also fixes the grammatical slug error.',
  },
  {
    source: '/wps',
    destination: MEETING,
    permanent: true,
    note: 'Wireless presentation is a capability within meeting spaces. Opaque acronym slug retired.',
  },

  // --- Manufacturer brand pages ------------------------------------------
  // These become /partners/<slug> only once the relationship is verified.
  // Until then they fall back to the solution page. See REDIRECT_PLAN.md §3.
  {
    source: '/clearone',
    destination: MEETING,
    permanent: true,
    note: 'Conditional: becomes /partners/clearone once the relationship is verified.',
  },
  {
    source: '/poly',
    destination: MEETING,
    permanent: true,
    note: 'Conditional: becomes /partners/poly once the relationship is verified.',
  },
  {
    source: '/zoom',
    destination: MEETING,
    permanent: true,
    note: 'Conditional: becomes /partners/zoom once the relationship is verified.',
  },
  {
    source: '/lifesize',
    destination: MEETING,
    permanent: true,
    note: 'Unconditional. Icon hardware discontinued and the brand collapsed commercially; no partner page will be created.',
  },

  // --- Legacy solution pages ---------------------------------------------
  {
    source: '/automation',
    destination: '/solutions/room-automation-and-control',
    permanent: true,
    note: 'Direct intent match, clearer slug.',
  },
  {
    source: '/boardroom',
    destination: MEETING,
    permanent: true,
    note: 'Boardrooms are one room type within the solution.',
  },
  {
    source: '/digital-signage',
    destination: '/solutions/digital-signage',
    permanent: true,
    note: 'Best-performing legacy page; slug preserved under the new prefix.',
  },
  {
    source: '/vc-solutions',
    destination: MEETING,
    permanent: true,
    note: 'Duplicate intent.',
  },
  {
    source: '/video-wall-solutions',
    destination: '/solutions/led-and-video-walls',
    permanent: true,
    note: 'Broadened to cover direct-view LED.',
  },

  // --- Orphan pages (in the legacy sitemap, absent from its navigation) ---
  {
    source: '/cloud-vc',
    destination: MEETING,
    permanent: true,
    note: 'Orphaned page; redirected in case of external inbound links.',
  },
  {
    source: '/meeting-room-devices',
    destination: MEETING,
    permanent: true,
    note: 'Orphaned page; redirected in case of external inbound links.',
  },

  // --- WordPress default artefacts ---------------------------------------
  {
    source: '/hello-world',
    destination: '/resources',
    permanent: true,
    note: 'WordPress default post; no content value.',
  },
  {
    source: '/category/uncategorized',
    destination: '/resources',
    permanent: true,
    note: 'WordPress default taxonomy archive; no content value.',
  },
  {
    source: '/wp-sitemap.xml',
    destination: '/sitemap.xml',
    permanent: true,
    note: 'Legitimate crawler redirect.',
  },
] as const;

/**
 * Paths that must return 404 rather than redirect anywhere.
 *
 * Redirecting these to real pages would imply the surfaces still exist.
 * Implemented by the catch-all not-found handler.
 */
export const blockedPaths: readonly string[] = [
  '/wp-admin',
  '/wp-login.php',
  '/wp-json',
  '/xmlrpc.php',
  '/wp-content',
  '/wp-includes',
] as const;

/** Every legacy source path, for the verification suite. */
export function getRedirectSources(): readonly string[] {
  return redirects.map((rule) => rule.source);
}

/** Looks up the destination for a legacy path. */
export function findRedirect(source: string): RedirectRule | undefined {
  return redirects.find((rule) => rule.source === source);
}
