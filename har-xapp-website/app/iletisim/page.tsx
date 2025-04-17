'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiMail, HiPhone, HiClock } from 'react-icons/hi';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submitted: boolean;
  loading: boolean;
}

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    submitted: false,
    loading: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Form verilerini loglayalım - Static export için API çağrısı yapılmıyor
    console.log('Form gönderildi:', {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      subject: formState.subject,
      message: formState.message
    });
    
    // Static export uyumlu yönlendirme yapıyoruz
    // Gerçek projede burada Netlify Forms kullanılabilir
    setTimeout(() => {
      setFormState(prev => ({ ...prev, submitted: true, loading: false }));
      
      // Netlify Forms için form verileri
      if (typeof window !== 'undefined') {
        try {
          // Netlify Forms için gizli form oluştur
          const netlifyForm = document.createElement('form');
          netlifyForm.setAttribute('method', 'POST');
          netlifyForm.setAttribute('name', 'contact');
          netlifyForm.setAttribute('data-netlify', 'true');
          netlifyForm.setAttribute('hidden', 'true');
          
          // Form alanlarını ekle
          const formFields = ['name', 'email', 'phone', 'subject', 'message'];
          formFields.forEach(field => {
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('name', field);
            input.setAttribute('value', formState[field as keyof typeof formState] as string);
            netlifyForm.appendChild(input);
          });
          
          // Formu document'e ekle, gönder ve kaldır
          document.body.appendChild(netlifyForm);
          netlifyForm.submit();
          document.body.removeChild(netlifyForm);
        } catch (error) {
          console.error('Form gönderme hatası:', error);
        }
      }
      
      setTimeout(() => {
        window.location.href = '/iletisim/tesekkurler';
      }, 500); // Süreyi kısalttık
    }, 500); // Süreyi kısalttık
  };
  
  const contactInfo = [
    {
      icon: <HiMail className="w-6 h-6 text-primary" />,
      title: 'E-posta',
      description: 'info@arsolutions.com.tr',
      link: 'mailto:info@arsolutions.com.tr',
      linkText: 'Mail Gönder'
    },
    {
      icon: <HiPhone className="w-6 h-6 text-primary" />,
      title: 'Telefon',
      description: '+90 (216) 380 57 67',
      link: 'tel:+902163805767',
      linkText: 'Hemen Ara'
    },
    {
      icon: <HiClock className="w-6 h-6 text-primary" />,
      title: 'Çalışma Saatleri',
      description: 'Pazartesi - Cuma: 09:00 - 18:00',
      link: null,
      linkText: null
    }
  ];
  
  // Form gönderildiğinde teşekkür mesajı göster
  if (formState.submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center bg-white p-8 rounded-2xl shadow-md"
        >
          <div className="inline-block mb-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 flex items-center justify-center text-4xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Mesajınız Alındı!</h2>
          <p className="text-xl text-gray-600 mb-6">
            İletişim talebiniz için teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg"
          >
            Ana Sayfaya Dön
          </button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Başlık - Animasyonsuz veya basit animasyonlu */}
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Bize Ulaşın
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              İletişime Geçin
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              H-AR XaPP hakkında sorularınız mı var? Bizimle iletişime geçin, en kısa sürede size dönüş yapacağız.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* İletişim Bilgileri */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">İletişim Bilgilerimiz</h2>
                
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="bg-primary/10 rounded-full p-3 flex-shrink-0 self-start">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{info.title}</h3>
                        <p className="text-gray-600 mt-1 mb-2">{info.description}</p>
                        {info.link && (
                          <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                            {info.linkText}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-4">Bizi Takip Edin</h3>
                  <div className="flex gap-3">
                    <a href="https://www.linkedin.com/company/ar-solutions-tr/" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-primary/10 p-3 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="https://twitter.com/ARSolutionsTR" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-primary/10 p-3 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="https://instagram.com/arsolutions.tr" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-primary/10 p-3 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://youtube.com/@ARSolutionsTR" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-primary/10 p-3 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* İletişim Formu */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Bize Mesaj Gönderin</h2>
                  
                  <form 
                    ref={formRef} 
                    onSubmit={handleSubmit}
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
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
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Konu</label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="Konu Başlığı"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesajınız</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={formState.loading}
                        className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-all ${
                          formState.loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg'
                        }`}
                      >
                        {formState.loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Gönderiliyor...
                          </span>
                        ) : (
                          'Mesajı Gönder'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 