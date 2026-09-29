import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { LogoCarousel } from "@/components/home/LogoCarousel";
import { CampaignBanner } from "@/components/site/CampaignBanner";
import { PackageCards } from "@/components/site/PackageCards";
import { ProviderIntro } from "@/components/site/ProviderIntro";
import { LinkArrow } from "@/components/site/LinkArrow";
import { prisma } from "@/lib/prisma";
import { getProvidersWithPackages } from "@/lib/queries";
import { getSiteSettings } from "@/lib/settings";
import { isCampaignActive } from "@/lib/campaign";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "E-Ticaret Paketleri: IdeaSoft ve ikas",
  description: "IdeaSoft ve ikas e-ticaret paketlerini karşılaştırın; iş ortağı olarak işletmenize özel indirimli fiyat sunuyoruz. Size uygun altyapıyı birlikte seçelim.",
};

export default async function PackagesPage() {
  const [providers, referenceLogos, settings] = await Promise.all([
    getProvidersWithPackages(),
    prisma.referenceLogo.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    getSiteSettings(),
  ]);

  if (providers.length === 0) {
    return <PageHero eyebrow="Paketler" title="Paketler Hazırlanıyor" subtitle="Paket bilgilerimiz kısa süre içinde burada olacak." />;
  }

  const showCampaign = isCampaignActive(settings);
  const whatsappHref = buildWhatsAppUrl(settings.whatsappNumber, "Merhaba, eticaretus.com.tr üzerinden size özel paket fiyatı almak istiyorum.");
  const names = providers.map((p) => p.name).join(" ve ");

  return (
    <>
      <PageHero
        eyebrow="Paketler"
        title="E-Ticaret Paketleri"
        subtitle={`${names} iş ortağı olarak paketleri işletmenize özel indirimli fiyatlarla sunuyoruz. Paketleri karşılaştırın, size uygun olanı birlikte seçelim.`}
      />

      {showCampaign && (
        <section className="bg-white pt-10">
          <div className="container-page">
            <CampaignBanner text={settings.campaignText} endsAt={settings.campaignEndsAt!.toISOString()} />
          </div>
        </section>
      )}

      {providers.length > 1 && (
        <nav aria-label="Altyapılar" className="border-b border-border bg-white">
          <div className="container-page flex flex-wrap gap-2 py-4">
            {providers.map((p) => (
              <a key={p.slug} href={`#${p.slug}`} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand">
                {p.name} Paketleri
              </a>
            ))}
          </div>
        </nav>
      )}

      {providers.map((provider, i) => (
        <section key={provider.slug} id={provider.slug} className={`scroll-mt-24 py-16 ${i % 2 === 0 ? "bg-white" : "bg-surface"}`}>
          <div className="container-page">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{provider.name} Paketleri</h2>
            <div className="mt-6">
              <ProviderIntro slug={provider.slug} name={provider.name} logoUrl={provider.logoUrl} description={provider.description} advantages={provider.advantages} />
            </div>
            <div className="mt-12">
              <PackageCards providerSlug={provider.slug} providerName={provider.name} packages={provider.packages} />
            </div>
            <div className="mt-10 text-center">
              <Link
                href={`/paketler/${provider.slug}`}
                className="inline-flex items-center rounded-full border border-brand/30 px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/5"
              >
                {provider.name} paketlerinin tüm özelliklerini karşılaştır
                <LinkArrow />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {providers.length > 1 && (
        <section className="border-t border-border bg-white py-16">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Hangi Altyapı Size Uygun?</h2>
              <p className="mt-3 text-muted">İki altyapı da güçlü; doğru seçim ürün yapınıza, satış kanallarınıza ve hedeflerinize bağlı.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {providers.map((p) => (
                <div key={p.slug} className="rounded-2xl border border-border bg-surface p-6">
                  <p className="text-lg font-bold text-ink">{p.name}</p>
                  <p className="mt-1 text-sm font-medium text-brand">{p.shortDescription}</p>
                  {p.suitableFor && <p className="mt-3 text-sm leading-relaxed text-muted">{p.suitableFor}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-navy py-14 text-white">
        <div className="container-page flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <BadgePercent className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Size özel indirimli fiyat alın</h2>
              <p className="mt-1.5 max-w-xl text-sm text-white/70">
                İş ortağı olarak her işletmeye ihtiyacına göre özel fiyat sunuyoruz. Paketinizi söyleyin, aynı gün teklifinizi iletelim.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp&apos;tan Fiyat Al
            </a>
            <Link href="/iletisim" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-white/90">
              Teklif Formu
            </Link>
          </div>
        </div>
      </section>

      {referenceLogos.length > 0 && (
        <section className="border-b border-border bg-white py-14">
          <div className="container-page">
            <p className="text-center text-sm font-semibold text-muted">IdeaSoft Altyapısını Tercih Eden Markalardan Bazıları</p>
          </div>
          <div className="mt-8">
            <LogoCarousel logos={referenceLogos} />
          </div>
        </section>
      )}
    </>
  );
}
