import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RichText } from "@/components/site/RichText";
import { BreadcrumbJsonLd, JsonLd } from "@/components/site/JsonLd";
import { SITE_URL, absoluteUrl, cleanTitle } from "@/lib/seo";
import { getBlogPostBySlug } from "@/lib/queries";

export async function generateMetadata({ params }: PageProps<"/rehber/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: cleanTitle(post.seoTitle) ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      type: "article",
      title: cleanTitle(post.seoTitle) ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps<"/rehber/[slug]">) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const pagePath = `/rehber/${post.slug}`;
  const published = (post.publishedAt ?? post.createdAt).toISOString();

  return (
    <article className="bg-white py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.coverImageUrl ?? "/opengraph-image.png"),
          datePublished: published,
          dateModified: post.updatedAt.toISOString(),
          inLanguage: "tr-TR",
          mainEntityOfPage: absoluteUrl(pagePath),
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Rehber", path: "/rehber" },
          { name: post.title, path: pagePath },
        ]}
      />
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
