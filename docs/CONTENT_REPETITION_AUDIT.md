# Content Repetition Audit

**Phase:** 3A · **Date:** 2026-07-26
**Method:** `npm run audit:repetition` — fetches all 35 rendered pages, strips the shared header and footer, splits body text into sentences of eight words or more, and reports any sentence appearing on three or more pages.

**Why rendered output rather than the content files:** the worst repetition was not in the data at all. It was hard-coded into shared page templates, so a source-level search would have missed it entirely.

---

## 1. Result

| | Before | After |
|---|---|---|
| Sentences repeated on 3+ pages | **40** | **9** |
| Of those, unintentional | **40** | **0** |
| Solution pages carrying identical body copy | 8 of 8 | 0 |
| Industry pages carrying identical body copy | 7 of 7 | 0 |
| Service pages carrying identical body copy | 8 of 8 | 0 |

`npm run audit:repetition -- --strict` now exits zero. The nine remaining repeats are classified as intentional in the script itself, with a stated reason each, so a genuinely new repetition stands out immediately rather than being lost in known noise.

---

## 2. Repeated paragraphs found

### 2.1 Solution pages — the same closing paragraph on all eight

> "Every system is specified after a site assessment. We look at the room, the way it is used and what you already own before we recommend anything — and we will tell you when the simpler option is the right one."

Hard-coded in `src/app/solutions/[slug]/page.tsx`. Appeared identically on all eight solution pages.

**Fixed:** removed. Each solution now carries its own `deliveryNote`, `intro`, `lifecycle` and FAQ content in `src/content/data/solution-details.ts`.

### 2.2 Solution pages — the same four-stage process block on all eight

The "Four stages, on every project" section, with the same four stage descriptions, rendered on every solution page and again on `/about`.

**Fixed:** removed from solution pages. Replaced by a per-solution *delivery considerations* block — what that specific kind of project demands. The generic four stages now appear once, on the homepage, and once on `/about`.

### 2.3 Solution pages — the same section intro on all eight

> "None of these are unusual. Recognising them early is what keeps them out of the finished system."

**Fixed:** removed. The numbered problem list carries the point without narration.

### 2.4 Industry pages — six full solution cards on all seven

The single largest source. Each industry page rendered six complete `SolutionCard` components, putting every solution's summary and highlight list on eight pages at once. Twelve distinct sentences were duplicated this way.

**Fixed:** industry pages now render a filtered index of **links** — a genuine per-sector subset from `relevantSolutions`, title and outcome only. The solution copy lives on the solution pages, where it belongs.

### 2.5 Industry pages — identical lead and CTA on all seven

> "Most projects combine several of these. We design them as one system rather than as separate installations."
> "Tell us what the space has to do and what has not worked before. That is where a good system starts."

**Fixed:** each industry now has its own `intro`, `ctaHeadline` and `ctaBody` in `src/content/data/industry-details.ts`. Education asks for vacation windows; retail asks how often the message changes; government asks what the specification has to satisfy.

### 2.6 Service pages — two identical paragraphs on all eight

> "Each of these is something you can hold, review and hand to somebody else. That matters most when the people who inherit the system are not the people who bought it."
> "This is stage N of our 8-stage delivery process. We can pick it up at any point — including on systems somebody else installed."

**Fixed:** replaced by per-service `deliverableNote` and `positionNote` fields.

### 2.7 Service pages — all seven other services listed on every page

Each service page listed the seven others with their outcome lines, duplicating eight sentences across seven pages.

**Fixed:** replaced with the **adjacent** stages only — the one before and the one after. More useful navigation ("what happens next?") and no repetition.

---

## 3. Generic sections removed or reworked

| Section | Problem | Change |
|---|---|---|
| Homepage solutions | Eight identical bordered cards | Two feature panels plus a six-item index. Hierarchy, and roughly a third less height. |
| Homepage industries | Seven identical cards immediately after eight solution cards | Compact architectural index with icon, outcome and environments inline |
| Homepage projects | Grey skeleton cards plus a large amber warning panel | Section removed until real projects exist; a single quiet line sits below the support content instead |
| Homepage partners | Amber `[CONTENT REQUIRED]` panel | Vendor-neutral positioning statement, which is the honest message anyway |
| Solution pages | Four blocks, mostly shared | Ten blocks, nine of them solution-specific |
| Service pages | 115 words at their thinnest | Who is involved, typical duration and what makes the stage go well |

---

## 4. Pages that needed the strongest differentiation

Ranked by how interchangeable they were before the work:

1. **The seven industry pages** — near-identical. Now differentiated by genuinely sector-specific constraints: fixed vacation windows (education), infection control and live clinical operations (healthcare), the events diary (hospitality), permits and shutdown windows (manufacturing), tenderable specifications (government).
2. **The eight solution pages** — identical structure, four thin blocks. Now each carries its own problems, evaluation criteria, system architecture diagram, applications, delivery constraints, lifecycle notes and four FAQs.
3. **The eight service pages** — the thinnest content on the site. Now carry stage-specific notes, who is involved, typical duration and preparation guidance.

---

## 5. Repetition that is deliberate

Nine sentences still repeat, each classified in `scripts/audit-repetition.ts` with a reason.

| Repeated text | Pages | Why it stays |
|---|---|---|
| "Every room is different. SAAN studies the space, the way people work in it, the platforms you use, the acoustics, the lighting, the network readiness and the long-term support needs before recommending a final system." | 8 | The positioning statement specified in the Phase 3A brief. It should read identically everywhere — that is the point of a positioning statement. |
| "Illustrative system overview — the final design follows a site assessment." | 8 | A disclaimer attached to every system diagram. Rewording it per page would weaken it and risk one variant being less clear. |
| Solution titles and outcome lines used as cross-links | 3–5 each | Navigation labels, not body copy. A link should say the same thing wherever it appears. |

**The distinction matters.** An audit that reports the same nine known items on every run is an audit people stop reading. Classifying them keeps the strict mode meaningful: it now fails only on repetition nobody has justified.

---

## 6. Verification

```bash
npm run audit:repetition            # report
npm run audit:repetition -- --strict  # fails on unexplained repetition
```

Current output:

```
Checked 35 pages for sentences repeated on 3 or more.

✓ No unexpected cross-page repetition.

Intentional repetition (9): …
```

Content minimums are also enforced structurally. `solutionDetailSchema` requires at least three challenges, four evaluation criteria, three applications, two lifecycle notes and three FAQs; `industryDetailSchema` requires three challenges, three benefits and three delivery considerations. A page cannot be padded back out with a template without failing `npm run validate:content`.
