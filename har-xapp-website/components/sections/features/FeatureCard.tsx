'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import Image from 'next/image';
import { type Feature } from '@/types';
import { MoveRight } from 'lucide-react';

interface FeatureCardProps {
  feature: Feature;
  index: number;
  className?: string;
}

export function FeatureCard({ feature, index, className }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.1 });
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98,
      rotateX: -3
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.45, 0.26, 0.95]
      }
    }
  };

  useEffect(() => {
    if (!cardRef.current) return;
    
    // Kart içi 3D yüzer efekti
    const card = cardRef.current;
    const cardContent = card.querySelector('.card-content');
    const cardImage = card.querySelector('.card-image');
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardContent || !cardImage) return;
      
      // Kartın sınırları içinde fare pozisyonu
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // -20 ile 20 derece arasında döndürme
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / (rect.height / 2) * -8;
      const rotateY = (x - centerX) / (rect.width / 2) * 8;
      
      gsap.to(cardContent, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        duration: 0.5,
        ease: "power2.out"
      });
      
      // Görüntüyü hafifçe hareket ettirme (paralaks efekti)
      gsap.to(cardImage, {
        x: (x - centerX) / 10,
        y: (y - centerY) / 10,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      if (!cardContent || !cardImage) return;
      
      gsap.to(cardContent, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });
      
      gsap.to(cardImage, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative group overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-100/90 to-white",
        "border border-zinc-200 shadow-sm",
        "backdrop-blur-xl hover:shadow-lg transition-all duration-300",
        "h-full min-h-[400px] p-8 flex flex-col justify-between",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 }
      }}
    >
      <div className="card-content will-change-transform">
        <div className="flex items-center justify-between mb-8">
          <div 
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              "bg-gradient-to-br from-primary/80 to-primary"
            )}
          >
            {feature.icon && <feature.icon className="w-6 h-6 text-white" />}
          </div>
          <span className="text-slate-500 text-sm font-medium">
            {(index + 1).toString().padStart(2, '0')}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-slate-800">
          {feature.title}
        </h3>
        
        <p className="text-slate-600 mb-6">
          {feature.description}
        </p>
      </div>
      
      <div className="card-image relative w-full h-48 mt-auto overflow-hidden rounded-xl mb-6">
        {feature.svg ? (
          <div className="w-full h-full">
            {feature.svg}
          </div>
        ) : feature.image ? (
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover transition-transform will-change-transform"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            {feature.icon && <feature.icon className="w-16 h-16 text-primary/40" />}
          </div>
        )}
      </div>
    </motion.div>
  );
} 