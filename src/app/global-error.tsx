'use client';

/** Last-resort fallback when the root layout itself fails. Inline styles only. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#08090b', color: '#f4f3f0', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ padding: 24, maxWidth: 520 }}>
          <p style={{ color: '#e08a00', fontWeight: 800, fontStyle: 'italic', fontSize: 28, margin: 0 }}>SAAN</p>
          <h1 style={{ fontSize: 40, lineHeight: 1.05, margin: '24px 0 12px' }}>Signal interrupted.</h1>
          <p style={{ color: '#a5a6aa', lineHeight: 1.6, margin: 0 }}>Something went wrong. Reload the page, or call us on +91 93426 59932.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 28, height: 48, padding: '0 24px', borderRadius: 999, border: 0, background: '#e08a00', color: '#08090b', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
