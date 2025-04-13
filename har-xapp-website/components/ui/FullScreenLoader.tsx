'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

/**
 * H-AR XaPP Premium Yükleme Animasyonu - Optimize edilmiş
 */
const FullScreenLoader = () => {
  // Force initial loading state to true
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const controls = useAnimation();
  
  // Sayfa yenileme durumunu tanıma
  useEffect(() => {
    // Tarayıcı depolamasında animasyonu daha önce gösterip göstermediğimizi kontrol et
    const hasShownAnimation = sessionStorage.getItem('animationShown');
    
    if (hasShownAnimation) {
      // Kullanıcı sayfayı zaten ziyaret etmiş - animasyonu kısa süre göster
      setTimeout(() => {
        setLoading(false);
      }, 800); // Süreyi kısalttık
    } else {
      // İlk ziyaret
      setIsFirstLoad(true);
      sessionStorage.setItem('animationShown', 'true');
    }
  }, []);
  
  // Yükleme tamamlandığında animasyonu bitir
  useEffect(() => {
    if (!loading) return;
    
    // Animasyon sekansı
    const sequence = async () => {
      try {
        await controls.start("visible");

        // Sayfa içeriği yüklendiğinde
        const completeLoader = () => {
          controls.start("exit");
          setTimeout(() => {
            setLoading(false);
            setIsFirstLoad(false);
          }, 400); // Süreyi kısalttık
        };

        // Minimum gösterim süresi - süreleri kısalttık
        const minDisplayTime = isFirstLoad ? 2000 : 800;

        // Min süre göster, sayfa içeriği yüklendiyse bitir
        if (document.readyState === 'complete') {
          setTimeout(completeLoader, minDisplayTime);
        } else {
          const handleLoad = () => setTimeout(completeLoader, 300);
          window.addEventListener('load', handleLoad);
          return () => window.removeEventListener('load', handleLoad);
        }
      } catch (error) {
        console.error("Loader animation error:", error);
        setLoading(false);
      }
    };
    
    sequence();
  }, [controls, loading, isFirstLoad]);
  
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { 
              opacity: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
            }
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo Container - Merkez */}
          <motion.div 
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-40 h-40">
              {/* Logo */}
              <motion.div 
                className="w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-5xl font-bold text-center">
                  <span className="text-primary">H-AR</span>
                  <div className="text-secondary">XaPP</div>
                </div>
              </motion.div>
            </div>
            
            {/* Loading Text ve Progress Bar */}
            <div className="mt-4 flex flex-col items-center">
              <motion.div 
                className="text-primary-600 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Yükleniyor...
              </motion.div>
              
              {/* Basit progress bar */}
              <motion.div 
                className="mt-3 w-48 h-1 bg-gray-200 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Basit Yaprak Dekorasyonu */}
          <motion.div 
            className="absolute top-10 left-10 opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" className="text-primary">
              <path
                d="M12,2 Q16,8 20,12 Q16,16 12,22 Q8,16 4,12 Q8,8 12,2Z"
                fill="currentColor"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 right-10 opacity-30"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" className="text-secondary">
              <path
                d="M12,2 Q16,8 20,12 Q16,16 12,22 Q8,16 4,12 Q8,8 12,2Z"
                fill="currentColor"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenLoader; 