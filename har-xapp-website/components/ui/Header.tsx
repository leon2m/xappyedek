'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// GSAP ScrollTrigger kaydını yap
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Mouse pozisyonu için spring
  const springConfig = { damping: 25, stiffness: 300 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.05], ["blur(0px)", "blur(8px)"]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], ["0%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);
  
  // Logo animations based on scroll
  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  
  // Nav links for main menu
  const navLinks = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Özellikler', href: '/ozellikler' },
    { label: 'Demo Talep', href: '/demo-talep' },
  ];
  
  // Hover effect for links
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  // Paralax effect based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const targetX = clientX / window.innerWidth;
      const targetY = clientY / window.innerHeight;
      mouseX.set(targetX);
      mouseY.set(targetY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Setup GSAP animations and scroll detection
  useEffect(() => {
    const header = headerRef.current;
    
    // Scroll detection için
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // GSAP animations
    if (header && logoRef.current) {
      // Logo parallax
      gsap.to(logoRef.current, {
        y: 20,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });
      
      // Nav items parallax with different speeds
      const navItems = header.querySelectorAll('.nav-item');
      navItems.forEach((item, index) => {
        gsap.to(item, {
          y: 10 + (index * 2),
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        });
      });
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // İlk yükleme için kontrol et
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Dinamik Header Stili
  const headerStyle = {
    backgroundColor: scrolled 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: scrolled ? 'blur(12px)' : 'blur(8px)',
    boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.1)' : 'none',
  };
  
  // Logo ve Menü için 3D parallax efekti
  const logoX = useTransform(mouseX, [0, 1], [-5, 5]);
  const logoY = useTransform(mouseY, [0, 1], [-5, 5]);
  const menuX = useTransform(mouseX, [0, 1], [3, -3]);
  const menuY = useTransform(mouseY, [0, 1], [3, -3]);
  
  return (
    <motion.header 
      ref={headerRef}
      style={{ 
        ...headerStyle,
        y: headerY,
        opacity: headerOpacity,
        scale: scale,
        filter: headerBlur
      }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-gray-100"
    >
      <div className="container-custom mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="/"
            ref={logoRef}
            className="relative flex items-center text-xl font-bold text-gray-800 z-10"
            style={{ 
              scale: logoScale,
              x: logoX, 
              y: logoY,
              transformStyle: "preserve-3d" 
            }}
          >
            <motion.div 
              className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100"
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <motion.span 
              className="mr-1 text-primary font-black text-2xl"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                color: "#9fcf67" 
              }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              H-AR
            </motion.span>
            
            <motion.span
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              XaPP
            </motion.span>
          </motion.a>
          
          {/* Masaüstü Menü */}
          <motion.nav 
            className="hidden md:flex items-center space-x-1"
            ref={menuRef}
            style={{ 
              x: menuX, 
              y: menuY,
              transformStyle: "preserve-3d" 
            }}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredLink === link.href;
              
              return (
                <motion.div 
                  key={link.href}
                  className="nav-item relative px-1"
                  onHoverStart={() => setHoveredLink(link.href)}
                  onHoverEnd={() => setHoveredLink(null)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Hover/Active gösterge */}
                  <AnimatePresence>
                    {(isHovered || isActive) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg -z-10"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        layoutId="navBackground"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <Link 
                    href={link.href}
                    className={`px-4 py-2 rounded-lg block font-medium transition-colors duration-200 whitespace-nowrap ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {link.label}
                    
                    {isActive && (
                      <motion.div 
                        className="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-full mt-1"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
          
          {/* Mobil Hamburger Menü Butonu */}
          <motion.button
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-6 h-5">
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-6 bg-gray-700 rounded-full origin-left"
                animate={isOpen ? { rotate: 45, y: -1, width: '120%' } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-2 h-0.5 w-6 bg-gray-700 rounded-full origin-left"
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-4 h-0.5 w-6 bg-gray-700 rounded-full origin-left"
                animate={isOpen ? { rotate: -45, y: 1, width: '120%' } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.button>
        </div>
      </div>
      
      {/* Mobil Menü (Tam Ekran) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.nav className="flex flex-col items-center space-y-6 py-20">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-medium ${isActive ? 'text-primary' : 'text-slate-800'}`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div 
                          className="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-full mt-1"
                          layoutId="mobileActiveIndicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
            
            {/* Dekoratif Elemanlar */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
                animate={{ 
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 