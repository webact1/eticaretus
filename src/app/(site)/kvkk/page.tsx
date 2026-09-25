import type { Metadata } from "next";
import { LegalPageBody } from "@/components/site/LegalPageBody";
import { getPageBySlug } from "@/lib/queries";
import { cleanTitle } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("kvkk");
  return {
    title: cleanTitle(page?.seoTitle) ?? "KVKK Aydınlatma Metni",
    description: page?.seoDescription ?? "eticaretus KVKK aydınlatma metni: kişisel verilerinizin işlenmesi, saklanması ve haklarınız hakkında bilgilendirme.",
    robots: { index: false, follow: false },
  };
}

export default function KvkkPage() {
  return <LegalPageBody slug="kvkk" />;
}
