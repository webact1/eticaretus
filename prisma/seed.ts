import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

// Kaynak: https://www.ideasoft.com.tr/e-ticaret-paketleri/ (kontrol tarihi: 2026-09-23)
// Paket ozellikleri resmi sayfadaki tam liste ile birebir eslesecek sekilde
// (7 kategori, katmanli/additive yapi) girildi. Fiyatlar/kampanyalar zamanla
// degisebilir; panelden guncellenebilir.
const F = false;
const T = true;
const IDEASOFT_PACKAGES = [
  {
    slug: "starter",
    name: "Starter",
    shortDescription: "Yeni başlayanların tercihi",
    price: 39900,
    oldPrice: 49875,
    billingNote: "/yıl (3.325₺/ay)",
    campaignLabel: "%20 İndirim",
    featured: false,
    order: 0,
    values: {
      pazaryeri: { included: F, value: "Opsiyonel" },
      b2b: { included: T, value: null },
      appMarket: { included: T, value: null },
      tema: { included: T, value: "70+ Tema Seçeneği" },
      premiumTasarim: { included: F, value: null },

      temelYonetim: { included: T, value: null },
      excelYukleme: { included: T, value: null },
      dijitalUrun: { included: T, value: null },
      eIhracat: { included: F, value: null },
      cokluDil: { included: T, value: null },
      manuelSiparis: { included: F, value: null },

      aiSurumu: { included: T, value: "Temel" },
      aiToken: { included: T, value: "300.000 / ay" },
      kampanyaYonetimi: { included: T, value: null },
      caprazSatis: { included: F, value: null },
      sepetHatirlatma: { included: T, value: "Sepet Hatırlatma + Canlı Sepet İzleme" },
      terkEdilenSiparis: { included: F, value: null },
      seoAnaliz: { included: T, value: null },
      gelismisSeo: { included: F, value: null },
      anahtarKelimeAnalizi: { included: F, value: null },
      marketingHub: { included: T, value: null },
      adPilot: { included: F, value: null },
      aiGorsel: { included: F, value: null },
      aiMagaza: { included: F, value: null },
      aiRapor: { included: F, value: null },
      aiIcerik: { included: F, value: null },
      aiAnaliz: { included: F, value: null },

      odemeAltyapisi: { included: T, value: "Temel Ödeme Sistemi Entegrasyonları" },
      kargoBakiyesi: { included: F, value: null },
      eFatura: { included: T, value: null },
      indirimliKargo: { included: T, value: null },

      mobilYonetim: { included: T, value: "Yönetici Uygulaması" },
      mobilUygulama: { included: F, value: null },
      sosyalGiris: { included: T, value: null },
      kombin: { included: F, value: null },
      kisisellestirme: { included: F, value: null },
      abonelik: { included: F, value: null },
      koleksiyon: { included: F, value: null },
      akilliFiltreleme: { included: F, value: null },
      canliDestek: { included: T, value: null },

      apiWebhook: { included: F, value: null },
      domain: { included: T, value: null },
      ssl: { included: T, value: null },
      yoneticiSayisi: { included: T, value: "1" },
      urunLimiti: { included: T, value: "500 ürün" },
      trafik: { included: T, value: "2.000 GB / yıl" },
      eposta: { included: T, value: "2" },

      teknikDestek: { included: T, value: null },
      oncelikliDestek: { included: F, value: null },
      kurulumHizmeti: { included: T, value: "AI Destekli Kurulum Modülü" },
    },
  },
  {
    slug: "booster",
    name: "Booster",
    shortDescription: "İşini büyütmek isteyenlerin tercihi",
    price: 69900,
    oldPrice: 87375,
    billingNote: "/yıl (5.825₺/ay)",
    campaignLabel: "%20 İndirim",
    featured: false,
    order: 1,
    values: {
      pazaryeri: { included: T, value: "Trendyol, Hepsiburada" },
      b2b: { included: T, value: null },
      appMarket: { included: T, value: null },
      tema: { included: T, value: "Flex Lite Tema" },
      premiumTasarim: { included: F, value: null },

      temelYonetim: { included: T, value: null },
      excelYukleme: { included: T, value: null },
      dijitalUrun: { included: T, value: null },
      eIhracat: { included: F, value: null },
      cokluDil: { included: T, value: null },
      manuelSiparis: { included: F, value: null },

      aiSurumu: { included: T, value: "Temel" },
      aiToken: { included: T, value: "500.000 / ay" },
      kampanyaYonetimi: { included: T, value: null },
      caprazSatis: { included: F, value: null },
      sepetHatirlatma: { included: T, value: "Sepet Hatırlatma + Canlı Sepet İzleme" },
      terkEdilenSiparis: { included: T, value: "Terk Edilen Sipariş İzleme + Çıkış Teklif Modülü" },
      seoAnaliz: { included: T, value: null },
      gelismisSeo: { included: F, value: null },
      anahtarKelimeAnalizi: { included: F, value: null },
      marketingHub: { included: T, value: null },
      adPilot: { included: F, value: null },
      aiGorsel: { included: F, value: null },
      aiMagaza: { included: F, value: null },
      aiRapor: { included: F, value: null },
      aiIcerik: { included: F, value: null },
      aiAnaliz: { included: F, value: null },

      odemeAltyapisi: { included: T, value: "Tüm Banka ve Ödeme Sistemleri + Masterpass/Kart Saklama" },
      kargoBakiyesi: { included: T, value: "12.000₺" },
      eFatura: { included: T, value: null },
      indirimliKargo: { included: T, value: null },

      mobilYonetim: { included: T, value: "Yönetici Uygulaması" },
      mobilUygulama: { included: F, value: null },
      sosyalGiris: { included: T, value: null },
      kombin: { included: F, value: null },
      kisisellestirme: { included: F, value: null },
      abonelik: { included: F, value: null },
      koleksiyon: { included: F, value: null },
      akilliFiltreleme: { included: F, value: null },
      canliDestek: { included: T, value: null },

      apiWebhook: { included: T, value: "Opsiyonel (1 Entegrasyon)" },
      domain: { included: T, value: null },
      ssl: { included: T, value: null },
      yoneticiSayisi: { included: T, value: "3" },
      urunLimiti: { included: T, value: "Sınırsız" },
      trafik: { included: T, value: "3.000 GB / yıl" },
      eposta: { included: T, value: "5" },

      teknikDestek: { included: T, value: null },
      oncelikliDestek: { included: T, value: "Opsiyonel" },
      kurulumHizmeti: { included: T, value: "Birebir E-Ticaret Eğitimi" },
    },
  },
  {
    slug: "master",
    name: "Master",
    shortDescription: "En çok tercih edilen paket",
    price: 99900,
    oldPrice: 124875,
    billingNote: "/yıl (8.325₺/ay)",
    campaignLabel: "%20 İndirim · En Popüler",
    featured: true,
    order: 2,
    values: {
      pazaryeri: { included: T, value: "Trendyol, Hepsiburada, N11, Amazon, TEMU" },
      b2b: { included: T, value: null },
      appMarket: { included: T, value: null },
      tema: { included: T, value: "Flex Pro Tema" },
      premiumTasarim: { included: T, value: "Opsiyonel" },

      temelYonetim: { included: T, value: null },
      excelYukleme: { included: T, value: null },
      dijitalUrun: { included: T, value: null },
      eIhracat: { included: F, value: null },
      cokluDil: { included: T, value: null },
      manuelSiparis: { included: T, value: null },

      aiSurumu: { included: T, value: "Temel" },
      aiToken: { included: T, value: "750.000 / ay" },
      kampanyaYonetimi: { included: T, value: null },
      caprazSatis: { included: T, value: "Gelişmiş Kampanya Yönetimi + Çapraz Satış/Promosyon" },
      sepetHatirlatma: { included: T, value: "Sepet Hatırlatma + Canlı Sepet İzleme" },
      terkEdilenSiparis: { included: T, value: "Terk Edilen Sipariş İzleme + Çıkış Teklif Modülü" },
      seoAnaliz: { included: T, value: null },
      gelismisSeo: { included: T, value: "Gelişmiş SEO Yönetimi + Rakip SEO Analizi" },
      anahtarKelimeAnalizi: { included: F, value: null },
      marketingHub: { included: T, value: null },
      adPilot: { included: T, value: "10.000₺ Reklam Desteği" },
      aiGorsel: { included: F, value: null },
      aiMagaza: { included: F, value: null },
      aiRapor: { included: F, value: null },
      aiIcerik: { included: F, value: null },
      aiAnaliz: { included: F, value: null },

      odemeAltyapisi: { included: T, value: "Tüm Banka ve Ödeme Sistemleri + Masterpass/Kart Saklama" },
      kargoBakiyesi: { included: T, value: "24.000₺" },
      eFatura: { included: T, value: null },
      indirimliKargo: { included: T, value: null },

      mobilYonetim: { included: T, value: "Yönetici Uygulaması" },
      mobilUygulama: { included: F, value: null },
      sosyalGiris: { included: T, value: null },
      kombin: { included: T, value: null },
      kisisellestirme: { included: T, value: null },
      abonelik: { included: T, value: "Opsiyonel" },
      koleksiyon: { included: T, value: "Opsiyonel" },
      akilliFiltreleme: { included: T, value: null },
      canliDestek: { included: T, value: null },

      apiWebhook: { included: T, value: "Opsiyonel (5 Entegrasyon)" },
      domain: { included: T, value: null },
      ssl: { included: T, value: null },
      yoneticiSayisi: { included: T, value: "10" },
      urunLimiti: { included: T, value: "Sınırsız" },
      trafik: { included: T, value: "5.000 GB / yıl" },
      eposta: { included: T, value: "15" },

      teknikDestek: { included: T, value: null },
      oncelikliDestek: { included: T, value: "Opsiyonel" },
      kurulumHizmeti: { included: T, value: "Birebir E-Ticaret Eğitimi" },
    },
  },
  {
    slug: "master-plus",
    name: "Master+",
    shortDescription: "Fark yaratmak isteyenler için tam çözüm",
    price: 134900,
    oldPrice: 168625,
    billingNote: "/yıl (11.242₺/ay)",
    campaignLabel: "%20 İndirim · 70.000₺ Değerinde Hediye",
    featured: false,
    order: 3,
    values: {
      pazaryeri: { included: T, value: "Sınırsız Entegrasyon" },
      b2b: { included: T, value: null },
      appMarket: { included: T, value: null },
      tema: { included: T, value: "Flex Pro Tema" },
      premiumTasarim: { included: T, value: "Opsiyonel" },

      temelYonetim: { included: T, value: null },
      excelYukleme: { included: T, value: null },
      dijitalUrun: { included: T, value: null },
      eIhracat: { included: T, value: "ideasoft Export Modülü + Kurulum Hizmeti" },
      cokluDil: { included: T, value: null },
      manuelSiparis: { included: T, value: null },

      aiSurumu: { included: T, value: "Gelişmiş" },
      aiToken: { included: T, value: "1.000.000 / ay" },
      kampanyaYonetimi: { included: T, value: null },
      caprazSatis: { included: T, value: "Gelişmiş Kampanya Yönetimi + Çapraz Satış/Promosyon" },
      sepetHatirlatma: { included: T, value: "Sepet Hatırlatma + Canlı Sepet İzleme" },
      terkEdilenSiparis: { included: T, value: "Terk Edilen Sipariş İzleme + Çıkış Teklif Modülü" },
      seoAnaliz: { included: T, value: null },
      gelismisSeo: { included: T, value: "Gelişmiş SEO Yönetimi + Rakip SEO Analizi" },
      anahtarKelimeAnalizi: {
        included: T,
        value: "Rakip Anahtar Kelime + İçerik/Link Analizi + AI Görünürlük Takibi",
      },
      marketingHub: { included: T, value: null },
      adPilot: { included: T, value: "35.000₺ Reklam Desteği" },
      aiGorsel: { included: T, value: null },
      aiMagaza: { included: T, value: null },
      aiRapor: { included: T, value: null },
      aiIcerik: { included: T, value: null },
      aiAnaliz: { included: T, value: null },

      odemeAltyapisi: { included: T, value: "Tüm Banka ve Ödeme Sistemleri + Masterpass/Kart Saklama" },
      kargoBakiyesi: { included: T, value: "36.000₺" },
      eFatura: { included: T, value: null },
      indirimliKargo: { included: T, value: null },

      mobilYonetim: { included: T, value: "Yönetici Uygulaması" },
      mobilUygulama: { included: T, value: "Müşteri Mobil Uygulaması" },
      sosyalGiris: { included: T, value: null },
      kombin: { included: T, value: null },
      kisisellestirme: { included: T, value: null },
      abonelik: { included: T, value: "Opsiyonel" },
      koleksiyon: { included: T, value: "Opsiyonel" },
      akilliFiltreleme: { included: T, value: null },
      canliDestek: { included: T, value: null },

      apiWebhook: { included: T, value: "Opsiyonel (5 Entegrasyon)" },
      domain: { included: T, value: null },
      ssl: { included: T, value: null },
      yoneticiSayisi: { included: T, value: "15" },
      urunLimiti: { included: T, value: "Sınırsız" },
      trafik: { included: T, value: "5.000 GB / yıl" },
      eposta: { included: T, value: "25" },

      teknikDestek: { included: T, value: null },
      oncelikliDestek: { included: T, value: "Opsiyonel" },
      kurulumHizmeti: { included: T, value: "ideasoft Setup Kurulum Hizmeti" },
    },
  },
] as const;

// Kategori ve özellik adları, resmi sayfadaki 7 bölüm başlığıyla birebir eşleşir.
const FEATURE_CATEGORIES = [
  {
    name: "Satışa Hazır Altyapı",
    order: 0,
    features: [
      { key: "pazaryeri", name: "Pazaryeri Entegrasyonları", order: 0 },
      { key: "b2b", name: "B2B & Toptan Satış Altyapısı", order: 1 },
      { key: "appMarket", name: "Uygulama Mağazası Erişimi", order: 2 },
      { key: "tema", name: "Profesyonel Tema & Tasarım", order: 3 },
      { key: "premiumTasarim", name: "Özel Premium Tasarım Hizmeti", order: 4 },
    ],
  },
  {
    name: "Ürün & Sipariş Operasyonları",
    order: 1,
    features: [
      { key: "temelYonetim", name: "Temel Ürün ve Sipariş Yönetimi", order: 0 },
      { key: "excelYukleme", name: "Excel ile Toplu Ürün Yükleme", order: 1 },
      { key: "dijitalUrun", name: "Dijital Ürün Satışı", order: 2 },
      { key: "manuelSiparis", name: "Manuel Sipariş Kaydetme", order: 3 },
      { key: "eIhracat", name: "ideasoft Export E-İhracat Modülü", order: 4 },
      { key: "cokluDil", name: "Çoklu Dil / Çoklu Para Birimi", order: 5 },
    ],
  },
  {
    name: "Satışlarınızı Büyütün",
    order: 2,
    features: [
      { key: "aiSurumu", name: "ideasoft AI Sürümü", order: 0 },
      { key: "aiToken", name: "Yapay Zekâ Asistanı (Aylık Token)", order: 1 },
      { key: "kampanyaYonetimi", name: "Kampanya ve İndirim Yönetimi", order: 2 },
      { key: "caprazSatis", name: "Gelişmiş Kampanya ve Çapraz Satış", order: 3 },
      { key: "sepetHatirlatma", name: "Sepet Hatırlatma ve Canlı Sepet İzleme", order: 4 },
      { key: "terkEdilenSiparis", name: "Terk Edilen Sipariş İzleme ve Çıkış Teklifi", order: 5 },
      { key: "seoAnaliz", name: "SEO Analiz", order: 6 },
      { key: "gelismisSeo", name: "Gelişmiş SEO Yönetimi ve Rakip Analizi", order: 7 },
      { key: "anahtarKelimeAnalizi", name: "Rakip Anahtar Kelime ve İçerik Analizi", order: 8 },
      { key: "marketingHub", name: "ideasoft Marketing Hub (E-posta/SMS)", order: 9 },
      { key: "adPilot", name: "ideasoft AdPilot Reklam Desteği", order: 10 },
      { key: "aiGorsel", name: "AI ile Ürün Görsel Düzenleme", order: 11 },
      { key: "aiMagaza", name: "AI Mağaza Yönetimi", order: 12 },
      { key: "aiRapor", name: "AI Rapor Oluşturucu", order: 13 },
      { key: "aiIcerik", name: "AI Ürün İçerik Oluşturucu", order: 14 },
      { key: "aiAnaliz", name: "AI Analiz Modülü", order: 15 },
    ],
  },
  {
    name: "Satıştan Ödemeye",
    order: 3,
    features: [
      { key: "odemeAltyapisi", name: "Ödeme Sistemi Entegrasyonları", order: 0 },
      { key: "kargoBakiyesi", name: "Kargo Bakiyesi Hediyesi", order: 1 },
      { key: "eFatura", name: "E-Fatura & E-Arşiv Entegrasyonu", order: 2 },
      { key: "indirimliKargo", name: "İndirimli Kargo Anlaşmaları", order: 3 },
    ],
  },
  {
    name: "Kullanıcı Deneyimini Güçlendirin",
    order: 4,
    features: [
      { key: "mobilYonetim", name: "Mobil Yönetim Paneli Uygulaması", order: 0 },
      { key: "mobilUygulama", name: "Mobil Alışveriş Uygulaması", order: 1 },
      { key: "sosyalGiris", name: "Sosyal Hesapla Hızlı Giriş", order: 2 },
      { key: "kombin", name: "Kombin Modülü", order: 3 },
      { key: "kisisellestirme", name: "Ürün Kişiselleştirme", order: 4 },
      { key: "abonelik", name: "Abonelik Modülü", order: 5 },
      { key: "koleksiyon", name: "Koleksiyon Modülü", order: 6 },
      { key: "akilliFiltreleme", name: "Akıllı Ürün Filtreleme", order: 7 },
      { key: "canliDestek", name: "Canlı Destek, WhatsApp ve Ticket Sistemi", order: 8 },
    ],
  },
  {
    name: "Güçlü Mağaza Altyapısı",
    order: 5,
    features: [
      { key: "apiWebhook", name: "API ve Webhook Erişimi", order: 0 },
      { key: "domain", name: "Ücretsiz Alan Adı (Domain)", order: 1 },
      { key: "ssl", name: "256-bit SSL Güvenlik", order: 2 },
      { key: "yoneticiSayisi", name: "Yönetici Kullanıcı Hakkı", order: 3 },
      { key: "urunLimiti", name: "Ürün Ekleme Hakkı", order: 4 },
      { key: "trafik", name: "Yıllık Trafik", order: 5 },
      { key: "eposta", name: "Kurumsal E-posta Hesabı", order: 6 },
    ],
  },
  {
    name: "Uzman Desteği",
    order: 6,
    features: [
      { key: "teknikDestek", name: "7/24 Teknik Destek", order: 0 },
      { key: "oncelikliDestek", name: "Öncelikli Destek", order: 1 },
      { key: "kurulumHizmeti", name: "Danışmanlık ve Kurulum Hizmeti", order: 2 },
    ],
  },
];

const WHY_US_POINTS = [
  {
    title: "İşletmenize Uygun Altyapı Seçimi",
    description:
      "Ölçeğinize ve hedeflerinize göre IdeaSoft paketleri arasından size en uygun altyapıyı birlikte belirliyoruz.",
    icon: "Compass",
    order: 0,
  },
  {
    title: "Kurulum ve Teknik Yapılandırma",
    description:
      "Ödeme sistemleri, kargo entegrasyonları ve temel yapılandırmaları sizin için uçtan uca kuruyoruz.",
    icon: "Settings2",
    order: 1,
  },
  {
    title: "SEO Uyumlu Altyapı",
    description:
      "Site yapısını Google standartlarına uygun şekilde kurarak arama motorlarındaki görünürlüğünüzü güçlendiriyoruz.",
    icon: "Search",
    order: 2,
  },
  {
    title: "Satış Öncesi ve Sonrası Destek",
    description:
      "Karar aşamasından yayına almaya, sonrasındaki teknik destek süreçlerine kadar yanınızda oluyoruz.",
    icon: "Handshake",
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
// Logo dosyaları ideasoft.com.tr'nin ilgili sayfalarından indirilip public/images/logos
// altına eklendi (hotlink edilmiyor).
const REFERENCE_LOGOS = [
  { brandName: "Bosch", file: "bosch.png" },
  { brandName: "İstikbal", file: "istikbal.png" },
  { brandName: "Petlas", file: "petlas.png" },
  { brandName: "Koleksiyon", file: "koleksiyon.png" },
  { brandName: "Haribo", file: "haribo.png" },
  { brandName: "Polisan", file: "polisan.png" },
  { brandName: "Koska", file: "koska.png" },
  { brandName: "Doğuş", file: "dogus.png" },
  { brandName: "Bilfen", file: "bilfen.png" },
  { brandName: "TFF", file: "tff.png" },
  { brandName: "Bernardo", file: "bernardo.png" },
  { brandName: "Toys'R'Us", file: "toysrus.png" },
  { brandName: "Koroplast", file: "koroplast.png" },
];

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
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main", whatsappAvatarUrl: "/images/whatsapp-danisman.webp" },
  });
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
    const { brandName, file } = REFERENCE_LOGOS[i];
    const logoUrl = `/images/logos/${file}`;
    await prisma.referenceLogo.upsert({
      where: { id: `seed-logo-${i}` },
      update: { brandName, order: i, logoUrl },
      create: {
        id: `seed-logo-${i}`,
        brandName,
        altText: `${brandName} logosu`,
        order: i,
        sourceType: "ideasoft_reference",
        sourceUrl: "https://www.ideasoft.com.tr/e-ticaret-paketleri/",
        logoUrl,
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
      // Şimdilik yalnızca IdeaSoft aktif olarak gösteriliyor; Ticimax/WooCommerce
      // ileride eklendiğinde panelden "active" yapılabilir.
      status: "hidden",
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
      status: "hidden",
      order: 2,
    },
  });

  // --- Özellik kategorileri / özellikler ---
  // Onceki calismalardan kalan eski kategori/ozellik anahtarlarinin (key rename
  // sonrasi) hayalet satir olarak kalmamasi icin baştan temizleniyor; kaskad
  // silme PackageFeature satirlarini da temizler, asagida yeniden olusturuluyor.
  await prisma.featureCategory.deleteMany({});
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
