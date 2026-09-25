"use client";

import { useLinkStatus } from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

// <Link> içinde kullanılır; sayfa açılırken ok yerine dönen ikon gösterir ki dokunma anında geri bildirim olsun.
export function LinkArrow({ className = "ml-1.5 h-4 w-4" }: { className?: string }) {
  const { pending } = useLinkStatus();
  return pending ? (
    <Loader2 className={`${className} animate-spin`} aria-hidden />
  ) : (
    <ArrowRight className={className} aria-hidden />
  );
}
