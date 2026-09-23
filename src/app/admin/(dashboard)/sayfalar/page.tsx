import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";

export default async function PagesAdminPage() {
  const pages = await prisma.page.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Sayfalar" />
      <p className="mb-4 text-sm text-muted">
        Bu sayfaların yapısı sabittir; başlık, metin, görsel ve SEO alanlarını düzenleyebilirsiniz.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs font-bold uppercase tracking-wide text-muted">
            <tr>
              <th className="p-4">Başlık</th>
              <th className="p-4">Yayın Durumu</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pages.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-medium text-ink">{p.title}</td>
                <td className="p-4 text-muted">{p.published ? "Yayında" : "Taslak"}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/sayfalar/${p.slug}`} className="font-semibold text-brand">
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
