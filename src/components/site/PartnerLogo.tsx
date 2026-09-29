import Image from "next/image";

const LOGO_SIZES: Record<string, { width: number; height: number }> = {
  ideasoft: { width: 201, height: 44 },
  ikas: { width: 98, height: 25 },
};

/** Çözüm ortağı logosu (IdeaSoft, ikas). Logo dosyası yoksa adı yazı olarak gösterir. */
export function PartnerLogo({
  slug,
  name,
  logoUrl,
  className = "h-7 w-auto",
}: {
  slug: string;
  name: string;
  logoUrl?: string | null;
  className?: string;
}) {
  if (!logoUrl) return <span className="text-lg font-extrabold tracking-tight text-ink">{name}</span>;
  const size = LOGO_SIZES[slug] ?? { width: 120, height: 32 };
  return <Image src={logoUrl} alt={`${name} logosu`} width={size.width} height={size.height} className={className} unoptimized />;
}
