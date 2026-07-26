import { expect, test } from '@playwright/test';

const PRIMARY_LINKS = [
  'Solutions',
  'Industries',
  'Projects',
  'Services',
  'Partners',
  'Resources',
  'About',
  'Contact',
];

test.describe('desktop navigation', () => {
  test.skip(({ isMobile }) => Boolean(isMobile), 'Desktop only');

  test('shows every primary link', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    for (const label of PRIMARY_LINKS) {
      await expect(
        nav.getByRole('link', { name: label, exact: true })
      ).toBeVisible();
    }
  });

  test('opens the solutions panel by click, not hover alone', async ({
    page,
  }) => {
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /solutions menu/i });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // Scoped to the header: the same link also exists in the footer.
    await expect(
      page
        .getByRole('banner')
        .getByRole('link', { name: /meeting & collaboration/i })
    ).toBeVisible();
  });

  test('closes the panel on Escape and restores focus', async ({ page }) => {
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /solutions menu/i });
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('the skip link is the first tab stop and works', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });
});

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('opens and closes the drawer', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: 'Open menu' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(page.getByRole('dialog', { name: 'Site menu' })).toBeVisible();

    for (const label of PRIMARY_LINKS) {
      await expect(
        page.getByRole('dialog').getByRole('link', { name: label, exact: true })
      ).toBeVisible();
    }
  });

  test('closes on Escape and returns focus to the toggle', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: 'Open menu' });
    await toggle.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  });

  test('does not scroll horizontally at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/');

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe('site-wide routes', () => {
  const routes = [
    '/',
    '/solutions',
    '/industries',
    '/services',
    '/projects',
    '/partners',
    '/resources',
    '/about',
    '/recognition',
    '/support',
    '/contact',
    '/plan-your-project',
    '/privacy',
    // Detail routes — every one of these is linked from the navigation panels
    // and listed in the sitemap, so a 404 here is a live broken link.
    '/solutions/meeting-and-collaboration-spaces',
    '/solutions/digital-signage',
    '/solutions/managed-av-services',
    '/industries/corporate',
    '/industries/government-and-public-sector',
    '/services/consultation-and-requirement-analysis',
    '/services/amc-and-preventive-maintenance',
  ];

  for (const route of routes) {
    test(`${route} returns 200 with a single h1`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main')).toBeVisible();
    });
  }

  test('unknown routes render the 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole('heading', { name: /could not be found/i })
    ).toBeVisible();
  });

  test('legacy URLs redirect to their new destination', async ({ page }) => {
    const cases: Array<[string, string]> = [
      ['/about-us', '/about'],
      ['/contact-us', '/contact'],
      ['/products', '/solutions'],
      ['/awards', '/recognition'],
      ['/boardroom', '/solutions/meeting-and-collaboration-spaces'],
      ['/digital-signage', '/solutions/digital-signage'],
      ['/video-wall-solutions', '/solutions/led-and-video-walls'],
      ['/automation', '/solutions/room-automation-and-control'],
    ];

    for (const [from, to] of cases) {
      await page.goto(from);
      expect(
        new URL(page.url()).pathname,
        `${from} should redirect to ${to}`
      ).toBe(to);
    }
  });

  test('trailing-slash legacy URLs redirect correctly', async ({ page }) => {
    await page.goto('/about-us/');
    expect(new URL(page.url()).pathname).toBe('/about');
  });
});
