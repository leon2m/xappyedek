import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number; // -1 (daha yavaş) ile 1 (daha hızlı) arasında bir değer
  className?: string;
  horizontal?: boolean; // Yatay hareket için
  easing?: 'linear' | 'smooth'; // Hareket tipi
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  depth = 0,
  className,
  horizontal = false,
  easing = 'smooth',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring animasyonu için konfigürasyon
  const springConfig = { 
    stiffness: 85, 
    damping: 25, 
    mass: 0.5 
  };
  
  // Daima useSpring'i çağır, ama linear modu için input olarak doğrudan input değerini kullan
  const smoothProgress = useSpring(
    scrollYProgress, 
    easing === 'smooth' ? springConfig : { stiffness: 100, damping: 100, mass: 1 }
  );

  // Derinlik değeri hareketin yönünü ve miktarını belirler
  // Negatif değerler ters yönde (parallax etkisi) ve daha az hareket eder
  // Pozitif değerler aynı yönde ve daha fazla hareket eder
  const calculateRange = () => {
    const baseMove = 120; // Piksel cinsinden baz hareket miktarı
    return [depth * baseMove * -1, depth * baseMove];
  };

  const range = calculateRange();
  
  // Daima her iki transform'u da çağır
  const xValue = useTransform(
    easing === 'smooth' ? smoothProgress : scrollYProgress, 
    [0, 1], 
    horizontal ? range : [0, 0]
  );
  
  const yValue = useTransform(
    easing === 'smooth' ? smoothProgress : scrollYProgress, 
    [0, 1], 
    !horizontal ? range : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: xValue, y: yValue }}
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0.7 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}; 