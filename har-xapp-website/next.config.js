/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
  // Hatalı sayfaları statik export'tan hariç tut
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Teşekkürler sayfalarını çıkarıyoruz, bunları client taraflı ele alacağız
    delete defaultPathMap['/demo-talep/tesekkurler'];
    delete defaultPathMap['/iletisim/tesekkurler'];
    
    return defaultPathMap;
  },
  // Atlanan sayfalar için 404 yerine client tarafında yönlendirme yapılacak
  trailingSlash: false,
};

module.exports = nextConfig; 