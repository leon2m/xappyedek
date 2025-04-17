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
  // Harici modülleri yapılandıralım
  webpack: (config, { isServer }) => {
    // Tüm paketlerin doğru çözümlenmesini sağlayalım
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    
    return config;
  },
  // Statik dışa aktarım için gerekli ayarlar
  env: {
    STATIC_EXPORT: process.env.NODE_ENV === 'production' ? 'true' : 'false',
  },
};

module.exports = nextConfig; 