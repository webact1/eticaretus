import { AdminCard, AdminPageHeader, CheckboxField, DeleteButton, Field, ImageField, SelectField, SubmitButton, TextareaField } from "@/components/admin/fields";
import { TESTIMONIAL_SOURCE_TYPE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "./actions";

const SOURCE_LABELS: Record<string, string> = {
  ideasoft: "IdeaSoft (resmi kaynak)",
  eticaretus: "eticaretus (doğrulanmış müşteri)",
};

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Müşteri Yorumları" />
      <p className="text-sm text-muted">
        Sahte yorum eklemeyin. &quot;eticaretus&quot; kaynak tipini yalnızca doğrulanmış gerçek müşteri yorumları için kullanın.
      </p>

      {testimonials.map((t) => (
        <form key={t.id} action={updateTestimonial.bind(null, t.id)}>
          <AdminCard>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ad Soyad" name="personName" defaultValue={t.personName} required />
              <Field label="Ünvan/Rol (opsiyonel)" name="role" defaultValue={t.role} />
              <Field label="Marka Adı" name="brandName" defaultValue={t.brandName} />
              <Field label="Domain" name="domain" defaultValue={t.domain} />
              <SelectField
                label="Kaynak Tipi"
                name="sourceType"
                defaultValue={t.sourceType}
                options={TESTIMONIAL_SOURCE_TYPE.map((s) => ({ value: s, label: SOURCE_LABELS[s] }))}
              />
              <Field label="Kaynak URL" name="sourceUrl" defaultValue={t.sourceUrl} />
              <Field label="Sıra" name="order" type="number" defaultValue={t.order} />
              <Field label="Yıldız (opsiyonel, doğrulanmadan girmeyin)" name="rating" type="number" defaultValue={t.rating} />
            </div>
            <div className="mt-4">
              <TextareaField label="Yorum" name="quote" defaultValue={t.quote} rows={3} required />
            </div>
            <div className="mt-4">
              <ImageField label="Fotoğraf (yoksa monogram gösterilir)" name="avatarFile" currentUrl={t.avatarUrl} />
            </div>
            <div className="mt-4">
              <CheckboxField label="Aktif" name="active" defaultChecked={t.active} />
            </div>
            <div className="mt-5">
              <SubmitButton />
            </div>
          </AdminCard>
        </form>
      ))}

      <AdminCard title="Yeni Yorum Ekle">
        <form action={createTestimonial}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Ad Soyad" name="personName" required />
            <Field label="Ünvan/Rol (opsiyonel)" name="role" />
            <Field label="Marka Adı" name="brandName" />
            <Field label="Domain" name="domain" />
            <SelectField
              label="Kaynak Tipi"
              name="sourceType"
              defaultValue="ideasoft"
              options={TESTIMONIAL_SOURCE_TYPE.map((s) => ({ value: s, label: SOURCE_LABELS[s] }))}
            />
            <Field label="Kaynak URL" name="sourceUrl" />
            <Field label="Sıra" name="order" type="number" defaultValue={testimonials.length} />
            <Field label="Yıldız (opsiyonel)" name="rating" type="number" />
          </div>
          <div className="mt-4">
            <TextareaField label="Yorum" name="quote" rows={3} required />
          </div>
          <div className="mt-4">
            <ImageField label="Fotoğraf" name="avatarFile" />
          </div>
          <div className="mt-4">
            <CheckboxField label="Aktif" name="active" defaultChecked />
          </div>
          <div className="mt-5">
            <SubmitButton label="Ekle" />
          </div>
        </form>
      </AdminCard>

      {testimonials.length > 0 && (
        <AdminCard title="Silme">
          <div className="flex flex-col gap-2">
            {testimonials.map((t) => (
              <form key={t.id} action={deleteTestimonial} className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
                <span className="truncate text-sm text-ink">{t.personName} — {t.brandName}</span>
                <input type="hidden" name="id" value={t.id} />
                <DeleteButton />
              </form>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
