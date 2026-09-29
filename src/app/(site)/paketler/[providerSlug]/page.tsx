import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgePercent } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { PackageCards } from "@/components/site/PackageCards";
import { PackageComparisonTable } from "@/components/site/PackageComparisonTable";
import { ProviderIntro } from "@/components/site/ProviderIntro";
import { BreadcrumbJsonLd } from "@/components/site/JsonLd";
import { getPackageComparison, getProviderBySlug, getProvidersWithPackages } from "@/lib/queries";
import { cleanTitle } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/paketler/[providerSlug]">): Promise<Metadata> {
  const { providerSlug } = await params;
  const provider = await getProviderBySlug(providerSlug);
  if (!provider || provider.status !== "active") return {};
  return {
    title: cleanTitle(provider.seoTitle) ?? `${provider.name} Paketleri`,
    description: provider.seoDescription ?? provider.shortDescription,
  };
}

export default async function ProviderPackagesPage({ params }: PageProps<"/paketler/[providerSlug]">) {
  const { providerSlug } = await params;
  const provider = await getProviderBySlug(providerSlug);
  if (!provider || provider.status !== "active") notFound();

  const [{ categories, packages }, all] = await Promise.all([getPackageComparison(provider.id), getProvidersWithPackages()]);
  const cards = all.find((p) => p.slug === provider.slug);
  if (!cards || packages.length === 0) notFound();
  const others = all.filter((p) => p.slug !== provider.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Paketler", path: "/paketler" },
          { name: `${provider.name} Paketleri`, path: `/paketler/${provider.slug}` },
        ]}
      />
      <PageHero eyebrow="Paketler" title={`${provider.name} Paketlerini Karşılaştırın`} subtitle={provider.shortDescription} />

      <section className="border-b border-border bg-white py-12">
        <div className="container-page">
          <ProviderIntro slug={provider.slug} name={provider.name} logoUrl={provider.logoUrl} description={provider.description} advantages={cards.advantages}>
            <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand/5 px-3 py-2 text-sm font-semibold text-brand">
              <BadgePercent className="h-4 w-4" aria-hidden />
              Tüm {provider.name} paketlerinde size özel indirimli fiyat
            </p>
          </ProviderIntro>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <PackageCards providerSlug={provider.slug} providerName={provider.name} packages={cards.packages} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Detaylı Özellik Karşılaştırması</h2>
          <p className="mt-2 text-sm text-muted">Özellikler {provider.name}&apos;ın resmi paket bilgilerine göre hazırlanmıştır; güncel kapsam için bize danışabilirsiniz.</p>
          <div className="mt-8">
            <PackageComparisonTable categories={categories} packages={packages} />
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-border bg-surface py-12">
          <div className="container-page flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-ink">Diğer altyapıyı da incelemek ister misiniz?</p>
            <div className="flex flex-wrap gap-2">
              {others.map((o) => (
                <Link key={o.slug} href={`/paketler/${o.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand">
                  {o.name} Paketleri
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
