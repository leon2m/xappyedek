'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { HiCheckCircle, HiOutlineArrowNarrowRight, HiOutlineQuestionMarkCircle } from 'react-icons/hi';

const PricingPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const plans = [
    {
      name: 'Başlangıç Paketi',
      description: 'Küçük ve orta ölçekli işletmeler için ideal H-AR XaPP çözümü.',
      features: [
        '3 temel modül seçimi',
        'En fazla 50 aktif kullanıcı',
        'E-posta destek',
        'Temel SAP/Microsoft entegrasyonu',
        'Cloud tabanlı altyapı',
        'Çekirdek raporlama araçları',
      ],
      highlight: false,
    },
    {
      name: 'Premium Paket',
      description: 'Orta ve büyük ölçekli işletmeler için kapsamlı H-AR XaPP çözümü.',
      features: [
        'Tüm modüllere erişim',
        'Sınırsız aktif kullanıcı',
        '7/24 öncelikli destek',
        'Tam SAP/Microsoft entegrasyonu',
        'Özel bulut veya yerinde kurulum',
        'Gelişmiş raporlama araçları',
        'Özel API entegrasyonları',
        'Gelişmiş otomasyon özellikleri',
        'AI destekli özellikler'
      ],
      highlight: true,
    },
    {
      name: 'Kurumsal Paket',
      description: 'Büyük ölçekli işletmeler ve kurumlar için özelleştirilmiş çözüm.',
      features: [
        'Tüm premium özellikleri içerir',
        'Özelleştirilmiş modüller',
        'Ayrılmış hesap yöneticisi',
        'Özel uygulama geliştirme desteği',
        'Tam entegrasyon desteği',
        'Gelişmiş güvenlik özellikleri',
        'Şirket içi eğitim ve danışmanlık',
        'SLA garantisi'
      ],
      highlight: false,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Bölümü */}
      <section className="py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Şirketinize Özel Fiyatlandırma
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 mb-8"
            >
              H-AR XaPP, işletmenizin büyüklüğüne, ihtiyaçlarına ve seçtiğiniz modüllere göre özelleştirilmiş fiyatlandırma sunmaktadır.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Fiyatlandırma Planları */}
      <section ref={ref} className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-xl p-6 md:p-8 h-full flex flex-col ${
                  plan.highlight 
                    ? 'bg-white border-2 border-primary shadow-xl relative' 
                    : 'bg-white border border-gray-100 shadow-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      Önerilen
                    </span>
                  </div>
                )}
                
                <h3 className={`text-xl md:text-2xl font-bold mb-2 ${plan.highlight ? 'text-primary' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mt-2 mb-6 flex items-center">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                    <HiOutlineQuestionMarkCircle className="mr-1" />
                    Özel Fiyatlandırma
                  </span>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <HiCheckCircle className={`flex-shrink-0 w-5 h-5 mt-0.5 ${plan.highlight ? 'text-primary' : 'text-green-500'}`} />
                      <span className="ml-2 text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/iletisim" 
                  className={`mt-auto w-full py-3 px-4 rounded-lg text-center flex items-center justify-center font-medium transition-all duration-300 ${
                    plan.highlight 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'border border-primary/60 text-primary hover:bg-primary/5'
                  }`}
                >
                  <span>Fiyat Teklifi Alın</span>
                  <HiOutlineArrowNarrowRight className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SSS Bölümü */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-600">Fiyatlandırma ile ilgili en çok sorulan sorular</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">H-AR XaPP için sabit bir fiyat yok mu?</h3>
              <p className="text-gray-600">
                H-AR XaPP çözümümüz işletmenizin ihtiyaçlarına göre özelleştirilmektedir. Kullanıcı sayısı, seçilen modüller, 
                entegrasyon gereksinimleri ve ek özellikler fiyatlandırmayı etkileyen faktörlerdir. Bu nedenle, ihtiyaçlarınıza 
                en uygun teklifi sunabilmek için sizinle detaylı bir görüşme yapıyoruz.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ödeme modeli nasıl işliyor?</h3>
              <p className="text-gray-600">
                H-AR XaPP için genellikle yıllık abonelik modeli sunuyoruz. Bunun yanında, kurumsal müşterilerimiz için 
                özel lisanslama seçeneklerimiz de bulunmaktadır. İhtiyacınıza en uygun ödeme modelini birlikte belirleyebiliriz.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kurulum ve eğitim ücretleri dahil mi?</h3>
              <p className="text-gray-600">
                Başlangıç kurulum, temel eğitim ve standart entegrasyonlar fiyatlandırmaya dahildir. Özel entegrasyonlar, 
                geniş kapsamlı eğitimler veya veri migrasyonu gibi ek hizmetler için ayrı fiyatlandırma yapılabilir.
                Size sunulacak teklifte tüm detaylar açıkça belirtilecektir.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fiyat teklifi almak ne kadar sürer?</h3>
              <p className="text-gray-600">
                İletişim formunu doldurduktan sonra, ekibimiz 24-48 saat içinde sizinle iletişime geçecektir. 
                İhtiyaçlarınızı anladıktan sonra, genellikle 3-5 iş günü içerisinde detaylı bir teklif sunabiliriz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="py-12 md:py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Şirketinize Özel Teklif Alın
              </h2>
              <p className="text-gray-600">
                H-AR XaPP uzmanlarımız, ihtiyaçlarınıza ve bütçenize en uygun çözümü sunmak için yanınızda.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/iletisim" 
                className="btn-gradient px-6 py-3 rounded-lg text-center flex-1 max-w-xs mx-auto"
              >
                <span>Hemen İletişime Geçin</span>
              </Link>
              
              <Link 
                href="/demo-talep" 
                className="bg-white border border-primary/60 text-primary hover:bg-primary/5 px-6 py-3 rounded-lg text-center transition-all duration-300 flex-1 max-w-xs mx-auto"
              >
                <span>Demo Talep Edin</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PricingPage; 