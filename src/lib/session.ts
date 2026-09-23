import "server-only";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken, type AdminSessionPayload } from "@/lib/auth";

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAdminSession(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Yetkisiz erişim: admin oturumu bulunamadı.");
  }
  return session;
}
