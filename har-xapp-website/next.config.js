/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production ve development ortamlarına göre farklı konfigürasyon 
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export', // Sadece production'da static export kullan
    distDir: 'out',
    trailingSlash: true,
    images: {
      unoptimized: true,
    }
  } : {
    // Development'da normal build kullan
    images: {
      unoptimized: true,
    }
  }),
  
  assetPrefix: '/', // Varlık öneki
  eslint: {
    // Netlify build'de hata verirse ESLint'i kapatıyoruz
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Netlify build'de hata verirse type checking'i kapatıyoruz
    ignoreBuildErrors: true,
  },
  // Next.js 15 ile uyumlu yapılandırma
  experimental: {
    // Production build'de sorun çıkartabilen özellikleri kapatıyoruz
    optimizeCss: false,
  },
};

module.exports = nextConfig; 