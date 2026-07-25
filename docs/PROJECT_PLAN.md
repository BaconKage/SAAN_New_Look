# Project Plan — SAAN Protocol Experts website rebuild

**Client:** Saan Protocol Experts Private Limited, Bangalore
**Objective:** replace `saanpro.com` with a premium, interactive B2B website positioning SAAN as an enterprise technology-solutions company rather than a product reseller.
**Repository:** `C:\SAAN_new_gen` — new, independent of the existing WordPress site.
**Started:** 2026-07-25
**Constraint:** the live site stays untouched. No DNS, hosting or email change without explicit written approval.

---

## 1. Situation

The current site is a WordPress 5.5.18 / Elementor / "Mesmerize" install whose last content update was September 2020. Full audit in CURRENT_URL_INVENTORY.md. The findings that shape this project:

1. **It is product-led.** 12 of 27 URLs are manufacturer or hardware categories. The site sells boxes; the brief requires selling solution capability.
2. **It is thin.** `/solutions/` is a heading. `/boardroom/` is one sentence. Several pages are ~90% navigation chrome.
3. **It captures nothing.** No email address is published anywhere, and there is no contact form. Every enquiry depends on someone phoning a number.
4. **Its About page describes a different company** — TMG (test & measurement), ITG (IT infrastructure), ECG (electronic components). This contradicts the AV positioning and needs a decision.
5. **It has no proof.** Zero photographs of actual SAAN installations. Every image is a manufacturer render or stock interior.
6. **Parts of it are obsolete or risky.** `/lifesize/` reproduces vendor marketing for discontinued hardware from a brand that has since collapsed commercially.
7. **It has real assets worth keeping.** Genuine partner awards (Lifesize 2014/2015/2017, Panasonic 2014, Online Instruments 2019), a distinctive amber brand colour, an 18-year operating history, and a credible Bangalore address.

The rebuild is therefore a repositioning exercise with a website attached — not a redesign.

---

## 2. Success criteria

| # | Criterion | Measure |
|---|---|---|
| 1 | All required pages implemented | 31 fixed pages + dynamic templates |
| 2 | Mobile and desktop polished | Manual review at 320 / 768 / 1280 / 1728px |
| 3 | Navigation fully functional | E2E tests pass, keyboard-operable |
| 4 | Interactive features work | Explorer, configurator, filters, diagrams, comparisons, storytelling |
| 5 | Forms work securely | Validation both sides, rate limited, spam-protected, reference issued |
| 6 | Content editable in the CMS | Sanity schemas live, draft/preview working |
| 7 | Unverified claims marked | `npm run audit:content` returns a clean manifest |
| 8 | Legacy URLs decided | All 27 mapped, redirect tests green |
| 9 | Accessibility passes | axe clean, manual keyboard pass, WCAG 2.2 AA |
| 10 | Production build passes | `npm run build` exits 0 |
| 11 | Tests pass | Lint, types, unit, e2e, a11y |
| 12 | Lighthouse targets met | Perf ≥90, A11y ≥95, BP ≥95, SEO ≥95 |
| 13 | Deployment documented | Deployment, cutover, rollback, launch checklist |
| 14 | **No cutover without approval** | Absolute |

---

## 3. Technology decisions

| Layer | Decision | Rationale |
|---|---|---|
| Framework | Next.js latest stable, App Router, RSC-first | Static/ISR rendering gives the headroom for the Lighthouse targets |
| Language | TypeScript strict + `noUncheckedIndexedAccess` | |
| Styling | Tailwind CSS v4, CSS-variable tokens via `@theme` | One token source shared by CSS, TS and tests |
| Motion | `motion` in client islands, `LazyMotion` + `domAnimation` | Keeps animation JS off pages that do not animate |
| Forms | React Hook Form + Zod, one schema client and server | No validation drift |
| **CMS** | **Sanity** | Hosted (no DB, no server to run); its image CDN handles AVIF/WebP and art-directed crops, which is exactly what IMAGE_REQUIREMENTS.md needs; GROQ + ISR is a clean fit. Payload would require Postgres and a long-running Node process for no benefit at this scale. |
| Content access | **Adapter pattern** — see §4 | |
| Email | Resend behind an `EmailTransport` interface | Provider-swappable, no lock-in |
| Testing | Vitest · Playwright · `@axe-core/playwright` | |
| Quality | ESLint flat config · Prettier · Lighthouse CI · Husky + lint-staged | |
| Hosting | Vercel (recommended), staging on a preview subdomain | |
| Analytics | Provider-agnostic `track()` abstraction | Brief §20 — no hard-coded provider |

### Rejected

Purchased templates and UI kits (brief §5) · heavy 3D or WebGL · client-side data fetching for content · a component library with an opinionated visual identity · dated blog archives · a product catalogue.

---

## 4. The content-adapter decision

Every content type is defined **once** as a Zod schema in `src/content/schemas/`. Two implementations satisfy the same typed interface:

```
ContentSource
├── LocalContentSource   typed TS modules in src/content/data/   ← Phase 4 onward
└── SanityContentSource  GROQ queries                            ← swapped in later
```

**Why this matters:** the site is complete, buildable and deployable before the CMS holds a single record. Content delivery from SAAN stops being on the critical path. The same schema also serves as the CMS validation layer, so a record that would break a page cannot be published from either source.

---

## 5. Repository structure

```
src/
├── app/                    routes per INFORMATION_ARCHITECTURE.md §2
│   ├── api/enquiries/route.ts
│   └── api/support/route.ts
├── components/
│   ├── layout/ navigation/ sections/ cards/
│   ├── forms/ interactive/ media/ seo/ ui/
├── content/
│   ├── schemas/            Zod — the contract
│   ├── data/               local content
│   └── source/             adapter implementations
├── config/site.ts          ALL company details, single source
├── lib/                    redirects, metadata, analytics, email, rate-limit, utils
├── styles/                 tokens.css, globals.css
├── tests/                  unit/ e2e/ a11y/
└── types/
docs/                       this documentation set
sanity/                     studio + schemas (Phase 4)
```

---

## 6. Phases

### Phase 1 — Discovery and planning ✅ COMPLETE (2026-07-25)
Live-site audit · 27-URL inventory · content classification · IA · positioning · design direction from the logo · redirect plan · this document.
**Output:** 13 documents in `docs/`.

### Phase 2 — Foundation
`git init` · Next.js scaffold · TypeScript strict · Tailwind v4 · ESLint/Prettier · Vitest + Playwright · env handling with `.env.example` · GitHub Actions CI · root layout with skip link and landmarks · `error.tsx` · `not-found.tsx` · `sitemap.ts` · `robots.ts` · `src/config/site.ts`.
**Validate:** build passes, lint clean, types clean, CI green.

### Phase 3 — Design system
Tokens in `tokens.css` · contrast unit test across every documented pairing · buttons · cards · forms · navigation (mega-panel + drawer) · section layouts · `ResponsiveImage` + `PlaceholderImage` · motion primitives with `prefers-reduced-motion` · a11y primitives.
**Validate:** contrast test green, keyboard pass on nav, axe clean on the component harness.

### Phase 4 — Content architecture
Zod schemas for all six models · local content source · site settings · `[CONTENT REQUIRED]` marker plumbing · `audit:content` and `audit:images` scripts · Sanity studio and schemas · draft/preview.
**Validate:** every content record passes its schema; audit scripts produce a manifest.

### Phase 5 — Core pages
Homepage (14 sections) · solutions index + 8 solution pages · industries index + 7 pages · services index + 8 pages · about · contact · support.
**Validate:** build passes, per-page Lighthouse, one H1 each, breadcrumbs correct.

### Phase 6 — Interactive experiences
Solution explorer · requirement configurator · project filters · architecture diagrams · comparison modules · scroll storytelling · both form workflows end-to-end with rate limiting and spam protection · microinteractions.
**Validate:** e2e per feature, keyboard-only pass, reduced-motion pass, form failure paths.

### Phase 7 — Proof and resources
Projects gallery · case-study template · partner pages behind the verification gate · recognition · resource centre · article template · brochure downloads · testimonials with empty-state handling.
**Validate:** filters, gallery a11y, placeholder projects correctly `noindex` and out of the sitemap.

### Phase 8 — SEO, accessibility, performance
Metadata across all pages · JSON-LD · redirect implementation + tests · sitemap · full axe sweep · Lighthouse CI · image optimisation · mobile validation at 320px · broken-link validation.
**Validate:** all §2 targets met.

### Phase 9 — Staging and launch preparation
Private preview deployment · `noindex` on staging · content review · form verification with real destinations · analytics verification · redirect verification · cutover and rollback documentation finalised · launch checklist walked.
**Validate:** LAUNCH_CHECKLIST.md fully signed off.

**Phase 10 — Cutover: only on explicit written approval.**

---

## 7. Reporting

After every phase: files created or changed · requirements completed · validation results (actual command output, including failures) · unresolved content requirements · assumptions still needing confirmation.

If the production build fails, the phase is not complete and is not reported as complete.

---

## 8. Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | **Positioning conflict unresolved** (TMG/ITG/ECG vs AV) | High | High | Building on the stated assumption in CONTENT_STRATEGY §6; isolated to `/about` + homepage copy so it is reversible in one file |
| 2 | **No real project photography** | Certain | High | Full model, gallery and template ship with visibly-marked placeholders. IMAGE_REQUIREMENTS.md gives SAAN a precise shot list. |
| 3 | **Partner authorisations unverifiable** | High | Medium | Verification gate — unverified partners are invisible; conditional redirects fall back to solution pages automatically |
| 4 | **No customer permissions** | High | High | Anonymous-customer support built into the model from the start |
| 5 | Trailing-slash change 404s every legacy URL | Medium | High | Sitewide 301 rule + automated test over all 27 URLs |
| 6 | Nine-to-one URL consolidation depresses rankings | Medium | Medium | Destination page must genuinely cover all nine intents; 90-day monitoring; rollback trigger defined |
| 7 | Email DNS disturbed at cutover | Low | **Critical** | Only A/CNAME records touched. MX/SPF/DKIM/DMARC recorded and re-verified. DOMAIN_CUTOVER_CHECKLIST.md. |
| 8 | Canonical host decision (apex vs www) reversed late | Medium | Medium | Single config constant; blocked as CONTENT_TODO 1.2 |
| 9 | Interactive features hurt performance | Medium | Medium | Client islands only; per-feature bundle budget; Lighthouse CI in the pipeline |
| 10 | Contact details wrong at launch | Low | High | Centralised config + explicit checklist verification of every number and address |
| 11 | Legacy WordPress compromised before cutover | Low | Medium | **Out of scope but flagged:** WP 5.5.18 has been unpatched for ~6 years. SAAN should be told. |
| 12 | Scope drift into a product catalogue | Medium | Medium | Explicitly excluded — INFORMATION_ARCHITECTURE §10 |

---

## 9. Assumptions

Recorded so they can be corrected cheaply.

1. AV / systems integration is SAAN's current business; TMG/ITG/ECG are legacy. *(CONTENT_TODO 1.1)*
2. Apex `saanpro.com` is canonical. *(1.2)*
3. All 8 solutions, 7 industries and 8 services in the brief are genuinely offered. *(10.1–10.3)*
4. SAAN operates from the single Bangalore address, serving at least Karnataka. *(1.4, 1.5)*
5. Founded December 2007, per the legacy About page. *(2.10)*
6. Sanity is acceptable as the CMS.
7. Vercel is acceptable as the host.
8. Brand amber is `#E38700`, sampled from the logo. *(3.4)*
9. The Lifesize relationship is historical; the awards may still be shown, the partner page may not. *(4.4)*
10. English only, `en-IN`.
11. No client portal, e-commerce or pricing at launch.
12. The current WordPress site can be fully backed up before cutover. *(9.6)*

---

## 10. Out of scope

Modifying the existing WordPress site · migrating its database · DNS or email changes without approval · e-commerce · client portal · multi-language · a mobile app · CRM integration (the analytics and email abstractions leave room for it) · paid-media campaigns · content writing for customer-supplied case studies beyond editing.

---

## 11. Document register

| Document | Purpose |
|---|---|
| `PROJECT_PLAN.md` | This — scope, stack, phases, risks |
| `CURRENT_URL_INVENTORY.md` | Audit of all 27 legacy URLs |
| `INFORMATION_ARCHITECTURE.md` | Site tree, navigation, templates, cross-linking |
| `DESIGN_SYSTEM.md` | Tokens, components, accessibility baseline |
| `CONTENT_STRATEGY.md` | Voice, rules, content models, placeholder convention |
| `CONTENT_TODO.md` | Every unverified fact — the single register |
| `IMAGE_REQUIREMENTS.md` | Every image slot, with a shot list for SAAN |
| `REDIRECT_PLAN.md` | Legacy → new mapping for all 27 URLs |
| `SEO_PLAN.md` | Metadata, structured data, migration verification |
| `DEPLOYMENT_PLAN.md` | Environments, CI/CD, secrets |
| `DOMAIN_CUTOVER_CHECKLIST.md` | The DNS switch, step by step |
| `ROLLBACK_PLAN.md` | Restoring the previous site |
| `LAUNCH_CHECKLIST.md` | Final sign-off gate |
