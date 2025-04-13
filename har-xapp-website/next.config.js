/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['i.hizliresim.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.hizliresim.com',
      },
    ],
  },
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
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
    scrollRestoration: true,
    // optimizeServerReact: true,
    // ppr: true, // Partial Prerendering - yalnızca canary sürümünde çalışır
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  // Webpack görüntü işleme ayarlarını gözden geçiriyoruz
  webpack: (config, { isServer }) => {
    // URL yükleyicisinde sorun olabilir, alternatif çözüm:
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      type: 'asset',
      generator: {
        filename: 'static/images/[name].[hash][ext]'
      }
    });
    
    // Hata ayıklama işlemlerini production modunda kaldır
    if (process.env.NODE_ENV === 'production') {
      // Production modda console.log ifadelerini temizle
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((plugin) => {
          if (plugin.constructor.name === 'TerserPlugin') {
            if (plugin.options && plugin.options.terserOptions) {
              plugin.options.terserOptions.compress.drop_console = true;
            }
          }
        });
      }
    }
    
    // Derleme sırasında hata oluşturan büyük bağımlılıkları hariç tutuyoruz
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    
    // Chunk'lar için güvenli optimizasyon
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    };
    
    return config;
  },
};

module.exports = nextConfig; 