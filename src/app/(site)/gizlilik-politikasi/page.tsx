import type { Metadata } from "next";
import { LegalPageBody } from "@/components/site/LegalPageBody";
import { getPageBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("gizlilik-politikasi");
  return { title: page?.seoTitle ?? "Gizlilik Politikası", robots: { index: false, follow: false } };
}

export default function PrivacyPage() {
  return <LegalPageBody slug="gizlilik-politikasi" />;
}
