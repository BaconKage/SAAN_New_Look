import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the hero and answers the three questions', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Technology spaces that work');

    await expect(
      page.getByText(/SAAN designs, integrates and supports professional AV/)
    ).toBeVisible();

    await expect(
      page.getByRole('link', { name: 'Plan Your Project' }).first()
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Explore Our Solutions' })
    ).toBeVisible();
  });

  test('has exactly one h1', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('renders every homepage section', async ({ page }) => {
    const sections = [
      'solutions-heading',
      'explorer-heading',
      'industries-heading',
      'process-heading',
      'projects-heading',
      'support-heading',
      'partners-heading',
      'cta-heading',
    ];
    for (const id of sections) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('lists all eight solutions', async ({ page }) => {
    const section = page.locator('section', {
      has: page.locator('#solutions-heading'),
    });
    await expect(section.getByRole('article')).toHaveCount(8);
  });

  test('lists all seven industries', async ({ page }) => {
    const section = page.locator('section', {
      has: page.locator('#industries-heading'),
    });
    await expect(section.getByRole('article')).toHaveCount(7);
  });

  test('shows the four delivery stages', async ({ page }) => {
    for (const stage of ['Discover', 'Design', 'Deliver', 'Support']) {
      await expect(
        page.getByRole('heading', { name: stage, exact: true })
      ).toBeVisible();
    }
  });

  test('makes no prohibited superlative claim', async ({ page }) => {
    const body = (await page.textContent('body')) ?? '';
    const lower = body.toLowerCase();
    for (const phrase of [
      'number one',
      'best in india',
      'market leader',
      '100% satisfaction',
      'world-class',
    ]) {
      expect(lower, `Found prohibited claim: ${phrase}`).not.toContain(phrase);
    }
  });

  test('uses no auto-rotating carousel', async ({ page }) => {
    await expect(
      page.locator('[data-carousel], .swiper, .slick-slider')
    ).toHaveCount(0);
  });

  test('has no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});

test.describe('solution explorer', () => {
  test('selects a requirement and swaps the panel', async ({ page }) => {
    await page.goto('/');

    const tablist = page.getByRole('tablist', {
      name: /choose the requirement/i,
    });
    await expect(tablist).toBeVisible();

    const tabs = tablist.getByRole('tab');
    await expect(tabs).toHaveCount(9);

    // First tab is selected on load.
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');

    const auditorium = page.getByRole('tab', { name: /an auditorium/i });
    await auditorium.click();
    await expect(auditorium).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'false');

    await expect(
      page.getByText('You want every seat to hear clearly.')
    ).toBeVisible();
  });

  test('is operable with arrow keys', async ({ page }) => {
    await page.goto('/');

    const tabs = page
      .getByRole('tablist', { name: /choose the requirement/i })
      .getByRole('tab');

    await tabs.first().focus();
    await page.keyboard.press('ArrowDown');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('End');
    await expect(tabs.last()).toBeFocused();

    await page.keyboard.press('Home');
    await expect(tabs.first()).toBeFocused();
  });

  test('states that a site assessment is required', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByText(/specified after a site assessment/i).first()
    ).toBeVisible();
  });
});
