import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Resources and Guides',
  description:
    'Practical guidance on choosing AV technology: projection versus displays, LED versus LCD video walls, commercial versus consumer screens, and managed AV support.',
  path: '/resources',
});

/**
 * Planned comparison modules.
 *
 * These are listed rather than hidden because they are a commitment we intend
 * to meet in Phase 7, and because the topics themselves tell a visitor what
 * kind of advice to expect from SAAN.
 */
const plannedComparisons = [
  {
    title: 'Projector or professional display?',
    summary:
      'Ambient light, viewing distance, duty cycle and running cost — and the room sizes where each one stops making sense.',
  },
  {
    title: 'LCD video wall or direct-view LED?',
    summary:
      'Where bezels matter, where they do not, and how viewing distance should drive pixel pitch rather than budget.',
  },
  {
    title: 'Consumer television or commercial display?',
    summary:
      'Why a consumer panel fails early in continuous operation, and the cases where it is genuinely the sensible choice.',
  },
  {
    title: 'USB room kit or a dedicated room system?',
    summary:
      'Room size, scheduling, one-touch join and central management — the points at which a laptop-driven room stops scaling.',
  },
  {
    title: 'Cloud signage or on-premise?',
    summary:
      'Network constraints, content approval workflow, multi-site management and what happens when connectivity drops.',
  },
  {
    title: 'One-time installation or managed AV support?',
    summary:
      'What actually goes wrong after handover, and how to work out whether a maintenance contract pays for itself.',
  },
];

export default async function ResourcesPage() {
  const resources = await content.getResources();

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Straight answers about choosing AV technology"
        lead="Practical comparisons written for the people who have to make the decision and justify it — including the cases where the cheaper or simpler option is the right one."
        trail={[{ label: 'Resources', href: '/resources' }]}
      />

      <Section>
        <Container>
          {resources.length === 0 ? (
            <>
              <h2 className="text-h2">Guides in preparation</h2>
              <p className="text-body mt-4 max-w-2xl text-ink-600">
                These comparisons are being written and will be published here.
                If you need an answer to one of them before it appears, ask us —
                we will give you the same answer over the phone.
              </p>

              <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-200 bg-ink-200 md:grid-cols-2">
                {plannedComparisons.map((item) => (
                  <li key={item.title} className="bg-ink-0 p-7">
                    <h3 className="text-h4 font-semibold">{item.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                      {item.summary}
                    </p>
                    <p className="text-eyebrow mt-5 text-ink-500">
                      In preparation
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primary">
                  Ask us directly
                </ButtonLink>
                <ButtonLink href="/solutions" variant="secondary">
                  Explore our solutions
                </ButtonLink>
              </div>
            </>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
