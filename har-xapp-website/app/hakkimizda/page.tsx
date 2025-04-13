'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP kaydı
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax efektleri için değerler
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.5]);
  
  // Mouse hareketi takibi
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoother parallax için spring efekti
  const springConfig = { damping: 25, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  
  // Ekran boyutuna göre görüntü genişliğini ayarla
  const [imageWidth, setImageWidth] = useState(500);
  
  useEffect(() => {
    const handleResize = () => {
      setImageWidth(window.innerWidth < 768 ? window.innerWidth - 40 : 500);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Mouse hareketi izleme
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Mouse pozisyonunu normalize et (-0.5 ile 0.5 arasında)
      const x = (event.clientX / window.innerWidth) - 0.5;
      const y = (event.clientY / window.innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // GSAP animasyonları
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Paralaks efekti için elementler
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element, index) => {
        const depth = parseFloat((element as HTMLElement).dataset.depth || "0.1");
        
        gsap.fromTo(element,
          { y: 0 },
          {
            y: () => -window.innerHeight * depth,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );
      });
      
      gsap.fromTo('.title-animation', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%'
          }
        }
      );
      
      gsap.fromTo('.team-animation', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-section',
            start: 'top 80%'
          }
        }
      );
    }
  }, []);
  
  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Parallax Dekoratif Elementler */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-primary/10 parallax-element"
          data-depth="0.25"
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]), 
            y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20])
          }}
        />
        
        <motion.div 
          className="absolute top-40 right-10 w-60 h-60 rounded-full bg-secondary/10 parallax-element"
          data-depth="0.15"
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [15, -15])
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full bg-primary/5 parallax-element"
          data-depth="0.35"
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [-25, 25])
          }}
        />
        
        <motion.div 
          className="absolute -bottom-10 right-1/3 w-72 h-72 rounded-full bg-secondary/5 parallax-element"
          data-depth="0.2"
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [30, -30])
          }}
        />
        
        {/* Arka plandaki grid desen */}
        <div className="absolute inset-0 bg-grid-primary/5 opacity-30 parallax-element" data-depth="0.05" />
        
        {/* Floating shapes */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-12 h-12 bg-transparent border-2 border-primary/20 rounded-lg parallax-element"
          data-depth="0.3"
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [-50, 50]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]),
            rotate: useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15])
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-transparent border-2 border-secondary/20 rounded-full parallax-element"
          data-depth="0.25"
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [40, -40]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]),
            scale: useTransform(mouseYSpring, [-0.5, 0.5], [0.9, 1.1])
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-20 h-8 bg-transparent border-2 border-primary/10 rounded-lg parallax-element"
          data-depth="0.2"
          style={{ 
            x: useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]),
            rotate: useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10])
          }}
        />
      </div>
      
      {/* Hero Bölümü */}
      <div className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Arkaplan */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-primary-50 z-0">
          <div className="absolute inset-0 bg-grid-primary/10 opacity-20" />
        </div>
        
        {/* Ön içerik */}
        <motion.div
          className="relative z-10 container mx-auto px-4 text-center"
          style={{ y: titleY, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <motion.span 
              className="inline-flex items-center rounded-full bg-white/30 backdrop-blur-md px-6 py-2 text-lg font-medium text-primary border border-primary/20 shadow-lg shadow-primary/10"
              style={{ 
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]),
                rotate: useTransform(mouseXSpring, [-0.5, 0.5], [-1, 1])
              }}
            >
              Sürdürülebilir Çözümler
            </motion.span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ 
              z: useTransform(mouseYSpring, [-0.5, 0.5], [50, -50]),
            }}
          >
            <motion.span 
              className="block" 
              style={{ 
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5])
              }}
            >
              H-AR XaPP
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              style={{ 
                x: useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8])
              }}
            >
              Hakkında
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-700 max-w-3xl mx-auto mb-10"
            style={{ 
              x: useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12])
            }}
          >
            Çalışan Deneyimi İçin Tasarlanmış Süper Uygulama. Sadelikten İlham Alıyor.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            style={{ y: useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]) }}
          >
            <motion.svg 
              className="w-8 h-8 text-primary animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              whileHover={{ scale: 1.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Ana İçerik Bölümleri */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Şirket Tanıtımı */}
          <div className="max-w-4xl mx-auto mb-24 fade-in">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Vizyonumuz
              </span>
            </h2>
            
            <div className="prose prose-lg max-w-none text-slate-700">
              <p>
                AR Solutions tarafından geliştirilen <strong>H-AR XaPP</strong>, kurumsal iç süreçleri ve çalışan deneyimini yeniden tanımlamak üzere tasarlanmış, modüler yapıya sahip premium bir "süper uygulamadır". Kurumların benzersiz ihtiyaçlarına göre şekillenen H-AR XaPP, iletişimi güçlendirir, süreçleri optimize eder ve çalışan bağlılığını artırır.
              </p>
              
              <p>
                SAP ve Microsoft ekosistemleriyle entegre çalışarak, dijital çalışma ortamınızın doğal bir uzantısı haline gelir. Oryantasyon süreçlerinden günlük iş akışlarına kadar tüm temas noktalarını tek bir zarif ve işlevsel arayüzde toplar.
              </p>
              
              <p>
                Japon tasarım felsefesinden ilham alan platform, yalın çizgiler, amaç odaklı sadelik ve beyaz, #4C8B32 (birincil yeşil) ve #95C01E (ikincil yeşil) renklerinden oluşan huzur veren bir palet ile sade, berrak ve kullanıcı dostu bir deneyim sunar.
              </p>
            </div>
          </div>
          
          {/* Özellikler Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24" id="vizyon">
            {[
              {
                title: 'Modüler Mimari',
                description: 'İhtiyacınız olan modülleri etkinleştirin. Sistemin tamamını etkilemeden modül ekleyin, çıkarın ya da özelleştirin.',
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                )
              },
              {
                title: 'SAP & Microsoft Entegrasyonu',
                description: 'Görevleri otomatikleştirin, erişimi sadeleştirin, sistemler arası gerçek zamanlı veri akışını sağlayın.',
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                )
              },
              {
                title: 'Kurumsal İletişim Merkezi',
                description: 'Duyurular yapın, iç kampanyalar yönetin, markanızla tutarlı bir iletişim dili kurun.',
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                )
              },
              {
                title: 'Çalışan Deneyimi Paketi',
                description: 'Geri bildirim araçları, iyilik halleri takibi, oyunlaştırılmış takdir sistemleri ile çalışan bağlılığını güçlendirin.',
                icon: (
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 fade-in border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary/10 rounded-full p-3 inline-flex mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Ekibimiz Bölümü */}
          <div className="mb-24 fade-in" id="ekip">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ekibimiz
              </span>
            </h2>
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-lg text-slate-700">
                AR Solutions olarak teknoloji ekosistemindeki en yetenekli uzmanları bir araya getiriyoruz. 
                Farklı disiplinlerden gelen ekip üyelerimiz, H-AR XaPP'in geliştirilmesi ve sürekli iyileştirilmesi için çalışıyor.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {[
                {
                  role: 'Yazılım Geliştirme',
                  count: '12 Uzman',
                  positions: [
                    '3 Backend Developer (Java, Python, C#)',
                    '4 Frontend Developer (React, Next.js)',
                    '2 Mobil Uygulama Geliştiricisi (Flutter)',
                    '2 DevOps Mühendisi',
                    '1 QA Uzmanı'
                  ],
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )
                },
                {
                  role: 'Tasarım & UX Ekibi',
                  count: '6 Uzman',
                  positions: [
                    '2 UX/UI Tasarımcısı',
                    '1 Grafik Tasarımcı',
                    '1 İçerik Tasarımcısı',
                    '1 Kullanıcı Deneyimi Araştırmacısı',
                    '1 İçerik Stratejisti'
                  ],
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  role: 'Modül Uzmanları',
                  count: '9 Uzman',
                  positions: [
                    '3 SAP Entegrasyon Uzmanı',
                    '2 Microsoft 365 Uzmanı',
                    '2 İnsan Kaynakları Çözümleri Uzmanı',
                    '1 Finans & Muhasebe Çözümleri Uzmanı',
                    '1 Operasyon Yönetimi Uzmanı'
                  ],
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  )
                },
                {
                  role: 'Siber Güvenlik & Altyapı',
                  count: '5 Uzman',
                  positions: [
                    '1 Siber Güvenlik Direktörü',
                    '2 Güvenlik Mühendisi',
                    '1 Veri Koruma Uzmanı',
                    '1 Cloud Mimarı'
                  ],
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )
                },
                {
                  role: 'Müşteri Başarısı',
                  count: '7 Uzman',
                  positions: [
                    '1 Müşteri Başarı Yöneticisi',
                    '2 Uygulama Danışmanı',
                    '2 Teknik Destek Uzmanı',
                    '1 Eğitim Uzmanı',
                    '1 Müşteri İlişkileri Yöneticisi'
                  ],
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )
                },
                {
                  role: 'Yönetim & Strateji',
                  count: '6 Uzman',
                  positions: [
                    '1 CEO & Kurucu',
                    '1 Teknoloji Direktörü (CTO)',
                    '1 Ürün Direktörü (CPO)',
                    '1 Satış & Pazarlama Direktörü',
                    '1 İş Geliştirme Yöneticisi',
                    '1 İnsan Kaynakları Yöneticisi'
                  ],
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                }
              ].map((team, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        {team.icon}
                      </div>
                      <span className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                        {team.count}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">{team.role}</h3>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      {team.positions.map((position, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {position}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-slate-600">
                Toplam <span className="font-bold text-primary">45</span> uzman çalışanımız ile H-AR XaPP'i geliştirmeye ve müşterilerimize en iyi hizmeti sunmaya devam ediyoruz.
              </p>
            </div>
          </div>
          
          {/* Neden H-AR XaPP Bölümü */}
          <div className="bg-primary/5 rounded-3xl p-10 mb-24 fade-in">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Neden H-AR XaPP?
              </span>
            </h2>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-1 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-slate-700">
                  <strong>Çünkü çalışanlarınız, en az sizin kadar akıllı, esnek ve zarif bir platformu hak ediyor.</strong> Kullanıcı dostu arayüzümüz, karmaşık iş süreçlerini basitleştirerek çalışan verimliliğini artırır.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-1 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-slate-700">
                  <strong>Çünkü çalışan deneyimi sadece bir İK hedefi değil, aynı zamanda stratejik bir avantajdır.</strong> Çalışanlarınızın bağlılığını ve memnuniyetini artırarak işletmenizin genel performansını yükseltir.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-1 mt-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-slate-700">
                  <strong>Çünkü doğayla ve çevreyle uyumlu bir kurumsal çalışma prensibi benimsiyoruz.</strong> Sürdürülebilir iş modelleri için dijital dönüşüm yolculuğunuzda yanınızdayız.
                </p>
              </div>
            </div>
          </div>
          
          {/* İş Ortaklarımız */}
          <div className="mb-20 fade-in" id="partnerler">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                İş Ortaklarımız
              </span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {["Microsoft", "SAP", "Google Cloud", "Amazon Web Services"].map((partner, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center h-24">
                  <div className="text-gray-400 font-medium text-lg">{partner}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-10 text-white text-center fade-in">
            <h2 className="text-3xl font-bold mb-6">Çalışan Deneyimini Dönüştürün</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              H-AR XaPP ile dijital çalışma ortamınızı dönüştürmeye hazır mısınız? Ücretsiz demo talebi oluşturun.
            </p>
            <Link
              href="/demo-talep"
              className="inline-flex items-center bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <span>Demo Talep Et</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 