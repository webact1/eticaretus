import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicIcon } from "@/components/site/DynamicIcon";
import { getServiceBySlug } from "@/lib/queries";
import { getSiteSettings } from "@/lib/settings";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: PageProps<"/hizmetler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle ?? service.name,
    description: service.seoDescription ?? service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/hizmetler/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const settings = await getSiteSettings();
  const whatsappHref = buildWhatsAppUrl(
    settings.whatsappNumber,
    `Merhaba, eticaretus.com.tr üzerinden ${service.name} hizmetiniz hakkında bilgi almak istiyorum.`,
  );

  return (
    <section className="bg-white py-16">
      <div className="container-page max-w-3xl">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <DynamicIcon iconName={service.icon} className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{service.name}</h1>
        <p className="mt-4 text-base leading-relaxed text-ink/80">{service.description}</p>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
        >
          WhatsApp&apos;tan Bilgi Al →
        </a>
      </div>
    </section>
  );
}
