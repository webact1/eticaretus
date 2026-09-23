import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { getPageBySlug } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("hakkimizda");
  if (!page) return {};
  return { title: page.seoTitle ?? page.title, description: page.seoDescription ?? undefined };
}

export default async function AboutPage() {
  const page = await getPageBySlug("hakkimizda");
  if (!page) notFound();

  return (
    <>
      <PageHero eyebrow="Hakkımızda" title={page.title} />
      <section className="bg-white py-16">
        <div className="container-page max-w-3xl">
          <p className="whitespace-pre-line text-base leading-relaxed text-ink/80">{page.content}</p>
        </div>
      </section>
    </>
  );
}
