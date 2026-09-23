import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Neden Biz?",
  description: "eticaretus'un işletmenize sağladığı gerçek değerler: altyapı seçimi, kurulum desteği, SEO uyumlu yapı ve satış sonrası destek.",
};

export default async function WhyUsPage() {
  const points = await prisma.whyUsPoint.findMany({ where: { active: true }, orderBy: { order: "asc" } });

  return (
    <>
      <PageHero
        eyebrow="Neden Biz?"
        title="eticaretus ile Çalışmanın Getirdiği Değer"
        subtitle="Yalnızca bir altyapı satmıyoruz; işletmenizin e-ticaret yolculuğunda her adımda yanınızda oluyoruz."
      />
      <section className="bg-white py-16">
        <div className="container-page grid gap-6 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point.id} className="rounded-2xl border border-border bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-xl">
                {point.icon ?? "✦"}
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
