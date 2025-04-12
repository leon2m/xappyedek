'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// GSAP'ı kaydet
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AppleScrollEffectProps {
  title: string;
  subtitle?: string;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  className?: string;
  useDarkBackground?: boolean;
}

export const AppleScrollEffect: React.FC<AppleScrollEffectProps> = ({
  title,
  subtitle,
  images,
  className,
  useDarkBackground = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Responsive tasarım için
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Scroll animasyonları
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Yumuşak geçişler için spring konfigürasyonu
  const springConfig = { damping: 25, stiffness: 80, mass: 0.5 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  // Parallax transform değerleri
  const titleY = useTransform(smoothProgress, [0, 0.5, 1], [0, -40, -80]);
  const subtitleOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [0, 0.7, 1]);
  
  // 3D kaydırma animasyonu
  useGSAP(() => {
    if (!sectionRef.current || !imagesContainerRef.current) return;
    
    // Resimleri stagger ile hareket ettir
    const images = imagesContainerRef.current.querySelectorAll('.scroll-image');
    
    // Scroll trigger ile resimleri gizle/göster
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.8,
      }
    })
    .fromTo(
      images,
      { 
        y: 60, 
        opacity: 0.2, 
        scale: 0.95,
        stagger: 0.1 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.1,
        ease: "power2.out"
      }
    );
    
    // 3D kaydırma efekti - resimleri scroll ile döndür
    images.forEach((image, index) => {
      const direction = index % 2 === 0 ? 1 : -1; // Alternatif yönler
      
      gsap.to(image, {
        rotateY: 5 * direction,
        rotateX: 3 * direction,
        scrollTrigger: {
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        ease: "power1.out"
      });
    });
    
    // Başlık ve altyazı animasyonu
    if (titleRef.current) {
      const titleElements = titleRef.current.querySelectorAll('h2, p');
      
      gsap.fromTo(
        titleElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative min-h-screen py-20 overflow-hidden",
        useDarkBackground 
          ? "bg-slate-800 text-contrast-white"
          : "bg-white text-contrast-dark",
        className
      )}
    >
      {/* Titre efekti */}
      <div 
        className="absolute inset-0 w-full h-full -z-10" 
        style={{
          background: useDarkBackground 
            ? "radial-gradient(circle at 50% 50%, rgba(76, 139, 50, 0.1), rgba(15, 23, 42, 0) 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(76, 139, 50, 0.05), rgba(255, 255, 255, 0) 70%)"
        }}
      />
      
      <div className="container mx-auto px-6 z-10">
        {/* Başlık bölümü */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-24"
          style={{ y: titleY }}
        >
          <h2 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight",
            useDarkBackground ? "text-white" : "text-slate-800"
          )}>
            {title}
          </h2>
          
          {subtitle && (
            <motion.p 
              className={cn(
                "text-xl md:text-2xl max-w-3xl mx-auto",
                useDarkBackground ? "text-slate-300" : "text-slate-600"
              )}
              style={{ opacity: subtitleOpacity }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
        
        {/* Görsel galerisi */}
        <div 
          ref={imagesContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className={cn(
                "scroll-image overflow-hidden rounded-2xl shadow-lg transform-gpu",
                useDarkBackground ? "bg-slate-700" : "bg-slate-50",
                "transition-all duration-500 hover:scale-[1.02]",
                index % 2 === 0 ? "md:translate-y-12" : ""
              )}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppleScrollEffect; 