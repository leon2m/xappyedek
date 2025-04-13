#!/bin/bash

# Terminalden çıktıları renklendirecek kod
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}   AR Solutions Web Sitesi Build Tool   ${NC}"
echo -e "${YELLOW}========================================${NC}"

echo -e "\n${GREEN}1. Bağımlılıkları kontrol ediyorum...${NC}"
npm install

echo -e "\n${GREEN}2. Proje dosyalarını temizliyorum...${NC}"
rm -rf .next
rm -rf out

echo -e "\n${GREEN}3. Lint kontrolü yapılıyor...${NC}"
npm run lint

echo -e "\n${GREEN}4. Production build oluşturuluyor...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}Build başarıyla tamamlandı!${NC}"
    echo -e "Dosyalar ${YELLOW}out/${NC} klasöründe oluşturuldu."
    echo -e "\nBu dosyaları hosting sağlayıcınıza yükleyebilirsiniz."
    echo -e "Örnek olarak yerel ortamda test etmek için: ${YELLOW}npx serve out${NC}"
else
    echo -e "\n${RED}Build sırasında bir hata oluştu.${NC}"
    echo -e "Lütfen hata mesajlarını kontrol edin."
    exit 1
fi

echo -e "\n${YELLOW}========================================${NC}"
echo -e "${YELLOW}   Build İşlemi Tamamlandı   ${NC}"
echo -e "${YELLOW}========================================${NC}" 