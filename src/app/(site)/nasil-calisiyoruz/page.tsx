import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nasıl Çalışıyoruz?",
  description: "İhtiyacınızı dinlemekten yayına alma ve destek sürecine kadar eticaretus ile çalışma sürecimiz.",
};

export default async function HowItWorksPage() {
  const steps = await prisma.processStep.findMany({ where: { active: true }, orderBy: { order: "asc" } });

  return (
    <>
      <PageHero
        eyebrow="Nasıl Çalışıyoruz?"
        title="Hızlı ve Şeffaf Bir Süreç"
        subtitle="İlk görüşmeden yayına almaya kadar süreci sizin için basit ve net tutuyoruz."
      />
      <section className="bg-white py-16">
        <div className="container-page mx-auto max-w-3xl space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                {step.stepNumber}
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
