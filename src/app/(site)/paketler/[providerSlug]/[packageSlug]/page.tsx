import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { notFound } from "next/navigation";
import { getPackageBySlug } from "@/lib/queries";
import { getSiteSettings } from "@/lib/settings";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { FEATURE_CATEGORY_DESCRIPTIONS } from "@/lib/constants";
import { BreadcrumbJsonLd, JsonLd } from "@/components/site/JsonLd";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

function formatPrice(price?: number | null) {
  if (price == null) return "Teklif Al";
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(price) + " ₺";
}

export async function generateMetadata({
  params,
}: PageProps<"/paketler/[providerSlug]/[packageSlug]">): Promise<Metadata> {
  const { providerSlug, packageSlug } = await params;
  const data = await getPackageBySlug(providerSlug, packageSlug);
  if (!data) return {};
  return {
    title: data.pkg.seoTitle ?? `${data.pkg.name} — ${data.provider.name}`,
    description: data.pkg.seoDescription ?? data.pkg.shortDescription ?? undefined,
  };
}

export default async function PackageDetailPage({
  params,
}: PageProps<"/paketler/[providerSlug]/[packageSlug]">) {
  const { providerSlug, packageSlug } = await params;
  const data = await getPackageBySlug(providerSlug, packageSlug);
  if (!data) notFound();
  const { provider, pkg } = data;

  const settings = await getSiteSettings();
  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    `Merhaba, eticaretus.com.tr üzerinden ${provider.name} ${pkg.name} paketi hakkında bilgi almak istiyorum.`,
  );

  const grouped = new Map<string, { name: string; items: typeof pkg.packageFeatures }>();
  for (const pf of pkg.packageFeatures) {
    const catId = pf.feature.category.id;
    if (!grouped.has(catId)) grouped.set(catId, { name: pf.feature.category.name, items: [] });
    grouped.get(catId)!.items.push(pf);
  }

  const pagePath = `/paketler/${provider.slug}/${pkg.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${provider.name} ${pkg.name}`,
    description: pkg.shortDescription ?? `${provider.name} ${pkg.name} e-ticaret paketi`,
    image: absoluteUrl("/opengraph-image.png"),
    sku: `${provider.slug}-${pkg.slug}`,
    brand: { "@type": "Brand", name: provider.name },
    url: absoluteUrl(pagePath),
    ...(pkg.price != null
      ? {
          offers: {
            "@type": "Offer",
            url: absoluteUrl(pagePath),
            price: pkg.price,
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
            seller: { "@id": `${SITE_URL}/#organization` },
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Paketler", path: "/paketler" },
          { name: `${provider.name} ${pkg.name}`, path: pagePath },
        ]}
      />
      <section className="border-b border-border bg-surface py-14">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">
            {provider.name} Paketi
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{pkg.name}</h1>
          {pkg.shortDescription && <p className="mt-3 max-w-xl text-muted">{pkg.shortDescription}</p>}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            {Array.from(grouped.values()).map((cat) => (
              <div key={cat.name} className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-wide text-brand">{cat.name}</h2>
                {FEATURE_CATEGORY_DESCRIPTIONS[cat.name] && (
                  <p className="mt-1 text-sm text-muted">{FEATURE_CATEGORY_DESCRIPTIONS[cat.name]}</p>
                )}
                <ul className="mt-4 space-y-3">
                  {cat.items.map((pf) => (
                    <li key={pf.id} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          pf.included ? "bg-brand/10 text-brand" : "bg-surface-2 text-muted"
                        }`}
                      >
                        {pf.included ? <Check className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                      </span>
                      <span className="text-ink/80">
                        {pf.feature.name}
                        {pf.value && <span className="font-semibold"> — {pf.value}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-baseline gap-2">
              {pkg.oldPrice && (
                <span className="text-sm text-muted line-through">{formatPrice(pkg.oldPrice)}</span>
              )}
              <span className="text-2xl font-extrabold text-ink">{formatPrice(pkg.price)}</span>
            </div>
            {pkg.billingNote && <span className="text-xs text-muted">{pkg.billingNote}</span>}
            {pkg.campaignLabel && (
              <span className="mt-2 inline-flex w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                {pkg.campaignLabel}
              </span>
            )}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
            >
              WhatsApp&apos;tan Bilgi Al
            </a>
            <Link
              href={`/iletisim?provider=${provider.slug}&package=${pkg.slug}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Teklif Al
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
