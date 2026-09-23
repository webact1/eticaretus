"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type LeadFormState } from "@/app/(site)/iletisim/actions";

type ProviderOption = { slug: string; name: string };
type PackageOption = { providerSlug: string; slug: string; name: string };

const initialState: LeadFormState = { status: "idle" };

export function ContactForm({
  providers,
  packages,
  defaultProvider,
  defaultPackage,
}: {
  providers: ProviderOption[];
  packages: PackageOption[];
  defaultProvider?: string;
  defaultPackage?: string;
}) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const [providerSlug, setProviderSlug] = useState(defaultProvider ?? "");
  const openedRef = useRef(false);

  useEffect(() => {
    if (state.status === "success" && state.whatsappUrl && !openedRef.current) {
      openedRef.current = true;
      window.open(state.whatsappUrl, "_blank", "noopener,noreferrer");
    }
  }, [state]);

  const filteredPackages = packages.filter((p) => !providerSlug || p.providerSlug === providerSlug);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-bold text-emerald-800">Talebiniz alındı ✓</p>
        <p className="mt-2 text-sm text-emerald-700">
          WhatsApp sohbet penceresi açılıyor. Açılmadıysa aşağıdaki butona tıklayın.
        </p>
        {state.whatsappUrl && (
          <a
            href={state.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white hover:bg-whatsapp-dark"
          >
            WhatsApp&apos;ı Aç
          </a>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="sourcePage" value={typeof window !== "undefined" ? window.location.pathname : ""} />

      {state.status === "error" && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ad Soyad" name="name" required />
        <Field label="Firma" name="company" />
        <Field label="Telefon" name="phone" type="tel" required />
        <Field label="E-posta" name="email" type="email" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">İlgilendiğiniz Altyapı</label>
          <select
            name="provider"
            value={providerSlug}
            onChange={(e) => setProviderSlug(e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
          >
            <option value="">Seçiniz</option>
            {providers.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">İlgilendiğiniz Paket</label>
          <select
            name="packageName"
            defaultValue={defaultPackage ?? ""}
            className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
          >
            <option value="">Seçiniz</option>
            {filteredPackages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Mesajınız</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Gönderiliyor…" : "Teklif Al"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
      />
    </div>
  );
}
