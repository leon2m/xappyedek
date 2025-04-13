'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { HiOutlineArrowNarrowRight, HiOutlineChevronDown, HiOutlineStar } from 'react-icons/hi';

// GSAP kaydını yap
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ParallaxLayer = ({ depth, children }: { depth: number, children: React.ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (e.clientX - innerWidth / 2) / innerWidth,
        y: (e.clientY - innerHeight / 2) / innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div 
      className="absolute inset-0 w-full h-full preserve-3d"
      style={{ 
        transform: `translate3d(${mousePosition.x * depth * 100}px, ${mousePosition.y * depth * 100}px, 0)`,
        transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {children}
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Kaydırma değerini izle
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // GSAP ile animasyonları oluştur
  useEffect(() => {
    const section = sectionRef.current;
    
    if (section) {
      // Apple tarzı parallax için ileri fırlatma efekti - değerleri güncelliyorum
      gsap.to(".hero-content", {
        y: 200, // Daha az ileri fırlatma
        scale: 0.9, // Daha hafif küçültme
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "50% top", // Daha kısa mesafe
          scrub: 1, // Daha yumuşak efekt için
        },
      });
      
      // Apple tarzı blur efekti - değerleri güncelliyorum
      gsap.to(".parallax-blur", {
        filter: "blur(10px)", // Daha az blur
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "25% top", // Daha kısa mesafe
          scrub: 1, // Daha yumuşak efekt 
        },
      });
      
      // Arka plan öğelerinin kayboluşu - değerleri güncelliyorum
      gsap.to(".bg-elements", {
        y: -100, // Daha az hareket
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "25% top", // Daha kısa mesafe
          scrub: 1, // Daha yumuşak efekt
        },
      });
      
      // Arka plan ek animasyonları - değerleri güncelliyorum
      gsap.to(".hero-bg-gradient", {
        opacity: 0.5,
        scale: 1.05, // Daha az scale efekti
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "50% top", // Daha kısa mesafe
          scrub: 1, // Daha yumuşak efekt
        },
      });

      // Mobil cihazlarda ScrollTrigger'ı güncelle
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      resizeObserver.observe(section);

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Gelişmiş 3D efekt için trackpad benzeri koordinat hesaplama
  const springConfig = { damping: 25, stiffness: 100 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        const { clientX, clientY } = e;
        const { width, height, left, top } = rect;
        
        // Konum üzerinden normalizasyon
        const xValue = (clientX - left) / width - 0.5;
        const yValue = (clientY - top) / height - 0.5;
        
        // Değerleri güncelle
        x.set(xValue * 30);  // x-ekseni hareketi
        y.set(yValue * 30);  // y-ekseni hareketi
        rotateX.set(yValue * -10);  // x-ekseni rotasyonu (ters)
        rotateY.set(xValue * 10);   // y-ekseni rotasyonu
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, rotateX, rotateY]);
  
  // Kaydırma başladığında küçültme efekti
  useEffect(() => {
    if (scrollY > 0) {
      scale.set(Math.max(0.9, 1 - scrollY / 1000));
    } else {
      scale.set(1);
    }
  }, [scrollY, scale]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] w-full overflow-hidden bg-white" // Hero yüksekliğini azalttım
    >
      {/* Ana arka plan gradyenı */}
      <motion.div 
        className="hero-bg-gradient absolute inset-0 bg-gradient-light opacity-90"
        animate={{ 
          background: [
            "linear-gradient(to bottom, rgb(255, 255, 255), rgb(250, 250, 253))",
            "linear-gradient(to bottom, rgb(248, 250, 252), rgb(241, 245, 249))",
            "linear-gradient(to bottom, rgb(255, 255, 255), rgb(250, 250, 253))"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Işıltılı arka plan grid */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-20"></div>
      
      {/* Arka plan öğeleri */}
      <div className="bg-elements absolute inset-0 overflow-hidden">
        {/* Derinlik 1 - En arka katman */}
        <ParallaxLayer depth={0.05}>
          <div className="absolute top-[10%] right-[20%] w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full bg-secondary/5 blur-3xl"></div>
        </ParallaxLayer>
        
        {/* Derinlik 2 - Orta katman */}
        <ParallaxLayer depth={0.1}>
          <div className="absolute top-[35%] left-[15%] w-64 h-64 rounded-full bg-primary/10 blur-2xl"></div>
          <div className="absolute top-[50%] right-[5%] w-80 h-80 rounded-full bg-secondary/10 blur-2xl"></div>
          
          {/* Animasyonlu daireler */}
          <motion.div
            className="absolute top-[20%] left-[40%] w-40 h-40 rounded-full border border-primary/20"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          <motion.div
            className="absolute bottom-[30%] right-[30%] w-60 h-60 rounded-full border border-secondary/20"
            animate={{ 
              rotate: -360,
              scale: [1.1, 0.9, 1.1]
            }}
            transition={{ 
              rotate: { duration: 40, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </ParallaxLayer>
        
        {/* Derinlik 3 - Ön katman */}
        <ParallaxLayer depth={0.2}>
          <div className="absolute top-[25%] right-[30%] w-32 h-32 rounded-full bg-primary/15 blur-xl"></div>
          <div className="absolute bottom-[40%] left-[25%] w-40 h-40 rounded-full bg-secondary/15 blur-xl"></div>
          
          {/* Işık noktalama efektleri */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.3)"
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </ParallaxLayer>
      </div>
      
      {/* Ana içerik - Apple tarzı ortalanmış yapı */}
      <div 
        className="hero-content relative w-full flex flex-col items-center justify-center min-h-screen pt-24 pb-64 parallax-blur"
        ref={heroContentRef}
      >
        <motion.div
          className="relative z-10 max-w-screen-lg mx-auto text-center px-4 perspective-3d"
          style={{
            x,
            y,
            rotateX,
            rotateY,
            scale,
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block"
              >
                <span className="inline-flex items-center rounded-full bg-white/25 backdrop-blur-md px-6 py-2 text-base font-medium text-primary border border-primary/20 shadow-lg shadow-primary/10">
                  <span className="mr-2 bg-primary rounded-full p-1 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 text-white"
                    >
                      <HiOutlineStar className="w-3 h-3" />
                    </motion.div>
                  </span>
                  Geleceğin İş Platformu
                </span>
              </motion.div>

              {/* Başlık */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl md:text-6xl"
              >
                <span className="block">Çalışan Deneyimi</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Yapay Zeka İle Yeniden Tanımlanıyor
                </span>
              </motion.h1>

              {/* Açıklama */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mx-auto mt-6 max-w-2xl text-lg text-slate-700"
              >
                H-AR XaPP, şirketinizin tüm departmanlarını tek bir süper uygulamada birleştiren, yapay zeka destekli, kullanıcı dostu ve entegre çözüm sunar.
              </motion.p>
            </div>
          </div>
          
          {/* Butonlar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
            style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
          >
            <Link href="/demo-talep" className="group relative overflow-hidden inline-block btn-gradient">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-70 blur-lg group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative z-10 px-10 py-4 rounded-lg flex items-center">
                <span className="text-white font-medium text-lg mr-2">Demo Talep Et</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HiOutlineArrowNarrowRight className="text-white text-xl" />
                </motion.div>
              </div>
            </Link>
            
            <Link href="/ozellikler" className="group relative overflow-hidden btn-outline">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-30 blur-lg group-hover:opacity-60 transition-all duration-500"></div>
            <span className="relative z-10 px-10 py-4 rounded-lg inline-block text-gr font-medium text-lg backdrop-blur-sm">
              
                Özellikleri Keşfet
              </span>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* 3D Uygulama Görseli */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-[55%] left-1/2 transform -translate-x-1/2 w-full max-w-4xl perspective-3d"
          style={{
            transform: "rotateX(20deg) scale(0.8)",
            transformOrigin: "center bottom",
          }}
        >
          <motion.div
            className="w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-white/10 preserve-3d"
            style={{
              rotateX,
              rotateY,
              transform: "translateZ(100px)",
            }}
          >
            {/* Ekran mockup */}
            <div className="w-full h-full bg-gradient-to-b from-white to-primary-50 p-1">
              {/* Üst bar */}
              <div className="h-8 bg-primary-100 rounded-t-lg flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary-300"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary-300"></div>
                  <div className="w-3 h-3 rounded-full bg-green-300"></div>
                </div>
              </div>
              
              {/* App ekranı */}
              <div className="bg-gradient-to-br from-white to-primary-50 p-6 h-[calc(100%-2rem)] rounded-b-lg flex flex-col glass-card">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    H-AR
                  </div>
                  <div className="ml-4">
                    <div className="h-4 w-32 bg-primary-200 rounded-full"></div>
                    <div className="h-3 w-24 bg-primary-100 rounded-full mt-2"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="bg-white/80 border border-primary-100 p-4 rounded-lg hover:border-primary/30 transition-colors duration-300 shadow-sm"
                    >
                      <div className="h-3 w-12 bg-gradient-to-r from-primary to-secondary rounded-full mb-3 opacity-60"></div>
                      <div className="h-6 w-full bg-primary-100 rounded-md"></div>
                      <div className="h-4 w-1/2 bg-primary-50 rounded-md mt-2"></div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex-1 bg-white/50 rounded-lg overflow-hidden relative border border-primary-100">
                  <div className="absolute inset-4 grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${20 + Math.random() * 80}%` }}
                        transition={{ delay: 1.5 + i * 0.1, duration: 1 }}
                        className="bg-gradient-to-t from-primary/70 to-secondary/70 rounded-sm self-end"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Alt ekranlar */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-4/5 flex justify-center gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 1.2 + i * 0.2 }}
                className="w-1/3 aspect-[16/9] bg-gradient-to-b from-white to-primary-50 rounded-lg border border-primary-100/50 p-2 shadow-lg"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(5deg) translateZ(${(i - 1) * -40}px)`,
                }}
              >
                <div className="h-full bg-primary-50/50 rounded border border-primary-100/30"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Kaydırma animasyonu için kaydırıcı işareti */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="mb-2 text-sm text-gray-400">Aşağı Kaydır</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
        >
          <motion.div className="text-primary">
            <HiOutlineChevronDown />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 