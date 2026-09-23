import { ArrowRight } from "lucide-react";

type Step = { stepNumber: number; title: string; description: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand">Nasıl Çalışıyoruz?</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Hızlı ve Kolay Süreç
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.stepNumber} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                {step.stepNumber}
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              {i < steps.length - 1 && (
                <span className="absolute right-[-18px] top-6 hidden lg:block" aria-hidden>
                  <ArrowRight className="h-5 w-5 text-border" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
