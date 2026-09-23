import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

type Props = {
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
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
      { label: "E-Ticaret Çözümleri", href: "/e-ticaret-cozumleri" },
      { label: "IdeaSoft", href: "/e-ticaret-cozumleri/ideasoft" },
      { label: "Paketler", href: "/paketler" },
      { label: "Hizmetler", href: "/hizmetler" },
      { label: "Rehber", href: "/rehber" },
    ],
  },
];

export function Footer({ phone, email, address, instagramUrl, linkedinUrl, facebookUrl }: Props) {
  const year = new Date().getFullYear();
  const socials = [
    { href: instagramUrl, label: "Instagram" },
    { href: linkedinUrl, label: "LinkedIn" },
    { href: facebookUrl, label: "Facebook" },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border bg-white">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
              E
            </span>
            <span className="text-lg font-bold tracking-tight text-ink">
              {SITE_NAME}
              <span className="text-brand">.com.tr</span>
            </span>
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
            {phone && (
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="transition hover:text-brand">
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className="transition hover:text-brand">
                  {email}
                </a>
              </li>
            )}
            {address && <li>{address}</li>}
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
