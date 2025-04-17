'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Animasyon varyantları
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

type Position = {
  title: string;
  department: string;
  location: string;
};

type PositionData = {
  [key: string]: Position;
};

const positionData: PositionData = {
  'backend-developer': {
    title: 'Backend Developer',
    department: 'Yazılım Geliştirme',
    location: 'İstanbul (Hibrit)'
  },
  'content-marketing': {
    title: 'İçerik Pazarlama Uzmanı',
    department: 'Pazarlama',
    location: 'İstanbul (Hibrit)'
  }
};

// Statik sayfa oluşturma için gerekli fonksiyon
export function generateStaticParams() {
  return Object.keys(positionData).map((pozisyon) => ({
    pozisyon,
  }));
}

const ApplicationForm = () => {
  const params = useParams() || {};
  const router = useRouter();
  const positionId = params.pozisyon as string;
  
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    coverLetter: '',
    cvFile: null as File | null,
    agreeTerms: false
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (positionId && positionData[positionId]) {
      setPosition(positionData[positionId]);
    } else {
      // Eğer geçerli bir pozisyon değilse kariyer sayfasına yönlendir
      router.push('/kariyer');
    }
  }, [positionId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Hata varsa temizle
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormState(prev => ({ ...prev, cvFile: file }));
      
      // Hata varsa temizle
      if (formErrors.cvFile) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.cvFile;
          return newErrors;
        });
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: checked }));
    
    // Hata varsa temizle
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formState.fullName.trim()) errors.fullName = 'İsim Soyisim zorunludur';
    if (!formState.email.trim()) errors.email = 'E-posta adresi zorunludur';
    else if (!/^\S+@\S+\.\S+$/.test(formState.email.trim())) errors.email = 'Geçerli bir e-posta adresi giriniz';
    
    if (!formState.phone.trim()) errors.phone = 'Telefon numarası zorunludur';
    if (!formState.coverLetter.trim()) errors.coverLetter = 'Motivasyon yazısı zorunludur';
    if (!formState.cvFile) errors.cvFile = 'CV yüklemek zorunludur';
    if (!formState.agreeTerms) errors.agreeTerms = 'Devam etmek için gizlilik politikasını kabul etmelisiniz';
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Burada gerçek bir form gönderimi simüle edilebilir
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Gerçek bir uygulamada, form verilerini backend'e gönderin
    }, 1500);
  };

  if (!position) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin text-primary text-4xl">
          <FaSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {isSubmitted ? (
          <motion.div 
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Başvurunuz Alındı!</h1>
            <p className="text-gray-600 mb-8">
              Başvurunuz başarıyla alındı. Ekibimiz inceledikten sonra sizinle iletişime geçecektir.
              Teşekkür ederiz.
            </p>
            <Link 
              href="/kariyer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <FaArrowLeft className="mr-2" /> Kariyer Sayfasına Dön
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="max-w-3xl mx-auto mb-10">
              <Link 
                href="/kariyer" 
                className="inline-flex items-center text-primary hover:text-primary-dark transition-colors mb-6"
              >
                <FaArrowLeft className="mr-2" /> Kariyer Sayfasına Dön
              </Link>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                  <h1 className="text-2xl font-bold mb-2">{position.title} Pozisyonu Başvurusu</h1>
                  <div className="flex flex-wrap gap-3 opacity-90">
                    <div className="text-sm">{position.department}</div>
                    <div className="text-sm">•</div>
                    <div className="text-sm">{position.location}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Kişisel Bilgiler */}
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Kişisel Bilgiler</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                              İsim Soyisim *
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formState.fullName}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                                formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Adınız Soyadınız"
                            />
                            {formErrors.fullName && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.fullName}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                              E-posta *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formState.email}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                                formErrors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="ornek@email.com"
                            />
                            {formErrors.email && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                              Telefon *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formState.phone}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                                formErrors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="(5xx) xxx xx xx"
                            />
                            {formErrors.phone && (
                              <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="linkedinUrl">
                              LinkedIn Profili
                            </label>
                            <input
                              type="url"
                              id="linkedinUrl"
                              name="linkedinUrl"
                              value={formState.linkedinUrl}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                              placeholder="https://linkedin.com/in/..."
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="portfolioUrl">
                              Portfolyo / Kişisel Site / GitHub
                            </label>
                            <input
                              type="url"
                              id="portfolioUrl"
                              name="portfolioUrl"
                              value={formState.portfolioUrl}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Motivasyon ve CV */}
                      <div>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Başvuru Bilgileri</h2>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="coverLetter">
                            Motivasyon Yazısı *
                          </label>
                          <textarea
                            id="coverLetter"
                            name="coverLetter"
                            value={formState.coverLetter}
                            onChange={handleInputChange}
                            rows={5}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                              formErrors.coverLetter ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Neden bu pozisyona başvurduğunuzu ve neden sizi seçmeliyiz? Kendinizden ve beklentilerinizden bahsedin."
                          />
                          {formErrors.coverLetter && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.coverLetter}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cvFile">
                            CV Yükle *
                          </label>
                          <div className={`border border-dashed rounded-lg p-4 text-center ${
                            formErrors.cvFile ? 'border-red-500' : 'border-gray-300'
                          }`}>
                            {formState.cvFile ? (
                              <div className="text-sm text-gray-600">
                                <FaCheck className="inline-block mr-2 text-green-500" />
                                {formState.cvFile.name}
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm text-gray-500 mb-2">PDF, DOCX veya DOC (Max 5MB)</p>
                                <label htmlFor="cvFile" className="cursor-pointer inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
                                  Dosya Seç
                                </label>
                              </div>
                            )}
                            <input
                              type="file"
                              id="cvFile"
                              name="cvFile"
                              onChange={handleFileChange}
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                            />
                          </div>
                          {formErrors.cvFile && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.cvFile}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Gizlilik Politikası */}
                      <div className="border-t border-gray-200 pt-6">
                        <div className={`flex items-start ${formErrors.agreeTerms ? 'text-red-500' : ''}`}>
                          <div className="flex items-center h-5">
                            <input
                              id="agreeTerms"
                              name="agreeTerms"
                              type="checkbox"
                              checked={formState.agreeTerms}
                              onChange={handleCheckboxChange}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="agreeTerms" className={`font-medium ${formErrors.agreeTerms ? 'text-red-500' : 'text-gray-700'}`}>
                              Gizlilik Politikasını kabul ediyorum *
                            </label>
                            <p className={formErrors.agreeTerms ? 'text-red-500' : 'text-gray-500'}>
                              Başvurunuzla birlikte sağladığınız kişisel bilgilerin 
                              <Link href="/gizlilik-politikasi" className="text-primary hover:underline"> Gizlilik Politikamıza </Link> 
                              uygun olarak işleneceğini kabul ediyorsunuz.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Gönder Butonu */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin mr-2" />
                              Gönderiliyor...
                            </>
                          ) : (
                            'Başvuruyu Gönder'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm; 