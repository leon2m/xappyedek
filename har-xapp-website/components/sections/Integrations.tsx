'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

const Integrations = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Basit görünürlük kontrolü
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

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
    <section id="integrations" ref={ref} className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 relative">
      {/* Basitleştirilmiş arka plan */}
      <div className="absolute inset-0 bg-grid-primary/5 opacity-50"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Başlık bölümü - Animasyonsuz temel render */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center rounded-full bg-white px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-primary border border-primary/20 shadow-md">
            <FaSitemap className="w-4 h-4 mr-2 text-primary" />
            Kusursuz Bağlantı
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-gray-900">Güçlü Entegrasyonlar</h2>
          <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            H-AR XaPP, mevcut sistemlerinizle sorunsuz çalışmak için tasarlanmıştır. SAP, Microsoft ve diğer kurumsal
            sistemlerle kolayca entegre edilebilir.
          </p>
        </div>

        {/* Entegrasyon kartları - Görünürlükte basit fade-in */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className={`rounded-xl p-4 sm:p-6 bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 bg-primary/5 w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center">
                {integration.logo}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{integration.name}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{integration.description}</p>
              <ul className="text-left w-full space-y-1 sm:space-y-2 mt-auto">
                {integration.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">
                      <HiOutlineChevronRight className="w-4 h-4" />
                    </span>
                    <span className="text-gray-600 text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Ek entegrasyonlar logoları - Basitleştirilmiş yapı */}
        <div 
          className={`bg-white rounded-xl p-4 sm:p-8 shadow-md mb-10 md:mb-16 overflow-x-auto ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '300ms' }}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">Desteklenen Entegrasyonlar</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 sm:gap-6 items-center justify-center min-w-[400px]">
            {additionalIntegrations.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-primary transition-colors duration-300">
                  {item.logo}
                </div>
                <span className="text-xs text-gray-500 mt-2 text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* API ve bağlantı özellikleri - Basitleştirilmiş */}
        <div
          id="api"
          className={`bg-white rounded-xl p-4 sm:p-8 shadow-md ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
          style={{ animationDelay: '400ms' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/5 px-4 py-1 text-sm font-medium text-primary mb-4">
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
            <div className="relative h-64 sm:h-72 rounded-lg overflow-hidden shadow-md hidden sm:block">
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
                  <div className="text-green-400 mt-2">GET /api/v1/employees</div>
                  <div className="text-blue-400 mt-1">Authorization: Bearer [token]</div>
                  <div className="text-blue-400 mt-1">Content-Type: application/json</div>
                  <div className="bg-gray-800 mt-4 p-3 rounded text-white border border-gray-700">
                    <div className="text-yellow-300">{`{`}</div>
                    <div className="pl-4 text-blue-300">{`"data": [...],`}</div>
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
        </div>
      </div>
    </section>
  );
};

export default Integrations; 