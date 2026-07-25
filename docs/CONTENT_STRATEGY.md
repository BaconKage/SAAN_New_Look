# Content Strategy

**Voice:** the experienced systems integrator who has already walked the site, asked the awkward questions and knows what goes wrong. Confident because it is specific — never because it is loud.

**Language:** polished Indian English. `en-IN`. "Organisation", "recognised", "programme", "customise". Indian numbering only where natural to the reader; no lakh/crore in technical copy.

---

## 1. Rules

### Always
- Active voice. "SAAN designs the system", not "the system is designed by SAAN".
- Lead with the customer's problem, close with their outcome.
- Concrete deliverables — "a signed-off system design, a rack elevation and a cable schedule" beats "professional design services".
- Short paragraphs (2–4 sentences). Sentences average under 22 words.
- Sentence case for all headings. No Title Case, no Random Capitalisation.
- One idea per section; a scannable heading that carries meaning on its own.
- Name the trade-off. Saying when something is *not* the right choice is the strongest credibility signal available.

### Never
- Superlatives: "India's number one", "best in India", "market leader", "world-class", "100% satisfaction", "cutting-edge", "state-of-the-art", "one-stop shop", "unparalleled".
- Unverified numbers of any kind — installations, customers, years, engineers, cities.
- Response-time promises unless supplied as confirmed policy.
- Manufacturer brochure copy, paraphrased or otherwise.
- Specification tables without an explanation of why the spec matters.
- Empty connective filler: "In today's fast-paced world…", "We understand that…", "Leveraging synergies…".
- Em-dash-heavy, listicle-shaped AI cadence. Vary sentence length deliberately.

### The superlative substitution

Where the legacy site would have claimed superiority, the new site substitutes evidence:

| Instead of | Write |
|---|---|
| "We are the best AV integrator" | "Operating from Bangalore since 2007." |
| "World-class quality" | "Every installation is commissioned against a signed test plan before handover." |
| "Trusted by Fortune 500 companies" | *(Remove until a named, permissioned reference exists)* |
| "Unmatched support" | "Preventive maintenance visits are scheduled, not reactive." |

---

## 2. Message hierarchy

**Brand promise:** *The right solution. Professionally delivered. Reliably supported.*

**Positioning statement:** SAAN designs, integrates and supports professional AV, digital-signage, meeting-room, display, projection, audio, video-wall and room-control systems for enterprises and institutions.

**Supporting messages** (rotate by context, never all at once):
Technology spaces that work · Every room. Every screen. Every interaction. · Designed around your requirement. · Complete solutions, not disconnected products. · From consultation to commissioning and support. · Reliable technology for important spaces.

**The seven proof points**, each of which must be demonstrated somewhere on the site, not merely asserted:

1. SAAN designs complete solutions rather than selling products → the entire IA is solution-led; there is no product catalogue.
2. SAAN studies each requirement → the configurator and `/services/consultation-and-requirement-analysis`.
3. SAAN recommends what fits, not a fixed brand → the comparison modules, which openly say when a cheaper or different option is right.
4. SAAN handles the full lifecycle → eight service pages covering consultation through lifecycle management.
5. SAAN is committed to quality and long-term success → AMC, preventive maintenance, training and handover as first-class pages.
6. SAAN has breadth across AV disciplines → eight solution areas.
7. SAAN is credible for institutions → seven industry pages, `/recognition`, and case studies.

---

## 3. Homepage copy direction

**H1:** *Technology spaces that work — every room, every screen, every time.*

**Sub:** SAAN designs, integrates and supports professional AV, meeting-room, digital-signage and display systems for enterprises and institutions. From consultation and system design to installation, training and long-term support, we deliver complete solutions built around your requirement.

**CTAs:** `Plan Your Project` (accent) · `Explore Our Solutions` (secondary) · `View Installations` (link)

The hero answers the three five-second questions: *what* (line 1 + sub), *for whom* (sub), *what next* (CTAs).

**Credibility strip — facts only, no claims.** Provisional: "Operating from Bangalore since 2007" · "Consultation to commissioning and support" · "Recognised by Lifesize, Panasonic and Online Instruments" *(pending re-verification)*. If a fact cannot be verified it is removed, not softened.

---

## 4. Content models

Every model is a Zod schema in `src/content/schemas/`. The schema is the contract for both the local content layer and the CMS, so validation cannot diverge between them. **A record that fails its schema fails the production build.**

### 4.1 Solution

```
slug, title, metaTitle, metaDescription, ogImage
heroHeadline (outcome-led), heroSubcopy, heroImage
challenges[]           min 3   { title, description }
delivers[]             min 4   { title, description }
capabilities[]         min 5   { title, description, icon }
applications[]         min 4   { environment, description }
architecture                   { nodes[], connections[], caption, disclaimer }
process[]              exactly 4  Discover / Design / Deliver / Support
relatedServices[]      min 2   → service slugs
relatedIndustries[]    min 2   → industry slugs
relatedProjects[]              derived from project.solutions
relatedPartners[]              derived, verified partners only
faqs[]                 min 4   { question, answer }   ← backs FAQPage JSON-LD
cta                            { headline, body, buttonLabel }
```

Minimums are enforced. They exist so no solution page can ship thin — the exact failure mode of the legacy `/boardroom/` page, which shipped with one sentence.

### 4.2 Industry

```
slug, title, meta*, heroHeadline, heroSubcopy, heroImage
challenges[]      min 3
relevantSolutions[] min 3   → solution slugs
environments[]    min 4     { name, description }
benefits[]        min 3     operational, not marketing
deliveryApproach            { summary, considerations[] }
relatedProjects[]           derived
faqs[]            min 3
cta
```

### 4.3 Project (case study)

```
slug, title
customer          { name?, anonymousLabel?, logo?, permissionStatus }
industry, location, year, roomTypes[], solutions[], services[]
challenge, scope[], solutionDesign, installationProcess
technologies[]    { category, description }   ← categories, not model numbers
constraints[]     what made it difficult and how it was handled
trainingHandover, supportArrangement
outcomes[]        min 2   { outcome, detail }
testimonial?      { quote, attribution, permissionStatus }
gallery[]         { image, caption, type: before|after|process|final|detail }
relatedSolutions[], relatedPartners[]
status            draft | placeholder | published
```

**Anonymity.** `customer.name` is optional. When permission is absent, `anonymousLabel` carries a truthful descriptor — "Leading university in Karnataka", "Multi-speciality hospital, Bengaluru". Rendering logic: publish the name only when `permissionStatus === 'granted'`; otherwise render `anonymousLabel`; if neither exists the record cannot be `published`.

**Placeholder projects.** `status: 'placeholder'` renders a visibly labelled template card reading `[CONTENT REQUIRED: Verified project details]`. It is excluded from the sitemap, carries `noindex`, and is never dressed as a real project. **Fabricating a case study is out of the question.**

### 4.4 Partner

```
slug, name, logo, logoInverse
relationshipStatus   authorised | reseller | technology | historical
solutionCategories[]
description          SAAN's words, not the manufacturer's
officialWebsite
approvedProducts[]   { name, category, lifecycleStatus, lastReviewed }
lastLifecycleReview  date
verificationStatus   unverified | pending | verified | lapsed
verifiedOn, verifiedBy
```

**Publication gate:** a partner is visible sitewide only when `verificationStatus === 'verified'`. Unverified partners produce no page, no logo, no card, and their conditional legacy redirect falls back to the solution page (see REDIRECT_PLAN.md §3).

**Lifecycle review workflow:** `lastLifecycleReview` older than 12 months raises a build **warning** listing every stale partner. A product whose `lifecycleStatus` is `discontinued` is hidden automatically. This is the mechanism that prevents a repeat of the legacy `/lifesize/` page — discontinued hardware presented as current for six years.

`relationshipStatus: 'historical'` exists so a past award can be shown on `/recognition` without implying a current authorisation.

### 4.5 Resource

```
slug, title, type: guide|comparison|explainer|checklist|brochure
summary, body (portable text / MDX), readingTime
relatedSolutions[], relatedIndustries[]
downloadAsset?  { file, sizeBytes, requiresForm: boolean }
author, reviewedOn
```

Evergreen. `reviewedOn`, not `publishedOn` — no visible dates to go stale.

### 4.6 Site settings (singleton)

Legal name · display name · address · phones (main/sales/support) · sales email · support email · WhatsApp · social links · business hours · registration details · analytics IDs · default OG image · founding year.

Mirrors `src/config/site.ts`. **No contact value is written into a component.** The legacy site repeated its address three times per page in hand-typed markup — which is how "SoIutions" ended up on every page.

---

## 5. Placeholder convention

Unverified content uses a single, greppable marker:

```
[CONTENT REQUIRED: Verified customer quotation]
[CONTENT REQUIRED: Approved project photographs]
[CONTENT REQUIRED: Current partner status]
[CONTENT REQUIRED: Confirmed sales email]
```

Rules: rendered visibly in a distinct amber-tinted style during development · never in `<title>`, meta description or structured data · any page containing one is excluded from the sitemap and marked `noindex` · a build script greps for the marker and prints a manifest · **the production launch build fails if any marker remains**. Every marker has a matching row in CONTENT_TODO.md.

---

## 6. Handling the positioning conflict

The legacy `/about-us/` describes a test-&-measurement, IT-infrastructure and electronic-components business (TMG / ITG / ECG). The brief describes an AV integrator. Until this is resolved (CONTENT_TODO §1, item 1), `/about` is written on the assumption that **AV and integration is the business today**, with the earlier work referenced as origin rather than current offering — for example: "SAAN began in 2007 in enterprise technology and test infrastructure. That engineering background is why our AV systems are designed, documented and commissioned like infrastructure."

This turns the conflict into a differentiator rather than pretending it does not exist. It is reversible in one file if the units are still active.

---

## 7. FAQ policy

FAQs are genuine, visible, and answer questions buyers actually ask — "Can we keep our existing displays?", "What happens if the room is not ready on the installation date?", "Who owns the CMS licence after handover?". They are not keyword bait. Only visible FAQs are marked up as `FAQPage` (SEO_PLAN.md §5).

---

## 8. Microcopy

| Context | Copy |
|---|---|
| Form submit | `Send enquiry` / submitting: `Sending…` |
| Success | `Enquiry received. Your reference is SAAN-P-2K4F7. We will be in touch.` |
| Error | `That did not send. Please try again, or call +91 93426 59932.` |
| Field error | `Enter a work email address so we can reply.` |
| Configurator | `About your space` (step) · `Recommend a solution` (final) |
| Empty filter | `No projects match those filters yet. Clear filters, or tell us what you are planning.` |
| Configurator disclaimer | `This is a starting point, not a final design. Every system we deliver is specified after a site assessment.` |

---

## 9. Copy review checklist

Before any page is marked done: unique H1 · no superlatives · no unverified numbers · active voice · every claim traceable to a verifiable fact or a `[CONTENT REQUIRED]` marker · sentence-case headings · body ≥17px · ≥3 internal links · meta title ≤60 and description ≤155 characters · every image has meaningful or deliberately empty `alt` · spell-checked in `en-IN` · read aloud once.
