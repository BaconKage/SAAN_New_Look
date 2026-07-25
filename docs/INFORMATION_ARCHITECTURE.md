# Information Architecture

**Governing principle:** the legacy site is organised by *what SAAN sells* (12 of 27 URLs are manufacturer/hardware categories). The new site is organised by *what the customer is trying to achieve*. Products appear only as evidence inside solutions, never as a top-level entry point.

---

## 1. Primary navigation

```
Solutions   Industries   Projects   Services   Partners   Resources   About   Contact
```

- **Primary header CTA:** `Plan Your Project` → `/plan-your-project`
- **Secondary actions** (header utility row + footer + sticky mobile bar): Call · WhatsApp · Email · Request Consultation
- All contact values read from `src/config/site.ts` — never hard-coded in a component.

### Header behaviour

| Breakpoint | Pattern |
|---|---|
| ≥1024px | Horizontal nav. `Solutions`, `Industries` and `Services` open a mega-panel on hover **and** on click/Enter (never hover-only — WCAG 2.2). Escape closes, focus returns to the trigger. |
| <1024px | Full-screen drawer, focus-trapped, `aria-expanded` on the trigger, body scroll locked, accordion sub-sections. |

The mega-panel for Solutions shows all 8 solutions with a one-line outcome each plus a "Not sure? Use the configurator" tile linking to `/plan-your-project`. It is not a bare link list.

---

## 2. Complete site tree

```
/                                        Homepage
│
├── /solutions                           Solutions index
│   ├── /solutions/meeting-and-collaboration-spaces
│   ├── /solutions/digital-signage
│   ├── /solutions/led-and-video-walls
│   ├── /solutions/professional-audio-and-auditoriums
│   ├── /solutions/interactive-learning-spaces
│   ├── /solutions/commercial-displays-and-projection
│   ├── /solutions/room-automation-and-control
│   └── /solutions/managed-av-services
│
├── /industries                          Industries index
│   ├── /industries/corporate
│   ├── /industries/education
│   ├── /industries/healthcare
│   ├── /industries/retail
│   ├── /industries/hospitality
│   ├── /industries/manufacturing
│   └── /industries/government-and-public-sector
│
├── /projects                            Filterable gallery
│   └── /projects/[slug]                 Case study
│
├── /services                            Services index (delivery lifecycle)
│   ├── /services/consultation-and-requirement-analysis
│   ├── /services/site-survey-and-system-design
│   ├── /services/supply-and-installation
│   ├── /services/integration-and-commissioning
│   ├── /services/training-and-handover
│   ├── /services/amc-and-preventive-maintenance
│   ├── /services/technical-support
│   └── /services/upgrades-and-lifecycle-management
│
├── /partners                            Verified partners only
│   └── /partners/[slug]
│
├── /resources                           Knowledge centre
│   └── /resources/[slug]                Article / guide / comparison
│
├── /about                               Company, approach, team
├── /recognition                         Awards, partner programmes, credentials
├── /support                             Existing-customer support request
├── /contact                             Contact details + general enquiry
├── /plan-your-project                   Requirement configurator + enquiry
├── /privacy                             Privacy policy
├── /terms                               Terms of use            [optional, low priority]
│
├── /sitemap.xml                         Generated
├── /robots.txt                          Generated
├── /404                                 not-found.tsx
└── /error                               error.tsx
```

**Total at launch:** 8 static + 8 solutions + 7 industries + 8 services = **31 fixed pages**, plus dynamic project, partner and resource entries.

---

## 3. Why `/plan-your-project` is its own URL

The configurator is the site's primary conversion mechanism. As a discrete URL it can be linked from email signatures, quoted in proposals, used as a paid-search landing page, and measured as a funnel. Embedding it only in a modal would make all of that impossible. `/contact` remains available for visitors who simply want to phone or email.

---

## 4. Page templates

### 4.1 Homepage (14 sections, in order)

| # | Section | Notes |
|---|---|---|
| 1 | Immersive hero | Server-rendered text; media enhances progressively. Static image fallback always. |
| 2 | Positioning statement | Single sentence, what SAAN does |
| 3 | Primary CTAs | Plan Your Project / Explore Our Solutions / View Installations |
| 4 | Credibility strip | Since 2007 · Bangalore · verified credentials. **Facts only.** |
| 5 | **Interactive solution explorer** | Client island. 9 requirement chips. |
| 6 | Industries served | 7 cards → industry pages |
| 7 | Featured projects | 3 cards → `/projects` |
| 8 | SAAN delivery process | Discover → Design → Deliver → Support, scroll-told |
| 9 | Why organisations choose SAAN | 4–6 substantiated reasons |
| 10 | Technology partners | Verified partners only; empty-state handled |
| 11 | Support & lifecycle | → `/services/amc-and-preventive-maintenance`, `/support` |
| 12 | Testimonials | Renders nothing until approved quotations exist |
| 13 | Knowledge resources | 3 latest → `/resources` |
| 14 | Final enquiry CTA | Dark section → `/plan-your-project` |

No auto-rotating carousel anywhere.

### 4.2 Solution page (12 blocks — mandatory on all 8)

1. Outcome-led hero
2. Customer challenges
3. What SAAN delivers
4. Key capabilities
5. Typical applications
6. Simplified system architecture (animated SVG, labelled illustrative)
7. SAAN implementation process
8. Related services
9. Related projects
10. Relevant partners
11. FAQs (genuine, visible — these back the FAQPage JSON-LD)
12. Consultation CTA

Enforced by the Zod schema: a solution record missing any block fails the build. See CONTENT_STRATEGY.md.

### 4.3 Industry page (7 blocks)

1. Industry challenges
2. Relevant solutions
3. Example environments
4. Operational benefits
5. Recommended delivery approach
6. Relevant projects
7. Consultation CTA

### 4.4 Service page

Purpose → what happens → what you receive → who is involved → typical duration → related solutions → FAQs → CTA.

### 4.5 Project case study

Per the content model in CONTENT_STRATEGY.md §4. Supports fully anonymous customers ("Leading university in Karnataka") when naming permission has not been granted.

### 4.6 Partner page

Published **only** when `verificationStatus === 'verified'`. Unverified partners are invisible sitewide — no card, no logo, no redirect target.

---

## 5. Cross-linking model

Every relationship is bidirectional and derived from the content graph, not hand-maintained.

```
Solution ─┬─ related services      (many-to-many)
          ├─ related industries    (many-to-many)
          ├─ related projects      (derived from project.solutions)
          ├─ related partners      (derived from partner.solutionCategories)
          └─ related resources     (derived from resource.solutions)

Industry ─┬─ relevant solutions
          └─ relevant projects     (derived from project.industry)

Project ──┬─ solutions, industry, services, partners
Partner ──┴─ solution categories, projects
```

Because reverse links are derived, adding one project automatically populates the related-projects rail on its solution page, its industry page and the homepage. No orphan pages, and internal linking stays dense without manual upkeep.

**Minimum internal links per page: 3.** Validated in the link test.

---

## 6. Breadcrumbs

Present on every page except the homepage. Rendered visually **and** as `BreadcrumbList` JSON-LD.

```
Home / Solutions / Digital Signage
Home / Industries / Education
Home / Projects / <project title>
```

---

## 7. Footer

Four columns + legal bar:

1. **Solutions** — all 8
2. **Industries** — all 7
3. **Company** — About · Recognition · Projects · Partners · Resources · Careers*
4. **Contact** — address, phones, emails, WhatsApp, hours, social

Legal bar: legal name, CIN/GSTIN, © current year (computed, never hard-coded — the legacy site froze at 2020), Privacy, Terms, sitemap link.

\* Careers omitted at launch unless roles exist. A "Careers" link to an empty page damages credibility.

---

## 8. Contact route map

| Visitor intent | Route | Destination |
|---|---|---|
| Has a project | `/plan-your-project` | Sales |
| Wants to talk now | Header phone / WhatsApp | Sales |
| General question | `/contact` | Sales |
| Existing customer, system fault | `/support` | Support |
| Wants documentation | `/resources` | Self-serve |

Sales and support enquiries use **separate forms, separate schemas, separate API routes and separate destination addresses** so a broken projector never lands in the sales inbox.

---

## 9. URL conventions

- Lowercase, hyphenated, no trailing slash, no dates, no IDs
- Descriptive over short: `/solutions/room-automation-and-control`, not `/automation/`
- No opaque acronyms (the legacy `/wps/` is retired)
- Slugs are content-controlled but validated against `/^[a-z0-9]+(?:-[a-z0-9]+)*$/` and checked for collisions at build time

---

## 10. Deliberate omissions

| Not building | Reason |
|---|---|
| Product catalogue / model pages | The brief is explicit: sell solution capability, not model numbers. Products live inside solutions as evidence. |
| Manufacturer brand pages outside `/partners` | Legacy `/lifesize/`, `/poly/`, `/zoom/` reproduced vendor marketing. Replaced by verified partner records. |
| Search | 31 pages does not warrant it. Revisit past ~80 pages. |
| Blog with dated archives | `/resources` is evergreen and topic-organised. Dated posts age visibly; a 2020-stamped article is what makes the current site look abandoned. |
| Client login / portal | Out of scope. |
| Multi-language | Out of scope. `lang="en-IN"` set correctly so it can be added later. |
