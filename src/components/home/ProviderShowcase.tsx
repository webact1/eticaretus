import Link from "next/link";
import { ProviderCard } from "@/components/site/ProviderCard";

type ProviderItem = {
  slug: string;
  name: string;
  shortDescription: string;
  logoUrl?: string | null;
  status: string;
};

export function ProviderShowcase({ providers }: { providers: ProviderItem[] }) {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">
              E-Ticaret Çözümleri
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              İşletmenize Uygun Altyapıyı Birlikte Seçelim
            </h2>
          </div>
          <Link
            href="/e-ticaret-cozumleri"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            Tüm çözümleri gör →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <ProviderCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
