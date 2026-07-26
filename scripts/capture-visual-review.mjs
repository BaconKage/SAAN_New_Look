/**
 * Visual review capture.
 *
 * Generates full-page screenshots of every key template at five viewports, plus
 * the interaction states that only exist at runtime (mobile navigation open,
 * solution explorer selections). Output feeds docs/VISUAL_REVIEW.md.
 *
 *   node scripts/capture-visual-review.mjs
 */
import { mkdirSync } from 'node:fs';

import { chromium } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const OUT = 'artifacts/visual-review';

const viewports = [
  { label: '1440', width: 1440, height: 1000 },
  { label: '1024', width: 1024, height: 768 },
  { label: '768', width: 768, height: 1024 },
  { label: '390', width: 390, height: 844 },
  { label: '320', width: 320, height: 700 },
];

const pages = [
  ['homepage', '/'],
  ['solutions', '/solutions'],
  [
    'meeting-and-collaboration-spaces',
    '/solutions/meeting-and-collaboration-spaces',
  ],
  ['digital-signage', '/solutions/digital-signage'],
  ['led-and-video-walls', '/solutions/led-and-video-walls'],
  [
    'professional-audio-and-auditoriums',
    '/solutions/professional-audio-and-auditoriums',
  ],
  ['industries', '/industries'],
  ['industry-corporate', '/industries/corporate'],
  ['industry-education', '/industries/education'],
  ['services', '/services'],
  ['service-consultation', '/services/consultation-and-requirement-analysis'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['support', '/support'],
  ['plan-your-project', '/plan-your-project'],
  ['projects', '/projects'],
  ['partners', '/partners'],
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let count = 0;

for (const { label, width, height } of viewports) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();

  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });

    // Scroll progressively, not in one jump. IntersectionObserver samples
    // positions; an instant jump to the bottom means intermediate elements
    // never register as intersecting, so scroll-revealed sections would be
    // captured blank.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.6);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
    await page.waitForTimeout(450);
    await page.screenshot({
      path: `${OUT}/${name}-${label}.png`,
      fullPage: true,
    });
    count += 1;
  }

  await context.close();
}

// --- Interaction states --------------------------------------------------

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
});
const mobilePage = await mobile.newPage();
await mobilePage.goto(BASE + '/', { waitUntil: 'networkidle' });
await mobilePage.getByRole('button', { name: 'Open menu' }).click();
await mobilePage.waitForTimeout(350);
await mobilePage.screenshot({
  path: `${OUT}/mobile-navigation-390.png`,
  fullPage: true,
});
count += 1;
await mobile.close();

const desktop = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const desktopPage = await desktop.newPage();

await desktopPage.goto(BASE + '/', { waitUntil: 'networkidle' });
await desktopPage.getByRole('button', { name: /solutions menu/i }).click();
await desktopPage.waitForTimeout(300);
await desktopPage.screenshot({ path: `${OUT}/mega-panel-solutions-1440.png` });
count += 1;

for (const requirement of [
  'A modern meeting room',
  'An auditorium',
  'Support or an upgrade',
]) {
  await desktopPage.goto(BASE + '/', { waitUntil: 'networkidle' });
  const tab = desktopPage.getByRole('tab', { name: requirement });
  await tab.scrollIntoViewIfNeeded();
  await tab.click();
  await desktopPage.waitForTimeout(400);
  const slug = requirement
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const panel = desktopPage.locator('[role="tabpanel"]:not([hidden])');
  await panel.screenshot({ path: `${OUT}/explorer-${slug}-1440.png` });
  count += 1;
}

await desktop.close();
await browser.close();

console.log(`Captured ${count} screenshots into ${OUT}/`);
