# SAAN Protocol Experts website

Corporate website for SAAN Protocol Experts Private Limited (Bengaluru): enterprise AV, video conferencing, LED video walls, professional audio, smart classrooms and support.

## Stack

- Next.js 16 (App Router, static export to `out/`) and React 19, hosted on Cloudflare Workers static assets (free plan)
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- GSAP + ScrollTrigger for scroll choreography, Lenis for smooth scrolling
- Raw WebGL (no library) for the LED-wall hero, `src/components/hero/led-renderer.ts`
- Phosphor icons, Archivo (variable width) and Geist Mono via `next/font`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run verify   # lint, typecheck and production build
npm run preview  # serve the built out/ with Cloudflare's local runtime, http://localhost:8787
```

## Hosting (Cloudflare)

The site is plain static files, so there is no server to run or patch.

- `npm run build` runs `next build` (writes `out/`), then `scripts/optimize-images.mjs`, which pre-resizes every JPG/PNG to WebP at the widths in `src/lib/image-sizes.json`. `src/lib/image-loader.ts` points `next/image` at those files.
- `wrangler.jsonc` tells Cloudflare to serve `out/`. Cloudflare's Git integration builds every push: `main` deploys to production, other branches get preview URLs.
- `public/_redirects` holds the legacy WordPress redirects and `public/_headers` the security and cache headers. Cloudflare applies both at the edge.
- Production builds are detected from Cloudflare's branch variable, so `main` is indexable with `https://saanpro.com` as the canonical URL (`www` redirects to it with a Cloudflare redirect rule) and every other build is `noindex`. `NEXT_PUBLIC_SITE_ENV` and `NEXT_PUBLIC_SITE_URL` override this.
- `scripts/fix-windows-export.mjs` corrects a Next.js export bug that only affects builds made on Windows.

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | Company name, phone, email, address. Edit contact details here only. |
| `src/content/solutions.ts` | The nine solution pages (copy, capabilities, typical system, FAQs) |
| `src/content/projects.ts` | Delivered work with SAAN's own site photos (IISc), shown on the home page and on solution pages |
| `src/content/products.ts` | Product catalogue |
| `src/content/home.ts` | Hero scenes, room configurator hotspots, process, industries, logos, references, recognition |
| `src/components/hero/` | WebGL LED-wall hero and its renderer |
| `src/components/home/` | Home page sections |
| `src/components/layout/` | Header (mega menu, mobile menu), footer, preloader |
| `public/images/` | Photography, product shots, brand logos, OG image |

## Signature interactions

- **Preloader** (about 3 s): LED cabinets fly in from depth and assemble into a wall the size of the screen, the seams flash and close, the wall writes "SAAN", then the camera dives into one lit LED and into the hero. Plays on every full page load (including refresh), never on in-site navigation, and is skipped under reduced motion. Timings live in `TIMELINE` in `src/components/layout/loader-wall.ts`.
- **LED-wall hero**: the hero is a wall of live LED cabinets showing each scene in SAAN amber. Scenes change with the cabinets flipping over in a wave, each carrying the next scene on its back, and cabinets near the cursor lift and tilt slightly.
- **Horizontal solutions gallery**: vertical scroll pans the nine practices sideways (swipe on mobile).
- **Room configurator**: pick a room type and see where each component goes, with hotspots linked to the system list.
- **Project planner**: three-step brief on the Contact page that opens WhatsApp or email pre-filled. There is no server form handler yet.

All motion respects `prefers-reduced-motion`, and content is readable without JavaScript.

## Before launch

- Confirm permission to publish each reference name in `src/content/home.ts` (`references`) and the two recognition entries.
- Confirm `varda@saanpro.com` should be the public enquiry address.
- Replace the type-set wordmark in `src/components/brand/logo.tsx` with the master SAAN vector logo if one exists.
- Product photos are manufacturer images; check each OEM's reseller media terms. See `docs/IMAGE_CREDITS.md`.
- Legacy saanpro.com URLs are redirected in `public/_redirects` (that file is authoritative; the older plans in `docs/` predate this rebuild and use earlier page slugs).
