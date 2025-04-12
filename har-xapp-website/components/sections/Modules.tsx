'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BiGroup, BiMoney, BiCode, BiCog } from 'react-icons/bi';
import { HiChevronRight } from 'react-icons/hi';

// Modül ikonları
const moduleIcons = {
  ik: BiGroup,
  finans: BiMoney,
  it: BiCode,
  operasyon: BiCog,
};

const Modules = () => {
  const [activeTab, setActiveTab] = useState('ik');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const modules = [
    {
      id: 'ik',
      title: 'İnsan Kaynakları',
      icon: 'ik',
      description: 'İşe alım, onboarding, performans değerlendirme, eğitim ve izin yönetimi süreçlerini otomatikleştirin.',
      features: [
        'AI destekli aday eşleştirme',
        'Çalışan self-servis merkezi',
        'Performans değerlendirme otomasyonu',
        'Eğitim yönetimi ve takibi',
        'İzin ve yoklama otomasyonu'
      ],
      image: '/hr-module.png' // Gerçek bir görselle değiştirilecek
    },
    {
      id: 'finans',
      title: 'Finans',
      icon: 'finans',
      description: 'Harcama yönetimi, faturalama, bütçe planlama ve finansal raporlama süreçlerinizi optimize edin.',
      features: [
        'OCR teknolojisiyle otomatik fatura işleme',
        'Harcama onay akışları',
        'Bütçe planlama ve takibi',
        'Finansal raporlama ve analitik',
        'Nakit akışı yönetimi'
      ],
      image: '/finance-module.png' // Gerçek bir görselle değiştirilecek
    },
    {
      id: 'it',
      title: 'Bilgi Teknolojileri',
      icon: 'it',
      description: 'IT varlık yönetimi, destek talepleri ve kullanıcı erişim izinlerini tek platformda yönetin.',
      features: [
        'Varlık envanteri ve takibi',
        'Destek talep yönetimi',
        'Kullanıcı erişim yetkilendirme',
        'Altyapı izleme ve raporlama',
        'IT güvenlik politikası yönetimi'
      ],
      image: '/it-module.png' // Gerçek bir görselle değiştirilecek
    },
    {
      id: 'operasyon',
      title: 'Operasyon',
      icon: 'operasyon',
      description: 'Tedarik zinciri, stok yönetimi ve operasyonel süreçleri optimize edin ve verimliliği artırın.',
      features: [
        'Tedarikçi yönetimi ve değerlendirme',
        'Stok takibi ve optimal stok seviyesi',
        'Sipariş yönetimi ve takibi',
        'Lojistik ve sevkiyat planlaması',
        'Proje yönetimi ve iş akışları'
      ],
      image: '/operations-module.png' // Gerçek bir görselle değiştirilecek
    }
  ];

  const currentModule = modules.find(module => module.id === activeTab) || modules[0];
  const IconComponent = moduleIcons[currentModule.icon as keyof typeof moduleIcons];

  const tabVariants = {
    inactive: { opacity: 0.6, scale: 0.95 },
    active: { opacity: 1, scale: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-white">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-x-1/2"></div>
      
      <div className="absolute inset-0 bg-grid-dark opacity-10"></div>
      
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase bg-primary/10 px-6 py-2 rounded-full text-primary">
            Entegre Çözümler
          </span>
          <h2 className="section-title mt-4">Entegre Modüller</h2>
          <p className="section-subtitle mx-auto">
            H-AR XaPP, şirketinizin tüm departmanlarını destekleyen ve bir araya getiren modüler bir yapıya sahiptir.
            İhtiyacınıza göre modülleri seçebilir ve ölçeklendirebilirsiniz.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Tab navigation */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {modules.map(module => {
                const ModuleIcon = moduleIcons[module.icon as keyof typeof moduleIcons];
                const isActive = activeTab === module.id;
                
                return (
                  <motion.button
                    key={module.id}
                    className={`p-4 rounded-lg text-left flex items-center gap-3 transition-all duration-300 ${
                      isActive ? 'bg-white shadow-lg border-l-4 border-primary' : 'bg-gray-50 hover:bg-white hover:shadow-md'
                    }`}
                    onClick={() => setActiveTab(module.id)}
                    variants={tabVariants}
                    animate={isActive ? 'active' : 'inactive'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={`text-2xl flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                      <ModuleIcon size={20} />
                    </span>
                    <div>
                      <h3 className={`font-medium ${isActive ? 'text-primary' : 'text-gray-800'}`}>
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-500 hidden lg:block">
                        {module.description.length > 60 ? `${module.description.substring(0, 60)}...` : module.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Content area */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6 lg:p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="h-full"
              >
                <div className="flex flex-col md:flex-row gap-6 h-full">
                  <div className="md:w-1/2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{currentModule.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{currentModule.description}</p>
                    
                    <h4 className="font-semibold text-gray-800 mb-3">Öne Çıkan Özellikler:</h4>
                    <ul className="space-y-2 mb-6">
                      {currentModule.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 group"
                        >
                          <span className="text-primary mt-0.5 group-hover:text-primary/80 transition-colors duration-300">
                            <HiChevronRight size={16} />
                          </span>
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Link href={`/modul/${currentModule.id}`} className="btn-gradient inline-block">
                      <div className="relative z-10 px-5 py-2 rounded-lg flex items-center">
                        <span className="font-medium mr-2">Detaylı Bilgi</span>
                        <HiChevronRight size={16} />
                      </div>
                    </Link>
                  </div>
                  
                  <div className="md:w-1/2 relative min-h-[300px] bg-gray-50 rounded-lg overflow-hidden glass-card border border-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
                      {/* Görsel yokken fallback içerik */}
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <IconComponent size={40} />
                      </div>
                    </div>
                    
                    {/* Görsel çerçevesi - premium görünüm için */}
                    <div className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-lg pointer-events-none"></div>
                    
                    {/* Gerçek görseli eklenecek */}
                    {/* <Image 
                      src={currentModule.image} 
                      alt={currentModule.title} 
                      fill 
                      className="object-contain p-4"
                    /> */}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Decorative pattern */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-tl-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modules; 