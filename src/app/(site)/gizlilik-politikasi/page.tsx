import type { Metadata } from "next";
import { LegalPageBody } from "@/components/site/LegalPageBody";
import { getPageBySlug } from "@/lib/queries";
import { cleanTitle } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("gizlilik-politikasi");
  return {
    title: cleanTitle(page?.seoTitle) ?? "Gizlilik Politikası",
    description: page?.seoDescription ?? "eticaretus gizlilik politikası: ziyaretçi ve müşteri verilerinin nasıl toplandığı, kullanıldığı ve korunduğu.",
    robots: { index: false, follow: false },
  };
}

export default function PrivacyPage() {
  return <LegalPageBody slug="gizlilik-politikasi" />;
}
