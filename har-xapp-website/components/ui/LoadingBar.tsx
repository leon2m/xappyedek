'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Optimize edilmiş LoadingBar bileşeni
 * Sayfa geçişlerini hızlandırmak için yeniden düzenlendi
 */
export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(true);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Interval ve timeout referansları
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  /**
   * Yükleme işlemini başlat
   */
  const startLoading = () => {
    // Devam eden işlemleri temizle
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    
    // İlk duruma dön
    setLoading(true);
    setIsComplete(false);
    setProgress(5); // Başlangıç değeri
    
    // Yükleme ilerlemesini güncelle (optimize edilmiş intervaller)
    progressIntervalRef.current = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 90) {
          // 90%'dan sonra yavaşla
          return prevProgress + 0.5;
        } else if (prevProgress >= 60) {
          // 60%'dan sonra yavaşla
          return prevProgress + 1;
        }
        // Başlangıçta hızlı ilerle
        return prevProgress + 2;
      });
    }, 80); // Daha hızlı interval
  };
  
  /**
   * Yükleme işlemini tamamla
   */
  const completeLoading = () => {
    // Interval'i temizle
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    // %100'e tamamla
    setProgress(100);
    
    // Kısa bir gecikme ile loading state'i kapat
    completeTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      setIsComplete(true);
      
      // Sonraki yükleme için sıfırla
      setTimeout(() => setProgress(0), 200);
    }, 200); // Daha kısa bir gecikme
  };
  
  // URL değişimlerini izle
  useEffect(() => {
    if (!loading) {
      startLoading();
    }
    
    // İlerlemeyi simüle et
    const demoLoadTime = Math.random() * 300 + 100; // 100ms-400ms arası
    const completeTimeout = setTimeout(() => {
      completeLoading();
    }, demoLoadTime);
    
    return () => {
      clearTimeout(completeTimeout);
    };
  }, [pathname, searchParams]);
  
  // Component unmount olduğunda tüm interval ve timeout'ları temizle
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    };
  }, []);
  
  // Projeye özel renk teması
  const barColor = '#0ea5e9'; // İçerik ile uyumlu mavi renk
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-transparent overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-full"
            style={{ 
              backgroundColor: barColor,
              width: `${progress}%` 
            }}
            transition={{ ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 