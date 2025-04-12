import React from 'react';
import AppleStyleProductDemo from '@/components/sections/AppleStyleProductDemo';
import { AppleScrollEffect } from '@/components/sections/parallax/AppleScrollEffect';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AR Çözümleri - Apple Tarzı Parallax Demo',
  description: 'AR Çözümleri için Apple AirPods Pro tarzı parallax ve 3D animasyon demo sayfası',
};

// Örnek görsel verileri
const demoImages = [
  {
    src: '/images/demo/ar-feature-1.jpg',
    alt: 'AR Deneyimi 1',
    width: 800,
    height: 600
  },
  {
    src: '/images/demo/ar-feature-2.jpg',
    alt: 'AR Deneyimi 2',
    width: 800,
    height: 600
  },
  {
    src: '/images/demo/ar-feature-3.jpg',
    alt: 'AR Deneyimi 3',
    width: 800,
    height: 600
  },
  {
    src: '/images/demo/ar-feature-1.jpg',
    alt: 'AR Deneyimi 4',
    width: 800,
    height: 600
  },
  {
    src: '/images/demo/ar-feature-2.jpg',
    alt: 'AR Deneyimi 5',
    width: 800,
    height: 600
  },
  {
    src: '/images/demo/ar-feature-3.jpg',
    alt: 'AR Deneyimi 6',
    width: 800,
    height: 600
  }
];

export default function ParallaxDemoPage() {
  return (
    <main className="min-h-screen bg-black">
      <AppleStyleProductDemo />
      
      <AppleScrollEffect 
        title="AR Deneyimleri"
        subtitle="Kullanıcıların deneyimlediği AR dünyasından örnekler"
        images={demoImages}
      />
    </main>
  );
} 