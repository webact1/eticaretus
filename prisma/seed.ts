import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

// Kaynak: https://www.ideasoft.com.tr/e-ticaret-paketleri/ (kontrol tarihi: 2026-09-23)
// Fiyatlar/kampanyalar zamanla değişebilir; panelden güncellenebilir.
const IDEASOFT_PACKAGES = [
  {
    slug: "starter",
    name: "Starter",
    shortDescription: "Yeni başlayanlar için ideal çözüm",
    price: 39900,
    oldPrice: 49875,
    billingNote: "/yıl",
    campaignLabel: "%20 İndirim",
    featured: false,
    order: 0,
    values: {
      urunLimiti: "500 ürün",
      trafik: "2.000 GB / yıl",
      yoneticiSayisi: "1",
      epostaSayisi: "2",
      pazaryeri: "Opsiyonel (Trendyol / Hepsiburada)",
      kargoBakiyesi: { included: false, value: null },
      reklamDestegi: { included: false, value: null },
      tema: "70+ Hazır Tema",
      ai: "Temel ideasoft AI",
      aiToken: "300.000 / ay",
      destek: "7/24 Teknik Destek",
      ssl: "256-bit SSL + Ücretsiz Domain",
    },
  },
  {
    slug: "booster",
    name: "Booster",
    shortDescription: "İşini büyütmek isteyenlerin tercihi",
    price: 69900,
    oldPrice: 87375,
    billingNote: "/yıl",
    campaignLabel: "%20 İndirim",
    featured: false,
    order: 1,
    values: {
      urunLimiti: "Sınırsız",
      trafik: "3.000 GB / yıl",
      yoneticiSayisi: "3",
      epostaSayisi: "5",
      pazaryeri: "Trendyol, Hepsiburada",
      kargoBakiyesi: { included: true, value: "12.000₺ Kargo Bakiyesi" },
      reklamDestegi: { included: false, value: null },
      tema: "Flex Lite Tema",
      ai: "Temel ideasoft AI",
      aiToken: "500.000 / ay",
      destek: "7/24 Teknik Destek",
      ssl: "256-bit SSL + Ücretsiz Domain",
    },
  },
  {
    slug: "master",
    name: "Master",
    shortDescription: "En çok tercih edilen paket",
    price: 99900,
    oldPrice: 124875,
    billingNote: "/yıl",
    campaignLabel: "%20 İndirim · En Popüler",
    featured: true,
    order: 2,
    values: {
      urunLimiti: "Sınırsız",
      trafik: "5.000 GB / yıl",
      yoneticiSayisi: "10",
      epostaSayisi: "15",
      pazaryeri: "Trendyol, Hepsiburada, N11, Amazon, TEMU",
      kargoBakiyesi: { included: true, value: "24.000₺ Kargo Bakiyesi" },
      reklamDestegi: { included: true, value: "10.000₺ Reklam Desteği" },
      tema: "Flex Pro Tema",
      ai: "Gelişmiş ideasoft AI",
      aiToken: "750.000 / ay",
      destek: "7/24 Teknik Destek",
      ssl: "256-bit SSL + Ücretsiz Domain",
    },
  },
  {
    slug: "master-plus",
    name: "Master+",
    shortDescription: "Fark yaratmak isteyenler için tam çözüm",
    price: 134900,
    oldPrice: 168625,
    billingNote: "/yıl",
    campaignLabel: "%20 İndirim",
    featured: false,
    order: 3,
    values: {
      urunLimiti: "Sınırsız",
      trafik: "5.000 GB / yıl",
      yoneticiSayisi: "15",
      epostaSayisi: "25",
      pazaryeri: "Sınırsız Entegrasyon",
      kargoBakiyesi: { included: true, value: "36.000₺ Kargo Bakiyesi" },
      reklamDestegi: { included: true, value: "35.000₺ Reklam Desteği" },
      tema: "Flex Pro Tema",
      ai: "Gelişmiş ideasoft AI + Görsel/İçerik Üretimi",
      aiToken: "1.000.000 / ay",
      destek: "7/24 Teknik Destek",
      ssl: "256-bit SSL + Ücretsiz Domain",
    },
  },
] as const;

const FEATURE_CATEGORIES = [
  {
    name: "Altyapı ve Kapasite",
    order: 0,
    features: [
      { key: "urunLimiti", name: "Ürün Yükleme Limiti", order: 0 },
      { key: "trafik", name: "Yıllık Trafik", order: 1 },
      { key: "yoneticiSayisi", name: "Yönetici Kullanıcı Sayısı", order: 2 },
      { key: "epostaSayisi", name: "Kurumsal E-posta Hesabı", order: 3 },
    ],
  },
  {
    name: "Pazaryeri ve Büyüme",
    order: 1,
    features: [
      { key: "pazaryeri", name: "Pazaryeri Entegrasyonu", order: 0 },
      { key: "kargoBakiyesi", name: "Kargo Bakiyesi Hediyesi", order: 1 },
      { key: "reklamDestegi", name: "Reklam Desteği", order: 2 },
    ],
  },
  {
    name: "Tasarım ve Yapay Zekâ",
    order: 2,
    features: [
      { key: "tema", name: "Tema Paketi", order: 0 },
      { key: "ai", name: "ideasoft AI", order: 1 },
      { key: "aiToken", name: "Aylık AI Token", order: 2 },
    ],
  },
  {
    name: "Destek ve Güvenlik",
    order: 3,
    features: [
      { key: "destek", name: "Teknik Destek", order: 0 },
      { key: "ssl", name: "SSL ve Domain", order: 1 },
    ],
  },
];

const WHY_US_POINTS = [
  {
    title: "İşletmenize Uygun Altyapı Seçimi",
    description:
      "Ölçeğinize ve hedeflerinize göre IdeaSoft, Ticimax veya WooCommerce arasından size en uygun altyapıyı birlikte belirliyoruz.",
    icon: "🧭",
    order: 0,
  },
  {
    title: "Kurulum ve Teknik Yapılandırma",
    description:
      "Ödeme sistemleri, kargo entegrasyonları ve temel yapılandırmaları sizin için uçtan uca kuruyoruz.",
    icon: "⚙️",
    order: 1,
  },
  {
    title: "SEO Uyumlu Altyapı",
    description:
      "Site yapısını Google standartlarına uygun şekilde kurarak arama motorlarındaki görünürlüğünüzü güçlendiriyoruz.",
    icon: "🔍",
    order: 2,
  },
  {
    title: "Satış Öncesi ve Sonrası Destek",
    description:
      "Karar aşamasından yayına almaya, sonrasındaki teknik destek süreçlerine kadar yanınızda oluyoruz.",
    icon: "🤝",
    order: 3,
  },
];

const PROCESS_STEPS = [
  { stepNumber: 1, title: "İhtiyacınızı Dinliyoruz", description: "İşletmenizin yapısını ve hedeflerinizi anlamak için kısa bir görüşme yapıyoruz.", order: 0 },
  { stepNumber: 2, title: "Uygun Altyapıyı Belirliyoruz", description: "İhtiyaçlarınıza en uygun e-ticaret altyapısını ve paketi birlikte seçiyoruz.", order: 1 },
  { stepNumber: 3, title: "Kurulum Sürecini Planlıyoruz", description: "Ödeme, kargo ve temel yapılandırmaları planlayıp adım adım kuruyoruz.", order: 2 },
  { stepNumber: 4, title: "Yayına Alma ve Destek Sürecini Yönetiyoruz", description: "Siteniz yayına alındıktan sonra da teknik destek sürecinizi yönetmeye devam ediyoruz.", order: 3 },
];

const SERVICES = [
  { slug: "e-ticaret-danismanligi", name: "E-Ticaret Danışmanlığı", shortDescription: "İşletmenize uygun altyapı ve büyüme stratejisini birlikte belirliyoruz.", icon: "MessageCircle", order: 0 },
  { slug: "e-ticaret-sitesi-kurulumu", name: "E-Ticaret Sitesi Kurulumu", shortDescription: "Seçtiğiniz altyapıda mağazanızı uçtan uca kurup yayına alıyoruz.", icon: "Store", order: 1 },
  { slug: "tema-arayuz-duzenlemeleri", name: "Tema / Arayüz Düzenlemeleri", shortDescription: "Mağazanızın görünümünü markanıza uygun şekilde özelleştiriyoruz.", icon: "Palette", order: 2 },
  { slug: "seo", name: "SEO", shortDescription: "Arama motorlarında görünürlüğünüzü artıracak teknik ve içerik SEO çalışmaları yapıyoruz.", icon: "Search", order: 3 },
  { slug: "geo", name: "GEO", shortDescription: "Yapay zekâ destekli arama deneyimlerinde markanızın görünürlüğünü güçlendiriyoruz.", icon: "Sparkles", order: 4 },
  { slug: "google-kurulumlari", name: "Google Kurulumları", shortDescription: "Google Analytics, Search Console ve Tag Manager kurulumlarını yapıyoruz.", icon: "BarChart3", order: 5 },
  { slug: "pazaryeri-entegrasyonlari", name: "Pazaryeri Entegrasyonları", shortDescription: "Trendyol, Hepsiburada ve diğer pazaryerlerine entegrasyon sağlıyoruz.", icon: "Store", order: 6 },
  { slug: "odeme-sistemleri", name: "Ödeme Sistemleri", shortDescription: "Güvenli ve uygun maliyetli ödeme altyapılarını mağazanıza entegre ediyoruz.", icon: "CreditCard", order: 7 },
  { slug: "kargo-entegrasyonlari", name: "Kargo Entegrasyonları", shortDescription: "Anlaşmalı kargo firmalarıyla otomatik kargo süreçleri kuruyoruz.", icon: "Truck", order: 8 },
  { slug: "reklam-ve-buyume-hizmetleri", name: "Reklam ve Büyüme Hizmetleri", shortDescription: "Google ve sosyal medya reklamlarıyla mağazanızın satışlarını büyütüyoruz.", icon: "TrendingUp", order: 9 },
];

const FAQS = [
  { question: "IdeaSoft paketleri neleri kapsıyor?", answer: "Her IdeaSoft paketi; tema, ürün yükleme limiti, yönetici kullanıcı sayısı, pazaryeri entegrasyonları ve destek seviyesi açısından farklılaşır. Detaylı karşılaştırmayı Paketler sayfasında bulabilirsiniz.", order: 0 },
  { question: "Kurulum süreci ne kadar sürüyor?", answer: "Süreç, seçtiğiniz pakete ve ihtiyaçlarınıza göre değişir. İhtiyacınızı dinledikten sonra size net bir zaman planı sunuyoruz.", order: 1 },
  { question: "Pazaryeri entegrasyonları hangi platformları kapsıyor?", answer: "Trendyol, Hepsiburada, N11, Amazon ve TEMU gibi pazaryerlerine entegrasyon sağlanabiliyor; kapsam seçtiğiniz pakete göre değişir.", order: 2 },
  { question: "Destek hizmeti nasıl sağlanıyor?", answer: "WhatsApp ve teknik destek hattı üzerinden 7/24 destek sağlanmaktadır.", order: 3 },
  { question: "Mevcut e-ticaret sitemi eticaretus üzerinden büyütebilir miyim?", answer: "Evet. Mevcut altyapınızı değerlendirip büyüme hedeflerinize uygun bir plan çıkarabiliriz.", order: 4 },
];

// Kaynak: https://www.ideasoft.com.tr/e-ticaret-paketleri/ ve /referanslar/ (kontrol tarihi: 2026-09-23)
// Bunlar eticaretus müşterisi değil, IdeaSoft'un resmi referanslarıdır — bu ayrım korunmalıdır.
const REFERENCE_LOGOS = ["Bosch", "İstikbal", "Petlas", "Koleksiyon", "Haribo", "Polisan", "Koska", "Doğuş", "Bilfen"];

// Kaynak: https://www.ideasoft.com.tr/referanslar/ ve /sayfa/musteri-yorumlari/ (kontrol tarihi: 2026-09-23)
// Orijinal alıntılar parafraze edilmiştir; birebir kopya değildir.
const TESTIMONIALS = [
  {
    personName: "Sami Koen",
    brandName: "Trek Bisiklet",
    domain: "trekbisiklet.com.tr",
    quote: "IdeaSoft altyapısıyla kurduğumuz mağaza, fiziki mağazamızdan bile daha güçlü bir görünüme kavuştu.",
    sourceUrl: "https://www.ideasoft.com.tr/referanslar/",
    order: 0,
  },
  {
    personName: "Esra Silek",
    brandName: "Koleksiyon Online",
    domain: "koleksiyononline.com",
    quote: "Beklentilerimize hızlı ve doğru çözümler sundukları için iş birliğimiz yıllardır sürüyor.",
    sourceUrl: "https://www.ideasoft.com.tr/referanslar/",
    order: 1,
  },
  {
    personName: "Oğuzhan Sayı",
    brandName: "Özzie's Kokoreç",
    domain: "ozzieskokorec.com",
    quote: "Kokoreçte olduğu gibi e-ticarette de öne çıktık; Türkiye'nin 81 iline satış yapabiliyoruz.",
    sourceUrl: "https://www.ideasoft.com.tr/referanslar/",
    order: 2,
  },
  {
    personName: "Nezihe Filiz Toker",
    brandName: "Bone Sante",
    domain: "bonesante.com",
    quote: "IdeaSoft ile çalışmak sorunsuz bir deneyim sundu; markamızı Türkiye çapında satışa taşıdık.",
    sourceUrl: "https://www.ideasoft.com.tr/sayfa/musteri-yorumlari/",
    order: 3,
  },
  {
    personName: "Ceylan Kendir & Tuğçe Erkaya",
    brandName: "Misafirliq",
    domain: "misafirliq.com",
    quote: "Online catering sistemimizi kurarken aldığımız e-ticaret eğitimi süreci çok değerliydi.",
    sourceUrl: "https://www.ideasoft.com.tr/sayfa/musteri-yorumlari/",
    order: 4,
  },
];

async function main() {
  // --- Admin kullanıcı ---
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@eticaretus.com.tr";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "change-me";
  const adminName = process.env.ADMIN_NAME ?? "Admin";
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: { email: adminEmail, name: adminName, passwordHash: await bcrypt.hash(adminPassword, 10) },
    });
    console.log(`✔ Admin kullanıcı oluşturuldu: ${adminEmail}`);
  } else {
    console.log(`• Admin kullanıcı zaten var: ${adminEmail}`);
  }

  // --- Site ayarları & ana sayfa içerikleri (varsayılanlar şemada tanımlı) ---
  await prisma.siteSettings.upsert({ where: { id: "main" }, update: {}, create: { id: "main" } });
  await prisma.homeContent.upsert({ where: { id: "main" }, update: {}, create: { id: "main" } });

  // --- Neden Biz / Süreç / Hizmetler / SSS ---
  for (const point of WHY_US_POINTS) {
    await prisma.whyUsPoint.upsert({ where: { id: `seed-why-${point.order}` }, update: point, create: { id: `seed-why-${point.order}`, ...point } });
  }
  for (const step of PROCESS_STEPS) {
    await prisma.processStep.upsert({ where: { id: `seed-step-${step.stepNumber}` }, update: step, create: { id: `seed-step-${step.stepNumber}`, ...step } });
  }
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: { ...service, description: service.shortDescription },
    });
  }
  for (const faq of FAQS) {
    await prisma.faq.upsert({ where: { id: `seed-faq-${faq.order}` }, update: faq, create: { id: `seed-faq-${faq.order}`, ...faq } });
  }

  // --- Referans logolar ---
  for (let i = 0; i < REFERENCE_LOGOS.length; i++) {
    const brandName = REFERENCE_LOGOS[i];
    await prisma.referenceLogo.upsert({
      where: { id: `seed-logo-${i}` },
      update: { brandName, order: i },
      create: {
        id: `seed-logo-${i}`,
        brandName,
        altText: `${brandName} logosu`,
        order: i,
        sourceType: "ideasoft_reference",
        sourceUrl: "https://www.ideasoft.com.tr/e-ticaret-paketleri/",
      },
    });
  }

  // --- Testimonial'lar ---
  for (const t of TESTIMONIALS) {
    await prisma.testimonial.upsert({
      where: { id: `seed-testimonial-${t.order}` },
      update: t,
      create: { id: `seed-testimonial-${t.order}`, ...t, sourceType: "ideasoft" },
    });
  }

  // --- IdeaSoft sağlayıcısı ---
  const ideasoft = await prisma.provider.upsert({
    where: { slug: "ideasoft" },
    update: {},
    create: {
      slug: "ideasoft",
      name: "IdeaSoft",
      shortDescription: "Türkiye'nin güvenilir e-ticaret altyapısı",
      description:
        "IdeaSoft, 20.000'in üzerinde işletmenin tercih ettiği, pazaryeri entegrasyonları ve SEO uyumlu altyapısıyla güçlü bir e-ticaret çözümüdür. eticaretus olarak IdeaSoft'un resmi iş ortağıyız; paket seçiminden kuruluma, satış sonrası desteğe kadar sürecinizi yönetiyoruz.",
      advantages: JSON.stringify([
        "Güçlü ve güvenli altyapı",
        "Trendyol, Hepsiburada, N11 ve diğer pazaryeri entegrasyonları",
        "Mobil uyumlu, hızlı açılan mağaza",
        "SEO ve satış odaklı altyapı",
      ]),
      suitableFor: "Yeni başlayan girişimlerden büyüyen kurumsal markalara kadar her ölçekte işletme.",
      status: "active",
      order: 0,
      seoTitle: "IdeaSoft E-Ticaret Altyapısı ve Paketleri",
      seoDescription:
        "IdeaSoft e-ticaret altyapısı ile mağazanızı kurun. Starter, Booster, Master ve Master+ paketlerini karşılaştırın, eticaretus ile danışmanlık alın.",
    },
  });

  await prisma.provider.upsert({
    where: { slug: "ticimax" },
    update: {},
    create: {
      slug: "ticimax",
      name: "Ticimax",
      shortDescription: "Yakında eticaretus çözümleri arasında.",
      description: "Ticimax altyapısı için detaylı içerik yakında eklenecektir.",
      advantages: JSON.stringify([]),
      status: "coming_soon",
      order: 1,
    },
  });

  await prisma.provider.upsert({
    where: { slug: "woocommerce" },
    update: {},
    create: {
      slug: "woocommerce",
      name: "WooCommerce",
      shortDescription: "Yakında eticaretus çözümleri arasında.",
      description: "WooCommerce altyapısı için detaylı içerik yakında eklenecektir.",
      advantages: JSON.stringify([]),
      status: "coming_soon",
      order: 2,
    },
  });

  // --- Özellik kategorileri / özellikler ---
  const featureIdByKey = new Map<string, string>();
  for (const category of FEATURE_CATEGORIES) {
    const cat = await prisma.featureCategory.upsert({
      where: { id: `seed-cat-${category.order}` },
      update: { name: category.name, order: category.order },
      create: { id: `seed-cat-${category.order}`, name: category.name, order: category.order },
    });
    for (const feature of category.features) {
      const feat = await prisma.feature.upsert({
        where: { id: `seed-feature-${feature.key}` },
        update: { name: feature.name, order: feature.order, categoryId: cat.id },
        create: { id: `seed-feature-${feature.key}`, name: feature.name, order: feature.order, categoryId: cat.id },
      });
      featureIdByKey.set(feature.key, feat.id);
    }
  }

  // --- Paketler ---
  for (const pkg of IDEASOFT_PACKAGES) {
    const created = await prisma.package.upsert({
      where: { providerId_slug: { providerId: ideasoft.id, slug: pkg.slug } },
      update: {
        name: pkg.name,
        shortDescription: pkg.shortDescription,
        price: pkg.price,
        oldPrice: pkg.oldPrice,
        billingNote: pkg.billingNote,
        campaignLabel: pkg.campaignLabel,
        featured: pkg.featured,
        order: pkg.order,
      },
      create: {
        providerId: ideasoft.id,
        slug: pkg.slug,
        name: pkg.name,
        shortDescription: pkg.shortDescription,
        price: pkg.price,
        oldPrice: pkg.oldPrice,
        billingNote: pkg.billingNote,
        campaignLabel: pkg.campaignLabel,
        featured: pkg.featured,
        order: pkg.order,
      },
    });

    for (const [key, raw] of Object.entries(pkg.values)) {
      const featureId = featureIdByKey.get(key);
      if (!featureId) continue;
      const isObj = typeof raw === "object" && raw !== null;
      const included = isObj ? (raw as { included: boolean }).included : true;
      const value = isObj ? (raw as { value: string | null }).value ?? undefined : (raw as string);
      await prisma.packageFeature.upsert({
        where: { packageId_featureId: { packageId: created.id, featureId } },
        update: { included, value },
        create: { packageId: created.id, featureId, included, value },
      });
    }
  }

  // --- Kurumsal sayfalar ---
  await prisma.page.upsert({
    where: { slug: "hakkimizda" },
    update: {},
    create: {
      slug: "hakkimizda",
      title: "Hakkımızda",
      content:
        "eticaretus, işletmelerin doğru e-ticaret altyapısını seçmesine, kurmasına ve büyütmesine yardımcı olmak için kurulmuştur. IdeaSoft'un resmi iş ortağı olarak; ihtiyaç analizinden kuruluma, satış sonrası teknik destekten pazaryeri entegrasyonlarına kadar sürecin her adımında işletmelerin yanında oluyoruz. Amacımız yalnızca bir altyapı satmak değil, işletmenizin e-ticaret yolculuğunda güvenilir bir çözüm ortağı olmaktır.",
      seoTitle: "Hakkımızda",
      seoDescription: "eticaretus, işletmelere doğru e-ticaret altyapısını seçme, kurma ve büyütme sürecinde danışmanlık ve destek sağlar.",
    },
  });

  await prisma.page.upsert({
    where: { slug: "kvkk" },
    update: {},
    create: {
      slug: "kvkk",
      title: "KVKK Aydınlatma Metni",
      content:
        "Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında eticaretus.com.tr ziyaretçilerini bilgilendirmek amacıyla hazırlanmıştır. Şirket unvanı, adres ve iletişim bilgileri Genel Ayarlar üzerinden güncellendiğinde bu metin de gözden geçirilmelidir. Sitemiz üzerinden form doldurarak veya WhatsApp üzerinden iletişime geçen kullanıcıların ad-soyad, telefon, e-posta ve mesaj içerikleri; talebinizi değerlendirmek ve sizinle iletişime geçmek amacıyla işlenir. Verileriniz üçüncü taraflarla, yasal zorunluluklar dışında paylaşılmaz. KVKK kapsamındaki haklarınızı kullanmak için iletişim sayfamızdaki bilgilerden bize ulaşabilirsiniz.",
      seoTitle: "KVKK Aydınlatma Metni",
      noindex: true,
    },
  });

  await prisma.page.upsert({
    where: { slug: "gizlilik-politikasi" },
    update: {},
    create: {
      slug: "gizlilik-politikasi",
      title: "Gizlilik Politikası",
      content:
        "eticaretus.com.tr, ziyaretçilerinin gizliliğini korumayı taahhüt eder. Sitemiz üzerinden paylaştığınız iletişim bilgileri yalnızca talebinizi değerlendirmek ve sizinle iletişime geçmek amacıyla kullanılır, üçüncü taraflarla pazarlama amacıyla paylaşılmaz. Sitemizde kullanılan analiz ve reklam teknolojileri (Google Analytics, Google Tag Manager, Meta Pixel vb.) hakkında detaylı bilgiye Çerez Politikamızdan ulaşabilirsiniz.",
      seoTitle: "Gizlilik Politikası",
      noindex: true,
    },
  });

  await prisma.page.upsert({
    where: { slug: "cerez-politikasi" },
    update: {},
    create: {
      slug: "cerez-politikasi",
      title: "Çerez Politikası",
      content:
        "eticaretus.com.tr, deneyiminizi iyileştirmek ve site performansını ölçmek amacıyla çerezler kullanır. Zorunlu çerezler sitenin çalışması için gereklidir; analitik çerezler (Google Analytics gibi) site kullanımını anlamamıza yardımcı olur. Tarayıcı ayarlarınızdan çerez tercihlerinizi değiştirebilirsiniz.",
      seoTitle: "Çerez Politikası",
      noindex: true,
    },
  });

  console.log("✔ Seed tamamlandı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
