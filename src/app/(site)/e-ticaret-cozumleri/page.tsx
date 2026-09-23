import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ProviderCard } from "@/components/site/ProviderCard";
import { getVisibleProviders } from "@/lib/queries";

export const metadata: Metadata = {
  title: "E-Ticaret Çözümleri",
  description:
    "IdeaSoft, Ticimax ve WooCommerce gibi e-ticaret altyapıları arasından işletmenize en uygun çözümü eticaretus ile seçin.",
};

export default async function ProvidersPage() {
  const providers = await getVisibleProviders();

  return (
    <>
      <PageHero
        eyebrow="E-Ticaret Çözümleri"
        title="İşletmenize Uygun Altyapıyı Birlikte Seçelim"
        subtitle="eticaretus tek bir altyapıya bağlı kalmaz. İhtiyacınıza göre IdeaSoft, Ticimax veya WooCommerce arasından size en uygun çözümü belirliyoruz."
      />
      <section className="bg-white py-16">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((p) => (
            <ProviderCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </>
  );
}
