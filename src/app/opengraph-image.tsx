import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/site';

/**
 * Default Open Graph image.
 *
 * Generated at build time rather than referencing a static file, because the
 * only brand asset available is a low-resolution PNG wordmark containing a
 * typo. This renders the wordmark in type on SAAN's own amber-and-ink palette:
 * no fabricated imagery, no broken URL, and it is replaced the moment SAAN
 * supplies the approved asset (docs/IMAGE_REQUIREMENTS.md, BRD-05).
 *
 * System fonts only — no network fetch during the build.
 */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${siteConfig.displayName} — professional AV systems integration`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0e0d0c',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span
          style={{
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#ffffff',
          }}
        >
          {siteConfig.displayName}
        </span>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 3,
            backgroundColor: '#e38700',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: 62,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: 960,
          }}
        >
          Technology spaces that work
        </span>
        <span
          style={{
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.4,
            color: '#bfbab3',
            maxWidth: 900,
          }}
        >
          Professional AV, digital signage, display and meeting-room systems —
          designed, integrated and supported.
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ width: 56, height: 3, backgroundColor: '#e38700' }} />
        <span style={{ fontSize: 24, color: '#948d84' }}>
          {siteConfig.address.locality}, {siteConfig.address.region}
        </span>
      </div>
    </div>,
    size
  );
}
