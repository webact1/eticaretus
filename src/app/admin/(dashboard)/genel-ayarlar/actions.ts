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

export async function updateSiteSettings(formData: FormData) {
  await requireAdminSession();

  const logoUrl = await saveUploadedFile(formData.get("logoFile") as File | null);
  const faviconUrl = await saveUploadedFile(formData.get("faviconFile") as File | null);
  const whatsappAvatarUrl = await saveUploadedFile(formData.get("whatsappAvatarFile") as File | null);

  await prisma.siteSettings.update({
    where: { id: "main" },
    data: {
      siteName: str(formData, "siteName") ?? "eticaretus",
      phone: str(formData, "phone"),
      email: str(formData, "email"),
      address: str(formData, "address"),
      whatsappNumber: str(formData, "whatsappNumber") ?? "905016165900",
      whatsappMessage: str(formData, "whatsappMessage") ?? "",
      instagramUrl: str(formData, "instagramUrl"),
      linkedinUrl: str(formData, "linkedinUrl"),
      facebookUrl: str(formData, "facebookUrl"),
      gtmId: str(formData, "gtmId"),
      ga4Id: str(formData, "ga4Id"),
      metaPixelId: str(formData, "metaPixelId"),
      clarityId: str(formData, "clarityId"),
      gscVerification: str(formData, "gscVerification"),
      ...(logoUrl ? { logoUrl } : {}),
      ...(faviconUrl ? { faviconUrl } : {}),
      ...(whatsappAvatarUrl ? { whatsappAvatarUrl } : {}),
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/genel-ayarlar?saved=1");
}

export async function updateHomeContent(formData: FormData) {
  await requireAdminSession();

  const heroImageUrl = await saveUploadedFile(formData.get("heroImageFile") as File | null);
  const aboutImageUrl = await saveUploadedFile(formData.get("aboutImageFile") as File | null);
  const ctaImageUrl = await saveUploadedFile(formData.get("ctaImageFile") as File | null);

  await prisma.homeContent.update({
    where: { id: "main" },
    data: {
      heroBadge: str(formData, "heroBadge") ?? "",
      heroTitle: str(formData, "heroTitle") ?? "",
      heroSubtitle: str(formData, "heroSubtitle") ?? "",
      aboutTitle: str(formData, "aboutTitle") ?? "",
      aboutText: str(formData, "aboutText") ?? "",
      ctaTitle: str(formData, "ctaTitle") ?? "",
      ctaText: str(formData, "ctaText") ?? "",
      ...(heroImageUrl ? { heroImageUrl } : {}),
      ...(aboutImageUrl ? { aboutImageUrl } : {}),
      ...(ctaImageUrl ? { ctaImageUrl } : {}),
    },
  });

  revalidatePath("/", "layout");
  redirect("/admin/genel-ayarlar?saved=1");
}
