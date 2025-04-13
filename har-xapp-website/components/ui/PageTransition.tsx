'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

// Sayfa geçişleri için doğa temalı animasyon bileşeni
interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>('auto');
  const [shouldMeasure, setShouldMeasure] = useState(true);

  // Sayfa yüklendikten sonra yüksekliği ölçelim
  useEffect(() => {
    if (ref.current && shouldMeasure) {
      const measuredHeight = ref.current.offsetHeight;
      setHeight(measuredHeight);
      
      // İlk ölç, sonra "auto" yap, böylece sayfa kaydırma çalışır
      setTimeout(() => {
        setHeight('auto');
        setShouldMeasure(false);
      }, 500);
    }
  }, [shouldMeasure]);

  // Her sayfa değişiminde yüksekliği ölç
  useEffect(() => {
    setShouldMeasure(true);
  }, [pathname]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          ref={ref}
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
            } 
          }}
          exit={{ 
            opacity: 0, 
            y: -10,
            transition: { 
              duration: 0.2, 
              ease: [0.22, 1, 0.36, 1] 
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition; 