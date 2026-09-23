import Image from "next/image";

// Gerçek stok görsel yerine, panelden bir hero görseli tanımlanana kadar
// kod içinde üretilmiş bir "mağaza ekranı" kompozisyonu gösterilir. Bu sayede
// lisans belirsizliği olan stok fotoğraf kullanılmadan, ilk sürüm boş/placeholder
// görünmeden yayına çıkılabilir. heroImageUrl ayarlanınca gerçek görsel devreye girer.
export function StoreDeviceMockup({ imageUrl }: { imageUrl?: string | null }) {
  if (imageUrl) {
    return (
      <div className="relative aspect-[6/5] w-full overflow-hidden rounded-3xl shadow-2xl shadow-navy/20">
        <Image src={imageUrl} alt="eticaretus e-ticaret mağazası önizlemesi" fill className="object-cover" priority />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-xl select-none">
      {/* Laptop */}
      <div className="relative rounded-2xl border border-white/10 bg-navy p-2.5 shadow-2xl shadow-navy/30">
        <div className="flex items-center gap-1.5 px-1.5 pb-2">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-300/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <div className="ml-2 h-4 flex-1 rounded-full bg-white/10" />
        </div>
        <div className="overflow-hidden rounded-lg bg-white">
          {/* Store header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="h-5 w-5 rounded-md bg-brand" />
            <span className="h-2.5 w-16 rounded-full bg-ink/15" />
            <div className="ml-4 hidden gap-3 sm:flex">
              <span className="h-2 w-10 rounded-full bg-ink/10" />
              <span className="h-2 w-10 rounded-full bg-ink/10" />
              <span className="h-2 w-10 rounded-full bg-ink/10" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="h-6 w-20 rounded-full bg-brand/10" />
              <span className="h-6 w-6 rounded-full bg-surface-2" />
            </div>
          </div>
          {/* Hero banner */}
          <div className="mx-4 mt-4 flex items-center justify-between rounded-xl bg-gradient-to-br from-brand to-brand-2 px-5 py-4">
            <div className="space-y-1.5">
              <span className="block h-2 w-24 rounded-full bg-white/70" />
              <span className="block h-3 w-32 rounded-full bg-white" />
              <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[10px] font-bold text-brand">
                %50&apos;ye Varan İndirim
              </span>
            </div>
            <div className="hidden h-16 w-16 rounded-lg bg-white/20 sm:block" />
          </div>
          {/* Product grid */}
          <div className="grid grid-cols-3 gap-3 px-4 py-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-2">
                <div className="aspect-square rounded-md bg-surface-2" />
                <span className="mt-2 block h-1.5 w-full rounded-full bg-ink/10" />
                <span className="mt-1.5 block h-2 w-10 rounded-full bg-brand/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto h-3 w-2/3 rounded-b-xl bg-navy/80" />

      {/* Floating phone */}
      <div className="absolute -bottom-8 -right-4 w-32 rotate-[4deg] rounded-[1.4rem] border-4 border-navy bg-white shadow-2xl shadow-navy/30 sm:-right-8 sm:w-36">
        <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-navy/30" />
        <div className="space-y-2 px-2.5 py-3">
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-brand-2 to-brand" />
          <span className="block h-1.5 w-3/4 rounded-full bg-ink/15" />
          <span className="block h-2 w-1/2 rounded-full bg-brand/50" />
          <span className="mt-2 block rounded-full bg-navy py-1.5 text-center text-[9px] font-semibold text-white">
            Satın Al
          </span>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -left-4 top-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg shadow-navy/10 animate-[float_5s_ease-in-out_infinite] sm:-left-10">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          ✓
        </span>
        <div>
          <p className="text-[11px] font-semibold text-ink">Sipariş Alındı</p>
          <p className="text-[10px] text-muted">az önce</p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
