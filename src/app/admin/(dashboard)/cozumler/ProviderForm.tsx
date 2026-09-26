import { SeoFields } from "@/components/admin/seo-fields";
import { AdminCard, Field, SelectField, SubmitButton, TextareaField, CheckboxField } from "@/components/admin/fields";
import { PROVIDER_STATUS, PROVIDER_STATUS_LABELS } from "@/lib/constants";

type ProviderData = {
  id?: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  advantages: string;
  suitableFor: string | null;
  status: string;
  order: number;
  seoTitle: string | null;
  seoDescription: string | null;
  noindex: boolean;
};

export function ProviderForm({
  provider,
  action,
}: {
  provider?: ProviderData;
  action: (formData: FormData) => void;
}) {
  const advantagesText: string[] = provider?.advantages ? JSON.parse(provider.advantages) : [];

  return (
    <form action={action} className="space-y-6">
      <AdminCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ad" name="name" defaultValue={provider?.name} required />
          <Field label="Slug" name="slug" defaultValue={provider?.slug} required placeholder="ideasoft" />
          <SelectField
            label="Durum"
            name="status"
            defaultValue={provider?.status ?? "active"}
            options={PROVIDER_STATUS.map((s) => ({ value: s, label: PROVIDER_STATUS_LABELS[s] }))}
          />
          <Field label="Sıra" name="order" type="number" defaultValue={provider?.order ?? 0} />
        </div>

        <div className="mt-4">
          <TextareaField label="Kısa Açıklama" name="shortDescription" defaultValue={provider?.shortDescription} rows={2} required />
        </div>
        <div className="mt-4">
          <TextareaField label="Detaylı Açıklama" name="description" defaultValue={provider?.description} rows={5} required />
        </div>
        <div className="mt-4">
          <TextareaField
            label="Avantajlar (her satıra bir avantaj)"
            name="advantages"
            defaultValue={advantagesText.join("\n")}
            rows={4}
          />
        </div>
        <div className="mt-4">
          <TextareaField label="Kimler İçin Uygun?" name="suitableFor" defaultValue={provider?.suitableFor} rows={2} />
        </div>

        <h3 className="mt-6 mb-3 text-sm font-bold text-ink">SEO</h3>
        <div>
          <SeoFields title={provider?.seoTitle} description={provider?.seoDescription} />
        </div>
        <div className="mt-3">
          <CheckboxField label="Arama motorlarında gizle (noindex)" name="noindex" defaultChecked={provider?.noindex} />
        </div>

        <div className="mt-6">
          <SubmitButton />
        </div>
      </AdminCard>
    </form>
  );
}
