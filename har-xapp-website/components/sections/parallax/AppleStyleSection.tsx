'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

// GSAP'ı kaydet
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AppleStyleSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  useDarkBackground?: boolean; // Koyu arka plan kullanımı için
  className?: string;
  imagePosition?: 'left' | 'right' | 'center';
  parallaxIntensity?: number;
  hasGlow?: boolean;
  glowColor?: string;
  textColorClass?: string; // Metin rengi için özel sınıf
  children?: React.ReactNode; // Children prop ekledik
}

export const AppleStyleSection: React.FC<AppleStyleSectionProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  useDarkBackground = false, // Varsayılan açık tema
  className,
  imagePosition = 'center',
  parallaxIntensity = 0.3,
  hasGlow = true,
  glowColor = 'rgba(76, 139, 50, 0.4)', // Birincil yeşil rengi
  textColorClass,
  children,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Responsive tasarım için ekran boyutunu kontrol et
  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll ve geçiş animasyonları
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Yumuşak hareket için spring efektleri
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  // Parallax ve transform efektleri
  const titleY = useTransform(smoothProgress, [0, 0.5, 1], [50, 0, -50]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const imageY = useTransform(smoothProgress, [0, 0.5, 1], [100 * parallaxIntensity, 0, -100 * parallaxIntensity]);
  const contentOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.9], [0, 1, 0]);
  const contentY = useTransform(smoothProgress, [0.1, 0.3, 0.9], [50, 0, -50]);
  
  // 3D hover efekti için
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    
    setMousePosition({ x, y });
  };
  
  // GSAP animasyonları
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Pin effekti - kullanıcı scroll yaptıkça section sabit kalır 
    // ve içerik animasyonları oynatılır
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%", // Bileşen boyutunun 1.5 katı scroll mesafesi
        pin: true,
        pinSpacing: true,
        scrub: 1,
      }
    });
    
    // Başlık animasyonu
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Görsel animasyonu
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
  }, []);

  // Arka plan ve metin renkleri için sınıflar
  const backgroundClass = useDarkBackground 
    ? "bg-slate-800" 
    : "bg-white";
    
  const defaultTextClass = useDarkBackground 
    ? "text-white" 
    : "text-slate-800";
    
  const subtitleTextClass = useDarkBackground 
    ? "text-primary-300" 
    : "text-primary-500";
    
  const descriptionTextClass = useDarkBackground 
    ? "text-slate-300" 
    : "text-slate-600";

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20",
        backgroundClass,
        textColorClass || defaultTextClass,
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Arka plan ışıma efekti */}
      {hasGlow && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20"
            style={{ 
              background: glowColor,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          />
        </div>
      )}
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Başlık ve İçerik Alanı */}
          <motion.div 
            ref={contentRef}
            className={cn(
              "flex flex-col space-y-6", 
              imagePosition === 'right' ? 'md:order-1' : 'md:order-2'
            )}
            style={{ 
              y: contentY,
              opacity: contentOpacity,
            }}
          >
            {subtitle && (
              <span className={cn("text-lg md:text-xl font-medium", subtitleTextClass)}>
                {subtitle}
              </span>
            )}
            
            <motion.h2 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ 
                y: titleY,
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${-mousePosition.x}deg)`,
              }}
            >
              {title}
            </motion.h2>
            
            {description && (
              <p className={cn("text-lg md:text-xl max-w-lg", descriptionTextClass)}>
                {description}
              </p>
            )}
            
            {children}
          </motion.div>
          
          {/* Görsel Alanı */}
          <motion.div
            ref={imageRef}
            className={cn(
              "relative w-full h-[300px] md:h-[500px]",
              imagePosition === 'right' ? 'md:order-2' : 'md:order-1',
              useDarkBackground ? "shadow-xl rounded-xl overflow-hidden" : "shadow-lg rounded-xl overflow-hidden"
            )}
            style={{
              scale: imageScale,
              y: imageY,
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${-mousePosition.x * 0.5}deg)`,
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppleStyleSection; 