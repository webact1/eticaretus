import type { Metadata } from "next";
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
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
            E
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">
            eticaretus<span className="text-brand">.com.tr</span>
          </span>
        </div>
        <h1 className="text-xl font-bold text-ink">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-muted">Devam etmek için giriş yapın.</p>
        <LoginForm next={next} />
      </div>
    </div>
  );
}
