import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  return prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });
}

export async function getHomeContent() {
  return prisma.homeContent.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });
}
