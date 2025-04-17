'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HiArrowRight, HiCheckCircle, HiChevronDown, HiOutlineCloud, 
  HiOutlineCode, HiOutlineDatabase, HiOutlineInformationCircle, 
  HiOutlineLightningBolt, HiOutlineShieldCheck
} from 'react-icons/hi';
import { 
  FaSalesforce, FaJira, FaMailchimp, FaStripe, FaGoogle, FaGithub, 
  FaAws, FaMicrosoft, FaSitemap, FaSlack, FaTeamspeak, FaShareAlt
} from 'react-icons/fa';

const IntegrationsPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mainRef, { once: true, amount: 0.2 });

  const [activeTab, setActiveTab] = useState('enterprise');

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
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  // Kurumsal entegrasyonlar
  const enterpriseIntegrations = [
    {
      name: 'SAP',
      icon: <HiOutlineDatabase className="w-10 h-10 text-primary" />,
      description: 'H-AR XaPP, SAP ERP ve S/4HANA sistemlerinizle sorunsuz entegre olur, İK, finans, lojistik ve satın alma verilerini senkronize eder.',
      features: [
        'SAP HCM / SuccessFactors ile çalışan verisi senkronizasyonu',
        'SAP FI/CO ile finansal veri entegrasyonu',
        'SAP MM ile tedarik zinciri entegrasyonu',
        'SAP BI ile raporlama entegrasyonu',
        'SAP Fiori ile kullanıcı deneyimi entegrasyonu'
      ]
    },
    {
      name: 'Microsoft 365',
      icon: <FaMicrosoft className="w-10 h-10 text-primary" />,
      description: 'Microsoft ekosistemine tam entegrasyon sayesinde verimlilik araçlarınız ile H-AR XaPP arasında kesintisiz bağlantı sağlanır.',
      features: [
        'Azure AD SSO ile tek oturum açma',
        'Teams entegrasyonu ve mesajlaşma',
        'Outlook takvim ve e-posta entegrasyonu',
        'SharePoint doküman yönetimi entegrasyonu',
        'Excel ve Power BI veri entegrasyonu'
      ]
    },
    {
      name: 'Dynamics 365',
      icon: <FaMicrosoft className="w-10 h-10 text-primary" />,
      description: 'Microsoft Dynamics 365 ile entegrasyon, CRM, ERP ve diğer iş uygulamalarınız ile H-AR XaPP arasında çift yönlü veri akışı sağlar.',
      features: [
        'Dynamics 365 for Finance and Operations ile entegrasyon',
        'Dynamics 365 Sales ile müşteri verisi entegrasyonu',
        'Dynamics 365 HR ile çalışan veri senkronizasyonu',
        'Dynamics 365 Customer Service entegrasyonu',
        'Power Platform (Power Apps, Power Automate) desteği'
      ]
    }
  ];

  // Web servisleri entegrasyonları
  const webServiceIntegrations = [
    {
      name: 'Google Workspace',
      icon: <FaGoogle className="w-10 h-10 text-primary" />,
      features: ['Gmail', 'Google Calendar', 'Google Drive', 'Google Meet']
    },
    {
      name: 'Salesforce',
      icon: <FaSalesforce className="w-10 h-10 text-primary" />,
      features: ['Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'App Cloud']
    },
    {
      name: 'Slack',
      icon: <FaSlack className="w-10 h-10 text-primary" />,
      features: ['Mesajlaşma', 'Kanal entegrasyonu', 'Bildirimler', 'İş akışları']
    },
    {
      name: 'Jira & Confluence',
      icon: <FaJira className="w-10 h-10 text-primary" />,
      features: ['Proje takibi', 'Görev yönetimi', 'Belge paylaşımı', 'Ekip işbirliği']
    },
    {
      name: 'GitHub & Azure DevOps',
      icon: <FaGithub className="w-10 h-10 text-primary" />,
      features: ['Kod yönetimi', 'CI/CD pipeline', 'İş öğesi takibi', 'Sürüm yönetimi']
    },
    {
      name: 'AWS',
      icon: <FaAws className="w-10 h-10 text-primary" />,
      features: ['S3 entegrasyonu', 'Lambda fonksiyonları', 'SQS/SNS mesajlaşma', 'Cognito kimlik doğrulama']
    }
  ];

  const allIntegrations = [
    "Microsoft Teams", "SharePoint", "Azure AD", "Outlook", "SAP", "Oracle", 
    "Salesforce", "Jira", "Asana", "Slack", "Zoom", "GitHub", "GitLab", 
    "AWS", "Google Workspace", "Stripe", "Mailchimp", "HubSpot", "Zendesk", 
    "ServiceNow", "Workday", "ADP", "QuickBooks", "Xero", "NetSuite", 
    "Adobe Sign", "DocuSign", "Box", "Dropbox", "Google Drive"
  ];

  return (
    <main ref={mainRef} className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-slate-100 opacity-20"></div>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-primary/5 to-transparent"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"
            >
              <FaSitemap className="w-4 h-4 mr-2" />
              Sorunsuz Bağlantı
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Güçlü Entegrasyonlar
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              H-AR XaPP, mevcut işletme sistemlerinizle sorunsuz çalışmak için tasarlanmıştır. 
              SAP, Microsoft ve diğer kurumsal sistemlerinizle kolay ve güvenli entegrasyon sağlar.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Integration Categories Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap mb-8 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`py-3 px-6 font-medium text-sm transition-colors ${
                activeTab === 'enterprise' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Kurumsal Sistemler
            </button>
            <button
              onClick={() => setActiveTab('cloud')}
              className={`py-3 px-6 font-medium text-sm transition-colors ${
                activeTab === 'cloud' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Web Servisleri
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`py-3 px-6 font-medium text-sm transition-colors ${
                activeTab === 'api' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              API Yetenekleri
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`py-3 px-6 font-medium text-sm transition-colors ${
                activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Tüm Entegrasyonlar
            </button>
          </div>

          {/* Enterprise Integrations */}
          {activeTab === 'enterprise' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {enterpriseIntegrations.map((integration, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/5 flex flex-col items-center md:items-start">
                      <div className="bg-primary/10 rounded-full p-4 mb-3">
                        {integration.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{integration.name}</h3>
                    </div>
                    
                    <div className="md:w-4/5">
                      <p className="text-gray-600 mb-4">{integration.description}</p>
                      
                      <h4 className="font-semibold text-gray-800 mb-3">Entegrasyon Özellikleri:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {integration.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Web Service Integrations */}
          {activeTab === 'cloud' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {webServiceIntegrations.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 rounded-full p-3 mr-3">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                  </div>
                  
                  <ul className="mt-2 space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* API Capabilities */}
          {activeTab === 'api' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="mb-6">
                  <div className="bg-primary/10 rounded-full p-3 inline-block mb-3">
                    <HiOutlineCode className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Modern API Mimarisi</h3>
                  <p className="text-gray-600">
                    H-AR XaPP, modern RESTful ve GraphQL API'ler üzerine kurulmuş esnek bir entegrasyon mimarisi sunar. 
                    Bu sayede mevcut sistemlerinizle kolay ve güvenli veri alışverişi sağlayabilirsiniz.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2">
                      <HiOutlineLightningBolt className="w-5 h-5 text-primary mr-2" />
                      <h4 className="font-semibold">RESTful API</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      HTTP/HTTPS tabanlı, JSON formatını kullanan, kolay erişilebilir servis uç noktaları.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2">
                      <HiOutlineCode className="w-5 h-5 text-primary mr-2" />
                      <h4 className="font-semibold">GraphQL Desteği</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Esnek veri sorgulaması, ihtiyacınız olan tam veriyi almanın en etkin yolu.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2">
                      <HiOutlineShieldCheck className="w-5 h-5 text-primary mr-2" />
                      <h4 className="font-semibold">OAuth 2.0 & JWT</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Endüstri standardı kimlik doğrulama protokolleri ile güvenli API erişimi.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2">
                      <HiOutlineCloud className="w-5 h-5 text-primary mr-2" />
                      <h4 className="font-semibold">Webhook Desteği</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Olay tabanlı gerçek zamanlı entegrasyonlar ile veri değişikliklerinde anlık bildirimler.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2">
                      <HiOutlineInformationCircle className="w-5 h-5 text-primary mr-2" />
                      <h4 className="font-semibold">Swagger Dokümantasyonu</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      OpenAPI standardında kapsamlı API dokümantasyonu ve etkileşimli test konsolu.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center mb-2">
                      <HiOutlineDatabase className="w-5 h-5 text-primary mr-2" />
                      <h4 className="font-semibold">Veri Dönüşüm Motoru</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Farklı sistemler arasında veri dönüşümlerini otomatikleştiren dahili ETL yetenekleri.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Geliştirici Dostu Araçlar</h3>
                    <p className="text-gray-600">
                      H-AR XaPP, geliştiricileriniz için kolay entegrasyon sağlayan araçlar ve kütüphaneler sunar.
                    </p>
                  </div>
                  
                  <div className="md:w-2/3">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-gray-800">SDK Kütüphaneleri</h4>
                          <p className="text-sm text-gray-600">JavaScript, Python, Java, C# ve diğer diller için kütüphaneler.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-gray-800">Geliştirici Portalı</h4>
                          <p className="text-sm text-gray-600">API dokümantasyonu, örnek kodlar ve geliştirme rehberleri.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-gray-800">Entegrasyon Asistanı</h4>
                          <p className="text-sm text-gray-600">Kod yazmadan entegrasyonları yapılandırmak için kullanıcı dostu arayüz.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <HiCheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-gray-800">Test Ortamı</h4>
                          <p className="text-sm text-gray-600">Entegrasyonları canlıya almadan önce test edebileceğiniz sandbox.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* All Integrations */}
          {activeTab === 'all' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Desteklenen Tüm Entegrasyonlar</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {allIntegrations.map((integration, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                      <span className="text-sm text-gray-700">{integration}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Başarı Hikayeleri</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Müşterilerimizin H-AR XaPP entegrasyonları ile nasıl değer yarattıklarını keşfedin.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="mb-4">
                <span className="inline-block py-1 px-2 rounded bg-primary/10 text-primary text-xs font-semibold mb-2">
                  Üretim Sektörü
                </span>
                <h3 className="text-xl font-bold text-gray-900">ABC Üretim A.Ş.</h3>
                <p className="text-sm text-gray-500">SAP ve Microsoft Teams Entegrasyonu</p>
              </div>
              <p className="text-gray-600 mb-4">
                ABC Üretim, H-AR XaPP'ın SAP ve Microsoft Teams entegrasyonu sayesinde tedarik zinciri 
                süreçlerindeki onay akışlarını %70 hızlandırdı ve çalışanların günlük 45 dakikasını kurtardı.
              </p>
              <Link 
                href="/iletisim" 
                className="text-primary font-medium flex items-center hover:underline"
              >
                <span>Detayları görüntüle</span>
                <HiArrowRight className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="mb-4">
                <span className="inline-block py-1 px-2 rounded bg-primary/10 text-primary text-xs font-semibold mb-2">
                  Finans Sektörü
                </span>
                <h3 className="text-xl font-bold text-gray-900">XYZ Finans</h3>
                <p className="text-sm text-gray-500">Salesforce ve Azure AD Entegrasyonu</p>
              </div>
              <p className="text-gray-600 mb-4">
                XYZ Finans, H-AR XaPP'ın Salesforce ve Azure AD entegrasyonu ile müşteri verilerini güvenli 
                bir şekilde birleştirerek, satış ekiplerinin müşteri görüşmelerindeki verimliliğini %40 artırdı.
              </p>
              <Link 
                href="/iletisim" 
                className="text-primary font-medium flex items-center hover:underline"
              >
                <span>Detayları görüntüle</span>
                <HiArrowRight className="ml-1" />
              </Link>
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
                Entegrasyonlarınızı Keşfedelim
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                İşletme sistemlerinizle H-AR XaPP'ı nasıl entegre edebileceğinizi öğrenmek mi istiyorsunuz? 
                Uzmanlarımız size özel bir entegrasyon stratejisi oluşturmak için yanınızda.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/iletisim" 
                className="btn-gradient px-6 py-3 rounded-lg text-center flex-1 max-w-xs mx-auto"
              >
                <span>Uzmanlarımıza Danışın</span>
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

export default IntegrationsPage; 