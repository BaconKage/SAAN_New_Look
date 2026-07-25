# Redirect Plan

**Source:** every URL in CURRENT_URL_INVENTORY.md (27 public URLs).
**Rule:** no legacy URL is dropped. Each is either preserved, consolidated into a new page with a 301, or deliberately 410'd with a documented reason.
**Status:** draft — depends on the two host decisions in §1.

---

## 1. Host and slash normalisation (must be resolved first)

These two rules affect **every** URL on the site. Getting them wrong 404s the entire legacy index.

### 1.1 Canonical host — DECISION REQUIRED

| Option | Effect |
|--------|--------|
| **A — apex canonical (recommended)** | `https://saanpro.com` is canonical. `www.saanpro.com` → 301 → apex. Matches current internal linking, preserves accumulated equity, no sitewide redirect hop for existing inbound links. |
| B — `www` canonical | `https://www.saanpro.com` is canonical. Apex → 301 → `www`. Matches the wording in the project brief. Adds a redirect hop to every existing inbound link and every indexed URL. |

**Recommendation: Option A.** The live site links internally with the apex host throughout, so search engines have almost certainly settled on apex. Awaiting confirmation. All tables below are written host-relative and work under either choice.

### 1.2 Trailing slash — MANDATORY

The current site serves every URL **with** a trailing slash. Next.js defaults to **without**.

Without an explicit rule, all 27 legacy URLs 404 on launch.

**Rule:** `trailingSlash: false` in `next.config.ts`, plus a catch-all 301 stripping any trailing slash, applied *before* the path-mapping rules below.

```
/:path*/  →  301  →  /:path*
```

Verified by an automated Playwright test that walks every row in §2 and §3 and asserts `301` → expected `Location` → final `200`.

---

## 2. Page redirect map — legacy → new

301 (permanent) unless noted. Ordered as in the URL inventory.

### 2.1 Top-level pages

| # | Legacy URL | New URL | Type | Rationale |
|---|-----------|---------|------|-----------|
| 1 | `/` | `/` | 200 | Home is rebuilt in place |
| 2 | `/about-us/` | `/about` | 301 | Slug normalised |
| 3 | `/products/` | `/solutions` | 301 | Deliberate repositioning: the product directory is replaced by the solution index. Highest-visibility mapping change on the site. |
| 4 | `/solutions/` | `/solutions` | 301 | Slash normalisation only |
| 5 | `/awards/` | `/recognition` | 301 | Broader page: awards + partner programmes + certifications |
| 6 | `/contact-us/` | `/contact` | 301 | Slug normalised |

### 2.2 Product pages → solution pages

Every product URL consolidates into the solution page that answers the same intent. No product-category URLs survive.

| # | Legacy URL | New URL | Type | Rationale |
|---|-----------|---------|------|-----------|
| 7 | `/audio-systems/` | `/solutions/professional-audio-and-auditoriums` | 301 | Direct intent match |
| 8 | `/av-accessories/` | `/services/supply-and-installation` | 301 | Accessories are a delivery concern, not a solution. Reviewed — see §5 note. |
| 9 | `/av-mounting-kits/` | `/services/supply-and-installation` | 301 | As above |
| 10 | `/displays/` | `/solutions/commercial-displays-and-projection` | 301 | Direct intent match |
| 11 | `/projector/` | `/solutions/commercial-displays-and-projection` | 301 | Direct intent match |
| 12 | `/screen/` | `/solutions/commercial-displays-and-projection` | 301 | Projection screens belong with projection |
| 13 | `/video-conferences/` | `/solutions/meeting-and-collaboration-spaces` | 301 | Fixes the grammatical slug error too |
| 14 | `/clearone/` | `/partners/clearone` **or** `/solutions/meeting-and-collaboration-spaces` | 301 | **Conditional — see §3** |
| 15 | `/lifesize/` | `/solutions/meeting-and-collaboration-spaces` | 301 | **No partner page.** Discontinued hardware, brand commercially collapsed. Legacy copy is vendor marketing and is not carried forward. |
| 16 | `/poly/` | `/partners/poly` **or** `/solutions/meeting-and-collaboration-spaces` | 301 | **Conditional — see §3** |
| 17 | `/zoom/` | `/partners/zoom` **or** `/solutions/meeting-and-collaboration-spaces` | 301 | **Conditional — see §3** |
| 18 | `/wps/` | `/solutions/meeting-and-collaboration-spaces` | 301 | Wireless presentation is a capability within meeting spaces. Opaque acronym slug retired. |

### 2.3 Solution pages

| # | Legacy URL | New URL | Type | Rationale |
|---|-----------|---------|------|-----------|
| 19 | `/automation/` | `/solutions/room-automation-and-control` | 301 | Direct intent match, clearer slug |
| 20 | `/boardroom/` | `/solutions/meeting-and-collaboration-spaces` | 301 | Boardrooms are one room type within the solution |
| 21 | `/digital-signage/` | `/solutions/digital-signage` | 301 | Best-performing legacy page — slug preserved under the new prefix |
| 22 | `/vc-solutions/` | `/solutions/meeting-and-collaboration-spaces` | 301 | Duplicate of #13/#20 intent |
| 23 | `/video-wall-solutions/` | `/solutions/led-and-video-walls` | 301 | Broadened to cover direct-view LED |

### 2.4 Orphan pages

| # | Legacy URL | New URL | Type | Rationale |
|---|-----------|---------|------|-----------|
| 24 | `/cloud-vc/` | `/solutions/meeting-and-collaboration-spaces` | 301 | Orphaned, unlinked. Redirected rather than dropped in case of external inbound links. |
| 25 | `/meeting-room-devices/` | `/solutions/meeting-and-collaboration-spaces` | 301 | As above |

### 2.5 WordPress default artefacts

| # | Legacy URL | New URL | Type | Rationale |
|---|-----------|---------|------|-----------|
| 26 | `/hello-world/` | `/resources` | 301 | Default post with no content value. Redirected rather than 410'd purely to avoid an error in Search Console; carries no equity either way. |
| 27 | `/category/uncategorized/` | `/resources` | 301 | Default taxonomy archive, no value |

**Consolidation summary:** 9 legacy URLs point at `/solutions/meeting-and-collaboration-spaces`. This is intentional — the legacy site fragmented one buying intent across nine pages. Many-to-one 301s are correct here and Google handles them fine. The new page must genuinely cover all nine intents (boardroom, VC, cloud VC, room devices, wireless presentation, and the ClearOne/Poly/Zoom platform ecosystems) or the consolidation loses relevance. This is a content requirement on that page, tracked in CONTENT_STRATEGY.md.

---

## 3. Conditional partner redirects

Partner pages must not be published until the relationship is verified (project brief §15). Three legacy brand URLs therefore have conditional targets.

| Legacy URL | If partnership verified | If unverified / lapsed |
|-----------|------------------------|------------------------|
| `/clearone/` | `/partners/clearone` | `/solutions/meeting-and-collaboration-spaces` |
| `/poly/` | `/partners/poly` | `/solutions/meeting-and-collaboration-spaces` |
| `/zoom/` | `/partners/zoom` | `/solutions/meeting-and-collaboration-spaces` |

**Implementation:** the redirect table is generated from the partner records themselves, so a partner whose `verificationStatus` is not `verified` automatically falls back to the solution page. No manual redirect editing, and no possibility of a 301 pointing at a page that does not exist.

`/lifesize/` is unconditional — Lifesize will not get a partner page under any circumstance.

---

## 4. Endpoints that must NOT redirect

Redirecting these to real pages would be an SEO and security mistake.

| Pattern | Response | Rationale |
|---------|----------|-----------|
| `/wp-admin/*`, `/wp-login.php` | 404 | Must not imply an admin surface exists |
| `/wp-json/*` | 404 | No WordPress REST API on the new stack |
| `/wp-content/plugins/*`, `/wp-content/themes/*` | 404 | Dead asset paths |
| `/wp-sitemap*.xml` | 301 → `/sitemap.xml` | Legitimate crawler redirect |
| `/xmlrpc.php` | 404 | |
| `/feed/`, `/comments/feed/` | 410 | No feed at launch. Revisit if `/resources` gains an RSS feed. |

### `/wp-content/uploads/*` — needs a decision

Legacy image URLs may have inbound links or image-search presence. Options:

- **Recommended:** 404. The assets are manufacturer product renders and stock photography with no SEO value, and none are reused on the new site.
- Alternative: preserve `logo.png` at its legacy path if it is hot-linked anywhere external (unlikely).

Tracked in CONTENT_TODO.md.

---

## 5. Items flagged for review

1. **`/av-accessories/` and `/av-mounting-kits/` → `/services/supply-and-installation`.** Reasonable, but if either legacy URL carries meaningful search traffic for accessory or mounting queries, the better target may be `/solutions/commercial-displays-and-projection`. Decide using Search Console data — see §7.
2. **`/products/` → `/solutions`.** The most consequential mapping. Anyone with "products" bookmarked lands on a solutions index. Correct for the repositioning, but expect a short-term bounce increase. Monitor for 30 days post-launch.
3. **`/wps/`.** Slug meaning is inferred, not confirmed. If it means something other than wireless presentation systems, the target changes.

---

## 6. Implementation

Single source of truth: `src/lib/redirects.ts`, exporting a typed array consumed by both `next.config.ts` and the Playwright verification suite. The redirect map is never duplicated.

```ts
export type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
  note?: string;
};
```

Order of evaluation:

1. Host normalisation (§1.1)
2. Trailing-slash strip (§1.2)
3. Explicit path map (§2, §3)
4. Blocked-pattern rules (§4)
5. `not-found.tsx` with helpful navigation

**Verification test** (`src/tests/e2e/redirects.spec.ts`): asserts, for every legacy URL, that the request returns 301, that `Location` matches the expected destination, that the destination returns 200, and that no redirect chain exceeds one hop.

---

## 7. Pre-launch data requirement

Before finalising this map, export from **Google Search Console** (last 12 months):

- Top pages by impressions and clicks
- Top queries per page
- Existing inbound backlinks by target URL

This will confirm or correct the review items in §5 and identify any indexed legacy URL missed by the sitemap (WordPress sites routinely have indexed URLs absent from `wp-sitemap.xml` — paginated archives, attachment pages, tag archives, and Elementor library entries).

**Tracked in CONTENT_TODO.md as a launch blocker.** Note: the legacy sitemap also included `wp-sitemap-posts-elementor_library-1.xml`; Elementor template URLs are occasionally indexed and would not appear in the page inventory above.

---

## 8. Post-launch monitoring

- Search Console **Coverage** report daily for the first 14 days; watch for a 404 spike
- Server 404 log reviewed daily for 7 days, then weekly for 8 weeks
- Any legacy URL appearing in 404 logs gets a redirect added within 24 hours
- Confirm each `/solutions/*` destination is indexed within 30 days
- Track the 9-to-1 consolidation on `/solutions/meeting-and-collaboration-spaces` specifically — if impressions do not recover within 60 days, the page's coverage of the nine legacy intents needs strengthening
