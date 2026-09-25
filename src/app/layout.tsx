import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "eticaretus — İşletmenize Uygun E-Ticaret Altyapısı",
    template: "%s | eticaretus",
  },
  description:
    "eticaretus, IdeaSoft e-ticaret altyapısında işletmenize uygun paketi seçmenizi, kurulum ve danışmanlık süreçlerinde yanınızda olur.",
  applicationName: "eticaretus",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: "eticaretus",
    locale: "tr_TR",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
