import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";

export default async function PackagesAdminPage() {
  const packages = await prisma.package.findMany({ orderBy: [{ providerId: "asc" }, { order: "asc" }], include: { provider: true } });

  return (
    <div>
      <AdminPageHeader
        title="Paketler"
        action={
          <Link href="/admin/paketler/yeni" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
            + Yeni Ekle
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs font-bold uppercase tracking-wide text-muted">
            <tr>
              <th className="p-4">Sağlayıcı</th>
              <th className="p-4">Paket</th>
              <th className="p-4">Fiyat</th>
              <th className="p-4">Durum</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td className="p-4 text-muted">{pkg.provider.name}</td>
                <td className="p-4 font-medium text-ink">
                  {pkg.name}
                  {pkg.featured && <span className="ml-2 rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold text-brand">Öne Çıkan</span>}
                </td>
                <td className="p-4 text-muted">{pkg.price ? `${pkg.price.toLocaleString("tr-TR")} ₺` : "—"}</td>
                <td className="p-4 text-muted">{pkg.active ? "Aktif" : "Pasif"}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/paketler/${pkg.id}`} className="font-semibold text-brand">
                    Düzenle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
