// Detay sayfaları sunucudan gelene kadar iskelet gösterir; dokunma anında sayfa değişmiş hissi verir.
// Not: (site) köküne loading.tsx konmaz; ana sayfayı Suspense içine alıp hydration'ı geciktirir.
export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Sayfa yükleniyor">
      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <div className="container-page animate-pulse">
          <div className="h-3 w-24 rounded-full bg-brand/20" />
          <div className="mt-4 h-9 w-3/4 max-w-xl rounded-xl bg-ink/10" />
          <div className="mt-4 h-4 w-2/3 max-w-lg rounded-full bg-ink/10" />
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="container-page grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border p-6">
              <div className="h-12 w-12 rounded-xl bg-brand/10" />
              <div className="mt-4 h-4 w-2/3 rounded-full bg-ink/10" />
              <div className="mt-3 h-3 w-full rounded-full bg-ink/10" />
              <div className="mt-2 h-3 w-5/6 rounded-full bg-ink/10" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
