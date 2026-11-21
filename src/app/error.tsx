'use client';

import Link from 'next/link';
import { useEffect } from 'react';

/** Branded fallback if a page throws while rendering. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[100dvh] items-center bg-ink-950 pt-[var(--header-h)]">
      <div className="led-field pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative">
        <h1 className="display max-w-[16ch] text-[clamp(2.6rem,5.5vw,5rem)] text-fog-50">Signal interrupted.</h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-fog-400">Something went wrong loading this page. Try again, or head back to the home page.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center rounded-full bg-signal-500 px-6 font-medium text-ink-950 transition-colors hover:bg-signal-400"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 font-medium text-fog-50 transition-colors hover:bg-white/5">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
