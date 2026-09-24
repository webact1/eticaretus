import Image from "next/image";
import {
  Backpack,
  Check,
  Footprints,
  Glasses,
  Headphones,
  Heart,
  Search,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Watch,
  type LucideIcon,
} from "lucide-react";

type Product = { name: string; tag?: string; icon: LucideIcon; from: string; to: string };

const PRODUCTS: Product[] = [
  { name: "Spor Ayakkabı", tag: "Yeni", icon: Footprints, from: "from-indigo-100", to: "to-indigo-200" },
  { name: "Akıllı Saat", icon: Watch, from: "from-sky-100", to: "to-sky-200" },
  { name: "Kulaklık", tag: "İndirim", icon: Headphones, from: "from-violet-100", to: "to-fuchsia-200" },
  { name: "Sırt Çantası", icon: Backpack, from: "from-amber-100", to: "to-orange-200" },
  { name: "Güneş Gözlüğü", tag: "Yeni", icon: Glasses, from: "from-emerald-100", to: "to-teal-200" },
  { name: "Akıllı Telefon", icon: Smartphone, from: "from-rose-100", to: "to-pink-200" },
];

const ICON_COLORS = ["text-indigo-600", "text-sky-600", "text-fuchsia-600", "text-orange-600", "text-teal-600", "text-rose-600"];

// Panelden bir hero görseli tanımlanana kadar kod içinde üretilmiş bir "örnek mağaza"
// kompozisyonu gösterilir; lisans belirsizliği olan stok fotoğraf kullanılmaz.
// heroImageUrl ayarlanınca gerçek görsel devreye girer.
export function StoreDeviceMockup({ imageUrl }: { imageUrl?: string | null }) {
  if (imageUrl) {
    return (
      <div className="relative aspect-[6/5] w-full overflow-hidden rounded-3xl shadow-2xl shadow-navy/20">
        <Image src={imageUrl} alt="eticaretus e-ticaret mağazası önizlemesi" fill className="object-cover" priority />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-xl select-none" aria-hidden>
      {/* Laptop */}
      <div className="relative rounded-2xl border border-white/10 bg-navy p-2.5 shadow-2xl shadow-navy/30">
        <div className="flex items-center gap-1.5 px-1.5 pb-2">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-300/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <div className="ml-2 flex h-4 flex-1 items-center rounded-full bg-white/10 px-3 text-[8px] font-medium text-white/50">
            magazam.com
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white">
          {/* Store header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand text-[9px] font-extrabold text-white">
              M
            </span>
            <span className="text-[11px] font-extrabold tracking-tight text-ink">Mağazam</span>
            <div className="ml-3 hidden gap-3 text-[9px] font-semibold text-ink/60 sm:flex">
              <span>Yeni Sezon</span>
              <span>Kadın</span>
              <span>Erkek</span>
              <span className="text-brand">İndirim</span>
            </div>
            <div className="ml-auto flex items-center gap-2.5 text-ink/60">
              <Search className="h-3.5 w-3.5" />
              <Heart className="h-3.5 w-3.5" />
              <span className="relative">
                <ShoppingCart className="h-3.5 w-3.5" />
                <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-brand text-[7px] font-bold text-white">
                  2
                </span>
              </span>
            </div>
          </div>

          {/* Hero banner */}
          <div className="relative mx-4 mt-3 overflow-hidden rounded-xl bg-gradient-to-br from-brand to-brand-2 px-5 py-4">
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-white/10" />
            <div className="relative space-y-1">
              <span className="block text-[8px] font-bold uppercase tracking-widest text-white/70">Yeni Sezon</span>
              <span className="block text-sm font-extrabold leading-tight text-white">Sonbahar Koleksiyonu</span>
              <span className="block text-[9px] text-white/75">Seçili ürünlerde ücretsiz kargo</span>
              <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-[10px] font-bold text-brand">
                %50&apos;ye Varan İndirim
              </span>
            </div>
            <span className="absolute right-5 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur sm:flex">
              <ShoppingBag className="h-7 w-7" />
            </span>
          </div>

          {/* Category chips */}
          <div className="flex gap-1.5 overflow-hidden px-4 pt-3 text-[9px] font-semibold">
            <span className="rounded-full bg-ink px-2.5 py-1 text-white">Tümü</span>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-ink/70">Ayakkabı</span>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-ink/70">Aksesuar</span>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-ink/70">Elektronik</span>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-3 gap-2.5 px-4 pb-4 pt-3">
            {PRODUCTS.map((p, i) => (
              <div key={p.name} className="rounded-lg border border-border p-1.5">
                <div className={`relative flex aspect-[4/3] items-center justify-center rounded-md bg-gradient-to-br ${p.from} ${p.to}`}>
                  <p.icon className={`h-8 w-8 ${ICON_COLORS[i]}`} strokeWidth={1.6} />
                  {p.tag && (
                    <span className="absolute left-1 top-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[7px] font-bold text-brand">
                      {p.tag}
                    </span>
                  )}
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/90 text-ink/50">
                    <Heart className="h-2.5 w-2.5" />
                  </span>
                </div>
                <p className="mt-1.5 truncate text-[9px] font-bold text-ink">{p.name}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="h-1.5 w-8 rounded-full bg-brand/30" />
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white">
                    <ShoppingCart className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto h-3 w-2/3 rounded-b-xl bg-navy/80" />

      {/* Floating phone */}
      <div className="absolute -bottom-8 -right-4 w-32 rotate-[4deg] rounded-[1.4rem] border-4 border-navy bg-white shadow-2xl shadow-navy/30 sm:-right-8 sm:w-36">
        <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-navy/30" />
        <div className="space-y-1.5 px-2.5 py-3">
          <div className="relative flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-brand-2 to-brand">
            <Watch className="h-9 w-9 text-white" strokeWidth={1.5} />
            <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[7px] font-bold text-brand">
              Yeni
            </span>
          </div>
          <p className="text-[10px] font-bold text-ink">Akıllı Saat</p>
          <p className="text-[8px] leading-tight text-muted">Şık tasarım, uzun pil ömrü</p>
          <span className="mt-1.5 flex items-center justify-center gap-1 rounded-full bg-navy py-1.5 text-center text-[9px] font-semibold text-white">
            <ShoppingCart className="h-2.5 w-2.5" />
            Satın Al
          </span>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -left-4 -top-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-lg shadow-navy/10 animate-[float_5s_ease-in-out_infinite] sm:-left-8">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-4 w-4" />
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
