import { AdminCard, AdminPageHeader, Field, ImageField, SubmitButton, TextareaField } from "@/components/admin/fields";
import { getSiteSettings, getHomeContent } from "@/lib/settings";
import { updateSiteSettings, updateHomeContent } from "./actions";

export default async function GeneralSettingsPage({
  searchParams,
}: PageProps<"/admin/genel-ayarlar">) {
  const params = await searchParams;
  const saved = params.saved === "1";
  const [settings, home] = await Promise.all([getSiteSettings(), getHomeContent()]);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Genel Ayarlar" />
      {saved && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Değişiklikler kaydedildi.</div>
      )}

      <form action={updateSiteSettings}>
        <AdminCard title="Firma ve İletişim Bilgileri">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Site Adı" name="siteName" defaultValue={settings.siteName} />
            <Field label="Telefon" name="phone" defaultValue={settings.phone} />
            <Field label="E-posta" name="email" defaultValue={settings.email} />
            <Field label="Adres" name="address" defaultValue={settings.address} />
            <Field label="WhatsApp Numarası (90...)" name="whatsappNumber" defaultValue={settings.whatsappNumber} required />
            <Field label="Instagram URL" name="instagramUrl" defaultValue={settings.instagramUrl} />
            <Field label="LinkedIn URL" name="linkedinUrl" defaultValue={settings.linkedinUrl} />
            <Field label="Facebook URL" name="facebookUrl" defaultValue={settings.facebookUrl} />
          </div>
          <div className="mt-4">
            <TextareaField label="WhatsApp Karşılama/Varsayılan Mesajı" name="whatsappMessage" defaultValue={settings.whatsappMessage} rows={2} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <ImageField label="Logo" name="logoFile" currentUrl={settings.logoUrl} />
            <ImageField label="Favicon" name="faviconFile" currentUrl={settings.faviconUrl} />
            <ImageField label="WhatsApp Danışman Fotoğrafı" name="whatsappAvatarFile" currentUrl={settings.whatsappAvatarUrl} />
          </div>

          <h3 className="mt-6 mb-3 text-sm font-bold text-ink">Google / Analitik Entegrasyonları</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Google Tag Manager ID" name="gtmId" defaultValue={settings.gtmId} placeholder="GTM-XXXXXXX" />
            <Field label="GA4 Ölçüm ID" name="ga4Id" defaultValue={settings.ga4Id} placeholder="G-XXXXXXXXXX" />
            <Field label="Meta Pixel ID" name="metaPixelId" defaultValue={settings.metaPixelId} />
            <Field label="Microsoft Clarity ID" name="clarityId" defaultValue={settings.clarityId} />
            <Field label="Google Search Console Doğrulama Kodu" name="gscVerification" defaultValue={settings.gscVerification} />
          </div>

          <div className="mt-5">
            <SubmitButton />
          </div>
        </AdminCard>
      </form>

      <form action={updateHomeContent}>
        <AdminCard title="Ana Sayfa İçerikleri">
          <div className="grid gap-4">
            <Field label="Hero Rozeti" name="heroBadge" defaultValue={home.heroBadge} />
            <Field label="Hero Başlık" name="heroTitle" defaultValue={home.heroTitle} />
            <TextareaField label="Hero Alt Metin" name="heroSubtitle" defaultValue={home.heroSubtitle} rows={2} />
            <ImageField label="Hero Görseli" name="heroImageFile" currentUrl={home.heroImageUrl} />
          </div>

          <div className="mt-6 grid gap-4">
            <Field label="'Sizin İçin Buradayız' Başlığı" name="aboutTitle" defaultValue={home.aboutTitle} />
            <TextareaField label="'Sizin İçin Buradayız' Metni" name="aboutText" defaultValue={home.aboutText} rows={2} />
            <ImageField label="'Sizin İçin Buradayız' Görseli" name="aboutImageFile" currentUrl={home.aboutImageUrl} />
          </div>

          <div className="mt-6 grid gap-4">
            <Field label="Alt CTA Başlığı" name="ctaTitle" defaultValue={home.ctaTitle} />
            <TextareaField label="Alt CTA Metni" name="ctaText" defaultValue={home.ctaText} rows={2} />
          </div>

          <div className="mt-5">
            <SubmitButton />
          </div>
        </AdminCard>
      </form>
    </div>
  );
}
