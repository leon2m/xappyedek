'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  FaSalesforce, FaJira, FaMailchimp, FaStripe, FaGoogle, FaGithub, 
  FaAws, FaMicrosoft, FaSitemap, FaSlack, FaTeamspeak,
  FaShareAlt, FaAsymmetrik
} from 'react-icons/fa';
import { 
  HiOutlineChevronRight, 
  HiOutlineDatabase, HiOutlineCloud, HiOutlineLightningBolt, HiOutlineCog, HiOutlineCode, 
  HiOutlineInformationCircle, HiDatabase, HiServer, HiOfficeBuilding,
  HiOutlineArrowNarrowRight
} from 'react-icons/hi';

const QuickNav = () => {
  const sections = [
    { id: 'about', icon: <HiOutlineInformationCircle />, title: 'Hakkımızda', href: '/hakkimizda' },
    { id: 'features', icon: <HiOutlineLightningBolt />, title: 'Özellikler', href: '/ozellikler' },
    { id: 'modules', icon: <HiOutlineCog />, title: 'Modüller', href: '/ozellikler#modules' },
    { id: 'integrations', icon: <HiOutlineDatabase />, title: 'Entegrasyonlar', href: '/ozellikler#integrations' },
    { id: 'cta', icon: <HiOutlineArrowNarrowRight />, title: 'Demo Talep', href: '/demo-talep' },
  ];

  const scrollToSection = (id: string, href: string) => {
    // Önce sayfada id'ye sahip elementi bulmaya çalış
    const element = document.getElementById(id);
    if (element) {
      // Element bulunursa ona kaydır
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Element bulunamazsa (farklı sayfadaysa) o sayfaya yönlendir
      window.location.href = href;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
    >
      {sections.map((section) => (
        <motion.button
          key={section.id}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection(section.id, section.href)}
          className="group relative flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-primary/10 text-gray-500 hover:text-primary transition-all duration-300"
        >
          <span className="text-lg">{section.icon}</span>
          <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-lg border border-primary/10 text-sm font-medium transition-all duration-300">
            {section.title}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

const Integrations = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const integrations = [
    {
      name: 'SAP',
      description: 'SAP ERP, S/4HANA ve SuccessFactors ile sorunsuz entegrasyon.',
      features: [
        'İK verilerinin senkronizasyonu',
        'Finans ve muhasebe entegrasyonu',
        'Envanter ve stok yönetimi bağlantısı'
      ],
      logo: <HiDatabase className="w-8 h-8 text-primary" />
    },
    {
      name: 'Microsoft 365',
      description: 'Office 365, Dynamics 365 ve Azure ile tam entegrasyon.',
      features: [
        'Teams entegrasyonu ve bildirimler',
        'SharePoint dosya yönetimi',
        'Azure Active Directory kimlik doğrulama'
      ],
      logo: <FaMicrosoft className="w-8 h-8 text-primary" />
    },
    {
      name: 'CRM & İş Çözümleri',
      description: 'Salesforce, Oracle, Asana, Jira ve daha fazlası ile entegrasyon.',
      features: [
        'CRM sistemleri entegrasyonu',
        'Proje yönetimi araçları bağlantısı',
        'E-posta pazarlama araçları entegrasyonu'
      ],
      logo: <FaSalesforce className="w-8 h-8 text-primary" />
    }
  ];
  
  const additionalIntegrations = [
    { name: 'Microsoft Teams', logo: <FaTeamspeak className="w-6 h-6" /> },
    { name: 'SharePoint', logo: <FaShareAlt className="w-6 h-6" /> },
    { name: 'Azure', logo: <HiOutlineCloud className="w-6 h-6" /> },
    { name: 'Oracle', logo: <HiOfficeBuilding className="w-6 h-6" /> },
    { name: 'Salesforce', logo: <FaSalesforce className="w-6 h-6" /> },
    { name: 'Jira', logo: <FaJira className="w-6 h-6" /> },
    { name: 'Asana', logo: <FaAsymmetrik className="w-6 h-6" /> },
    { name: 'Slack', logo: <FaSlack className="w-6 h-6" /> },
    { name: 'Zoom', logo: <HiServer className="w-6 h-6" /> },
    { name: 'GitHub', logo: <FaGithub className="w-6 h-6" /> },
    { name: 'AWS', logo: <FaAws className="w-6 h-6" /> },
    { name: 'Google Workspace', logo: <FaGoogle className="w-6 h-6" /> },
    { name: 'Stripe', logo: <FaStripe className="w-6 h-6" /> },
    { name: 'Mailchimp', logo: <FaMailchimp className="w-6 h-6" /> },
  ];

  return (
    <>
      <QuickNav />
      <section id="integrations" ref={ref} className="py-20 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
        {/* Arka plan dekoratif elemanları */}
        <div className="absolute w-3/4 h-3/4 right-0 top-0 rounded-bl-full bg-gradient-to-bl from-primary/5 to-transparent -z-10"></div>
        <div className="absolute w-1/2 h-1/2 left-0 bottom-0 rounded-tr-full bg-gradient-to-tr from-secondary/5 to-transparent -z-10"></div>
        <div className="absolute inset-0 bg-grid-primary/10 opacity-30"></div>
        
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center rounded-full bg-white/70 backdrop-blur-md px-6 py-2 text-base font-medium text-primary border border-primary/20 shadow-lg shadow-primary/10">
              <FaSitemap className="w-4 h-4 mr-2 text-primary" />
              Kusursuz Bağlantı
            </span>
            <h2 className="section-title mt-4">Güçlü Entegrasyonlar</h2>
            <p className="section-subtitle mx-auto">
              H-AR XaPP, mevcut sistemlerinizle sorunsuz çalışmak için tasarlanmıştır. SAP, Microsoft ve diğer kurumsal
              sistemlerle kolayca entegre edilebilir.
            </p>
          </motion.div>

          {/* Entegrasyon şeması */}
          <div className="relative py-10 mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute inset-0 flex justify-center items-center"
            >
              <div className="w-full h-1 bg-white/40 backdrop-blur-sm md:max-w-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-primary/20">
                <div className="text-3xl flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <HiOutlineCog className="w-12 h-12 text-primary/80" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow"></div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="rounded-xl p-6 backdrop-blur-md bg-white/80 border border-primary-100/20 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">
                    {integration.logo}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{integration.name}</h3>
                  <p className="text-gray-600 mb-4">{integration.description}</p>
                  <ul className="text-left w-full space-y-2 mt-auto">
                    {integration.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">
                          <HiOutlineChevronRight className="w-4 h-4" />
                        </span>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Ek entegrasyonlar logoları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-primary-100/20 mb-16"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">Desteklenen Entegrasyonlar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 items-center justify-center">
              {additionalIntegrations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-primary transition-colors duration-300">
                    {item.logo}
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* API ve bağlantı özellikleri */}
          <motion.div
            id="api"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-primary-100/20"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
                  <HiOutlineCode className="w-4 h-4 mr-2" />
                  Geliştirici Dostu
                </div>
                <h3 className="text-2xl font-bold mb-4">Gelişmiş API Bağlantıları</h3>
                <p className="text-gray-600 mb-4">
                  H-AR XaPP&apos;ın modern API altyapısı, tüm kurumsal sistemlerinizle veri alışverişini güvenli ve verimli hale getirir.
                  REST ve GraphQL destekli API&apos;ler ile entegrasyon süreçlerinizi hızlandırın.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-0.5">
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </span>
                    <span>OAuth 2.0 ve JWT tabanlı güvenli kimlik doğrulama</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-0.5">
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </span>
                    <span>Webhook desteği ile gerçek zamanlı veri senkronizasyonu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-0.5">
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </span>
                    <span>İki yönlü veri akışı ve otomatik eşleştirme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-0.5">
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </span>
                    <span>SOAP, REST ve GraphQL protokol desteği</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-0.5">
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </span>
                    <span>Kapsamlı API dokümantasyonu ve interaktif test arayüzü</span>
                  </li>
                </ul>
                <Link href="/entegrasyonlar" className="inline-flex items-center bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                  <span>Entegrasyon Detayları</span>
                  <HiOutlineChevronRight className="ml-2" />
                </Link>
              </div>
              <div className="relative h-72 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex flex-col">
                  <div className="bg-gray-800 text-white p-3 font-mono text-xs flex items-center">
                    <div className="flex space-x-2 mr-3">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span>REST API Endpoint</span>
                  </div>
                  <div className="bg-gray-900 flex-1 p-4 font-mono text-xs overflow-hidden">
                    <div className="text-gray-400">{/* Örnek API isteği */}</div>
                    <div className="text-green-400 mt-2">GET /api/v1/employees</div>
                    <div className="text-blue-400 mt-1">Authorization: Bearer [token]</div>
                    <div className="text-blue-400 mt-1">Content-Type: application/json</div>
                    <div className="bg-gray-800 mt-4 p-3 rounded text-white border border-gray-700">
                      <div className="text-yellow-300">{`{`}</div>
                      <div className="pl-4 text-blue-300">{`"data": [`}</div>
                      <div className="pl-8 text-yellow-300">{`{`}</div>
                      <div className="pl-12">
                        <span className="text-green-300">&quot;id&quot;:</span> 
                        <span className="text-orange-300">&quot;emp123&quot;</span>
                        <span className="text-gray-400">,</span>
                      </div>
                      <div className="pl-12">
                        <span className="text-green-300">&quot;name&quot;:</span> 
                        <span className="text-orange-300">&quot;Ahmet Yılmaz&quot;</span>
                        <span className="text-gray-400">,</span>
                      </div>
                      <div className="pl-12">
                        <span className="text-green-300">&quot;department&quot;:</span> 
                        <span className="text-orange-300">&quot;İK&quot;</span>
                        <span className="text-gray-400">,</span>
                      </div>
                      <div className="pl-12">
                        <span className="text-green-300">&quot;position&quot;:</span> 
                        <span className="text-orange-300">&quot;Uzman&quot;</span>
                      </div>
                      <div className="pl-8 text-yellow-300">{`}`}</div>
                      <div className="pl-8 text-gray-400">{`...`}</div>
                      <div className="pl-4 text-blue-300">{`],`}</div>
                      <div className="pl-4 text-blue-300">{`"meta": {`}</div>
                      <div className="pl-8">
                        <span className="text-green-300">&quot;page&quot;:</span> 
                        <span className="text-purple-300">1</span>
                        <span className="text-gray-400">,</span>
                      </div>
                      <div className="pl-8">
                        <span className="text-green-300">&quot;total&quot;:</span> 
                        <span className="text-purple-300">245</span>
                      </div>
                      <div className="pl-4 text-blue-300">{`}`}</div>
                      <div className="text-yellow-300">{`}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Integrations; 