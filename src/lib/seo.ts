export const SITE_URL = "https://eticaretus.com.tr";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Panelden girilen izleme kimlikleri sayfaya script olarak gömüldüğü için biçimleri doğrulanır.
const ID_PATTERNS = {
  gtm: /^GTM-[A-Z0-9]{4,12}$/,
  ga4: /^G-[A-Z0-9]{6,16}$/,
  clarity: /^[a-z0-9]{8,16}$/i,
  pixel: /^\d{8,20}$/,
} as const;

export function validId(kind: keyof typeof ID_PATTERNS, value?: string | null) {
  const v = value?.trim();
  return v && ID_PATTERNS[kind].test(v) ? v : null;
}

// Panelden girilen SEO başlığı sonuna "| eticaretus" ekleyebilir; şablon zaten ekliyor, çift görünmesin.
export function cleanTitle(title?: string | null) {
  const t = title?.replace(/\s*[|–—-]\s*eticaretus(\.com\.tr)?\s*$/i, "").trim();
  return t || undefined;
}
