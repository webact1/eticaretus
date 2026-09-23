import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/queries";

export async function generateMetadata({ params }: PageProps<"/rehber/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: post.coverImageUrl ? { images: [post.coverImageUrl] } : undefined,
  };
}

export default async function BlogDetailPage({ params }: PageProps<"/rehber/[slug]">) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="bg-white py-16">
      <div className="container-page max-w-2xl">
        {post.category && (
          <span className="text-xs font-bold uppercase tracking-wide text-brand">{post.category}</span>
        )}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{post.title}</h1>
        {post.coverImageUrl && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="mt-8 whitespace-pre-line text-base leading-relaxed text-ink/80">{post.content}</div>
      </div>
    </article>
  );
}
