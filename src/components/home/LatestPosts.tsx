import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string | null;
  coverImageUrl?: string | null;
};

export function LatestPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand">Rehber</p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              E-Ticaret Rehberinden Son Yazılar
            </h2>
            <p className="mt-4 text-balance text-muted">
              Altyapı seçimi, paket karşılaştırması ve yayın öncesi hazırlık üzerine pratik içerikler.
            </p>
          </div>
          <Link
            href="/rehber"
            className="inline-flex shrink-0 items-center text-sm font-semibold text-brand transition hover:text-brand-dark"
          >
            Tüm yazılar
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/rehber/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-brand/40">
                    <BookOpen className="h-10 w-10" />
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                {post.category && (
                  <span className="text-xs font-bold uppercase tracking-wide text-brand">{post.category}</span>
                )}
                <h3 className="mt-2 text-base font-bold leading-snug text-ink">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center pt-1 text-sm font-semibold text-brand">
                  Devamını oku
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
