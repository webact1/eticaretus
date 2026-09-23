import Link from "next/link";
import Image from "next/image";

type ProviderItem = {
  slug: string;
  name: string;
  shortDescription: string;
  logoUrl?: string | null;
  status: string;
};

export function ProviderCard({ p }: { p: ProviderItem }) {
  const comingSoon = p.status === "coming_soon";
  const card = (
    <div
      className={`group h-full rounded-2xl border border-border bg-white p-7 transition-all ${
        comingSoon ? "opacity-70" : "hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2">
          {p.logoUrl ? (
            <Image src={p.logoUrl} alt={p.name} width={28} height={28} className="object-contain" />
          ) : (
            <span className="text-lg font-bold text-brand">{p.name[0]}</span>
          )}
        </div>
        {comingSoon && (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
            Yakında
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{p.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{p.shortDescription}</p>
      {!comingSoon && (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition group-hover:gap-2">
          Detayları İncele →
        </span>
      )}
    </div>
  );
  return comingSoon ? (
    card
  ) : (
    <Link href={`/e-ticaret-cozumleri/${p.slug}`}>{card}</Link>
  );
}
