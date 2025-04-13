#!/bin/bash
# AR Solutions Web Sitesi Build Tool - Netlify Hata Giderme Sürümü

# Terminalden çıktıları renklendirecek kod
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}   AR Solutions Web Sitesi Build Tool   ${NC}"
echo -e "${YELLOW}   Netlify Hata Giderme Sürümü   ${NC}"
echo -e "${YELLOW}========================================${NC}"

echo -e "\n${GREEN}1. Bağımlılıkları temizliyorum...${NC}"
rm -rf node_modules package-lock.json yarn.lock

echo -e "\n${GREEN}2. Bağımlılıkları yüklüyorum...${NC}"
export NETLIFY_USE_YARN=false
export CI=false
export SKIP_ESLINT_CHECK=true
export DISABLE_ESLINT_PLUGIN=true
npm install --no-package-lock --legacy-peer-deps --no-audit

echo -e "\n${GREEN}3. Build dosyalarını temizliyorum...${NC}"
rm -rf .next
rm -rf out

echo -e "\n${GREEN}4. Production build oluşturuyorum...${NC}"
export NODE_ENV=production
npm run build:netlify

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}Build başarıyla tamamlandı!${NC}"
    echo -e "Dosyalar ${YELLOW}out/${NC} klasöründe oluşturuldu."
    echo -e "\nBu dosyaları Netlify'a manuel olarak yükleyebilirsiniz."
    echo -e "Veya Netlify site ayarlarında:"
    echo -e "1. Build command: ${YELLOW}npm run build:netlify${NC}"
    echo -e "2. Publish directory: ${YELLOW}out${NC}"
    echo -e "3. Build environment variables:"
    echo -e "   ${YELLOW}CI=false${NC}"
    echo -e "   ${YELLOW}NETLIFY_USE_YARN=false${NC}"
    echo -e "   ${YELLOW}DISABLE_ESLINT_PLUGIN=true${NC}"
    echo -e "   ${YELLOW}SKIP_ESLINT_CHECK=true${NC}"
else
    echo -e "\n${RED}Build sırasında bir hata oluştu.${NC}"
    echo -e "Lütfen hata mesajlarını kontrol edin."
    exit 1
fi

echo -e "\n${GREEN}5. Yerel ortamda test ediliyor...${NC}"
echo -e "Test için: ${YELLOW}npx serve out${NC}"

echo -e "\n${YELLOW}========================================${NC}"
echo -e "${YELLOW}   Build İşlemi Tamamlandı   ${NC}"
echo -e "${YELLOW}========================================${NC}" 