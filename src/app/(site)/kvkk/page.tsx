import type { Metadata } from "next";
import { LegalPageBody } from "@/components/site/LegalPageBody";
import { getPageBySlug } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("kvkk");
  return { title: page?.seoTitle ?? "KVKK Aydınlatma Metni", robots: { index: false, follow: false } };
}

export default function KvkkPage() {
  return <LegalPageBody slug="kvkk" />;
}
