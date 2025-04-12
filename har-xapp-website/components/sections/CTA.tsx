'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const CTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
      {/* Dekoratif elemanlar */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-20 right-10 w-60 h-60 bg-white opacity-5 rounded-full"></div>
        <div className="absolute -bottom-20 left-1/4 w-40 h-40 bg-white opacity-5 rounded-full"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Operasyonel Mükemmelliğe İlk Adımı Atın
            </h2>
            <p className="text-lg mb-8 text-white/90">
              H-AR XaPP'ın işletmenize nasıl değer katabileceğini keşfetmek için ücretsiz demo randevusu alın.
              Uzmanlarımız ihtiyaçlarınıza özel bir sunum hazırlayacaktır.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/demo-talep" className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all duration-300 shadow-lg">
                Demo Talep Et
              </Link>
              <Link href="/iletisim" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-semibold transition-all duration-300">
                Bize Ulaşın
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">Demo Talep Formu</h3>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Adınız Soyadınız</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Adınız Soyadınız"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium">Şirket</label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Şirket Adı"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">E-posta</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="E-posta Adresiniz"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Telefon Numaranız"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="interests" className="block text-sm font-medium">İlgilendiğiniz Modüller</label>
                <select
                  id="interests"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  defaultValue=""
                >
                  <option value="" disabled>Seçiniz</option>
                  <option value="ik">İnsan Kaynakları</option>
                  <option value="finans">Finans</option>
                  <option value="it">IT</option>
                  <option value="operasyon">Operasyon</option>
                  <option value="all">Tümü</option>
                </select>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-all duration-300 shadow-md mt-4"
              >
                Demo Talep Et
              </motion.button>
              
              <p className="text-sm text-white/70 text-center mt-4">
                Bilgileriniz yalnızca demo randevusu için kullanılacaktır.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 