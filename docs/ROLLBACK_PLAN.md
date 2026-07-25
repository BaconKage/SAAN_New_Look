# Rollback Plan

**Purpose:** restore the previous `saanpro.com` website quickly and completely if the launch fails.

**Principle:** rolling back is cheap, fast and reversible. Leaving a broken site live is expensive. **When in doubt, roll back and diagnose afterwards.** No engineer should ever feel they need permission to protect the client's email or restore a working site.

**Why this plan works:** the existing WordPress site is never modified or deleted during the cutover. Its files, database and hosting stay exactly as they are. Rollback is therefore a DNS change, not a restoration — which is why it takes minutes rather than hours.

---

## 1. Rollback triggers

### Immediate — roll back now, diagnose later

| # | Condition | Detection |
|---|---|---|
| 1 | **Email stops flowing** | Test send/receive fails, or SAAN reports missing mail |
| 2 | MX, SPF, DKIM or DMARC records altered | `nslookup` differs from the Section 2 snapshot |
| 3 | Homepage does not load after DNS propagates | Manual check, uptime monitor |
| 4 | HTTPS certificate fails to issue within 60 minutes | Browser warning |
| 5 | Either enquiry form fails to deliver | Test submission does not arrive |
| 6 | Site returns 5xx errors | Monitoring, logs |
| 7 | >10% of legacy URLs fail their redirect | `npm run test:redirects` against production |

### Considered — assess, then decide

| # | Condition | Window |
|---|---|---|
| 8 | Organic traffic down >40% vs. baseline | Still down at day 21 |
| 9 | Enquiry volume down >50% vs. baseline | Two weeks |
| 10 | A critical accessibility regression only reproducible in production | Immediate assessment |
| 11 | Client judges the content unacceptable | Client decision |

---

## 2. Rollback levels

Choose the smallest level that resolves the problem.

| Level | Action | Time | Use when |
|---|---|---|---|
| **L1** | Redeploy the previous Vercel deployment | ~1 minute | A bug was introduced by a deployment; the platform is fine |
| **L2** | Revert DNS to the old host | 5–15 min (TTL 300s) | The new site is fundamentally broken, or email is affected |
| **L3** | Restore WordPress from backup to a new host | 2–4 hours | The old hosting is gone or compromised |

**L2 is the primary path.** L1 handles ordinary deployment bugs. L3 exists only for the case where the old host is unavailable, which is why the aftercare rule says keep it running for 30 days.

---

## 3. Level 1 — Redeploy previous version

For a bug introduced by a deployment where the site is otherwise healthy.

1. Open the Vercel dashboard → Deployments.
2. Identify the last known-good production deployment.
3. Use "Promote to Production" (or "Instant Rollback").
4. Verify the homepage, one solution page and both forms.
5. Fix the issue on a branch; do not redeploy `main` until CI is green.

No DNS change. No propagation delay.

---

## 4. Level 2 — Revert DNS to the old host

**This is the main rollback procedure.** Target: under 15 minutes to execute, propagating within the 300-second TTL set before cutover.

### Prerequisites (must exist before cutover — verified in DOMAIN_CUTOVER_CHECKLIST §2 and §3)

- The original apex `A` record IP address, recorded
- The original `www` record value, recorded
- TTL already lowered to 300 seconds
- The old hosting account still active with the site in place

### Procedure

| # | Step |
|---|---|
| 1 | Note the exact time the rollback begins |
| 2 | Log in to the DNS provider |
| 3 | Restore the apex `A` record to the original IP from the DNS snapshot |
| 4 | Restore the `www` record to its original value |
| 5 | **Do not touch MX, SPF, DKIM, DMARC or nameservers** — unless the failure is that one of them was altered, in which case restore it verbatim from the snapshot |
| 6 | Save; screenshot the resulting zone |
| 7 | Wait 5 minutes for the 300s TTL to expire |

### Verification

| ✅ | Check |
|---|---|
| ☐ | `nslookup -type=A saanpro.com 8.8.8.8` returns the original IP |
| ☐ | `https://saanpro.com` serves the old WordPress site |
| ☐ | The old site's HTTPS certificate is valid (it should be — it was never removed) |
| ☐ | `nslookup -type=MX saanpro.com 8.8.8.8` matches the snapshot |
| ☐ | **Send and receive a test email — confirm both directions work** |
| ☐ | Spot-check 5 legacy pages: `/about-us/`, `/products/`, `/solutions/`, `/awards/`, `/contact-us/` |
| ☐ | Client informed that the previous site is restored |

### Note on the old site's certificate

If the old host used a Let's Encrypt certificate with automatic renewal, it may have failed to renew while DNS pointed elsewhere. If the restored site shows a certificate warning, trigger a manual renewal in the old host's control panel — usually a one-click action. This is the most likely friction point in an L2 rollback, and it is the reason DOMAIN_CUTOVER_CHECKLIST §8 says do not cancel the old hosting.

---

## 5. Level 3 — Restore WordPress from backup

Only if the old hosting is unavailable, cancelled or compromised.

| # | Step |
|---|---|
| 1 | Provision hosting matching the recorded stack — PHP version compatible with WordPress 5.5.18 |
| 2 | Upload the file backup from DOMAIN_CUTOVER_CHECKLIST §1 |
| 3 | Create a database and import the `.sql` export |
| 4 | Update `wp-config.php` with the new database credentials |
| 5 | Restore the `.htaccess` file |
| 6 | Verify the site loads on a temporary URL or via a `hosts` file entry **before** changing DNS |
| 7 | Issue an HTTPS certificate on the new host |
| 8 | Point the apex `A` and `www` records at the new host |
| 9 | Run the full §4 verification, including both email checks |
| 10 | Compare against the page screenshots taken in DOMAIN_CUTOVER_CHECKLIST §1 |

**Security note:** WordPress 5.5.18 has been unpatched since 2020. If it must be restored, place it behind a WAF or Cloudflare proxy and treat it as a temporary measure only.

---

## 6. Email-specific rollback

Email failure is the one scenario with no acceptable delay. Execute immediately, without seeking approval.

| # | Step |
|---|---|
| 1 | Open the DNS zone |
| 2 | Compare every `MX` and `TXT` record against `docs/dns-snapshot-YYYY-MM-DD.txt` |
| 3 | Restore any altered or missing record **verbatim**, including priorities and exact string content |
| 4 | Pay particular attention to SPF: there must be **exactly one** SPF `TXT` record. Two SPF records break SPF entirely and cause silent delivery failures. |
| 5 | Save; wait for the record's TTL |
| 6 | Test inbound: send from an external account to a SAAN address |
| 7 | Test outbound: send from a SAAN address to an external account; confirm it is not spam-filed |
| 8 | Check the mail host's queue for messages held during the outage — most retry for 24–72 hours, so mail sent during a short outage is usually recoverable |
| 9 | Inform SAAN of the window during which mail may have been delayed |

---

## 7. Communication

**On deciding to roll back**, tell the client immediately — plainly, without minimising:

> The new website has been rolled back and the previous site is live again. The cause was `<specific cause>`. Email was unaffected / was affected between `<time>` and `<time>`. We will diagnose and propose a revised launch date.

**After rollback**, record: what failed, why, what was missed in pre-launch verification, what test or checklist item now prevents a recurrence, and the revised plan.

Every rollback adds a permanent line to LAUNCH_CHECKLIST.md. A failure that is not converted into a check will happen again.

---

## 8. Preconditions this plan depends on

Verified during DOMAIN_CUTOVER_CHECKLIST, and worth re-reading before the window opens:

| ✅ | Item |
|---|---|
| ☐ | Full WordPress file and database backup, stored in two locations, integrity verified |
| ☐ | Complete DNS snapshot including MX, SPF, DKIM, DMARC, with exact values |
| ☐ | Original apex and `www` record values recorded |
| ☐ | TTL reduced to 300s at least 48 hours before cutover |
| ☐ | Old hosting account active and paid, **not cancelled** |
| ☐ | Registrar and DNS access confirmed working |
| ☐ | Screenshots of all 27 legacy pages |
| ☐ | The person executing has read this document |

**If any precondition is unmet, the cutover does not proceed.** A launch without a working rollback is not a launch, it is a gamble.

---

## 9. Retention

| Asset | Keep for |
|---|---|
| WordPress files and database backup | 12 months minimum |
| DNS snapshot | Permanently, in the project record |
| Old hosting account | 30 days minimum after a successful launch |
| Legacy page screenshots | 12 months |
| Redirect map | Permanently — it stays part of the codebase |
