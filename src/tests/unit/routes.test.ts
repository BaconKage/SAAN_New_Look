import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
  footerNavigation,
  primaryCta,
  primaryNavigation,
  secondaryCta,
} from '@/config/navigation';
import { staticRoutes } from '@/config/routes';
import { blockedPaths, redirects } from '@/lib/redirects';

/**
 * Internal link validation.
 *
 * Replaces Next's `typedRoutes`, which only resolves after a build has run and
 * therefore makes `npm run typecheck` order-dependent in CI. This checks the
 * same thing against the files actually on disk, with no build prerequisite:
 * a link to a page that does not exist fails here.
 */

const appDir = fileURLToPath(new URL('../../app/', import.meta.url));

function pageExists(routePath: string): boolean {
  const segment = routePath === '/' ? '' : routePath.replace(/^\//, '');
  const candidate = `${appDir}${segment}${segment === '' ? '' : '/'}page.tsx`;
  return existsSync(candidate);
}

describe('static route registry', () => {
  it('every registered route has a page on disk', () => {
    for (const route of staticRoutes) {
      expect(pageExists(route.path), `Missing page for ${route.path}`).toBe(
        true
      );
    }
  });

  it('route paths are unique', () => {
    const paths = staticRoutes.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('sitemap priorities are between 0 and 1', () => {
    for (const route of staticRoutes) {
      expect(route.priority).toBeGreaterThan(0);
      expect(route.priority).toBeLessThanOrEqual(1);
    }
  });

  it('no route has a trailing slash', () => {
    for (const route of staticRoutes) {
      if (route.path === '/') continue;
      expect(route.path.endsWith('/')).toBe(false);
    }
  });
});

describe('navigation links', () => {
  const knownPaths = new Set(staticRoutes.map((route) => route.path));

  it('every primary navigation item points at a real page', () => {
    for (const item of primaryNavigation) {
      expect(knownPaths.has(item.href), `Unknown route ${item.href}`).toBe(
        true
      );
    }
  });

  it('both homepage calls to action point at real pages', () => {
    expect(knownPaths.has(primaryCta.href)).toBe(true);
    expect(knownPaths.has(secondaryCta.href)).toBe(true);
  });

  it('every footer link points at a real page', () => {
    const footerLinks = [
      ...footerNavigation.company,
      ...footerNavigation.support,
      ...footerNavigation.legal,
    ];
    for (const link of footerLinks) {
      expect(knownPaths.has(link.href), `Unknown route ${link.href}`).toBe(
        true
      );
    }
  });
});

describe('redirect map', () => {
  it('covers every legacy URL found on the current website', () => {
    // 27 legacy URLs were catalogued. Two need no entry: `/` is rebuilt in
    // place, and `/solutions/` differs only by its trailing slash, which the
    // sitewide normalisation rule handles. That leaves 25 page redirects, plus
    // the wp-sitemap.xml rule.
    expect(redirects.length).toBe(26);
  });

  it('has no duplicate sources', () => {
    const sources = redirects.map((rule) => rule.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it('never redirects a path to itself', () => {
    for (const rule of redirects) {
      expect(rule.source).not.toBe(rule.destination);
    }
  });

  it('produces no redirect chains', () => {
    const sources = new Set(redirects.map((rule) => rule.source));
    for (const rule of redirects) {
      expect(
        sources.has(rule.destination),
        `${rule.source} redirects to ${rule.destination}, which is itself a redirect source`
      ).toBe(false);
    }
  });

  it('sends every destination to a page that exists', () => {
    const knownPaths = new Set(staticRoutes.map((route) => route.path));

    for (const rule of redirects) {
      // Dynamic destinations are validated against the content source instead.
      if (
        /^\/(solutions|industries|services|projects|partners|resources)\/./.test(
          rule.destination
        )
      ) {
        continue;
      }
      if (rule.destination === '/sitemap.xml') continue;

      expect(
        knownPaths.has(rule.destination),
        `${rule.source} redirects to unknown route ${rule.destination}`
      ).toBe(true);
    }
  });

  it('every redirect is permanent and carries a documented rationale', () => {
    for (const rule of redirects) {
      expect(rule.permanent).toBe(true);
      expect(rule.note.length).toBeGreaterThan(10);
    }
  });

  it('does not redirect WordPress admin surfaces anywhere', () => {
    const sources = new Set(redirects.map((rule) => rule.source));
    for (const blocked of blockedPaths) {
      expect(sources.has(blocked), `${blocked} must 404, not redirect`).toBe(
        false
      );
    }
  });
});
