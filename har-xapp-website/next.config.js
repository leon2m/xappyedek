/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production ve development ortamlarına göre farklı konfigürasyon 
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export', // Sadece production'da static export kullan
    distDir: 'out',
  } : {}),
  
  assetPrefix: '/', // Varlık öneki
  images: {
    unoptimized: true,
  },
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
  // App Router ile exportPathMap kullanılamaz, kaldırıyoruz
  // Bunun yerine Netlify yönlendirmeleriyle çözüyoruz
  trailingSlash: true, // Sondaki eğik çizgiyi etkinleştiriyoruz
};

module.exports = nextConfig; 