import { prisma } from "@/lib/prisma";

export async function getVisibleProviders() {
  return prisma.provider.findMany({
    where: { status: { in: ["active", "coming_soon"] } },
    orderBy: { order: "asc" },
  });
}

export async function getProviderBySlug(slug: string) {
  const provider = await prisma.provider.findUnique({ where: { slug } });
  if (!provider || provider.status === "hidden") return null;
  return provider;
}

export async function getPackagesForProvider(providerId: string) {
  return prisma.package.findMany({
    where: { providerId, active: true },
    orderBy: { order: "asc" },
  });
}

export async function getPackageComparison(providerId: string) {
  const [categories, packages] = await Promise.all([
    prisma.featureCategory.findMany({
      orderBy: { order: "asc" },
      include: { features: { orderBy: { order: "asc" } } },
    }),
    prisma.package.findMany({
      where: { providerId, active: true },
      orderBy: { order: "asc" },
      include: { packageFeatures: true },
    }),
  ]);

  return { categories, packages };
}

export async function getPackageBySlug(providerSlug: string, packageSlug: string) {
  const provider = await prisma.provider.findUnique({ where: { slug: providerSlug } });
  if (!provider) return null;
  const pkg = await prisma.package.findUnique({
    where: { providerId_slug: { providerId: provider.id, slug: packageSlug } },
    include: {
      packageFeatures: {
        orderBy: [{ feature: { category: { order: "asc" } } }, { feature: { order: "asc" } }],
        include: { feature: { include: { category: true } } },
      },
    },
  });
  if (!pkg || !pkg.active) return null;
  return { provider, pkg };
}

export async function getActiveServices() {
  return prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findFirst({ where: { slug, active: true } });
}

export async function getActiveFaqs() {
  return prisma.faq.findMany({ where: { active: true }, orderBy: { order: "asc" } });
}

export async function getPageBySlug(slug: string) {
  return prisma.page.findFirst({ where: { slug, published: true } });
}

export async function getPublishedBlogPosts() {
  return prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({ where: { slug, published: true } });
}
