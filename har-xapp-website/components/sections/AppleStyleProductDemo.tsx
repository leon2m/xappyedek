'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { AppleStyleSection } from './parallax/AppleStyleSection';
import { AppleProductCard } from './parallax/AppleProductCard';

// GSAP'ı kaydet
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Ürün özellikleri
const PRODUCT_FEATURES = [
  {
    id: 1,
    title: 'Gerçekçi 3D Deneyim',
    description: 'Özel AR teknolojimizle gerçek dünya ve sanal içerik kusursuz biçimde harmanlanır',
    imageSrc: '/images/demo/ar-feature-1.jpg',
    badgeText: 'Yeni'
  },
  {
    id: 2,
    title: 'Doğal Etkileşim',
    description: 'El hareketleri ve sesli komutlarla sanal öğeleri kontrol edin',
    imageSrc: '/images/demo/ar-feature-2.jpg',
    badgeText: 'Gelişmiş'
  },
  {
    id: 3, 
    title: 'Çoklu Kullanıcı',
    description: 'Aynı AR deneyimini farklı cihazlarda aynı anda paylaşın',
    imageSrc: '/images/demo/ar-feature-3.jpg',
    badgeText: 'Premium'
  }
];

export const AppleStyleProductDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Transform efektleri
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // GSAP animasyonları
  useGSAP(() => {
    if (!containerRef.current || !productsRef.current || !featureCardsRef.current) return;
    
    // Ürün kartlarını stagger ile animasyonla gösterme
    const cards = featureCardsRef.current.querySelectorAll('.product-card');
    
    gsap.fromTo(
      cards,
      { 
        y: 100, 
        opacity: 0, 
        rotateX: 10, 
        rotateY: -5 
      },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        rotateY: 0, 
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featureCardsRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Ana ürün görselini scroll'a bağlı döndürme animasyonu
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    })
    .to(".main-product-image", {
      rotateY: 360,
      duration: 1,
      ease: "none"
    });
    
  }, []);
  
  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Arka plan efekti */}
      <motion.div 
        className="absolute inset-0 w-full h-full -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-950 via-black to-black opacity-90" />
        <div className="absolute top-20 -left-20 w-[40vw] h-[40vw] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-40 right-10 w-[30vw] h-[30vw] rounded-full bg-purple-500/20 blur-[100px]" />
      </motion.div>
      
      {/* Ana ürün bölümü */}
      <AppleStyleSection
        title="AR Çözümleri"
        subtitle="Yeni Nesil"
        description="Sanal ve gerçek dünyayı bir araya getiren özel AR teknolojimizle tanışın. Doğal ve etkileyici kullanıcı deneyimi için geliştirildi."
        imageSrc="/images/demo/ar-main-product.png"
        imageAlt="AR Gözlük"
        hasGlow={true}
        glowColor="rgba(59, 130, 246, 0.5)"
        className="min-h-[90vh]"
      >
        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Daha Fazla Bilgi
        </button>
      </AppleStyleSection>
      
      {/* Ürünün özellikleri - ürün kartları */}
      <div className="bg-black py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Öne Çıkan Özellikler
            </h2>
            <p className="text-xl text-gray-400">
              AR teknolojimizin sunduğu benzersiz özelliklerle tanışın.
            </p>
          </div>
          
          <div 
            ref={featureCardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {PRODUCT_FEATURES.map((feature) => (
              <AppleProductCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                imageSrc={feature.imageSrc}
                imageAlt={feature.title}
                badgeText={feature.badgeText}
                badgeColor={
                  feature.badgeText === 'Yeni' 
                    ? 'bg-blue-500' 
                    : feature.badgeText === 'Gelişmiş' 
                    ? 'bg-purple-500' 
                    : 'bg-amber-500'
                }
                hasGlow={true}
                glowColor={
                  feature.badgeText === 'Yeni' 
                    ? 'rgba(59, 130, 246, 0.4)' 
                    : feature.badgeText === 'Gelişmiş' 
                    ? 'rgba(168, 85, 247, 0.4)' 
                    : 'rgba(245, 158, 11, 0.4)'
                }
                className="product-card"
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Teknik özellikler bölümü */}
      <div className="bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">
                Teknik Özellikler
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: 'Görüş Alanı', value: '120° diagonal' },
                  { label: 'Çözünürlük', value: '2560 x 1600 (per eye)' },
                  { label: 'Yenileme Hızı', value: '120Hz' },
                  { label: 'Sensörler', value: '6DoF tracking, IMU, Eye tracking' },
                  { label: 'Bağlantı', value: 'Wi-Fi 6, Bluetooth 5.2, USB-C' },
                  { label: 'Pil Ömrü', value: '4 saat (aktif kullanım)' }
                ].map((spec, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center py-4 border-b border-gray-800"
                  >
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button className="bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300">
                  Teknik Detaylar
                </button>
              </div>
            </div>
            
            <div className="relative h-[400px] md:h-[600px] order-1 lg:order-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[80%] h-[80%] main-product-image">
                  <Image
                    src="/images/demo/ar-product-specs.png"
                    alt="AR Gözlük Teknik Detaylar"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Teknik detay işaretleri */}
              <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-blue-500 animate-ping" />
              <div className="absolute top-1/2 right-1/3 w-6 h-6 rounded-full bg-purple-500 animate-ping animation-delay-700" />
              <div className="absolute bottom-1/3 left-1/3 w-6 h-6 rounded-full bg-amber-500 animate-ping animation-delay-1500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleStyleProductDemo; 