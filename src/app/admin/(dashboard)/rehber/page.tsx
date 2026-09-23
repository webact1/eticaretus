import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader
        title="Rehber"
        action={
          <Link href="/admin/rehber/yeni" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
            + Yeni Yazı
          </Link>
        }
      />
      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs font-bold uppercase tracking-wide text-muted">
            <tr>
              <th className="p-4">Başlık</th>
              <th className="p-4">Durum</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="p-4 font-medium text-ink">{post.title}</td>
                <td className="p-4 text-muted">{post.published ? "Yayında" : "Taslak"}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/rehber/${post.id}`} className="font-semibold text-brand">
                    Düzenle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="p-8 text-center text-sm text-muted">Henüz yazı yok.</p>}
      </div>
    </div>
  );
}
