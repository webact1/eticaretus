import type { Metadata } from "next";
import { LegalPageBody } from "@/components/site/LegalPageBody";
import { getPageBySlug } from "@/lib/queries";
import { cleanTitle } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("cerez-politikasi");
  return {
    title: cleanTitle(page?.seoTitle) ?? "Çerez Politikası",
    description: page?.seoDescription ?? "eticaretus çerez politikası: sitede kullanılan çerezler, amaçları ve tercihlerinizi nasıl yönetebileceğiniz.",
    robots: { index: false, follow: false },
  };
}

export default function CookiePage() {
  return <LegalPageBody slug="cerez-politikasi" />;
}
