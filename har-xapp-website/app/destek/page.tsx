'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiMail, HiPhone, HiChatAlt2, HiDocumentText, HiLightningBolt, HiQuestionMarkCircle } from 'react-icons/hi';

const SupportPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [activeTab, setActiveTab] = useState<'destek' | 'faq'>('destek');
  
  // SSS öğeleri
  const faqItems = [
    {
      question: 'H-AR XaPP uygulamasını nasıl edinebilirim?',
      answer: 'H-AR XaPP kurumsal bir çözümdür. Demo talep formunu doldurarak satış ekibimizle iletişime geçebilir ve işletmenize özel bir teklif alabilirsiniz.'
    },
    {
      question: 'H-AR XaPP hangi işletim sistemlerinde çalışır?',
      answer: 'H-AR XaPP, web tabanlı bir platform olarak tüm modern tarayıcılarda (Chrome, Safari, Firefox, Edge) çalışır. Ayrıca iOS ve Android mobil cihazlar için de özel uygulamalarımız bulunmaktadır.'
    },
    {
      question: 'Veri güvenliği ve gizlilik konusunda nasıl önlemler alıyorsunuz?',
      answer: 'H-AR XaPP, en yüksek güvenlik standartlarına göre tasarlanmıştır. Tüm veriler şifrelenir ve güvenli sunucularda saklanır. ISO 27001 sertifikasyonu ile veri güvenliği taahhüdümüzü belgelendiriyoruz.'
    },
    {
      question: 'SAP ve Microsoft 365 ile entegrasyon nasıl çalışır?',
      answer: 'H-AR XaPP, SAP ve Microsoft 365 çözümleriyle doğrudan ve sorunsuz entegrasyon sunar. API\'ler aracılığıyla veri senkronizasyonu sağlanır ve kullanıcılar için tek oturum açma özelliği sunar.'
    },
    {
      question: 'Özel ihtiyaçlarımıza göre uyarlama yapılabilir mi?',
      answer: 'Evet, H-AR XaPP tamamen modüler ve özelleştirilebilir bir platformdur. Kurumunuzun özgün ihtiyaçlarına göre mevcut modülleri uyarlayabilir veya tamamen yeni modüller geliştirebiliriz.'
    },
    {
      question: 'Uygulama içinde teknik bir sorunla karşılaşırsam ne yapmalıyım?',
      answer: 'Teknik bir sorunla karşılaştığınızda 7/24 destek ekibimize ulaşabilirsiniz. Uygulama içindeki "Yardım" bölümünden sorununuzu bildirebilir, teknik destek@arsolutions.com.tr adresine e-posta gönderebilir veya +90 216 XXX XX XX numaralı telefondan bizi arayabilirsiniz.'
    },
    {
      question: 'Çalışanlarımız için eğitim desteği sunuyor musunuz?',
      answer: 'Evet, H-AR XaPP uygulamasının kullanımı için kapsamlı eğitim programları sunuyoruz. Yönetici ve son kullanıcı eğitimleri, kullanım kılavuzları, eğitim videoları ve isteğe bağlı olarak yerinde eğitim hizmetlerimiz bulunmaktadır.'
    },
    {
      question: 'H-AR XaPP\'ın güncellemeleri ne sıklıkla yayınlanır?',
      answer: 'H-AR XaPP için her ay küçük güncellemeler, her üç ayda bir de kapsamlı özellik güncellemeleri yayınlıyoruz. Güvenlik yamaları ise gerektiğinde anında uygulanmaktadır. Tüm güncellemeler otomatik olarak gerçekleşir ve kullanıcı deneyimini kesintiye uğratmaz.'
    }
  ];
  
  // Destek seçenekleri
  const supportOptions = [
    {
      icon: <HiPhone className="w-6 h-6 text-primary" />,
      title: 'Telefon Desteği',
      description: 'Teknik destek ekibimizle doğrudan görüşün',
      details: 'Pazartesi - Cuma: 09:00 - 18:00',
      action: '+90 216 XXX XX XX',
      actionType: 'tel:+902163805767',
      actionText: 'Hemen Ara'
    },
    {
      icon: <HiMail className="w-6 h-6 text-primary" />,
      title: 'E-posta Desteği',
      description: 'Sorularınızı e-posta ile gönderin',
      details: '24 saat içinde yanıt',
      action: 'destek@arsolutions.com.tr',
      actionType: 'mailto:destek@arsolutions.com.tr',
      actionText: 'E-posta Gönder'
    },
    {
      icon: <HiChatAlt2 className="w-6 h-6 text-primary" />,
      title: 'Canlı Destek',
      description: 'Uzmanlarımızla canlı sohbet edin',
      details: 'Pazartesi - Cuma: 09:00 - 20:00',
      action: '#canli-destek',
      actionType: 'link',
      actionText: 'Sohbeti Başlat'
    },
    {
      icon: <HiDocumentText className="w-6 h-6 text-primary" />,
      title: 'Dokümanlar',
      description: 'Kılavuzlar ve yardım belgeleri',
      details: 'Kapsamlı çözüm ve ipuçları',
      action: '#dokumanlar',
      actionType: 'link',
      actionText: 'Dokümanlara Eriş'
    },
    {
      icon: <HiLightningBolt className="w-6 h-6 text-primary" />,
      title: 'Hızlı Başlangıç',
      description: 'H-AR XaPP\'ı kullanmaya başlayın',
      details: 'Adım adım rehberler',
      action: '#hizli-baslangic',
      actionType: 'link',
      actionText: 'Rehberi Görüntüle'
    },
    {
      icon: <HiQuestionMarkCircle className="w-6 h-6 text-primary" />,
      title: 'Eğitim',
      description: 'Eğitim webinarları ve videolar',
      details: 'İnteraktif öğrenme deneyimi',
      action: '#egitim',
      actionType: 'link',
      actionText: 'Eğitimlere Katıl'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Destek Merkezi
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Size Nasıl Yardımcı Olabiliriz?
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              H-AR XaPP deneyiminizi en iyi şekilde yaşamanız için buradayız. Destek kanallarımız ve sık sorulan sorularla yanınızdayız.
            </p>
          </div>
          
          {/* Tab Menüsü */}
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-full p-1 shadow-md">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('destek')}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'destek'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  Destek Kanalları
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === 'faq'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  Sık Sorulan Sorular
                </button>
              </div>
            </div>
          </div>
          
          {/* İçerik Alanı */}
          <div className="transition-all">
            {/* Destek Kanalları */}
            {activeTab === 'destek' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supportOptions.map((option, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        {option.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-gray-600 mb-1">{option.description}</p>
                      <p className="text-gray-500 text-sm mb-4">{option.details}</p>
                      <a 
                        href={option.actionType} 
                        className="inline-flex items-center text-primary hover:underline font-medium"
                      >
                        {option.actionText}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </motion.div>
                  ))}
                </div>
                
                {/* Talep Formu Bağlantısı */}
                <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 shadow-md">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Daha Kapsamlı Destek mi Gerekiyor?</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                      İhtiyacınıza özel destek ve çözüm için teknik ekibimizle iletişime geçin. 
                      En kısa sürede sorununuzu çözmenize yardımcı olacağız.
                    </p>
                    <Link 
                      href="/iletisim" 
                      className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Destek Talebi Oluştur
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Sık Sorulan Sorular */}
            {activeTab === 'faq' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="p-8">
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                      >
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start">
                          <HiQuestionMarkCircle className="w-6 h-6 text-primary mr-2 flex-shrink-0" />
                          <span>{item.question}</span>
                        </h3>
                        <p className="text-gray-600 pl-8">{item.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Daha Fazla Soru Bağlantısı */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Başka bir sorunuz mu var?</p>
                    <Link 
                      href="/iletisim" 
                      className="text-primary font-medium hover:underline flex items-center"
                    >
                      Bize Sorun
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 