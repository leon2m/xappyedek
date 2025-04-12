'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const confetti = () => {
  // Konfeti oluşturma fonksiyonu
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const context = canvas.getContext('2d');
    if (!context) return { stop: () => {} };
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const particles: {
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngleIncrement: number;
      tiltAngle: number;
    }[] = [];
    
    const colors = [
      '#419639', '#9fcf67', '#2a5c23', '#d6efc7',
      '#ffffff', '#ffffff', '#d6efc7'
    ];
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const createParticle = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      particles.push({
        x,
        y,
        r: size,
        d: Math.random() * 10 + 10, // Density for falling speed
        color,
        tilt: Math.random() * 10 - 10,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    };
    
    // Create initial particles
    for (let i = 0; i < 150; i++) {
      createParticle(
        Math.random() * width,
        Math.random() * height - height
      );
    }
    
    // Animation loop
    let animationFrame: number;
    
    const animate = () => {
      context.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        context.beginPath();
        context.lineWidth = particle.r / 2;
        context.strokeStyle = particle.color;
        context.moveTo(particle.x + particle.tilt + particle.r / 4, particle.y);
        context.lineTo(particle.x + particle.tilt, particle.y + particle.r / 2);
        context.stroke();
        
        // Update position
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.x += Math.sin(particle.tiltAngle) * 2;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
        
        // Remove particles that are out of bounds
        if (particle.y > height) {
          particles.splice(i, 1);
          i--;
          
          // Add a new particle
          createParticle(
            Math.random() * width,
            Math.random() * -50 - 50
          );
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    return {
      stop: () => {
        cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', resizeCanvas);
        document.body.removeChild(canvas);
      }
    };
  }
  
  return { stop: () => {} };
};

const ThankYouPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    // Run confetti effect
    const effect = confetti();
    
    // Auto redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            router.push('/');
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(timer);
      effect.stop();
    };
  }, [router]);
  
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-12"
          >
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 animate-pulse-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center text-primary text-7xl">✓</div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Teşekkürler!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-8"
          >
            Demo talebiniz başarıyla alındı. En kısa sürede ekibimiz sizinle iletişime geçecektir.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <p className="text-gray-500">
              Ekip olarak, H-AR XaPP&apos;ın işletmenize nasıl değer katabileceğini göstermek için sabırsızlanıyoruz.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Ana Sayfaya Dön ({countdown})
            </Link>
            
            <Link
              href="/ozellikler"
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Özellikleri Keşfet
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tl from-primary/10 to-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default ThankYouPage; 