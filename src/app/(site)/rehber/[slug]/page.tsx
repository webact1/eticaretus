import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RichText } from "@/components/site/RichText";
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
        <div className="mt-8">
          <RichText text={post.content} />
        </div>
        <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-ink">Size uygun altyapıyı birlikte seçelim</p>
            <p className="mt-1 text-sm text-muted">Ücretsiz danışmanlık için bize ulaşın.</p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Ücretsiz Danışmanlık Al
          </Link>
        </div>
        <Link href="/rehber" className="mt-8 inline-flex items-center text-sm font-semibold text-brand">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Tüm yazılar
        </Link>
      </div>
    </article>
  );
}
