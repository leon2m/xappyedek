'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUserTie, FaLaptopCode, FaBullhorn, FaHeadset, FaBriefcase, FaMapMarkerAlt, FaRegClock, FaUsers, FaChartLine } from 'react-icons/fa';

const CareerPage = () => {
  // Pozisyon kategorileri
  const categories = [
    { id: 'tumu', title: 'Tümü' },
    { id: 'yazilim', title: 'Yazılım Geliştirme' },
    { id: 'tasarim', title: 'Tasarım' },
    { id: 'satis', title: 'Satış & Pazarlama' },
    { id: 'destek', title: 'Müşteri Desteği' }
  ];

  // Aktif kategori
  const [activeCategory, setActiveCategory] = useState('tumu');

  // Açık pozisyonlar
  const positions = [
    {
      id: 'backend-developer',
      title: 'Backend Developer',
      location: 'İstanbul (Hibrit)',
      department: 'Yazılım Geliştirme',
      type: 'Tam Zamanlı',
      category: 'yazilim',
      icon: <FaLaptopCode className="text-primary text-xl" />,
      description: 'H-AR XaPP platformumuzun backend sistemlerini geliştirmek ve yönetmek üzere deneyimli bir backend developer arıyoruz.',
      requirements: [
        'En az 3 yıl backend geliştirme deneyimi',
        'Node.js, Express.js, NestJS veya benzer framework bilgisi',
        'MongoDB, PostgreSQL veya MySQL veritabanı deneyimi',
        'RESTful API tasarımı ve implementasyonu tecrübesi',
        'Mikroservis mimarisi hakkında bilgi',
        'Otomatik test yazma deneyimi (Unit ve Integration testleri)',
        'Docker containerization tecrübesi',
        'CI/CD pipeline kurulumu ve yönetimi bilgisi',
        'Git version kontrol sistemi üzerinde çalışma tecrübesi',
        'Problem çözme ve analitik düşünme becerileri'
      ]
    },
    {
      id: 'content-marketing',
      title: 'İçerik Pazarlama Uzmanı',
      location: 'İstanbul (Hibrit)',
      department: 'Pazarlama',
      type: 'Tam Zamanlı',
      category: 'satis',
      icon: <FaBullhorn className="text-primary text-xl" />,
      description: 'H-AR XaPP ve çözümlerimiz için stratejik içerikler oluşturacak, dijital kanallarımızı yönetecek ve marka bilinirliğimizi artıracak bir içerik pazarlama uzmanı arıyoruz.',
      requirements: [
        'En az 2 yıl B2B içerik pazarlama deneyimi',
        'Kurumsal yazılım veya SaaS sektöründe çalışmış olmak',
        'SEO, sosyal medya ve içerik stratejisi konularında bilgi',
        'Blog yazıları, vaka çalışmaları, infografikler ve e-kitaplar hazırlama deneyimi',
        'Analitik araçları kullanarak içerik performansını ölçme becerisi',
        'Mükemmel yazılı ifade yeteneği',
        'Dijital medya trendleri hakkında güncel bilgi',
        'Görsel içerik oluşturma ve düzenleme becerileri',
        'İş İngilizcesi bilgisi'
      ]
    }
  ];

  // Animasyon varyantları
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Aktif kategoriye göre filtrelenmiş pozisyonlar
  const filteredPositions = activeCategory === 'tumu' 
    ? positions 
    : positions.filter(position => position.category === activeCategory);

  // Detay görüntüleme durumu
  const [activePosition, setActivePosition] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <motion.div 
          className="max-w-5xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Kariyer Fırsatları
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Bizimle Çalışmaya Ne Dersiniz?
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            H-AR Solutions olarak, inovasyon tutkusu olan, öğrenmeye açık ve fark yaratmak isteyen yetenekleri arıyoruz.
          </p>
        </motion.div>

        {/* Şirket Kültürü */}
        <motion.div 
          className="max-w-5xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Şirket Kültürümüz</h2>
              <p className="text-gray-600 mb-6">
                H-AR Solutions'da, işbirliği, yenilikçilik ve sürekli gelişmeyi teşvik eden bir kültür oluşturmaya önem veriyoruz. Çalışanlarımıza değer verir, fikirlerini dinler ve gelişimleri için fırsatlar sunarız.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FaUsers className="text-primary text-2xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">İşbirliği & Çeşitlilik</h3>
                  <p className="text-gray-600">Farklı bakış açılarının daha iyi sonuçlar doğurduğuna inanıyor ve çeşitliliği destekliyoruz.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FaChartLine className="text-primary text-2xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Sürekli Gelişim</h3>
                  <p className="text-gray-600">Çalışanlarımızın kişisel ve profesyonel gelişimini destekleyen bir öğrenme kültürü oluşturuyoruz.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FaBriefcase className="text-primary text-2xl" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">İş-Yaşam Dengesi</h3>
                  <p className="text-gray-600">Esnek çalışma saatleri ve uzaktan çalışma imkanları ile çalışanlarımızın iş-yaşam dengesini korumalarına yardımcı oluyoruz.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Açık Pozisyonlar */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Açık Pozisyonlar</h2>
            <p className="text-gray-600">Yeteneklerinizi sergileyebileceğiniz ve geliştirebileceğiniz kariyer fırsatları</p>
          </motion.div>
          
          {/* Kategori Filtreleri */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
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
          
          {/* Pozisyon Listesi */}
          <div className="space-y-6">
            {filteredPositions.length > 0 ? (
              filteredPositions.map((position) => (
                <motion.div 
                  key={position.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="bg-primary/10 p-3 rounded-lg mr-4">
                          {position.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{position.title}</h3>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <FaMapMarkerAlt className="text-gray-400 mr-1" />
                              {position.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FaUsers className="text-gray-400 mr-1" />
                              {position.department}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FaRegClock className="text-gray-400 mr-1" />
                              {position.type}
                            </div>
                          </div>
                          <p className="text-gray-600">{position.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActivePosition(activePosition === position.id ? null : position.id)}
                        className="text-primary hover:text-primary-dark transition-colors ml-4 flex-shrink-0"
                      >
                        {activePosition === position.id ? 'Gizle' : 'Detaylar'}
                      </button>
                    </div>
                    
                    {activePosition === position.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-100"
                      >
                        <h4 className="font-bold text-gray-800 mb-3">Aranan Nitelikler</h4>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                          {position.requirements.map((req, index) => (
                            <li key={index} className="text-gray-600">{req}</li>
                          ))}
                        </ul>
                        <div className="flex justify-end">
                          <Link 
                            href={`/basvuru/${position.id}`}
                            className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                          >
                            Başvur
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="bg-white rounded-xl shadow-md p-8 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <p className="text-gray-600">Bu kategoride şu anda açık pozisyon bulunmamaktadır.</p>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Başvuru Süreci */}
        <motion.div 
          className="max-w-5xl mx-auto mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Başvuru Süreci</h2>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Başvuru</h3>
                    <p className="text-gray-600">CV'niz ve motivasyon mektubunuzla birlikte online başvurunuzu yapın. Her başvuru dikkatle incelenmektedir.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">İlk Görüşme</h3>
                    <p className="text-gray-600">Uygun adaylarla insan kaynakları ekibimiz telefon veya video görüşmesi gerçekleştirir.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Teknik Değerlendirme</h3>
                    <p className="text-gray-600">Pozisyona bağlı olarak, teknik bilgi ve becerileri değerlendiren bir test veya örnek çalışma istenebilir.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Detaylı Görüşme</h3>
                    <p className="text-gray-600">Departman yöneticisi ve ekip üyeleriyle detaylı bir görüşme yapılır.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">5</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Teklif</h3>
                    <p className="text-gray-600">Başarılı adaylara iş teklifimiz sunulur ve onay sonrası işe başlama süreci planlanır.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Spontane Başvuru */}
        <motion.div 
          className="max-w-5xl mx-auto mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Açık Pozisyonlarda Kendinize Uygun Bir Rol Bulamadınız mı?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              İlanlarımız arasında size uygun bir pozisyon bulamadıysanız, spontane başvuru yapabilirsiniz. Yeni fırsatlar oluştuğunda sizinle iletişime geçebiliriz.
            </p>
            <Link 
              href="/spontane-basvuru" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Spontane Başvuru Yap
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerPage; 