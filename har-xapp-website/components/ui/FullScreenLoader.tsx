'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Optimize edilmiş FullScreenLoader bileşeni
 * Daha hızlı sayfa geçişleri için geliştirildi
 */
export default function FullScreenLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    // İlk yükleme için biraz daha uzun süre göster (ilk render)
    if (firstLoad) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setFirstLoad(false);
      }, 250); // 300ms'den 250ms'e düşürüldü
      return () => clearTimeout(timer);
    } else {
      // Sonraki sayfa geçişleri için daha kısa süre
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200); // 300ms'den 200ms'e düşürüldü
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, firstLoad]);

  return (
    <AnimatePresence mode="sync">
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div
              className="h-20 w-20"
              animate={{
                scale: [0.8, 1, 0.8],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatDelay: 0
              }}
            >
              <img 
                src="/logo.png" 
                alt="H-AR XaPP Logo" 
                className="h-full w-full object-contain" 
              />
            </motion.div>
            <p className="text-sm font-medium text-slate-600">Yükleniyor...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 