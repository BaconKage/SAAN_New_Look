import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import {
  ContentRequiredBlock,
  PreparingNote,
} from '@/components/ui/content-required';
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
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="text-h2">
                  Selected project stories are being prepared for publication
                </h2>
                <p className="text-body mt-6 text-ink-600">
                  We publish a case study only when the customer has approved
                  what it says. That takes longer than writing one, and it is
                  the reason there is nothing invented on this page.
                </p>
                <p className="text-body mt-5 text-ink-600">
                  If you want to understand how we would approach a space like
                  yours, the fastest route is a conversation. We can talk
                  through comparable work, explain the decisions we made and
                  why, and — where the customer agrees — arrange a reference
                  call.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href="/plan-your-project" variant="primary">
                    Plan your project
                  </ButtonLink>
                  <ButtonLink href="/solutions" variant="secondary">
                    Explore our solutions
                  </ButtonLink>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-lg border border-ink-200 bg-ink-25 p-7">
                  <h2 className="text-h4 font-semibold">
                    What each case study will cover
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {[
                      'The requirement, in the customer’s own terms',
                      'Constraints we worked around on site',
                      'What was designed, supplied and commissioned',
                      'How the handover and training were run',
                      'The support arrangement afterwards',
                      'What measurably changed',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-px w-3 shrink-0 bg-amber-500"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <PreparingNote className="mt-7">
                    Customers are named only where written permission has been
                    given.
                  </PreparingNote>
                </div>
              </div>

              <div className="lg:col-span-12">
                <ContentRequiredBlock
                  what="Approved customer project details"
                  note="The case-study template, the filterable gallery and the content model are built and working. Projects publish as SAAN supplies details, photographs and written permission — including an accurate anonymous label where a name cannot be used."
                />
              </div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
