import type { Metadata } from "next";
import { NotFoundContent } from "@/components/site/NotFoundContent";

export const metadata: Metadata = { title: "Sayfa Bulunamadı", robots: { index: false, follow: false } };

export default function NotFound() {
  return <NotFoundContent />;
}
