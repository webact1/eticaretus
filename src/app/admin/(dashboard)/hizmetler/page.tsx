import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader
        title="Hizmetler"
        action={
          <Link href="/admin/hizmetler/yeni" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
            + Yeni Ekle
          </Link>
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs font-bold uppercase tracking-wide text-muted">
            <tr>
              <th className="p-4">Ad</th>
              <th className="p-4">Durum</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((s) => (
              <tr key={s.id}>
                <td className="p-4 font-medium text-ink">{s.name}</td>
                <td className="p-4 text-muted">{s.active ? "Aktif" : "Pasif"}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/hizmetler/${s.id}`} className="font-semibold text-brand">
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
