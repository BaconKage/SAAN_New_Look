import type { Faq } from '@/content/schemas';
import { Container, Section, SectionHeader } from '@/components/ui/section';

/**
 * FAQ section.
 *
 * Uses native `<details>`/`<summary>` rather than a scripted accordion: it is
 * keyboard-operable, screen-reader-correct and searchable in-page for free,
 * with no client JavaScript at all.
 *
 * Emits `FAQPage` structured data from the same array that renders on screen,
 * so the markup can never describe questions a visitor cannot see — the
 * condition Google actually requires.
 */
export function Faqs({
  faqs,
  eyebrow = 'Questions',
  title,
  pageUrl,
}: {
  faqs: Faq[];
  eyebrow?: string;
  title: string;
  pageUrl: string;
}) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <Section aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader id="faq-heading" eyebrow={eyebrow} title={title} />
          </div>

          {/*
            Not a <dl>. A description list requires <dt>/<dd> as direct
            children of <dl> (or of a wrapping <div>); putting <details>
            between them is invalid and axe reports it as broken list
            semantics. The disclosure pattern already conveys the
            question/answer relationship correctly.
          */}
          <div className="border-t border-ink-200 lg:col-span-8">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-ink-200"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-medium text-ink-900">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="relative mt-2 size-3.5 shrink-0"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink-500" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink-500 transition-transform duration-[220ms] group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="text-body max-w-3xl pb-7 pr-10 text-ink-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>

      <script
        type="application/ld+json"
        // Serialised server-side from typed content; no user input involved.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
