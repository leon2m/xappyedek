/**
 * Statik sayfa oluşturma için parametreler
 * Bu dosya, dinamik rotalar için statik parametreleri tanımlar
 * Netlify'da static export modunda build hatalarını önler
 */

// Pozisyon listesi - Başvurulabilecek kariyer pozisyonları
export const positionParams = [
  { pozisyon: 'backend-developer' },
  { pozisyon: 'content-marketing' }
];

// Modül sayfaları için boş parametreler
export const moduleParams = [
  { slug: 'finans' },
  { slug: 'ik' },
  { slug: 'it' },
  { slug: 'operasyon' }
];

// Ana sayfa için boş parametre
export const homeParams = [];

// 404 sayfası için boş parametre
export const notFoundParams = [];

// Tüm statik parametreleri tek bir yerden yönetiyoruz
// Bu fonksiyon ileride gerekirse genişletilebilir
export const getAllStaticParams = () => {
  return {
    positions: positionParams,
    modules: moduleParams,
    homeParams: homeParams,
    notFoundParams: notFoundParams
  };
};

// Dosya bazında statik parametreleri almak için yardımcı fonksiyonlar
export const getPositionParams = () => positionParams;
export const getModuleParams = () => moduleParams; 