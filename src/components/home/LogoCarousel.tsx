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
    <span className="relative block h-14 w-full transition-transform duration-300 group-hover:scale-110 sm:h-16">
      <Image src={logo.logoUrl} alt={logo.altText} fill className="object-contain" />
    </span>
  ) : (
    <span className="text-lg font-extrabold tracking-tight text-ink/60 transition-colors duration-300 group-hover:text-ink">
      {logo.brandName}
    </span>
  );

  if (logo.link) {
    return (
      <a
        href={logo.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabbable ? 0 : -1}
        className="group flex h-full w-full items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {content}
      </a>
    );
  }

  return (
    <div tabIndex={tabbable ? 0 : -1} className="group flex h-full w-full items-center justify-center outline-none">
      {content}
    </div>
  );
}
