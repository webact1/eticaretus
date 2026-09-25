export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Paket detayı yükleniyor">
      <section className="border-b border-border bg-surface py-14">
        <div className="container-page animate-pulse">
          <div className="h-3 w-28 rounded-full bg-brand/20" />
          <div className="mt-4 h-10 w-48 rounded-xl bg-ink/10" />
          <div className="mt-4 h-4 w-72 max-w-full rounded-full bg-ink/10" />
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="container-page grid animate-pulse gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-5 w-5 shrink-0 rounded-full bg-brand/15" />
                <div className="h-3.5 w-full max-w-md rounded-full bg-ink/10" />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border p-6">
            <div className="h-4 w-24 rounded-full bg-ink/10" />
            <div className="mt-4 h-9 w-40 rounded-xl bg-ink/10" />
            <div className="mt-6 h-12 w-full rounded-full bg-brand/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
