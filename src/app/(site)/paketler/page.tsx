import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { PackagesPreview } from "@/components/home/PackagesPreview";
import { PackageComparisonTable } from "@/components/site/PackageComparisonTable";
import { prisma } from "@/lib/prisma";
import { getPackageComparison } from "@/lib/queries";
import { PREVIEW_FEATURE_NAMES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Paketler",
  description: "IdeaSoft Starter, Booster, Master ve Master+ paketlerini karşılaştırın, işletmenize uygun paketi seçin.",
};

export default async function PackagesPage() {
  const provider = await prisma.provider.findFirst({ where: { status: "active" }, orderBy: { order: "asc" } });

  if (!provider) {
    return (
      <PageHero
        eyebrow="Paketler"
        title="Paketler Hazırlanıyor"
        subtitle="Paket bilgilerimiz kısa süre içinde burada olacak."
      />
    );
  }

  const { categories, packages } = await getPackageComparison(provider.id);
  const featureById = new Map(categories.flatMap((c) => c.features.map((f) => [f.id, f] as const)));

  return (
    <>
      <PageHero
        eyebrow="Paketler"
        title={`${provider.name} Paketlerini Karşılaştırın`}
        subtitle="İhtiyacınıza ve hedeflerinize uygun paketi seçin, e-ticaret yolculuğunuza güçlü bir başlangıç yapın."
      />

      <PackagesPreview
        providerSlug={provider.slug}
        providerName={provider.name}
        showIntro={false}
        packages={packages.map((pkg) => ({
          slug: pkg.slug,
          name: pkg.name,
          shortDescription: pkg.shortDescription,
          price: pkg.price,
          oldPrice: pkg.oldPrice,
          billingNote: pkg.billingNote,
          campaignLabel: pkg.campaignLabel,
          featured: pkg.featured,
          features: PREVIEW_FEATURE_NAMES.map((name) => {
            const pf = pkg.packageFeatures.find((f) => featureById.get(f.featureId)?.name === name);
            return pf ? { name, included: pf.included, value: pf.value } : null;
          }).filter((f): f is NonNullable<typeof f> => Boolean(f)),
        }))}
      />

      <section className="bg-white py-16">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Detaylı Özellik Karşılaştırması</h2>
          <div className="mt-8">
            <PackageComparisonTable categories={categories} packages={packages} />
          </div>
        </div>
      </section>
    </>
  );
}
