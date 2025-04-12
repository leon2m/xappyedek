'use client';

import { useRef, useEffect } from 'react';
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
        { label: "Fiyatlandırma", href: "/iletisim" },
      ]
    },
    {
      title: "Çözümler",
      links: [
        { label: "İnsan Kaynakları", href: "/ozellikler#hr" },
        { label: "Finans & Muhasebe", href: "/ozellikler#finans" },
        { label: "Operasyon Yönetimi", href: "/ozellikler#operasyon" },
        { label: "İdari İşler", href: "/ozellikler#idari" },
        { label: "Kurumsal Akademi", href: "/ozellikler#akademi" },
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
              Artırılmış gerçeklik teknolojilerini iş süreçlerinize entegre ederek 
              operasyonel verimliliğinizi artırın.
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
            <div className="relative flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="bg-slate-100 border border-slate-200 text-slate-800 rounded-l-lg py-3 px-4 w-full md:w-64 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <motion.button 
                className="relative overflow-hidden rounded-r-lg bg-gradient-to-r from-primary to-secondary px-5 py-3 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 0.2,
                    transition: { duration: 0.3 }
                  }}
                />
                <span className="relative z-10">Abone Ol</span>
              </motion.button>
            </div>
            <p className="text-slate-500 text-sm mt-2">
              Gizliliğinize saygı duyuyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
            <div className="mt-5 text-slate-600 text-sm">
              <p className="mb-1"><strong>AR Solutions Teknoloji A.Ş.</strong></p>
              <p className="mb-1">Ataşehir Bulvarı, Ataşehir İş Merkezi</p>
              <p className="mb-1">No: 125/A Kat:5, 34758 Ataşehir/İstanbul</p>
              <p>Tel: +90 (216) 456 78 90</p>
            </div>
          </motion.div>
        </div>
        
        {/* Orta bölüm - Linkler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16 border-b border-slate-200 pb-16">
          {footerLinks.map((group, groupIndex) => (
            <motion.div 
              key={group.title} 
              className="footer-column"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 + (groupIndex * 0.1) 
              }}
            >
              <h3 className="text-slate-800 font-medium mb-5 text-lg">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.2 + (groupIndex * 0.1) + (linkIndex * 0.05) 
                    }}
                  >
                    <Link 
                      href={link.href}
                      className="text-slate-600 hover:text-primary transition-colors relative group flex items-center"
                    >
                      <motion.span 
                        className="absolute left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary bottom-0"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Alt bölüm - Telif ve Sosyal Medya */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p 
            className="text-slate-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            © {new Date().getFullYear()} AR Solutions Teknoloji A.Ş. Tüm hakları saklıdır.
          </motion.p>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary transition-colors"
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1 + (index * 0.1) }}
              >
                <i className={`${social.icon} text-xl`}></i>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer; 