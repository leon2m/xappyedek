'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// GSAP ScrollTrigger kaydını yap
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // State for subscription form
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<null | 'success' | 'error'>(null);
  
  // Mouse hareketi için
  const springConfig = { damping: 25, stiffness: 200 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  
  // Scroll animasyonu değerleri
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0.7, 1], ["5%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [0.5, 1]);
  
  // Alttan gelme animasyonu için
  useEffect(() => {
    const footer = footerRef.current;
    
    if (footer) {
      // Logo parallax
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          }
        });
      }
      
      // Footer içindeki sütunların farklı hızlarda animasyonu
      const columns = footer.querySelectorAll('.footer-column');
      columns.forEach((column, index) => {
        gsap.from(column, {
          y: 50 + (index * 10),
          opacity: 0,
          scrollTrigger: {
            trigger: footer,
            start: "top bottom-=100",
            end: "top center",
            scrub: true,
          }
        });
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Mouse takibi için
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Normalize mouse position (0 to 1)
      const targetX = clientX / window.innerWidth; 
      const targetY = clientY / window.innerHeight;
      
      mouseX.set(targetX);
      mouseY.set(targetY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Logo için parallax değerleri
  const logoX = useTransform(mouseX, [0, 1], [-10, 10]);
  const logoY = useTransform(mouseY, [0, 1], [-10, 10]);
  
  // Footer linklerini gruplanmış şekilde tanımla
  const footerLinks = [
    {
      title: "Ürünler",
      links: [
        { label: "H-AR XaPP Nedir?", href: "/hakkimizda" },
        { label: "Özellikler", href: "/ozellikler" },
        { label: "Modüller", href: "/ozellikler#modules" },
        { label: "Entegrasyonlar", href: "/ozellikler#integrations" },
        { label: "Fiyatlandırma", href: "/fiyatlandirma" },
      ]
    },
    {
      title: "Çözümler",
      links: [
        { label: "İnsan Kaynakları", href: "/cozumler/insan-kaynaklari" },
        { label: "Finans & Muhasebe", href: "/cozumler/finans-muhasebe" },
        { label: "Operasyon Yönetimi", href: "/cozumler/operasyon-yonetimi" },
        { label: "İdari İşler", href: "/cozumler/idari-isler" },
        { label: "Kurumsal Akademi", href: "/cozumler/kurumsal-akademi" },
      ]
    },
    {
      title: "Şirketimiz",
      links: [
        { label: "AR Solutions Hakkında", href: "/hakkimizda" },
        { label: "Vizyonumuz", href: "/hakkimizda#vizyon" },
        { label: "Ekibimiz", href: "/hakkimizda#ekip" },
        { label: "Kariyer", href: "/kariyer" },
        { label: "İş Ortaklarımız", href: "/hakkimizda#partnerler" },
      ]
    },
    {
      title: "İletişim",
      links: [
        { label: "Demo Talep", href: "/demo-talep" },
        { label: "Destek Merkezi", href: "/destek" },
        { label: "Sık Sorulan Sorular", href: "/sss" },
        { label: "İletişim Bilgileri", href: "/iletisim" },
        { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
      ]
    }
  ];
  
  // Sosyal medya linkleri
  const socialLinks = [
    { icon: "ri-linkedin-fill", href: "https://www.linkedin.com/company/ar-solutions-tr/", label: "LinkedIn" },
    { icon: "ri-twitter-x-fill", href: "https://twitter.com/ARSolutionsTR", label: "Twitter" },
    { icon: "ri-instagram-fill", href: "https://instagram.com/arsolutions.tr", label: "Instagram" },
    { icon: "ri-youtube-fill", href: "https://youtube.com/@ARSolutionsTR", label: "YouTube" },
    { icon: "ri-facebook-fill", href: "https://facebook.com/ARSolutionsTR", label: "Facebook" },
  ];
  
  return (
    <motion.footer 
      ref={footerRef} 
      className="relative bg-white overflow-hidden"
      style={{ opacity, y: parallaxY }}
    >
      {/* Background dekoratif elementleri */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-60 left-1/2 w-72 h-72 bg-primary-300/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-grid-slate-100 pointer-events-none opacity-30" />
      </div>
      
      <div className="relative container-custom mx-auto pt-20 pb-12 px-4 md:px-6">
        {/* Üst bölüm - Logo ve Abonelik */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          {/* Logo */}
          <motion.div 
            ref={logoRef}
            className="relative group"
            style={{ 
              x: logoX, 
              y: logoY,
              transformStyle: "preserve-3d" 
            }}
          >
            <motion.div 
              className="flex items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="mr-1 text-primary font-black text-4xl"
                whileHover={{ 
                  rotate: 5,
                  color: "#95C01E" 
                }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                H-AR
              </motion.span>
              
              <motion.span
                className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl font-bold"
              >
                XaPP
              </motion.span>
            </motion.div>
            
            <motion.div 
              className="absolute -inset-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
              animate={{ 
                scale: [0.8, 1.1, 0.8],
                opacity: [0, 0.3, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <p className="mt-4 text-slate-600 max-w-md">
              Çalışan deneyimi için tasarlanmış süper uygulama. Sadelikten ilham alıyor, 
              karmaşıklığı ortadan kaldırıyor.
            </p>
          </motion.div>
          
          {/* Abonelik Formu */}
          <motion.div 
            className="w-full md:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-slate-800 font-medium mb-3 text-lg">Gelişmelerden Haberdar Olun</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              
              setIsSubscribing(true);
              
              // Simüle edilmiş bir API çağrısı - gerçek uygulamada API'ye istek gönderilecek
              setTimeout(() => {
                setIsSubscribing(false);
                setSubscribeStatus('success');
                setEmail('');
                
                // 3 saniye sonra başarı mesajını kaldır
                setTimeout(() => {
                  setSubscribeStatus(null);
                }, 3000);
              }, 1000);
            }} className="relative flex w-full md:w-auto">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz" 
                className="bg-slate-100 border border-slate-200 text-slate-800 rounded-l-lg py-3 px-4 w-full md:w-64 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
              <motion.button 
                className={`relative overflow-hidden rounded-r-lg px-5 py-3 text-white ${isSubscribing ? 'bg-gray-400' : 'bg-gradient-to-r from-primary to-secondary'}`}
                whileHover={!isSubscribing ? { scale: 1.05 } : {}}
                whileTap={!isSubscribing ? { scale: 0.98 } : {}}
                disabled={isSubscribing}
                type="submit"
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 0.2,
                    transition: { duration: 0.3 }
                  }}
                />
                <span className="relative z-10">
                  {isSubscribing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Bekleyin...
                    </span>
                  ) : (
                    'Abone Ol'
                  )}
                </span>
              </motion.button>
            </form>
            
            {subscribeStatus === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-sm mt-2 font-medium"
              >
                Başarıyla abone oldunuz! Teşekkürler.
              </motion.p>
            )}
            
            {subscribeStatus === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-2 font-medium"
              >
                Bir hata oluştu. Lütfen tekrar deneyin.
              </motion.p>
            )}
            
            {!subscribeStatus && (
              <p className="text-slate-500 text-sm mt-2">
                Gizliliğinize saygı duyuyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
              </p>
            )}
            
            <div className="mt-5 text-slate-600 text-sm">
              <p className="mb-1"><strong>AR Solutions Teknoloji A.Ş.</strong></p>
              <p className="mb-1">Ataşehir Bulvarı, Ataşehir İş Merkezi</p>
              <p className="mb-1">No: 125/A Kat:5, 34758 Ataşehir/İstanbul</p>
              <p>Tel: +90 (216) 456 78 90</p>
            </div>
          </motion.div>
        </div>
        
        {/* Ana Footer Linkleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {footerLinks.map((group, index) => (
            <motion.div 
              key={group.title}
              className="footer-column"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-slate-600 hover:text-primary transition-colors duration-200 hover:underline text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Alt Footer - Telif Hakkı */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} AR Solutions. Tüm hakları saklıdır.
              </p>
            </div>
            
            {/* Sosyal Medya */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-slate-400 hover:text-primary transition-colors duration-200"
                >
                  <i className={link.icon + " text-xl"}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* İletişim Bilgileri */}

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 