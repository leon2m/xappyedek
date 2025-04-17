'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';

const FAQPage = () => {
  // SSS kategorileri
  const categories = [
    { id: 'genel', title: 'Genel Sorular' },
    { id: 'urun', title: 'Ürün Özellikleri' },
    { id: 'teknik', title: 'Teknik Sorular' },
    { id: 'fiyat', title: 'Fiyatlandırma ve Abonelik' },
    { id: 'destek', title: 'Destek ve Eğitim' }
  ];

  // Aktif kategori
  const [activeCategory, setActiveCategory] = useState('genel');
  
  // Açık soru
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  // SSS verileri
  const faqData = {
    genel: [
      {
        id: 'genel-1',
        question: 'H-AR XaPP nedir?',
        answer: 'H-AR XaPP, işletmelerin çalışan deneyimini ve operasyonel verimliliği artırmak için tasarlanmış, modüler yapıda bir kurumsal uygulama platformudur. İnsan kaynakları, finans, IT ve operasyon süreçlerini tek bir platformda birleştirerek, çalışanların daha verimli çalışmasını ve işletmenin dijital dönüşümünü hızlandırmasını sağlar.'
      },
      {
        id: 'genel-2',
        question: 'H-AR XaPP hangi sektörlerde kullanılabilir?',
        answer: 'H-AR XaPP, modüler yapısı sayesinde üretim, perakende, sağlık, finans, lojistik, eğitim gibi hemen her sektörde kullanılabilir. Sektöre özgü ihtiyaçlara göre özelleştirilebilir modüller ve iş akışları sunarak her ölçekteki işletmenin ihtiyaçlarına uyum sağlar.'
      },
      {
        id: 'genel-3',
        question: 'H-AR XaPP\'ı kullanmak için teknik bilgi gerekiyor mu?',
        answer: 'Hayır, H-AR XaPP kullanıcı dostu arayüzü ile teknik bilgiye sahip olmayan kullanıcılar için bile kolay kullanım sağlar. Sezgisel tasarımı ve özelleştirilebilir gösterge panelleri sayesinde her departmandan çalışan, kısa bir eğitimden sonra sistemi etkin bir şekilde kullanabilir.'
      },
      {
        id: 'genel-4',
        question: 'H-AR XaPP\'ı nasıl edinebilirim?',
        answer: 'H-AR XaPP\'ı edinmek için web sitemizdeki "Demo Talep" formunu doldurabilir veya satış ekibimizle doğrudan iletişime geçebilirsiniz. İşletmenizin ihtiyaçlarına uygun bir çözüm paketi sunmak için size özel bir demo ve teklif hazırlayacağız.'
      },
      {
        id: 'genel-5',
        question: 'H-AR XaPP\'ın kurulumu ne kadar sürer?',
        answer: 'H-AR XaPP\'ın kurulum süresi, işletmenizin büyüklüğüne, seçtiğiniz modüllere ve entegrasyon ihtiyaçlarına göre değişiklik gösterir. Temel kurulum genellikle 2-4 hafta içinde tamamlanır, ancak daha kapsamlı entegrasyonlar ve özelleştirmeler için bu süre uzayabilir. Proje başlangıcında detaylı bir zaman çizelgesi sunulacaktır.'
      }
    ],
    urun: [
      {
        id: 'urun-1',
        question: 'H-AR XaPP\'ın temel modülleri nelerdir?',
        answer: 'H-AR XaPP\'ın temel modülleri arasında İnsan Kaynakları, Finans, IT ve Operasyon modülleri bulunmaktadır. Her modül kendi içinde alt modüllere ve iş süreçlerine ayrılır. Örneğin, İK modülü içinde işe alım, performans yönetimi, eğitim, bordro gibi alt modüller yer alır.'
      },
      {
        id: 'urun-2',
        question: 'H-AR XaPP mobil cihazlarda kullanılabilir mi?',
        answer: 'Evet, H-AR XaPP hem iOS hem de Android işletim sistemli mobil cihazlarda kullanılabilir. Mobil uygulamamız, masaüstü versiyonunun tüm temel özelliklerine erişim sağlar ve saha çalışanları için özel olarak tasarlanmış mobil özellikleri de içerir.'
      },
      {
        id: 'urun-3',
        question: 'H-AR XaPP\'a özel modüller eklenebilir mi?',
        answer: 'Evet, H-AR XaPP tamamen modüler bir yapıya sahiptir ve işletmenizin özel ihtiyaçlarına göre yeni modüller eklenebilir. Uygulama geliştirme ekibimiz, ihtiyaçlarınıza özel çözümler geliştirebilir veya mevcut modülleri özelleştirebilir.'
      },
      {
        id: 'urun-4',
        question: 'H-AR XaPP\'ın dil desteği var mı?',
        answer: 'Evet, H-AR XaPP çoklu dil desteğine sahiptir. Standart olarak Türkçe ve İngilizce dillerini destekler, ancak ihtiyaca göre diğer diller de eklenebilir. Kullanıcılar, kendi tercihlerine göre arayüz dilini değiştirebilirler.'
      },
      {
        id: 'urun-5',
        question: 'H-AR XaPP veri analitiği ve raporlama özellikleri nelerdir?',
        answer: 'H-AR XaPP, kapsamlı veri analitiği ve raporlama özellikleri sunar. Özelleştirilebilir gösterge panelleri, gerçek zamanlı veri izleme, trend analizi, performans göstergeleri (KPI) takibi ve detaylı raporlama araçları ile verilerinizi anlamlı bilgilere dönüştürebilirsiniz. Ayrıca, Power BI, Tableau gibi dış raporlama araçlarıyla da entegrasyon sağlanabilir.'
      }
    ],
    teknik: [
      {
        id: 'teknik-1',
        question: 'H-AR XaPP bulut tabanlı mı, yoksa yerinde kurulum mu gerektirir?',
        answer: 'H-AR XaPP hem bulut tabanlı (SaaS) hem de yerinde kurulum (on-premise) seçenekleri sunar. İşletmenizin ihtiyaçlarına ve BT stratejinize göre her iki modelde de hizmet verebiliriz. Ayrıca, karma (hybrid) bir model de tercih edilebilir.'
      },
      {
        id: 'teknik-2',
        question: 'H-AR XaPP hangi sistemlerle entegre çalışabilir?',
        answer: 'H-AR XaPP, açık API mimarisi sayesinde SAP, Oracle, Microsoft Dynamics, Salesforce gibi ERP ve CRM sistemleri başta olmak üzere birçok kurumsal yazılımla entegre çalışabilir. Ayrıca, Microsoft Office 365, Google Workspace, Zoom gibi iş uygulamalarıyla da entegrasyon sağlanabilir.'
      },
      {
        id: 'teknik-3',
        question: 'H-AR XaPP\'ın veri güvenliği nasıl sağlanıyor?',
        answer: 'H-AR XaPP, en yüksek güvenlik standartlarına göre tasarlanmıştır. Uçtan uca veri şifreleme, çok faktörlü kimlik doğrulama, rol tabanlı erişim kontrolü, düzenli güvenlik denetimleri ve otomatik yedekleme sistemleri ile verilerinizin güvenliği sağlanır. ISO 27001 ve KVKK uyumluluğu garantilenir.'
      },
      {
        id: 'teknik-4',
        question: 'H-AR XaPP\'ın sistem gereksinimleri nelerdir?',
        answer: 'Bulut tabanlı H-AR XaPP için modern bir web tarayıcısı (Chrome, Firefox, Safari, Edge) ve internet bağlantısı yeterlidir. Yerinde kurulum için sunucu gereksinimleri, kullanıcı sayısı ve modül seçimine göre değişiklik gösterir. Teknik ekibimiz, sizin için en uygun yapılandırmayı belirleyecektir.'
      },
      {
        id: 'teknik-5',
        question: 'H-AR XaPP\'ın güncellemeleri nasıl gerçekleşir?',
        answer: 'Bulut tabanlı H-AR XaPP için güncellemeler otomatik olarak yapılır ve kullanıcı deneyimini kesintiye uğratmaz. Yerinde kurulumlar için, güncellemeler planlanmış bakım pencereleri sırasında teknik ekibimiz tarafından gerçekleştirilir. Tüm güncellemelerden önce detaylı bilgilendirme yapılır.'
      }
    ],
    fiyat: [
      {
        id: 'fiyat-1',
        question: 'H-AR XaPP\'ın fiyatlandırma modeli nasıldır?',
        answer: 'H-AR XaPP, kullanıcı sayısı ve seçilen modüllere göre ölçeklenebilir bir fiyatlandırma modeline sahiptir. Aylık veya yıllık abonelik seçenekleri sunulur. İşletmenizin ihtiyaçlarına göre özelleştirilmiş bir teklif için satış ekibimizle iletişime geçebilirsiniz.'
      },
      {
        id: 'fiyat-2',
        question: 'Deneme sürümü var mı?',
        answer: 'Evet, H-AR XaPP için 30 günlük ücretsiz deneme sürümü sunuyoruz. Bu süre zarfında, tüm temel özellikleri test edebilir ve işletmeniz için uygunluğunu değerlendirebilirsiniz. Deneme sürümünü başlatmak için web sitemizdeki "Demo Talep" formunu doldurmanız yeterlidir.'
      },
      {
        id: 'fiyat-3',
        question: 'Minimum kullanıcı sayısı gerekliliği var mı?',
        answer: 'H-AR XaPP, farklı büyüklükteki işletmelere hizmet vermek için tasarlanmıştır. Minimum 10 kullanıcıdan başlayan paketler sunuyoruz, ancak özel durumlarda daha küçük yapılandırmalar da mümkündür. İşletmenizin ihtiyaçlarına göre en uygun çözümü belirlemenize yardımcı olacağız.'
      },
      {
        id: 'fiyat-4',
        question: 'Aboneliğimi istediğim zaman iptal edebilir miyim?',
        answer: 'Evet, aylık abonelik modelimizde, herhangi bir zamanda aboneliğinizi iptal edebilirsiniz. Yıllık abonelikler için, sözleşme süresinin sonunda iptal seçeneği sunulur. İptal işlemleri hakkında detaylı bilgi için müşteri hizmetleri ekibimizle iletişime geçebilirsiniz.'
      },
      {
        id: 'fiyat-5',
        question: 'Kullanıcı sayısını daha sonra artırabilir miyim?',
        answer: 'Evet, H-AR XaPP aboneliğinizde kullanıcı sayısını istediğiniz zaman artırabilirsiniz. Ek kullanıcılar, mevcut fiyatlandırma planınıza göre ücretlendirilir. Kullanıcı sayısında önemli artışlar için, size özel indirimli paketler sunabiliriz.'
      }
    ],
    destek: [
      {
        id: 'destek-1',
        question: 'H-AR XaPP için nasıl teknik destek alabilirim?',
        answer: 'H-AR XaPP için 7/24 teknik destek sunuyoruz. Uygulama içi destek merkezi, e-posta desteği, telefon desteği ve canlı sohbet seçenekleriyle her zaman yardıma hazırız. Ayrıca, düzenli bakım ve proaktif izleme hizmetlerimizle sorunları ortaya çıkmadan önlemeye çalışıyoruz.'
      },
      {
        id: 'destek-2',
        question: 'Kullanıcı eğitimleri sağlıyor musunuz?',
        answer: 'Evet, H-AR XaPP için kapsamlı kullanıcı eğitimleri sunuyoruz. Canlı eğitim oturumları, video eğitimler, detaylı kullanım kılavuzları ve düzenli webinarlar ile kullanıcıların sistemi etkin bir şekilde kullanmalarını sağlıyoruz. Ayrıca, isteğe bağlı olarak yerinde eğitim hizmetleri de sunabiliriz.'
      },
      {
        id: 'destek-3',
        question: 'Özelleştirme ve entegrasyon için destek sağlıyor musunuz?',
        answer: 'Evet, deneyimli uygulama geliştirme ve entegrasyon ekibimiz, H-AR XaPP\'ı işletmenizin özel ihtiyaçlarına göre özelleştirmek ve mevcut sistemlerinizle entegre etmek için tam destek sağlar. Proje yönetimi, geliştirme, test ve devreye alma süreçlerinin tamamında yanınızda oluruz.'
      },
      {
        id: 'destek-4',
        question: 'Veri aktarımı konusunda yardım sunuyor musunuz?',
        answer: 'Evet, mevcut sistemlerinizden H-AR XaPP\'a veri aktarımı konusunda kapsamlı destek sunuyoruz. Veri analizi, temizleme, dönüştürme ve aktarım süreçlerinin tamamını yönetiyoruz. Veri bütünlüğünü koruyarak, kesintisiz bir geçiş süreci sağlıyoruz.'
      },
      {
        id: 'destek-5',
        question: 'Hizmet Seviyesi Anlaşması (SLA) sunuyor musunuz?',
        answer: 'Evet, tüm müşterilerimize net hizmet garantileri içeren Hizmet Seviyesi Anlaşmaları (SLA) sunuyoruz. Bu anlaşmalar, sistem kullanılabilirliği, yanıt süreleri, çözüm süreleri ve destek kanalları hakkında detaylı bilgiler içerir. Farklı iş ihtiyaçlarına göre standart ve premium SLA seçeneklerimiz bulunmaktadır.'
      }
    ]
  };

  // Animasyon varyantları
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Başlık */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Yardım Merkezi
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sık Sorulan Sorular
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP hakkında en çok sorulan soruların cevaplarını burada bulabilirsiniz.
            </p>
          </motion.div>
          
          {/* Kategori Seçimi */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </motion.div>
          
          {/* SSS İçeriği */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <div className="p-6 md:p-8">
              <div className="space-y-4">
                {faqData[activeCategory as keyof typeof faqData].map((faq) => (
                  <div 
                    key={faq.id} 
                    className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    <button
                      onClick={() => setOpenQuestion(openQuestion === faq.id ? null : faq.id)}
                      className="w-full flex justify-between items-start text-left py-2"
                    >
                      <div className="flex items-start">
                        <FaQuestionCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
                        <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                      </div>
                      <div className="text-primary ml-4 flex-shrink-0">
                        {openQuestion === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </button>
                    
                    {openQuestion === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-8 pr-4 py-3 text-gray-600"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Alt Bilgi */}
            <div className="bg-gray-50 p-6 border-t border-gray-100">
              <p className="text-gray-600 text-center">
                Sorularınıza cevap bulamadınız mı? 
                <Link href="/iletisim" className="text-primary font-medium ml-1 hover:underline">
                  Bizimle iletişime geçin
                </Link>
              </p>
            </div>
          </motion.div>
          
          {/* Destek Seçenekleri */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 shadow-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Diğer Destek Kanallarımız</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Aşağıdaki kanallardan da dilediğiniz zaman bize ulaşabilir, sorularınızı sorabilirsiniz.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">E-posta Desteği</h3>
                  <p className="text-gray-600 mb-4">7/24 e-posta desteğimizle sorularınızı yanıtlıyoruz.</p>
                  <a href="mailto:destek@arsolutions.com.tr" className="text-primary font-medium hover:underline">
                    destek@arsolutions.com.tr
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Telefon Desteği</h3>
                  <p className="text-gray-600 mb-4">Mesai saatleri içinde telefon desteğimize ulaşabilirsiniz.</p>
                  <a href="tel:+902163805767" className="text-primary font-medium hover:underline">
                    +90 216 XXX XX XX
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Canlı Destek</h3>
                  <p className="text-gray-600 mb-4">Hafta içi 09:00 - 18:00 saatleri arası canlı desteğimiz aktiftir.</p>
                  <Link href="/destek" className="text-primary font-medium hover:underline">
                    Canlı Desteğe Başlayın
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 