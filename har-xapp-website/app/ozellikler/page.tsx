'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  HiSparkles, 
  HiOutlineArrowNarrowRight, 
  HiOfficeBuilding,
  HiUserGroup, 
  HiHome,
  HiCurrencyDollar,
  HiChatAlt,
  HiShoppingBag,
  HiDesktopComputer,
  HiChartBar,
  HiLightBulb,
  HiHeart,
  HiAcademicCap,
  HiCheck,
} from 'react-icons/hi';
import { RiRecycleLine } from 'react-icons/ri';
import React from 'react';

// GSAP kaydı
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Module {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface ModuleCardProps {
  module: Module;
  index: number;
  activeModuleId: string | null;
  setActiveModuleId: (id: string | null) => void;
}

// ModuleCard bileşenini performans için optimize edelim
const ModuleCard = React.memo(({ module, index, activeModuleId, setActiveModuleId }: ModuleCardProps) => {
  // Seçili modülü kontrol etmek için basit bir karşılaştırma
  const isSelected = activeModuleId === module.id;
  
  // useCallback ile performansı arttıralım
  const handleClick = React.useCallback(() => {
    setActiveModuleId(isSelected ? null : module.id);
  }, [isSelected, module.id, setActiveModuleId]);
  
  return (
    <motion.div
      onClick={handleClick}
      className={`relative w-full p-5 rounded-2xl bg-white/10 backdrop-blur-md cursor-pointer border-2 transition-all duration-300 mb-4 overflow-hidden ${
        isSelected ? 'border-primary shadow-lg' : 'border-white/10 hover:border-white/20'
      }`}
      style={{ 
        willChange: 'transform'
      }}
      initial={false}
      animate={{ 
        height: isSelected ? 'auto' : '100px' 
      }}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        height: { duration: 0.2 }
      }}
    >
      <div className="flex items-center gap-4">
        <div 
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            isSelected ? 'bg-primary text-white' : 'bg-white/20 text-white'
          }`}
        >
          {module.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            {module.title}
          </h3>
          <p className="text-white/60 text-sm">
            {module.description}
          </p>
        </div>
      </div>

      {isSelected && (
        <motion.div
          className="mt-6 space-y-4 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ul className="space-y-3">
            {module.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 text-primary">
                  <HiCheck className="w-4 h-4" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
});

// displayName ekleyerek geliştirme araçlarında tanımlayıcı isim olmasını sağlıyoruz
ModuleCard.displayName = 'ModuleCard';

// Ana Komponent
const FeatureGrid = () => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Modül veri seti
  const modules: Module[] = [
    {
      id: 'ik',
      icon: <HiUserGroup className="w-8 h-8 text-primary" />,
      title: 'İK & People Analytics',
      description: 'İnsan yönetimi güçlendirme.',
      features: [
        'Çalışan veri analizi ve segmentasyonu',
        'Performans yönetimi ve OKR takibi',
        'Çalışan geri bildirim platformu',
        'Yetenek yönetimi ve kariyer haritaları',
        'Gerçek zamanlı anket ve nabız yoklamaları'
      ]
    },
    {
      id: 'crm',
      icon: <HiOfficeBuilding className="w-8 h-8 text-primary" />,
      title: 'CRM & Satış',
      description: 'Müşteri ilişkilerini güçlendirin.',
      features: [
        'Müşteri segmentasyonu ve 360° görünüm',
        'Satış pipeline yönetimi',
        'Fırsat skorlama ve tahminleme',
        'Müşteri etkileşim analizi',
        'Eksiksiz müşteri yolculuk haritası'
      ]
    },
    {
      id: 'emlak',
      icon: <HiHome className="w-8 h-8 text-primary" />,
      title: 'Emlak & Konut',
      description: 'Gayrimenkul değerlendirme ve analiz.',
      features: [
        'Piyasa değeri tahminleme',
        'Bölgesel fiyat analizi',
        'Portföy optimizasyonu',
        'Yatırım getiri hesaplaması',
        'Talep-arz dengesi görselleştirme'
      ]
    },
    {
      id: 'finans',
      icon: <HiCurrencyDollar className="w-8 h-8 text-primary" />,
      title: 'Finans & Bankacılık',
      description: 'Finansal analiz ve raporlama.',
      features: [
        'Risk değerlendirme ve skorlama',
        'Müşteri davranış analizi',
        'Ödeme davranışları tahmini',
        'Sahtecilik tespiti',
        'Portföy optimizasyonu'
      ]
    },
    {
      id: 'egitim',
      icon: <HiAcademicCap className="w-8 h-8 text-primary" />,
      title: 'Eğitim',
      description: 'Öğrenme deneyimini özelleştirin.',
      features: [
        'Öğrenci başarı tahmini',
        'Kişiselleştirilmiş öğrenme yolları',
        'Eğitim içeriği optimizasyonu',
        'Öğrenme analitikleri',
        'Katılım ve motivasyon ölçümleri'
      ]
    },
    {
      id: 'eticaret',
      icon: <HiShoppingBag className="w-8 h-8 text-primary" />,
      title: 'E-Ticaret & Perakende',
      description: 'Satışları artırın, müşterileri tanıyın.',
      features: [
        'Ürün öneri motoru',
        'Müşteri segmentasyonu',
        'Fiyat optimizasyonu',
        'Sepet analizi',
        'Müşteri yaşam boyu değeri hesaplama'
      ]
    },
    {
      id: 'medya',
      icon: <HiDesktopComputer className="w-8 h-8 text-primary" />,
      title: 'Medya & İçerik',
      description: 'İçerik stratejinizi geliştirin.',
      features: [
        'İçerik performans analizi',
        'Kullanıcı ilgi alanları haritalama',
        'İçerik önerileri',
        'Kullanıcı etkileşim tahmini',
        'Trend tahminleme'
      ]
    },
    {
      id: 'uretim',
      icon: <RiRecycleLine className="w-8 h-8 text-primary" />,
      title: 'Üretim & Tedarik Zinciri',
      description: 'Operasyonları optimize edin.',
      features: [
        'Talep tahmini ve planlama',
        'Stok optimizasyonu',
        'Bakım öngörüsü',
        'Kalite kontrol otomasyonu',
        'Tedarik zinciri görünürlüğü'
      ]
    },
    {
      id: 'pazarlama',
      icon: <HiChatAlt className="w-8 h-8 text-primary" />,
      title: 'Pazarlama & Müşteri Deneyimi',
      description: 'Kampanyaları optimize edin.',
      features: [
        'Kampanya performans tahmini',
        'Kitle segmentasyonu',
        'Kanal optimizasyonu',
        'İletişim zamanlaması',
        'Müşteri yolculuk analizi'
      ]
    },
    {
      id: 'saglik',
      icon: <HiHeart className="w-8 h-8 text-primary" />,
      title: 'Sağlık & Yaşam Bilimleri',
      description: 'Sağlık verilerini analiz edin.',
      features: [
        'Hasta sonuç tahmini',
        'Tedavi planı optimizasyonu',
        'Hastalık risk değerlendirmesi',
        'İlaç etkileşim analizi',
        'Kaynak tahsisi ve planlama'
      ]
    },
    {
      id: 'inovasyon',
      icon: <HiLightBulb className="w-8 h-8 text-primary" />,
      title: 'Ar-Ge & İnovasyon',
      description: 'Yenilikçi ürünler geliştirin.',
      features: [
        'Fikir yönetimi ve analizi',
        'Trend ve pazar fırsatları tespiti',
        'Proje başarı olasılığı tahmini',
        'Patent ve IP analizi',
        'İnovasyon portföy yönetimi'
      ]
    },
    {
      id: 'analitik',
      icon: <HiChartBar className="w-8 h-8 text-primary" />,
      title: 'İş Analitiği & Raporlama',
      description: 'Veri odaklı kararlar alın.',
      features: [
        'Özelleştirilebilir KPI dashboardları',
        'Otomatik rapor oluşturma',
        'Veri görselleştirme',
        'Çok boyutlu analiz',
        'Performans tahminleme'
      ]
    },
  ];
  
  // Parallax efektleri için değerler - önceden yükleme için düzeltildi
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);
  
  // Performans optimizasyonu: Daha erken yükleme için değerler güncellendi
  const contentOpacity = useTransform(scrollYProgress, [0.01, 0.08], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.01, 0.08], [50, 0]);
  
  // Scroll animasyonu için GSAP - daha hızlı yüklenecek şekilde optimize edildi
  useEffect(() => {
    if (!containerRef.current) return;
    
    const animElements = gsap.utils.toArray(".feature-grid-item");
    const footerElements = gsap.utils.toArray(".feature-footer");
    
    if (animElements.length === 0) return;
    
    // Performans optimizasyonu için Observer kullanıyoruz
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px 100px 0px", // Görünmeden 100px önce yukarıda yükleme yapacak
      threshold: 0.1
    };
    
    // İçerikleri daha erken yüklemek için IntersectionObserver kullanımı
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Yeni GSAP timeline'ı her element için oluşturuyoruz
          const item = entry.target;
          gsap.to(item as Element, {
            y: 0,
            opacity: 1,
            duration: 0.15,
            clearProps: "all",
            onComplete: () => observer.unobserve(item)
          });
        }
      });
    }, observerOptions);
    
    // Her grid item'ı gözlemlemek için
    animElements.forEach(item => {
      gsap.set(item as Element, { y: 20, opacity: 0 });
      observer.observe(item as Element);
    });
    
    // Batch animasyon işlemi için - daha verimli ve erken tetiklenen
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".feature-grid",
        start: "top bottom-=100", // Viewport'un altından 100px önce başlatıyoruz
        once: true,
      }
    });
    
    // Footer için scroll trigger
    if (footerElements.length > 0) {
      gsap.fromTo(footerElements, 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.2,
          stagger: 0.01,
          scrollTrigger: {
            trigger: ".py-20.bg-white\\/50",
            start: "top bottom-=150", // Footer daha erken yüklenecek
            once: true
          }
        }
      );
    }
    
    return () => {
      // Temizleme işlemleri
      observer.disconnect();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Basitleştirilmiş Arka Plan */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white to-primary-50">
        {/* Grid Arka Planı - basitleştirildi */}
        <div className="absolute inset-0 bg-grid-primary/10 opacity-20" />
      </div>
      
      {/* Ana İçerik - daha hızlı animasyonlarla */}
      <div className="relative z-10">
        {/* Hero Başlık - animasyonlar hızlandırıldı */}
        <motion.div 
          className="h-screen flex flex-col items-center justify-center text-center px-4"
          style={{ y: titleY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center rounded-full bg-white/30 backdrop-blur-md px-6 py-2 text-lg font-medium text-primary border border-primary/20 shadow-lg shadow-primary/10">
              <span className="mr-2 bg-primary rounded-full p-1 flex items-center justify-center">
                <HiSparkles className="w-4 h-4 text-white" />
              </span>
              Çalışan Deneyimi Platformu
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link href="/demo-talep" className="group relative overflow-hidden inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 rounded-lg"></div>
              <div className="relative z-10 px-10 py-4 rounded-lg flex items-center text-white font-medium">
                <span className="mr-2">Demo Talep Et</span>
                <HiOutlineArrowNarrowRight className="text-white text-xl" />
              </div>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Modüller Bölümü - hızlı yükleme için optimize edildi */}
        <motion.div 
          className="min-h-screen py-20"
          style={{ 
            opacity: contentOpacity,
            y: contentY,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
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
                <div key={module.id} className="feature-grid-item">
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
        
        {/* Öne Çıkan Özellikler - hızlı yükleme için optimize edildi */}
        <div className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16 feature-footer">
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
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-primary-50 feature-footer"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-4 inline-flex mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-20 feature-footer">
              <Link
                href="/demo-talep"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center inline-flex gap-2"
              >
                <span>Ücretsiz Demo İsteyin</span>
                <HiOutlineArrowNarrowRight className="text-white text-xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid; 