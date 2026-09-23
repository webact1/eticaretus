import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { getPublishedBlogPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Rehber",
  description: "E-ticaret, SEO ve pazaryeri entegrasyonları hakkında rehber içerikleri.",
};

export default async function BlogListPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <PageHero eyebrow="Rehber" title="E-Ticaret Rehberi" subtitle="Altyapı seçimi, SEO ve büyüme üzerine içerikler." />
      <section className="bg-white py-16">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-center text-muted">Yakında içerikler burada olacak.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/rehber/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
                >
                  {post.coverImageUrl && (
                    <div className="relative aspect-[16/9] w-full">
                      <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    {post.category && (
                      <span className="text-xs font-bold uppercase tracking-wide text-brand">{post.category}</span>
                    )}
                    <h3 className="mt-2 text-base font-bold text-ink">{post.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
