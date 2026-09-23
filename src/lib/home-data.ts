import { prisma } from "@/lib/prisma";

export async function getHomePageData() {
  const [providers, whyUsPoints, referenceLogos, testimonials, processSteps, faqs] = await Promise.all([
    prisma.provider.findMany({
      where: { status: { in: ["active", "coming_soon"] } },
      orderBy: { order: "asc" },
    }),
    prisma.whyUsPoint.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 4 }),
    prisma.referenceLogo.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.processStep.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.faq.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 5 }),
  ]);

  const featuredProvider = providers.find((p) => p.status === "active");

  const featuredPackages = featuredProvider
    ? await prisma.package.findMany({
        where: { providerId: featuredProvider.id, active: true },
        orderBy: { order: "asc" },
        include: {
          packageFeatures: {
            orderBy: { feature: { order: "asc" } },
            take: 5,
            include: { feature: true },
          },
        },
      })
    : [];

  return {
    providers,
    whyUsPoints,
    referenceLogos,
    testimonials,
    processSteps,
    faqs,
    featuredProvider,
    featuredPackages,
  };
}
