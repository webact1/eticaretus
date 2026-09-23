"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/session";
import { saveUploadedFile } from "@/lib/upload";

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

async function buildData(formData: FormData) {
  const logoUrl = await saveUploadedFile(formData.get("logoFile") as File | null);
  return {
    brandName: str(formData, "brandName") ?? "",
    altText: str(formData, "altText") ?? str(formData, "brandName") ?? "",
    link: str(formData, "link"),
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
    sourceType: str(formData, "sourceType") ?? "ideasoft_reference",
    sourceUrl: str(formData, "sourceUrl"),
    ...(logoUrl ? { logoUrl } : {}),
  };
}

export async function createReferenceLogo(formData: FormData) {
  await requireAdminSession();
  await prisma.referenceLogo.create({ data: await buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/referans-logolar");
}

export async function updateReferenceLogo(id: string, formData: FormData) {
  await requireAdminSession();
  await prisma.referenceLogo.update({ where: { id }, data: await buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/referans-logolar");
}

export async function deleteReferenceLogo(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  await prisma.referenceLogo.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/referans-logolar");
}
