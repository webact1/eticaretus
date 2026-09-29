import { prisma } from "@/lib/prisma";
import { previewFeatureNames } from "@/lib/constants";

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
      include: {
        packageFeatures: {
          orderBy: [{ feature: { category: { order: "asc" } } }, { feature: { order: "asc" } }],
        },
      },
    }),
  ]);

  // Özellik kataloğu tüm sağlayıcılar için ortak tabloda: yalnız bu sağlayıcının paketlerinde tanımlı özellikler/kategoriler gösterilir.
  const used = new Set(packages.flatMap((p) => p.packageFeatures.map((pf) => pf.featureId)));
  const scoped = categories
    .map((c) => ({ ...c, features: c.features.filter((f) => used.has(f.id)) }))
    .filter((c) => c.features.length > 0);

  return { categories: scoped, packages };
}

export type ProviderPackageCard = {
  slug: string;
  name: string;
  shortDescription: string | null;
  campaignLabel: string | null;
  featured: boolean;
  features: Array<{ name: string; included: boolean; value: string | null }>;
};

export type ProviderWithPackages = {
  slug: string;
  name: string;
  logoUrl: string | null;
  shortDescription: string;
  description: string;
  suitableFor: string | null;
  advantages: string[];
  packages: ProviderPackageCard[];
};

/** Aktif sağlayıcılar ve paket kartları (anasayfa ve Paketler sayfası). Fiyat alanları bilerek dışarıda: fiyat müşteriye özel verilir. */
export async function getProvidersWithPackages(): Promise<ProviderWithPackages[]> {
  const providers = await prisma.provider.findMany({
    where: { status: "active" },
    orderBy: { order: "asc" },
    include: {
      packages: {
        where: { active: true },
        orderBy: { order: "asc" },
        include: { packageFeatures: { include: { feature: { select: { name: true } } } } },
      },
    },
  });
  return providers
    .filter((p) => p.packages.length > 0)
    .map((p) => {
      const names = previewFeatureNames(p.slug);
      return {
        slug: p.slug,
        name: p.name,
        logoUrl: p.logoUrl,
        shortDescription: p.shortDescription,
        description: p.description,
        suitableFor: p.suitableFor,
        advantages: parseAdvantages(p.advantages),
        packages: p.packages.map((pkg) => ({
          slug: pkg.slug,
          name: pkg.name,
          shortDescription: pkg.shortDescription,
          campaignLabel: pkg.campaignLabel,
          featured: pkg.featured,
          features: names
            .map((name) => pkg.packageFeatures.find((pf) => pf.feature.name === name))
            .filter((pf): pf is NonNullable<typeof pf> => Boolean(pf))
            .map((pf) => ({ name: pf.feature.name, included: pf.included, value: pf.value })),
        })),
      };
    });
}

function parseAdvantages(raw: string): string[] {
  try {
    const v = JSON.parse(raw || "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
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
