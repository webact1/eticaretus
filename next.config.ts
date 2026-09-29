import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger paylaşımlı sunucusunda Turbopack'in CSS (PostCSS) için açtığı ayrı Node süreci başlatılamıyor ve derleme düşüyor;
  // derleme webpack ile yapılıyor (package.json "build") ve paralel işçi sayısı sunucu sınırlarına göre kısılıyor.
  experimental: { cpus: 2 },
  async redirects() {
    return [
      // Şu an yalnızca IdeaSoft aktif olduğu için "E-Ticaret Çözümleri" sayfası
      // kaldırıldı; içerik Paketler sayfasına taşındı.
      { source: "/e-ticaret-cozumleri", destination: "/paketler", permanent: false },
      { source: "/e-ticaret-cozumleri/:slug", destination: "/paketler", permanent: false },
      // Search Console'da görülen eski/alternatif hizmet adresleri doğru sayfaya kalıcı yönlendirilir.
      { source: "/hizmetler/odeme-sistemleri-entegrasyonlari", destination: "/hizmetler/odeme-sistemleri", permanent: true },
    ];
  },
};

export default nextConfig;
