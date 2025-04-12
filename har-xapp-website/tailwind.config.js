/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Dark mode tamamen devre dışı
  darkMode: false,
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#4C8B32',
          '50': '#E8F1E2',
          '100': '#D6EFC7',
          '200': '#B2DEAF',
          '300': '#95C01E',
          '400': '#7BAA4A',
          '500': '#4C8B32',
          '600': '#3F7A2A',
          '700': '#346922',
          '800': '#2a5c23',
          '900': '#1F3E1A',
        },
        'secondary': {
          DEFAULT: '#95C01E',
          '50': '#F6FAE9',
          '100': '#EDF5D2',
          '200': '#DBEBA6',
          '300': '#C9E07A',
          '400': '#AAD03D',
          '500': '#95C01E',
          '600': '#7EA618',
          '700': '#678C12',
          '800': '#50720C',
          '900': '#394E09',
        },
        'slate': {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
          '950': '#020617',
        },
        'dark-green': '#2a5c23',
        'light-green': '#d6efc7',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-in-out forwards',
        'slide-down': 'slideDown 0.5s ease-in-out forwards',
        'slide-left': 'slideLeft 0.5s ease-in-out forwards',
        'slide-right': 'slideRight 0.5s ease-in-out forwards',
        'scale-in': 'scaleIn 0.5s ease-in-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 10s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'angle': 'angle 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'parallax-scroll': 'parallaxScroll 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'smooth-scroll': 'smoothScroll 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'smooth-parallax': 'smoothParallax 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'smooth-reveal': 'smoothReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      // 3D transformasyon özellikleri - Apple tarzı
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
        '3000': '3000px',
        '3d': '1200px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      translate: {
        'z-0': '0px',
        'z-10': '10px',
        'z-20': '20px',
        'z-30': '30px',
        'z-40': '40px',
        'z-50': '50px',
        'z-100': '100px',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-apple': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, var(--primary-500), var(--secondary-500))',
        'gradient-primary-to-bottom': 'linear-gradient(to bottom, var(--primary-500), var(--secondary-500))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'angle': {
          '0%': { '--shimmer-angle': '0deg' },
          '100%': { '--shimmer-angle': '360deg' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'parallaxScroll': {
          '0%': { transform: 'translateY(60px)', opacity: 0.2 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'smoothScroll': {
          '0%': { transform: 'translateY(5px)', opacity: 0.8 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'smoothParallax': {
          '0%': { transform: 'translateY(30px)', opacity: 0.3 },
          '50%': { transform: 'translateY(15px)', opacity: 0.6 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'smoothReveal': {
          '0%': { transform: 'translateY(20px) scale(0.98)', opacity: 0 },
          '60%': { transform: 'translateY(10px) scale(0.99)', opacity: 0.6 },
          '100%': { transform: 'translateY(0) scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} 