# AR Çözümleri Web Sitesi - İçerik ve Görünüm Düzenleme Dokümanı

## 1. Ana Sayfa Yapısı ve Bileşenleri

Ana sayfa `har-xapp-website/app/page.tsx` dosyasında tanımlanmıştır. Bu dosyada birçok bileşen import edilip sırayla yerleştirilmiştir:

```typescript
// app/page.tsx içinde
import Hero from '@/components/sections/Hero';
import { Features } from '@/components/sections/features/Features';
import Modules from '@/components/sections/Modules';
import Integrations from '@/components/sections/Integrations';
import CTA from '@/components/sections/CTA';
import About from '@/components/sections/About';
```

Her bölüm ayrı bileşenlerden oluşur ve her birinin düzenleme yerleri farklıdır.

## 2. Metin İçeriklerin Düzenlenmesi

### Hero Bölümü (Giriş)
- **Dosya Yolu:** `components/sections/Hero.tsx`
- **Düzenlemeler:**
  - Ana başlık, alt başlık ve açıklama metinlerini bu dosyada bulabilirsiniz
  - Örnek: `<h1>` ve `<p>` etiketleri içindeki metinleri değiştirin

### Hakkımızda Bölümü
- **Dosya Yolu:** `components/sections/About.tsx`
- **Düzenlemeler:**
  - Şirket hakkında bilgiler ve tanıtım metinleri burada

### Özellikler Bölümü
- **Dosya Yolu:** `components/sections/features/Features.tsx`
- **Düzenlemeler:**
  - Ana başlık: 62-64. satırlarda `Premium <span>Özellikler</span>` şeklinde
  - Alt başlık: 70. satırda "Her ihtiyaca yönelik..." metni
  
- **Özellik Kartları:** `data/features.js` dosyasında tanımlanıyor olabilir
  - Buradan her bir özelliğin başlık, açıklama ve görselleri düzenlenebilir

### Modüller Bölümü
- **Dosya Yolu:** `components/sections/Modules.tsx`
- **Düzenlemeler:**
  - "Entegre Modüller" başlığı ve açıklaması bu dosyada

### Entegrasyonlar Bölümü
- **Dosya Yolu:** `components/sections/Integrations.tsx`
- **Düzenlemeler:**
  - Entegrasyonlar hakkında metinler bu dosyada

### CTA (Aksiyon Çağrısı) Bölümü
- **Dosya Yolu:** `components/sections/CTA.tsx`
- **Düzenlemeler:**
  - İletişim formu, buton metinleri ve çağrı metinleri burada

## 3. Renk Şeması ve Düzenleme

### Temel Renk Ayarları
- **Dosya Yolu:** `tailwind.config.js`
- **Düzenlemeler:**
  - Marka renkleri burada `theme.colors` nesnesi içinde tanımlanmıştır
  - Örnek: `primary`, `secondary` gibi renk değerlerini değiştirebilirsiniz

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      primary: { 
        // Yeşil tonlar
        DEFAULT: '#4C8B32',
        // Diğer tonlar...
      },
      secondary: {
        // İkincil renkler
      },
      // Diğer renkler...
    }
  }
}
```

### Bileşen Özel Renkleri

- **Feature Card Renkleri:** `components/sections/features/FeatureCard.tsx`
  - Kartların arka planı: 112-116. satırlarda `bg-gradient` sınıfları
  - İkon kutusu: 121-124. satırlarda `bg-gradient-to-br from-primary/80 to-primary`
  - Başlık rengi: 131. satırda `text-slate-800`
  - Açıklama rengi: 135. satırda `text-slate-600`

- **Features Bölümü Renkleri:** `components/sections/features/Features.tsx`
  - Arka plan rengi: 28. satırda `bg-white`
  - Başlık rengi: 63. satırda `text-slate-800`
  - Vurgu rengi: 63. satırda `text-primary`
  - Alt başlık rengi: 70. satırda `text-slate-600`
  - Arka plan efektleri: 32-34. satırlarda gradient renkleri

## 4. Görsellerin Değiştirilmesi

### Feature Kartlarındaki Görseller
- **Veri Yolu:** `data/features.js`
- **Düzenlemeler:**
  - Her bir özellik kartı için görsel yolu burada tanımlanmış olmalı
  - `image` alanında görsel yollarını `/images/features/..` şeklinde değiştirebilirsiniz

### FeatureCard Görselleri
- **Görsel Ekleme Yeri:** `components/sections/features/FeatureCard.tsx`
- **Düzenlemeler:**
  - 140-147. satırlardaki `Image` bileşeni, görselleri görüntüler
  - Görselin boyutu ve görünümü `className` özelliğiyle ayarlanır

### Diğer Görseller
- **Genel Görsel Klasörü:** `public/images/`
- **Düzenlemeler:**
  - Tüm görselleri buraya ekleyip referans verebilirsiniz
  - Örnek: `/images/hero/background.jpg` şeklinde

## 5. Animasyon ve Efektler

### Parallax Efektleri
- **Dosya Yolu:** `components/sections/parallax/ParallaxLayer.tsx`
- **Düzenlemeler:**
  - Derinlik değerlerini `depth` parametresiyle değiştirerek efekt hızını ayarlayabilirsiniz

### Features Animasyonları
- **Dosya Yolu:** `components/sections/features/Features.tsx`
- **Düzenlemeler:**
  - 18-24. satırlar: Başlık animasyonu ayarları
  - 33-38. satırlar: Arka plan efektleri animasyonları

### FeatureCard Animasyonları
- **Dosya Yolu:** `components/sections/features/FeatureCard.tsx`
- **Düzenlemeler:**
  - 20-36. satırlar: Kart animasyonu parametreleri
  - 38-101. satırlar: Mouse hareketi ile 3D efekt ayarları

## 6. Genel Stil ve Responsive Tasarım

### Global CSS
- **Dosya Yolu:** `app/globals.css`
- **Düzenlemeler:**
  - Genel font ayarları, temel renkler ve stil tanımlamaları burada

### Responsive Ayarlar
- Tailwind CSS sınıflarında `md:` ve `lg:` önekleriyle responsive tasarım ayarları yapılmıştır
- Örnek: `text-4xl md:text-5xl lg:text-6xl` (mobil, tablet ve masaüstü için farklı boyutlar)

## 7. Tema Değiştirme (Açık/Koyu)

Features bileşeninde örneği olan açık tema (`bg-white`) ve koyu tema ayarları, ilgili bileşenlerin class özelliklerinde değiştirilebilir:

```jsx
// Açık tema örneği (şu anda kullanılıyor)
<section id="features" className="relative overflow-hidden py-24 md:py-32 bg-white">

// Koyu tema örneği (değiştirmek için)
<section id="features" className="relative overflow-hidden py-24 md:py-32 bg-slate-800">
```

Renk değişimleri yapıldığında, ilgili metin renklerinin de okunabilir kalması için güncellenmesi gerekir. 