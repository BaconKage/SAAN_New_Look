import { SolutionCard } from '@/components/cards/solution-card';
import { Reveal } from '@/components/interactive/reveal';
import { PageHeader } from '@/components/sections/page-header';
import { Container, Section } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'AV Solutions',
  description:
    'Meeting rooms, digital signage, LED and video walls, professional audio, interactive learning, displays, room control and managed AV services from SAAN.',
  path: '/solutions',
});

export default async function SolutionsPage() {
  const solutions = await content.getSolutions();

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Designed around the requirement, not the product list"
        lead="Eight areas of capability. Each covers consultation, system design, installation, commissioning, training and ongoing support — because the parts only work when one team is accountable for all of them."
        trail={[{ label: 'Solutions', href: '/solutions' }]}
      />

      <Section>
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <li key={solution.slug} className="contents">
                <Reveal
                  as="div"
                  delay={(index % 3) as 0 | 1 | 2}
                  className="h-full"
                >
                  {/* h2: these cards sit directly under the page h1. */}
                  <SolutionCard solution={solution} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
