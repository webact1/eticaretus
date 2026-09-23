import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Neden Biz?",
  description: "eticaretus'un işletmenize sağladığı gerçek değerler: altyapı seçimi, kurulum desteği, SEO uyumlu yapı ve satış sonrası destek.",
};

export default async function WhyUsPage() {
  const points = await prisma.whyUsPoint.findMany({ where: { active: true }, orderBy: { order: "asc" } });

  return (
    <>
      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Neden Biz?</p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              eticaretus ile Çalışmanın Getirdiği Değer
            </h1>
            <p className="mt-4 text-balance text-muted sm:text-lg">
              Yalnızca bir altyapı satmıyoruz; işletmenizin e-ticaret yolculuğunda her adımda
              yanınızda oluyoruz.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl shadow-navy/10">
            <Image
              src="/images/neden-biz-basari.jpg"
              alt="eticaretus ile büyüyen işletmeler"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
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
