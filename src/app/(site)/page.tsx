import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { PackagesPreview } from "@/components/home/PackagesPreview";
import { LogoCarousel } from "@/components/home/LogoCarousel";
import { AboutCta } from "@/components/home/AboutCta";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { getHomeContent, getSiteSettings } from "@/lib/settings";
import { getHomePageData } from "@/lib/home-data";

export default async function HomePage() {
  const [home, settings, data] = await Promise.all([getHomeContent(), getSiteSettings(), getHomePageData()]);

  const {
    whyUsPoints,
    referenceLogos,
    testimonials,
    processSteps,
    faqs,
    featuredProvider,
    featuredPackages,
  } = data;

  return (
    <>
      <Hero badge={home.heroBadge} title={home.heroTitle} subtitle={home.heroSubtitle} imageUrl={home.heroImageUrl} />

      {whyUsPoints.length > 0 && (
        <ValueProps
          eyebrow="Neden eticaretus?"
          title="E-Ticarette Doğru Adımı Birlikte Atalım"
          subtitle="Altyapı seçiminden yayına almaya, satış sonrası desteğe kadar tüm süreçte yanınızdayız."
          items={whyUsPoints}
        />
      )}

      {featuredProvider && featuredPackages.length > 0 && (
        <PackagesPreview
          providerSlug={featuredProvider.slug}
          providerName={featuredProvider.name}
          providerDescription={featuredProvider.shortDescription}
          packages={featuredPackages.map((pkg) => ({
            slug: pkg.slug,
            name: pkg.name,
            shortDescription: pkg.shortDescription,
            price: pkg.price,
            oldPrice: pkg.oldPrice,
            billingNote: pkg.billingNote,
            campaignLabel: pkg.campaignLabel,
            featured: pkg.featured,
            features: pkg.packageFeatures.map((pf) => ({
              name: pf.feature.name,
              included: pf.included,
              value: pf.value,
            })),
          }))}
        />
      )}

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

      <AboutCta title={home.aboutTitle} text={home.aboutText} imageUrl={home.aboutImageUrl} />

      {processSteps.length > 0 && (
        <ProcessSteps
          steps={processSteps.map((s) => ({
            stepNumber: s.stepNumber,
            title: s.title,
            description: s.description,
          }))}
        />
      )}

      {testimonials.length > 0 && (
        <section className="bg-surface py-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Müşteri Deneyimleri</p>
              <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                IdeaSoft Kullanan İşletmelerin Deneyimleri
              </h2>
              <p className="mt-3 text-sm text-muted">
                IdeaSoft&apos;un resmi müşteri deneyimleri ve başarı hikâyelerinden seçilmiş örnekler.
              </p>
            </div>
            <div className="mt-12">
              <TestimonialCarousel items={testimonials} />
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-page max-w-2xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-brand">Sıkça Sorulan Sorular</p>
              <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Merak Ettikleriniz
              </h2>
            </div>
            <div className="mt-8">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        </section>
      )}

      <FinalCta
        title={home.ctaTitle}
        text={home.ctaText}
        whatsappNumber={settings.whatsappNumber}
        whatsappMessage={settings.whatsappMessage}
      />
    </>
  );
}
