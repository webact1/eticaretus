"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type TestimonialItem = {
  id: string;
  personName: string;
  role?: string | null;
  brandName?: string | null;
  domain?: string | null;
  quote: string;
  avatarUrl?: string | null;
  sourceType: string;
  sourceUrl?: string | null;
};

const sourceLabel: Record<string, string> = {
  ideasoft: "Kaynak: IdeaSoft",
  eticaretus: "Kaynak: eticaretus",
};

export function TestimonialCarousel({ items }: { items: TestimonialItem[] }) {
  const [prefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    prefersReducedMotion ? [] : [Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("init", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("init", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="min-w-0">
      <div ref={emblaRef} className="min-w-0 overflow-hidden">
        <div className="flex gap-5">
          {items.map((t) => (
            <div key={t.id} className="min-w-0 shrink-0 basis-full px-1 sm:basis-1/2 lg:basis-1/3">
              <TestimonialCard item={t} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Önceki"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition hover:border-brand hover:text-brand"
        >
          ←
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`${i + 1}. yoruma git`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === selected ? "w-6 bg-brand" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Sonraki"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition hover:border-brand hover:text-brand"
        >
          →
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-6">
      <span className="text-4xl leading-none text-brand/25">&ldquo;</span>
      <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ink/85">{item.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand/10 text-sm font-bold text-brand">
          {item.avatarUrl ? (
            <Image src={item.avatarUrl} alt={item.personName} fill className="object-cover" />
          ) : (
            item.personName[0]
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{item.personName}</p>
          <p className="truncate text-xs text-muted">
            {[item.role, item.brandName ?? item.domain].filter(Boolean).join(" · ")}
          </p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-surface-2 px-2 py-1 text-[10px] font-medium text-muted">
          {sourceLabel[item.sourceType] ?? "Kaynak"}
        </span>
      </figcaption>
    </figure>
  );
}
