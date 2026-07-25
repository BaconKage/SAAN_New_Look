import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/section';
import { absoluteUrl } from '@/lib/metadata';

export interface Crumb {
  label: string;
  href: string;
}

/**
 * Breadcrumbs, rendered visually and as BreadcrumbList JSON-LD.
 *
 * The two are generated from the same array, so the structured data can never
 * describe a trail different from the one on screen.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Home', href: '/' }, ...trail].map(
      (crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: absoluteUrl(crumb.href),
      })
    ),
  };

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[0.875rem] text-ink-500">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="transition-colors hover:text-ink-900 hover:underline"
            >
              Home
            </Link>
            <ChevronRight
              width={13}
              height={13}
              strokeWidth={2}
              className="text-ink-300"
              aria-hidden="true"
            />
          </li>
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="text-ink-700">
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-ink-900 hover:underline"
                    >
                      {crumb.label}
                    </Link>
                    <ChevronRight
                      width={13}
                      height={13}
                      strokeWidth={2}
                      className="text-ink-300"
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        // Serialised server-side from a typed object; no user input is involved.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

/**
 * Standard page header: breadcrumbs, eyebrow, H1 and lead.
 *
 * Every page uses this so heading structure is consistent by construction —
 * exactly one H1, always in the same place.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  trail,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  trail: Crumb[];
}) {
  return (
    <div className="border-b border-ink-100 bg-ink-25 py-[var(--section-sm)]">
      <Container>
        <Breadcrumbs trail={trail} />

        <p
          aria-hidden="true"
          className="text-eyebrow mt-8 flex items-center gap-2.5 text-amber-700"
        >
          <span className="inline-block h-px w-6 bg-amber-600/50" />
          {eyebrow}
        </p>

        <h1 className="text-display-2 mt-4 max-w-4xl text-balance">{title}</h1>

        <p className="text-body-lg mt-6 max-w-2xl text-ink-600">{lead}</p>
      </Container>
    </div>
  );
}
