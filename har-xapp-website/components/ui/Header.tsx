'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import OptimizedLink from './OptimizedLink';

// GSAP ScrollTrigger'ı yalnızca istemci tarafında çalıştır
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // GSAP performans optimizasyonu
  gsap.ticker.lagSmoothing(false);
  gsap.config({ nullTargetWarn: false });
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  
  // Menü açıldığında body'ye overflow:hidden ekle
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    // Komponent unmount olduğunda temizle
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);
  
  // Scroll olayını daha verimli işle - throttle ile (debounce yerine)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // İlk yükleme kontrolü
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Nav links for main menu
  const navLinks = useMemo(() => [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Özellikler', href: '/ozellikler' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Demo Talep', href: '/demo-talep' },
  ], []);
  
  // Hover effect for links - daha hafif animasyon
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  // Link hover işlemleri
  const handleHoverStart = useCallback((link: string) => {
    setHoveredLink(link);
  }, []);
  
  const handleHoverEnd = useCallback(() => {
    setHoveredLink(null);
  }, []);
  
  // Dinamik Header Stili - memoize edilmiş
  const headerStyle = useMemo(() => ({
    backgroundColor: scrolled 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: scrolled ? 'saturate(180%) blur(8px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(8px)' : 'none',
    boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.08)' : 'none',
    willChange: 'background-color, box-shadow',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  }), [scrolled]);
  
  return (
    <div className="sticky top-0 left-0 w-full z-50 will-change-transform">
      <motion.header 
        ref={headerRef}
        style={headerStyle}
        className="w-full border-b border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        layoutId="mainHeader"
      >
        <div className="container-custom mx-auto py-4 px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo - optimize edilmiş */}
            <motion.a 
              href="/"
              ref={logoRef}
              className="relative flex items-center text-xl font-bold text-gray-800 z-10"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              {/* Logonun img etiketi ile kullanımı */}
              <div className="relative w-8 h-8 mr-2">
                <Image 
                  src="https://i.hizliresim.com/8btbrv2.png" 
                  alt="XaPP Logo"
                  width={32}
                  height={32}
                  priority
                  className="object-contain"
                />
              </div>
              
              <span className="mr-1 text-primary font-black text-2xl">
                H-AR
              </span>
              
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                XaPP
              </span>
            </motion.a>
            
            {/* Masaüstü Menü - optimize edilmiş */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isHovered = hoveredLink === link.href;
                
                return (
                  <div 
                    key={link.href}
                    className="nav-item relative px-1"
                    onMouseEnter={() => handleHoverStart(link.href)}
                    onMouseLeave={handleHoverEnd}
                  >
                    {/* Hover/Active gösterge - optimize edilmiş */}
                    <AnimatePresence>
                      {(isHovered || isActive) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg -z-10"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                        />
                      )}
                    </AnimatePresence>
                    
                    <OptimizedLink 
                      href={link.href}
                      prefetch={isHovered}
                      className={`px-4 py-2 rounded-lg block font-medium transition-colors duration-200 whitespace-nowrap ${
                        isActive 
                          ? 'text-primary' 
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                      
                      {isActive && (
                        <motion.div 
                          className="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-full mt-1"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                    </OptimizedLink>
                  </div>
                );
              })}
            </nav>
            
            {/* Mobil Hamburger Menü Butonu */}
            <motion.button
              className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center bg-white shadow-md rounded-xl hamburger-button"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Menüyü Aç/Kapat"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="absolute left-0 top-0 h-0.5 w-6 bg-primary rounded-full origin-center"
                  animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 top-2 h-0.5 w-6 bg-primary rounded-full origin-center"
                  animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 top-4 h-0.5 w-6 bg-primary rounded-full origin-center"
                  animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobil Menü (Tam Ekran) - daha akıcı animasyon */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Arkaplan overlay - site içeriğini karartmak için */}
              <motion.div
                className="fixed inset-0 bg-slate-900/80 backdrop-blur-lg mobile-menu-overlay"
                style={{ 
                  zIndex: 999,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100vw',
                  height: '100vh'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menü içeriği */}
              <motion.div
                className="fixed inset-0 bg-white/90 backdrop-blur-md flex flex-col md:hidden mobile-menu-backdrop overflow-y-auto"
                style={{ 
                  zIndex: 1000,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100vw',
                  height: '100vh'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                exit={{ 
                  opacity: 0,
                  y: -20,
                  transition: { duration: 0.2, ease: 'easeIn' }
                }}
              >
                {/* Bokeh efekti - dekoratif hareketli daireler */}
                <div className="bokeh-effect">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                
                {/* Menü yapısı - sabit konumlandırma olmadan tam ekran */}
                <div className="w-full min-h-screen flex flex-col">
                  {/* Menü üst kısmı - Logo */}
                  <div className="w-full pt-4 px-4 md:px-6">
                    <div className="container-custom mx-auto flex items-center justify-between">
                      {/* Menü içinde logo */}
                      <motion.a 
                        href="/"
                        className="relative flex items-center text-xl font-bold text-gray-800"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "tween", duration: 0.2 }}
                      >
                        <div className="relative w-8 h-8 mr-2">
                          <Image 
                            src="https://i.hizliresim.com/8btbrv2.png" 
                            alt="XaPP Logo"
                            width={32}
                            height={32}
                            priority
                            className="object-contain"
                          />
                        </div>
                        
                        <span className="mr-1 text-primary font-black text-2xl">
                          H-AR
                        </span>
                        
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          XaPP
                        </span>
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Menü içeriği - ortada, flex-grow ile genişler */}
                  <div className="flex-grow flex flex-col justify-center items-center py-12">
                    <motion.nav className="flex flex-col items-center space-y-8 w-full">
                      {navLinks.map((link, index) => {
                        const isActive = pathname === link.href;
                        
                        return (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="relative w-full text-center"
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className={`text-2xl font-semibold px-6 py-3 rounded-lg mobile-menu-item inline-block ${
                                isActive 
                                  ? 'text-primary bg-primary/5' 
                                  : 'text-slate-800 hover:text-primary hover:bg-gray-50'
                              } transition-colors duration-200`}
                            >
                              {link.label}
                              {isActive && (
                                <motion.div 
                                  className="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-full mt-1"
                                  layoutId="mobileActiveIndicator"
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                />
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.nav>
                  </div>
                  
                  {/* İletişim butonu - alt kısımda sabit */}
                  <div className="w-full flex justify-center py-8 mb-8">
                    <Link 
                      href="/iletisim" 
                      onClick={() => setIsOpen(false)}
                      className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      İletişim
                    </Link>
                  </div>
                </div>
                
                {/* Kapatma butonu - sağ üst köşede sabit */}
                <motion.button
                  className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg mobile-menu-close"
                  style={{ zIndex: 1001 }}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
};

export default Header; 