import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Şu an yalnızca IdeaSoft aktif olduğu için "E-Ticaret Çözümleri" sayfası
      // kaldırıldı; içerik Paketler sayfasına taşındı.
      { source: "/e-ticaret-cozumleri", destination: "/paketler", permanent: false },
      { source: "/e-ticaret-cozumleri/:slug", destination: "/paketler", permanent: false },
    ];
  },
};

export default nextConfig;
