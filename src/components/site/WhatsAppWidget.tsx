"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  number: string;
  message: string;
  avatarUrl?: string | null;
};

export function WhatsAppWidget({ number, message, avatarUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 600);
    return () => clearTimeout(t);
  }, []);

  const href = buildWhatsAppUrl(number, message);

  return (
    <>
      {/* Desktop floating widget */}
      <div className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-3 lg:flex">
        <div
          className={`w-80 origin-bottom-right overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-navy/10 transition-all duration-300 ${
            open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3.5">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/30">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Danışman" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/20 text-sm font-semibold text-white">
                  ET
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#075e54] bg-emerald-400" />
            </div>
            <div className="text-white">
              <p className="text-sm font-semibold leading-tight">eticaretus Danışman</p>
              <p className="text-xs text-white/70">Genellikle hemen yanıtlar</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="ml-auto rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="bg-[#e5ded8] px-4 py-4">
            <div className="max-w-[85%] rounded-xl rounded-tl-none bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm">
              Merhaba 👋 <br />
              İşletmeniz için en uygun e-ticaret altyapısını birlikte bulalım. Sorularınızı
              buradan iletebilirsiniz.
            </div>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-whatsapp px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp&apos;ta Sohbete Başla
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="WhatsApp ile iletişime geç"
          className={`group relative flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/30 transition-transform duration-300 hover:scale-105 ${
            entered ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          {!open && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/50" />
          )}
          {open ? <span className="text-2xl leading-none">✕</span> : <WhatsAppIcon className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(13,18,38,0.08)] backdrop-blur lg:hidden">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 text-sm font-semibold text-white shadow-lg shadow-whatsapp/30 transition active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp&apos;tan Danış
        </a>
      </div>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 0C7.164 0 0 7.163 0 16.001c0 2.822.744 5.554 2.157 7.94L.06 31.94a.6.6 0 0 0 .733.73l8.2-2.145a15.94 15.94 0 0 0 6.99 1.62h.006C24.837 32.145 32 24.98 32 16.144 32 7.306 24.842.001 16.004 0Zm0 29.146a13.1 13.1 0 0 1-6.68-1.83l-.479-.286-4.868 1.274 1.298-4.746-.312-.487a13.09 13.09 0 0 1-2.02-6.99c0-7.24 5.892-13.13 13.135-13.13 3.508 0 6.804 1.368 9.28 3.847a13.03 13.03 0 0 1 3.847 9.29c-.004 7.24-5.896 13.058-13.201 13.058Zm7.194-9.78c-.395-.198-2.337-1.153-2.7-1.285-.362-.132-.626-.198-.89.198-.264.395-1.022 1.285-1.253 1.549-.23.264-.46.297-.856.099-.395-.198-1.67-.616-3.183-1.965-1.177-1.05-1.972-2.347-2.203-2.742-.23-.395-.025-.61.198-.808.198-.198.46-.51.658-.775.198-.264.264-.46.396-.758.132-.297.066-.55-.033-.775-.099-.198-.89-2.148-1.22-2.94-.323-.775-.65-.66-.89-.677-.23-.017-.494-.017-.758-.017-.264 0-.692.099-1.055.494-.362.395-1.383 1.351-1.383 3.298 0 1.947 1.416 3.827 1.614 4.09.198.264 2.717 4.146 6.583 5.65 3.867 1.505 3.867.99 4.568.924.7-.066 2.337-.957 2.667-1.881.33-.924.33-1.716.23-1.881-.099-.165-.364-.264-.759-.462Z" />
    </svg>
  );
}
