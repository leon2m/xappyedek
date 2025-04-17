'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { BiMoney, BiReceipt, BiLineChart, BiCreditCard, BiBarChartAlt } from 'react-icons/bi';
import { HiOutlineArrowNarrowRight, HiOutlineChevronRight, HiCheckCircle } from 'react-icons/hi';

const FinanceModulePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const targetRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const { scrollYProgress: featuresScrollY } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });
  
  const heroY = useTransform(heroScrollY, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScrollY, [0, 0.8], [1, 0]);
  
  const featuresBgY = useTransform(featuresScrollY, [0, 1], [0, 100]);
  
  // Smooth scroll effect
  useEffect(() => {
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  const features = [
    {
      icon: <BiReceipt className="w-10 h-10 text-primary" />,
      title: 'Fatura ve Harcama Yönetimi',
      description: 'Tüm fatura ve harcama süreçlerinizi otomatikleştirerek zaman ve maliyet tasarrufu sağlayın.',
      details: [
        'OCR ile otomatik fatura tanıma ve işleme',
        'Çok seviyeli onay akışları',
        'Mobil harcama girişi ve fiş tarama',
        'Bütçe kontrolü ve uyarı sistemi',
        'Otomatik muhasebe entegrasyonu'
      ]
    },
    {
      icon: <BiCreditCard className="w-10 h-10 text-primary" />,
      title: 'Ödeme ve Nakit Akışı',
      description: 'Nakit akışınızı optimize ederek, ödemeleri planlayın ve likidite pozisyonunuzu güçlendirin.',
      details: [
        'Otomatik ödeme planlaması ve hatırlatıcılar',
        'Nakit akışı tahmin ve simülasyonu',
        'Banka hesapları entegrasyonu',
        'Çevrimiçi ve toplu ödeme yönetimi',
        'Tedarikçi ödeme portalı'
      ]
    },
    {
      icon: <BiBarChartAlt className="w-10 h-10 text-primary" />,
      title: 'Bütçe Planlama ve Kontrol',
      description: 'Şirketinizin finansal hedeflerine ulaşmasını sağlayacak kapsamlı bütçe planlama ve izleme araçları.',
      details: [
        'Departman bazlı bütçe oluşturma',
        'Gerçekleşme vs. planlama karşılaştırmaları',
        'Dinamik tahmin güncelleme',
        'Senaryo analizi ve modelleme',
        'Görsel bütçe raporları ve paneller'
      ]
    },
    {
      icon: <BiLineChart className="w-10 h-10 text-primary" />,
      title: 'Finansal Raporlama ve Analitik',
      description: 'Stratejik kararlar için ihtiyaç duyduğunuz tüm finansal verileri anlık ve net olarak görüntüleyin.',
      details: [
        'Özelleştirilebilir finansal dashboard',
        'Gelir, gider ve kârlılık analizleri',
        'Departman ve proje bazlı raporlama',
        'Eğilim analizi ve tahminleme',
        'Veri görselleştirme araçları'
      ]
    }
  ];

  const benefits = [
    {
      title: 'İşlem Verimliliği',
      description: 'Finans departmanınızın manuel işlemlerle harcadığı zamanı azaltın.',
      percentage: '60%',
      detail: 'İşlem maliyetlerinde azalma'
    },
    {
      title: 'Hızlı Onay Süreci',
      description: 'Otomatik onay akışları ile harcama ve ödemeleri hızlandırın.',
      percentage: '75%',
      detail: 'Onay sürecinde hızlanma'
    },
    {
      title: 'Veri Doğruluğu',
      description: 'Manuel veri girişi hatalarını ortadan kaldırarak finansal verilerinizin doğruluğunu artırın.',
      percentage: '98%',
      detail: 'Veri doğruluk oranı'
    },
    {
      title: 'Hızlı Kapanış',
      description: 'Ay sonu ve dönem sonu kapanış süreçlerinizi hızlandırın.',
      percentage: '65%',
      detail: 'Daha hızlı kapanış süreci'
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden" ref={targetRef}>
      {/* Hero Section */}
      <section ref={heroRef} className="py-16 md:py-20 px-4 relative overflow-hidden bg-white">
        <motion.div 
          className="absolute inset-0 bg-grid-slate-100 opacity-20"
          style={{ y: heroY }}
        ></motion.div>
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-primary/5 to-transparent"
          style={{ y: heroY, opacity: heroOpacity }}
        ></motion.div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"
              >
                <BiMoney className="w-5 h-5 mr-2" />
                Finans Modülü
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                Finansal Süreçlerinizi Dijitalleştirin
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 mb-6"
              >
                H-AR XaPP Finans modülü, fatura işlemlerinden nakit akışı yönetimine, bütçelemeden 
                finansal raporlamaya kadar tüm finansal operasyonlarınızı tek platformda birleştirir.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  href="/demo-talep" 
                  className="btn-gradient px-6 py-3 rounded-lg text-center"
                >
                  <span>Demo Talep Edin</span>
                </Link>
                
                <Link 
                  href="/iletisim" 
                  className="bg-white border border-primary/60 text-primary hover:bg-primary/5 px-6 py-3 rounded-lg text-center transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Danışmanlarımıza Ulaşın</span>
                  <HiOutlineArrowNarrowRight />
                </Link>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-xl bg-white shadow-xl p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Finans Modülü Öne Çıkan Özellikler</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">OCR ile otomatik fatura tanıma ve işleme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Gelişmiş bütçe planlama ve kontrol araçları</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Nakit akışı tahmin ve yönetimi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Özelleştirilebilir finansal raporlama</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Çok seviyeli onay akışları</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">SAP ve diğer ERP sistemleri ile tam entegrasyon</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-16 px-4 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50"
          style={{ y: featuresBgY }}
        ></motion.div>
        
        <div className="container mx-auto max-w-7xl relative z-10" ref={ref}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kapsamlı Finans Çözümleri</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP Finans modülü, finans departmanınızın verimliliğini artıran ve stratejik 
              kararlar almanızı sağlayan kapsamlı özellikler sunar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <HiOutlineChevronRight className="flex-shrink-0 w-5 h-5 mt-0.5 text-primary" />
                      <span className="text-sm text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} id="benefits" className="py-16 px-4 bg-white relative">
        <motion.div 
          className="absolute inset-0 bg-white opacity-80"
          style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, #f3f4f6 2px, transparent 0)",
            backgroundSize: "50px 50px"
          }}
        ></motion.div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Finans Modülü Avantajları</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP Finans modülü, işletmenizin finansal operasyonlarını dönüştürerek 
              zaman tasarrufu sağlar, maliyetleri azaltır ve finansal kontrolü artırır.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-primary">{benefit.percentage}</span>
                  <p className="text-sm text-gray-500">{benefit.detail}</p>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4 bg-gray-50 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        ></motion.div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Kullanım Senaryoları
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              H-AR XaPP Finans modülünün günlük operasyonlarınızı nasıl kolaylaştırabileceğini keşfedin.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BiReceipt className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fatura İşleme Otomasyonu</h3>
              <p className="text-sm text-gray-600 mb-4">
                Kağıt veya e-posta ile gelen faturaları otomatik olarak tanıyın, doğrulayın, uygun departmanlara yönlendirin ve onay akışını başlatın.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Sonuç:</span> Fatura işleme süresinde %80 azalma ve manuel hatalardan kaçınma.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BiBarChartAlt className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dinamik Bütçe Planlaması</h3>
              <p className="text-sm text-gray-600 mb-4">
                Departman yöneticilerinin kolayca bütçe girişi yapabileceği, gerçek zamanlı konsolidasyon ve onay süreci ile bütçe planlaması.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Sonuç:</span> Bütçe hazırlama süresini %65 azaltma ve bütçe gerçekleşme oranını artırma.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BiCreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Masraf Yönetimi</h3>
              <p className="text-sm text-gray-600 mb-4">
                Çalışanların mobil uygulama üzerinden harcamalarını girmesi, fiş fotoğrafı eklemesi ve otomatik onay akışının başlatılması.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Sonuç:</span> Çalışan memnuniyetinde artış ve masraf yönetiminde %70 verimlilik artışı.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 px-4 bg-white relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-white via-primary/5 to-white opacity-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ERP ve Finans Sistemleri Entegrasyonu
              </h2>
              <p className="text-gray-600 mb-6">
                H-AR XaPP Finans modülü, mevcut SAP, Oracle veya diğer finans sistemlerinizle sorunsuz entegre olarak, 
                veri bütünlüğünü korur ve çift veri girişini önler.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">SAP FI/CO ile çift yönlü veri entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Muhasebe sistemleri ile otomatik eşleştirme</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Banka API entegrasyonları</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Microsoft Power BI ile raporlama entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">E-fatura ve e-arşiv sistemleri entegrasyonu</span>
                </li>
              </ul>
              
              <Link 
                href="/entegrasyonlar" 
                className="text-primary font-medium flex items-center hover:underline"
              >
                <span>Tüm entegrasyonları keşfedin</span>
                <HiOutlineArrowNarrowRight className="ml-1" />
              </Link>
            </div>
            
            <div className="md:w-1/2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Finans Dönüşüm Hikayesi</h3>
              
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-900 mb-1">XYZ Holding</h4>
                <p className="text-sm text-gray-500 mb-2">Üretim Sektörü, 1200+ çalışan</p>
                <p className="text-sm text-gray-600">
                  "H-AR XaPP Finans modülü ile fatura işleme süremizi %80 azalttık. Artık aylık 5000+ faturayı 
                  manuel süreçlerle değil, otomatik olarak işliyoruz. Finans ekibimiz rutin işler yerine 
                  stratejik analizlere daha fazla zaman ayırabiliyor."
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">ABC Perakende</h4>
                <p className="text-sm text-gray-500 mb-2">Perakende Sektörü, 800+ çalışan</p>
                <p className="text-sm text-gray-600">
                  "Onlarca mağazamızın bütçe yönetimini H-AR XaPP ile merkezi olarak kontrol edebiliyoruz. 
                  Gerçek zamanlı nakit akışı takibi ve tahminleme yetenekleri, finansal kararlarımızı 
                  çok daha isabetli hale getirdi."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50 relative">
        <motion.div 
          className="absolute inset-0"
          style={{ 
            background: "linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--secondary-rgb), 0.05) 100%)" 
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Finansal Operasyonlarınızı Dönüştürün
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                H-AR XaPP Finans modülü ile rutin işlemleri otomatikleştirin, maliyetleri azaltın 
                ve finans ekibinizin stratejik değer yaratmasını sağlayın.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/demo-talep" 
                className="btn-gradient px-6 py-3 rounded-lg text-center flex-1 max-w-xs mx-auto"
              >
                <span>Demo Talep Edin</span>
              </Link>
              
              <Link 
                href="/iletisim" 
                className="bg-white border border-primary/60 text-primary hover:bg-primary/5 px-6 py-3 rounded-lg text-center transition-all duration-300 flex-1 max-w-xs mx-auto"
              >
                <span>Bizimle İletişime Geçin</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default FinanceModulePage; 