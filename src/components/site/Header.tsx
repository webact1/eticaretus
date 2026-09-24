"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DEFAULT_LOGO, MAIN_NAV, SITE_NAME } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  logoUrl?: string | null;
  whatsappNumber: string;
  whatsappMessage: string;
};

export function Header({ logoUrl, whatsappNumber, whatsappMessage }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const whatsappHref = buildWhatsAppUrl(whatsappNumber, whatsappMessage);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-200 ${
        scrolled ? "border-border bg-white/90 backdrop-blur-md" : "border-transparent bg-white"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between py-3">
        <Link href="/" className="flex items-center" aria-label={`${SITE_NAME} ana sayfa`}>
          <Image
            src={logoUrl || DEFAULT_LOGO}
            alt={SITE_NAME}
            width={158}
            height={36}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {MAIN_NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-brand" : "text-ink/80 hover:text-brand"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-2 md:flex"
          >
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
            WhatsApp&apos;tan Ulaş
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menü"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-surface xl:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-ink transition-transform ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-ink transition-opacity ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-0.5 w-5 rounded-full bg-ink transition-transform ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      <div
        className={`fixed inset-x-0 top-[4.5rem] z-30 origin-top border-b border-border bg-white shadow-lg transition-all duration-200 xl:hidden ${
          menuOpen ? "visible scale-y-100 opacity-100" : "invisible scale-y-95 opacity-0"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-3">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-ink transition hover:bg-surface"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp&apos;tan Ulaş
          </a>
        </nav>
      </div>
    </header>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 0C7.164 0 0 7.163 0 16.001c0 2.822.744 5.554 2.157 7.94L.06 31.94a.6.6 0 0 0 .733.73l8.2-2.145a15.94 15.94 0 0 0 6.99 1.62h.006C24.837 32.145 32 24.98 32 16.144 32 7.306 24.842.001 16.004 0Zm0 29.146a13.1 13.1 0 0 1-6.68-1.83l-.479-.286-4.868 1.274 1.298-4.746-.312-.487a13.09 13.09 0 0 1-2.02-6.99c0-7.24 5.892-13.13 13.135-13.13 3.508 0 6.804 1.368 9.28 3.847a13.03 13.03 0 0 1 3.847 9.29c-.004 7.24-5.896 13.058-13.201 13.058Zm7.194-9.78c-.395-.198-2.337-1.153-2.7-1.285-.362-.132-.626-.198-.89.198-.264.395-1.022 1.285-1.253 1.549-.23.264-.46.297-.856.099-.395-.198-1.67-.616-3.183-1.965-1.177-1.05-1.972-2.347-2.203-2.742-.23-.395-.025-.61.198-.808.198-.198.46-.51.658-.775.198-.264.264-.46.396-.758.132-.297.066-.55-.033-.775-.099-.198-.89-2.148-1.22-2.94-.323-.775-.65-.66-.89-.677-.23-.017-.494-.017-.758-.017-.264 0-.692.099-1.055.494-.362.395-1.383 1.351-1.383 3.298 0 1.947 1.416 3.827 1.614 4.09.198.264 2.717 4.146 6.583 5.65 3.867 1.505 3.867.99 4.568.924.7-.066 2.337-.957 2.667-1.881.33-.924.33-1.716.23-1.881-.099-.165-.364-.264-.759-.462Z" />
    </svg>
  );
}
