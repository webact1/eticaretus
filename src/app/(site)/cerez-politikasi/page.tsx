import type { Metadata } from "next";
import { LegalPageBody } from "@/components/site/LegalPageBody";
import { getPageBySlug } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("cerez-politikasi");
  return { title: page?.seoTitle ?? "Çerez Politikası", robots: { index: false, follow: false } };
}

export default function CookiePage() {
  return <LegalPageBody slug="cerez-politikasi" />;
}
