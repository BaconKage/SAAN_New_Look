# Image Requirements

**Baseline finding:** the current website contains **no photographs of actual SAAN installations**. Every image under `/wp-content/uploads/2020/09/` is a manufacturer product render (Lifesize Icon 800, JBL loudspeaker), a generic stock interior, or theme furniture.

For a company whose credibility rests on delivered work, this is the largest single gap in the project. Real installation photography is the highest-value content SAAN can supply.

**Rule:** no image is invented, and no manufacturer image is used without checking usage permission.

---

## 1. Technical standard (all images)

| Requirement | Specification |
|---|---|
| Source format | Original camera JPEG/HEIC, or PNG for logos. Minimum 2400px on the long edge. Never a resized web copy. |
| Delivered formats | AVIF → WebP → JPEG fallback, generated automatically |
| Responsive widths | 400 / 640 / 828 / 1080 / 1280 / 1600 / 1920 / 2400 |
| Dimensions | `width` and `height` always declared — **CLS budget is 0.1** |
| Loading | Hero: `priority`, `fetchpriority="high"`. Everything below the fold: `loading="lazy"`. |
| Placeholder | Blur-up (LQIP) on all content imagery |
| Alt text | Meaningful when informative; `alt=""` when decorative. **Build fails on a missing `alt` attribute.** |
| Text in images | **Prohibited.** Text is HTML, always. |
| Colour profile | sRGB |
| Art direction | Separate desktop and mobile crops for hero and full-bleed images |

### Aspect ratios

`21:9` cinematic hero · `16:9` standard · `3:2` project cards · `4:3` detail/equipment · `1:1` team, logos, thumbnails · `9:16` mobile hero crop

---

## 2. Photography direction

**Do photograph:** the room as people actually use it · the finish quality — cable dressing, trim, flush mounts, rack tidiness · engineers working, commissioning, training · wide context shots that show scale · genuine detail (a terminated rack, a wall plate, a ceiling mic array).

**Do not supply:** people pointing at screens · staged handshakes · empty rooms with a black screen · product boxes · screenshots of manufacturer software · anything with a visible customer logo or confidential content on screen unless permission is granted.

**Practical guidance for the site team:**

- Shoot with the display **on**, showing neutral or SAAN-approved content — a dark screen makes any AV photograph look dead.
- Balance room lighting against screen brightness; bracket exposures if needed.
- Include one wide, one medium and one detail shot per room, minimum.
- Landscape orientation for almost everything. Portrait only for rack elevations and full-height LED walls.
- Check every frame for confidential information: whiteboards, monitors, printed documents, name plates, visitor logs.
- **Take a "before" shot before work starts.** It costs thirty seconds and it is the most persuasive image type available.

---

## 3. Priority tiers

- **P0** — cannot launch without. Placeholder is visible and obviously provisional.
- **P1** — needed for credibility. Site functions but reads thin.
- **P2** — enhancement.

---

## 4. Homepage

| ID | Slot | Orientation | Delivered size | Priority | Notes |
|---|---|---|---|---|---|
| `HOME-01` | Hero primary | Landscape 21:9 | 2400×1029 | **P0** | The most important image on the site. A real SAAN room, occupied or freshly commissioned, display live. Needs 9:16 mobile crop (`HOME-01m`, 1080×1920). |
| `HOME-02` | Hero video reel *(optional)* | Landscape 16:9 | ≤8s, ≤2MB, H.264+AV1, muted, no audio track | P2 | Only if genuine installation footage exists. Static `HOME-01` is always the fallback; video is suppressed on mobile, slow connections and reduced-motion. |
| `HOME-03..05` | Solution explorer panels ×9 | Landscape 16:9 | 1280×720 | P1 | One per requirement chip: meeting room, signage, auditorium, classroom, LED wall, video wall, audio, automation, support. |
| `HOME-06..08` | Featured project cards ×3 | Landscape 3:2 | 1200×800 | **P0** | Drawn from real projects. Placeholder until §6 is delivered. |
| `HOME-09..15` | Industry cards ×7 | Landscape 3:2 | 900×600 | P1 | An environment per industry. Real SAAN work strongly preferred over stock. |
| `HOME-16` | Process section backdrop | Landscape 16:9 | 1920×1080 | P2 | Dark section — engineers commissioning. Low-contrast, sits behind text. |
| `HOME-17` | Support/lifecycle | Landscape 16:9 | 1200×675 | P1 | Engineer performing a maintenance visit. |
| `HOME-18..20` | Partner logos | Horizontal lockup | SVG preferred, else 600px wide PNG transparent | **P0** | Verified partners only. Needs a light and a dark variant. |
| `HOME-21..23` | Testimonial portraits | Square 1:1 | 400×400 | P2 | Only with written permission. Section hidden entirely if unavailable. |

---

## 5. Solution pages (×8)

Per page, so **8 × the following**:

| ID pattern | Slot | Orientation | Size | Priority |
|---|---|---|---|---|
| `SOL-{slug}-hero` | Outcome hero | Landscape 21:9 | 2400×1029 (+ mobile 9:16) | **P0** |
| `SOL-{slug}-cap-1..3` | Capability detail ×3 | Landscape 4:3 | 1000×750 | P1 |
| `SOL-{slug}-app-1..4` | Typical application ×4 | Landscape 16:9 | 900×506 | P1 |
| `SOL-{slug}-detail-1..2` | Craft/finish detail ×2 | Landscape 4:3 | 800×600 | P2 |

**Specific hero subjects:**

| Solution | Hero subject |
|---|---|
| Meeting & Collaboration Spaces | Occupied meeting room mid video call, camera and display visible |
| Digital Signage | Multi-screen deployment in situ — lobby, retail or campus |
| LED & Video Walls | Direct-view LED or LCD wall at scale, live content |
| Professional Audio & Auditoriums | Auditorium wide shot with line array and lighting visible |
| Interactive Learning Spaces | Classroom with an interactive panel in genuine use |
| Commercial Displays & Projection | Large-venue projection or a commercial display wall |
| Room Automation & Control | Touch panel in hand, controlled room visible behind |
| Managed AV Services | Engineer at a rack or remote-monitoring station |

**Architecture diagrams** — `SOL-{slug}-arch` — are **custom inline SVG**, not photographs. Built by SAAN's design side, animated on scroll, and captioned: *"Illustrative system overview. Final design follows a site assessment."*

---

## 6. Projects (highest priority content)

**Per project, minimum viable set (6 images):**

| ID pattern | Slot | Orientation | Size | Priority |
|---|---|---|---|---|
| `PRJ-{slug}-hero` | Finished room, wide | Landscape 21:9 | 2400×1029 | **P0** |
| `PRJ-{slug}-card` | Gallery card | Landscape 3:2 | 1200×800 | **P0** |
| `PRJ-{slug}-g1..4` | Gallery ×4 | Mixed | 1600px long edge | **P0** |
| `PRJ-{slug}-before` | Before | Landscape 16:9 | 1600×900 | P1 |
| `PRJ-{slug}-after` | After — **same angle, same focal length** | Landscape 16:9 | 1600×900 | P1 |
| `PRJ-{slug}-detail-1..2` | Rack, cabling, finish | Portrait or 4:3 | 1200px long edge | P1 |
| `PRJ-{slug}-process-1..2` | Installation / commissioning | Landscape 16:9 | 1400×788 | P2 |
| `PRJ-{slug}-training` | Handover / training session | Landscape 16:9 | 1400×788 | P2 |
| `PRJ-{slug}-logo` | Customer logo | Horizontal | SVG or 400px PNG | P2 — **only with written permission** |

**Target: 6–10 projects at launch.** Below six, the gallery filters have nothing meaningful to filter.

Before/after pairs must be shot from the same position — a matched pair is worth more than ten unmatched images.

---

## 7. Industry pages (×7)

| ID pattern | Slot | Orientation | Size | Priority |
|---|---|---|---|---|
| `IND-{slug}-hero` | Sector environment | Landscape 21:9 | 2400×1029 | P1 |
| `IND-{slug}-env-1..4` | Example environments ×4 | Landscape 16:9 | 900×506 | P1 |

Subjects: Corporate (boardroom / huddle floor) · Education (lecture theatre / classroom) · Healthcare (conference room, training theatre, wayfinding — **no patient-identifiable content**) · Retail (in-store signage) · Hospitality (banquet or lobby) · Manufacturing (plant-floor signage or control room) · Government (council chamber or training facility).

Healthcare and Government imagery must be cleared for confidentiality before use.

---

## 8. Services pages (×8)

| ID pattern | Slot | Orientation | Size | Priority |
|---|---|---|---|---|
| `SVC-{slug}-hero` | Activity in progress | Landscape 16:9 | 1920×1080 | P1 |
| `SVC-{slug}-step-1..3` | Process steps ×3 | Landscape 4:3 | 800×600 | P2 |

Subjects: Consultation (requirement discussion) · Site survey (measuring, surveying) · Supply & installation (mounting, rack build) · Integration & commissioning (testing, signal verification) · Training & handover (customer training) · AMC (scheduled maintenance visit) · Technical support (support desk or remote diagnosis) · Upgrades (retrofit in progress).

These eight are among the most valuable images SAAN can produce, because **almost no competitor publishes them**. Photographs of the work itself are the clearest proof that SAAN executes rather than resells.

---

## 9. About, Recognition, Partners

| ID | Slot | Orientation | Size | Priority |
|---|---|---|---|---|
| `ABT-01` | About hero — team or office | Landscape 21:9 | 2400×1029 | P1 |
| `ABT-02..07` | Leadership portraits | Square 1:1 | 800×800 | P2 — consistent background and lighting |
| `ABT-08` | Team group | Landscape 16:9 | 1920×1080 | P2 |
| `ABT-09..12` | Engineers at work ×4 | Landscape 16:9 | 1400×788 | P1 |
| `REC-01..08` | Award/certificate scans | Portrait A4 | 1600px long edge, ≥200dpi | P1 — flat scans, not photos of frames |
| `PTR-{slug}-logo` | Partner logo | Horizontal | SVG preferred | **P0** — light + dark variants, permission required |

---

## 10. Brand and system assets

| ID | Asset | Format | Priority |
|---|---|---|---|
| `BRD-01` | **Primary logo, vector** | SVG (from AI/EPS) | **P0** |
| `BRD-02` | Reversed logo for dark sections | SVG | **P0** |
| `BRD-03` | Mark only (the "SAAN" glyph) | SVG | **P0** |
| `BRD-04` | Favicon set | SVG + 32/180/192/512 PNG | **P0** |
| `BRD-05` | Default Open Graph image | 1200×630 PNG | **P0** |
| `BRD-06` | Per-template OG images | 1200×630, generated at build | P1 |
| `BRD-07` | Apple touch icon | 180×180 PNG | P1 |
| `BRD-08` | Diagram icon set — display, camera, mic, speaker, control processor, media player, switch, cloud | SVG, custom | P1 |

Note: the existing logo PNG contains the typo "Alig**ini**ng Technology and Enterprise". This must be corrected in the vector master before any use.

---

## 11. Development placeholders

Until real photography arrives, every slot renders a `PlaceholderImage` component: correct aspect ratio (so layout and CLS are already final), an amber-tinted neutral field, the image ID (`SOL-digital-signage-hero`), the required dimensions, and the label `IMAGE REQUIRED`.

Placeholders are **visibly provisional**. No stock photograph is ever presented as SAAN's work.

`npm run audit:images` prints every unfilled slot with its ID, page and priority. **The launch build fails if any P0 slot is still a placeholder.**

---

## 12. Delivery instructions for SAAN

1. Supply **originals**, not resized web copies — full-resolution straight from the camera.
2. Organise by project or page: `Projects/<Customer or Site>/`, `Services/<service>/`, `Team/`.
3. Include a plain-text note per project: site, city, year, room type, what was installed.
4. Flag any image where the customer has **not** granted permission — it can still be used anonymously if no identifying detail is visible.
5. Phone photographs are acceptable if well lit and steady. A real, slightly imperfect photograph of SAAN's own work beats a perfect stock image every time.
6. Send `BRD-01` through `BRD-04` first — the site cannot be branded without them.

---

## 13. Summary of counts

| Category | Slots | P0 |
|---|---|---|
| Homepage | 23 | 8 |
| Solutions (8 pages) | ~72 | 8 |
| Projects (8 projects) | ~64 | 48 |
| Industries (7 pages) | 35 | 0 |
| Services (8 pages) | 32 | 0 |
| About / Recognition / Partners | ~20 | varies by partner count |
| Brand assets | 8 | 5 |
| **Total** | **~254 slots** | **~70 P0** |

The number looks large because it counts every responsive slot. In practice a well-covered shoot of **8 completed sites plus 8 service activities** — roughly 150–200 photographs across two days — fills the great majority of it.
