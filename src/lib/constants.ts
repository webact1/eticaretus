// SQLite'ta enum desteklenmediği için Prisma şemasında string kullanıldı.
// Geçerli değer setleri burada merkezi olarak tanımlanır; Server Action'larda zod ile doğrulanır.

export const PROVIDER_STATUS = ["active", "coming_soon", "hidden"] as const;
export type ProviderStatus = (typeof PROVIDER_STATUS)[number];

export const LEAD_STATUS = ["new", "contacted", "offered", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUS)[number];

export const REDIRECT_TYPE = ["permanent", "temporary"] as const;
export type RedirectType = (typeof REDIRECT_TYPE)[number];

export const REFERENCE_SOURCE_TYPE = ["ideasoft_reference", "eticaretus_reference"] as const;
export type ReferenceSourceType = (typeof REFERENCE_SOURCE_TYPE)[number];

export const TESTIMONIAL_SOURCE_TYPE = ["ideasoft", "eticaretus"] as const;
export type TestimonialSourceType = (typeof TESTIMONIAL_SOURCE_TYPE)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Yeni",
  contacted: "İletişime Geçildi",
  offered: "Teklif Verildi",
  closed: "Sonuçlandı",
};

export const PROVIDER_STATUS_LABELS: Record<ProviderStatus, string> = {
  active: "Aktif",
  coming_soon: "Yakında",
  hidden: "Gizli",
};

export const MAIN_NAV = [
  { label: "Ana Sayfa", href: "/" },
  { label: "E-Ticaret Çözümleri", href: "/e-ticaret-cozumleri" },
  { label: "Paketler", href: "/paketler" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Neden Biz?", href: "/neden-biz" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Rehber", href: "/rehber" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const SITE_NAME = "eticaretus";
export const SITE_DOMAIN = "eticaretus.com.tr";
