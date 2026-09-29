import { prisma } from "@/lib/prisma";
import { getProvidersWithPackages } from "@/lib/queries";

export async function getHomePageData() {
  const [providers, whyUsPoints, referenceLogos, testimonials, processSteps, faqs, services, latestPosts] = await Promise.all([
    getProvidersWithPackages(),
    prisma.whyUsPoint.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 4 }),
    prisma.referenceLogo.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.processStep.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.faq.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 5 }),
    prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 3 }),
  ]);

  return { providers, whyUsPoints, referenceLogos, testimonials, processSteps, faqs, services, latestPosts };
}
