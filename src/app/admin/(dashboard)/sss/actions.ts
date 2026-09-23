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
    question: str(formData, "question") ?? "",
    answer: str(formData, "answer") ?? "",
    order: Number(formData.get("order") ?? 0),
    active: formData.get("active") === "on",
  };
}

export async function createFaq(formData: FormData) {
  await requireAdminSession();
  await prisma.faq.create({ data: buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/sss");
}

export async function updateFaq(id: string, formData: FormData) {
  await requireAdminSession();
  await prisma.faq.update({ where: { id }, data: buildData(formData) });
  revalidatePath("/", "layout");
  redirect("/admin/sss");
}

export async function deleteFaq(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id"));
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/sss");
}
