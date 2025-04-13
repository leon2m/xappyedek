This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Form Verilerinin Depolanması

Projede hem iletişim formu hem de demo talep formu verileri iki şekilde depolanmaktadır:

1. MongoDB veritabanına kaydedilir
2. Belirtilen e-posta adresine bildirim olarak gönderilir

### Kurulum

Form verilerinin doğru şekilde işlenmesi için aşağıdaki adımları takip edin:

1. MongoDB veritabanı bağlantısı kurun (yerel veya uzak bir MongoDB sunucusu)
   
2. E-posta gönderimi için SMTP ayarlarını yapılandırın
   
3. Projenin kök dizininde bir `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ayarlayın:

```
# MongoDB Bağlantı Bilgileri
MONGODB_URI=mongodb://kullanici:parola@host:port/ar-solutions

# E-posta Gönderim Ayarları
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=user@example.com
EMAIL_PASS=password
EMAIL_FROM=web@arsolutions.com.tr
EMAIL_TO=info@arsolutions.com.tr
```

### MongoDB Şemaları

Projede iki farklı şema kullanılmaktadır:

1. **İletişim Formu Şeması:**
   - Adı: `Contact`
   - Alanlar: isim, e-posta, telefon, konu, mesaj, oluşturulma tarihi

2. **Demo Talep Formu Şeması:**
   - Adı: `DemoRequest`
   - Alanlar: isim, şirket, pozisyon, e-posta, telefon, ilgi alanları, mesaj, oluşturulma tarihi

### Güvenlik Notları

- SMTP şifrenizi ve MongoDB bağlantı bilgilerinizi `.env.local` dosyasında saklayın
- `.env.local` dosyasını asla git deposuna dahil etmeyin (`.gitignore` dosyasında belirtildiğinden emin olun)
- Gmail SMTP kullanıyorsanız, "Uygulama Şifreleri" özelliğini kullanın

## Projeyi Canlıya Alma

Projeyi canlıya almak için aşağıdaki adımları takip edin:

### 1. Build İşlemi

Projenin statik dosyalarını oluşturmak için:

```bash
# har-xapp-website klasöründe
npm run build
```

Bu komut `out` klasöründe statik HTML, CSS ve JavaScript dosyalarını oluşturacaktır.

### 2. Build Dosyalarını Kontrol Etme

Build işlemi tamamlandıktan sonra, `out` klasörünün içeriğini kontrol edebilirsiniz. Bu klasörde üretilen tüm statik dosyalar bulunmaktadır.

### 3. Production Ortamında Test Etme

Oluşturulan build dosyalarını yerel ortamda test etmek için:

```bash
# Basit bir HTTP sunucusu ile (Node.js)
npx serve out
```

### 4. Canlı Ortama Dağıtma

Oluşturulan `out` klasöründeki dosyaları, seçtiğiniz hosting sağlayıcısına yükleyebilirsiniz:

- Netlify, Vercel gibi statik site hosting hizmetleri
- AWS S3 + CloudFront
- GitHub Pages
- Herhangi bir web hosting

#### Not: API Endpointleri Hakkında

Bu proje statik site olarak dışa aktarıldığı için (`output: 'export'`), API Routes çalışmayacaktır. İletişim ve demo talep formları için bir backend çözümü entegre etmeniz gerekecektir:

1. Formları işlemek için ayrı bir API servisi oluşturun (örn. Netlify Functions, AWS Lambda)
2. Formu göndermek için fetch işlemlerinde bu API'nin adresini güncelleyin

veya 

Next.js projesini tamamen statik olarak değil, SSR olarak deploy edin (Vercel, Netlify, AWS gibi platformlarda).
