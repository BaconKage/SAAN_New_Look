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
      'evaluate-heading',
      'explorer-heading',
      'industries-heading',
      'process-heading',
      'support-heading',
      'partners-heading',
      'cta-heading',
    ];
    for (const id of sections) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('links to all eight solutions', async ({ page }) => {
    // Two feature panels plus a six-item index — deliberately not a uniform
    // grid, so this counts links rather than cards.
    const section = page.locator('section', {
      has: page.locator('#solutions-heading'),
    });
    const links = section.locator('a[href^="/solutions/"]');
    await expect(links).toHaveCount(8);
  });

  test('links to all seven industries', async ({ page }) => {
    const section = page.locator('section', {
      has: page.locator('#industries-heading'),
    });
    await expect(section.locator('a[href^="/industries/"]')).toHaveCount(7);
  });

  test('shows the technical evaluation criteria', async ({ page }) => {
    const section = page.locator('section', {
      has: page.locator('#evaluate-heading'),
    });
    await expect(section.getByRole('heading', { level: 3 })).toHaveCount(8);
    await expect(section.getByText('Ambient light')).toBeVisible();
  });

  test('renders the hero system graphic without an image request', async ({
    page,
  }) => {
    const heroSvg = page.locator('section#hero-heading, section').first();
    await expect(heroSvg.locator('svg').first()).toBeAttached();
    // The hero must not depend on a raster image for its composition.
    await expect(page.locator('main img')).toHaveCount(0);
  });

  test('shows no unresolved content markers to visitors', async ({ page }) => {
    const body = (await page.textContent('body')) ?? '';
    expect(body).not.toContain('[CONTENT REQUIRED');
  });

  test('publishes only the confirmed telephone number', async ({ page }) => {
    const body = (await page.textContent('body')) ?? '';
    expect(body).toContain('+91 93426 59932');
    // The two numbers carried across from the old site are unverified and
    // must not be published.
    expect(body).not.toContain('2318 2011');
    expect(body).not.toContain('88671 38111');
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

  test('frames itself as a conversation, not a specification', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(
      page
        .getByText(/before recommending a final system|not a specification/i)
        .first()
    ).toBeVisible();
  });

  test('shows what SAAN would evaluate for a requirement', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /what saan would evaluate/i })
    ).toBeVisible();
  });
});
