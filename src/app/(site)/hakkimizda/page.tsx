import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="container-page grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <p className="whitespace-pre-line text-base leading-relaxed text-ink/80">{page.content}</p>
          {page.imageUrl && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl shadow-navy/10">
              <Image src={page.imageUrl} alt={page.title} fill className="object-cover" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
