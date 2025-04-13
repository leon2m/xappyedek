'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { HiOutlineArrowNarrowRight, HiUserGroup, HiCurrencyDollar, HiOfficeBuilding, HiShoppingBag, 
  HiDesktopComputer, HiChartBar, HiLightBulb, HiSparkles, HiAcademicCap, HiHeart } from 'react-icons/hi';
import { RiRecycleLine } from 'react-icons/ri';
import type { ReactNode } from 'react';

  gsap.registerPlugin(ScrollTrigger);

// Modül arayüzü
interface ModuleType {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
}

// Modül kartı bileşeni
const ModuleCard = ({ module, index, activeModuleId, setActiveModuleId }: { 
  module: ModuleType, 
  index: number,
  activeModuleId: string | null,
  setActiveModuleId: (id: string | null) => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const isActive = activeModuleId === module.id;
  
  // 3D Tilt efekti
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isActive) return; // Aktif kartlarda tilt efekti devre dışı
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = x / rect.width - 0.5;
      const yPercent = y / rect.height - 0.5;
      
      gsap.to(card, {
        rotationY: xPercent * 10,
        rotationX: yPercent * -10,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      if (isActive) return;
      
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive]);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl p-6 shadow-xl border border-primary-100 transform-gpu cursor-pointer
        ${isActive ? 'bg-white/95 backdrop-blur-lg z-20' : 'bg-white/70 backdrop-blur-md hover:bg-white/80'}`}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={() => setActiveModuleId(isActive ? null : module.id)}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10"
        animate={{ 
          opacity: isActive ? 0.3 : 0.1,
          scale: isActive ? 1.05 : 1
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div
        className="relative z-10"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="flex items-center">
          <div className="text-3xl p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          {module.icon}
        </div>
          <h3 className="text-xl font-bold ml-3">{module.title}</h3>
      </div>

        <AnimatePresence>
          {isActive && (
        <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 my-4">{module.description}</p>
              
              <ul className="space-y-2 my-6">
                {module.features.map((feature: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + (i * 0.1) }}
                    className="flex items-start"
                  >
                    <span className="text-primary mr-2 mt-1">
                      <HiSparkles className="w-4 h-4" />
                </span>
                <span>{feature}</span>
                  </motion.li>
            ))}
          </ul>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <span>Detaylı Bilgi</span>
                <HiOutlineArrowNarrowRight className="ml-2" />
              </motion.div>
        </motion.div>
      )}
        </AnimatePresence>
      </div>
      
      {/* 3D efekti için dekoratif öğeler */}
      <motion.div 
        className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10" 
        style={{ transform: 'translateZ(10px)' }}
        animate={{ 
          scale: isActive ? [1, 1.2, 1] : 1,
          opacity: isActive ? [0.3, 0.6, 0.3] : 0.3,
        }}
        transition={{ 
          duration: 4, 
          repeat: isActive ? Infinity : 0,
          repeatType: 'reverse'
        }}
      />
      <motion.div 
        className="absolute top-10 right-10 w-8 h-8 rounded-full bg-primary/10" 
        style={{ transform: 'translateZ(20px)' }}
        animate={{ 
          y: isActive ? [0, -10, 0] : 0,
          opacity: isActive ? [0.2, 0.5, 0.2] : 0.2,
        }}
        transition={{ 
          duration: 3, 
          repeat: isActive ? Infinity : 0,
          repeatType: 'reverse'
        }}
      />
    </motion.div>
  );
};

// Parallax Layer - Katmanlı Parallax Efekti İçin
const ParallaxLayer = ({ depth, children, className = "" }: { 
  depth: number, 
  children: ReactNode,
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (e.clientX - innerWidth / 2) / innerWidth,
        y: (e.clientY - innerHeight / 2) / innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{ 
        transform: `translate3d(${mousePosition.x * depth * 50}px, ${mousePosition.y * depth * 50}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {children}
    </div>
  );
};

const FeatureGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  // Modüller ve özellikleri
  const modules: ModuleType[] = [
    {
      id: 'hr',
      icon: <HiUserGroup className="w-8 h-8 text-primary" />,
      title: 'İnsan Kaynakları',
      description: 'Çalışan yaşam döngüsünün dijital merkezi.',
      features: [
        'AI destekli işe alım ve aday değerlendirme',
        'Dijital onboarding ve oryantasyon süreçleri',
        'Personel özlük ve bordro yönetimi (SAP entegre)',
        'İzin yönetimi ve takvim entegrasyonu',
        'Performans değerlendirme ve 360° geri bildirim'
      ]
    },
    {
      id: 'finans',
      icon: <HiCurrencyDollar className="w-8 h-8 text-primary" />,
      title: 'Finans & Mali İşler',
      description: 'Finansal süreçlerde şeffaflık ve otomasyon.',
      features: [
        'Mobil masraf yönetimi ve OCR destekli fiş tarama',
        'Dijital avans talep ve kapatma işlemleri',
        'Fatura onay akışları ve SAP entegrasyonu',
        'Departman bazlı bütçe takibi ve analizi',
        'Finansal raporlama ve dashboardlar'
      ]
    },
    {
      id: 'idari',
      icon: <HiOfficeBuilding className="w-8 h-8 text-primary" />,
      title: 'İdari İşler',
      description: 'Operasyonel süreçlerin dijitalleşmesi.',
      features: [
        'Toplantı odası ve kaynak rezervasyonu',
        'Ofis malzemesi ve teknik destek talepleri',
        'Dijital ziyaretçi yönetimi',
        'Araç filosu ve ulaşım talep yönetimi',
        'Yemekhane menü ve sipariş sistemi'
      ]
    },
    {
      id: 'lojistik',
      icon: <HiShoppingBag className="w-8 h-8 text-primary" />,
      title: 'Lojistik',
      description: 'İç lojistik ve stok görünürlüğü.',
      features: [
        'Departmanlar arası gönderi takibi',
        'Stok seviyesi izleme ve talep yönetimi',
        'Pazarlama malzemeleri envanteri',
        'Sevkiyat planlaması ve izleme',
        'Tedarikçi performans değerlendirmesi'
      ]
    },
    {
      id: 'it',
      icon: <HiDesktopComputer className="w-8 h-8 text-primary" />,
      title: 'BT Destek',
      description: 'Merkezi BT destek yönetimi.',
      features: [
        'Ticket oluşturma ve takip sistemi',
        'AI destekli bilgi bankası ve çözüm merkezi',
        'BT envanteri ve zimmet yönetimi',
        'Planlı kesinti ve bakım bildirimleri',
        'Self servis çözüm merkezi'
      ]
    },
    {
      id: 'satis',
      icon: <HiChartBar className="w-8 h-8 text-primary" />,
      title: 'Satış & Pazarlama',
      description: 'Satış ve pazarlama etkinliği artırma.',
      features: [
        'Merkezi dijital varlık yönetimi',
        'Kampanya takvimi ve görev atama',
        'Lead ve fırsat yönetimi (CRM entegrasyonu)',
        'Pazar ve rakip analizi raporları',
        'Etkinlik ve fuar yönetimi'
      ]
    },
    {
      id: 'ar-ge',
      icon: <HiLightBulb className="w-8 h-8 text-primary" />,
      title: 'Ar-Ge & Proje Yönetimi',
      description: 'İnovasyon ve proje yönetimi merkezi.',
      features: [
        'Fikir toplama ve değerlendirme platformu',
        'Proje yönetimi ve Gantt şemaları',
        'İnteraktif Kanban panoları',
        'Risk ve sorun takibi',
        'Proje performans dashboardları'
      ]
    },
    {
      id: 'surdurulebilirlik',
      icon: <RiRecycleLine className="w-8 h-8 text-primary" />,
      title: 'Sürdürülebilirlik',
      description: 'ESG performansı ve çalışan katılımı.',
      features: [
        'ESG hedefleri ve performans takibi',
        'KSS ve gönüllülük projeleri platformu',
        'Çalışan öneri sistemi',
        'Sürdürülebilirlik eğitim materyalleri',
        'Karbon ayak izi hesaplama araçları'
      ]
    },
    {
      id: 'akademi',
      icon: <HiAcademicCap className="w-8 h-8 text-primary" />,
      title: 'Kurumsal Akademi',
      description: 'Kurumsal hafıza ve sürekli öğrenme.',
      features: [
        'Merkezi bilgi bankası ve dokümantasyon',
        'AI destekli akıllı arama',
        'Öğrenme yolları ve mikro eğitimler',
        'Bilgi paylaşım forumları',
        'İçerik kullanım analitiği'
      ]
    },
    {
      id: 'wellness',
      icon: <HiHeart className="w-8 h-8 text-primary" />,
      title: 'Sağlık & İyi Olma Hali',
      description: 'Bütünsel çalışan sağlığı desteği.',
      features: [
        'Wellness içerik kütüphanesi',
        'Etkinlik ve program katılım platformu',
        'Kişisel sağlık risk değerlendirmeleri',
        'Randevu ve destek sistemleri',
        'İlgi grupları ve topluluk oluşturma'
      ]
    }
  ];
  
  // Parallax efektleri için değerler
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.05, 0.2], [100, 0]);
  
  // Scroll animasyonu için GSAP
  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.to(".feature-grid-item", {
            y: 0,
            opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".feature-grid",
        start: "top 70%",
        end: "top 20%",
        scrub: 1,
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Futuristik Arka Plan */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-white to-primary-50">
        {/* Grid Arka Planı */}
        <div className="absolute inset-0 bg-grid-primary/10 opacity-30" />
        
        {/* Dekoratif Öğeler */}
        <ParallaxLayer depth={0.1} className="pointer-events-none">
          <div className="absolute top-20 right-[10%] w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-40 left-[5%] w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
          <motion.div 
            className="absolute top-[40%] right-[30%] w-60 h-60 rounded-full border border-primary/10"
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </ParallaxLayer>
        
        <ParallaxLayer depth={0.2} className="pointer-events-none">
          <motion.div 
            className="absolute bottom-[10%] right-[20%] w-80 h-80 rounded-full border border-secondary/10"
            animate={{ 
              rotate: -360,
              scale: [1.05, 0.95, 1.05]
            }}
            transition={{ 
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <div className="absolute top-[30%] left-[15%] w-40 h-40 rounded-full bg-secondary/10 blur-xl"></div>
        </ParallaxLayer>
        
        <ParallaxLayer depth={0.3} className="pointer-events-none">
          {/* Işık Efektleri */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.4)"
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </ParallaxLayer>
      </div>
      
      {/* Ana İçerik */}
      <div className="relative z-10">
        {/* Hero Başlık */}
        <motion.div 
          className="h-screen flex flex-col items-center justify-center text-center px-4"
          style={{ y: titleY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center rounded-full bg-white/30 backdrop-blur-md px-6 py-2 text-lg font-medium text-primary border border-primary/20 shadow-lg shadow-primary/10">
              <span className="mr-2 bg-primary rounded-full p-1 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 text-white"
                >
                  <HiSparkles className="w-4 h-4" />
                </motion.div>
              </span>
              Çalışan Deneyimi Platformu
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="block">H-AR XaPP</span>
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Zengin Modüller
            </span>
          </motion.h1>
          
          <motion.p
            style={{ opacity: subtitleOpacity }}
            className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-8"
          >
            İşletmenizi dijital dönüşüm yolculuğunda bir üst seviyeye taşıyacak, yapay zeka 
            destekli premium süper uygulama.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link href="/demo-talep" className="group relative overflow-hidden inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 rounded-lg"></div>
              <div className="relative z-10 px-10 py-4 rounded-lg flex items-center text-white font-medium">
                <span className="mr-2">Demo Talep Et</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                <HiOutlineArrowNarrowRight className="text-white text-xl" />
                </motion.div>
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-primary"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Modüller Bölümü */}
        <motion.div 
          className="min-h-screen py-20"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Modüler & Entegre Yapı</h2>
              <p className="text-lg text-slate-700">
                H-AR XaPP, işletmenizin tüm operasyonel ihtiyaçlarını karşılayan, modüler yapıda 
                tasarlanmış premium bir süper uygulamadır. Her modül kendi içinde güçlü özellikler 
                sunarken, modüller arası kusursuz entegrasyon da sağlanmıştır.
              </p>
            </div>
            
            <div className="feature-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <div key={module.id} className="feature-grid-item opacity-0 translate-y-10">
                  <ModuleCard 
                    module={module} 
                    index={index} 
                    activeModuleId={activeModuleId}
                    setActiveModuleId={setActiveModuleId}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Öne Çıkan Özellikler */}
        <div className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Öne Çıkan Özellikler</h2>
              <p className="text-lg text-slate-700">
                H-AR XaPP&apos;in sunduğu premium özelliklerden faydalanın.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <HiSparkles className="w-8 h-8 text-primary" />,
                  title: 'Süper Uygulama',
                  description: 'Tüm çalışan ihtiyaçları için tek platform, kesintisiz deneyim.'
                },
                {
                  icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>,
                  title: 'SAP & Microsoft Entegrasyonu',
                  description: 'ERP ve Office araçlarıyla doğal entegrasyon.'
                },
                {
                  icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>,
                  title: 'Yapay Zeka Desteği',
                  description: 'Tüm modüllerde yerleşik AI özelliklerinden yararlanın.'
                },
                {
                  icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>,
                  title: 'Premium Kullanıcı Deneyimi',
                  description: 'Japon minimalizmi ile tasarlanmış arayüz ve akıcı animasyonlar.'
                },
                {
                  icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>,
                  title: 'Özelleştirilebilirlik',
                  description: 'Flow builder ile kendi iş akışlarınızı tasarlayın.'
                },
                {
                  icon: <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>,
                  title: 'Gelişmiş Analytics',
                  description: 'İş zekası ve detaylı raporlama yetenekleri.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-primary-50"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-4 inline-flex mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <Link
                href="/demo-talep"
                className="relative inline-flex group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2">Ücretsiz Demo İsteyin</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                <HiOutlineArrowNarrowRight className="text-white text-xl" />
                  </motion.div>
                </span>
                <div className="absolute top-0 left-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"></div>
                  <div className="absolute inset-0 flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[20%] h-full bg-white/20"
                        animate={{ 
                          x: ['-100%', '500%'],
                          opacity: [0, 0.5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 0.5
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid; 