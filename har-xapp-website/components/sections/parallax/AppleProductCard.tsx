'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AppleProductCardProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  badgeText?: string;
  badgeColor?: string;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
  hasGlow?: boolean;
}

export const AppleProductCard: React.FC<AppleProductCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  badgeText,
  badgeColor = 'bg-blue-500',
  className,
  onClick,
  glowColor = 'rgba(100, 149, 237, 0.4)',
  hasGlow = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Responsive kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // 3D rotasyon için değerler
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Yumuşak geçişler için spring konfigürasyonu
  const springConfig = { damping: 15, stiffness: 150 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  
  // Ek 3D efektleri için değişkenler
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Fare hareketi ile kart rotasyonu
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Kartın merkezinden fare pozisyonunu hesaplama (-1 ile 1 arasında)
    const centerX = (e.clientX - rect.left) / rect.width - 0.5;
    const centerY = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Rotasyon değerlerini güncelle (-10 ile 10 derece arasında)
    rotateX.set(centerY * -20);
    rotateY.set(centerX * 20);
    
    // Işıma efekti pozisyonu için
    setMousePosition({ x: centerX, y: centerY });
  };
  
  // Hover durumu kontrolü
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-6 shadow-xl transition-all duration-300",
        isHovered ? "shadow-2xl scale-[1.02]" : "shadow-lg scale-100",
        className
      )}
      whileHover={{ scale: isMobile ? 1.02 : 1 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: isMobile ? "none" : `perspective(1200px) rotateX(${smoothRotateX}deg) rotateY(${smoothRotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Işıma efekti */}
      {hasGlow && isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden opacity-70"
          style={{ 
            background: `radial-gradient(circle at ${50 + mousePosition.x * 100}% ${50 + mousePosition.y * 100}%, ${glowColor} 0%, transparent 70%)`,
            zIndex: 1 
          }}
        />
      )}
      
      {/* Badge */}
      {badgeText && (
        <div 
          className={cn(
            "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white z-10",
            badgeColor
          )}
          style={{ transform: 'translateZ(30px)' }}
        >
          {badgeText}
        </div>
      )}
      
      {/* Kart içeriği */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Görsel */}
        <div 
          className="relative w-full h-48 mb-6 overflow-hidden rounded-lg"
          style={{ 
            transform: isHovered ? 'translateZ(40px) scale(1.05)' : 'translateZ(0) scale(1)',
            transition: 'transform 0.2s ease-out' 
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        
        {/* Başlık ve Açıklama */}
        <div 
          className="flex flex-col space-y-2"
          style={{ 
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
            transition: 'transform 0.2s ease-out' 
          }}
        >
          <h3 className="text-xl font-bold text-white">{title}</h3>
          
          {description && (
            <p 
              className="text-sm text-gray-300"
              style={{ 
                transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
                transition: 'transform 0.2s ease-out' 
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      
      {/* Arka plan efekti */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/50 to-black/80 backdrop-blur-sm"
        style={{ 
          transform: isHovered ? 'translateZ(-20px)' : 'translateZ(0)',
          opacity: isHovered ? 0.6 : 1,
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out'
        }}
      />
    </motion.div>
  );
};

export default AppleProductCard; 