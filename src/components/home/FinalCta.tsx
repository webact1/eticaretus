import { ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta({
  title,
  text,
  whatsappNumber,
  whatsappMessage,
}: {
  title: string;
  text: string;
  whatsappNumber: string;
  whatsappMessage: string;
}) {
  const href = buildWhatsAppUrl(whatsappNumber, whatsappMessage);

  return (
    <section className="bg-navy py-14">
      <div
        className="animate-gradient-shift container-page flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-brand via-brand-2 to-brand px-6 py-8 text-center shadow-xl shadow-brand/20 sm:flex-row sm:text-left sm:px-10"
      >
        <div>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-white/85">{text}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand shadow-lg transition hover:bg-white/90"
        >
          WhatsApp&apos;tan Ulaş
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
