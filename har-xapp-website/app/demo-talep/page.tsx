'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface FormState {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  interests: string[];
  message: string;
  submitted: boolean;
  loading: boolean;
}

const DemoRequestPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  
  const [formState, setFormState] = useState<FormState>({
    name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    interests: [],
    message: '',
    submitted: false,
    loading: false
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // 3D mouse move effect
  useGSAP(() => {
    const form = formRef.current;
    if (!form) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const formRect = form.getBoundingClientRect();
      
      // Calculate distance from center
      const formCenterX = formRect.left + formRect.width / 2;
      const formCenterY = formRect.top + formRect.height / 2;
      
      const moveX = (clientX - formCenterX) / 20;
      const moveY = (clientY - formCenterY) / 20;
      
      gsap.to(form, {
        rotateY: moveX * 0.5,
        rotateX: -moveY * 0.5,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(form, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    form.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      form.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormState(prev => {
      if (checked) {
        return { ...prev, interests: [...prev.interests, value] };
      } else {
        return { ...prev, interests: prev.interests.filter(interest => interest !== value) };
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Static export modunda API routes çalışmaz, bu durumda simülasyon yapıyoruz
    if (process.env.NEXT_PUBLIC_PRODUCTION === 'true' || process.env.NODE_ENV === 'production') {
      console.log('Prodüksiyon ortamında form gönderimi simüle ediliyor');
      console.log('Bu kısımda harici bir API ile entegrasyon yapmanız gerekiyor');
      
      // Demo amaçlı form verilerini console'a yaz
      console.log('Form verileri:', {
        name: formState.name,
        company: formState.company,
        position: formState.position,
        email: formState.email,
        phone: formState.phone,
        interests: formState.interests,
        message: formState.message,
      });
      
      // Simüle etmek için timeout kullan
      setTimeout(() => {
        setFormState(prev => ({ ...prev, submitted: true, loading: false }));
        
        // Başarılı yanıt sonrası teşekkürler sayfasına yönlendir
        setTimeout(() => {
          router.push('/demo-talep/tesekkurler');
        }, 2000);
      }, 1500);
      
      return;
    }
    
    // Yerel geliştirme ortamında API'yi çağır
    fetch('/api/demo-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formState.name,
        company: formState.company,
        position: formState.position,
        email: formState.email,
        phone: formState.phone,
        interests: formState.interests,
        message: formState.message,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Form gönderimi başarısız oldu');
        }
        return response.json();
      })
      .then(data => {
        console.log('Demo talebi başarıyla gönderildi:', data);
        setFormState(prev => ({ ...prev, submitted: true, loading: false }));
        
        // Başarılı yanıt sonrası teşekkürler sayfasına yönlendir
        setTimeout(() => {
          router.push('/demo-talep/tesekkurler');
        }, 2000);
      })
      .catch(error => {
        console.error('Form gönderim hatası:', error);
        setFormState(prev => ({ ...prev, loading: false }));
        alert('Demo talep formu gönderimi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      });
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const moduleOptions = [
    { id: 'ik', label: 'İnsan Kaynakları' },
    { id: 'finans', label: 'Finans' },
    { id: 'it', label: 'Bilgi Teknolojileri' },
    { id: 'operasyon', label: 'Operasyon' }
  ];
  
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Hakkınızda Bilgi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">İsim Soyisim</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="İsim Soyisim"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Şirket Adı</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Şirket Adı"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">Pozisyon</label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  required
                  value={formState.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Pozisyon"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="E-posta Adresiniz"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Telefon Numaranız"
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">İlgi Alanları</h3>
            <div className="space-y-4">
              <p className="text-gray-600">İlgilendiğiniz modülleri seçiniz:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moduleOptions.map(module => (
                  <label key={module.id} className="flex items-start p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <input
                      type="checkbox"
                      name="interests"
                      value={module.id}
                      checked={formState.interests.includes(module.id)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5 text-primary rounded mr-3 mt-0.5 focus:ring-primary"
                    />
                    <div>
                      <span className="block font-medium">{module.label}</span>
                      <span className="text-sm text-gray-500">
                        {module.id === 'ik' && 'İşe alım, performans değerlendirme, eğitim ve daha fazlası'}
                        {module.id === 'finans' && 'Faturalandırma, harcama yönetimi, finansal raporlama'}
                        {module.id === 'it' && 'Varlık takibi, destek talebi yönetimi, erişim kontrolü'}
                        {module.id === 'operasyon' && 'Tedarik zinciri, stok yönetimi, süreç optimizasyonu'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ekstra Bilgiler</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Özel gereksinimleriniz veya sorularınız varsa buraya yazabilirsiniz."
                ></textarea>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  Bilgilerinizi göndererek, AR Solutions&apos;ın
                  <a href="/gizlilik-politikasi" className="text-primary hover:underline"> Gizlilik Politikasını</a> kabul etmiş olursunuz.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  if (formState.submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-block mb-6">
            <div className="relative w-24 h-24 mx-auto">
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary/20"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Talebiniz Alındı!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Demo talebiniz için teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              H-AR XaPP Demo Talep Formu
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Ücretsiz bir demo randevusu alarak H-AR XaPP&apos;ın işletmenize nasıl değer katabileceğini keşfedin.
            </motion.p>
          </div>
          
          {/* 3D Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-lg opacity-30"></div>
            <div className="absolute -inset-1 bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.primary.500)_0%,theme(colors.primary.100)_10%,theme(colors.secondary.300)_20%,theme(colors.primary.500)_30%)] animate-[angle_3s_linear_infinite] rounded-3xl blur opacity-25"
              style={{ '--shimmer-angle': '0deg' } as React.CSSProperties}
            ></div>
            
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform-gpu">
              {/* Progress Steps */}
              <div className="px-6 pt-6 pb-4 border-b">
                <div className="flex justify-between items-center">
                  {[...Array(totalSteps)].map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${
                          currentStep > index + 1 
                            ? 'bg-primary text-white' 
                            : currentStep === index + 1 
                              ? 'bg-primary/10 border-2 border-primary text-primary' 
                              : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {currentStep > index + 1 ? '✓' : index + 1}
                      </div>
                      <span className={`text-xs mt-1 ${currentStep === index + 1 ? 'text-primary font-medium' : 'text-gray-500'}`}>
                        {index === 0 && 'Bilgiler'}
                        {index === 1 && 'İlgi Alanları'}
                        {index === 2 && 'Tamamla'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded-full"></div>
                  <div
                    className="absolute top-0 left-0 h-1 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Form Content */}
              <form ref={formRef} onSubmit={handleSubmit} className="p-8 bg-gray-50/80 backdrop-blur-sm transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="mt-10 flex justify-between">
                  {currentStep > 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Geri
                    </motion.button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Devam Et
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={formState.loading}
                      className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all relative overflow-hidden"
                    >
                      {formState.loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Gönderiliyor...
                        </span>
                      ) : (
                        <span>Demo Talep Et</span>
                      )}
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Sorunuz mu var? <a href="/iletisim" className="text-primary hover:underline font-medium">Bizimle iletişime geçin</a>
            </p>
          </div>
        </div>
      </div>
      
      {/* 3D Floating Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(65, 150, 57, 0.2)' : 'rgba(159, 207, 103, 0.2)'} 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: -1
            }}
            animate={{
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              scale: [Math.random() * 0.5 + 0.8, Math.random() * 0.5 + 0.8],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 10 + 10,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoRequestPage; 