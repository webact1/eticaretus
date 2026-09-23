"use client";

import { useEffect, useState } from "react";

function getRemaining(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const UNIT_LABELS = { days: "Gün", hours: "Saat", minutes: "Dk", seconds: "Sn" } as const;

export function CountdownTimer({
  endsAt,
  variant = "compact",
  onExpire,
}: {
  endsAt: string;
  variant?: "compact" | "large";
  onExpire?: () => void;
}) {
  const [remaining, setRemaining] = useState(() => getRemaining(endsAt));

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
      <span className="inline-flex items-center gap-1 font-mono text-sm font-bold tracking-tight">
        {units.map((u, i) => (
          <span key={u.key} className="flex items-center gap-1">
            {i > 0 && <span className="opacity-50">:</span>}
            {String(u.value).padStart(2, "0")}
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {units.map((u) => (
        <div key={u.key} className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy font-mono text-lg font-bold text-white sm:h-14 sm:w-14 sm:text-xl">
            {String(u.value).padStart(2, "0")}
          </div>
          <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
            {UNIT_LABELS[u.key]}
          </span>
        </div>
      ))}
    </div>
  );
}
