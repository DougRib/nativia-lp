import { techHighlights } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function TechHighlights() {
  return (
    <RevealSection
      id="tecnologia"
      className="border-t border-border bg-card/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Por dentro
          </p>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-5xl">
            Arquitetura projetada para precisão e privacidade
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Pipeline RAG híbrido com extração determinística para casos críticos —
            tudo executando localmente, sob seu controle técnico.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {techHighlights.map((item) => (
            <article
              key={item.title}
              className="card-glow card-hover rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-base font-semibold sm:text-lg">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}