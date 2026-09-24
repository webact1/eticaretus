import { prisma } from "@/lib/prisma";
import { PREVIEW_FEATURE_NAMES } from "@/lib/constants";

export async function getHomePageData() {
  const [providers, whyUsPoints, referenceLogos, testimonials, processSteps, faqs, services, latestPosts] = await Promise.all([
    prisma.provider.findMany({
      where: { status: { in: ["active", "coming_soon"] } },
      orderBy: { order: "asc" },
    }),
    prisma.whyUsPoint.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 4 }),
    prisma.referenceLogo.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.processStep.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.faq.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 5 }),
    prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 3 }),
  ]);

  const featuredProvider = providers.find((p) => p.status === "active");

  const featuredPackagesRaw = featuredProvider
    ? await prisma.package.findMany({
        where: { providerId: featuredProvider.id, active: true },
        orderBy: { order: "asc" },
        include: { packageFeatures: { include: { feature: true } } },
      })
    : [];

  // Kart önizlemesinde tüm özellikler yerine pazarlama açısından en anlamlı
  // olanlar (PREVIEW_FEATURE_NAMES) gösterilir; sıralama o listeye göre olur.
  const featuredPackages = featuredPackagesRaw.map((pkg) => ({
    ...pkg,
    packageFeatures: PREVIEW_FEATURE_NAMES.map((name) =>
      pkg.packageFeatures.find((pf) => pf.feature.name === name),
    ).filter((pf): pf is NonNullable<typeof pf> => Boolean(pf)),
  }));

  return {
    providers,
    whyUsPoints,
    referenceLogos,
    testimonials,
    processSteps,
    faqs,
    services,
    latestPosts,
    featuredProvider,
    featuredPackages,
  };
}
