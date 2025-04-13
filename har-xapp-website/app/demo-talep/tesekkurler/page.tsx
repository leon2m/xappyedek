'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';

const confettiColors = ['#28a3ff', '#ff3d77', '#46cdcf', '#3f51b5'];

const ThankYouPage = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Confetti effect
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Start confetti
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: confettiColors,
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: confettiColors,
      });
    }, 250);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Use window.location for static export
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
            
            <div className="relative z-10">
              <div className="inline-block mb-8">
                <div className="relative w-32 h-32 mx-auto">
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-primary/10"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Demo Talebiniz İçin Teşekkürler!
              </h1>
              
              <p className="text-xl text-gray-700 mb-6">
                Talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </p>
              
              <div className="max-w-3xl mx-auto mb-8">
                <p className="text-gray-600">
                  Demo talebiniz, ekibimiz tarafından değerlendirilecek ve özel ürün tanıtımınız için gerekli hazırlıklar yapılacaktır. 
                  Bu süreçte herhangi bir sorunuz olursa bizimle iletişime geçebilirsiniz.
                </p>
              </div>
              
              <div className="text-gray-500 mb-8">
                <p>{countdown} saniye içinde ana sayfaya yönlendirileceksiniz.</p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/"
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Ana Sayfaya Dön
                </Link>
                
                <Link
                  href="/ozellikler"
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Özelliklerimizi Keşfedin
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage; 