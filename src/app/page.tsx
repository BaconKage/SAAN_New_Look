import { LedHero } from '@/components/hero/led-hero';
import { BrandMarquee } from '@/components/home/brand-marquee';
import { Industries } from '@/components/home/industries';
import { Manifesto } from '@/components/home/manifesto';
import { Process } from '@/components/home/process';
import { ProductsBento } from '@/components/home/products-bento';
import { References } from '@/components/home/references';
import { RoomConfigurator } from '@/components/home/room-configurator';
import { SolutionsPan } from '@/components/home/solutions-pan';
import { CtaBand } from '@/components/sections/cta-band';

export default function HomePage() {
  return (
    <>
      <LedHero />
      <BrandMarquee />
      <Manifesto />
      <SolutionsPan />
      <RoomConfigurator />
      <Process />
      <ProductsBento />
      <Industries />
      <References />
      <CtaBand />
    </>
  );
}
