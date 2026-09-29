import { Check } from "lucide-react";
import { PartnerLogo } from "./PartnerLogo";

/** Altyapı tanıtımı: logo, açıklama ve öne çıkan avantajlar. */
export function ProviderIntro({
  slug,
  name,
  logoUrl,
  description,
  advantages,
  children,
}: {
  slug: string;
  name: string;
  logoUrl: string | null;
  description: string;
  advantages: string[];
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
      <div className="flex h-24 items-center justify-center rounded-2xl border border-border bg-white px-6">
        <PartnerLogo slug={slug} name={name} logoUrl={logoUrl} className="h-9 w-auto max-w-full" />
      </div>
      <div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        {advantages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {advantages.map((a) => (
              <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink/80">
                <Check className="h-3.5 w-3.5 text-brand" aria-hidden />
                {a}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
