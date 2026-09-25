import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { LinkArrow } from "@/components/site/LinkArrow";

const DEFAULT_ABOUT_IMAGE = "/images/about-team.jpg";

const checks = [
  "Yeni bir e-ticaret sitesi mi kuruyorsunuz?",
  "Mevcut mağazanızı büyütmek mi istiyorsunuz?",
];

export function AboutCta({
  title,
  text,
  imageUrl,
}: {
  title: string;
  text: string;
  imageUrl?: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-brand-2/15 blur-3xl" />
      </div>
      <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image src={imageUrl || DEFAULT_ABOUT_IMAGE} alt={title} fill className="object-cover" />
          </div>
          <div className="glass-panel absolute -bottom-5 -right-5 flex items-center gap-2 rounded-xl px-4 py-3 shadow-xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-2/20 text-brand-2">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold leading-tight text-white">
              Doğru adım,
              <br />
              büyük başarılar!
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-2">Sizin İçin Buradayız</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-lg text-balance leading-relaxed text-white/70">{text}</p>

          <div className="mt-6 space-y-3">
            {checks.map((c) => (
              <div key={c} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-2">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium text-white/90">{c}</span>
              </div>
            ))}
          </div>

          <Link
            href="/iletisim"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:bg-white/90"
          >
            Ücretsiz Danışmanlık Al
            <LinkArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
