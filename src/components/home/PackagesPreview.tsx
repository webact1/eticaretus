"use client";

import { useState } from "react";
import Link from "next/link";
import { LinkArrow } from "@/components/site/LinkArrow";
import { PackageCards } from "@/components/site/PackageCards";
import { PartnerLogo } from "@/components/site/PartnerLogo";
import type { ProviderWithPackages } from "@/lib/queries";

/** Anasayfa paket bölümü: birden fazla altyapı varsa (IdeaSoft, ikas) logolu sekmelerle geçiş yapılır. */
export function PackagesPreview({ providers }: { providers: ProviderWithPackages[] }) {
  const [active, setActive] = useState(0);
  const provider = providers[active] ?? providers[0];
  if (!provider) return null;

  return (
    <section className="bg-surface py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Paketlerimiz</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">İşletmenize Uygun E-Ticaret Paketleri</h2>
          <p className="mt-4 text-muted">
            {providers.length > 1
              ? `${providers.map((p) => p.name).join(" ve ")} iş ortağı olarak paketleri size özel indirimli fiyatlarla sunuyoruz.`
              : "Paketleri size özel indirimli fiyatlarla sunuyoruz."}
          </p>
        </div>

        {providers.length > 1 && (
          <div className="mt-10 flex justify-center">
            <div role="tablist" aria-label="Altyapı seçimi" className="inline-flex rounded-2xl border border-border bg-white p-1.5 shadow-sm">
              {providers.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${p.name} paketleri`}
                  onClick={() => setActive(i)}
                  className={`flex h-12 min-w-36 items-center justify-center rounded-xl px-5 transition ${
                    i === active ? "bg-brand/10 ring-1 ring-brand/30" : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                  }`}
                >
                  <PartnerLogo slug={p.slug} name={p.name} logoUrl={p.logoUrl} className="h-6 w-auto" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12" role="tabpanel" aria-label={`${provider.name} paketleri`}>
          <PackageCards providerSlug={provider.slug} providerName={provider.name} packages={provider.packages} />
        </div>

        <div className="mt-10 text-center">
          <Link href={`/paketler/${provider.slug}`} className="inline-flex items-center text-sm font-semibold text-brand hover:text-brand-dark">
            {provider.name} paketlerini detaylı karşılaştır
            <LinkArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
