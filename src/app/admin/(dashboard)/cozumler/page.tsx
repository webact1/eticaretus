import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { PROVIDER_STATUS_LABELS, type ProviderStatus } from "@/lib/constants";

export default async function ProvidersAdminPage() {
  const providers = await prisma.provider.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader
        title="E-Ticaret Çözümleri"
        action={
          <Link
            href="/admin/cozumler/yeni"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
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
              <th className="p-4">Sıra</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {providers.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-medium text-ink">{p.name}</td>
                <td className="p-4 text-muted">{PROVIDER_STATUS_LABELS[p.status as ProviderStatus] ?? p.status}</td>
                <td className="p-4 text-muted">{p.order}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/cozumler/${p.id}`} className="font-semibold text-brand">
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
