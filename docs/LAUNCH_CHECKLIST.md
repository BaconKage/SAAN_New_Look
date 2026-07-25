# Launch Checklist

**Gate:** every item must be checked before DOMAIN_CUTOVER_CHECKLIST.md may begin.
**Rule:** an unchecked box blocks the launch. There is no "we will fix it after go-live" for anything in Sections 1–5.

**Sign-off required from:** SAAN (content, contact details, permissions) and the engineering lead (technical).

---

## Section 1 — Content and accuracy 🔴

### 1.1 Contact details — verify by using them, not by reading them

| ✅ | Item |
|---|---|
| ☐ | **Every phone number dialled** and confirmed to reach the right team |
| ☐ | Sales email confirmed and a test message received |
| ☐ | Support email confirmed and a test message received |
| ☐ | WhatsApp number confirmed — link opens the correct chat |
| ☐ | Postal address confirmed as the current registered address |
| ☐ | Business hours confirmed and published |
| ☐ | CIN / GSTIN confirmed |
| ☐ | Every social link opens a genuine SAAN account |
| ☐ | Contact details appear identically everywhere (they come from `src/config/site.ts` — verify the config, not each page) |
| ☐ | Copyright year is computed, not hard-coded |

### 1.2 Claims and verification

| ✅ | Item |
|---|---|
| ☐ | `npm run audit:content` returns **zero** `[CONTENT REQUIRED]` markers |
| ☐ | No superlative or unverifiable claim on any page ("number one", "best", "market leader", "100%") |
| ☐ | No unverified statistic — installations, customers, engineers, years, cities |
| ☐ | No response-time promise unless supplied as confirmed written policy |
| ☐ | Founding year confirmed |
| ☐ | Positioning decision resolved (CONTENT_TODO 1.1 — TMG/ITG/ECG) |
| ☐ | Every award on `/recognition` re-verified, with a certificate scan |
| ☐ | The RWA committee entry removed (or explicitly retained by client decision) |
| ☐ | The unidentified IISc certificate identified, or removed |

### 1.3 Permissions

| ✅ | Item |
|---|---|
| ☐ | Written permission held for every named customer |
| ☐ | Customers without permission shown only via an accurate anonymous label |
| ☐ | Written permission for every customer logo displayed |
| ☐ | Written permission for every partner logo displayed |
| ☐ | Every testimonial has documented approval with attribution |
| ☐ | No partner published unless `verificationStatus === 'verified'` |
| ☐ | No manufacturer image used without checked usage rights |
| ☐ | No discontinued product presented as current |

### 1.4 Copy quality

| ✅ | Item |
|---|---|
| ☐ | Full proofread in Indian English |
| ☐ | The legacy typos are gone — no "SoIutions", no "HaIIs", no "Aligining" |
| ☐ | Sentence case headings throughout |
| ☐ | Every page has exactly one H1, no skipped heading levels |
| ☐ | No placeholder or lorem text anywhere |
| ☐ | Client has read and signed off every page |

---

## Section 2 — Functionality 🔴

### 2.1 Forms — the highest-consequence area

| ✅ | Item |
|---|---|
| ☐ | "Plan Your Project" submits successfully end to end |
| ☐ | **The enquiry arrives in the real SAAN inbox** — inbox checked, including spam |
| ☐ | Support request submits successfully |
| ☐ | **The support request arrives at the real support address** |
| ☐ | Unique reference number generated and displayed |
| ☐ | Client-side validation shows accessible, useful messages |
| ☐ | Server-side validation rejects malformed input independently |
| ☐ | File upload works; type and 10MB size limits enforced |
| ☐ | Rate limiting triggers and recovers correctly |
| ☐ | Spam protection active (Turnstile + honeypot + timing) |
| ☐ | Failure path shows a helpful error with the phone number |
| ☐ | Loading states present; no double submission possible |
| ☐ | Consent checkbox present, required, with approved wording |
| ☐ | Privacy notice linked from both forms |
| ☐ | Configurator completes and submits its summary |
| ☐ | Configurator disclaimer present — final design requires a site assessment |

### 2.2 Navigation and interaction

☐ Header nav works at every breakpoint · ☐ mega-panels open on click and keyboard, not hover only · ☐ mobile drawer opens, traps focus, closes on Escape, restores focus · ☐ every footer link resolves · ☐ breadcrumbs correct on every page · ☐ skip link is first in tab order and works · ☐ solution explorer works · ☐ project filters work and reflect in the URL · ☐ galleries keyboard-navigable · ☐ accordions and modals accessible · ☐ architecture diagrams render and animate · ☐ comparison modules function · ☐ scroll storytelling works and degrades under reduced motion · ☐ click-to-call opens the dialler on a real phone · ☐ WhatsApp link opens the correct chat

### 2.3 Error states

☐ `/404` renders with useful navigation · ☐ `error.tsx` renders on a thrown error · ☐ no unhandled console errors on any page · ☐ the site is usable with JavaScript disabled for all core content and navigation

---

## Section 3 — Technical 🔴

### 3.1 Build and tests — paste real output, do not assert

| ✅ | Command | Result |
|---|---|---|
| ☐ | `npm run lint` | |
| ☐ | `npm run typecheck` | |
| ☐ | `npm run test:unit` | |
| ☐ | `npm run test:e2e` | |
| ☐ | `npm run test:a11y` | |
| ☐ | `npm run validate:content` | |
| ☐ | `npm run validate:seo` | |
| ☐ | `npm run validate:links` | |
| ☐ | `npm run audit:content` | zero markers |
| ☐ | `npm run audit:images` | zero P0 placeholders |
| ☐ | **`npm run build`** | **must exit 0** |

### 3.2 Security

☐ No secret committed — history scanned · ☐ `.env*.local` gitignored · ☐ all secrets in the host's environment settings, scoped per environment · ☐ security headers present and verified · ☐ CSP enforced with no violations · ☐ API routes validate server-side and are rate limited · ☐ no server-only variable exposed via `NEXT_PUBLIC_` · ☐ file uploads restricted by type and size

### 3.3 Redirects

☐ All 27 legacy URLs return a single 301 to the correct destination · ☐ no chains, no loops · ☐ trailing-slash rule verified across the whole set · ☐ `/wp-admin/`, `/wp-json/`, `/xmlrpc.php` return 404 · ☐ `/wp-sitemap.xml` → `/sitemap.xml` · ☐ Search Console export reconciled against the inventory, and any newly discovered URL added · ☐ canonical host decision implemented and the other host 301s

---

## Section 4 — SEO 🔴

☐ Every page has a unique title ≤60 characters · ☐ every page has a unique description 120–155 characters · ☐ self-referencing canonicals on every page · ☐ OG tags and images on every page · ☐ `robots.txt` correct and **not** blocking production · ☐ `sitemap.xml` contains only intended URLs · ☐ placeholder projects and unverified partners excluded from the sitemap · ☐ all JSON-LD validates in the Rich Results Test · ☐ `FAQPage` markup only where FAQs are visible · ☐ **no `Review` or `AggregateRating` markup** · ☐ **staging confirmed `noindex`** · ☐ Search Console property verified for the canonical host

---

## Section 5 — Accessibility 🔴

☐ axe returns zero violations on every page template · ☐ full keyboard-only pass through both enquiry journeys · ☐ screen-reader pass on homepage, one solution page and both forms · ☐ contrast unit test green across all token pairings · ☐ focus visible everywhere and never obscured by the sticky header · ☐ touch targets ≥44×44px for primary controls · ☐ every image has meaningful or deliberately empty `alt` · ☐ forms fully labelled, errors announced · ☐ `prefers-reduced-motion` honoured, with **no content hidden** when motion is disabled · ☐ usable at 400% zoom and 320px width with no horizontal scroll · ☐ `<html lang="en-IN">` · ☐ landmarks correct, one `main` per page

---

## Section 6 — Performance 🟠

Measured on production-equivalent staging, mobile profile:

| ✅ | Metric | Target | Actual |
|---|---|---|---|
| ☐ | Lighthouse Performance | ≥90 | |
| ☐ | Lighthouse Accessibility | ≥95 | |
| ☐ | Lighthouse Best Practices | ≥95 | |
| ☐ | Lighthouse SEO | ≥95 | |
| ☐ | LCP | ≤2.5s | |
| ☐ | INP | ≤200ms | |
| ☐ | CLS | ≤0.1 | |

☐ Hero image optimised and preloaded · ☐ below-fold media lazy-loaded · ☐ fonts self-hosted, subset, preloaded · ☐ no autoplay video on mobile · ☐ static fallback present for any video · ☐ **tested on a real mid-range Android phone over mobile data**, not only a throttled desktop · ☐ tested on slow 3G

---

## Section 7 — Analytics 🟠

☐ Analytics provider decided and configured · ☐ all 12 events from the brief firing correctly · ☐ enquiry-completed and support-completed events verified · ☐ phone, WhatsApp and email click events verified · ☐ cookie consent implemented if the chosen configuration requires it · ☐ privacy policy accurately describes what is actually collected

---

## Section 8 — Cross-browser and device 🟠

☐ Chrome, Firefox, Safari, Edge — current versions · ☐ iOS Safari · ☐ Android Chrome · ☐ 320px, 375px, 768px, 1024px, 1280px, 1728px · ☐ landscape on mobile · ☐ dark-mode OS setting causes no rendering faults · ☐ **a real device test, not just DevTools emulation**

---

## Section 9 — Pre-cutover readiness 🔴

☐ Full WordPress backup taken, verified, stored in two locations · ☐ complete DNS snapshot recorded including MX, SPF, DKIM, DMARC · ☐ original apex and `www` values recorded · ☐ TTL lowered to 300s at least 48 hours prior · ☐ old hosting confirmed active and **not** cancelled · ☐ registrar and DNS access tested · ☐ screenshots of all 27 legacy pages taken · ☐ ROLLBACK_PLAN.md read by the executing engineer · ☐ emergency contact list completed · ☐ cutover window agreed with the client · ☐ someone available for the window and 2 hours after

---

## Section 10 — Final approval 🔴

| ✅ | Item |
|---|---|
| ☐ | Client has reviewed the full staging site |
| ☐ | Client has signed off all content |
| ☐ | Client has confirmed all contact details |
| ☐ | Client has confirmed all customer and partner permissions |
| ☐ | Client understands a temporary ranking dip is normal for 2–6 weeks |
| ☐ | Client understands the rollback procedure |
| ☐ | **Client has given explicit written approval to change DNS** |

```
Content sign-off       ________________  date ________
Technical sign-off     ________________  date ________
Client launch approval ________________  date ________
```

---

## Section 11 — Living document

Every launch failure and every near-miss adds a line to this checklist. A problem that is not converted into a check will recur.

**Amendments:**

| Date | Added | Reason |
|---|---|---|
| 2026-07-25 | Initial version | Phase 1 |
