import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { DynamicIcon } from "@/components/site/DynamicIcon";
import { getActiveServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: "E-ticaret danışmanlığı, kurulum, SEO, pazaryeri ve kargo entegrasyonları ile büyüme hizmetleri.",
};

export default async function ServicesPage() {
  const services = await getActiveServices();

  return (
    <>
      <PageHero
        eyebrow="Hizmetler"
        title="E-Ticaret Yolculuğunuzda Sunduğumuz Hizmetler"
        subtitle="Danışmanlıktan kuruluma, SEO'dan reklam yönetimine kadar işletmenizin ihtiyaç duyduğu hizmetleri sağlıyoruz."
      />
      <section className="bg-white py-16">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/hizmetler/${s.slug}`}
              className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                <DynamicIcon iconName={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.shortDescription}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-brand">Detayları Gör →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
