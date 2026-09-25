import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { LinkArrow } from "@/components/site/LinkArrow";
import { DynamicIcon } from "@/components/site/DynamicIcon";
import { getActiveServices } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: "E-ticaret danışmanlığı, kurulum, SEO, pazaryeri ve kargo entegrasyonları ile büyüme hizmetleri.",
};

export default async function ServicesPage() {
  const services = await getActiveServices();

  return (
    <>
      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Hizmetler</p>
            <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              E-Ticaret Yolculuğunuzda Sunduğumuz Hizmetler
            </h1>
            <p className="mt-4 text-balance text-muted sm:text-lg">
              Danışmanlıktan kuruluma, SEO&apos;dan reklam yönetimine kadar işletmenizin ihtiyaç
              duyduğu hizmetleri sağlıyoruz.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl shadow-navy/10">
            <Image
              src="/images/hizmetler-banner.jpg"
              alt="Kargo ve sipariş süreçleri yönetimi"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
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
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
                Detayları Gör
                <LinkArrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
