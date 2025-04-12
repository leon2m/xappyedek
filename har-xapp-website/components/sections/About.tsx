'use client';

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// GSAP'ı kaydet
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useInView(sectionRef, { once: false, amount: 0.1 });
  
  // Smooth scroll ve reveal animasyonları
  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;
    
    // Başlık animasyonu
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );
    
    // İçerik paragraflarının animasyonu
    const contentElements = contentRef.current.querySelectorAll('p');
    gsap.fromTo(
      contentElements,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2,
        duration: 0.7, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      }
    );
    
    // Özellikler kutuları için animasyon
    featureRefs.current.forEach((feature, index) => {
      if (!feature) return;
      
      gsap.fromTo(
        feature,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
    
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight"
          >
            H-AR XaPP <span className="text-primary">Hakkında</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Çalışan Deneyimi İçin Tasarlanmış Süper Uygulama. Sadelikten İlham Alıyor.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Sol taraf - İçerik */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              AR Solutions tarafından geliştirilen H-AR XaPP, kurumsal iç süreçleri ve çalışan deneyimini yeniden tanımlamak üzere tasarlanmış, modüler yapıya sahip premium bir &ldquo;süper uygulamadır&rdquo;. Kurumların benzersiz ihtiyaçlarına göre şekillenen H-AR XaPP, iletişimi güçlendirir, süreçleri optimize eder ve çalışan bağlılığını artırır.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              SAP ve Microsoft ekosistemleriyle entegre çalışarak, dijital çalışma ortamınızın doğal bir uzantısı haline gelir. Oryantasyon süreçlerinden günlük iş akışlarına kadar tüm temas noktalarını tek bir zarif ve işlevsel arayüzde toplar.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Japon tasarım felsefesinden ilham alan platform, yalın çizgiler, amaç odaklı sadelik ve beyaz, <span className="text-[#4C8B32] font-medium">#4C8B32</span> (birincil yeşil) ve <span className="text-[#95C01E] font-medium">#95C01E</span> (ikincil yeşil) renklerinden oluşan huzur veren bir palet ile sade, berrak ve kullanıcı dostu bir deneyim sunar.
            </p>
            
            <div className="pt-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-gray-700">
                    <strong>Neden H-AR XaPP?</strong> Çünkü çalışanlarınız, en az sizin kadar akıllı, esnek ve zarif bir platformu hak ediyor.
                  </p>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-gray-700">
                    Çünkü çalışan deneyimi sadece bir İK hedefi değil, aynı zamanda stratejik bir avantajdır.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sağ taraf - Görsel veya özellikler */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Temel Özellikler</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Modüler Mimari",
                  description: "İhtiyacınız olan modülleri etkinleştirin. Sistemin tamamını etkilemeden modül ekleyin, çıkarın ya da özelleştirin.",
                  icon: (
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                  )
                },
                {
                  title: "SAP & Microsoft Entegrasyonu",
                  description: "Görevleri otomatikleştirin, erişimi sadeleştirin, sistemler arası gerçek zamanlı veri akışını sağlayın.",
                  icon: (
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                  )
                },
                {
                  title: "Kurumsal İletişim Merkezi",
                  description: "Duyurular yapın, iç kampanyalar yönetin, markanızla tutarlı bir iletişim dili kurun.",
                  icon: (
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                    </svg>
                  )
                },
                {
                  title: "Çalışan Deneyimi Paketi",
                  description: "Geri bildirim araçları, iyilik halleri takibi, oyunlaştırılmış takdir sistemleri ile çalışan bağlılığını güçlendirin.",
                  icon: (
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )
                },
                {
                  title: "Sürdürülebilir ve Estetik Tasarım",
                  description: "Uzun vadeli kullanım için düşük bilişsel yük ile inşa edildi; arayüz, markanızın kurumsal duruşunu yansıtır.",
                  icon: (
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  ref={el => {
                    featureRefs.current[index] = el;
                    return undefined;
                  }}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 