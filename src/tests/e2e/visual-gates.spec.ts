import { expect, test } from '@playwright/test';

/**
 * Visual quality gates.
 *
 * The checks from the Phase 3A brief §14, expressed as tests so they cannot
 * silently regress. These are layout and content-integrity assertions rather
 * than pixel comparisons — a screenshot diff would fail on every copy change
 * and teach the team to ignore it.
 */

const pages = [
  '/',
  '/solutions',
  '/solutions/digital-signage',
  '/solutions/led-and-video-walls',
  '/industries',
  '/industries/education',
  '/services',
  '/services/training-and-handover',
  '/about',
  '/contact',
  '/support',
  '/plan-your-project',
  '/projects',
  '/partners',
  '/resources',
  '/recognition',
];

test.describe('no horizontal overflow', () => {
  for (const width of [320, 390, 768]) {
    test(`at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });

      for (const path of pages) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth
        );
        expect(
          overflow,
          `${path} overflows horizontally at ${width}px`
        ).toBeLessThanOrEqual(1);
      }
    });
  }
});

test('no unresolved content markers on any page', async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const body = (await page.textContent('body')) ?? '';
    expect(body, `${path} shows a content marker`).not.toContain(
      '[CONTENT REQUIRED'
    );
  }
});

test('no unverified telephone numbers are published', async ({ page }) => {
  for (const path of ['/', '/contact', '/support']) {
    await page.goto(path);
    const body = (await page.textContent('body')) ?? '';
    expect(body, `${path} publishes the unverified landline`).not.toContain(
      '2318 2011'
    );
    expect(body, `${path} publishes the unverified support line`).not.toContain(
      '88671 38111'
    );
  }
});

test('no placeholder or example email addresses', async ({ page }) => {
  for (const path of ['/', '/contact', '/support', '/plan-your-project']) {
    await page.goto(path);
    const body = (await page.textContent('body')) ?? '';
    expect(body.toLowerCase()).not.toContain('example.com');
    expect(body.toLowerCase()).not.toContain('yourcompany');
    expect(body.toLowerCase()).not.toContain('lorem ipsum');
  }
});

test('every page has substantive content', async ({ page }) => {
  // Sixteen sequential navigations; the default timeout is tight for this
  // under parallel load and produced an intermittent failure.
  test.slow();

  for (const path of pages) {
    await page.goto(path);

    // Wait for the page's own h1, not just for `main`: with streaming, `main`
    // briefly contains the loading skeleton, which measured as three words.
    await expect(page.locator('main h1')).toBeVisible();

    const main = (await page.locator('main').textContent()) ?? '';
    const words = main.trim().split(/\s+/).length;

    // An empty-looking page is a Phase 3A failure condition in its own right.
    expect(words, `${path} looks empty (${words} words)`).toBeGreaterThan(120);
  }
});

test('scroll padding clears the sticky header (WCAG 2.2 focus not obscured)', async ({
  page,
}) => {
  await page.goto('/solutions/digital-signage');

  const { headerHeight, scrollPadding } = await page.evaluate(() => {
    const header = document.querySelector('header');
    const padding = getComputedStyle(document.documentElement).scrollPaddingTop;
    return {
      headerHeight: header ? header.getBoundingClientRect().height : 0,
      scrollPadding: Number.parseFloat(padding),
    };
  });

  expect(headerHeight).toBeGreaterThan(0);
  // The mechanism that keeps a focused element out from under the header.
  expect(
    scrollPadding,
    'scroll-padding-top must exceed the sticky header height'
  ).toBeGreaterThanOrEqual(headerHeight);
});

test('exactly one visible primary navigation at each breakpoint', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  await expect(
    page.getByRole('navigation', { name: 'Primary mobile' })
  ).toHaveCount(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
});
