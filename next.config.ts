import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
