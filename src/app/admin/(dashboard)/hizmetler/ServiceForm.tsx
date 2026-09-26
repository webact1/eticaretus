import { SeoFields } from "@/components/admin/seo-fields";
import { AdminCard, CheckboxField, Field, SubmitButton, TextareaField } from "@/components/admin/fields";

type ServiceData = {
  id?: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string | null;
  order: number;
  active: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};

export function ServiceForm({ service, action }: { service?: ServiceData; action: (formData: FormData) => void }) {
  return (
    <form action={action}>
      <AdminCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ad" name="name" defaultValue={service?.name} required />
          <Field label="Slug" name="slug" defaultValue={service?.slug} required />
          <Field
            label="İkon (lucide-react ikon adı)"
            name="icon"
            defaultValue={service?.icon}
            placeholder="Store, Search, CreditCard…"
          />
          <Field label="Sıra" name="order" type="number" defaultValue={service?.order ?? 0} />
        </div>
        <div className="mt-4">
          <TextareaField label="Kısa Açıklama" name="shortDescription" defaultValue={service?.shortDescription} rows={2} required />
        </div>
        <div className="mt-4">
          <TextareaField label="Detaylı Açıklama" name="description" defaultValue={service?.description} rows={5} required />
        </div>
        <div className="mt-4">
          <CheckboxField label="Aktif" name="active" defaultChecked={service?.active ?? true} />
        </div>

        <h3 className="mt-6 mb-3 text-sm font-bold text-ink">SEO</h3>
        <div>
          <SeoFields title={service?.seoTitle} description={service?.seoDescription} />
        </div>

        <div className="mt-6">
          <SubmitButton />
        </div>
      </AdminCard>
    </form>
  );
}
