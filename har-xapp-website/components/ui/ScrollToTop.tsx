'use client';

import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Performans için memo ile sarıyoruz
const ScrollToTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  
  // Scroll pozisyonunu takip etmek için
  useEffect(() => {
    // 404 sayfasında hiçbir şey yapma
    if (pathname === '/not-found') {
      return;
    }
    
    const handleScroll = () => {
      // 300px'den fazla aşağı inince butonu göster
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // İlk yükleme kontrolü
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
  
  // Yukarı çık fonksiyonu - performans için throttle eklendi
  const scrollToTop = () => {
    // requestAnimationFrame kullanarak daha smooth scroll sağlıyoruz
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  // 404 sayfasında null döndür
  if (pathname === '/not-found') {
    return null;
  }
  
  return (
    <motion.div 
      className="fixed bottom-24 right-8 z-[99999]"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0.8,
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        onClick={scrollToTop}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(76, 139, 50, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: "0 4px 20px rgba(76, 139, 50, 0.3)",
        }}
      >
        {/* Yaprak şeklinde yukarı ok ikonu */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transform -translate-y-1"
        >
          <path
            d="M12,21 C8,17 4,13 4,9 C4,6 6,3 9,3 C10.5,3 12,4 12,5 C12,4 13.5,3 15,3 C18,3 20,6 20,9 C20,13 16,17 12,21 Z"
            fill="white"
            strokeWidth="0"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
});

// displayName ekleyerek geliştirme araçlarında tanımlayıcı isim olmasını sağlıyoruz
ScrollToTop.displayName = 'ScrollToTop';

export default ScrollToTop; 