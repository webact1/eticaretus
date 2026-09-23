import Link from "next/link";

export function NotFoundContent() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white py-20">
      <div className="container-page max-w-md text-center">
        <p className="text-6xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink">Sayfa Bulunamadı</h1>
        <p className="mt-3 text-muted">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </section>
  );
}
