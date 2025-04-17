'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function generateStaticParams() {
  return [];
}

export default function NotFound() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [countdown, setCountdown] = useState(10);

  // Mouse hareketi için daha optimize edilmiş kod
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMouseX((e.clientX - rect.left) / rect.width);
        setMouseY((e.clientY - rect.top) / rect.height);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Otomatik yönlendirme için geri sayım
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, router]);

  // Optimize edilmiş paralaks efekti
  const parallaxX = (mouseX - 0.5) * 15;
  const parallaxY = (mouseY - 0.5) * 15;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-primary-50 overflow-hidden relative"
    >
      {/* Arka plan dekorasyonu */}
      <div className="absolute inset-0 bg-grid-primary/10 opacity-30" />
      
      {/* Optimize edilmiş gradient arka plan */}
      <div className="absolute left-0 bottom-0 w-[60vw] h-[60vw] bg-gradient-to-r from-primary-300/20 to-primary-100/10 rounded-full blur-3xl -bottom-[30%] -left-[10%]" />
      <div className="absolute right-0 top-0 w-[50vw] h-[50vw] bg-gradient-to-l from-secondary-300/20 to-primary-100/10 rounded-full blur-3xl -top-[20%] -right-[10%]" />

      {/* 404 Ana içerik - Glassmorphism */}
      <div className="relative z-10 w-full max-w-4xl mx-6 md:mx-auto">
        {/* 404 metni */}
        <motion.div
          className="text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-black text-[180px] md:text-[250px] leading-none text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-lg">
            404
          </h1>
        </motion.div>
        
        {/* Glassmorphism kart */}
        <motion.div 
          className="text-center p-8 bg-white/70 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 -mt-20 mx-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            boxShadow: '0 10px 40px rgba(76, 139, 50, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2) inset',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Aradığınız Sayfayı Bulamadık
          </h2>
          
          <p className="mb-8 text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Gezintinize ana sayfamızdan devam edebilirsiniz.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/" className="block w-full sm:w-auto">
              <button className="relative overflow-hidden px-8 py-3 w-full bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md font-medium text-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10">Ana Sayfaya Dön</span>
              </button>
            </Link>
            
            <button 
              onClick={() => router.back()}
              className="px-8 py-3 bg-white text-primary border border-primary rounded-lg font-medium text-lg shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Geri Git
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 overflow-hidden">
            <svg className="w-5 h-5 text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
            </svg>
            
            <p className="text-sm text-slate-500">
              <span className="font-medium">{countdown}</span> saniye içinde ana sayfaya yönlendirileceksiniz
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 