# SAAN Protocol Experts website

Corporate website for SAAN Protocol Experts Private Limited (Bengaluru): enterprise AV, video conferencing, LED video walls, professional audio, smart classrooms and support.

## Stack

- Next.js 16 (App Router, fully static output) and React 19
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- GSAP + ScrollTrigger for scroll choreography, Lenis for smooth scrolling
- Raw WebGL (no library) for the LED-wall hero, `src/components/hero/led-renderer.ts`
- Phosphor icons, Archivo (variable width) and Geist Mono via `next/font`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run verify   # lint, typecheck and production build
```

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | Company name, phone, email, address. Edit contact details here only. |
| `src/content/solutions.ts` | The eight solution pages (copy, capabilities, typical system, FAQs) |
| `src/content/products.ts` | Product catalogue |
| `src/content/home.ts` | Hero scenes, room configurator hotspots, process, industries, logos, references, recognition |
| `src/components/hero/` | WebGL LED-wall hero and its renderer |
| `src/components/home/` | Home page sections |
| `src/components/layout/` | Header (mega menu, mobile menu), footer, preloader |
| `public/images/` | Photography, product shots, brand logos, OG image |

## Signature interactions

- **Preloader** (about 3 s): LED cabinets fly in from depth and assemble into a wall the size of the screen, the seams flash and close, the wall writes "SAAN", then the camera dives into one lit LED and into the hero. Plays on every full page load (including refresh), never on in-site navigation, and is skipped under reduced motion. Timings live in `TIMELINE` in `src/components/layout/loader-wall.ts`.
- **LED-wall hero**: the hero is a wall of live LED cabinets showing each scene in SAAN amber. Scenes change with the cabinets flipping over in a wave, each carrying the next scene on its back, and cabinets near the cursor lift and tilt slightly.
- **Horizontal solutions gallery**: vertical scroll pans the eight practices sideways (swipe on mobile).
- **Room configurator**: pick a room type and see where each component goes, with hotspots linked to the system list.
- **Project planner**: three-step brief on the Contact page that opens WhatsApp or email pre-filled. There is no server form handler yet.

All motion respects `prefers-reduced-motion`, and content is readable without JavaScript.

## Before launch

- Confirm permission to publish each reference name in `src/content/home.ts` (`references`) and the two recognition entries.
- Confirm `varda@saanpro.com` should be the public enquiry address.
- Replace the type-set wordmark in `src/components/brand/logo.tsx` with the master SAAN vector logo if one exists.
- Product photos are manufacturer images; check each OEM's reseller media terms. See `docs/IMAGE_CREDITS.md`.
- Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_ENV=production` on the production host (otherwise pages send `noindex`).
- Legacy saanpro.com URLs are redirected in `next.config.ts` (that file is authoritative; the older plans in `docs/` predate this rebuild and use earlier page slugs).
