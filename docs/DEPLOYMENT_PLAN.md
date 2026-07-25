# Deployment Plan

**Governing constraint:** `saanpro.com` stays live and untouched throughout. No DNS, hosting or email change occurs without explicit written approval from the client. Everything below is preparation.

---

## 1. Environments

| Environment | Purpose | URL | Indexable |
|---|---|---|---|
| Local | Development | `http://localhost:3000` | n/a |
| Preview | Per-branch, per-PR | Auto-generated Vercel URL | **No** |
| Staging | Client review and sign-off | `staging.saanpro.com` *(subdomain — a CNAME only, does not affect the live site)* | **No** |
| Production | Live, post-cutover only | `saanpro.com` | Yes |

### Staging must not be indexable

Three independent guards, because one is not enough:

1. `NEXT_PUBLIC_SITE_ENV=staging` → `robots.ts` emits `Disallow: /`
2. `X-Robots-Tag: noindex, nofollow` header at the edge for all non-production environments
3. HTTP Basic Auth (Vercel Deployment Protection) on preview and staging

A staging deployment that gets indexed creates duplicate content against the live site and can cost the launch. Verified explicitly in LAUNCH_CHECKLIST.md.

**Note:** creating `staging.saanpro.com` requires adding one CNAME record. It does not touch the apex, `www`, or any MX record. This is the only DNS action taken before cutover, and it still requires client sign-off.

---

## 2. Hosting

**Recommended: Vercel.** Native Next.js support, atomic immutable deployments with instant rollback, edge caching in Mumbai (`bom1`) which matters for Indian visitors, automatic HTTPS, and preview deployments per PR. Instant rollback is the specific feature that makes ROLLBACK_PLAN.md viable.

Alternatives if the client prefers: Netlify (comparable), Cloudflare Pages (cheapest edge, some adapter friction), or a self-managed Node host (full control, materially more operational work — not recommended).

**Configuration:** Production branch `main` · region `bom1` · Node 22 · `npm ci && npm run build` · framework preset Next.js · deployment protection on all non-production environments.

---

## 3. Branching and CI/CD

```
main          → production (deploys only after cutover approval)
develop       → staging.saanpro.com
feature/*     → preview deployment per PR
```

`main` is protected: PR required, CI must pass, no force-push.

### CI pipeline (GitHub Actions, on every PR)

| # | Gate | Command | Blocking |
|---|---|---|---|
| 1 | Install | `npm ci` | Yes |
| 2 | Lint | `npm run lint` | Yes |
| 3 | Types | `npm run typecheck` | Yes |
| 4 | Format | `npm run format:check` | Yes |
| 5 | Unit | `npm run test:unit` | Yes |
| 6 | Content validation | `npm run validate:content` | Yes |
| 7 | SEO field validation | `npm run validate:seo` | Yes |
| 8 | **Build** | `npm run build` | Yes |
| 9 | E2E | `npm run test:e2e` | Yes |
| 10 | Accessibility | `npm run test:a11y` | Yes |
| 11 | Link check | `npm run validate:links` | Yes |
| 12 | Lighthouse CI | `npm run lhci` | Warn pre-Phase-8, blocking after |
| 13 | Content audit | `npm run audit:content` | Report only (blocking at launch) |

A failing build is never merged and is never reported as a completed phase.

---

## 4. Environment variables

`.env.example` is committed with placeholder values and inline comments. **No real secret is ever committed.** `.env*.local` is gitignored, and a secret-scanning pre-commit hook backs that up.

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://saanpro.com
NEXT_PUBLIC_SITE_ENV=development          # development | preview | staging | production

# CMS (Sanity)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=                    # server only
SANITY_REVALIDATE_SECRET=                 # webhook signature

# Email
EMAIL_PROVIDER=resend
RESEND_API_KEY=                           # server only
ENQUIRY_TO_EMAIL=                         # [CONTENT REQUIRED]
SUPPORT_TO_EMAIL=                         # [CONTENT REQUIRED]
EMAIL_FROM=                               # must be on a verified sending domain

# Spam / abuse
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=                     # server only
UPSTASH_REDIS_REST_URL=                   # rate limiting
UPSTASH_REDIS_REST_TOKEN=                 # server only

# Analytics
NEXT_PUBLIC_ANALYTICS_PROVIDER=none       # none | ga4 | plausible | umami
NEXT_PUBLIC_ANALYTICS_ID=
```

Secrets live only in the Vercel dashboard, scoped per environment. Any variable exposed to the browser is explicitly prefixed `NEXT_PUBLIC_`; everything else is server-only and validated at boot by a Zod schema in `src/lib/env.ts`, so a missing variable fails fast at build rather than silently at runtime.

---

## 5. Transactional email

**Critical constraint: sending email must not require changing the domain's MX records.**

Adding a sending provider requires only new `TXT` (SPF include, DKIM) and optionally `CNAME` records — MX is untouched, and existing mail delivery is unaffected. Even so:

1. Record the complete current DNS zone, including SPF, DKIM and DMARC, before adding anything (DOMAIN_CUTOVER_CHECKLIST §2).
2. **Prefer a dedicated sending subdomain** — `mail.saanpro.com` or `notify.saanpro.com`. This isolates transactional sending entirely from the primary mail domain and eliminates any risk to existing email.
3. Never edit an existing SPF record blind. If one exists, the provider's `include:` is *added* to it — a second SPF TXT record breaks SPF entirely.
4. Verify inbound delivery to a real SAAN mailbox before launch, checking the spam folder.

Both API routes retry once on transport failure and log the enquiry payload to the server on total failure, so an enquiry is never silently lost. The user-facing failure message includes the sales phone number.

---

## 6. Build and caching

- Static generation for all 31 fixed pages
- ISR (`revalidate: 3600`) for CMS-backed content, plus on-demand revalidation via a signed Sanity webhook
- `/api/*` routes are always dynamic, never cached
- Immutable, content-hashed asset filenames
- Images served through Next.js Image + the Sanity CDN, AVIF/WebP negotiated

---

## 7. Security

HTTPS enforced; HSTS enabled only after a stable launch window (it is hard to reverse). Headers: `Content-Security-Policy` (start report-only, then enforce), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` denying camera, microphone and geolocation.

API routes: Zod validation server-side (never trusting the client), Turnstile verification, IP + fingerprint rate limiting (5 requests / 10 minutes per IP), honeypot field, submission-timing check, file uploads restricted by type and to 10MB, all input escaped before it reaches an email template.

No secret in client code. No secret in the repository. `src/lib/env.ts` fails the build if a required server variable is absent.

---

## 8. Pre-cutover sequence

Deployment is not the same as launch. In order:

1. Build passes locally
2. Preview deployment created and protected
3. `staging.saanpro.com` configured *(one CNAME — approval required)*
4. Every page reviewed on staging, desktop and mobile
5. All content reviewed and signed off by SAAN
6. **Every phone number and email address verified by dialling and sending**
7. Customer and partner permissions confirmed in writing
8. Redirect map finalised against Search Console data
9. Current website backed up in full — files and database
10. Current DNS recorded, including MX, SPF, DKIM, DMARC
11. Production hosting configured, domain added but **not yet pointed**
12. LAUNCH_CHECKLIST.md fully signed off
13. **Explicit written approval to proceed**

Only then does DOMAIN_CUTOVER_CHECKLIST.md begin.

---

## 9. Monitoring after launch

Vercel Analytics and deployment logs · Search Console coverage daily for 14 days · a 404 log review daily for 7 days then weekly for 8 weeks · **an enquiry-delivery check: a test submission through both forms every day for the first week**, because a silently broken form is the most expensive possible launch failure · uptime monitoring on the homepage and both API routes · Core Web Vitals field data via `useReportWebVitals`.

---

## 10. Post-launch cadence

Weekly for the first month: 404s, form deliveries, Core Web Vitals, Search Console coverage.
Monthly: dependency updates, Lighthouse re-run, content-audit report, partner lifecycle-review warnings.
Quarterly: partner and product lifecycle review (CONTENT_STRATEGY §4.4), accessibility re-audit, redirect-map review.
