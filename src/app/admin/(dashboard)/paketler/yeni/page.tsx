import { AdminCard, AdminPageHeader, CheckboxField, Field, SelectField, SubmitButton, TextareaField } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { createPackage } from "../actions";

export default async function NewPackagePage() {
  const providers = await prisma.provider.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Yeni Paket" />
      <form action={createPackage}>
        <AdminCard>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Sağlayıcı"
              name="providerId"
              options={providers.map((p) => ({ value: p.id, label: p.name }))}
            />
            <Field label="Paket Adı" name="name" required />
            <Field label="Slug" name="slug" required placeholder="starter" />
            <Field label="Sıra" name="order" type="number" defaultValue={0} />
            <Field label="Fiyat (₺)" name="price" type="number" />
            <Field label="Eski Fiyat (₺)" name="oldPrice" type="number" />
            <Field label="Fatura Notu" name="billingNote" placeholder="/yıl" />
            <Field label="Kampanya Etiketi" name="campaignLabel" placeholder="%20 İndirim" />
          </div>
          <div className="mt-4">
            <TextareaField label="Kısa Açıklama" name="shortDescription" rows={2} />
          </div>
          <div className="mt-4 flex items-center gap-6">
            <CheckboxField label="Öne Çıkan Paket" name="featured" />
            <CheckboxField label="Aktif" name="active" defaultChecked />
          </div>

          <h3 className="mt-6 mb-3 text-sm font-bold text-ink">SEO</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="SEO Başlık" name="seoTitle" />
            <Field label="SEO Açıklama" name="seoDescription" />
          </div>

          <div className="mt-6">
            <SubmitButton label="Oluştur ve Özellikleri Düzenle" />
          </div>
        </AdminCard>
      </form>
    </div>
  );
}
