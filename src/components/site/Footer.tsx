import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { DEFAULT_LOGO, SITE_NAME } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  logoUrl?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  whatsappNumber: string;
  whatsappMessage: string;
};

const columns = [
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Neden Biz?", href: "/neden-biz" },
      { label: "Nasıl Çalışıyoruz?", href: "/nasil-calisiyoruz" },
      { label: "SSS", href: "/sss" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  {
    title: "Çözümler",
    links: [
      { label: "IdeaSoft Paketleri", href: "/paketler" },
      { label: "Hizmetler", href: "/hizmetler" },
      { label: "Rehber", href: "/rehber" },
    ],
  },
];

export function Footer({
  logoUrl,
  phone,
  email,
  address,
  instagramUrl,
  linkedinUrl,
  facebookUrl,
  whatsappNumber,
  whatsappMessage,
}: Props) {
  const year = new Date().getFullYear();
  const whatsappHref = buildWhatsAppUrl(whatsappNumber, whatsappMessage);
  const socials = [
    { href: instagramUrl, label: "Instagram" },
    { href: linkedinUrl, label: "LinkedIn" },
    { href: facebookUrl, label: "Facebook" },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border bg-white">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-flex items-center" aria-label={`${SITE_NAME} ana sayfa`}>
            <Image src={logoUrl || DEFAULT_LOGO} alt={SITE_NAME} width={158} height={36} className="h-9 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            İşletmenize uygun e-ticaret altyapısını birlikte seçiyor; kurulum, danışmanlık ve
            satış sonrası destek süreçlerinde yanınızda oluyoruz.
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:border-brand hover:text-brand"
                  aria-label={s.label}
                >
                  <span className="text-xs font-semibold">{s.label[0]}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-ink">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-semibold text-ink">İletişim</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-brand"
              >
                <svg viewBox="0 0 32 32" fill="currentColor" className="h-4 w-4 shrink-0 text-whatsapp" aria-hidden>
                  <path d="M16.004 0C7.164 0 0 7.163 0 16.001c0 2.822.744 5.554 2.157 7.94L.06 31.94a.6.6 0 0 0 .733.73l8.2-2.145a15.94 15.94 0 0 0 6.99 1.62h.006C24.837 32.145 32 24.98 32 16.144 32 7.306 24.842.001 16.004 0Zm0 29.146a13.1 13.1 0 0 1-6.68-1.83l-.479-.286-4.868 1.274 1.298-4.746-.312-.487a13.09 13.09 0 0 1-2.02-6.99c0-7.24 5.892-13.13 13.135-13.13 3.508 0 6.804 1.368 9.28 3.847a13.03 13.03 0 0 1 3.847 9.29c-.004 7.24-5.896 13.058-13.201 13.058Z" />
                </svg>
                WhatsApp&apos;tan Ulaş
              </a>
            </li>
            {phone && (
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 transition hover:text-brand"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="flex items-center gap-2 transition hover:text-brand">
                  <Mail className="h-4 w-4 shrink-0" />
                  {email}
                </a>
              </li>
            )}
            {address && (
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {address}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>
            © {year} {SITE_NAME}.com.tr — Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4">
            <Link href="/kvkk" className="transition hover:text-brand">
              KVKK
            </Link>
            <Link href="/gizlilik-politikasi" className="transition hover:text-brand">
              Gizlilik Politikası
            </Link>
            <Link href="/cerez-politikasi" className="transition hover:text-brand">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
