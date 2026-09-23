import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const [leadCount, newLeadCount, providerCount, packageCount] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.provider.count(),
    prisma.package.count(),
  ]);

  const cards = [
    { label: "Toplam Talep", value: leadCount, href: "/admin/talepler" },
    { label: "Yeni Talep", value: newLeadCount, href: "/admin/talepler" },
    { label: "E-Ticaret Çözümü", value: providerCount, href: "/admin/cozumler" },
    { label: "Paket", value: packageCount, href: "/admin/paketler" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-ink">Genel Bakış</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-border bg-white p-5 transition hover:border-brand"
          >
            <p className="text-2xl font-extrabold text-ink">{c.value}</p>
            <p className="mt-1 text-sm text-muted">{c.label}</p>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Yeni talepler için{" "}
        <Link href="/admin/talepler" className="font-semibold text-brand">
          Talepler
        </Link>{" "}
        sayfasını, site içeriğini güncellemek için soldaki menüyü kullanın.
      </p>
    </div>
  );
}
