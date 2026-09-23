"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type LogoItem = {
  id: string;
  brandName: string;
  logoUrl?: string | null;
  link?: string | null;
  altText: string;
};

export function LogoCarousel({ logos }: { logos: LogoItem[] }) {
  const [prefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    prefersReducedMotion
      ? []
      : [AutoScroll({ playOnInit: true, speed: 0.6, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  // Screen reader'lar için içerik tekrar sayılmasın; sadece görsel akış tekrar ediyor.
  const track = logos.length > 0 ? [...logos, ...logos] : logos;

  return (
    <div className="relative min-w-0">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32"
        aria-hidden
      />

      <div ref={emblaRef} className="min-w-0 overflow-hidden">
        <div className="flex" role="list" aria-label="Referans markalar">
          {track.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              role="listitem"
              aria-hidden={i >= logos.length}
              className="flex shrink-0 items-center justify-center px-3"
              style={{ width: "clamp(160px, 18vw, 210px)", height: "128px" }}
            >
              <LogoMark logo={logo} tabbable={i < logos.length} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoMark({ logo, tabbable }: { logo: LogoItem; tabbable: boolean }) {
  const content = logo.logoUrl ? (
    <span className="relative block h-12 w-full sm:h-14">
      <Image src={logo.logoUrl} alt={logo.altText} fill className="object-contain" />
    </span>
  ) : (
    <span className="text-lg font-extrabold tracking-tight text-ink/70">{logo.brandName}</span>
  );

  const card = (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-brand/30 group-hover:shadow-lg group-hover:shadow-navy/10">
      {content}
    </div>
  );

  if (logo.link) {
    return (
      <a
        href={logo.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabbable ? 0 : -1}
        className="group block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {card}
      </a>
    );
  }

  return (
    <div tabIndex={tabbable ? 0 : -1} className="group block h-full w-full outline-none">
      {card}
    </div>
  );
}
