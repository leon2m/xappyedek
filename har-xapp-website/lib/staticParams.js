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

// Tüm statik parametreleri tek bir yerden yönetiyoruz
// Bu fonksiyon ileride gerekirse genişletilebilir
export const getAllStaticParams = () => {
  return {
    positions: positionParams
  };
};

// Dosya bazında statik parametreleri almak için yardımcı fonksiyonlar
export const getPositionParams = () => positionParams; 