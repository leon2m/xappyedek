// Statik sayfa oluşturma için parametreler
export const positionParams = [
  { pozisyon: 'backend-developer' },
  { pozisyon: 'content-marketing' }
];

// Tüm statik parametreleri tek bir yerden yönetiyoruz
export const getAllStaticParams = () => {
  return {
    positions: positionParams
  };
}; 