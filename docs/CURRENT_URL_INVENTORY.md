# Current URL Inventory — saanpro.com

**Audit date:** 2026-07-25
**Method:** `robots.txt` → `wp-sitemap.xml` index → all child sitemaps, plus page-level fetches of representative pages.
**Platform detected:** WordPress 5.5.18 · Elementor · "Mesmerize" theme · Apache
**Canonical host observed:** `https://saanpro.com` (apex, no `www`) — every internal navigation link uses the apex host.
**Trailing slash policy:** all URLs use a trailing slash.
**Last content activity:** every media upload is dated `2020/09`; footer reads "Copyright © 2020".

---

## 1. Complete URL list (27 URLs)

### 1.1 Top-level pages (6)

| # | URL | In nav | Assessment |
|---|-----|--------|------------|
| 1 | `https://saanpro.com/` | Yes | Home. Sections: "What Makes Us Different?", "Our Services", "Featured Products", "Our Partners", "Call Us Now:". Product-led, not solution-led. |
| 2 | `https://saanpro.com/about-us/` | Yes | **Positioning conflict.** Describes TMG (test & measurement), ITG (IT infrastructure) and ECG (electronic components) business units. Almost no AV content. Claims: founded December 2007; "Decade Plus of Industry Experience"; Fortune 500 target market. |
| 3 | `https://saanpro.com/products/` | Yes | Category directory only. No products, no specs, no prices. Body copy is the postal address. |
| 4 | `https://saanpro.com/solutions/` | Yes | **Effectively empty.** Only heading + footer chrome. |
| 5 | `https://saanpro.com/awards/` | Yes | Genuinely valuable. See §3. |
| 6 | `https://saanpro.com/contact-us/` | Yes | Phone numbers + address. **No email address. No contact form. No map.** |

### 1.2 Product pages (12)

| # | URL | In nav | Assessment |
|---|-----|--------|------------|
| 7 | `https://saanpro.com/audio-systems/` | Yes | Thin |
| 8 | `https://saanpro.com/av-accessories/` | Yes | Thin |
| 9 | `https://saanpro.com/av-mounting-kits/` | Yes | Thin |
| 10 | `https://saanpro.com/displays/` | Yes | Thin |
| 11 | `https://saanpro.com/projector/` | Yes | Thin. Singular slug. |
| 12 | `https://saanpro.com/screen/` | Yes | Thin. Singular slug. |
| 13 | `https://saanpro.com/video-conferences/` | Yes | Parent of brand pages. Slug is grammatically wrong ("conferences" should be "conferencing"). |
| 14 | `https://saanpro.com/clearone/` | Yes | Brand page |
| 15 | `https://saanpro.com/lifesize/` | Yes | **Obsolete + copyright risk.** Near-verbatim Lifesize marketing copy. Lists Icon 300/400/450/500/600/700/800, Phone HD, Camera 10x, Digital MicPod, Share, Go — the Icon series is discontinued. Repeats vendor claims ("500-way calls", "10,000 concurrent viewers", "60 countries"). No partnership status stated. |
| 16 | `https://saanpro.com/poly/` | Yes | Brand page. Poly was acquired by HP — brand status needs re-verification. |
| 17 | `https://saanpro.com/zoom/` | Yes | Brand page |
| 18 | `https://saanpro.com/wps/` | Yes | Wireless presentation systems (inferred from slug — unverified). Opaque acronym slug. |

### 1.3 Solution pages (5)

| # | URL | In nav | Assessment |
|---|-----|--------|------------|
| 19 | `https://saanpro.com/automation/` | Yes | Thin |
| 20 | `https://saanpro.com/boardroom/` | Yes | **One sentence of body copy:** "Give the best of audio and video experience to every visitor with design integrated solutions from SAAN". ~90% navigation chrome. |
| 21 | `https://saanpro.com/digital-signage/` | Yes | Best of the solution pages, still only ~15–20% substantive. One intro paragraph + three image captions. |
| 22 | `https://saanpro.com/vc-solutions/` | Yes | Thin |
| 23 | `https://saanpro.com/video-wall-solutions/` | Yes | Thin |

### 1.4 Orphan pages — in sitemap, absent from navigation (2)

| # | URL | Assessment |
|---|-----|------------|
| 24 | `https://saanpro.com/cloud-vc/` | Orphaned. Not linked from any menu. |
| 25 | `https://saanpro.com/meeting-room-devices/` | Orphaned. Not linked from any menu. |

### 1.5 WordPress default artefacts (2)

| # | URL | Assessment |
|---|-----|------------|
| 26 | `https://saanpro.com/hello-world/` | WordPress default post. Should never have been indexed. |
| 27 | `https://saanpro.com/category/uncategorized/` | WordPress default taxonomy archive. No value. |

### 1.6 Non-page endpoints

| Endpoint | Handling |
|----------|----------|
| `https://saanpro.com/wp-sitemap.xml` (+ 5 child sitemaps) | Replaced by new `/sitemap.xml` |
| `https://saanpro.com/robots.txt` | Replaced |
| `https://saanpro.com/wp-sitemap-users-1.xml` | **Author enumeration exposure.** Will not exist on the new site. |
| `/wp-admin/`, `/wp-content/*`, `/wp-json/*`, `/wp-login.php` | Will 404 on the new site — see REDIRECT_PLAN.md §4 |

---

## 2. Content classification

### 2.1 Still relevant (carry the *fact*, rewrite the *words*)

- Company legal name and Bangalore address
- Phone numbers (three, roles partly identified)
- The service domains: video conferencing, boardroom AV, digital signage, video walls, automation, audio, displays, projection, wireless presentation
- Awards and partner-programme recognitions (subject to re-verification)
- Founding date, December 2007 (subject to confirmation)

### 2.2 Outdated

- Copyright year 2020; no content update in ~6 years
- WordPress 5.5.18 — unpatched since 2020 (**live security risk on the current site**)
- Lifesize product range — discontinued hardware, brand commercially collapsed
- Poly brand identity — acquired by HP
- Every award is 2014–2019
- "Decade Plus of Industry Experience" — written in ~2018–2020, now understates a 2007 founding

### 2.3 Duplicated

- The whole footer block (Quick Links / Address / Solutions) is repeated inside page body content on several pages, inflating apparent word count
- Navigation menu rendered twice in the DOM on several pages
- Address repeated 2–3 times per page
- `/vc-solutions/`, `/video-conferences/`, `/cloud-vc/`, `/meeting-room-devices/` and `/boardroom/` all address overlapping intent

### 2.4 Incomplete

- `/solutions/` — heading only
- `/products/` — directory only
- `/boardroom/` — one sentence
- **No email address exists anywhere on the site**
- No contact form; no enquiry capture of any kind
- No business hours, no map, no service-area statement
- No projects, no case studies, no testimonials, no customer references
- No team or leadership content
- No privacy policy — a compliance gap
- Social icons present with unverified destinations

### 2.5 Grammatically weak / typographic errors

| Error | Correct form | Location |
|-------|--------------|----------|
| `SoIutions` (capital i for lowercase L) | Solutions | Global footer — every page |
| `Conference HaIIs` | Conference Halls | `/boardroom/` |
| `Aligining Technology and Enterprise` | Aligning… | **Logo image itself** |
| `Video Conferences` | Video Conferencing | Nav + slug |
| `Contact US` | Contact Us | Main navigation |
| Random capitalisation: "Decade Plus of Industry Experience In Electronics & Information Technology" | Sentence case | `/about-us/` |

### 2.6 Product-led instead of solution-led

The entire top-level "Products" tree (12 of 27 URLs, 44% of the site) is organised by manufacturer and hardware category. This is the single biggest structural change: the new site leads with the customer's requirement, and products appear only as supporting evidence.

### 2.7 Potentially obsolete

- Lifesize Icon 300/400/450/500/600/700/800, Phone HD, Camera 10x, Digital MicPod, Share, Go — all discontinued
- `/wps/` — wireless presentation category may have moved on entirely
- TMG / ITG / ECG business-unit structure — may no longer reflect operations

### 2.8 Unverifiable (must not be carried forward without confirmation)

- "Fortune 500 Companies" as a customer descriptor
- "SAAN promises to deliver the best value in return to their customer investments"
- Partner/authorisation status for ClearOne, Poly, Zoom, Lifesize, Panasonic, Online Instruments
- Current validity of all six awards
- Which phone number serves which function
- Social media account ownership

---

## 3. Awards page — detailed capture

Recorded verbatim from `/awards/` on 2026-07-25. **All require re-verification before republishing** — see CONTENT_TODO.md.

| Item | Awarding body | Year | Recommendation |
|------|---------------|------|----------------|
| APAC Partner Enablement Award 2017 | Lifesize | 2017 | Keep if certificate available. Strongest credential on the site. |
| Lifesize Partner Program 2015 | Lifesize | 2015 | Keep, consolidated with the above |
| Lifesize Partner Program 2014 | Lifesize | 2014 | Keep, consolidated |
| Online Instruments (India) Pvt Ltd Partner Program 2019 | Online Instruments | 2019 | Keep — most recent credential |
| Star Performer Award For Year 2014 | Panasonic | 2014 | Keep if certificate available |
| Bharat Ratna JRD Tatanagar Residents Welfare Association Executive Committee 2010-12 | RWA, Bangalore 560092 | 2010–12 | **Recommend removal** — a community/personal role, not a business credential. Weakens the page. |
| IISc certificate (image, uncaptioned) | Unknown | Unknown | Needs identification before use |

---

## 4. Media inventory findings

All media lives under `/wp-content/uploads/2020/09/`. Sampled filenames:

`logo.png`, `cropped-fav-1-*.png`, `800-orthographic-large.png` (Lifesize Icon 800 product render), `g700JBL2GYB-F_jblsoundsystem.jpg` (JBL product shot), `mixer5.jpg`, `pro3.jpg`, `s2.jpg`, `cm6.jpg`, `auditorium.jpg`, `Boardroom.jpg`, plus the theme's `home_page_header-3.jpg`.

**Conclusion: there is not one photograph of an actual SAAN installation on the current website.** Every image is either a manufacturer product render, a generic stock interior, or theme furniture. This is the most significant content gap in the project — see IMAGE_REQUIREMENTS.md.

**Brand colour extracted from `logo.png`** (610×78 PNG, pixel-frequency analysis): dominant non-white colour `#E38700` (3,348px), secondary `#000000` (889px). This is the basis of the new palette — see DESIGN_SYSTEM.md.

---

## 5. Host behaviour observed

| Check | Result |
|-------|--------|
| `https://saanpro.com` | 200, `Server: Apache` |
| `https://www.saanpro.com` | Resolves and serves content |
| Internal links | All use apex (`saanpro.com`), implying apex is the intended canonical |
| Trailing slashes | Present on all URLs |

**Open decision:** apex vs `www` as the canonical host on the new site. The brief refers to `www.saanpro.com`; the live site behaves as apex-canonical. Recommendation: **retain apex** to preserve link equity. See REDIRECT_PLAN.md §1.

---

## 6. Facts to carry into central configuration

Destined for `src/config/site.ts` — **not** to be scattered across components.

```
Legal name    Saan Protocol Experts Private Limited
Display name  SAAN
Address       #215, "Shree Hari" Complex, 6th Block, 2nd Stage,
              Outer Ring Road, Nagarabhavi, Bangalore 560072, Karnataka, India
Phone (main)  +91 80 2318 2011
Phone (sales) +91 93426 59932
Phone (supp)  +91 88671 38111
Founded       December 2007                    [VERIFY]
Sales email   [CONTENT REQUIRED — none exists on the current site]
Support email [CONTENT REQUIRED — none exists on the current site]
WhatsApp      [CONTENT REQUIRED]
Hours         [CONTENT REQUIRED]
CIN / GSTIN   [CONTENT REQUIRED]
Social URLs   [CONTENT REQUIRED — icons exist, destinations unverified]
```
