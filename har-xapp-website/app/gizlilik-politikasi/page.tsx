'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaShieldAlt, FaUserLock, FaServer, FaUserShield, FaChartBar } from 'react-icons/fa';

const PrivacyPolicyPage = () => {
  // Animasyon varyantları
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Gizlilik bölümleri
  const policySections = [
    {
      id: 'topladığımız-veriler',
      title: 'Topladığımız Veriler',
      icon: <FaChartBar className="text-primary text-3xl mb-4" />,
      content: (
        <>
          <p className="mb-3">H-AR Solutions olarak, H-AR XaPP platformumuz aracılığıyla aşağıdaki verileri toplayabiliriz:</p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li>Kullanıcı Bilgileri: Ad, soyadı, e-posta adresi, telefon numarası, şirket adı, görev/pozisyon gibi kullanıcı tarafından sağlanan bilgiler.</li>
            <li>Kimlik Doğrulama Bilgileri: Hesap erişimi ve güvenlik amacıyla kullanılan kullanıcı adı, şifre ve diğer güvenlik bilgileri.</li>
            <li>İş Verileri: Platformda oluşturulan, yüklenen veya işlenen her türlü iş verisi, belgeler, formlar, işlemler ve diğer içerikler.</li>
            <li>Kullanım Verileri: Platformun nasıl kullanıldığına dair analitik veriler, tıklama oranları, ziyaret edilen sayfalar, kullanılan özellikler.</li>
            <li>Cihaz Bilgileri: IP adresi, tarayıcı türü, işletim sistemi, cihaz türü ve benzeri teknik bilgiler.</li>
            <li>Çerezler ve İzleme Teknolojileri: Web sitesi ve uygulama kullanımını iyileştirmek için kullanılan çerezler ve benzeri teknolojiler aracılığıyla toplanan bilgiler.</li>
          </ul>
          <p>Bu verilerin toplanma amacı, hizmetlerimizi sağlamak, iyileştirmek, sorunları tespit etmek ve çözmek, güvenliği sağlamak ve müşterilerimizin deneyimini en üst düzeye çıkarmaktır.</p>
        </>
      )
    },
    {
      id: 'veri-kullanımı',
      title: 'Veri Kullanımı',
      icon: <FaUserShield className="text-primary text-3xl mb-4" />,
      content: (
        <>
          <p className="mb-3">Topladığımız kişisel verileri aşağıdaki amaçlar için kullanabiliriz:</p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li>H-AR XaPP platformunu ve ilgili hizmetleri sağlamak, yönetmek ve iyileştirmek.</li>
            <li>Hesap oluşturma, kimlik doğrulama ve hesap yönetimi süreçlerini desteklemek.</li>
            <li>Müşteri desteği sağlamak ve müşteri taleplerini yanıtlamak.</li>
            <li>Teknik sorunları tespit etmek, önlemek ve çözmek.</li>
            <li>Kullanıcı deneyimini geliştirmek için platforma yeni özellikler ve işlevler eklemek.</li>
            <li>Güvenlik önlemlerini uygulamak ve platform güvenliğini sağlamak.</li>
            <li>Yasal gerekliliklere uymak ve yasal hak ve yükümlülüklerimizi yerine getirmek.</li>
            <li>İzin verdiğiniz durumlarda, yeni ürünler, güncellemeler ve promosyonlar hakkında bilgilendirmek.</li>
          </ul>
          <p>Kişisel verilerinizi, açık rızanız olmadan veya yasal bir dayanak bulunmadan, bu gizlilik politikasında belirtilen amaçlar dışında kullanmayacağız.</p>
        </>
      )
    },
    {
      id: 'veri-güvenliği',
      title: 'Veri Güvenliği',
      icon: <FaShieldAlt className="text-primary text-3xl mb-4" />,
      content: (
        <>
          <p className="mb-3">H-AR Solutions olarak, verilerinizin güvenliğini sağlamak için kapsamlı teknik ve organizasyonel önlemler alıyoruz:</p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li>Uçtan uca şifreleme teknolojileri kullanarak veri iletimini koruyoruz.</li>
            <li>Gelişmiş kimlik doğrulama sistemleri ve çok faktörlü kimlik doğrulama seçenekleri sunuyoruz.</li>
            <li>Düzenli güvenlik denetimleri ve penetrasyon testleri gerçekleştiriyoruz.</li>
            <li>Veri erişimini "bilmesi gereken" prensibi temelinde sınırlıyoruz ve rol tabanlı erişim kontrolleri uyguluyoruz.</li>
            <li>Düzenli veri yedekleme prosedürleri uyguluyoruz.</li>
            <li>Güvenlik duvarları, kötü amaçlı yazılım koruması ve diğer güvenlik teknolojileri kullanıyoruz.</li>
            <li>Personelimizin gizlilik ve veri güvenliği konusunda düzenli eğitimler almasını sağlıyoruz.</li>
          </ul>
          <p className="mb-3">Her ne kadar verilerinizi korumak için kapsamlı önlemler alsak da, hiçbir elektronik iletim veya depolama yönteminin %100 güvenli olmadığını unutmayın. Bu nedenle, makul güvenlik önlemlerine rağmen, yetkisiz erişim, kullanım veya ifşa durumlarını tamamen engelleyemeyebiliriz.</p>
          <p>Güvenlik ihlali şüphesi durumunda, yasal gereklilikler doğrultusunda ilgili tarafları bilgilendireceğiz ve gerekli önlemleri alacağız.</p>
        </>
      )
    },
    {
      id: 'veri-saklama',
      title: 'Veri Saklama ve Silme',
      icon: <FaServer className="text-primary text-3xl mb-4" />,
      content: (
        <>
          <p className="mb-3">Kişisel verilerinizi yalnızca gerekli olduğu sürece ve aşağıdaki durumlarda saklarız:</p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li>Hizmetlerimizi sağlamak ve sözleşme yükümlülüklerimizi yerine getirmek için gerekli olduğu sürece.</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek için gereken süre boyunca (örneğin, vergi veya muhasebe gereklilikleri).</li>
            <li>İş amaçlarımız veya yasal haklarımızı korumak için makul olarak gerekli olduğu sürece.</li>
          </ul>
          <p className="mb-3">Hizmet süremiz sona erdiğinde veya talebiniz üzerine, kişisel verilerinizi güvenli bir şekilde sileriz veya anonimleştiririz. Ancak, yasal yükümlülüklerimiz veya meşru iş amaçlarımız nedeniyle bazı verileri daha uzun süre saklamamız gerekebilir.</p>
          <p>Verilerinizi silme, anonimleştirme veya saklama süreleri hakkında daha fazla bilgi için, lütfen bizimle iletişime geçin.</p>
        </>
      )
    },
    {
      id: 'çerezler',
      title: 'Çerezler ve İzleme Teknolojileri',
      icon: <FaUserLock className="text-primary text-3xl mb-4" />,
      content: (
        <>
          <p className="mb-3">H-AR XaPP platformumuzda ve web sitemizde çerezler ve benzer izleme teknolojileri kullanmaktayız. Bu teknolojiler sayesinde:</p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li>Kullanıcı oturumunu yönetebilir ve kimlik doğrulaması yapabiliriz.</li>
            <li>Kullanıcı tercihlerini ve ayarlarını hatırlayabiliriz.</li>
            <li>Platform performansını ve kullanım istatistiklerini analiz edebiliriz.</li>
            <li>Platformun güvenliğini artırabilir ve dolandırıcılık tespit sistemlerini destekleyebiliriz.</li>
            <li>Kullanıcı deneyimini iyileştirebilir ve kişiselleştirebiliriz.</li>
          </ul>
          <p className="mb-3">Kullandığımız çerezler şunları içerir:</p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li><strong>Zorunlu Çerezler:</strong> Platform işlevselliği için gerekli olan ve devre dışı bırakılamayan çerezler.</li>
            <li><strong>Performans Çerezleri:</strong> Siteyi nasıl kullandığınıza dair bilgi toplayan ve site performansını iyileştirmemize yardımcı olan çerezler.</li>
            <li><strong>İşlevsellik Çerezleri:</strong> Tercihlerinizi hatırlamamıza ve kişiselleştirilmiş özellikler sunmamıza olanak tanıyan çerezler.</li>
            <li><strong>Analitik Çerezler:</strong> Ziyaretçilerin platformu nasıl kullandığını anlamamıza yardımcı olan çerezler.</li>
          </ul>
          <p>Çoğu tarayıcı, çerezleri kabul etme veya reddetme, tüm çerezleri silme veya bir çerez yerleştirildiğinde uyarı verme seçeneği sunar. Ancak, çerezleri devre dışı bırakırsanız, platformun bazı özellikleri düzgün çalışmayabilir.</p>
        </>
      )
    }
  ];

  // Haklar ve KVKK bölümü içeriği
  const rightsContent = (
    <>
      <p className="mb-3">Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aşağıdaki haklara sahipsiniz:</p>
      <ul className="list-disc pl-6 space-y-2 mb-3">
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
        <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
        <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
        <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
        <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
        <li>Kişisel verilerinizin düzeltilmesi, silinmesi ya da yok edilmesi halinde bunların aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
        <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
      </ul>
      <p className="mb-3">Bu haklarınızı kullanmak için, "destek@arsolutions.com.tr" adresine e-posta göndererek veya şirket merkezimize yazılı başvuruda bulunarak talepte bulunabilirsiniz. Talebiniz, niteliğine göre en kısa sürede ve en geç otuz (30) gün içinde ücretsiz olarak sonuçlandırılacaktır.</p>
      <p>Taleplerin, veri sahibi olduğunuzu tespit edecek bilgileri içermesi gerekmektedir. Ad, soyad, kimlik numarası, e-posta adresi gibi kimliğinizi doğrulayacak bilgiler olmadan yapılan başvurular değerlendirmeye alınmayacaktır.</p>
    </>
  );

  // Revizyon ve iletişim içeriği
  const contactContent = (
    <>
      <p className="mb-3">Bu gizlilik politikası, yasal gerekliliklerdeki değişiklikler, sunduğumuz hizmetlerdeki yenilikler veya teknolojik gelişmeler nedeniyle zaman zaman güncellenebilir. Politikadaki önemli değişiklikler, platformda bildirim yayınlanarak veya size e-posta göndererek bildirilecektir.</p>
      <p className="mb-3">Gizlilik politikamız hakkında sorularınız veya endişeleriniz varsa, lütfen aşağıdaki kanallardan bize ulaşın:</p>
      <ul className="list-disc pl-6 space-y-2 mb-3">
        <li><strong>E-posta:</strong> <a href="mailto:destek@arsolutions.com.tr" className="text-primary hover:underline">destek@arsolutions.com.tr</a></li>
        <li><strong>Telefon:</strong> <a href="tel:+902163805767" className="text-primary hover:underline">+90 216 XXX XX XX</a></li>
        <li><strong>Adres:</strong> Barbaros Mahallesi, Begonya Sokak, No:1, 34746 Ataşehir/İstanbul</li>
      </ul>
      <p>Bu gizlilik politikasını, H-AR XaPP platformunu kullanmadan önce okumanızı ve anlamanızı öneriyoruz. Platformu kullanmaya devam etmeniz, bu politikayı kabul ettiğiniz anlamına gelir.</p>
    </>
  );

  const lastUpdatedDate = "01.09.2023";

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Başlık */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Yasal
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Gizlilik Politikası
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              H-AR XaPP platformunu kullanırken verilerinizi nasıl işlediğimiz ve koruduğumuz hakkında bilgi.
            </p>
            
            <div className="mt-6 text-sm text-gray-500">
              Son güncelleme: {lastUpdatedDate}
            </div>
          </motion.div>
          
          {/* İçindekiler */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 mb-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-bold text-lg mb-4">İçindekiler</h2>
            <ul className="space-y-2">
              {policySections.map((section) => (
                <li key={section.id}>
                  <a 
                    href={`#${section.id}`}
                    className="text-primary hover:underline flex items-center"
                  >
                    <span className="mr-2">•</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#haklariniz"
                  className="text-primary hover:underline flex items-center"
                >
                  <span className="mr-2">•</span>
                  <span>Haklarınız ve KVKK</span>
                </a>
              </li>
              <li>
                <a 
                  href="#iletisim"
                  className="text-primary hover:underline flex items-center"
                >
                  <span className="mr-2">•</span>
                  <span>Değişiklikler ve İletişim</span>
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Giriş */}
          <motion.div 
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-gray-600 mb-4">
              Bu gizlilik politikası, H-AR Solutions A.Ş. ("biz", "bize" veya "H-AR Solutions") tarafından sunulan H-AR XaPP platformunu ("Platform" veya "H-AR XaPP") kullanımınız sırasında kişisel verilerinizin nasıl toplandığını, kullanıldığını, paylaşıldığını ve korunduğunu açıklamaktadır.
            </p>
            <p className="text-gray-600 mb-4">
              Kişisel verilerin korunmasını ve gizliliğini ciddiye alıyoruz. Bu nedenle, kişisel verilerinizi Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili diğer mevzuat uyarınca, işbu Gizlilik Politikası'nda belirtilen amaçlar ve sınırlar kapsamında işliyoruz.
            </p>
            <p className="text-gray-600">
              H-AR XaPP'ı kullanarak, bu Gizlilik Politikası'nda belirtilen uygulamaları kabul etmiş olursunuz. Platformumuzu kullanmadan önce bu politikayı dikkatlice okumanızı öneririz.
            </p>
          </motion.div>
          
          {/* Politika Bölümleri */}
          <div className="space-y-12">
            {policySections.map((section) => (
              <motion.div 
                key={section.id}
                id={section.id}
                className="bg-white rounded-xl shadow-md p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="flex flex-col items-start mb-4">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                </div>
                <div className="text-gray-600">
                  {section.content}
                </div>
              </motion.div>
            ))}
            
            {/* Haklarınız ve KVKK */}
            <motion.div 
              id="haklariniz"
              className="bg-white rounded-xl shadow-md p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex flex-col items-start mb-4">
                <FaUserShield className="text-primary text-3xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Haklarınız ve KVKK</h2>
              </div>
              <div className="text-gray-600">
                {rightsContent}
              </div>
            </motion.div>
            
            {/* Değişiklikler ve İletişim */}
            <motion.div 
              id="iletisim"
              className="bg-white rounded-xl shadow-md p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex flex-col items-start mb-4">
                <FaUserLock className="text-primary text-3xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Değişiklikler ve İletişim</h2>
              </div>
              <div className="text-gray-600">
                {contactContent}
              </div>
            </motion.div>
          </div>
          
          {/* Alt CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-gray-600 mb-6">
              Başka bir sorunuz mu var? Bizimle doğrudan iletişime geçin.
            </p>
            <Link 
              href="/iletisim" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              İletişime Geçin
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 