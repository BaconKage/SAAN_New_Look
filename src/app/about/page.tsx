import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import {
  ContentRequired,
  PreparingNote,
} from '@/components/ui/content-required';
import { Container, Section, SectionHeader } from '@/components/ui/section';
import { siteConfig } from '@/config/site';
import { content } from '@/content/source';
import { hasValue, isPublic } from '@/lib/content-required';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'About SAAN',
  description:
    'SAAN is an engineering-led AV systems integrator in Bengaluru, designing, installing, commissioning and supporting professional audio-visual systems since 2007.',
  path: '/about',
});

export default async function AboutPage() {
  const stages = await content.getProcessStages();
  const founded = siteConfig.foundedYear;

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An engineering business that happens to work in AV"
        lead="We design, integrate and support professional audio-visual systems for organisations where the room has to work â€” not occasionally, but every time someone walks into it."
        trail={[{ label: 'About', href: '/about' }]}
      />

      <Section>
        <Container width="prose" className="!px-0">
          <div className="container-prose">
            <h2 className="text-h2">Where we come from</h2>

            <p className="text-body-lg mt-6 text-ink-700">
              {hasValue(founded) ? (
                <>SAAN has operated from Bengaluru since {founded.value}. </>
              ) : null}
              Our roots in test, measurement, enterprise IT and electronic
              technologies created the engineering discipline that now informs
              how we design, integrate, commission and support professional AV
              systems.
            </p>
            <ContentRequired className="mt-4" what="Confirmed founding year" />

            <p className="text-body mt-6 text-ink-600">
              That background shows up in unglamorous ways. We document before
              we install. We measure instead of assuming. We commission against
              a written test plan rather than a demonstration. And we assume
              that somebody other than us will have to maintain the system in
              five years, so we leave them the drawings, the labels and the
              configuration to do it with.
            </p>

            <h2 className="text-h2 mt-16">What we actually do</h2>

            <p className="text-body mt-6 text-ink-600">
              We take responsibility for the whole chain: understanding the
              requirement, surveying the site, designing the system, supplying
              and installing it, integrating and commissioning it, training the
              people who will use it, and supporting it afterwards. Where a
              project needs coordination with architects, consultants,
              electrical contractors or IT teams, that coordination is part of
              our job rather than something handed back to you.
            </p>

            <p className="text-body mt-6 text-ink-600">
              We work across manufacturers deliberately. A specification that
              starts from a brand is a specification written backwards. We would
              rather tell you that a simpler display beats the projector you
              asked about, or that half your existing equipment is fine and only
              the control layer needs replacing, than sell you a larger project
              you did not need.
            </p>
          </div>
        </Container>
      </Section>

      <Section surface="subtle">
        <Container>
          <SectionHeader
            eyebrow="How we work"
            title="Four stages, on every project"
            lead="Whether it is one boardroom or forty classrooms, the sequence is the same and each stage produces something you can review before the next one starts."
          />

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => (
              <li
                key={stage.id}
                className="rounded-lg border border-ink-200 bg-ink-0 p-6"
              >
                <span
                  data-numeric
                  className="font-mono text-[0.8125rem] tracking-widest text-amber-700"
                >
                  {stage.number}
                </span>
                <h3 className="text-h4 mt-4 font-semibold">{stage.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  {stage.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="How we are set up"
                title="Engineering-led, deliberately small at the top"
              />
              <p className="text-body mt-6 text-ink-600">
                The people who survey your site are the people who design the
                system and who you will speak to during commissioning. Projects
                are not handed between a sales team and a delivery team that
                have never met each other.
              </p>
              <p className="text-body mt-5 text-ink-600">
                That has a practical consequence: we take on work we can staff
                properly. If a programme needs more capacity than we can commit,
                we will say so at the requirement stage rather than at
                installation.
              </p>
              <PreparingNote className="mt-7">
                Team profiles are being prepared for publication.
              </PreparingNote>
              <ContentRequired
                className="mt-5"
                what="Leadership names, roles and photographs"
              />
            </div>

            <div>
              <SectionHeader
                eyebrow="Registered entity"
                title="Company details"
              />
              <dl className="mt-8 space-y-4 text-[0.9375rem]">
                <div className="flex flex-wrap gap-x-3 border-b border-ink-100 pb-4">
                  <dt className="w-36 shrink-0 text-ink-500">Legal name</dt>
                  <dd className="text-ink-900">{siteConfig.legalName}</dd>
                </div>
                <div className="flex flex-wrap gap-x-3 border-b border-ink-100 pb-4">
                  <dt className="w-36 shrink-0 text-ink-500">
                    Registered office
                  </dt>
                  <dd className="text-ink-900">
                    {siteConfig.address.line1}, {siteConfig.address.line2},{' '}
                    {siteConfig.address.locality}{' '}
                    {siteConfig.address.postalCode}
                  </dd>
                </div>
                {isPublic(siteConfig.registration.cin) ? (
                  <div className="flex flex-wrap gap-x-3 border-b border-ink-100 pb-4">
                    <dt className="w-36 shrink-0 text-ink-500">CIN</dt>
                    <dd className="text-ink-900" data-numeric>
                      {siteConfig.registration.cin.value}
                    </dd>
                  </div>
                ) : null}
                {isPublic(siteConfig.registration.gstin) ? (
                  <div className="flex flex-wrap gap-x-3">
                    <dt className="w-36 shrink-0 text-ink-500">GSTIN</dt>
                    <dd className="text-ink-900" data-numeric>
                      {siteConfig.registration.gstin.value}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-5 flex flex-col items-start gap-2 empty:hidden">
                <ContentRequired what="Company CIN" />
                <ContentRequired what="Company GSTIN" />
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-3">
            <ButtonLink href="/plan-your-project" variant="primary">
              Plan your project
            </ButtonLink>
            <ButtonLink href="/recognition" variant="secondary">
              Recognition and credentials
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
