import { AdminPageHeader } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { LeadStatusSelect } from "./LeadStatusSelect";

export default async function LeadsAdminPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Talepler" />
      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-surface text-left text-xs font-bold uppercase tracking-wide text-muted">
            <tr>
              <th className="p-4">Tarih</th>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">Telefon</th>
              <th className="p-4">Altyapı / Paket</th>
              <th className="p-4">Kaynak</th>
              <th className="p-4">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="p-4 whitespace-nowrap text-muted">
                  {new Intl.DateTimeFormat("tr-TR", { dateStyle: "short", timeStyle: "short" }).format(lead.createdAt)}
                </td>
                <td className="p-4">
                  <p className="font-medium text-ink">{lead.name}</p>
                  {lead.company && <p className="text-xs text-muted">{lead.company}</p>}
                </td>
                <td className="p-4 text-ink/80">
                  {lead.phone}
                  {lead.email && <p className="text-xs text-muted">{lead.email}</p>}
                </td>
                <td className="p-4 text-ink/80">
                  {[lead.provider, lead.packageName].filter(Boolean).join(" — ") || "—"}
                </td>
                <td className="p-4 text-xs text-muted">{lead.sourcePage ?? "—"}</td>
                <td className="p-4">
                  <LeadStatusSelect id={lead.id} status={lead.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <p className="p-8 text-center text-sm text-muted">Henüz talep yok.</p>}
      </div>
    </div>
  );
}
