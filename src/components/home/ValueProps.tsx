type Item = { title: string; description: string; icon?: string | null };

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  items: Item[];
};

export function ValueProps({ eyebrow, title, subtitle, items }: Props) {
  return (
    <section className="bg-surface py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">{eyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-balance text-muted">{subtitle}</p>}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-navy/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-xl transition-colors group-hover:bg-brand group-hover:text-white">
                {item.icon ?? "✦"}
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
