"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />
      {state.error && <div className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{state.error}</div>}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Kullanıcı Adı</label>
        <input
          name="email"
          type="text"
          required
          autoFocus
          className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Şifre</label>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
    </form>
  );
}
