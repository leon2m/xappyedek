// UYARI: Bu dosya sadece SSR/API Routes destekleyen deploymentlarda çalışır.
// Static export (`output: 'export'`) kullanıldığında bu API çalışmayacaktır.
// Demo talep formunuzu harici bir API ile entegre etmelisiniz.

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// MongoDB bağlantı bilgileri
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ar-solutions';

// MongoDB bağlantısı ve şema tanımı
let demoRequestSchema: mongoose.Schema;
let DemoRequest: mongoose.Model<any>;

try {
  // Şemayı bir kez tanımla
  demoRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    interests: { type: [String], default: [] },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  
  // Modeli oluştur
  DemoRequest = mongoose.models.DemoRequest || mongoose.model('DemoRequest', demoRequestSchema);
} catch (error) {
  console.error('MongoDB şema tanımlama hatası:', error);
}

// Nodemailer konfigürasyonu
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASS || 'password',
  },
});

// Veritabanı bağlantısı
async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return; // Zaten bağlı
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    throw new Error('Veritabanına bağlanılamadı');
  }
}

// İlgi alanlarının etiketlerini al
function getInterestLabels(interests: string[]) {
  const interestMap: {[key: string]: string} = {
    'ik': 'İnsan Kaynakları',
    'finans': 'Finans',
    'it': 'Bilgi Teknolojileri',
    'operasyon': 'Operasyon'
  };
  
  return interests.map(interest => interestMap[interest] || interest);
}

export async function POST(request: Request) {
  try {
    // Form verilerini al
    const formData = await request.json();
    const { name, company, position, email, phone, interests, message } = formData;
    
    // Zorunlu verileri kontrol et
    if (!name || !company || !position || !email) {
      return NextResponse.json(
        { error: 'Gerekli alanları doldurunuz' },
        { status: 400 }
      );
    }
    
    // İlgi alanlarının etiketlerini al
    const interestLabels = getInterestLabels(interests);
    
    // E-posta gönder
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'web@arsolutions.com.tr',
        to: process.env.EMAIL_TO || 'info@arsolutions.com.tr',
        subject: `Demo Talebi: ${company}`,
        html: `
          <h1>Demo Talep Formu Bildirimi</h1>
          <p><strong>İsim Soyisim:</strong> ${name}</p>
          <p><strong>Şirket:</strong> ${company}</p>
          <p><strong>Pozisyon:</strong> ${position}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || 'Belirtilmemiş'}</p>
          <p><strong>İlgi Alanları:</strong> ${interestLabels.join(', ') || 'Belirtilmemiş'}</p>
          <p><strong>Mesaj:</strong> ${message || 'Belirtilmemiş'}</p>
          <p><em>Bu e-posta AR Solutions web sitesi demo talep formundan otomatik olarak gönderilmiştir.</em></p>
        `,
      });
      
      console.log('E-posta başarıyla gönderildi');
    } catch (error) {
      console.error('E-posta gönderimi hatası:', error);
      // E-posta hatası olsa bile veritabanı kaydı yapılacak
    }
    
    // Veritabanına kaydet
    try {
      await connectToDatabase();
      const demoRequestEntry = new DemoRequest({
        name,
        company,
        position,
        email,
        phone,
        interests,
        message,
      });
      
      await demoRequestEntry.save();
      console.log('Demo talep verisi veritabanına kaydedildi');
    } catch (error) {
      console.error('Veritabanı kayıt hatası:', error);
      // Veritabanı hatası olsa bile başarılı yanıt döndürülebilir
    }
    
    return NextResponse.json(
      { success: true, message: 'Demo talebiniz başarıyla alındı' },
      { status: 200 }
    );
  } catch (error) {
    console.error('İstek işleme hatası:', error);
    return NextResponse.json(
      { error: 'Demo talebi işlenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 