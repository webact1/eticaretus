"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";

export function CampaignBanner({ text, endsAt }: { text: string; endsAt: string }) {
  const [expired, setExpired] = useState(false);
  if (expired) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-gradient-to-r from-navy to-navy-2 px-6 py-6 text-center sm:flex-row sm:text-left sm:px-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-2">
          <Sparkles className="h-5 w-5" />
        </span>
        <p className="text-base font-semibold text-white sm:text-lg">{text}</p>
      </div>
      <CountdownTimer endsAt={endsAt} variant="large" onExpire={() => setExpired(true)} />
    </div>
  );
}
