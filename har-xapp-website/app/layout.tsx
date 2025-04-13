import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LoadingBar from '@/components/ui/LoadingBar';
import FullScreenLoader from '@/components/ui/FullScreenLoader';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Script from 'next/script';
import NotFoundCheck from '@/components/ui/NotFoundCheck';
import { Suspense } from 'react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Font optimizasyonu
  variable: '--font-inter',
  preload: true,  // Performans için preload
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
      <head>
        {/* Font dosyasını doğrudan public klasöründen ekleyelim, preload ile önbelleğe almayalım */}
        <link 
          rel="stylesheet" 
          href="/fonts/inter-var.css" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className={`${inter.className} smooth-scroll antialiased bg-white text-slate-900 overflow-x-hidden will-change-scroll backface-hidden`}>
        {/* Tam ekran yükleme animasyonu */}
        <Suspense fallback={null}>
          <FullScreenLoader />
        </Suspense>
        
        {/* Sayfa yükleme çubuğu - sayfalar arası geçişler için */}
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        
        {/* Yukarı çık widget butonu - görünen viewport'un sağ alt köşesinde */}
        <ScrollToTop />
        
        {/* Client component ile 404 kontrolü yapıyoruz */}
        <NotFoundCheck>
          {children}
        </NotFoundCheck>
        
        {/* Early-load script for faster initialization */}
        <Script
          id="initialization-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Sayfa yükleme izleme
              (function() {
                window.isFirstVisit = !sessionStorage.getItem('visited');
                if (!sessionStorage.getItem('visited')) {
                  sessionStorage.setItem('visited', 'true');
                }
              })();
            `
          }}
        />
        
        {/* Performance script - Kritik CSS ve JS'in hızlı yüklenmesi */}
        <Script
          id="performance-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Kritik kaynakları hızlandır
              (function() {
                // requestIdleCallback polyfill
                window.requestIdleCallback = window.requestIdleCallback || 
                  function(cb) {
                    const start = Date.now();
                    return setTimeout(function() {
                      cb({
                        didTimeout: false,
                        timeRemaining: function() {
                          return Math.max(0, 50 - (Date.now() - start));
                        }
                      });
                    }, 1);
                  };
                  
                // Preload stratejisi
                const preloadLinks = Array.from(document.querySelectorAll('link[rel="preload"]'));
                if (preloadLinks.length > 0) {
                  requestIdleCallback(() => {
                    preloadLinks.forEach(link => {
                      link.setAttribute('rel', 'stylesheet');
                    });
                  });
                }
                
                // DOM yüklendi eventi
                const markLoaded = () => {
                  document.body.classList.add('loaded');
                  
                  // Ana içeriği göster - body'nin opacity'sini düzelt
                  setTimeout(() => {
                    const mainContainer = document.querySelector('.flex-col.min-h-screen');
                    if (mainContainer) {
                      mainContainer.classList.add('animate-fade-in');
                    }
                  }, 100);
                  
                  // Sayfa içi link yumuşak kaydırma
                  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                      e.preventDefault();
                      const targetId = this.getAttribute('href');
                      if (targetId === '#') return;
                      
                      const targetElement = document.querySelector(targetId);
                      if (!targetElement) return;
                      
                      window.scrollTo({
                        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
                        behavior: 'smooth'
                      });
                    });
                  });
                };
                
                if (document.readyState === 'complete') {
                  markLoaded();
                } else {
                  window.addEventListener('load', markLoaded);
                }
                
                // Optimize edilmiş sayfa görüntüleme izleme
                let lastPath = window.location.pathname;
                const observer = new MutationObserver(() => {
                  const currentPath = window.location.pathname;
                  if (currentPath !== lastPath) {
                    lastPath = currentPath;
                    // URL değişikliği - burada sayfa geçiş analitikleri olabilir
                  }
                });
                
                observer.observe(document.documentElement, {
                  childList: true,
                  subtree: true
                });
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
