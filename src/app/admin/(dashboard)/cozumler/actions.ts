"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/session";

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}

function linesToJson(value: string | null) {
  if (!value) return "[]";
  return JSON.stringify(
    value
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
  );
}

function buildData(formData: FormData) {
  return {
    slug: str(formData, "slug") ?? "",
    name: str(formData, "name") ?? "",
    shortDescription: str(formData, "shortDescription") ?? "",
    description: str(formData, "description") ?? "",
    advantages: linesToJson(str(formData, "advantages")),
    suitableFor: str(formData, "suitableFor"),
    status: str(formData, "status") ?? "active",
    order: Number(formData.get("order") ?? 0),
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    noindex: formData.get("noindex") === "on",
  };
}

export async function createProvider(formData: FormData) {
  await requireAdminSession();
  await prisma.provider.create({ data: buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/cozumler");
}

export async function updateProvider(id: string, formData: FormData) {
  await requireAdminSession();
  await prisma.provider.update({ where: { id }, data: buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/cozumler");
}

export async function deleteProvider(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  await prisma.provider.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/cozumler");
}
