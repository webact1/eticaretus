import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eticaretus.com.tr"),
  title: {
    default: "eticaretus — İşletmenize Uygun E-Ticaret Altyapısı",
    template: "%s | eticaretus",
  },
  description:
    "eticaretus, IdeaSoft ve diğer e-ticaret altyapıları arasından işletmenize en uygun çözümü seçmeniz, kurulum ve danışmanlık süreçlerinde yanınızda olur.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "eticaretus",
      url: "https://eticaretus.com.tr",
      logo: "https://eticaretus.com.tr/favicon.ico",
    },
    {
      "@type": "WebSite",
      name: "eticaretus",
      url: "https://eticaretus.com.tr",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
