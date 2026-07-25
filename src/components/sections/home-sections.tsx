import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { IndustryCard } from '@/components/cards/industry-card';
import { SolutionCard } from '@/components/cards/solution-card';
import { Reveal } from '@/components/interactive/reveal';
import { SolutionExplorer } from '@/components/interactive/solution-explorer';
import { PlaceholderImage } from '@/components/media/placeholder-image';
import { ButtonLink } from '@/components/ui/button';
import { ContentRequiredBlock } from '@/components/ui/content-required';
import { Icon } from '@/components/ui/icon';
import { Container, Section, SectionHeader } from '@/components/ui/section';
import { primaryCta } from '@/config/navigation';
import { placeholderCounts } from '@/content/data/proof';
import type {
  ExplorerOption,
  IndustrySummary,
  ProcessStage,
  ProjectSummary,
  ServiceSummary,
  SolutionSummary,
} from '@/content/schemas';

/* ========================================================================== */
/*                            Solutions overview                              */
/* ========================================================================== */

export function SolutionsOverview({
  solutions,
}: {
  solutions: SolutionSummary[];
}) {
  return (
    <Section aria-labelledby="solutions-heading" surface="default">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="solutions-heading"
            eyebrow="What we deliver"
            title="Complete solutions, not disconnected products"
            lead="Eight areas of capability. Each one covers the design, the installation and the support, because a system only works when all three are handled by the same accountable team."
          />
          <ButtonLink
            href="/solutions"
            variant="secondary"
            className="shrink-0 self-start md:self-auto"
          >
            All solutions
            <ArrowRight
              width={16}
              height={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => (
            <li key={solution.slug} className="contents">
              <Reveal
                as="div"
                delay={(index % 4) as 0 | 1 | 2 | 3}
                className="h-full"
              >
                <SolutionCard solution={solution} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                          Solution explorer section                         */
/* ========================================================================== */

export function ExplorerSection({ options }: { options: ExplorerOption[] }) {
  return (
    <Section aria-labelledby="explorer-heading" surface="subtle">
      <Container>
        <SectionHeader
          id="explorer-heading"
          eyebrow="Start from your requirement"
          title="Tell us what you are planning"
          lead="Pick the requirement closest to your project. We will show you the problems we expect to find, what we do about them, and where it applies — before anyone talks about products."
        />

        <div className="mt-14">
          <SolutionExplorer options={options} />
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                            Industries overview                             */
/* ========================================================================== */

export function IndustriesOverview({
  industries,
}: {
  industries: IndustrySummary[];
}) {
  return (
    <Section aria-labelledby="industries-heading">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="industries-heading"
            eyebrow="Who we work with"
            title="Different sectors, different constraints"
            lead="A hospital cannot pause for an installation. A campus needs forty rooms to behave identically. A hotel reconfigures the same hall twice a day. The design has to start there."
          />
          <ButtonLink
            href="/industries"
            variant="secondary"
            className="shrink-0 self-start md:self-auto"
          >
            All industries
            <ArrowRight
              width={16}
              height={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <li key={industry.slug} className="contents">
              <Reveal
                as="div"
                delay={(index % 4) as 0 | 1 | 2 | 3}
                className="h-full"
              >
                <IndustryCard industry={industry} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                              Delivery process                              */
/* ========================================================================== */

export function DeliveryProcess({ stages }: { stages: ProcessStage[] }) {
  return (
    <Section aria-labelledby="process-heading" surface="dark">
      <Container>
        <SectionHeader
          id="process-heading"
          eyebrow="How we work"
          title="Discover, design, deliver, support"
          lead="The same four stages on every project, whether it is one boardroom or forty classrooms. Each stage produces something you can review and sign off, so nothing is decided in a conversation nobody wrote down."
          tone="inverse"
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-ink-0/10 bg-ink-0/10 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <li key={stage.id} className="bg-ink-950">
              <Reveal
                delay={(index % 4) as 0 | 1 | 2 | 3}
                className="h-full p-7"
              >
                <div className="flex items-center gap-3">
                  <span
                    data-numeric
                    className="font-mono text-[0.8125rem] tracking-widest text-amber-400"
                  >
                    {stage.number}
                  </span>
                  <span
                    className="h-px flex-1 bg-ink-0/15"
                    aria-hidden="true"
                  />
                  <Icon name={stage.icon} size="md" className="text-ink-400" />
                </div>

                <h3 className="text-h3 mt-6 text-ink-0">{stage.title}</h3>

                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
                  {stage.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-ink-0/10 pt-5">
                  {stage.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.65em] h-px w-2.5 shrink-0 bg-amber-400"
                      />
                      {output}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                              Featured projects                             */
/* ========================================================================== */

export function FeaturedProjects({ projects }: { projects: ProjectSummary[] }) {
  const hasProjects = projects.length > 0;

  return (
    <Section aria-labelledby="projects-heading" surface="subtle">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="projects-heading"
            eyebrow="Evidence"
            title="Installations we have delivered"
            lead="Case studies covering the requirement, the constraints, what was installed and what changed afterwards — with the customer named only where we have written permission."
          />
          {hasProjects ? (
            <ButtonLink
              href="/projects"
              variant="secondary"
              className="shrink-0 self-start md:self-auto"
            >
              All projects
              <ArrowRight
                width={16}
                height={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </ButtonLink>
          ) : null}
        </div>

        {hasProjects ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block rounded-lg border border-ink-200 bg-ink-0 p-4 transition-[border-color,box-shadow] hover:border-ink-300 hover:shadow-md"
                >
                  <PlaceholderImage slot={project.image} />
                  <h3 className="text-h4 mt-5 px-2 font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-2 px-2 pb-2 text-[0.9375rem] text-ink-600">
                    {project.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-14">
            {/* The structure is real and working; the content is not invented. */}
            <ul
              aria-hidden="true"
              className="grid grid-cols-1 gap-6 opacity-70 md:grid-cols-3"
            >
              {Array.from({ length: placeholderCounts.featuredProjects }).map(
                (_, index) => (
                  <li
                    key={index}
                    className="rounded-lg border border-ink-200 bg-ink-0 p-4"
                  >
                    <PlaceholderImage
                      slot={{
                        id: `PRJ-featured-${index + 1}-card`,
                        src: null,
                        alt: '',
                        width: 1200,
                        height: 800,
                      }}
                    />
                    <div className="mt-5 space-y-2 px-2 pb-2">
                      <div className="h-4 w-3/4 rounded-xs bg-ink-100" />
                      <div className="h-3 w-full rounded-xs bg-ink-50" />
                      <div className="h-3 w-5/6 rounded-xs bg-ink-50" />
                    </div>
                  </li>
                )
              )}
            </ul>

            <ContentRequiredBlock
              className="mt-8"
              what="Approved customer project details"
              note="The project gallery, filters and case-study template are built and working. Case studies will appear here as soon as SAAN supplies project details, photographs and written permission to publish each customer. No project will be created without them."
            />
          </div>
        )}
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                            Support and lifecycle                           */
/* ========================================================================== */

export function SupportLifecycle({ services }: { services: ServiceSummary[] }) {
  const lifecycleServices = services.filter((service) =>
    [
      'amc-and-preventive-maintenance',
      'technical-support',
      'upgrades-and-lifecycle-management',
      'training-and-handover',
    ].includes(service.slug)
  );

  return (
    <Section aria-labelledby="support-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="support-heading"
              eyebrow="After handover"
              title="The part most suppliers stop caring about"
              lead="A system that works on handover day is the minimum. What matters is whether it still works in three years, and whether there is someone to call when it does not."
            />

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/support" variant="primary">
                Request support
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                All services
              </ButtonLink>
            </div>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-lg border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:col-span-7">
            {lifecycleServices.map((service) => (
              <li key={service.slug} className="bg-ink-0">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors duration-[220ms] hover:bg-ink-25"
                >
                  <Icon
                    name={service.icon}
                    size="lg"
                    className="text-amber-700"
                  />
                  <h3 className="text-h4 mt-4 font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                    {service.outcome}
                  </p>
                  <ul className="mt-5 space-y-1.5 border-t border-ink-100 pt-4">
                    {service.deliverables.slice(0, 2).map((deliverable) => (
                      <li
                        key={deliverable}
                        className="text-[0.8125rem] leading-relaxed text-ink-500"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                                  Partners                                  */
/* ========================================================================== */

export function PartnersSection({ hasPartners }: { hasPartners: boolean }) {
  return (
    <Section aria-labelledby="partners-heading" spacing="md">
      <Container>
        <SectionHeader
          id="partners-heading"
          eyebrow="Technology partners"
          title="We recommend what fits, not what we are pushing"
          lead="We work across manufacturers so the specification follows the requirement. Where a relationship gives us better support, training or lead times, that benefits your project — but it never decides the design."
        />

        {hasPartners ? null : (
          <ContentRequiredBlock
            className="mt-10"
            what="Current authorised partner status"
            note="Partner records, logos and pages are built and gated behind a verification flag: a partner appears on the site only once SAAN confirms the relationship is current and supplies written logo-usage permission. Nothing is shown until then — the previous website carried a manufacturer page for discontinued hardware for six years, and this gate exists to prevent that recurring."
          />
        )}
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                                 Final CTA                                  */
/* ========================================================================== */

export function FinalCta() {
  return (
    <Section aria-labelledby="cta-heading" surface="dark" spacing="lg">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="cta-heading" className="text-h1 text-balance text-ink-0">
              Tell us about the space. We will tell you what it needs.
            </h2>
            <p className="text-body-lg mt-6 max-w-2xl text-ink-300">
              Send us the requirement — a single room, a campus, or an estate
              that needs bringing back under control. We will come back with
              questions worth answering, not a quotation for the first product
              that fits.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
            <ButtonLink
              href={primaryCta.href}
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
            >
              {primaryCta.label}
              <ArrowRight
                width={18}
                height={18}
                strokeWidth={2}
                aria-hidden="true"
              />
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="outlineInverse"
              size="lg"
              className="w-full sm:w-auto"
            >
              Contact us directly
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
