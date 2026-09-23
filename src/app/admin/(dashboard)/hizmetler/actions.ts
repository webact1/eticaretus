"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/session";

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

function buildData(formData: FormData) {
  return {
    slug: str(formData, "slug") ?? "",
    name: str(formData, "name") ?? "",
    shortDescription: str(formData, "shortDescription") ?? "",
    description: str(formData, "description") ?? "",
    icon: str(formData, "icon"),
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
  };
}

export async function createService(formData: FormData) {
  await requireAdminSession();
  await prisma.service.create({ data: buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/hizmetler");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdminSession();
  await prisma.service.update({ where: { id }, data: buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/hizmetler");
}

export async function deleteService(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  await prisma.service.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/hizmetler");
}
