import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppWidget } from "@/components/site/WhatsAppWidget";
import { getSiteSettings } from "@/lib/settings";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header
        logoUrl={settings.logoUrl}
        whatsappNumber={settings.whatsappNumber}
        whatsappMessage={settings.whatsappMessage}
      />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        instagramUrl={settings.instagramUrl}
        linkedinUrl={settings.linkedinUrl}
        facebookUrl={settings.facebookUrl}
      />
      <WhatsAppWidget
        number={settings.whatsappNumber}
        message={settings.whatsappMessage}
        avatarUrl={settings.whatsappAvatarUrl}
      />
    </>
  );
}
