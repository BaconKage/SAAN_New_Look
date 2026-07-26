import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/interactive/reveal';
import { SolutionExplorer } from '@/components/interactive/solution-explorer';
import { PreparingNote } from '@/components/ui/content-required';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Container, Section, SectionHeader } from '@/components/ui/section';
import { primaryCta } from '@/config/navigation';
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

/**
 * Deliberately not eight identical cards.
 *
 * The first two solutions are given weight as feature panels; the remaining six
 * are a dense index. That creates hierarchy — a visitor's eye lands somewhere
 * rather than scanning a uniform grid — and it removes roughly a third of the
 * section's height, which matters most on a phone.
 */
export function SolutionsOverview({
  solutions,
}: {
  solutions: SolutionSummary[];
}) {
  const featured = solutions.slice(0, 2);
  const rest = solutions.slice(2);

  return (
    <Section aria-labelledby="solutions-heading" surface="default">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="solutions-heading"
            eyebrow="What we deliver"
            title="Complete solutions, not disconnected products"
            lead="Eight areas of capability. Each covers the design, the installation and the support, because a system only works when one team is accountable for all three."
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

        {/* Two feature panels */}
        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {featured.map((solution, index) => (
            <li key={solution.slug} className="contents">
              <Reveal as="div" delay={index as 0 | 1} className="h-full">
                <article className="group relative flex h-full flex-col rounded-lg border border-ink-200 bg-ink-25 p-7 transition-[border-color,background-color] duration-[220ms] hover:border-ink-300 hover:bg-ink-0 sm:p-9">
                  <span className="grid size-12 place-items-center rounded-md border border-ink-200 bg-ink-0 text-amber-700 transition-colors duration-[220ms] group-hover:border-amber-300 group-hover:bg-amber-50">
                    <Icon name={solution.icon} size="lg" />
                  </span>

                  <h3 className="text-h2 mt-7">
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {solution.title}
                    </Link>
                  </h3>

                  <p className="text-body-lg mt-3 font-medium text-amber-700">
                    {solution.outcome}
                  </p>

                  <p className="text-body mt-5 flex-1 text-ink-600">
                    {solution.summary}
                  </p>

                  <ul className="mt-7 grid gap-2 border-t border-ink-200 pt-6 sm:grid-cols-2">
                    {solution.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink-600"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.65em] h-px w-2.5 shrink-0 bg-amber-500"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink-900">
                    Explore this solution
                    <ArrowUpRight
                      width={16}
                      height={16}
                      strokeWidth={2}
                      className="transition-transform duration-[220ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Remaining six as an index, not cards */}
        <ul className="mt-5 grid grid-cols-1 border-t border-ink-200 md:grid-cols-2 md:gap-x-14">
          {rest.map((solution, index) => (
            <li key={solution.slug} className="border-b border-ink-200">
              <Link
                href={`/solutions/${solution.slug}`}
                className="group flex items-start gap-5 py-6 transition-colors"
              >
                <span
                  data-numeric
                  className="mt-1 shrink-0 font-mono text-[0.8125rem] tracking-widest text-ink-500 transition-colors group-hover:text-amber-700"
                >
                  {String(index + 3).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[1.0625rem] font-medium text-ink-900 transition-colors group-hover:text-amber-700">
                    {solution.title}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-600">
                    {solution.outcome}
                  </span>
                </span>
                <ArrowRight
                  width={17}
                  height={17}
                  strokeWidth={2}
                  className="mt-1.5 shrink-0 text-ink-300 transition-[transform,color] duration-[220ms] group-hover:translate-x-1 group-hover:text-ink-900"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                             What we evaluate                               */
/* ========================================================================== */

/**
 * The technical-credibility band.
 *
 * Names the things an experienced integrator checks before specifying, in
 * plain language. It is the clearest signal on the homepage that SAAN designs
 * systems rather than supplying equipment, and it costs one screen of height.
 */
const evaluationCriteria = [
  {
    title: 'Room size and seating',
    description:
      'Where people actually sit sets display size, camera framing and how many microphones a room needs.',
  },
  {
    title: 'Viewing distance',
    description:
      'The furthest seat and the smallest text people must read decide screen size and pixel pitch — not the wall.',
  },
  {
    title: 'Ambient light',
    description:
      'Daylight and lighting design determine display brightness. It is the most common reason an image is unreadable.',
  },
  {
    title: 'Acoustics and noise floor',
    description:
      'Hard surfaces and air-conditioning noise set the practical limit on microphone gain and speech clarity.',
  },
  {
    title: 'Platform compatibility',
    description:
      'Teams, Zoom and Meet each impose different room-device, licensing and management requirements.',
  },
  {
    title: 'Network readiness',
    description:
      'Addressing, bandwidth and firewall rules are agreed with your IT team during design, not on installation day.',
  },
  {
    title: 'Service access',
    description:
      'Whether a device can be reached for maintenance without scaffolding, planned before it is mounted.',
  },
  {
    title: 'Equipment lifecycle',
    description:
      'When each part of the system should be planned for replacement, so budgets are prepared rather than surprised.',
  },
];

export function EvaluationBand() {
  return (
    <Section aria-labelledby="evaluate-heading" surface="subtle" spacing="md">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              id="evaluate-heading"
              eyebrow="How we specify"
              title="What we look at before recommending anything"
              lead="Every room is different. We study the space, the way people work in it, the platforms in use, the acoustics, the lighting, the network and the long-term support needs before a product is named."
            />
          </div>

          <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:col-span-8">
            {evaluationCriteria.map((criterion) => (
              <li
                key={criterion.title}
                className="border-t border-ink-200 pt-5"
              >
                <h3 className="text-[1rem] font-medium text-ink-900">
                  {criterion.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  {criterion.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                          Solution explorer section                         */
/* ========================================================================== */

export function ExplorerSection({ options }: { options: ExplorerOption[] }) {
  return (
    <Section aria-labelledby="explorer-heading" surface="default">
      <Container>
        <SectionHeader
          id="explorer-heading"
          eyebrow="Start from your requirement"
          title="Tell us what you are planning"
          lead="Pick the requirement closest to your project. We will show you the problems we expect to find, what we would assess, and what SAAN does about them — before anyone talks about products."
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

/**
 * An index rather than seven cards.
 *
 * Sectors are a filter, not a product — a dense, scannable list respects that
 * and avoids a second card grid immediately after the solutions section.
 */
export function IndustriesOverview({
  industries,
}: {
  industries: IndustrySummary[];
}) {
  return (
    <Section aria-labelledby="industries-heading" surface="subtle">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              id="industries-heading"
              eyebrow="Who we work with"
              title="Different sectors, different constraints"
              lead="A hospital cannot pause for an installation. A campus needs forty rooms to behave identically. A hotel reconfigures the same hall twice a day. The design has to start there."
            />
            <div className="mt-9">
              <ButtonLink href="/industries" variant="secondary">
                All industries
                <ArrowRight
                  width={16}
                  height={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </ButtonLink>
            </div>
          </div>

          <ul className="border-t border-ink-200 lg:col-span-8">
            {industries.map((industry) => (
              <li key={industry.slug} className="border-b border-ink-200">
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex items-start gap-5 py-6"
                >
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-0 text-amber-700 transition-colors duration-[220ms] group-hover:border-amber-300 group-hover:bg-amber-50">
                    <Icon name={industry.icon} size="sm" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.0625rem] font-medium text-ink-900 transition-colors group-hover:text-amber-700">
                      {industry.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-600">
                      {industry.outcome}
                    </span>
                    <span className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-ink-500">
                      {industry.environments.slice(0, 3).map((environment) => (
                        <span key={environment}>{environment}</span>
                      ))}
                    </span>
                  </span>
                  <ArrowRight
                    width={17}
                    height={17}
                    strokeWidth={2}
                    className="mt-1.5 shrink-0 text-ink-300 transition-[transform,color] duration-[220ms] group-hover:translate-x-1 group-hover:text-ink-900"
                    aria-hidden="true"
                  />
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

        <ol className="relative mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Connector: shows the four stages as one continuous sequence
              rather than four unrelated boxes. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-[0.6rem] hidden h-px bg-ink-0/15 lg:block"
          />

          {stages.map((stage, index) => (
            <li key={stage.id} className="relative">
              <Reveal delay={(index % 4) as 0 | 1 | 2 | 3}>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="size-[0.4rem] shrink-0 rounded-full bg-amber-400 ring-4 ring-ink-950"
                  />
                  <span
                    data-numeric
                    className="font-mono text-[0.8125rem] tracking-widest text-amber-400"
                  >
                    {stage.number}
                  </span>
                  <Icon
                    name={stage.icon}
                    size="sm"
                    className="ml-auto text-ink-500"
                  />
                </div>

                <h3 className="text-h3 mt-6 text-ink-0">{stage.title}</h3>

                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
                  {stage.description}
                </p>

                <ul className="mt-6 space-y-2">
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
/*                       Support, lifecycle and evidence                      */
/* ========================================================================== */

export function SupportLifecycle({
  services,
  hasProjects,
}: {
  services: ServiceSummary[];
  hasProjects: boolean;
}) {
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

            {/* Restrained evidence treatment — below the primary sales
                content, never a warning panel. */}
            {hasProjects ? null : (
              <PreparingNote className="mt-10">
                Selected project stories are being prepared for publication.
              </PreparingNote>
            )}
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

/* Kept for the case where approved projects exist. */
export function FeaturedProjects({ projects }: { projects: ProjectSummary[] }) {
  if (projects.length === 0) return null;

  return (
    <Section aria-labelledby="projects-heading" surface="subtle">
      <Container>
        <SectionHeader
          id="projects-heading"
          eyebrow="Evidence"
          title="Installations we have delivered"
          lead="Case studies covering the requirement, the constraints we worked around and what changed afterwards."
        />
        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block rounded-lg border border-ink-200 bg-ink-0 p-4 transition-[border-color,box-shadow] hover:border-ink-300 hover:shadow-md"
              >
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
      </Container>
    </Section>
  );
}

/* ========================================================================== */
/*                                  Partners                                  */
/* ========================================================================== */

export function PartnersSection({ hasPartners }: { hasPartners: boolean }) {
  return (
    <Section aria-labelledby="partners-heading" surface="subtle" spacing="md">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="partners-heading"
              eyebrow="Technology partners"
              title="We recommend what fits, not what we are pushing"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="text-body-lg text-ink-700">
              SAAN evaluates technologies according to the room, workflow,
              platform, budget and support requirement. Final product selection
              follows requirement analysis and technical design.
            </p>
            <p className="text-body mt-5 text-ink-600">
              Working across manufacturers is deliberate. Where a relationship
              gives us better support, training or lead times, that benefits
              your project — but it never decides the design.
            </p>
            {hasPartners ? null : (
              <PreparingNote className="mt-7">
                Technology partner details are being verified for publication.
              </PreparingNote>
            )}
          </div>
        </div>
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
