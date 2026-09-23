import { AdminPageHeader } from "@/components/admin/fields";
import { BlogPostForm } from "../BlogPostForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <AdminPageHeader title="Yeni Rehber Yazısı" />
      <BlogPostForm action={createBlogPost} />
    </div>
  );
}
