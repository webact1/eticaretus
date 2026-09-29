import Link from "next/link";
import { BadgePercent, Check, Minus } from "lucide-react";
import { LinkArrow } from "@/components/site/LinkArrow";
import type { ProviderPackageCard } from "@/lib/queries";

/**
 * Paket kartları. Fiyat gösterilmez: iş ortağı olarak her müşteriye özel indirimli fiyat verilir (kullanıcı 2026-09-29);
 * kart bunun yerine "Size özel indirimli fiyat" bilgisini ve teklif bağlantısını taşır.
 */
export function PackageCards({ providerSlug, providerName, packages }: { providerSlug: string; providerName: string; packages: ProviderPackageCard[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {packages.map((pkg) => (
        <div
          key={pkg.slug}
          className={`relative flex flex-col rounded-2xl border p-6 ${
            pkg.featured ? "border-brand bg-navy text-white shadow-2xl shadow-brand/20 lg:-translate-y-3" : "border-border bg-white"
          }`}
        >
          {pkg.featured && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1 text-xs font-bold text-white">
              En Çok Tercih Edilen
            </span>
          )}
          <p className={`text-xs font-semibold uppercase tracking-wider ${pkg.featured ? "text-white/60" : "text-muted"}`}>{providerName}</p>
          <h3 className={`mt-1 text-lg font-bold ${pkg.featured ? "text-white" : "text-ink"}`}>{pkg.name}</h3>
          {pkg.shortDescription && <p className={`mt-1.5 text-sm ${pkg.featured ? "text-white/70" : "text-muted"}`}>{pkg.shortDescription}</p>}

          <div
            className={`mt-5 flex items-center gap-2.5 rounded-xl px-3 py-2.5 ${
              pkg.featured ? "bg-white/10 text-white" : "bg-brand/5 text-brand"
            }`}
          >
            <BadgePercent className="h-5 w-5 shrink-0" aria-hidden />
            <span className="text-sm font-semibold leading-tight">
              Size özel indirimli fiyat
              <span className={`block text-xs font-normal ${pkg.featured ? "text-white/65" : "text-muted"}`}>Teklif isteyin, aynı gün dönelim</span>
            </span>
          </div>
          {pkg.campaignLabel && (
            <span className="mt-2 inline-flex w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">{pkg.campaignLabel}</span>
          )}

          <ul className="mt-6 flex-1 space-y-3">
            {pkg.features.map((f) => (
              <li
                key={f.name}
                className={`flex items-start gap-2 text-sm leading-snug ${pkg.featured ? "text-white/85" : "text-ink/80"} ${!f.included ? "opacity-50" : ""}`}
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
                  {f.value && <span className="block font-semibold sm:inline sm:before:content-['—_']">{f.value}</span>}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={`/paketler/${providerSlug}/${pkg.slug}`}
            className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition active:scale-[0.97] ${
              pkg.featured ? "bg-white text-navy hover:bg-white/90" : "bg-brand text-white hover:bg-brand-dark"
            }`}
          >
            Paket Detaylarını Gör
            <LinkArrow />
          </Link>
          <Link
            href={`/iletisim?provider=${providerSlug}&package=${pkg.slug}`}
            className={`mt-2 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              pkg.featured ? "text-white/85 hover:text-white" : "text-brand hover:text-brand-dark"
            }`}
          >
            Fiyat Teklifi Al
          </Link>
        </div>
      ))}
    </div>
  );
}
