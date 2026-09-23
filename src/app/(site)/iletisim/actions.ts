"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Ad soyad gerekli"),
  company: z.string().trim().optional(),
  phone: z.string().trim().min(7, "Geçerli bir telefon numarası girin"),
  email: z.string().trim().email("Geçerli bir e-posta girin").optional().or(z.literal("")),
  provider: z.string().trim().optional(),
  packageName: z.string().trim().optional(),
  message: z.string().trim().optional(),
  sourcePage: z.string().trim().optional(),
  utmSource: z.string().trim().optional(),
  utmMedium: z.string().trim().optional(),
  utmCampaign: z.string().trim().optional(),
});

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  whatsappUrl?: string;
};

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Form bilgilerini kontrol edin." };
  }

  const data = parsed.data;

  await prisma.lead.create({
    data: {
      name: data.name,
      company: data.company || null,
      phone: data.phone,
      email: data.email || null,
      provider: data.provider || null,
      packageName: data.packageName || null,
      message: data.message || null,
      sourcePage: data.sourcePage || null,
      utmSource: data.utmSource || null,
      utmMedium: data.utmMedium || null,
      utmCampaign: data.utmCampaign || null,
    },
  });

  const settings = await getSiteSettings();
  const lines = [
    "Merhaba, eticaretus.com.tr üzerinden teklif almak istiyorum.",
    "",
    `Ad Soyad: ${data.name}`,
    data.company ? `Firma: ${data.company}` : null,
    `Telefon: ${data.phone}`,
    data.email ? `E-posta: ${data.email}` : null,
    data.provider ? `Altyapı: ${data.provider}` : null,
    data.packageName ? `Paket: ${data.packageName}` : null,
    data.message ? `Mesaj: ${data.message}` : null,
    data.sourcePage ? `Kaynak: ${data.sourcePage}` : null,
  ].filter(Boolean);

  const whatsappUrl = buildWhatsAppUrl(settings.whatsappNumber, lines.join("\n"));

  return { status: "success", whatsappUrl };
}
