import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { PackagesPreview } from "@/components/home/PackagesPreview";
import { LogoCarousel } from "@/components/home/LogoCarousel";
import { PackageComparisonTable } from "@/components/site/PackageComparisonTable";
import { CampaignBanner } from "@/components/site/CampaignBanner";
import { prisma } from "@/lib/prisma";
import { getPackageComparison } from "@/lib/queries";
import { getSiteSettings } from "@/lib/settings";
import { isCampaignActive } from "@/lib/campaign";
import { PREVIEW_FEATURE_NAMES } from "@/lib/constants";

export const dynamic = "force-dynamic";

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

  const [{ categories, packages }, referenceLogos, settings] = await Promise.all([
    getPackageComparison(provider.id),
    prisma.referenceLogo.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    getSiteSettings(),
  ]);
  const featureById = new Map(categories.flatMap((c) => c.features.map((f) => [f.id, f] as const)));
  const advantages: string[] = JSON.parse(provider.advantages || "[]");
  const showCampaign = isCampaignActive(settings);

  return (
    <>
      <PageHero
        eyebrow="Paketler"
        title={`${provider.name} Paketlerini Karşılaştırın`}
        subtitle="İhtiyacınıza ve hedeflerinize uygun paketi seçin, e-ticaret yolculuğunuza güçlü bir başlangıç yapın."
      />

      {showCampaign && (
        <section className="bg-white py-10">
          <div className="container-page">
            <CampaignBanner text={settings.campaignText} endsAt={settings.campaignEndsAt!.toISOString()} />
          </div>
        </section>
      )}

      <section className="border-b border-border bg-white py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-xl font-bold text-brand">
            {provider.name[0]}
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink">{provider.name}</h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{provider.description}</p>
            {advantages.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {advantages.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink/80"
                  >
                    <Check className="h-3.5 w-3.5 text-brand" />
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

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

      {referenceLogos.length > 0 && (
        <section className="border-y border-border bg-white py-14">
          <div className="container-page">
            <p className="text-center text-sm font-semibold text-muted">
              IdeaSoft Altyapısını Tercih Eden Markalardan Bazıları
            </p>
          </div>
          <div className="mt-8">
            <LogoCarousel logos={referenceLogos} />
          </div>
        </section>
      )}

      <section className="bg-surface py-16">
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
