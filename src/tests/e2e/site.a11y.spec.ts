import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Automated accessibility sweep.
 *
 * Runs axe against WCAG 2.0/2.1/2.2 A and AA on every page template, plus the
 * `best-practice` rule set. `best-practice` is included deliberately: it holds
 * `heading-order`, which caught a skipped heading level on the index pages that
 * the WCAG tags alone did not report.
 *
 * Automated testing catches roughly a third of real accessibility problems, so
 * this sits alongside the manual keyboard checks in navigation.spec.ts rather
 * than replacing them.
 */

const pages = [
  { path: '/', name: 'homepage' },
  { path: '/solutions', name: 'solutions index' },
  { path: '/industries', name: 'industries index' },
  { path: '/services', name: 'services index' },
  { path: '/projects', name: 'projects' },
  { path: '/partners', name: 'partners' },
  { path: '/resources', name: 'resources' },
  { path: '/about', name: 'about' },
  { path: '/recognition', name: 'recognition' },
  { path: '/support', name: 'support' },
  { path: '/contact', name: 'contact' },
  { path: '/plan-your-project', name: 'plan your project' },
  { path: '/privacy', name: 'privacy' },
  { path: '/this-page-does-not-exist', name: '404' },
  // One of each detail template.
  { path: '/solutions/digital-signage', name: 'solution detail' },
  { path: '/industries/education', name: 'industry detail' },
  { path: '/services/training-and-handover', name: 'service detail' },
];

for (const { path, name } of pages) {
  test(`${name} has no accessibility violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22aa',
        'best-practice',
      ])
      .analyze();

    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
        help: violation.help,
      }))
    ).toEqual([]);
  });
}

test('the open mobile menu has no accessibility violations', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22aa',
      'best-practice',
    ])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('the open solutions panel has no accessibility violations', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /solutions menu/i }).click();

  const results = await new AxeBuilder({ page })
    .withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'wcag22aa',
      'best-practice',
    ])
    .analyze();

  expect(results.violations).toEqual([]);
});
