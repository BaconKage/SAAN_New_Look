import { Container, Section } from '@/components/ui/section';

/**
 * Route loading state.
 *
 * A neutral skeleton at the real content dimensions rather than a spinner, so
 * nothing shifts when the content arrives. Announced politely so screen-reader
 * users are told the page is loading instead of hearing silence.
 */
export default function Loading() {
  return (
    <Section spacing="xl">
      <Container>
        <div role="status" aria-live="polite">
          <span className="sr-only">Loading page content</span>

          <div aria-hidden="true" className="max-w-3xl">
            <div className="h-3 w-28 rounded-xs bg-ink-100" />
            <div className="mt-6 h-10 w-full rounded-sm bg-ink-100" />
            <div className="mt-3 h-10 w-4/5 rounded-sm bg-ink-100" />
            <div className="mt-8 h-4 w-full rounded-xs bg-ink-50" />
            <div className="mt-3 h-4 w-11/12 rounded-xs bg-ink-50" />
            <div className="mt-3 h-4 w-3/4 rounded-xs bg-ink-50" />
          </div>

          <div
            aria-hidden="true"
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="aspect-3/2 rounded-md border border-ink-100 bg-ink-25"
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
