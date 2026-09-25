import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppWidget } from "@/components/site/WhatsAppWidget";
import { CampaignTopBar } from "@/components/site/CampaignTopBar";
import { getSiteSettings } from "@/lib/settings";
import { isCampaignActive } from "@/lib/campaign";
import { Analytics } from "@/components/site/Analytics";
import { JsonLd } from "@/components/site/JsonLd";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import type { Metadata } from "next";

// Site içeriği veritabanından okunuyor; build sırasında DB olmayabilir, bu yüzden hiçbir sayfa statik üretilmemeli.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const google = settings.gscVerification?.trim();
  return google ? { verification: { google } } : {};
}

function buildOrganizationJsonLd(settings: Awaited<ReturnType<typeof getSiteSettings>>) {
  const sameAs = [settings.instagramUrl, settings.linkedinUrl, settings.facebookUrl].filter(Boolean);
  const telephone = settings.phone?.trim() || `+${settings.whatsappNumber}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "eticaretus",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png"), width: 900, height: 205 },
        image: absoluteUrl("/opengraph-image.png"),
        description: "IdeaSoft e-ticaret altyapısı danışmanlığı, kurulum ve destek hizmetleri.",
        ...(settings.email ? { email: settings.email } : {}),
        ...(settings.address
          ? { address: { "@type": "PostalAddress", streetAddress: settings.address, addressCountry: "TR" } }
          : {}),
        ...(sameAs.length ? { sameAs } : {}),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone,
            areaServed: "TR",
            availableLanguage: ["Turkish"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "eticaretus",
        inLanguage: "tr-TR",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const showCampaignBar = isCampaignActive(settings);

  return (
    <>
      {showCampaignBar && (
        <CampaignTopBar text={settings.campaignText} endsAt={settings.campaignEndsAt!.toISOString()} />
      )}
      <Header
        logoUrl={settings.logoUrl}
        whatsappNumber={settings.whatsappNumber}
        whatsappMessage={settings.whatsappMessage}
      />
      <main className="flex-1">{children}</main>
      <Footer
        logoUrl={settings.logoUrl}
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        instagramUrl={settings.instagramUrl}
        linkedinUrl={settings.linkedinUrl}
        facebookUrl={settings.facebookUrl}
        whatsappNumber={settings.whatsappNumber}
        whatsappMessage={settings.whatsappMessage}
      />
      <JsonLd data={buildOrganizationJsonLd(settings)} />
      <Analytics
        gtmId={settings.gtmId}
        ga4Id={settings.ga4Id}
        clarityId={settings.clarityId}
        metaPixelId={settings.metaPixelId}
      />
      <WhatsAppWidget
        number={settings.whatsappNumber}
        message={settings.whatsappMessage}
        avatarUrl={settings.whatsappAvatarUrl}
      />
    </>
  );
}
