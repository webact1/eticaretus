"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";

export function CampaignTopBar({ text, endsAt }: { text: string; endsAt: string }) {
  const dismissKey = `eticaretus-campaign-dismissed-${endsAt}`;
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(dismissKey) === "1";
    } catch {
      return false;
    }
  });
  const [expired, setExpired] = useState(false);

  if (dismissed || expired) return null;

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-brand to-brand-2 px-3 py-2 text-center text-white">
      <span className="w-6 shrink-0" aria-hidden />
      <Link
        href="/paketler"
        className="flex flex-1 flex-wrap items-center justify-center gap-2 text-xs font-semibold sm:text-sm"
      >
        <span>{text}</span>
        <CountdownTimer endsAt={endsAt} onExpire={() => setExpired(true)} />
      </Link>
      <button
        onClick={() => {
          try {
            sessionStorage.setItem(dismissKey, "1");
          } catch {
            // localStorage erişilemiyorsa sessizce yoksay
          }
          setDismissed(true);
        }}
        aria-label="Kapat"
        className="shrink-0 rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
