import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_LOGO } from "@/lib/constants";
import { requireAdminSession } from "@/lib/session";
import { logout } from "@/app/admin/login/actions";
import { AdminMobileNav } from "./AdminMobileNav";

export const metadata: Metadata = {
  title: { default: "Yönetim Paneli", template: "%s | eticaretus Panel" },
  robots: { index: false, follow: false },
};

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

export default async function AdminDashboardLayout({ children }: LayoutProps<"/admin">) {
  const session = await requireAdminSession();

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
        <div className="flex h-16 items-center justify-between gap-2 border-b border-border px-5">
          <Image src={DEFAULT_LOGO} alt="eticaretus" width={120} height={27} className="h-7 w-auto" />
          <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-semibold text-muted">Panel</span>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition hover:bg-surface hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <AdminMobileNav />
            <p className="text-sm font-medium text-ink">Merhaba, {session.name}</p>
          </div>
          <form action={logout}>
            <button type="submit" className="text-sm font-medium text-muted transition hover:text-brand">
              Çıkış Yap
            </button>
          </form>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
