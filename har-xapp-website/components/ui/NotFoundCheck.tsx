'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';

interface NotFoundCheckProps {
  children: ReactNode;
}

// 404 sayfası kontrolü yapan client component
export default function NotFoundCheck({ children }: NotFoundCheckProps) {
  const pathname = usePathname();
  const isNotFound = pathname === '/not-found';

  if (isNotFound) {
    return (
      <main className="flex-grow relative">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen animate-fade-in relative">
      <Header />
      
      <main className="flex-grow relative">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      <Footer />
    </div>
  );
} 