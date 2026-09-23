"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Genel Bakış", href: "/admin" },
  { label: "E-Ticaret Çözümleri", href: "/admin/cozumler" },
  { label: "Paketler", href: "/admin/paketler" },
  { label: "Hizmetler", href: "/admin/hizmetler" },
  { label: "Sayfalar", href: "/admin/sayfalar" },
  { label: "Rehber", href: "/admin/rehber" },
  { label: "Referans Logolar", href: "/admin/referans-logolar" },
  { label: "Müşteri Yorumları", href: "/admin/yorumlar" },
  { label: "SSS", href: "/admin/sss" },
  { label: "Talepler", href: "/admin/talepler" },
  { label: "Genel Ayarlar", href: "/admin/genel-ayarlar" },
];

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Menü"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition hover:bg-surface lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between gap-2.5 border-b border-border px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white">
                  E
                </span>
                <span className="text-sm font-bold text-ink">eticaretus Panel</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition hover:bg-surface hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
