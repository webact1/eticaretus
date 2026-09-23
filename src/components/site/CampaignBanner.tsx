"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";

export function CampaignBanner({ text, endsAt }: { text: string; endsAt: string }) {
  const [expired, setExpired] = useState(false);
  if (expired) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-navy via-navy-2 to-navy px-6 py-6 shadow-xl shadow-navy/20 sm:px-8">
      <div className="pointer-events-none absolute -top-16 right-10 h-40 w-40 rounded-full bg-brand/25 blur-3xl" />
      <div className="relative flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3.5">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg shadow-brand/30">
            <Zap className="h-5 w-5" />
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/40" />
          </span>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Kampanya Aktif
            </span>
            <p className="mt-1.5 text-base font-bold text-white sm:text-lg">{text}</p>
          </div>
        </div>
        <CountdownTimer endsAt={endsAt} variant="large" onExpire={() => setExpired(true)} />
      </div>
    </div>
  );
}
