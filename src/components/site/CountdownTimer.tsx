"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function getRemaining(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const UNIT_LABELS = { days: "Gün", hours: "Saat", minutes: "Dakika", seconds: "Saniye" } as const;
const UNIT_LABELS_SHORT = { days: "G", hours: "S", minutes: "D", seconds: "S" } as const;

export function CountdownTimer({
  endsAt,
  variant = "compact",
  onExpire,
}: {
  endsAt: string;
  variant?: "compact" | "large";
  onExpire?: () => void;
}) {
  // Sunucu render zamanı ile istemcinin hydrate olduğu an arasında saniye
  // farkı oluşabildiğinden, ilk değer sunucuda da istemcide de "null" olarak
  // başlar (ikisi eşleşir, hydration hatası olmaz); gerçek değer mount
  // sonrası effect içinde hesaplanır.
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining>>(null);

  useEffect(() => {
    const tick = () => {
      const next = getRemaining(endsAt);
      setRemaining(next);
      if (!next) onExpire?.();
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt]);

  if (!remaining) return null;

  const units = [
    { key: "days", value: remaining.days },
    { key: "hours", value: remaining.hours },
    { key: "minutes", value: remaining.minutes },
    { key: "seconds", value: remaining.seconds },
  ] as const;

  if (variant === "compact") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm">
        <Clock className="h-3.5 w-3.5 shrink-0 opacity-90" />
        <span className="flex items-center gap-1 font-mono text-sm font-bold tabular-nums tracking-tight">
          {units.map((u, i) => (
            <span key={u.key} className="flex items-center gap-1">
              {i > 0 && <span className="opacity-40">:</span>}
              <span>{String(u.value).padStart(2, "0")}</span>
              <span className="text-[9px] font-semibold uppercase opacity-60">{UNIT_LABELS_SHORT[u.key]}</span>
            </span>
          ))}
        </span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5">
      {units.map((u, i) => (
        <div key={u.key} className="flex items-center gap-1.5 sm:gap-2.5">
          <div className="flex flex-col items-center">
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-navy-2 to-navy font-mono text-xl font-extrabold text-white shadow-lg shadow-black/30 sm:h-16 sm:w-16 sm:text-2xl">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
              <span className="relative tabular-nums">{String(u.value).padStart(2, "0")}</span>
            </div>
            <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
              {UNIT_LABELS[u.key]}
            </span>
          </div>
          {i < units.length - 1 && <span className="mb-4 text-lg font-bold text-border">:</span>}
        </div>
      ))}
    </div>
  );
}
