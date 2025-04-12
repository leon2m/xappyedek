import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Font optimizasyonu
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'H-AR XaPP | Çalışan Deneyimi İçin Tasarlanmış Süper Uygulama',
  description: 'AR Solutions tarafından geliştirilen H-AR XaPP, kurumsal iç süreçleri ve çalışan deneyimini yeniden tanımlamak üzere tasarlanmış, modüler yapıya sahip premium bir süper uygulama.',
  keywords: 'H-AR XaPP, çalışan deneyimi, süper uygulama, SAP entegrasyonu, Microsoft entegrasyonu, kurumsal iletişim, modüler yapı, AR Solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} smooth-scroll antialiased bg-white text-slate-900`}>
        <div className="flex flex-col min-h-screen">
        <Header />
          <main className="flex-grow">
          {children}
        </main>
        <Footer />
        </div>
        
        {/* Preloader */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
              document.body.classList.add('loaded');
              
              // Sayfa içi link yumuşak kaydırma
              document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  const targetId = this.getAttribute('href');
                  if (targetId === '#') return;
                  
                  const targetElement = document.querySelector(targetId);
                  if (!targetElement) return;
                  
                  window.scrollTo({
                    top: targetElement.offsetTop - 80, // Header yüksekliği için offset
                    behavior: 'smooth'
                  });
                });
              });
            });
          `
        }} />
      </body>
    </html>
  );
}
