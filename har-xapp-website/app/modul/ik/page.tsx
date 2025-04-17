'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { BiGroup, BiUserCheck, BiLineChart, BiBookContent, BiCalendar } from 'react-icons/bi';
import { HiOutlineArrowNarrowRight, HiOutlineChevronRight, HiCheckCircle } from 'react-icons/hi';

const HRModulePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: <BiUserCheck className="w-10 h-10 text-primary" />,
      title: 'İşe Alım ve Onboarding',
      description: 'Aday başvurularından işe alım ve oryantasyon süreçlerine kadar tüm işe alım yolculuğunu optimize edin.',
      details: [
        'AI destekli aday eşleştirme ve öneriler',
        'Otomatik mülakat planlama ve takip',
        'Onboarding görev listesi oluşturma ve takip',
        'Çalışan belgelerinin dijital yönetimi',
        'Performans beklentilerinin otomatik belirlenmesi'
      ]
    },
    {
      icon: <BiLineChart className="w-10 h-10 text-primary" />,
      title: 'Performans Yönetimi',
      description: 'Çalışan performansını sürekli izleyerek, geri bildirim kültürünü destekleyen kapsamlı değerlendirme sistemi.',
      details: [
        'OKR ve KPI takip sistemleri',
        '360° değerlendirme araçları',
        'Sürekli geri bildirim mekanizmaları',
        'Çalışan gelişim planlaması',
        'Performans analitiği ve raporlaması'
      ]
    },
    {
      icon: <BiBookContent className="w-10 h-10 text-primary" />,
      title: 'Eğitim ve Gelişim',
      description: 'Personel eğitim ihtiyaçlarını belirleyerek, kariyer gelişimini destekleyen özelleştirilmiş öğrenme yolları.',
      details: [
        'Yetkinlik bazlı eğitim planlama',
        'Online eğitim platformu entegrasyonu',
        'Eğitim kataloğu ve kaynak yönetimi',
        'Eğitim etkinliği ölçümleme',
        'Sertifika ve yetkinlik takibi'
      ]
    },
    {
      icon: <BiCalendar className="w-10 h-10 text-primary" />,
      title: 'İzin ve Zaman Yönetimi',
      description: 'Çalışan izinlerinin, mesai saatlerinin ve devamsızlıkların takibini otomatikleştiren entegre sistem.',
      details: [
        'Dijital izin talep ve onay süreçleri',
        'Tatil ve resmi izin günü takvimleri',
        'Esnek çalışma saati yönetimi',
        'Devamsızlık analizi ve raporları',
        'Entegre takvim görünümü'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Zamanı Verimli Kullanma',
      description: 'Manuel İK süreçlerini otomatikleştirerek, İK ekibinin stratejik görevlere odaklanmasını sağlar.',
      percentage: '40%',
      detail: 'İdari işlerde zaman tasarrufu'
    },
    {
      title: 'Daha İyi İşe Alım',
      description: 'Doğru adayları daha hızlı bulma ve işe alma sürecini hızlandırma.',
      percentage: '65%',
      detail: 'Daha hızlı işe alım süreci'
    },
    {
      title: 'Çalışan Deneyimi',
      description: 'Self-servis özellikler ve anlık geri bildirim mekanizmaları ile çalışan memnuniyetini artırır.',
      percentage: '85%',
      detail: 'Self-servis kullanım oranı'
    },
    {
      title: 'Stratejik Kararlar',
      description: 'Kapsamlı veri analizi ile İK stratejilerinizi sürekli geliştirme imkanı.',
      percentage: '70%',
      detail: 'Veriye dayalı karar oranı'
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-slate-100 opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-primary/5 to-transparent"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"
              >
                <BiGroup className="w-5 h-5 mr-2" />
                İnsan Kaynakları Modülü
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              >
                İK Süreçlerinizi Dönüştürün
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 mb-6"
              >
                H-AR XaPP İK modülü, işe alımdan emekliliğe kadar tüm çalışan yaşam döngüsünü 
                dijitalleştirerek, insan kaynakları ekibinizin stratejik değer yaratmasını sağlar.
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">İK Modülü Öne Çıkan Özellikler</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">AI destekli aday eşleştirme ve öneriler</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Çalışan self-servis portalı ve mobil erişim</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Kapsamlı performans değerlendirme araçları</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Entegre eğitim ve gelişim platformu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">İzin ve devamsızlık otomasyonu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                    <span className="text-gray-700">Organizasyon şeması ve pozisyon yönetimi</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">İK Süreçlerinizin Her Adımında Yanınızda</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP İK modülü, modern insan kaynakları operasyonlarını uçtan uca dijitalleştirerek 
              şirketinizin en değerli kaynağı olan çalışanlarınızın potansiyelini ortaya çıkarır.
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
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">İK Modülü Avantajları</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP İK modülü, insan kaynakları departmanınızın verimliliğini artırarak, 
              çalışan deneyimini iyileştirerek ve stratejik kararları destekleyerek fark yaratır.
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

      {/* Integration Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                SAP ve Microsoft ile Entegrasyon
              </h2>
              <p className="text-gray-600 mb-6">
                H-AR XaPP İK modülü, SAP SuccessFactors ve Microsoft 365 ile tam entegrasyon sağlayarak, 
                mevcut sistemlerinizdeki verileri sorunsuz bir şekilde senkronize eder ve iş akışlarını optimize eder.
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">SAP HCM ve SuccessFactors entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Azure AD ile kullanıcı kimlik doğrulama</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Microsoft Teams ile bildirim entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">Outlook takvim ve görev entegrasyonu</span>
                </li>
                <li className="flex items-start gap-3">
                  <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                  <span className="text-gray-700">SharePoint belge yönetimi entegrasyonu</span>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Entegrasyon Senaryoları</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">İşe Alım Süreci</h4>
                  <p className="text-sm text-gray-600">
                    Aday başvurudan işe alıma kadar tüm süreç H-AR XaPP üzerinden yönetilir ve onaylanan adayların 
                    bilgileri otomatik olarak SAP HCM'ye aktarılır.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">İzin Yönetimi</h4>
                  <p className="text-sm text-gray-600">
                    Çalışanlar izin taleplerini H-AR XaPP üzerinden yapar, onaylanan izinler otomatik 
                    olarak Outlook takvimlerine eklenir ve SAP'ye aktarılır.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">Performans Değerlendirme</h4>
                  <p className="text-sm text-gray-600">
                    H-AR XaPP üzerinden gerçekleştirilen değerlendirmeler, otomatik olarak SuccessFactors'a 
                    aktarılarak ücret ve terfi kararlarına veri sağlar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                İK Süreçlerinizi Dönüştürmeye Hazır mısınız?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                H-AR XaPP İK modülü ile insan kaynakları operasyonlarınızı dijitalleştirin, 
                çalışan deneyimini iyileştirin ve stratejik kararlar alın.
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default HRModulePage; 