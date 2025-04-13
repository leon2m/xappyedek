'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';

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
  const mapRef = useRef<HTMLDivElement>(null);
  const isMapInView = useInView(mapRef, { once: false, amount: 0.3 });
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
      
      const moveX = (clientX - formCenterX) / 25;
      const moveY = (clientY - formCenterY) / 25;
      
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
        email: formState.email,
        phone: formState.phone,
        subject: formState.subject,
        message: formState.message,
      });
      
      // Simüle etmek için timeout kullan
      setTimeout(() => {
        setFormState(prev => ({ ...prev, submitted: true, loading: false }));
        
        // Başarılı yanıt sonrası teşekkürler sayfasına yönlendir
        setTimeout(() => {
          router.push('/iletisim/tesekkurler');
        }, 2000);
      }, 1500);
      
      return;
    }
    
    // Yerel geliştirme ortamında API'yi çağır
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        subject: formState.subject,
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
        console.log('Form başarıyla gönderildi:', data);
        setFormState(prev => ({ ...prev, submitted: true, loading: false }));
        
        // Başarılı yanıt sonrası teşekkürler sayfasına yönlendir
        setTimeout(() => {
          router.push('/iletisim/tesekkurler');
        }, 2000);
      })
      .catch(error => {
        console.error('Form gönderim hatası:', error);
        setFormState(prev => ({ ...prev, loading: false }));
        alert('Form gönderimi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      });
  };
  
  const contactInfo = [
    {
      icon: <HiLocationMarker className="w-6 h-6 text-primary" />,
      title: 'Adres',
      description: 'Kozyatağı Mah., Saniye Ermutlu Sk. No:6, 34742 Kadıköy/İstanbul',
      link: 'https://maps.google.com/?q=Kozyatağı+Mah.,+Saniye+Ermutlu+Sk.+No:6,+34742+Kadıköy/İstanbul',
      linkText: 'Haritada Göster'
    },
    {
      icon: <HiPhone className="w-6 h-6 text-primary" />,
      title: 'Telefon',
      description: '+90 (216) 380 57 67',
      link: 'tel:+902163805767',
      linkText: 'Hemen Ara'
    },
    {
      icon: <HiMail className="w-6 h-6 text-primary" />,
      title: 'E-posta',
      description: 'info@arsolutions.com.tr',
      link: 'mailto:info@arsolutions.com.tr',
      linkText: 'Mail Gönder'
    },
    {
      icon: <HiClock className="w-6 h-6 text-primary" />,
      title: 'Çalışma Saatleri',
      description: 'Pazartesi - Cuma: 09:00 - 18:00',
      link: null,
      linkText: null
    }
  ];
  
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
          
          <h2 className="text-3xl font-bold mb-4">Mesajınız Alındı!</h2>
          <p className="text-xl text-gray-600 mb-6">
            İletişim talebiniz için teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              Bize Ulaşın
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              İletişime Geçin
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              H-AR XaPP hakkında sorularınız mı var? Bizimle iletişime geçin, en kısa sürede size dönüş yapacağız.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* İletişim Bilgileri */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">İletişim Bilgilerimiz</h2>
                
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex gap-4"
                    >
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
                    </motion.div>
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
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Bize Mesaj Gönderin</h2>
                    
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="Bize iletmek istediğiniz mesajı yazın"
                        ></textarea>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm text-gray-500 mb-4">
                          Bilgilerinizi göndererek, AR Solutions&apos;ın
                          <Link href="/gizlilik-politikasi" className="text-primary hover:underline"> Gizlilik Politikasını</Link> kabul etmiş olursunuz.
                        </p>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={formState.loading}
                          className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all relative overflow-hidden"
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
                            <span>Mesaj Gönder</span>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Harita */}
          <div 
            ref={mapRef}
            className="mt-16 w-full h-96 bg-gray-100 rounded-2xl overflow-hidden relative shadow-md"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isMapInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="h-full w-full"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6801200038283!2d29.090821375687616!3d40.97741177135699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7ca17f6151d%3A0x5683bb001adaadcc!2zS296eWF0YcSfxLEsIFNhbml5ZSBFcm11dGx1IFNrLiwgMzQ3NDIgS2FkxLFrw7Z5L8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1684243321121!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AR Solutions Konum"
              ></iframe>
            </motion.div>
            
            {/* Map overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 