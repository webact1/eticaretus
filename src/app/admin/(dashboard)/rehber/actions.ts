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
  const coverImageUrl = await saveUploadedFile(formData.get("coverImageFile") as File | null);
  const published = formData.get("published") === "on";
  return {
    slug: str(formData, "slug") ?? "",
    title: str(formData, "title") ?? "",
    excerpt: str(formData, "excerpt") ?? "",
    content: str(formData, "content") ?? "",
    category: str(formData, "category"),
    published,
    publishedAt: published ? new Date() : null,
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    ...(coverImageUrl ? { coverImageUrl } : {}),
  };
}

export async function createBlogPost(formData: FormData) {
  await requireAdminSession();
  await prisma.blogPost.create({ data: await buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/rehber");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdminSession();
  await prisma.blogPost.update({ where: { id }, data: await buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/rehber");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/rehber");
}
