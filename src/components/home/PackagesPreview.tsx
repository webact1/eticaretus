import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { LinkArrow } from "@/components/site/LinkArrow";

type Feature = { name: string; included: boolean; value?: string | null };

type PackageItem = {
  slug: string;
  name: string;
  shortDescription?: string | null;
  price?: number | null;
  oldPrice?: number | null;
  billingNote?: string | null;
  campaignLabel?: string | null;
  featured: boolean;
  features: Feature[];
};

function formatPrice(price?: number | null) {
  if (price == null) return "Teklif Al";
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(price) + " ₺";
}

export function PackagesPreview({
  providerSlug,
  providerName,
  providerDescription,
  packages,
  showIntro = true,
}: {
  providerSlug: string;
  providerName: string;
  providerDescription?: string | null;
  packages: PackageItem[];
  showIntro?: boolean;
}) {
  return (
    <section className="bg-surface py-20">
      <div className="container-page">
        {showIntro && (
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Paketlerimiz</p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              İşletmenize Uygun {providerName} Paketleri
            </h2>
            <p className="mt-4 text-muted">
              {providerDescription ??
                "İhtiyacınıza ve hedeflerinize uygun paketi seçin, e-ticaret yolculuğunuza güçlü bir başlangıç yapın."}
            </p>
          </div>
        )}

        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${showIntro ? "mt-14" : ""}`}>
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                pkg.featured
                  ? "border-brand bg-navy text-white shadow-2xl shadow-brand/20 lg:-translate-y-3"
                  : "border-border bg-white"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1 text-xs font-bold text-white">
                  En Çok Tercih Edilen
                </span>
              )}
              <h3 className={`text-lg font-bold ${pkg.featured ? "text-white" : "text-ink"}`}>{pkg.name}</h3>
              {pkg.shortDescription && (
                <p className={`mt-1.5 text-sm ${pkg.featured ? "text-white/70" : "text-muted"}`}>
                  {pkg.shortDescription}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-baseline gap-1.5">
                {pkg.oldPrice && (
                  <span className={`text-sm line-through ${pkg.featured ? "text-white/50" : "text-muted"}`}>
                    {formatPrice(pkg.oldPrice)}
                  </span>
                )}
                <span className="text-xl font-extrabold sm:text-2xl">{formatPrice(pkg.price)}</span>
                {pkg.billingNote && (
                  <span className={`text-xs ${pkg.featured ? "text-white/60" : "text-muted"}`}>
                    {pkg.billingNote}
                  </span>
                )}
              </div>
              {pkg.campaignLabel && (
                <span className="mt-2 inline-flex w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  {pkg.campaignLabel}
                </span>
              )}

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li
                    key={f.name}
                    className={`flex items-start gap-2 text-sm leading-snug ${
                      pkg.featured ? "text-white/85" : "text-ink/80"
                    } ${!f.included ? "opacity-50" : ""}`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        pkg.featured ? "bg-white/15 text-brand-2" : "bg-brand/10 text-brand"
                      }`}
                    >
                      {f.included ? <Check className="h-2.5 w-2.5" /> : <Minus className="h-2.5 w-2.5" />}
                    </span>
                    <span>
                      {f.name}
                      {f.value && (
                        <span className="block font-semibold sm:inline sm:before:content-['—_']">{f.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/paketler/${providerSlug}/${pkg.slug}`}
                className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition active:scale-[0.97] ${
                  pkg.featured
                    ? "bg-white text-navy hover:bg-white/90"
                    : "bg-brand text-white hover:bg-brand-dark"
                }`}
              >
                Paket Detaylarını Gör
                <LinkArrow />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/paketler"
            className="inline-flex items-center text-sm font-semibold text-brand hover:text-brand-dark"
          >
            Tüm paketleri ve karşılaştırmayı gör
            <LinkArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
