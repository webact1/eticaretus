"use client";

import { useState } from "react";

const TITLE_MAX = 60;
const DESC_MAX = 160;
// Sayfa başlığına " | eticaretus" otomatik eklenir; önerilen üst sınır bu ek düşülerek hesaplanır.
const SUFFIX = " | eticaretus".length;

function Counter({ length, ideal, max }: { length: number; ideal: [number, number]; max: number }) {
  const tone = length === 0 ? "text-red-600" : length < ideal[0] || length > ideal[1] ? "text-amber-600" : "text-emerald-600";
  return (
    <span className={`text-xs tabular-nums ${tone}`}>
      {length}/{max}
    </span>
  );
}

/** Zorunlu SEO başlık ve açıklama alanları (karakter sayaçlı). Tüm yönetim formlarında aynı kural geçerli. */
export function SeoFields({ title, description }: { title?: string | null; description?: string | null }) {
  const [t, setT] = useState(title ?? "");
  const [d, setD] = useState(description ?? "");
  const titleMax = TITLE_MAX - SUFFIX;

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <label htmlFor="seoTitle" className="text-sm font-medium text-ink">
            SEO Başlık <span className="text-red-600">*</span>
          </label>
          <Counter length={t.trim().length} ideal={[25, titleMax]} max={titleMax} />
        </div>
        <input
          id="seoTitle"
          name="seoTitle"
          required
          maxLength={titleMax + 10}
          value={t}
          onChange={(e) => setT(e.target.value)}
          placeholder="Ör. IdeaSoft Master Paketi: Özellikler ve Fiyat"
          className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
        />
        <p className="mt-1 text-xs text-muted">Google sonuçlarında görünen başlık. Sonuna &quot;| eticaretus&quot; otomatik eklenir; siz eklemeyin.</p>
      </div>
      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <label htmlFor="seoDescription" className="text-sm font-medium text-ink">
            SEO Açıklama <span className="text-red-600">*</span>
          </label>
          <Counter length={d.trim().length} ideal={[110, DESC_MAX]} max={DESC_MAX} />
        </div>
        <textarea
          id="seoDescription"
          name="seoDescription"
          required
          rows={3}
          maxLength={DESC_MAX + 40}
          value={d}
          onChange={(e) => setD(e.target.value)}
          placeholder="Sayfanın ne anlattığını 110–160 karakterde özetleyin."
          className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand"
        />
        <p className="mt-1 text-xs text-muted">Google sonuçlarında başlığın altında görünen metin. İdeal uzunluk 110–160 karakter.</p>
      </div>
    </div>
  );
}
