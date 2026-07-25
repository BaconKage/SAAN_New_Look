'use client';

import { useEffect } from 'react';

import { Button, ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/section';

/**
 * Route-level error boundary.
 *
 * The real error is never shown to the visitor. It is logged so it reaches the
 * platform's error reporting, and the visitor is given a way forward — a retry
 * and a phone number, because someone who hit an error on an enquiry page still
 * needs to reach SAAN.
 */
export default function Error({
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
    <Section spacing="xl">
      <Container width="prose">
        <p className="text-eyebrow text-amber-700">Something went wrong</p>
        <h1 className="text-h1 mt-4">This page could not be loaded</h1>
        <p className="text-body-lg mt-5 text-ink-600">
          The problem has been logged. Please try again — and if it keeps
          happening, contact us directly and we will help.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>

        {error.digest ? (
          <p className="mt-10 font-mono text-[0.8125rem] text-ink-500">
            Reference: {error.digest}
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
