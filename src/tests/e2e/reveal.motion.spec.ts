import { expect, test } from '@playwright/test';

/**
 * Reduced-motion behaviour.
 *
 * The most common bug in scroll-reveal implementations is that the hidden
 * initial state (`opacity: 0`) persists when animation is disabled, hiding
 * content from exactly the users who asked for less motion.
 *
 * These tests run under the `reduced-motion` Playwright project, which sets
 * `prefers-reduced-motion: reduce` at the browser level.
 */

test('content inside reveal wrappers is visible with reduced motion', async ({
  page,
}) => {
  await page.goto('/');

  const revealed = page.locator('[data-reveal]');
  const count = await revealed.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const element = revealed.nth(index);
    const opacity = await element.evaluate(
      (node) => window.getComputedStyle(node).opacity
    );
    expect(
      Number(opacity),
      `Reveal element ${index} is hidden under reduced motion`
    ).toBe(1);
  }
});

test('all eight solutions are reachable without scrolling triggers', async ({
  page,
}) => {
  await page.goto('/');

  const section = page.locator('section', {
    has: page.locator('#solutions-heading'),
  });

  // Without waiting for any scroll or animation, every solution link must
  // already be present and visible. Two are feature panels with an h3; the
  // remaining six are index rows.
  const links = section.locator('a[href^="/solutions/"]');
  await expect(links).toHaveCount(8);

  for (let index = 0; index < 8; index += 1) {
    await expect(links.nth(index)).toBeVisible();
  }
});

test('the delivery process section is fully readable', async ({ page }) => {
  await page.goto('/');

  for (const stage of ['Discover', 'Design', 'Deliver', 'Support']) {
    await expect(
      page.getByRole('heading', { name: stage, exact: true })
    ).toBeVisible();
  }
});
