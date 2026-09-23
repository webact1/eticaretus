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
  const avatarUrl = await saveUploadedFile(formData.get("avatarFile") as File | null);
  const ratingRaw = str(formData, "rating");
  return {
    personName: str(formData, "personName") ?? "",
    role: str(formData, "role"),
    brandName: str(formData, "brandName"),
    domain: str(formData, "domain"),
    quote: str(formData, "quote") ?? "",
    sourceType: str(formData, "sourceType") ?? "ideasoft",
    sourceUrl: str(formData, "sourceUrl"),
    rating: ratingRaw ? Number(ratingRaw) : null,
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
    ...(avatarUrl ? { avatarUrl } : {}),
  };
}

export async function createTestimonial(formData: FormData) {
  await requireAdminSession();
  await prisma.testimonial.create({ data: await buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/yorumlar");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdminSession();
  await prisma.testimonial.update({ where: { id }, data: await buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/yorumlar");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/yorumlar");
}
