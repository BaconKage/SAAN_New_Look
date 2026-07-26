# Visual Review

**Phase:** 3A · **Date:** 2026-07-26
**Method:** production build served locally, then full-page screenshots at 1440×1000, 1024×768, 768×1024, 390×844 and 320×700, plus the interaction states that only exist at runtime.
**Screenshots:** `artifacts/visual-review/` — 90 files, regenerate with `npm run capture:visuals`.

The question this review asks is not "does it render?" but **"would a CIO believe this company can deliver a forty-room programme?"** The first pass said no. This document records why, and what changed.

---

## 1. The first pass: what was actually wrong

The build passed every test in Phase 2 and still looked like a template. Five problems, in order of severity.

### 1.1 Five near-identical card grids stacked vertically

The homepage was: hero → 8 bordered cards → explorer → 7 bordered cards → 4 bordered cards → 3 bordered cards → 4 bordered cards → CTA. Every section had the same visual weight, the same border, the same radius. Nothing told the eye where to land, and by the fourth grid a reader has stopped distinguishing sections.

This is the single clearest tell of a generated site, and it was the dominant impression at 1440px.

### 1.2 The homepage was 10,628px tall and 20,192px on mobile

Twenty-four phone screens of stacked cards. Low information density per screen, no rhythm, and the most important thing on the page — that SAAN designs systems — was never stated visually.

### 1.3 Zero technical evidence anywhere

For an AV systems integrator, this was the biggest miss. No diagrams, no signal paths, no architectural drawing language, nothing that demonstrated the company understands system design rather than product supply. The hero was well-set type on a dark field, which could have been any consultancy.

### 1.4 `[CONTENT REQUIRED]` markers rendered on public pages

Amber warning panels in the projects section, the partners section and the footer of every page. Visible to any visitor. The projects section additionally rendered grey skeleton boxes, which read as a broken page rather than an unfinished one.

### 1.5 Solution pages were four thin blocks, three of them shared

`/solutions/digital-signage` had: a four-item bullet list, the same four-stage process block as every other solution, three related-solution cards, and a CTA. The only page-specific content was four bullets and a heading. Nothing on the page demonstrated expertise in digital signage specifically.

---

## 2. Page-by-page assessment

Scored after the Phase 3A work. Where a judgement is unfavourable it is stated.

### Homepage

| | |
|---|---|
| **First impression** | Reads as an engineering company within about two seconds. The system graphic beside the headline does the work that a stock photograph usually fails to do. |
| **Brand strength** | Strong. The amber accent is used sparingly enough that it always means something — a live display in the graphic, a signal path, one CTA. |
| **Visual hierarchy** | Now genuine. Two feature panels carry weight; six index rows recede; the evaluation band is a flat technical field with no cards at all. |
| **Typography** | Display-1 at 1440px is confident without shouting. The mono eyebrows and tabular numerals carry most of the technical character. |
| **Section rhythm** | Alternates: dark hero → white feature/index → tinted flat band → white interactive → tinted index → dark process → white split → tinted statement → dark CTA. No two consecutive sections share a layout type. |
| **Spacing** | Generous but no longer empty. Height fell from 10,628px to ~9,900px while the page gained a whole section and considerably more content. |
| **Content density** | Substantially improved. The evaluation band alone puts eight concrete technical criteria above the fold-and-a-half. |
| **CTA clarity** | "Plan Your Project" appears in the header, hero, explorer and final band. One accent-filled CTA per viewport, as the design system requires. |
| **Image treatment** | No photographs at all, deliberately. Nothing is faked. The composition carries the page instead. |
| **Mobile behaviour** | The system graphic is hidden below `md` — it would compete with the headline for the first screen. Everything else reflows to a single column with the index lists intact. |
| **Interaction quality** | Explorer is a real ARIA tabs widget with arrow-key support. Hover states are keyline and background shifts, not movement. |
| **Technical credibility** | This is the biggest gain. "What we look at before recommending anything" names viewing distance, ambient light, noise floor, platform licensing, network readiness and service access in plain language. |
| **Generic or distinctive?** | Distinctive. The amber-and-ink palette, the drafting-grid graphic and the index-over-cards treatment are not template defaults. |
| **Does the visitor understand SAAN's role?** | Yes — designs, integrates, supports; consultation through lifecycle; recommends rather than sells. |
| **Reason to make contact?** | Yes. The explorer and the evaluation band both imply a conversation worth having. |

### Solutions landing

Feature-and-index treatment reused from the homepage, so the page has hierarchy rather than a uniform 3×3. Cards carry an outcome line in amber above the summary, which makes the page scannable by benefit rather than by product name. **Weakness:** at 489 words it is the lightest of the index pages; it depends on the eight detail pages to carry the argument.

### Meeting and Collaboration Spaces · Digital Signage · LED and Video Walls · Professional Audio

All four now follow the consultation structure — ten blocks, nine of them page-specific — but do not share a visual layout:

- **Problems** — numbered editorial list, no cards, generous line length
- **What we evaluate** — full-width dark band, three columns, hairline rules
- **Scope + architecture** — split, with the inline SVG diagram at roughly half the page width
- **Applications** — four-up hairline grid
- **Delivery + lifecycle** — two-column split, different rhythm again
- **FAQs** — native `<details>` disclosure, no JavaScript
- **Related** — chips for sectors, a plain list for other solutions
- **CTA** — dark band with a solution-specific headline

**First impression:** these read as written by someone who has installed these systems. The digital-signage page opens "Signage fails quietly. Nobody files a ticket because a screen is showing last month's campaign." That is not template copy.

**Technical credibility:** high. Pixel pitch against viewing distance, reverberation versus loudness, duty cycle and panel grade, structural and heat load — all in plain language, no model numbers.

**Content density:** ~1,050 words per page, up from ~330.

**Weakness:** the architecture diagrams are schematic by necessity. They are captioned as illustrative, but a technical buyer will want a real drawing at proposal stage — that is the correct place for it.

### Industries landing · Corporate · Education

The landing page is an index rather than a card grid, which is right: sectors are a filter, not a product.

The detail pages were the worst offenders before this phase — seven pages carrying the same six solution cards. They are now genuinely differentiated. Education leads on fixed vacation windows and abandoned panels; healthcare on infection control and live clinical operations; hospitality on the events diary.

**Reason to make contact?** Yes, and the CTAs are sector-specific: "Tell us your room count and your vacation windows" asks for exactly what an education buyer knows.

**Weakness:** at ~344 words the industry pages are lighter than the solution pages. Acceptable — they are a routing layer — but they will benefit most from real project evidence.

### Services landing and detail

The landing page uses a numbered two-column grid that reads as a sequence rather than a menu, which suits eight ordered stages.

Detail pages were the thinnest content on the site at 115 words. They now carry who is involved, typical duration and what makes the stage go well — the last of which is genuinely useful and almost nobody publishes it.

**Weakness:** still the lightest template at ~170 words. They are honest and useful, but they are a supporting layer, not a destination.

### About

The strongest writing on the site. The heritage framing — "our roots in test, measurement, enterprise IT and electronic technologies created the engineering discipline that now informs how we design, integrate, commission and support professional AV systems" — turns the positioning conflict into a differentiator.

The leadership section, previously an empty panel with a warning marker, is now a genuine statement about how the company is staffed, with one quiet line noting that team profiles are being prepared.

### Contact

Reduced to what is actually confirmed: one telephone number, WhatsApp, the registered office. No empty labelled rows, no placeholder email. The right-hand column routes to the project form and to support.

**Weakness:** without an email address this page is thinner than it should be, and that is a content gap rather than a design one.

### Support

Restructured around what happens after a request is sent — a four-step numbered sequence — because the response-time policy is unconfirmed and publishing a guess would be worse than publishing nothing. The "Response times" panel that previously held a warning marker is gone.

### Plan Your Project

The nine configurator questions are listed as a numbered grid so a visitor can see what will be asked before the form exists. Honest about being in preparation without looking unfinished.

### Projects · Partners · Recognition

All three previously rendered a large amber warning panel. All three now carry a genuine editorial statement:

- **Projects** — "Selected project stories are being prepared for publication", with what each case study will cover, and the reason nothing is invented
- **Partners** — the vendor-neutral position, plus an explicit "what we will not do" list
- **Recognition** — an explanation that credentials are being re-verified against certificates rather than reprinted from an older site

These read as deliberate rather than incomplete, which was the goal.

---

## 3. Generic-template characteristics: before and after

| Characteristic | Before | After |
|---|---|---|
| Repetitive three-column card grids | 5 stacked grids | 1 feature pair + index lists + hairline grids |
| Excessive rounded cards | Everywhere | Restrained; index and band layouts use rules, not cards |
| Identical section layouts | Yes | No two consecutive sections share a layout type |
| Too much empty space | Yes — large blank stretches | Density raised; page shortened despite more content |
| Generic icon-and-heading blocks | Yes | Icons retained only where they aid scanning |
| Repeated gradient backgrounds | None (avoided from the start) | None |
| Excessive centre alignment | Minimal | Left-aligned throughout except one section header |
| Weak or undersized headings | No | Display-1 hero, h2 on feature panels |
| Long pages with no visual change | Yes | Alternating light/dark/tinted, four distinct layout types |
| Sections that look interchangeable | Yes | Addressed |
| Repeated CTA wording | Yes — same CTA on every detail page | Per-solution and per-industry CTA headlines |
| Generic stock-technology copy | Some | Replaced with specifics |
| Insufficient visual evidence | Severe | System diagrams on 8 solution pages + hero graphic |
| Pages generated from the same template | Yes | See CONTENT_REPETITION_AUDIT.md |

---

## 4. Motion review

| Motion | Purpose | Verdict |
|---|---|---|
| Signal-path trace on diagrams | Shows the direction of signal flow — information a static diagram cannot carry | **Keep.** The only motion on the site that is genuinely informative. |
| Scroll reveal on cards and process stages | Draws attention as a section enters | **Keep, restrained.** 12px translate, 320ms, one step per item. |
| Hover on cards and index rows | Confirms the target is interactive | **Keep.** Colour and keyline only, no movement. |
| Mega-panel and drawer | Confirms state change | **Keep.** |
| Button press | Tactile confirmation | **Keep.** 1.5% scale. |
| Parallax | — | **Never added.** |
| Decorative background animation | — | **Never added.** |

Reduced motion is honoured throughout, and the hidden initial state for reveals lives inside a `prefers-reduced-motion: no-preference` query, so content is never left invisible waiting for an animation that will not run. Covered by `reveal.motion.spec.ts`.

---

## 5. Visual quality gates

All checks from the Phase 3A brief §14, now enforced as tests in `src/tests/e2e/visual-gates.spec.ts`.

| Gate | Status |
|---|---|
| No horizontal overflow at 320px | ✅ tested at 320, 390 and 768 across 16 pages |
| No text clipping | ✅ buttons use `min-h` and wrap rather than `whitespace-nowrap` |
| No CTA hidden below overlays | ✅ |
| No content obscured by the sticky header | ✅ `scroll-padding-top` asserted to exceed header height |
| No duplicate visible navigation | ✅ asserted at desktop and mobile widths |
| No headings stranded at the bottom of a viewport | ✅ manual review of 90 screenshots |
| No low-contrast secondary copy | ✅ axe clean on 19 page states, plus the token contrast unit test |
| No placeholder markers in preview mode | ✅ asserted across 16 pages |
| No unverified partner or customer claims | ✅ nothing published without verification |
| No page that appears empty | ✅ minimum 120 words of body content per page, asserted |
| No major layout repeated excessively | ✅ see §3 |
| No obvious template appearance | ✅ judged against the screenshots |

Two defects were found by these gates during the phase and fixed: a 27px horizontal overflow on `/support` caused by `whitespace-nowrap` on a long button label in a narrow column, and an invalid `<dl>` structure in the FAQ accordion that axe correctly reported as broken list semantics.

---

## 6. Honest remaining weaknesses

1. **No photography.** The site is carried entirely by typography, layout and diagrams. That is a defensible position while nothing real exists, and it is better than stock imagery — but a page of genuine installation photographs would do more for credibility than any further design work. This is the highest-value thing SAAN can supply.
2. **No project evidence.** Every page routes toward a conversation, and none can point at completed work. The templates are built and waiting.
3. **Service pages remain the lightest template** at ~170 words. Adequate for a supporting layer.
4. **The industry pages depend on the solution pages.** Deliberate — it is what removed the repetition — but it means an industry page alone does less selling than a solution page.
5. **No email address anywhere.** A visitor who prefers to write cannot. This is the single most damaging content gap.

---

## 7. Screenshot index

`artifacts/visual-review/` — 90 files.

**Per page, at `-1440`, `-1024`, `-768`, `-390`, `-320`:**
`homepage` · `solutions` · `meeting-and-collaboration-spaces` · `digital-signage` · `led-and-video-walls` · `professional-audio-and-auditoriums` · `industries` · `industry-corporate` · `industry-education` · `services` · `service-consultation` · `about` · `contact` · `support` · `plan-your-project` · `projects` · `partners`

**Interaction states:**
`mobile-navigation-390.png` · `mega-panel-solutions-1440.png` · `explorer-a-modern-meeting-room-1440.png` · `explorer-an-auditorium-1440.png` · `explorer-support-or-an-upgrade-1440.png`
