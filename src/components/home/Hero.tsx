import Link from "next/link";
import { StoreDeviceMockup } from "./StoreDeviceMockup";

type Props = {
  badge: string;
  title: string;
  subtitle: string;
  imageUrl?: string | null;
};

const trustItems = [
  { icon: "🛡️", label: "Güvenli Altyapı" },
  { icon: "🎧", label: "Uzman Destek" },
  { icon: "⚡", label: "Hızlı Kurulum" },
];

export function Hero({ badge, title, subtitle, imageUrl }: Props) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand/15 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-brand-2/15 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-whatsapp/10 blur-3xl" />
      </div>
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {badge}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-balance text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/paketler"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark"
            >
              Paketleri İncele →
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              Ücretsiz Danışmanlık Al
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm font-medium text-ink/70">
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <StoreDeviceMockup imageUrl={imageUrl} />
          <div className="glass-panel absolute -left-4 bottom-10 z-10 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl sm:-left-8 sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp">
              🎧
            </span>
            <div>
              <p className="text-xs font-semibold text-white">7/24 Canlı Destek</p>
              <p className="text-[11px] text-white/60">Her zaman yanınızdayız</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
