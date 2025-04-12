'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { featuresData } from '@/data/features';
import { FeatureCard } from './FeatureCard';
import { ParallaxLayer } from '@/components/sections/parallax/ParallaxLayer';

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Paralalaks efektleri için dönüşümler
  const headingY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.1, 0.5], [50, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  
  // Backdrop parçaları için dönüşümler
  const sphereScale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1.2]);
  const sphereOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0, 1, 0.5]);
  
  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-32 bg-white">
      {/* Arka plan efektleri */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ParallaxLayer depth={-0.2} className="absolute -top-[20%] -right-[10%] opacity-60">
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
        </ParallaxLayer>
        
        <ParallaxLayer depth={-0.1} className="absolute top-[60%] -left-[5%] opacity-40">
          <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl" />
        </ParallaxLayer>
        
        <motion.div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            scale: sphereScale,
            opacity: sphereOpacity,
            background: "radial-gradient(circle, rgba(76, 139, 50, 0.1) 0%, rgba(255, 255, 255, 0) 70%)",
          }}
        />
      </div>
      
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            className="relative inline-block"
            style={{ y: headingY, opacity: headingOpacity }}
          >
            <span className="absolute -z-10 -inset-8 lg:-inset-16 rounded-full blur-3xl bg-primary/10" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
              Premium <span className="text-primary">Özellikler</span>
            </h2>
          </motion.div>
          
          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-lg text-slate-600"
            style={{ y: subtitleY, opacity: subtitleOpacity }}
          >
            Her ihtiyaca yönelik geliştirilmiş çözümlerle AR deneyiminizi üst seviyeye taşıyın.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 