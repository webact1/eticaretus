import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { getActiveFaqs } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description: "IdeaSoft paketleri, kurulum süreci, pazaryeri entegrasyonları ve destek hizmeti hakkında sıkça sorulan sorular.",
};

export default async function FaqPage() {
  const faqs = await getActiveFaqs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <PageHero eyebrow="SSS" title="Merak Ettikleriniz" />
      <section className="bg-white py-16">
        <div className="container-page max-w-2xl">
          <FaqAccordion items={faqs} />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
