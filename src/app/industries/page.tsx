import { IndustryCard } from '@/components/cards/industry-card';
import { Reveal } from '@/components/interactive/reveal';
import { PageHeader } from '@/components/sections/page-header';
import { Container, Section } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Industries We Serve',
  description:
    'AV and display systems for corporate, education, healthcare, retail, hospitality, manufacturing, and government organisations, designed around each sector.',
  path: '/industries',
});

export default async function IndustriesPage() {
  const industries = await content.getIndustries();

  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="The constraints differ. So does the design."
        lead="A hospital cannot pause for an installation. A campus needs forty rooms to behave identically. A hotel reconfigures the same hall twice a day. Understanding that is where a good system starts."
        trail={[{ label: 'Industries', href: '/industries' }]}
      />

      <Section>
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <li key={industry.slug} className="contents">
                <Reveal
                  as="div"
                  delay={(index % 3) as 0 | 1 | 2}
                  className="h-full"
                >
                  {/* h2: these cards sit directly under the page h1. */}
                  <IndustryCard industry={industry} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
