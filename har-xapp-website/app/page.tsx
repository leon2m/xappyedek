import Hero from '@/components/sections/Hero';
import { Features } from '@/components/sections/features/Features';
import Modules from '@/components/sections/Modules';
import Integrations from '@/components/sections/Integrations';
import CTA from '@/components/sections/CTA';
import About from '@/components/sections/About';
import { Suspense } from 'react';

export function generateStaticParams() {
  return [];
}

const SectionLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <>
      <Suspense fallback={<SectionLoading />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <Modules />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <Integrations />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <CTA />
      </Suspense>
    </>
  );
}
