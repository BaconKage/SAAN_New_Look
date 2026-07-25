import { Hero } from '@/components/sections/hero';
import {
  DeliveryProcess,
  ExplorerSection,
  FeaturedProjects,
  FinalCta,
  IndustriesOverview,
  PartnersSection,
  SolutionsOverview,
  SupportLifecycle,
} from '@/components/sections/home-sections';
import { explorerOptions } from '@/content/data/explorer';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title:
    'SAAN — Professional AV, Digital Signage and Meeting Room Solutions in Bengaluru',
  description:
    'SAAN designs, integrates and supports professional AV, meeting room, digital signage, LED and audio systems for enterprises and institutions across India.',
  path: '/',
});

export default async function HomePage() {
  const [solutions, industries, services, projects, partners, stages] =
    await Promise.all([
      content.getSolutions(),
      content.getIndustries(),
      content.getServices(),
      content.getProjects({ limit: 3 }),
      content.getPartners(),
      content.getProcessStages(),
    ]);

  return (
    <>
      <Hero />
      <SolutionsOverview solutions={solutions} />
      <ExplorerSection options={explorerOptions} />
      <IndustriesOverview industries={industries} />
      <DeliveryProcess stages={stages} />
      <FeaturedProjects projects={projects} />
      <SupportLifecycle services={services} />
      <PartnersSection hasPartners={partners.length > 0} />
      <FinalCta />
    </>
  );
}
