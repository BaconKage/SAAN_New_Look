# Design System

**Derivation:** the palette is extracted from the existing SAAN logo, not invented. Pixel-frequency analysis of `logo.png` (610×78) returned `#E38700` as the dominant non-white colour (3,348 px) with `#000000` secondary (889 px).

**Strategic consequence:** SAAN's brand colour is amber. This is unusual in enterprise AV — where the default is blue — and it lets the site avoid the generic blue-purple technology gradient the brief explicitly rejects, without inventing anything.

**Design thesis:** premium comes from *restraint and precision* — keylines, generous space, exact alignment, disciplined typography — not from shadows, glows or gradients. Amber is used sparingly enough that it always means something.

---

## 1. Colour

### 1.1 Amber (brand accent)

Scale built around the extracted `#E38700` at step 500.

| Token | Hex | Use |
|---|---|---|
| `--amber-50` | `#FFF8EB` | Tinted section backgrounds |
| `--amber-100` | `#FEEFC7` | Subtle fills, hover backgrounds |
| `--amber-200` | `#FDDD8A` | Borders on tinted surfaces |
| `--amber-300` | `#FBC44D` | Diagram accents |
| `--amber-400` | `#F9A824` | **Amber text/icons on dark** (9.1:1 on ink-900) |
| `--amber-500` | `#E38700` | **Brand colour.** Fills, keylines, marks. Never text; never a focus ring (2.72:1 on white) |
| `--amber-600` | `#C06E00` | **Focus ring on light** (3.83:1); hover state for amber fills |
| `--amber-700` | `#9A5308` | **Amber text on white** (5.6:1) |
| `--amber-800` | `#7E420E` | Pressed states |
| `--amber-900` | `#6B370F` | Deep accent |

### 1.2 Ink (warm neutral)

Slightly warm-tinted rather than pure grey, so it sits with amber instead of fighting it.

| Token | Hex | Use |
|---|---|---|
| `--ink-0` | `#FFFFFF` | Page background |
| `--ink-25` | `#FBFAF9` | Alternate section background |
| `--ink-50` | `#F6F5F3` | Cards on white |
| `--ink-100` | `#ECEAE7` | Hairline borders |
| `--ink-200` | `#DCD9D4` | Borders, dividers |
| `--ink-300` | `#BFBAB3` | Disabled text/borders |
| `--ink-400` | `#948D84` | 4.0:1 on white — icons and borders only on light surfaces. Valid as **text only on ink-950** (7.4:1) |
| `--ink-500` | `#6E675F` | **Muted body text** (5.5:1 on white) |
| `--ink-600` | `#55504A` | Secondary text (8.0:1) |
| `--ink-700` | `#403C37` | Strong body text |
| `--ink-800` | `#2A2724` | Headings |
| `--ink-900` | `#1A1917` | **Primary text; primary button fill** |
| `--ink-950` | `#0E0D0C` | Dark section background |

### 1.3 Signal (technical / diagram)

Complementary teal. Reserved for system-architecture diagrams — signal paths, data flow, network. Never used for CTAs, so "teal = a connection" stays unambiguous.

| Token | Hex |
|---|---|
| `--signal-100` | `#D6EBEC` |
| `--signal-300` | `#6FB4B9` |
| `--signal-500` | `#0F6E76` |
| `--signal-700` | `#0A4E54` |

### 1.4 Semantic

| Token | Hex | On-white contrast |
|---|---|---|
| `--success-600` | `#1F7A45` | 4.9:1 |
| `--warning-600` | `#9A5308` | 5.6:1 — reuses amber-700, no second orange |
| `--danger-600` | `#B3261E` | 6.0:1 |
| `--info-600` | `#0A4E54` | 8.9:1 — reuses signal-700 |

---

## 2. Colour rules (binding)

These are enforced, not advisory.

1. **Amber-500 is never a text colour on white.** `#E38700` on `#FFFFFF` is ≈2.9:1 and fails WCAG AA. Amber text on light surfaces uses `--amber-700`; on dark surfaces, `--amber-400`.
2. **Amber fills always carry ink-900 text.** `#1A1917` on `#E38700` ≈ 7.4:1.
3. **Primary CTA is ink, not amber.** Ink-900 fill, white text. The accent CTA (amber fill, ink text) is used at most once per viewport. This keeps amber from reading as a warning colour.
4. **Amber is never a background for long-form text.** Use `--amber-50`.
5. **No gradients as brand devices.** A gradient may only appear as a photographic scrim for text legibility.
6. **Dark sections are deliberate:** hero, process story, final CTA, and at most one mid-page band. Never a dark whole page.
7. **Focus ring is amber-600, not amber-500.** WCAG 2.2 SC 1.4.11 requires 3:1 for a focus indicator against the adjacent colour. `#E38700` on white is **2.72:1** and fails; `#C06E00` is 3.83:1 and passes. On dark surfaces the ring switches to amber-400.
   *Found during Phase 2 by the token contrast test, which originally asserted amber-500 would pass. It did not.*

**Automated check:** a Vitest unit test computes WCAG contrast for every documented foreground/background pairing and fails the build on any AA violation. Design tokens cannot silently drift out of compliance.

---

## 3. Typography

### 3.1 Families

| Role | Family | Loading |
|---|---|---|
| Display & headings | **Geist Sans** (variable) | `next/font/local`, self-hosted, `font-display: swap`, preloaded, WOFF2, latin subset |
| Body | **Geist Sans** (variable) | Same file |
| Technical / eyebrow / data | **Geist Mono** (variable) | Self-hosted, **not** preloaded |

**Rationale for one superfamily across three registers:** premium technical brands achieve cohesion through disciplined use of a single family at different optical settings, not through a display/body pairing. It also means one variable font file for all headings and body — a measurable LCP advantage against the 2.5s target. Distinctiveness comes from the amber system, the keyline grid and the diagram language.

Mono is reserved for eyebrows, spec labels, diagram annotations, reference numbers and form step indicators — it signals "this is precise information" and gives the site its technical character.

Numerals: `font-variant-numeric: tabular-nums` on all data, specs and reference numbers.

### 3.2 Scale (fluid, `clamp()`)

| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `display-1` | `clamp(2.75rem, 1.6rem + 4.6vw, 5.25rem)` | 1.02 | −0.032em | Homepage hero H1 |
| `display-2` | `clamp(2.25rem, 1.5rem + 3vw, 3.75rem)` | 1.06 | −0.028em | Page H1 |
| `h1` | `clamp(2rem, 1.4rem + 2.4vw, 3rem)` | 1.1 | −0.024em | |
| `h2` | `clamp(1.625rem, 1.25rem + 1.5vw, 2.25rem)` | 1.15 | −0.02em | Section headings |
| `h3` | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)` | 1.25 | −0.014em | Card titles |
| `h4` | `1.125rem` | 1.35 | −0.01em | |
| `body-lg` | `1.1875rem` (19px) | 1.65 | 0 | Lead paragraphs |
| `body` | `1.0625rem` (17px) | 1.7 | 0 | **Default body** |
| `body-sm` | `0.9375rem` (15px) | 1.6 | 0 | Captions, meta |
| `label` | `0.875rem` (14px) | 1.4 | 0.01em | Form labels |
| `eyebrow` | `0.75rem` (12px) | 1.3 | 0.09em | Mono, uppercase, **non-essential text only** |

**17px body minimum** — the brief rejects tiny body text. `eyebrow` at 12px is permitted only for decorative section labels whose content is duplicated in the adjacent heading.

Measure: 62–72ch for prose (`--layout-prose: 45rem`).

---

## 4. Spacing

4px base unit. `--space-{n}`:

```
0  0      1  4px    2  8px    3  12px   4  16px   5  20px
6  24px   8  32px   10 40px   12 48px   16 64px   20 80px
24 96px   28 112px  32 128px  40 160px  48 192px
```

**Section rhythm** — the primary lever for a spacious, premium feel:

| Token | Mobile | Desktop |
|---|---|---|
| `--section-sm` | 48px | 64px |
| `--section-md` | 64px | 96px |
| `--section-lg` | 80px | 128px |
| `--section-xl` | 96px | 160px |

---

## 5. Radius, borders, elevation

### Radius — restrained
```
--radius-none 0     --radius-xs 2px   --radius-sm 4px
--radius-md   6px   --radius-lg 8px   --radius-xl 12px
--radius-2xl  16px  --radius-full 9999px
```
Default for cards and inputs: `--radius-md` (6px). Buttons: `--radius-sm` (4px). Pills/chips only use `--radius-full`. Large radii read consumer, not enterprise.

### Borders — the primary structural device
```
--border-hairline  1px solid var(--ink-100)
--border-default   1px solid var(--ink-200)
--border-strong    1px solid var(--ink-300)
--border-accent    1px solid var(--amber-500)
--border-inverse   1px solid rgb(255 255 255 / 0.12)
```

### Elevation — used sparingly
```
--shadow-none  none
--shadow-xs    0 1px 2px rgb(26 25 23 / 0.04)
--shadow-sm    0 1px 3px rgb(26 25 23 / 0.06), 0 1px 2px rgb(26 25 23 / 0.04)
--shadow-md    0 4px 12px rgb(26 25 23 / 0.07), 0 1px 3px rgb(26 25 23 / 0.05)
--shadow-lg    0 12px 32px rgb(26 25 23 / 0.10), 0 4px 8px rgb(26 25 23 / 0.05)
--shadow-focus 0 0 0 2px var(--ink-0), 0 0 0 4px var(--amber-600)
```
Cards rest at `--shadow-none` with `--border-default`, and lift to `--shadow-md` on hover. Shadow is a *state*, not decoration.

---

## 6. Motion

```
--duration-instant 100ms   --duration-fast    160ms
--duration-normal  220ms   --duration-slow    320ms
--duration-slower  480ms

--ease-standard  cubic-bezier(0.2, 0, 0, 1)
--ease-entrance  cubic-bezier(0.16, 1, 0.3, 1)
--ease-exit      cubic-bezier(0.4, 0, 1, 1)
--ease-emphasis  cubic-bezier(0.34, 1.3, 0.64, 1)
```

Rules:

1. Animate `transform` and `opacity` only. Never `width`, `height`, `top` or `left`.
2. Entrance distance ≤ 16px. Scroll reveals are a whisper, not a slide show.
3. No parallax beyond 0.15 differential; none on mobile.
4. Nothing animates on a delay that blocks reading. Text content is present in the DOM and visible without JS.
5. One animated element per viewport region.
6. Motion has a job: direct attention, show relationship, confirm action, or explain a system. Decorative animation is rejected in review.

### Reduced motion

`@media (prefers-reduced-motion: reduce)` — transforms removed, durations collapse to `--duration-instant`, opacity fades retained at 100ms, scroll storytelling becomes a static stepped layout, architecture diagrams render their final state with a play control. **Content is never hidden behind a disabled animation** — the common bug where `opacity: 0` initial state persists is guarded by a `motion-safe`-only initial-hidden class, and covered by an automated test.

---

## 7. Breakpoints & containers

```
--bp-xs   480px   --bp-sm   640px   --bp-md   768px
--bp-lg  1024px   --bp-xl  1280px   --bp-2xl 1536px   --bp-3xl 1728px

--layout-prose   720px   (45rem)
--layout-content 1200px  (75rem)   ← default
--layout-wide    1440px  (90rem)
--layout-full    1680px  (105rem)

--gutter-mobile  20px   --gutter-tablet  32px   --gutter-desktop  48px
```

> **Named `--layout-*`, never `--container-*`.** `--container-*` is a reserved
> Tailwind v4 theme namespace: defining `--container-full` silently redefines
> the built-in `w-full` utility from `100%` to that length, widening every
> full-width element and producing horizontal scroll on small viewports. This
> cost real debugging time in Phase 2 — it is a trap, not a naming preference.
> These values are consumed only by the `container-*` utilities in
> `globals.css`, so they live in `:root` rather than in `@theme`.

Grid: 4 columns mobile / 8 tablet / 12 desktop. Gap `--space-6` mobile, `--space-8` desktop.

---

## 8. Icons

- Single set: **Lucide**, tree-shaken per-icon imports. No icon font.
- Sizes: `--icon-xs 14` · `sm 16` · `md 20` (default) · `lg 24` · `xl 32` · `2xl 48`
- Stroke 1.5px at ≤24px, 1.75px above
- Always `aria-hidden="true"` when adjacent to a text label; icon-only controls carry an `aria-label`
- Diagram iconography is **custom SVG**, not Lucide — displays, cameras, microphones, speakers, control processors, media players, network switches and cloud endpoints need a consistent bespoke language

---

## 9. Component inventory

### Buttons

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `--ink-900` | white | none | Main action, once per section |
| `accent` | `--amber-500` | `--ink-900` | none | Highest-value CTA, ≤1 per viewport |
| `secondary` | transparent | `--ink-900` | `--border-strong` | Alongside primary |
| `ghost` | transparent | `--ink-700` | none | Tertiary, in-card |
| `inverse` | white | `--ink-900` | none | On dark sections |
| `link` | — | `--amber-700` | underline | Inline |

Sizes: `sm` 36px · `md` 44px · `lg` 52px. **Minimum touch target 44×44px** — enforced via padding or an expanded hit area, never by growing the visual button.

States: default → hover (fill shifts one step, `--duration-fast`) → active (`scale(0.985)`) → focus-visible (`--shadow-focus`) → disabled (`--ink-300`, `cursor: not-allowed`, `aria-disabled`) → loading (spinner + `aria-busy`, label retained, width locked to prevent shift).

### Other components

Card (default / interactive / project / solution / partner / stat) · Nav (header, mega-panel, mobile drawer, breadcrumb, footer, skip link, sticky mobile contact bar) · Form (text, textarea, select, radio group, checkbox, file upload, step indicator, field error, form status region) · Section layouts (hero, split, feature grid, stat band, quote, CTA band, logo wall, FAQ accordion, comparison table) · Media (`ResponsiveImage`, `Figure`, `Gallery`, `BeforeAfter`, `VideoHero`) · Interactive (SolutionExplorer, Configurator, ProjectFilters, ArchitectureDiagram, ProcessStory, ComparisonModule) · Accessibility primitives (`VisuallyHidden`, `SkipLink`, `FocusTrap`, `LiveRegion`, `Disclosure`, `Dialog`, `MotionSafe`).

---

## 10. Accessibility baseline (WCAG 2.2 AA)

| Requirement | Implementation |
|---|---|
| Contrast | 4.5:1 text, 3:1 large text and UI. Unit-tested across all token pairs. |
| Focus visible | 2px amber-**600** ring + 2px offset (3.83:1 on white); amber-400 on dark. `:focus-visible` only. Never `outline: none` without replacement. |
| Focus not obscured (2.2) | Sticky header uses `scroll-margin-top` on all focusable targets |
| Target size (2.2) | ≥24×24 CSS px minimum; 44×44 for all primary controls |
| Keyboard | Full operability. Skip link first in tab order. No traps outside intentional modals. |
| No hover-only | Every hover affordance has a click/focus equivalent |
| Landmarks | One `banner`, `main`, `contentinfo`; `nav` elements labelled |
| Headings | Exactly one H1 per page, no skipped levels — build-time validated |
| Forms | Every input has a `<label>`. Errors via `aria-describedby` + `role="alert"`. Never colour-only. |
| Status | `aria-live="polite"` for filters/success; `assertive` for errors |
| Images | Meaningful `alt`, or `alt=""` when decorative. Build fails on missing `alt`. |
| Motion | `prefers-reduced-motion` honoured throughout |
| Language | `<html lang="en-IN">` |
| Zoom | Usable at 400% / 320px width, no horizontal scroll |

---

## 11. Anti-patterns (rejected in review)

Blue-purple tech gradients · glow effects · decorative 3D · glassmorphism beyond one sparing overlay · body text under 17px · empty hero space without content · stock photos of people pointing at screens · product images without installed context · **text baked into images** · animation that delays content · auto-rotating carousels · hover-only disclosure · placeholder text as a label substitute · more than one accent colour · shadows used as decoration · full-page dark themes · icon fonts · hard-coded contact details in components · hard-coded copyright years.

---

## 12. Token implementation

Tokens are authored once as CSS custom properties in `src/styles/tokens.css`, exposed to Tailwind v4 via `@theme`, and typed in `src/types/tokens.ts`. There is no parallel JS token object to drift out of sync. Runtime code reads tokens through CSS variables; tests read the same file.
