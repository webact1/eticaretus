"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSessionToken, verifyPassword, sessionCookieOptions } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Kullanıcı adı ve şifre gerekli." };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Kullanıcı adı veya şifre hatalı." };
  }

  const token = await createSessionToken({ sub: user.id, email: user.email, name: user.name });
  const store = await cookies();
  store.set(sessionCookieOptions.name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionCookieOptions.maxAge,
  });

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(sessionCookieOptions.name);
  redirect("/admin/login");
}
