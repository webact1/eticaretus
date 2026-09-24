import type { Metadata } from "next";
import Image from "next/image";
import { DEFAULT_LOGO } from "@/lib/constants";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Giriş Yap",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="mb-6">
          <Image src={DEFAULT_LOGO} alt="eticaretus" width={158} height={36} className="h-9 w-auto" priority />
        </div>
        <h1 className="text-xl font-bold text-ink">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-muted">Devam etmek için giriş yapın.</p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
