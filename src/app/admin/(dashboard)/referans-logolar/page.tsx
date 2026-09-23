import { AdminCard, AdminPageHeader, CheckboxField, DeleteButton, Field, ImageField, SelectField, SubmitButton } from "@/components/admin/fields";
import { REFERENCE_SOURCE_TYPE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { createReferenceLogo, updateReferenceLogo, deleteReferenceLogo } from "./actions";

const SOURCE_LABELS: Record<string, string> = {
  ideasoft_reference: "IdeaSoft Referansı",
  eticaretus_reference: "eticaretus Müşterisi",
};

export default async function ReferenceLogosAdminPage() {
  const logos = await prisma.referenceLogo.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Referans Logolar" />
      <p className="text-sm text-muted">
        &quot;eticaretus Müşterisi&quot; olarak yalnızca doğrulanmış gerçek eticaretus müşterilerini işaretleyin.
      </p>

      {logos.map((logo) => (
        <form key={logo.id} action={updateReferenceLogo.bind(null, logo.id)}>
          <AdminCard>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Marka Adı" name="brandName" defaultValue={logo.brandName} required />
              <Field label="Alt Metin" name="altText" defaultValue={logo.altText} />
              <Field label="Bağlantı (opsiyonel)" name="link" defaultValue={logo.link} />
              <Field label="Sıra" name="order" type="number" defaultValue={logo.order} />
              <SelectField
                label="Kaynak Tipi"
                name="sourceType"
                defaultValue={logo.sourceType}
                options={REFERENCE_SOURCE_TYPE.map((s) => ({ value: s, label: SOURCE_LABELS[s] }))}
              />
              <Field label="Kaynak URL" name="sourceUrl" defaultValue={logo.sourceUrl} />
            </div>
            <div className="mt-4">
              <ImageField label="Logo" name="logoFile" currentUrl={logo.logoUrl} />
            </div>
            <div className="mt-4">
              <CheckboxField label="Aktif" name="active" defaultChecked={logo.active} />
            </div>
            <div className="mt-5">
              <SubmitButton />
            </div>
          </AdminCard>
        </form>
      ))}

      <AdminCard title="Yeni Logo Ekle">
        <form action={createReferenceLogo}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Marka Adı" name="brandName" required />
            <Field label="Alt Metin" name="altText" />
            <Field label="Bağlantı (opsiyonel)" name="link" />
            <Field label="Sıra" name="order" type="number" defaultValue={logos.length} />
            <SelectField
              label="Kaynak Tipi"
              name="sourceType"
              defaultValue="ideasoft_reference"
              options={REFERENCE_SOURCE_TYPE.map((s) => ({ value: s, label: SOURCE_LABELS[s] }))}
            />
            <Field label="Kaynak URL" name="sourceUrl" />
          </div>
          <div className="mt-4">
            <ImageField label="Logo" name="logoFile" />
          </div>
          <div className="mt-4">
            <CheckboxField label="Aktif" name="active" defaultChecked />
          </div>
          <div className="mt-5">
            <SubmitButton label="Ekle" />
          </div>
        </form>
      </AdminCard>

      {logos.length > 0 && (
        <AdminCard title="Silme">
          <div className="flex flex-col gap-2">
            {logos.map((logo) => (
              <form key={logo.id} action={deleteReferenceLogo} className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
                <span className="truncate text-sm text-ink">{logo.brandName}</span>
                <input type="hidden" name="id" value={logo.id} />
                <DeleteButton />
              </form>
            ))}
          </div>
        </AdminCard>
      )}
    </div>
  );
}
