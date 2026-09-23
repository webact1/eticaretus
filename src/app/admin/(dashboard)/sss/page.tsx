import { AdminCard, AdminPageHeader, CheckboxField, DeleteButton, Field, SubmitButton, TextareaField } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { createFaq, updateFaq, deleteFaq } from "./actions";

export default async function FaqAdminPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Sıkça Sorulan Sorular" />

      {faqs.map((faq) => (
        <form key={faq.id} action={updateFaq.bind(null, faq.id)}>
          <AdminCard>
            <Field label="Soru" name="question" defaultValue={faq.question} required />
            <div className="mt-4">
              <TextareaField label="Cevap" name="answer" defaultValue={faq.answer} rows={3} required />
            </div>
            <div className="mt-4 flex items-center gap-6">
              <div className="w-32">
                <Field label="Sıra" name="order" type="number" defaultValue={faq.order} />
              </div>
              <CheckboxField label="Aktif" name="active" defaultChecked={faq.active} />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <SubmitButton />
            </div>
          </AdminCard>
        </form>
      ))}

      <AdminCard title="Yeni Soru Ekle">
        <form action={createFaq}>
          <Field label="Soru" name="question" required />
          <div className="mt-4">
            <TextareaField label="Cevap" name="answer" rows={3} required />
          </div>
          <div className="mt-4 flex items-center gap-6">
            <div className="w-32">
              <Field label="Sıra" name="order" type="number" defaultValue={faqs.length} />
            </div>
            <CheckboxField label="Aktif" name="active" defaultChecked />
          </div>
          <div className="mt-5">
            <SubmitButton label="Ekle" />
          </div>
        </form>
      </AdminCard>

      {faqs.length > 0 && (
        <AdminCard title="Silme">
          <p className="mb-3 text-sm text-muted">Silmek istediğiniz soruyu seçin.</p>
          <div className="flex flex-col gap-2">
            {faqs.map((faq) => (
              <form key={faq.id} action={deleteFaq} className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
                <span className="truncate text-sm text-ink">{faq.question}</span>
                <input type="hidden" name="id" value={faq.id} />
                <DeleteButton />
              </form>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
