import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "İletişim",
  description: "eticaretus ile iletişime geçin, e-ticaret altyapınız için ücretsiz danışmanlık ve teklif alın.",
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/iletisim">) {
  const params = await searchParams;
  const providerParam = typeof params.provider === "string" ? params.provider : undefined;
  const packageParam = typeof params.package === "string" ? params.package : undefined;

  const [providers, packages, settings] = await Promise.all([
    prisma.provider.findMany({ where: { status: "active" }, orderBy: { order: "asc" } }),
    prisma.package.findMany({ where: { active: true }, orderBy: { order: "asc" }, include: { provider: true } }),
    getSiteSettings(),
  ]);

  const whatsappHref = buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappMessage);

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Sizden Haber Almak İstiyoruz"
        subtitle="Formu doldurun veya WhatsApp'tan yazın; en kısa sürede size dönüş yapalım."
      />
      <section className="bg-white py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            <ContactForm
              providers={providers.map((p) => ({ slug: p.slug, name: p.name }))}
              packages={packages.map((p) => ({ providerSlug: p.provider.slug, slug: p.slug, name: p.name }))}
              defaultProvider={providerParam}
              defaultPackage={packageParam}
            />
          </div>

          <aside className="space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-navy/10">
              <Image
                src="/images/iletisim-destek.jpg"
                alt="eticaretus destek ekibi"
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-sm font-semibold text-ink">İletişim Bilgileri</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {settings.phone && <li>{settings.phone}</li>}
                {settings.email && <li>{settings.email}</li>}
                {settings.address && <li>{settings.address}</li>}
              </ul>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp py-4 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
            >
              WhatsApp&apos;tan Ulaş
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
