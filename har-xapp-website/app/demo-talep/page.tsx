'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
    
    // Form verilerini loglayalım (gerçek uygulamada burada API çağrısı yapılacak)
    console.log('Demo talebi gönderildi:', {
      name: formState.name,
      company: formState.company,
      position: formState.position,
      email: formState.email,
      phone: formState.phone,
      interests: formState.interests,
      message: formState.message
    });
    
    // Static export için doğrudan teşekkürler sayfasına yönlendir
    setTimeout(() => {
      setFormState(prev => ({ ...prev, submitted: true, loading: false }));
      
      setTimeout(() => {
        window.location.href = '/demo-talep/tesekkurler';
      }, 1000);
    }, 800);
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
              
              <div className="space-y-2">
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
            <h3 className="text-xl font-semibold text-gray-800 mb-4">İlgi Alanlarınız</h3>
            <p className="text-gray-600 mb-6">H-AR XaPP'in hangi modülleri ile ilgileniyorsunuz?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {moduleOptions.map(option => (
                <div key={option.id} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="interests"
                    value={option.id}
                    checked={formState.interests.includes(option.id)}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-5 w-5 text-primary border-gray-300 rounded cursor-pointer focus:ring-primary"
                  />
                  <label htmlFor={option.id} className="cursor-pointer">
                    <div className="font-medium text-gray-800">{option.label}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Ek Bilgiler</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Ek Bilgiler</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Eklemek istediğiniz detaylar"
                ></textarea>
              </div>
              
              <div className="pt-3">
                <p className="text-sm text-gray-600 mb-6">
                  Form verileriniz KVKK kapsamında sistemlerimizde güvenle saklanacaktır.
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
          
          <h2 className="text-3xl font-bold mb-4">Demo Talebiniz Alındı!</h2>
          <p className="text-xl text-gray-600 mb-6">
            Demo talebiniz için teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg inline-block"
          >
            Ana Sayfaya Dön
          </Link>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Demo Talep Formu
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              H-AR XaPP kurumsal uygulamasını ücretsiz deneyimlemek için demo talebinde bulunun.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-lg opacity-30"></div>
            
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform-gpu">
              <div className="p-8">
                <div className="flex mb-6">
                  {[...Array(totalSteps)].map((_, i) => {
                    const stepNum = i + 1;
                    const isActive = currentStep === stepNum;
                    const isCompleted = currentStep > stepNum;
                    
                    return (
                      <div key={i} className="flex-1">
                        <div className="relative flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive 
                              ? 'bg-primary text-white' 
                              : isCompleted 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-600'
                          }`}>
                            {isCompleted ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              stepNum
                            )}
                          </div>
                          
                          {i < totalSteps - 1 && (
                            <div className={`flex-1 h-1 mx-2 ${
                              isCompleted ? 'bg-green-500' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>
                        
                        <div className="text-xs text-center mt-2 text-gray-600">
                          {stepNum === 1 && 'Kişisel Bilgiler'}
                          {stepNum === 2 && 'İlgi Alanları'}
                          {stepNum === 3 && 'Tamamla'}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                  {renderStepContent()}
                  
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Geri
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-md transition-all"
                      >
                        İleri
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={formState.loading}
                        className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${
                          formState.loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary to-secondary hover:shadow-md'
                        }`}
                      >
                        {formState.loading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            İşleniyor...
                          </span>
                        ) : (
                          'Demo Talebi Gönder'
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DemoRequestPage; 