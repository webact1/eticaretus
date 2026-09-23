import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { getPageBySlug } from "@/lib/queries";

export async function LegalPageBody({ slug }: { slug: string }) {
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero title={page.title} />
      <section className="bg-white py-16">
        <div className="container-page max-w-3xl">
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink/80">{page.content}</p>
        </div>
      </section>
    </>
  );
}
