import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { ContentRequiredBlock } from '@/components/ui/content-required';
import { Container, Section } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Projects and Case Studies',
  description:
    'Installations delivered by SAAN across corporate, education, healthcare, retail, hospitality and public sector environments, with the scope and outcome of each.',
  path: '/projects',
});

export default async function ProjectsPage() {
  const projects = await content.getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Work we have delivered"
        lead="Each case study covers the requirement, the constraints we worked around, what was installed and what changed afterwards. Customers are named only where we hold written permission."
        trail={[{ label: 'Projects', href: '/projects' }]}
      />

      <Section>
        <Container>
          {projects.length === 0 ? (
            <>
              <ContentRequiredBlock
                what="Approved customer project details"
                note="The case-study template, the filterable gallery and the content model are built and working. Projects will be published here as SAAN supplies the details, photographs and written permission for each customer — including, where a name cannot be used, an accurate anonymous description such as 'Leading university in Karnataka'. No project will be created without that."
              />

              <div className="mt-12 max-w-2xl">
                <h2 className="text-h3">In the meantime</h2>
                <p className="text-body mt-4 text-ink-600">
                  If you would like to discuss work we have delivered in an
                  environment similar to yours, ask us directly. We can talk
                  through relevant projects and, where the customer agrees,
                  arrange a reference conversation.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/plan-your-project" variant="primary">
                    Plan your project
                  </ButtonLink>
                  <ButtonLink href="/solutions" variant="secondary">
                    Explore our solutions
                  </ButtonLink>
                </div>
              </div>
            </>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
