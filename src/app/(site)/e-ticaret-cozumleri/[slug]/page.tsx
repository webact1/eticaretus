import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProviderBySlug, getPackagesForProvider } from "@/lib/queries";
import { getSiteSettings } from "@/lib/settings";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: PageProps<"/e-ticaret-cozumleri/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) return {};
  return {
    title: provider.seoTitle ?? provider.name,
    description: provider.seoDescription ?? provider.shortDescription,
    alternates: provider.canonicalUrl ? { canonical: provider.canonicalUrl } : undefined,
    robots: provider.noindex ? { index: false, follow: false } : undefined,
  };
}

export default async function ProviderDetailPage({
  params,
}: PageProps<"/e-ticaret-cozumleri/[slug]">) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);
  if (!provider) notFound();

  const [packages, settings] = await Promise.all([
    getPackagesForProvider(provider.id),
    getSiteSettings(),
  ]);

  const advantages: string[] = JSON.parse(provider.advantages || "[]");
  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    `Merhaba, eticaretus.com.tr üzerinden ${provider.name} hakkında bilgi almak istiyorum.`,
  );

  return (
    <>
      <section className="border-b border-border bg-surface py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-brand shadow-sm">
            {provider.name[0]}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">E-Ticaret Çözümü</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {provider.name}
            </h1>
            <p className="mt-3 max-w-2xl text-muted sm:text-lg">{provider.shortDescription}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-base leading-relaxed text-ink/80">{provider.description}</p>

            {advantages.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-ink">Avantajlar</h2>
                <ul className="mt-4 space-y-3">
                  {advantages.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-sm text-ink/80">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">
                        ✓
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {provider.suitableFor && (
              <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
                <p className="text-sm font-semibold text-ink">Kimler İçin Uygun?</p>
                <p className="mt-2 text-sm text-muted">{provider.suitableFor}</p>
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-border bg-navy p-6 text-white">
            <p className="text-sm font-semibold text-white/70">Aklınıza takılan bir soru mu var?</p>
            <p className="mt-2 text-lg font-bold">{provider.name} hakkında bilgi alın</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
            >
              WhatsApp&apos;tan Bilgi Al
            </a>
            {packages.length > 0 && (
              <Link
                href="/paketler"
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Paketleri İncele →
              </Link>
            )}
          </aside>
        </div>
      </section>

      {packages.length > 0 && (
        <section className="bg-surface py-16">
          <div className="container-page">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">{provider.name} Paketleri</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {packages.map((pkg) => (
                <Link
                  key={pkg.slug}
                  href={`/paketler/${provider.slug}/${pkg.slug}`}
                  className={`rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-lg ${
                    pkg.featured ? "border-brand bg-white" : "border-border bg-white"
                  }`}
                >
                  <p className="text-sm font-bold text-ink">{pkg.name}</p>
                  {pkg.shortDescription && <p className="mt-1 text-xs text-muted">{pkg.shortDescription}</p>}
                  <p className="mt-4 text-sm font-semibold text-brand">Detayları Gör →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
