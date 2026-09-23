"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/session";

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

function num(formData: FormData, key: string) {
  const v = str(formData, key);
  return v ? Number(v) : null;
}

function buildPackageData(formData: FormData) {
  return {
    providerId: String(formData.get("providerId")),
    slug: str(formData, "slug") ?? "",
    name: str(formData, "name") ?? "",
    shortDescription: str(formData, "shortDescription"),
    price: num(formData, "price"),
    oldPrice: num(formData, "oldPrice"),
    billingNote: str(formData, "billingNote"),
    campaignLabel: str(formData, "campaignLabel"),
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
  };
}

export async function createPackage(formData: FormData) {
  await requireAdminSession();
  const pkg = await prisma.package.create({ data: buildPackageData(formData) });
  revalidatePath("/", "layout");
  redirect(`/admin/paketler/${pkg.id}?created=1`);
}

export async function updatePackage(id: string, formData: FormData) {
  await requireAdminSession();

  await prisma.package.update({ where: { id }, data: buildPackageData(formData) });

  const features = await prisma.feature.findMany();
  await prisma.$transaction(
    features.map((feature) => {
      const included = formData.get(`feature_${feature.id}_included`) === "on";
      const value = str(formData, `feature_${feature.id}_value`);
      return prisma.packageFeature.upsert({
        where: { packageId_featureId: { packageId: id, featureId: feature.id } },
        update: { included, value },
        create: { packageId: id, featureId: feature.id, included, value },
      });
    }),
  );

  revalidatePath("/", "layout");
  redirect(`/admin/paketler/${id}?saved=1`);
}

export async function deletePackage(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  await prisma.package.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/paketler");
}
