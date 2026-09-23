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

export async function updatePage(id: string, slug: string, formData: FormData) {
  await requireAdminSession();

  const imageUrl = await saveUploadedFile(formData.get("imageFile") as File | null);

  await prisma.page.update({
    where: { id },
    data: {
      title: str(formData, "title") ?? "",
      content: str(formData, "content") ?? "",
      seoTitle: str(formData, "seoTitle"),
      seoDescription: str(formData, "seoDescription"),
      noindex: formData.get("noindex") === "on",
      published: formData.get("published") === "on",
      ...(imageUrl ? { imageUrl } : {}),
    },
  });

  revalidatePath("/", "layout");
  redirect(`/admin/sayfalar/${slug}?saved=1`);
}
