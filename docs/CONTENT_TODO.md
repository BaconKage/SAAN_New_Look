# Content TODO — single register of unverified information

Every `[CONTENT REQUIRED]` marker in the codebase has a row here. Nothing goes live carrying an unverified claim.

**Legend** — 🔴 launch blocker · 🟠 needed for credibility · 🟡 improves the site · ⚪ optional
**Status** — `OPEN` · `ASKED` (sent to SAAN) · `RECEIVED` · `DONE`

**Last updated:** 2026-07-25

---

## 1. Strategic decisions — needed before content is written

| # | Question | Priority | Status | Impact if unanswered |
|---|---|---|---|---|
| 1.1 | **Does SAAN still operate TMG (test & measurement), ITG (IT infrastructure) and ECG (electronic components)?** The legacy `/about-us/` is built entirely around these units and contains almost no AV content, which contradicts the AV-integrator brief. | 🔴 | OPEN | `/about` is currently written assuming AV/integration is the business and the earlier units are origin story (CONTENT_STRATEGY §6). If they are still active, About, the homepage positioning and possibly the IA all change. |
| 1.2 | **Canonical host: `saanpro.com` (apex) or `www.saanpro.com`?** The brief says `www`; the live site links internally with apex throughout. | 🔴 | OPEN | Recommendation: apex, to preserve link equity. Affects every redirect, all canonicals, the sitemap and the DNS cutover. |
| 1.3 | Is the tagline "Aligning Technology and Enterprise" retained, or replaced by "The right solution. Professionally delivered. Reliably supported."? | 🟠 | OPEN | Note: the current logo renders it as "Alig**ini**ng" — a typo baked into the image. |
| 1.4 | Which cities / regions does SAAN serve? Bangalore only, Karnataka, South India, pan-India? | 🟠 | OPEN | Determines LocalBusiness `areaServed`, the configurator's city question, and industry-page phrasing. |
| 1.5 | Are there offices or engineers outside Bangalore? | 🟠 | OPEN | No additional location may be claimed without confirmation. |
| 1.6 | Should `/resources` launch with articles, or as a small guide set? | 🟡 | OPEN | Affects whether `/resources` ships at launch or in a follow-up. |

---

## 2. Contact and company details 🔴

The most urgent gap: **the current website publishes no email address at all, and has no contact form.** Every enquiry today depends on someone phoning.

| # | Item | Current known value | Status |
|---|---|---|---|
| 2.1 | **Sales email address** | `[CONTENT REQUIRED: Confirmed sales email]` — none exists on the live site | OPEN 🔴 |
| 2.2 | **Support email address** | `[CONTENT REQUIRED: Confirmed support email]` — none exists on the live site | OPEN 🔴 |
| 2.3 | Enquiry form destination address(es) | `[CONTENT REQUIRED]` — may differ from the published addresses | OPEN 🔴 |
| 2.4 | Role of each phone number | Legacy page labels `+91 80 2318 2011` and `+91 93426 59932` as sales; `+91 80 2318 2011` and `+91 88671 38111` as support. The landline appears under both. | OPEN 🔴 |
| 2.5 | **WhatsApp business number** | `[CONTENT REQUIRED]` | OPEN 🔴 |
| 2.6 | Business hours | `[CONTENT REQUIRED]` — not published anywhere currently | OPEN 🟠 |
| 2.7 | Confirm registered address is unchanged | #215, "Shree Hari" Complex, 6th Block, 2nd Stage, Outer Ring Road, Nagarabhavi, Bangalore 560072 | OPEN 🔴 |
| 2.8 | CIN | `[CONTENT REQUIRED]` | OPEN 🟠 |
| 2.9 | GSTIN | `[CONTENT REQUIRED]` | OPEN 🟠 |
| 2.10 | Founding date — legacy About says December 2007 | Confirm | OPEN 🟠 |
| 2.11 | Social profile URLs — Facebook, Twitter/X, Instagram, YouTube, LinkedIn | Icons exist on the live site with **unverified destinations**. LinkedIn is absent and matters most for B2B. | OPEN 🟠 |
| 2.12 | Google Business Profile URL and map coordinates | `[CONTENT REQUIRED]` | OPEN 🟡 |
| 2.13 | Support response-time policy | `[CONTENT REQUIRED]` — **no response time will be published without written confirmation** (brief §9.7) | OPEN 🟠 |

---

## 3. Brand assets 🔴

| # | Item | Status |
|---|---|---|
| 3.1 | **Logo in vector format** (SVG / AI / EPS). Only a 610×78 PNG exists, and it contains a typo. The site currently renders a clean type-based wordmark via a single component (`src/components/layout/logo.tsx`) so the asset can be swapped in one place. | OPEN 🔴 |
| 3.2 | Logo variants: full colour, single-colour, reversed-for-dark, favicon/mark-only, square social avatar | OPEN 🔴 |
| 3.3 | Correct the "Alig**ini**ng" typo in the logo wordmark | OPEN 🟠 |
| 3.4 | Confirm brand amber. Sampled from the logo as `#E38700`; supply the official value if one is specified. | OPEN 🟠 |
| 3.5 | Any existing brand guideline document | OPEN 🟡 |

---

## 4. Partners and authorisations 🔴

No partner page is published until `verificationStatus === 'verified'` (CONTENT_STRATEGY §4.4). Legacy brand pages fall back to the solution page until then.

| # | Partner | Legacy evidence | Needed | Status |
|---|---|---|---|---|
| 4.1 | **ClearOne** | `/clearone/` page | Current relationship status + logo-usage permission | OPEN 🔴 |
| 4.2 | **Poly** | `/poly/` page | Status under HP ownership; is the relationship current? | OPEN 🔴 |
| 4.3 | **Zoom** | `/zoom/` page | Zoom is a platform, not a hardware supply relationship — clarify what the relationship is | OPEN 🔴 |
| 4.4 | **Lifesize** | `/lifesize/` page + 3 awards | **Recommendation: no partner page.** Icon hardware discontinued, brand commercially collapsed. Awards may still be shown on `/recognition` as historical. Confirm. | OPEN 🔴 |
| 4.5 | **Panasonic** | Star Performer Award 2014 | Current relationship? Or historical only? | OPEN 🟠 |
| 4.6 | **Online Instruments (India) Pvt Ltd** | Partner Program 2019 | Current status | OPEN 🟠 |
| 4.7 | **Complete current partner list** | — | The definitive list of manufacturers SAAN is currently authorised for, with tier/level where applicable. Likely includes display, LED, audio, control and UC brands not represented on the legacy site at all. | OPEN 🔴 |
| 4.8 | Logo files + written usage permission for each verified partner | — | Manufacturer logos must not be published without permission (brief §11) | OPEN 🔴 |
| 4.9 | Approved current product list per partner, with lifecycle status | — | Feeds the lifecycle-review workflow | OPEN 🟠 |

---

## 5. Awards, recognition and credentials 🟠

All six legacy items require re-verification and a scan of the certificate.

| # | Item | Recommendation | Status |
|---|---|---|---|
| 5.1 | Lifesize — APAC Partner Enablement Award 2017 | Keep. Strongest credential on the legacy site. Need certificate scan. | OPEN 🟠 |
| 5.2 | Lifesize — Partner Program 2015 | Keep, consolidated with 5.1 | OPEN 🟠 |
| 5.3 | Lifesize — Partner Program 2014 | Keep, consolidated | OPEN 🟠 |
| 5.4 | Online Instruments — Partner Program 2019 | Keep — most recent credential | OPEN 🟠 |
| 5.5 | Panasonic — Star Performer Award 2014 | Keep if certificate available | OPEN 🟠 |
| 5.6 | "Bharat Ratna JRD Tatanagar Residents Welfare Association Executive Committee 2010-12" | **Recommend removal** — a community/personal role, not a business credential. It weakens an otherwise credible page. | OPEN 🟠 |
| 5.7 | Unidentified IISc certificate image on `/awards/` | Identify or remove | OPEN 🟠 |
| 5.8 | **Any recognition from 2020–2026** | The newest legacy credential is 2019. A seven-year gap is conspicuous. | OPEN 🟠 |
| 5.9 | Company certifications — ISO, MSME/Udyam, GeM registration, OEM technical certifications held by engineers | Highly valuable for government and institutional buyers | OPEN 🟠 |

---

## 6. Projects and case studies 🔴

**The single largest gap in the project.** The legacy site contains zero photographs of actual SAAN installations — every image is a manufacturer render or stock interior.

| # | Item | Status |
|---|---|---|
| 6.1 | **Project photographs from completed installations** — see IMAGE_REQUIREMENTS.md | OPEN 🔴 |
| 6.2 | 6–10 projects with: customer type, industry, location, year, challenge, scope, technologies (by category), constraints, outcomes | OPEN 🔴 |
| 6.3 | **Written permission to name each customer.** Where absent, an accurate anonymous label ("Leading university in Karnataka"). | OPEN 🔴 |
| 6.4 | Customer logo usage permission, per customer | OPEN 🟠 |
| 6.5 | **Approved customer testimonials** with attribution and permission. `[CONTENT REQUIRED: Verified customer quotation]` — none exist today. The testimonials section renders nothing until at least one arrives. | OPEN 🟠 |
| 6.6 | Before/after image pairs for at least 2 projects | OPEN 🟡 |
| 6.7 | Any measurable outcome per project — rooms delivered, downtime reduced, timeline met | OPEN 🟠 |

**Interim position:** the gallery, filters, case-study template and content model all ship complete and working. Until real projects arrive they carry `status: 'placeholder'`, are visibly marked, `noindex`, and excluded from the sitemap. **No project will be fabricated.**

---

## 7. Team and organisation 🟡

| # | Item | Status |
|---|---|---|
| 7.1 | Leadership names, roles, short bios | OPEN 🟡 |
| 7.2 | Leadership photographs | OPEN 🟡 |
| 7.3 | Team size — **only if confirmed**; no headcount published otherwise | OPEN 🟡 |
| 7.4 | Engineering / field team photographs | OPEN 🟠 |
| 7.5 | Company history milestones since 2007 | OPEN 🟡 |
| 7.6 | Open roles — if none, the Careers link is omitted rather than pointing at an empty page | OPEN ⚪ |

---

## 8. Legal and compliance 🔴

| # | Item | Status |
|---|---|---|
| 8.1 | **Privacy policy content** — the current site has none. Required before any form collects personal data. Must cover: data collected, purpose, retention, third-party processors (email provider, analytics, hosting), and contact for data requests. | OPEN 🔴 |
| 8.2 | Data-protection contact / grievance officer (India DPDP Act) | OPEN 🔴 |
| 8.3 | Terms of use | OPEN 🟡 |
| 8.4 | Cookie/consent requirement — depends on the final analytics configuration | OPEN 🟠 |
| 8.5 | Consent-checkbox wording on both forms | OPEN 🔴 |

---

## 9. Technical / access 🔴

| # | Item | Status |
|---|---|---|
| 9.1 | **Google Search Console access** — needed to export top pages, queries and backlinks, and to validate the redirect map (REDIRECT_PLAN §7) | OPEN 🔴 |
| 9.2 | Existing Google Analytics property, if any | OPEN 🟠 |
| 9.3 | Analytics decision for the new site — GA4, Plausible, Umami, or none | OPEN 🟠 |
| 9.4 | Domain registrar access (for cutover only — no changes without approval) | OPEN 🔴 |
| 9.5 | **Current DNS export, including MX, SPF, DKIM and DMARC** — must be recorded before any change | OPEN 🔴 |
| 9.6 | Current hosting provider and control-panel access, for backup and rollback | OPEN 🔴 |
| 9.7 | Where email is hosted (same shared host, Google Workspace, Microsoft 365?) | OPEN 🔴 |
| 9.8 | Transactional email decision — Resend, or SMTP through the existing provider | OPEN 🟠 |
| 9.9 | Hosting decision for the new site — Vercel recommended | OPEN 🟠 |
| 9.10 | Handling of legacy `/wp-content/uploads/*` URLs — recommendation is 404 (REDIRECT_PLAN §4) | OPEN 🟡 |

---

## 10. Solution and service content 🟠

| # | Item | Status |
|---|---|---|
| 10.1 | Confirm all 8 solution areas are genuinely offered — particularly **Managed AV Services** and **Interactive Learning Spaces**, which have no legacy presence | OPEN 🔴 |
| 10.2 | Confirm all 7 industries are genuinely served | OPEN 🟠 |
| 10.3 | Confirm all 8 services are genuinely delivered in-house vs. subcontracted | OPEN 🟠 |
| 10.4 | What does the legacy `/wps/` page cover? Wireless presentation systems is inferred from the slug, not confirmed. | OPEN 🟡 |
| 10.5 | Actual AMC tiers and what each includes | OPEN 🟠 |
| 10.6 | Typical project duration by solution type — for the "what to expect" content | OPEN 🟡 |
| 10.7 | Does SAAN hold stock, or supply to order? | OPEN 🟡 |
| 10.8 | Brochures or datasheets for `/resources` downloads | OPEN 🟡 |

---

## 11. Blocking summary

**Cannot launch without:** 1.1, 1.2, 2.1, 2.2, 2.3, 2.5, 2.7, 3.1, 3.2, 4.1–4.4, 4.7, 4.8, 8.1, 8.2, 8.5, 9.1, 9.4, 9.5, 9.6, 9.7, 10.1

**Cannot be credible without:** 5.1–5.9, 6.1–6.3, 6.5

**Everything else** can follow launch through the CMS without a redeploy.

---

## 12. Suggested first request to SAAN

One consolidated ask, in priority order:

1. Sales email, support email, WhatsApp number, business hours *(the site currently publishes no email address at all)*
2. Are TMG / ITG / ECG still active business units?
3. Logo in vector format, with reversed and mark-only variants
4. Current partner list with authorisation status, and logo-usage permission
5. Photographs from 6–10 completed installations
6. Written permission to name customers — or approval of anonymous labels
7. Google Search Console and DNS access (read-only for now)
8. Preference: `saanpro.com` or `www.saanpro.com`
