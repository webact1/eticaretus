import { SeoFields } from "@/components/admin/seo-fields";
import { notFound } from "next/navigation";
import { AdminCard, AdminPageHeader, CheckboxField, Field, ImageField, SubmitButton, TextareaField } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { updatePage } from "../actions";

export default async function EditPagePage({
  params,
  searchParams,
}: PageProps<"/admin/sayfalar/[slug]">) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) notFound();

  const action = updatePage.bind(null, page.id, page.slug);

  return (
    <div className="space-y-4">
      <AdminPageHeader title={`Düzenle: ${page.title}`} />
      {sp.saved === "1" && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Değişiklikler kaydedildi.</div>
      )}
      <form action={action}>
        <AdminCard>
          <Field label="Başlık" name="title" defaultValue={page.title} required />
          <div className="mt-4">
            <TextareaField label="İçerik" name="content" defaultValue={page.content} rows={10} required />
          </div>
          <div className="mt-4">
            <ImageField label="Görsel" name="imageFile" currentUrl={page.imageUrl} />
          </div>
          <div className="mt-4">
            <CheckboxField label="Yayında" name="published" defaultChecked={page.published} />
          </div>

          <h3 className="mt-6 mb-3 text-sm font-bold text-ink">SEO</h3>
          <div>
            <SeoFields title={page.seoTitle} description={page.seoDescription} />
          </div>
          <div className="mt-3">
            <CheckboxField label="Arama motorlarında gizle (noindex)" name="noindex" defaultChecked={page.noindex} />
          </div>

          <div className="mt-6">
            <SubmitButton />
          </div>
        </AdminCard>
      </form>
    </div>
  );
}
