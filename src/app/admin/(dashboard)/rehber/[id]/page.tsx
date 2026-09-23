import { notFound } from "next/navigation";
import { AdminPageHeader, DangerZone } from "@/components/admin/fields";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "../BlogPostForm";
import { updateBlogPost, deleteBlogPost } from "../actions";

export default async function EditBlogPostPage({ params }: PageProps<"/admin/rehber/[id]">) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <AdminPageHeader title={`Düzenle: ${post.title}`} />
      <BlogPostForm post={post} action={updateBlogPost.bind(null, post.id)} />
      <DangerZone action={deleteBlogPost} hiddenFields={{ id: post.id }} confirmLabel="Bu yazıyı sil" />
    </div>
  );
}
