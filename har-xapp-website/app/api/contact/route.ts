// UYARI: Bu dosya sadece SSR/API Routes destekleyen deploymentlarda çalışır.
// Static export (`output: 'export'`) kullanıldığında bu API çalışmayacaktır.
// İletişim formunuzu harici bir API ile entegre etmelisiniz.

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// MongoDB bağlantı bilgileri
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ar-solutions';

// MongoDB bağlantısı ve şema tanımı
let contactSchema: mongoose.Schema;
let Contact: mongoose.Model<mongoose.Document>;

try {
  // Şemayı bir kez tanımla
  contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  // Modeli oluştur
  Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
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

export async function POST(request: Request) {
  try {
    // Form verilerini al
    const formData = await request.json();
    const { name, email, phone, subject, message } = formData;
    
    // Zorunlu verileri kontrol et
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Gerekli alanları doldurunuz' },
        { status: 400 }
      );
    }
    
    // E-posta gönder
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'web@arsolutions.com.tr',
        to: process.env.EMAIL_TO || 'info@arsolutions.com.tr',
        subject: `İletişim Formu: ${subject}`,
        html: `
          <h1>İletişim Formu Bildirimi</h1>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || 'Belirtilmemiş'}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <p><strong>Mesaj:</strong> ${message}</p>
          <p><em>Bu e-posta AR Solutions web sitesi iletişim formundan otomatik olarak gönderilmiştir.</em></p>
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
      const contactEntry = new Contact({
        name,
        email,
        phone,
        subject,
        message,
      });
      
      await contactEntry.save();
      console.log('Form verisi veritabanına kaydedildi');
    } catch (error) {
      console.error('Veritabanı kayıt hatası:', error);
      // Veritabanı hatası olsa bile başarılı yanıt döndürülebilir
    }
    
    return NextResponse.json(
      { success: true, message: 'Form başarıyla gönderildi' },
      { status: 200 }
    );
  } catch (error) {
    console.error('İstek işleme hatası:', error);
    return NextResponse.json(
      { error: 'Form işlenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 