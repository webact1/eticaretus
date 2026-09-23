import { notFound } from "next/navigation";
import { AdminCard, AdminPageHeader, CheckboxField, DangerZone, Field, SelectField, SubmitButton, TextareaField } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { updatePackage, deletePackage } from "../actions";

export default async function EditPackagePage({
  params,
  searchParams,
}: PageProps<"/admin/paketler/[id]">) {
  const { id } = await params;
  const sp = await searchParams;

  const [pkg, providers, categories] = await Promise.all([
    prisma.package.findUnique({ where: { id }, include: { packageFeatures: true } }),
    prisma.provider.findMany({ orderBy: { order: "asc" } }),
    prisma.featureCategory.findMany({ orderBy: { order: "asc" }, include: { features: { orderBy: { order: "asc" } } } }),
  ]);
  if (!pkg) notFound();

  const pfByFeatureId = new Map(pkg.packageFeatures.map((pf) => [pf.featureId, pf]));

  return (
    <div className="space-y-6">
      <AdminPageHeader title={`Düzenle: ${pkg.name}`} />
      {(sp.saved === "1" || sp.created === "1") && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {sp.created === "1" ? "Paket oluşturuldu. Şimdi özellikleri düzenleyebilirsiniz." : "Değişiklikler kaydedildi."}
        </div>
      )}

      <form action={updatePackage.bind(null, pkg.id)} className="space-y-6">
        <AdminCard title="Genel Bilgiler">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Sağlayıcı"
              name="providerId"
              defaultValue={pkg.providerId}
              options={providers.map((p) => ({ value: p.id, label: p.name }))}
            />
            <Field label="Paket Adı" name="name" defaultValue={pkg.name} required />
            <Field label="Slug" name="slug" defaultValue={pkg.slug} required />
            <Field label="Sıra" name="order" type="number" defaultValue={pkg.order} />
            <Field label="Fiyat (₺)" name="price" type="number" defaultValue={pkg.price} />
            <Field label="Eski Fiyat (₺)" name="oldPrice" type="number" defaultValue={pkg.oldPrice} />
            <Field label="Fatura Notu" name="billingNote" defaultValue={pkg.billingNote} />
            <Field label="Kampanya Etiketi" name="campaignLabel" defaultValue={pkg.campaignLabel} />
          </div>
          <div className="mt-4">
            <TextareaField label="Kısa Açıklama" name="shortDescription" defaultValue={pkg.shortDescription} rows={2} />
          </div>
          <div className="mt-4 flex items-center gap-6">
            <CheckboxField label="Öne Çıkan Paket" name="featured" defaultChecked={pkg.featured} />
            <CheckboxField label="Aktif" name="active" defaultChecked={pkg.active} />
          </div>

          <h3 className="mt-6 mb-3 text-sm font-bold text-ink">SEO</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="SEO Başlık" name="seoTitle" defaultValue={pkg.seoTitle} />
            <Field label="SEO Açıklama" name="seoDescription" defaultValue={pkg.seoDescription} />
          </div>
        </AdminCard>

        <AdminCard title="Özellikler">
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.id}>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">{cat.name}</p>
                <div className="space-y-3">
                  {cat.features.map((feature) => {
                    const pf = pfByFeatureId.get(feature.id);
                    return (
                      <div key={feature.id} className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
                        <label className="flex items-center gap-2 text-sm font-medium text-ink">
                          <input
                            type="checkbox"
                            name={`feature_${feature.id}_included`}
                            defaultChecked={pf?.included ?? false}
                            className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                          />
                          {feature.name}
                        </label>
                        <span className="hidden text-xs text-muted sm:block">değer</span>
                        <input
                          name={`feature_${feature.id}_value`}
                          defaultValue={pf?.value ?? ""}
                          placeholder="örn. 500 ürün / Sınırsız / boş bırak"
                          className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        <SubmitButton />
      </form>

      <DangerZone action={deletePackage} hiddenFields={{ id: pkg.id }} confirmLabel="Bu paketi sil" />
    </div>
  );
}
