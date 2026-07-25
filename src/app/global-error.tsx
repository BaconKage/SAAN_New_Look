'use client';

import { useEffect } from 'react';

/**
 * Root error boundary.
 *
 * Replaces the entire document when the root layout itself fails, so it cannot
 * rely on the design system, the fonts or any shared component. Styles are
 * inline for that reason.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          fontFamily: 'system-ui, sans-serif',
          color: '#1a1917',
          backgroundColor: '#ffffff',
        }}
      >
        <main style={{ maxWidth: '32rem' }}>
          <h1 style={{ fontSize: '1.75rem', lineHeight: 1.2, margin: 0 }}>
            Something went wrong
          </h1>
          <p
            style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: '#55504a' }}
          >
            The page could not be loaded. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              minHeight: '44px',
              padding: '0.75rem 1.5rem',
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: '#1a1917',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
