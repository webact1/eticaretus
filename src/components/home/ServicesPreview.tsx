import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/site/DynamicIcon";

type Service = { slug: string; name: string; shortDescription: string; icon?: string | null };

export function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <section className="bg-surface py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Hizmetlerimiz</p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Mağazanızı Kurmaktan Büyütmeye Tek Noktadan Destek
            </h2>
            <p className="mt-4 text-balance text-muted">
              Danışmanlık, kurulum, SEO ve entegrasyonlar dahil e-ticaret sürecinin her adımında yanınızdayız.
            </p>
          </div>
          <Link
            href="/hizmetler"
            className="inline-flex shrink-0 items-center text-sm font-semibold text-brand transition hover:text-brand-dark"
          >
            Tüm hizmetleri gör
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/hizmetler/${s.slug}`}
              className="group flex gap-4 rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                <DynamicIcon iconName={s.icon} className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-ink">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
