import Link from 'next/link';

import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/section';
import { primaryNavigation } from '@/config/navigation';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Page not found',
  description:
    'The page you were looking for could not be found. Use the links below to reach our solutions, industries, services or contact details.',
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return (
    <Section spacing="xl">
      <Container width="prose">
        <p className="text-eyebrow text-amber-700">Error 404</p>
        <h1 className="text-h1 mt-4">This page could not be found</h1>
        <p className="text-body-lg mt-5 text-ink-600">
          The address may have changed, or the page may have moved. Everything
          on the site is reachable from the links below.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="primary">
            Go to the homepage
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-labelledby="not-found-nav" className="mt-14">
          <h2 id="not-found-nav" className="text-eyebrow text-ink-500">
            Main sections
          </h2>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[2.25rem] items-center text-[1rem] text-ink-700 underline underline-offset-4 transition-colors hover:text-amber-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
