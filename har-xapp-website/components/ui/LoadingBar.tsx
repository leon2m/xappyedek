'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Doğa temalı yükleme çubuğu
 * Yaprak ve dal animasyonlarıyla zenginleştirilmiş
 */
const LoadingBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Sayfa değişikliklerini dinle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const startLoading = () => {
      setIsLoading(true);
      setProgress(0);

      // Hızlı başlangıç ve yavaşlayan ilerleme
      interval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 99) {
            clearInterval(interval);
            return 99;
          }
          
          // İlk %80'e hızlı ulaş, sonra yavaşla
          const increment = prevProgress < 80 
            ? Math.random() * 10 
            : Math.random() * 2;
            
          return Math.min(prevProgress + increment, 99);
        });
      }, 100);
    };

    const completeLoading = () => {
      setProgress(100);
      
      // Hemen kaldırma - yavaş yükleme sorununa çözüm
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    // Sayfa değişikliği olursa yüklemeyi başlat
    startLoading();
    
    // Sayfa tam yüklendiğinde yüklemeyi tamamla
    if (document.readyState === 'complete') {
      completeLoading();
    } else {
      window.addEventListener('load', completeLoading);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('load', completeLoading);
    };
  }, [pathname, searchParams]);

  // Yaprak Taneleri
  const LeafParticle = ({ index }: { index: number }) => {
    // Her yaprak için farklı rastgele değerler
    const size = 6 + Math.random() * 4;
    const initialX = 10 + index * 20 + Math.random() * 10;
    const initialY = Math.random() * 10;
    
    // Renk temaları - yeşil ve kahverengi tonları
    const leafColors = [
      '#4C8B32', // primary
      '#95C01E', // secondary
      '#7BAA4A', // primary-400
      '#AAD03D', // secondary-400
      '#D6EFC7', // light green
    ];
    
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];

    return (
      <motion.div
        className="absolute rounded-full"
        initial={{ 
          x: initialX, 
          y: initialY, 
          opacity: 0,
          rotate: 0,
          scale: 0.5,
        }}
        animate={{ 
          y: initialY - 10,
          opacity: [0, 1, 0],
          rotate: Math.random() > 0.5 ? 45 : -45,
          scale: 1.2,
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeOut" 
        }}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}40`,
        }}
      />
    );
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed top-0 left-0 w-full h-1 z-[1000] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Ana ilerleme çubuğu - Doğal gradient */}
          <motion.div
            className="h-full bg-gradient-to-r from-primary-300 via-secondary-400 to-primary-500 relative"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{
              ease: progress > 80 ? "circOut" : "easeOut",
              duration: 0.3,
            }}
          >
            {/* Parlaklık efekti */}
            <motion.div 
              className="absolute top-0 right-0 h-full w-20 bg-gradient-to-r from-transparent to-white/30" 
              animate={{ 
                x: ['-100%', '100%'] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5, 
                ease: "linear",
              }}
            />
            
            {/* Yaprak tanecikler */}
            <div className="absolute top-1 left-0 h-full">
              {Array.from({ length: 8 }).map((_, index) => (
                <LeafParticle key={index} index={index} />
              ))}
            </div>
          </motion.div>
          
          {/* Arka plan efekti - Toprak görünümü */}
          <div className="absolute top-1 left-0 w-full h-6 rounded-b-full bg-gradient-to-b from-secondary-600/10 to-transparent blur-sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingBar; 