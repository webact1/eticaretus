import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

const BASE_URL = SITE_URL;

const staticPaths = [
  "",
  "/paketler",
  "/hizmetler",
  "/neden-biz",
  "/nasil-calisiyoruz",
  "/hakkimizda",
  "/sss",
  "/iletisim",
  "/rehber",
  "/kvkk",
  "/gizlilik-politikasi",
  "/cerez-politikasi",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, services, posts] = await Promise.all([
    prisma.package.findMany({ where: { active: true }, include: { provider: true } }),
    prisma.service.findMany({ where: { active: true } }),
    prisma.blogPost.findMany({ where: { published: true } }),
  ]);

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/paketler" ? 0.9 : 0.7,
  }));

  for (const pkg of packages) {
    entries.push({ url: `${BASE_URL}/paketler/${pkg.provider.slug}/${pkg.slug}`, lastModified: pkg.updatedAt });
  }
  for (const s of services) {
    entries.push({ url: `${BASE_URL}/hizmetler/${s.slug}`, lastModified: s.updatedAt });
  }
  for (const post of posts) {
    entries.push({ url: `${BASE_URL}/rehber/${post.slug}`, lastModified: post.updatedAt });
  }

  return entries;
}
