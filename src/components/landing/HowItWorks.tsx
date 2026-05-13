import { howItWorksSteps } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function HowItWorks() {
  return (
    <RevealSection id="como-funciona" className="border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Como funciona</p>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
            Do documento ao insight em minutos
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {howItWorksSteps.map((step) => (
            <article key={step.title} className="card-hover rounded-2xl border border-border bg-card p-6">
              <step.icon className="mb-4 h-7 w-7 text-primary" />
              <h3 className="mb-2 text-sm font-semibold">{step.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
