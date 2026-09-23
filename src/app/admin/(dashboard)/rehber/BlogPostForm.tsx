import { AdminCard, CheckboxField, Field, ImageField, SubmitButton, TextareaField } from "@/components/admin/fields";

type BlogPostData = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string | null;
  published: boolean;
  coverImageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export function BlogPostForm({ post, action }: { post?: BlogPostData; action: (formData: FormData) => void }) {
  return (
    <form action={action}>
      <AdminCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Başlık" name="title" defaultValue={post?.title} required />
          <Field label="Slug" name="slug" defaultValue={post?.slug} required />
          <Field label="Kategori" name="category" defaultValue={post?.category} />
        </div>
        <div className="mt-4">
          <TextareaField label="Özet" name="excerpt" defaultValue={post?.excerpt} rows={2} required />
        </div>
        <div className="mt-4">
          <TextareaField label="İçerik" name="content" defaultValue={post?.content} rows={10} required />
        </div>
        <div className="mt-4">
          <ImageField label="Kapak Görseli" name="coverImageFile" currentUrl={post?.coverImageUrl} />
        </div>
        <div className="mt-4">
          <CheckboxField label="Yayında" name="published" defaultChecked={post?.published} />
        </div>

        <h3 className="mt-6 mb-3 text-sm font-bold text-ink">SEO</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="SEO Başlık" name="seoTitle" defaultValue={post?.seoTitle} />
          <Field label="SEO Açıklama" name="seoDescription" defaultValue={post?.seoDescription} />
        </div>

        <div className="mt-6">
          <SubmitButton />
        </div>
      </AdminCard>
    </form>
  );
}
