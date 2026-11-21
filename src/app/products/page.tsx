import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Catalog } from '@/components/products/catalog';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Video bars, room controllers, wireless presentation, commercial and interactive displays, ceiling microphones, mixers and DSP from Logitech, Barco, LG, Sharp, Shure, Sennheiser, Crestron, Yamaha and Q-SYS.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Hardware we specify, install and support."
        accent={['specify,', 'install', 'support.']}
        image="/images/photos/console.jpg"
        intro="A selection of the conferencing, display, audio and control equipment we design with. Tap any product for details or a quote."
      />
      <Suspense fallback={<div className="min-h-[60vh] bg-ink-950" />}>
        <Catalog />
      </Suspense>
      <CtaBand title="Not sure which model fits? Ask us." accent={['Ask', 'us.']} />
    </>
  );
}
