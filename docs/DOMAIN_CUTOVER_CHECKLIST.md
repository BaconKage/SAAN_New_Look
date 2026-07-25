# Domain Cutover Checklist

> **STOP.** Do not begin this checklist until the client has given **explicit written approval** to go live, and LAUNCH_CHECKLIST.md is fully signed off.
>
> **The single greatest risk in this procedure is breaking email.** `saanpro.com` almost certainly carries live business email. Changing the wrong record — or changing nameservers — silently stops mail delivery, and the failure is often not noticed for hours. Every step below is written to protect MX, SPF, DKIM and DMARC.

**Golden rule:** only `A`, `AAAA` and `CNAME` records for the web host are modified. **Nothing else. Nameservers are not changed.**

---

## Section 0 — Preconditions

| ✅ | Item |
|---|---|
| ☐ | Written client approval to proceed with cutover, dated and recorded |
| ☐ | LAUNCH_CHECKLIST.md fully signed off |
| ☐ | Registrar / DNS control-panel access confirmed working *before* the day |
| ☐ | Hosting control-panel access for the current WordPress site confirmed |
| ☐ | ROLLBACK_PLAN.md read by whoever is executing, and understood |
| ☐ | A named person is available for the full window and for 2 hours afterwards |
| ☐ | The client knows the window and has someone reachable |

**Timing.** Schedule for a low-traffic window — an Indian business audience means early morning IST or a weekend. Avoid Friday evening: if something breaks, nobody is available to fix it. Allow a 4-hour window even though the active work takes about 30 minutes.

---

## Section 1 — Back up the current website

| ✅ | Item | Notes |
|---|---|---|
| ☐ | Full file backup of the WordPress installation | Download and verify the archive opens |
| ☐ | Full database export (`.sql`) | Verify it is non-zero and contains the `wp_posts` table |
| ☐ | Backup stored in **two** locations | One must be off the current host |
| ☐ | Backup archive integrity verified | Actually open it — do not trust the file size |
| ☐ | Screenshots of all 27 pages, desktop and mobile | Visual reference for verifying the rollback |
| ☐ | Copy of `.htaccess` | May contain redirect or security rules not visible elsewhere |
| ☐ | Note the exact WordPress and PHP versions | Needed if the site must be restored elsewhere |
| ☐ | Hosting account details recorded — plan, renewal date, control panel | Do **not** cancel hosting. See Section 8. |

---

## Section 2 — Record current DNS in full

Export the complete zone before touching anything. Save it as `docs/dns-snapshot-YYYY-MM-DD.txt` **outside** the repository if it contains anything sensitive.

Record every record type: `A`, `AAAA`, `CNAME`, **`MX`**, **`TXT` (SPF, DKIM, DMARC, verification tokens)**, `NS`, `SRV`, `CAA`.

```bash
nslookup -type=A saanpro.com 8.8.8.8
nslookup -type=A www.saanpro.com 8.8.8.8
nslookup -type=MX saanpro.com 8.8.8.8
nslookup -type=TXT saanpro.com 8.8.8.8
nslookup -type=TXT _dmarc.saanpro.com 8.8.8.8
nslookup -type=NS saanpro.com 8.8.8.8
nslookup -type=CAA saanpro.com 8.8.8.8
```

| ✅ | Item |
|---|---|
| ☐ | Full zone exported from the registrar / DNS provider and saved |
| ☐ | Screenshot of the DNS management screen taken |
| ☐ | **MX records recorded verbatim, with priorities** |
| ☐ | **SPF `TXT` record recorded verbatim** |
| ☐ | **DKIM `TXT` record(s) recorded verbatim, including selector names** |
| ☐ | **DMARC `TXT` record at `_dmarc` recorded verbatim** |
| ☐ | Any domain-verification `TXT` records recorded (Google, Microsoft, Facebook) |
| ☐ | Current TTL values noted per record |
| ☐ | Where email is actually hosted, confirmed and written down |
| ☐ | Current `A` record IP for apex and `www` recorded — **needed for rollback** |

---

## Section 3 — Reduce TTL (48 hours before cutover)

Do this **two days** before. It is the difference between a 5-minute rollback and a 24-hour one.

| ✅ | Item |
|---|---|
| ☐ | Lower TTL on the apex `A` record to 300 seconds |
| ☐ | Lower TTL on the `www` record to 300 seconds |
| ☐ | **Do not change TTL on MX or TXT records** — leave email records entirely alone |
| ☐ | Wait at least the *original* TTL (often 3600–86400s) for the change to propagate |
| ☐ | Re-verify with `nslookup` that the new TTL is being served |

---

## Section 4 — Prepare production hosting (no DNS change yet)

| ✅ | Item |
|---|---|
| ☐ | Production deployment built from `main` and verified on its Vercel URL |
| ☐ | `saanpro.com` and `www.saanpro.com` added as domains in Vercel (unverified is expected at this stage) |
| ☐ | The exact target records Vercel requires are recorded |
| ☐ | `NEXT_PUBLIC_SITE_URL` set to the canonical host |
| ☐ | `NEXT_PUBLIC_SITE_ENV=production` |
| ☐ | All production environment variables set, including real enquiry destination addresses |
| ☐ | Deployment protection **disabled** for production (it must be public) |
| ☐ | Canonical host decision confirmed in writing (CONTENT_TODO 1.2) |
| ☐ | Redirect from the non-canonical host configured |

---

## Section 5 — The DNS change

Change **only** these records. Touch nothing else.

| ✅ | Item |
|---|---|
| ☐ | Note the exact time the change is made |
| ☐ | Update the apex `A` record (or `ALIAS`/`ANAME`) to the new host's target |
| ☐ | Update the `www` `CNAME` to the new host's target |
| ☐ | Remove any stale `A` record for `www` that would conflict |
| ☐ | Add the `CAA` record required by the new host's certificate authority, if a `CAA` record already exists |
| ☐ | **MX records: unchanged — verify visually before saving** |
| ☐ | **SPF `TXT`: unchanged — verify visually before saving** |
| ☐ | **DKIM `TXT`: unchanged — verify visually before saving** |
| ☐ | **DMARC `TXT`: unchanged — verify visually before saving** |
| ☐ | **Nameservers: unchanged** |
| ☐ | Verification `TXT` records: unchanged |
| ☐ | Save, and screenshot the resulting zone |

> ⚠️ If the DNS provider offers a "point domain to host" wizard that rewrites the whole zone, **do not use it.** Edit individual records by hand. These wizards routinely delete MX records.

---

## Section 6 — Immediate verification (within 30 minutes)

### 6.1 Email — check this FIRST, before anything else

| ✅ | Check |
|---|---|
| ☐ | `nslookup -type=MX saanpro.com 8.8.8.8` returns **exactly** what Section 2 recorded |
| ☐ | `nslookup -type=TXT saanpro.com 8.8.8.8` returns the same SPF record |
| ☐ | `nslookup -type=TXT _dmarc.saanpro.com 8.8.8.8` unchanged |
| ☐ | DKIM selector record unchanged |
| ☐ | **Send a test email from an external account to a real SAAN address — confirm receipt** |
| ☐ | **Send a test email from a SAAN address outward — confirm receipt and that it is not marked as spam** |

**If any email check fails, stop and revert the DNS change immediately.** Email outage takes absolute priority over the website launch.

### 6.2 Website

| ✅ | Check |
|---|---|
| ☐ | `https://saanpro.com` loads the new site |
| ☐ | `https://www.saanpro.com` behaves per the canonical decision |
| ☐ | `http://` on both hosts redirects to `https://` |
| ☐ | HTTPS certificate is valid, correct hostnames, not expired |
| ☐ | No mixed-content warnings in the browser console |
| ☐ | Homepage renders correctly, hero image loads |
| ☐ | `nslookup -type=A saanpro.com 8.8.8.8` returns the new target |

---

## Section 7 — Full verification (within 2 hours)

### 7.1 Pages
☐ All 31 fixed pages load and return 200 · ☐ project, partner and resource pages load · ☐ `/404` renders for an unknown URL · ☐ navigation works on desktop and mobile · ☐ no console errors on any page

### 7.2 Redirects — every legacy URL
Run the automated suite against production: `npm run test:redirects -- --base=https://saanpro.com`

☐ All 27 legacy URLs return a single 301 to the correct destination · ☐ no redirect chains longer than one hop · ☐ no redirect loops · ☐ trailing-slash URLs redirect correctly · ☐ `/wp-admin/`, `/wp-json/`, `/xmlrpc.php` return 404 · ☐ `/wp-sitemap.xml` → `/sitemap.xml`

### 7.3 Forms — the highest-consequence check
☐ Submit a real "Plan Your Project" enquiry · ☐ **confirm it arrives in the SAAN inbox** (check spam) · ☐ reference number generated and shown · ☐ submit a real support request · ☐ **confirm it arrives at the support address** · ☐ file upload works · ☐ validation errors display correctly · ☐ rate limiting triggers as designed · ☐ click-to-call opens the dialler on mobile · ☐ WhatsApp link opens the correct number · ☐ email links use the correct addresses

### 7.4 SEO
☐ `https://saanpro.com/robots.txt` is correct and **not** blocking · ☐ `/sitemap.xml` loads and contains only intended URLs · ☐ canonical tags point at the canonical host · ☐ **staging is still `noindex`** · ☐ JSON-LD validates in the Rich Results Test · ☐ OG image renders in a social debugger

### 7.5 Performance and accessibility
☐ Lighthouse on production: Perf ≥90, A11y ≥95, BP ≥95, SEO ≥95 · ☐ LCP ≤2.5s on a real mobile device · ☐ CLS ≤0.1 · ☐ tested on an actual mid-range Android phone over mobile data, not just a throttled desktop

### 7.6 Search Console
☐ Property verified for the canonical host · ☐ `/sitemap.xml` submitted · ☐ indexing requested for `/` and all 8 solution pages · ☐ the old `wp-sitemap.xml` removed from the property

---

## Section 8 — Aftercare

| ✅ | Item |
|---|---|
| ☐ | **Keep the old hosting account active for at least 30 days.** Do not cancel it — it is the rollback target. |
| ☐ | Do not delete the WordPress files or database for at least 90 days |
| ☐ | Restore original TTLs after 7 stable days |
| ☐ | Monitor Search Console coverage daily for 14 days |
| ☐ | Review 404 logs daily for 7 days, then weekly for 8 weeks |
| ☐ | **Test-submit both forms daily for the first week** |
| ☐ | Confirm email is still flowing at 24 hours and at 7 days |
| ☐ | Watch organic traffic against the pre-launch baseline; a dip in weeks 1–6 is expected |
| ☐ | Rollback trigger: >40% organic decline still present at day 21 |
| ☐ | Client informed that launch is complete, with what to watch for |

---

## Section 9 — Emergency contacts

Fill in before the cutover window opens.

```
Domain registrar          ____________________  login: ____________
DNS provider              ____________________  login: ____________
Current web host          ____________________  login: ____________
Email host                ____________________  login: ____________
New host (Vercel)         ____________________  login: ____________
SAAN primary contact      ____________________  phone: ____________
SAAN technical contact    ____________________  phone: ____________
Executing engineer        ____________________  phone: ____________
```

---

## Section 10 — Abort criteria

Stop and roll back immediately if any of the following occurs:

1. **Email stops flowing** — absolute, no discussion
2. The HTTPS certificate does not issue within 60 minutes
3. The homepage does not load correctly after DNS propagates
4. Either enquiry form fails to deliver
5. More than 10% of legacy URLs fail their redirect test
6. Any critical accessibility or functional regression appears only in production

Rolling back is cheap and reversible. Leaving a broken site live is not. **When in doubt, roll back and diagnose afterwards.**
