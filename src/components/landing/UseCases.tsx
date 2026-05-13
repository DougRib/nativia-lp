import { useCases } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function UseCases() {
  return (
    <RevealSection id="casos" className="border-t border-border bg-card/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Casos de uso</p>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">Resultados reais por área</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 sm:gap-6">
          {useCases.map((useCase) => (
            <article
              key={useCase.area}
              className="card-glow card-hover rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <useCase.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold sm:text-xl">{useCase.area}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {useCase.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 text-primary">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
