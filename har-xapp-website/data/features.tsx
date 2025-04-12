import { BiRefresh, BiSolidMagicWand, BiSolidBot, BiSolidLayer, BiSolidCube, BiSolidWrench } from 'react-icons/bi';
import { 
  HiOutlinePuzzle,
  HiOutlineLightningBolt, 
  HiOutlineChip, 
  HiOutlineCube, 
  HiOutlineTemplate, 
  HiOutlineAdjustments,
  HiOutlineDocumentReport,
  HiOutlineChartSquareBar,
  HiOutlineUserGroup,
  HiOutlineShieldCheck
} from 'react-icons/hi';

// Feature tipi tanımı
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
  image?: string;
  slug?: string;
  svg?: React.ReactNode;
}

// Örnek resim URL'leri
const imageBasePath = '/images/features';

// SVG içerikleri - görseller yerine kullanılacak vektör çizimler
const integrationSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="200" y="150" width="400" height="300" rx="20" fill="white" fillOpacity="0.9" />
      
      {/* Database ve API temsili */}
      <rect x="250" y="200" width="120" height="80" rx="10" fill="url(#paint1_linear)" />
      <rect x="430" y="200" width="120" height="80" rx="10" fill="url(#paint2_linear)" />
      
      {/* Entegrasyon Bağlantıları */}
      <path d="M370 240L430 240" stroke="#0369a1" strokeWidth="4" />
      <circle cx="400" cy="240" r="15" fill="#ffffff" stroke="#0369a1" strokeWidth="2" />
      <path d="M395 240L405 240M400 235L400 245" stroke="#0369a1" strokeWidth="2" />
      
      {/* Entegrasyon Sembolü */}
      <rect x="330" y="320" width="140" height="60" rx="10" fill="url(#paint3_linear)" fillOpacity="0.9" />
      <path d="M350 350H450" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <path d="M380 330L380 370" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <path d="M420 330L420 370" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      
      {/* Veri akışı gösterimi */}
      <path d="M310 280L350 320" stroke="#0369a1" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M490 280L450 320" stroke="#0369a1" strokeWidth="2" strokeDasharray="4 4" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="250" y1="200" x2="370" y2="280" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="430" y1="200" x2="550" y2="280" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="330" y1="320" x2="470" y2="380" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="140" y="90" width="520" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const uxSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="600" rx="20" fill="url(#paint0_linear)" />
    <g filter="url(#filter0_d)">
      <rect x="200" y="150" width="400" height="300" rx="20" fill="white" fillOpacity="0.9" />
      <circle cx="400" cy="300" r="80" fill="url(#paint1_linear)" fillOpacity="0.7" />
      <path d="M320 260H480" stroke="#0369a1" strokeWidth="5" strokeLinecap="round" />
      <path d="M320 300H480" stroke="#0369a1" strokeWidth="5" strokeLinecap="round" />
      <path d="M320 340H480" stroke="#0369a1" strokeWidth="5" strokeLinecap="round" />
      <circle cx="270" cy="200" r="20" fill="url(#paint2_linear)" />
      <circle cx="530" cy="200" r="20" fill="url(#paint3_linear)" />
      <circle cx="270" cy="400" r="20" fill="url(#paint4_linear)" />
      <circle cx="530" cy="400" r="20" fill="url(#paint5_linear)" />
    </g>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f0f9ff" />
        <stop offset="1" stopColor="#e0f2fe" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="320" y1="220" x2="480" y2="380" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369a1" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="250" y1="180" x2="290" y2="220" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369a1" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="510" y1="180" x2="550" y2="220" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369a1" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="250" y1="380" x2="290" y2="420" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369a1" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="paint5_linear" x1="510" y1="380" x2="550" y2="420" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369a1" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <filter id="filter0_d" x="140" y="90" width="520" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const aiSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="200" y="150" width="400" height="300" rx="20" fill="white" fillOpacity="0.9" />
      
      {/* Beyin yapısı */}
      <path d="M350 200C320 220 300 270 330 320C360 370 440 370 470 320C500 270 480 220 450 200C420 180 380 180 350 200Z" 
        fill="url(#paint1_linear)" fillOpacity="0.8" />
      
      {/* Nöron bağlantıları */}
      <circle cx="350" cy="240" r="10" fill="#ffffff" />
      <circle cx="380" cy="210" r="10" fill="#ffffff" />
      <circle cx="420" cy="210" r="10" fill="#ffffff" />
      <circle cx="450" cy="240" r="10" fill="#ffffff" />
      <circle cx="350" cy="280" r="10" fill="#ffffff" />
      <circle cx="400" cy="300" r="10" fill="#ffffff" />
      <circle cx="450" cy="280" r="10" fill="#ffffff" />
      
      <path d="M350 240L380 210" stroke="#ffffff" strokeWidth="2" />
      <path d="M380 210L420 210" stroke="#ffffff" strokeWidth="2" />
      <path d="M420 210L450 240" stroke="#ffffff" strokeWidth="2" />
      <path d="M350 240L350 280" stroke="#ffffff" strokeWidth="2" />
      <path d="M450 240L450 280" stroke="#ffffff" strokeWidth="2" />
      <path d="M350 280L400 300" stroke="#ffffff" strokeWidth="2" />
      <path d="M450 280L400 300" stroke="#ffffff" strokeWidth="2" />
      
      {/* Veri Akış Sembolleri */}
      <rect x="280" y="360" width="240" height="40" rx="10" fill="url(#paint2_linear)" />
      <path d="M300 380L340 380" stroke="#ffffff" strokeWidth="3" />
      <path d="M360 380L400 380" stroke="#ffffff" strokeWidth="3" />
      <path d="M420 380L460 380" stroke="#ffffff" strokeWidth="3" />
      <path d="M480 380L500 380" stroke="#ffffff" strokeWidth="3" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="300" y1="180" x2="500" y2="350" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="280" y1="360" x2="520" y2="400" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="140" y="90" width="520" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const pluginSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="200" y="150" width="400" height="300" rx="20" fill="white" fillOpacity="0.9" />
      
      {/* Ana platform temsilcisi */}
      <rect x="300" y="220" width="200" height="100" rx="10" fill="url(#paint1_linear)" />
      <rect x="320" y="240" width="160" height="60" rx="5" fill="#ffffff" fillOpacity="0.7" />
      
      {/* Eklentiler */}
      <rect x="240" y="200" width="40" height="40" rx="5" fill="url(#paint2_linear)" />
      <path d="M260 210L260 230M250 220L270 220" stroke="#ffffff" strokeWidth="2" />
      
      <rect x="520" y="200" width="40" height="40" rx="5" fill="url(#paint3_linear)" />
      <path d="M540 210L540 230M530 220L550 220" stroke="#ffffff" strokeWidth="2" />
      
      <rect x="240" y="300" width="40" height="40" rx="5" fill="url(#paint4_linear)" />
      <path d="M260 310L260 330M250 320L270 320" stroke="#ffffff" strokeWidth="2" />
      
      <rect x="520" y="300" width="40" height="40" rx="5" fill="url(#paint5_linear)" />
      <path d="M540 310L540 330M530 320L550 320" stroke="#ffffff" strokeWidth="2" />
      
      {/* Bağlantı çizgileri */}
      <path d="M280 220L300 240" stroke="#4C8B32" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M280 320L300 300" stroke="#4C8B32" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M520 240L500 220" stroke="#4C8B32" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M520 300L500 320" stroke="#4C8B32" strokeWidth="2" strokeDasharray="3 3" />
      
      {/* Alt açıklama */}
      <rect x="320" y="350" width="160" height="50" rx="5" fill="url(#paint6_linear)" fillOpacity="0.7" />
      <path d="M350 375L450 375" stroke="#ffffff" strokeWidth="2" />
      <path d="M350 365L420 365" stroke="#ffffff" strokeWidth="2" />
      <path d="M350 385L400 385" stroke="#ffffff" strokeWidth="2" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="300" y1="220" x2="500" y2="320" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="240" y1="200" x2="280" y2="240" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="520" y1="200" x2="560" y2="240" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="240" y1="300" x2="280" y2="340" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint5_linear" x1="520" y1="300" x2="560" y2="340" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint6_linear" x1="320" y1="350" x2="480" y2="400" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="140" y="90" width="520" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const modularSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="200" y="150" width="400" height="300" rx="20" fill="white" fillOpacity="0.9" />
      
      {/* Modüler Yapı Temsili */}
      <rect x="280" y="200" width="80" height="80" rx="10" fill="url(#paint1_linear)" />
      <rect x="380" y="200" width="80" height="80" rx="10" fill="url(#paint2_linear)" />
      <rect x="280" y="300" width="80" height="80" rx="10" fill="url(#paint3_linear)" />
      <rect x="380" y="300" width="80" height="80" rx="10" fill="url(#paint4_linear)" />
      
      {/* Modül İçi Detaylar */}
      <rect x="295" y="215" width="50" height="10" rx="2" fill="#ffffff" />
      <rect x="295" y="235" width="30" height="10" rx="2" fill="#ffffff" />
      <rect x="295" y="255" width="40" height="10" rx="2" fill="#ffffff" />
      
      <rect x="395" y="215" width="50" height="10" rx="2" fill="#ffffff" />
      <rect x="395" y="235" width="30" height="10" rx="2" fill="#ffffff" />
      <rect x="395" y="255" width="40" height="10" rx="2" fill="#ffffff" />
      
      <rect x="295" y="315" width="50" height="10" rx="2" fill="#ffffff" />
      <rect x="295" y="335" width="30" height="10" rx="2" fill="#ffffff" />
      <rect x="295" y="355" width="40" height="10" rx="2" fill="#ffffff" />
      
      <rect x="395" y="315" width="50" height="10" rx="2" fill="#ffffff" />
      <rect x="395" y="335" width="30" height="10" rx="2" fill="#ffffff" />
      <rect x="395" y="355" width="40" height="10" rx="2" fill="#ffffff" />
      
      {/* Bağlantı Çizgileri */}
      <path d="M360 240L380 240" stroke="#4C8B32" strokeWidth="2" />
      <path d="M360 340L380 340" stroke="#4C8B32" strokeWidth="2" />
      <path d="M320 280L320 300" stroke="#4C8B32" strokeWidth="2" />
      <path d="M420 280L420 300" stroke="#4C8B32" strokeWidth="2" />
      
      {/* İsteğe bağlı ekstra modül */}
      <rect x="480" y="250" width="70" height="70" rx="10" stroke="#4C8B32" strokeWidth="2" strokeDasharray="5 5" fill="none" />
      <path d="M460 270L480 270" stroke="#4C8B32" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M460 295L480 295" stroke="#4C8B32" strokeWidth="2" strokeDasharray="5 5" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="280" y1="200" x2="360" y2="280" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="380" y1="200" x2="460" y2="280" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="280" y1="300" x2="360" y2="380" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="380" y1="300" x2="460" y2="380" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="140" y="90" width="520" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const customizableSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="250" y="150" width="300" height="300" rx="20" fill="white" fillOpacity="0.9" />
      <circle cx="400" cy="230" r="40" fill="url(#paint1_linear)" />
      <rect x="300" y="300" width="200" height="15" rx="7.5" fill="#E2E8F0" />
      <rect x="300" y="300" width="150" height="15" rx="7.5" fill="url(#paint2_linear)" />
      <rect x="300" y="340" width="200" height="15" rx="7.5" fill="#E2E8F0" />
      <rect x="300" y="340" width="100" height="15" rx="7.5" fill="url(#paint3_linear)" />
      <rect x="300" y="380" width="200" height="15" rx="7.5" fill="#E2E8F0" />
      <rect x="300" y="380" width="170" height="15" rx="7.5" fill="url(#paint4_linear)" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="360" y1="190" x2="440" y2="270" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="300" y1="307.5" x2="450" y2="307.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="300" y1="347.5" x2="400" y2="347.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="300" y1="387.5" x2="470" y2="387.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="190" y="90" width="420" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

// Yeni SVG bileşenleri
const reportingSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="250" y="150" width="300" height="300" rx="20" fill="white" fillOpacity="0.9" />
      <rect x="280" y="190" width="240" height="30" rx="5" fill="url(#paint1_linear)" fillOpacity="0.7" />
      <rect x="280" y="190" width="160" height="30" rx="5" fill="url(#paint2_linear)" />
      <rect x="280" y="240" width="240" height="140" rx="5" fill="#E2E8F0" fillOpacity="0.5" />
      <rect x="300" y="270" width="200" height="15" rx="2" fill="#E2E8F0" />
      <rect x="300" y="270" width="120" height="15" rx="2" fill="url(#paint3_linear)" />
      <rect x="300" y="300" width="200" height="15" rx="2" fill="#E2E8F0" />
      <rect x="300" y="300" width="150" height="15" rx="2" fill="url(#paint4_linear)" />
      <rect x="300" y="330" width="200" height="15" rx="2" fill="#E2E8F0" />
      <rect x="300" y="330" width="100" height="15" rx="2" fill="url(#paint5_linear)" />
      
      <rect x="280" y="400" width="100" height="20" rx="5" fill="url(#paint6_linear)" />
      <rect x="400" y="400" width="100" height="20" rx="5" fill="#E2E8F0" fillOpacity="0.5" />
      <circle cx="450" cy="215" r="15" fill="url(#paint7_linear)" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="280" y1="190" x2="520" y2="220" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f0f9ff" />
        <stop offset="1" stopColor="#e0f2fe" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="280" y1="190" x2="440" y2="220" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="300" y1="270" x2="420" y2="285" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="300" y1="300" x2="450" y2="315" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint5_linear" x1="300" y1="330" x2="400" y2="345" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint6_linear" x1="280" y1="400" x2="380" y2="420" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint7_linear" x1="435" y1="200" x2="465" y2="230" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="190" y="90" width="420" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const bpmSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="200" y="150" width="400" height="300" rx="20" fill="white" fillOpacity="0.9" />
      
      {/* Akış diyagramı */}
      <circle cx="300" cy="200" r="30" fill="url(#paint1_linear)" />
      <rect x="270" y="300" width="60" height="60" rx="10" fill="url(#paint2_linear)" />
      <circle cx="500" cy="200" r="30" fill="url(#paint3_linear)" />
      <rect x="470" y="300" width="60" height="60" rx="10" fill="url(#paint4_linear)" />
      <rect x="370" y="280" width="60" height="60" rx="10" fill="url(#paint5_linear)" />
      
      {/* Bağlantı çizgileri */}
      <path d="M330 200L470 200" stroke="#4C8B32" strokeWidth="3" strokeDasharray="5 5" />
      <path d="M300 230L300 300" stroke="#4C8B32" strokeWidth="3" strokeDasharray="5 5" />
      <path d="M500 230L500 300" stroke="#4C8B32" strokeWidth="3" strokeDasharray="5 5" />
      <path d="M330 330L370 310" stroke="#4C8B32" strokeWidth="3" strokeDasharray="5 5" />
      <path d="M430 310L470 330" stroke="#4C8B32" strokeWidth="3" strokeDasharray="5 5" />
      
      {/* AI simgesi */}
      <circle cx="400" cy="240" r="20" fill="url(#paint6_linear)" />
      <path d="M392 240L408 240" stroke="white" strokeWidth="2" />
      <path d="M400 232L400 248" stroke="white" strokeWidth="2" />
      <path d="M395 235L405 245" stroke="white" strokeWidth="2" />
      <path d="M395 245L405 235" stroke="white" strokeWidth="2" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="270" y1="170" x2="330" y2="230" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="270" y1="300" x2="330" y2="360" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="470" y1="170" x2="530" y2="230" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="470" y1="300" x2="530" y2="360" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint5_linear" x1="370" y1="280" x2="430" y2="340" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint6_linear" x1="380" y1="220" x2="420" y2="260" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="140" y="90" width="520" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

// Yeni SVG bileşenleri
const collaborationSvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="200" y="150" width="400" height="300" rx="20" fill="white" fillOpacity="0.9" />
      
      {/* Ana çalışma alanı */}
      <rect x="250" y="200" width="300" height="140" rx="10" fill="url(#paint1_linear)" fillOpacity="0.8" />
      <rect x="270" y="220" width="260" height="100" rx="5" fill="#ffffff" fillOpacity="0.9" />
      
      {/* Kullanıcı göstergeleri */}
      <circle cx="300" cy="180" r="20" fill="url(#paint2_linear)" />
      <circle cx="350" cy="180" r="20" fill="url(#paint3_linear)" />
      <circle cx="400" cy="180" r="20" fill="url(#paint4_linear)" />
      
      {/* Kullanıcı sembolleri */}
      <path d="M300 175L300 185M295 180L305 180" stroke="#ffffff" strokeWidth="2" />
      <path d="M350 175L350 185M345 180L355 180" stroke="#ffffff" strokeWidth="2" />
      <path d="M400 175L400 185M395 180L405 180" stroke="#ffffff" strokeWidth="2" />
      
      {/* Canlı cursors */}
      <circle cx="290" cy="250" r="5" fill="#4C8B32" />
      <path d="M290 250L305 240" stroke="#4C8B32" strokeWidth="1.5" />
      
      <circle cx="350" cy="280" r="5" fill="#6EB152" />
      <path d="M350 280L365 270" stroke="#6EB152" strokeWidth="1.5" />
      
      <circle cx="420" cy="260" r="5" fill="#4C8B32" />
      <path d="M420 260L435 250" stroke="#4C8B32" strokeWidth="1.5" />
      
      {/* Veri senkronizasyon göstergesi */}
      <rect x="300" y="360" width="200" height="40" rx="5" fill="url(#paint5_linear)" fillOpacity="0.7" />
      <path d="M350 380A20 20 0 0 1 390 380A20 20 0 0 1 430 380" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 2" />
      <path d="M350 380A20 20 0 0 0 390 380A20 20 0 0 0 430 380" stroke="#ffffff" strokeWidth="2" />
      <circle cx="350" cy="380" r="5" fill="#ffffff" />
      <circle cx="430" cy="380" r="5" fill="#ffffff" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="250" y1="200" x2="550" y2="340" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="280" y1="160" x2="320" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="330" y1="160" x2="370" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="380" y1="160" x2="420" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint5_linear" x1="300" y1="360" x2="500" y2="400" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="140" y="90" width="520" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

const securitySvg = (
  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <rect x="200" y="150" width="400" height="300" rx="20" fill="white" fillOpacity="0.9" />
      
      {/* Kalkan şekli */}
      <path d="M400 180L480 220V300C480 340 440 370 400 390C360 370 320 340 320 300V220L400 180Z" 
        fill="url(#paint1_linear)" fillOpacity="0.8" />
      <path d="M400 200L460 230V295C460 325 430 350 400 365C370 350 340 325 340 295V230L400 200Z" 
        fill="white" fillOpacity="0.7" />
      
      {/* Tik işareti */}
      <path d="M380 295L395 310L425 280" stroke="#4C8B32" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Kullanıcı kimlik doğrulama */}
      <rect x="280" y="380" width="240" height="30" rx="5" fill="url(#paint2_linear)" />
      <circle cx="300" cy="395" r="10" fill="#ffffff" />
      <rect x="320" y="390" width="80" height="10" rx="2" fill="#ffffff" />
      <rect x="420" y="390" width="80" height="10" rx="2" fill="#ffffff" />
      
      {/* Güvenlik sembolleri */}
      <circle cx="280" cy="200" r="15" fill="url(#paint3_linear)" />
      <path d="M275 200L285 200M280 195L280 205" stroke="#ffffff" strokeWidth="2" />
      
      <circle cx="280" cy="250" r="15" fill="url(#paint4_linear)" />
      <path d="M275 250H285M280 245V255" stroke="#ffffff" strokeWidth="2" />
      
      <circle cx="280" cy="300" r="15" fill="url(#paint5_linear)" />
      <path d="M275 300H285M280 295V305" stroke="#ffffff" strokeWidth="2" />
      
      <circle cx="520" cy="200" r="15" fill="url(#paint6_linear)" />
      <path d="M515 200H525M520 195V205" stroke="#ffffff" strokeWidth="2" />
      
      <circle cx="520" cy="250" r="15" fill="url(#paint7_linear)" />
      <path d="M515 250H525M520 245V255" stroke="#ffffff" strokeWidth="2" />
      
      <circle cx="520" cy="300" r="15" fill="url(#paint8_linear)" />
      <path d="M515 300H525M520 295V305" stroke="#ffffff" strokeWidth="2" />
    </g>
    <defs>
      <linearGradient id="paint1_linear" x1="320" y1="180" x2="480" y2="390" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="280" y1="380" x2="520" y2="410" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="265" y1="185" x2="295" y2="215" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="265" y1="235" x2="295" y2="265" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint5_linear" x1="265" y1="285" x2="295" y2="315" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint6_linear" x1="505" y1="185" x2="535" y2="215" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint7_linear" x1="505" y1="235" x2="535" y2="265" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <linearGradient id="paint8_linear" x1="505" y1="285" x2="535" y2="315" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4C8B32" />
        <stop offset="1" stopColor="#6EB152" />
      </linearGradient>
      <filter id="filter0_d" x="140" y="90" width="520" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);

// Features verileri
export const featuresData: Feature[] = [
  {
    id: 'integration',
    title: 'Kolay Entegrasyon',
    description: 'Mevcut uygulamalarınızla sorunsuz entegrasyon sağlar. Herhangi bir platforma kolayca uyarlanabilir.',
    icon: HiOutlinePuzzle,
    svg: integrationSvg,
    slug: 'integration'
  },
  {
    id: 'ai-reporting',
    title: 'AI Destekli Raporlama',
    description: 'Prompt ile özel raporları tek tıkla oluşturabilir, veritabanlarıyla eşleşip otomatik ve kolay raporlama hizmeti alabilirsiniz.',
    icon: HiOutlineDocumentReport,
    svg: reportingSvg,
    slug: 'ai-reporting'
  },
  {
    id: 'bpm',
    title: 'AI Destekli İş Akışı Yönetimi',
    description: 'İçerisinde entegre BPM uygulaması barındıran yapay zeka destekli iş akışı yönetimi ile kod yazmadan kendi modüllerinizi geliştirebilirsiniz.',
    icon: HiOutlineChartSquareBar,
    svg: bpmSvg,
    slug: 'bpm'
  },
  {
    id: 'real-time-collaboration',
    title: 'Gerçek Zamanlı İşbirliği',
    description: 'Ekip üyelerinizin aynı anda platform üzerinde çalışmasını sağlayan gerçek zamanlı işbirliği özellikleri ile iş süreçlerinizi hızlandırın.',
    icon: HiOutlineUserGroup,
    svg: collaborationSvg,
    slug: 'real-time-collaboration'
  },
  {
    id: 'security',
    title: 'Gelişmiş Güvenlik Kontrolleri',
    description: 'Çok katmanlı güvenlik protokolleri, rol tabanlı erişim yönetimi ve gelişmiş veri şifreleme teknolojileri ile verileriniz her zaman güvende.',
    icon: HiOutlineShieldCheck,
    svg: securitySvg,
    slug: 'security'
  },
  {
    id: 'ai',
    title: 'Yapay Zeka Desteği',
    description: 'Yapay zeka destekli çözümler ile real-time veri analizi, içerik özelleştirme ve akıllı karar destek sistemleri.',
    icon: HiOutlineChip,
    svg: aiSvg,
    slug: 'ai'
  },
  {
    id: 'plugin',
    title: 'Eklenti Ekosistemi',
    description: 'Genişletilebilir eklenti sistemi ile yeni özellikler ve yetenekler ekleyin. Özelleştirilebilir yapı.',
    icon: HiOutlinePuzzle,
    svg: pluginSvg,
    slug: 'plugin'
  },
  {
    id: 'modular',
    title: 'Modüler Yapı',
    description: 'Modüler mimarisi sayesinde yalnızca ihtiyacınız olan bileşenleri kullanın. Performans optimizasyonu.',
    icon: HiOutlineCube,
    svg: modularSvg,
    slug: 'modular'
  },
  {
    id: 'customizable',
    title: 'Tamamen Özelleştirilebilir',
    description: 'Markanıza ve ihtiyaçlarınıza uygun olarak tamamen özelleştirilebilir çözümler. Sınırsız esneklik.',
    icon: HiOutlineAdjustments,
    svg: customizableSvg,
    slug: 'customizable'
  }
]; 