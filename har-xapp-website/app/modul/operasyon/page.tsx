'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { FaClipboardCheck, FaTasks, FaChartLine, FaExchangeAlt } from 'react-icons/fa';
import { MdSpeed } from 'react-icons/md';
import { RiTeamFill, RiTimeFill } from 'react-icons/ri';
import { HiOutlineLightBulb } from 'react-icons/hi';

const OperationModulePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animasyon varyantları
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Operasyon Modülü Özellikleri
  const features = [
    {
      icon: <FaClipboardCheck className="text-3xl text-emerald-500" />,
      title: "Proje ve İş Akışı Yönetimi",
      description: "İş süreçlerinizi verimli bir şekilde planlayın, yürütün ve izleyin.",
      details: [
        "Görsel iş akışı tasarımı ve otomasyon",
        "Gerçek zamanlı durum takibi ve raporlama",
        "Görev atama ve önceliklendirme",
        "İş yükü dengeleme ve kaynak planlaması"
      ]
    },
    {
      icon: <FaTasks className="text-3xl text-emerald-500" />,
      title: "Süreç Optimizasyonu",
      description: "Operasyonel süreçlerinizi analiz ederek verimliliği artırın.",
      details: [
        "Süreç darboğazlarının tespiti ve giderilmesi",
        "Otomatik süreç iyileştirme önerileri",
        "Süreç performans göstergeleri (KPI) takibi",
        "Operasyonel verimlilik analizi"
      ]
    },
    {
      icon: <FaChartLine className="text-3xl text-emerald-500" />,
      title: "Performans İzleme ve Analiz",
      description: "Operasyonel performansınızı gerçek zamanlı olarak izleyin ve analiz edin.",
      details: [
        "Özelleştirilebilir performans göstergeleri",
        "Eğilim analizi ve tahminleme",
        "Görsel raporlama ve gösterge panelleri",
        "Anomali tespiti ve uyarı sistemi"
      ]
    },
    {
      icon: <FaExchangeAlt className="text-3xl text-emerald-500" />,
      title: "Tedarik Zinciri Entegrasyonu",
      description: "Tedarik zincirinizi uçtan uca optimize edin ve entegre edin.",
      details: [
        "Tedarikçi performans yönetimi",
        "Envanter optimizasyonu ve stok takibi",
        "Talep tahminleme ve planlaması",
        "Lojistik ve teslimat takibi"
      ]
    }
  ];

  // Operasyon Modülü Faydaları
  const benefits = [
    {
      icon: <MdSpeed className="text-4xl text-emerald-500" />,
      title: "Operasyonel Hız",
      percent: "55%",
      description: "İş süreçlerinde %55 daha hızlı işlem ve yanıt süresi"
    },
    {
      icon: <RiTeamFill className="text-4xl text-emerald-500" />,
      title: "Ekip Verimliliği",
      percent: "40%",
      description: "Ekip iş birliğinde %40 artış ve daha etkili koordinasyon"
    },
    {
      icon: <HiOutlineLightBulb className="text-4xl text-emerald-500" />,
      title: "Karar Alma Süreci",
      percent: "65%",
      description: "Veri odaklı karar almada %65 iyileşme"
    },
    {
      icon: <RiTimeFill className="text-4xl text-emerald-500" />,
      title: "Kaynak Tasarrufu",
      percent: "35%",
      description: "Operasyonel maliyetlerde %35 azalma"
    }
  ];

  // Kullanım Senaryoları
  const useCases = [
    {
      title: "Üretim Optimizasyonu",
      description: "Büyük bir üretim tesisi, H-AR XaPP Operasyon modülü sayesinde üretim hatlarını optimize ederek fire oranlarını %25 azalttı ve üretim kapasitesini %15 artırdı."
    },
    {
      title: "Servis Operasyonları",
      description: "Bir hizmet şirketi, saha ekiplerinin görev atamalarını optimize ederek müşteri yanıt sürelerini %40 kısalttı ve günlük tamamlanan servis sayısını %30 artırdı."
    },
    {
      title: "Lojistik Yönetimi",
      description: "Bir lojistik firması, rota optimizasyonu ve teslimat planlama süreçlerini iyileştirerek yakıt maliyetlerini %20 azalttı ve zamanında teslimat oranını %35 artırdı."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-emerald-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              H-AR XaPP Operasyon Modülü
            </motion.h1>
            <motion.p 
              className="text-xl text-emerald-100 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              İşletmenizin operasyonel süreçlerini optimize edin, verimliliği artırın ve maliyetleri düşürün.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/demo-talebi" 
                className="bg-white text-emerald-700 hover:bg-emerald-50 transition-all duration-300 font-semibold rounded-lg px-8 py-4 text-lg shadow-lg hover:shadow-xl">
                Demo Talebi Oluşturun
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Operasyon Modülü Özellikleri</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İşletmenizin operasyonel süreçlerini uçtan uca yönetin ve optimize edin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8" ref={ref}>
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-5">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-emerald-500 mr-2">✓</span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Operasyon Modülü Avantajları</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP Operasyon modülü ile elde edeceğiniz somut faydalar:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <div className="text-3xl font-bold text-emerald-500 mb-4">{benefit.percent}</div>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Başarı Hikayeleri</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Operasyon modülümüzü kullanan işletmelerin elde ettiği somut sonuçlar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Entegrasyon Yetenekleri
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Operasyon modülümüz, ERP sistemleri, CRM araçları, üretim yazılımları ve diğer iş uygulamalarıyla sorunsuz entegre olarak 360° görünürlük sağlar.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <img src="/images/integrations/erp.svg" alt="ERP Integration" className="h-16 mx-auto" />
                <p className="mt-4 font-medium">ERP Sistemleri</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <img src="/images/integrations/crm.svg" alt="CRM Integration" className="h-16 mx-auto" />
                <p className="mt-4 font-medium">CRM Sistemleri</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <img src="/images/integrations/manufacturing.svg" alt="Manufacturing Integration" className="h-16 mx-auto" />
                <p className="mt-4 font-medium">Üretim Sistemleri</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <img src="/images/integrations/logistics.svg" alt="Logistics Integration" className="h-16 mx-auto" />
                <p className="mt-4 font-medium">Lojistik Sistemleri</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-emerald-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Operasyonlarınızı Dönüştürmeye Hazır Mısınız?
            </h2>
            <p className="text-xl text-emerald-100 mb-10">
              H-AR XaPP Operasyon modülü ile süreçlerinizi optimize edin, verimliliği artırın ve maliyetleri düşürün.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-talebi" 
                className="bg-white text-emerald-700 hover:bg-emerald-50 transition-all duration-300 font-semibold rounded-lg px-8 py-4 text-lg shadow-lg hover:shadow-xl">
                Demo Talebi Oluşturun
              </Link>
              <Link href="/iletisim" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-emerald-700 transition-all duration-300 font-semibold rounded-lg px-8 py-4 text-lg">
                Bizimle İletişime Geçin
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OperationModulePage; 