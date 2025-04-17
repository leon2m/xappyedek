'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { BiCode, BiDesktop, BiServer, BiShieldQuarter, BiWrench } from 'react-icons/bi';
import { HiOutlineArrowNarrowRight, HiOutlineChevronRight, HiCheckCircle } from 'react-icons/hi';
import { FaServer, FaDesktop, FaLock, FaSyncAlt, FaHeadset, FaDatabase, FaClipboardCheck, FaNetworkWired, FaBuysellads, FaUserShield, FaCodeBranch, FaExchangeAlt, FaTasks, FaTools, FaSitemap } from 'react-icons/fa';
import { RiTeamFill, RiTimeFill } from 'react-icons/ri';
import { MdSpeed } from 'react-icons/md';

export function generateStaticParams() {
  return [{ }];
}

const ITModulePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const targetRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
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
      icon: <BiDesktop className="w-10 h-10 text-primary" />,
      title: 'Servis Masası ve Destek Yönetimi',
      description: 'Destek taleplerini otomatik kategorize eden, önceliklendiren ve ilgili IT ekiplerine yönlendiren kapsamlı çözüm.',
      details: [
        'Self-servis destek portalı',
        'Çok kanallı destek talebi oluşturma (portal, e-posta, Teams)',
        'Otomatik kategorilendirme ve önceliklendirme',
        'SLA takibi ve uyarı sistemi',
        'Bilgi bankası ve çözüm önerileri'
      ]
    },
    {
      icon: <BiServer className="w-10 h-10 text-primary" />,
      title: 'Varlık ve Envanter Yönetimi',
      description: 'IT varlıklarınızın tam kontrolünü sağlayan, yaşam döngüsünü izleyen ve optimum kullanımını planlayan sistem.',
      details: [
        'Donanım ve yazılım envanteri',
        'Lisans takibi ve uyumluluk kontrolü',
        'Otomatik keşif ve varlık izleme',
        'Garanti ve bakım takibi',
        'Maliyet analizi ve optimizasyon'
      ]
    },
    {
      icon: <BiShieldQuarter className="w-10 h-10 text-primary" />,
      title: 'Erişim ve Kimlik Yönetimi',
      description: 'Kullanıcı hesaplarını, erişim yetkilerini ve güvenlik politikalarını merkezi olarak yöneten entegre çözüm.',
      details: [
        'Tek oturum açma (SSO) entegrasyonu',
        'Rol tabanlı erişim yetkilendirme',
        'Ayrıcalıklı hesap yönetimi',
        'Kullanıcı yaşam döngüsü otomasyonu',
        'Kimlik doğrulama faktörleri yönetimi'
      ]
    },
    {
      icon: <BiWrench className="w-10 h-10 text-primary" />,
      title: 'Değişim ve Sürüm Yönetimi',
      description: 'IT ortamınızdaki değişikliklerin güvenli ve kontrollü şekilde planlanması, test edilmesi ve uygulanması.',
      details: [
        'Değişiklik onay süreçleri',
        'Uygulama sürüm takibi',
        'Test ve geliştirme ortamı yönetimi',
        'Rollback ve sorun giderme planları',
        'Etki analizi ve risk değerlendirmesi'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Destek Verimliliği',
      description: 'Destek taleplerinin çözüm süresini kısaltarak kullanıcı memnuniyetini artırın.',
      percentage: '45%',
      detail: 'Çözüm süresinde azalma'
    },
    {
      title: 'Kaynak Optimizasyonu',
      description: 'IT varlıklarının kullanımını optimize ederek maliyet tasarrufu sağlayın.',
      percentage: '30%',
      detail: 'IT maliyetlerinde azalma'
    },
    {
      title: 'Güvenlik Artışı',
      description: 'Merkezi erişim yönetimi ile güvenlik olaylarını azaltın.',
      percentage: '70%',
      detail: 'Güvenlik olaylarında azalma'
    },
    {
      title: 'Operasyonel Mükemmellik',
      description: 'Standartlaştırılmış IT süreçleri ile hataları azaltın.',
      percentage: '60%',
      detail: 'Hata oranında azalma'
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
                <BiCode className="w-5 h-5 mr-2" />
                Bilgi Teknolojileri Modülü
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                IT Operasyonlarınızı Modernleştirin
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 mb-6"
              >
                H-AR XaPP IT modülü, servis masası yönetiminden varlık envanterine, erişim kontrolünden 
                değişim yönetimine kadar tüm IT süreçlerinizi tek platformda optimize eder.
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">IT Modülü Öne Çıkan Özellikler</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Çok kanallı servis masası yönetimi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Kapsamlı IT varlık envanteri ve takibi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Merkezi erişim ve kimlik yönetimi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">ITIL uyumlu süreç yönetimi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Otomatik bildirim ve eskalasyon sistemi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Gelişmiş raporlama ve analitik araçları</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">IT Süreçlerinizi Modernleştirin</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP IT modülü, modern bilgi teknolojileri operasyonlarını uçtan uca 
              dijitalleştirerek BT ekibinizin verimliliğini artırır ve maliyetleri düşürür.
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
      <section id="benefits" className="py-16 px-4 bg-white relative">
        <motion.div 
          className="absolute inset-0 bg-white opacity-80"
          style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, #f3f4f6 2px, transparent 0)",
            backgroundSize: "50px 50px"
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
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
              IT Modülü Avantajları
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              H-AR XaPP IT modülü, bilgi teknolojileri departmanınızın verimliliğini artırarak, 
              servis kalitesini iyileştirerek ve maliyetleri düşürerek fark yaratır.
            </motion.p>
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kullanım Senaryoları</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP IT modülünün günlük IT operasyonlarınızı nasıl iyileştirebileceğini keşfedin.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BiDesktop className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Kullanıcı Onboarding/Offboarding</h3>
              <p className="text-sm text-gray-600 mb-4">
                Yeni çalışanlar için otomatik hesap oluşturma, erişim izinleri tanımlama ve donanım atama süreçlerini otomatize edin. 
                Ayrılanlar için tüm erişimlerin kapatılmasını güvenle yönetin.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Sonuç:</span> Kullanıcı onboarding süresinde %75 azalma ve güvenlik risklerinde belirgin düşüş.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BiServer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Varlık Yaşam Döngüsü Yönetimi</h3>
              <p className="text-sm text-gray-600 mb-4">
                Donanım ve yazılım varlıklarınızı satın almadan kullanım sonu süreçlerine kadar izleyin, bakım zamanlarını planlayın 
                ve yenileme ihtiyaçlarını önceden belirleyin.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Sonuç:</span> IT varlık ömürlerinde %25 uzama ve yeni satın alımlarda %20 maliyet azalması.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BiShieldQuarter className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Olay ve Kriz Yönetimi</h3>
              <p className="text-sm text-gray-600 mb-4">
                IT olaylarını ve kesintilerini hızla tespit edin, kategorize edin ve ilgili ekiplere atayın. 
                Krizleri tanımlı süreçlerle yöneterek hızlı çözüm sağlayın.
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Sonuç:</span> Olay çözüm süresinde %50 azalma ve hizmet kesinti sürelerinde belirgin düşüş.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 px-4 bg-gray-50 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        ></motion.div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Mevcut IT Araçlarıyla Entegrasyon
              </h2>
              <p className="text-gray-600 mb-6">
                H-AR XaPP IT modülü, mevcut IT altyapınız ve araçlarınızla sorunsuz entegre olarak, 
                kesintisiz bir deneyim ve veri bütünlüğü sağlar.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Microsoft Active Directory/Azure AD entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">SCCM/Intune ile donanım/yazılım envanteri</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Microsoft Teams, Slack gibi iletişim araçlarıyla bütünleşme</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">SAML, OAuth ile kimlik sağlayıcı entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Jira, ServiceNow gibi servis yönetimi araçlarıyla entegrasyon</span>
                </li>
              </ul>
              
              <Link 
                href="/entegrasyonlar" 
                className="text-primary font-medium flex items-center hover:underline"
              >
                <span>Tüm entegrasyonları keşfedin</span>
                <HiOutlineArrowNarrowRight className="ml-1" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Müşteri Başarı Hikayeleri</h3>
              
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-900 mb-1">Global İlaç Firması</h4>
                <p className="text-sm text-gray-500 mb-2">Farmasötik Sektörü, 3000+ çalışan</p>
                <p className="text-sm text-gray-600">
                  "H-AR XaPP IT modülü, dağınık durumdaki servis masası operasyonlarımızı tek bir platformda birleştirmemizi sağladı. 
                  Şimdi taleplerin %90'ını SLA'lar dahilinde çözebiliyoruz ve kullanıcı memnuniyeti %85'in üzerine çıktı."
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Ulusal Bankacılık Kurumu</h4>
                <p className="text-sm text-gray-500 mb-2">Finans Sektörü, 1500+ çalışan</p>
                <p className="text-sm text-gray-600">
                  "Varlık yönetimi ve erişim kontrolü sistemlerimizi H-AR XaPP ile modernize ettik. 
                  Artık tüm IT varlıklarımızı gerçek zamanlı takip edebiliyor, lisans uyumluluğunu sağlıyor 
                  ve güvenlik açıklarını proaktif olarak yönetebiliyoruz."
                </p>
              </div>
            </motion.div>
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
                IT Operasyonlarınızı Dönüştürün
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                H-AR XaPP IT modülü ile IT süreçlerinizi standartlaştırın, hizmet kalitesini artırın 
                ve ekibinizin stratejik projelere odaklanmasını sağlayın.
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

export default ITModulePage; 