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
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Next.js 15 ile uyumlu yapılandırma
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // optimizeServerReact: true,
    // ppr: true, // Partial Prerendering - yalnızca canary sürümünde çalışır
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  // Bundle analiz araçları
  webpack: (config, { isServer }) => {
    // Görüntü optimizasyonu
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            publicPath: '/_next/static/images/',
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: false,
          },
        },
      ],
    });
    
    // Hata ayıklama işlemlerini production modunda kaldır
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer.forEach((plugin) => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.terserOptions.compress.drop_console = true;
        }
      });
    }
    
    // Performans optimizasyonları
    config.optimization = {
      ...config.optimization,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // null kontrolü eklendi
              if (!module.context) {
                return 'vendor';
              }
              
              // node_modules paketini daha küçük parçalara böl
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (!match || !match[1]) {
                return 'vendor';
              }
              
              const packageName = match[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 1,
            reuseExistingChunk: true,
          },
        },
      },
    };
    
    return config;
  },
  // Export mod ile çalışmayan headers kısmını kaldırıyoruz
  // headers: async () => [
  //   {
  //     source: '/:path*',
  //     headers: [
  //       {
  //         key: 'Cache-Control',
  //         value: 'public, max-age=31536000, immutable',
  //       },
  //     ],
  //   },
  // ],
};

module.exports = nextConfig; 