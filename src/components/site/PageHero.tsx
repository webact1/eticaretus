export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-border bg-surface py-14 sm:py-20">
      <div className="container-page max-w-3xl">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-brand">{eyebrow}</p>}
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-balance text-muted sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
