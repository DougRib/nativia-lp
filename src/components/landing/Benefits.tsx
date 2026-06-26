import { benefits } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function Benefits() {
  return (
    <RevealSection
      id="beneficios"
      className="border-t border-border bg-card/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Benefícios
          </p>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-5xl">
            Construída para a realidade corporativa
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tudo o que TI, jurídico e gestão precisam para adotar IA com
            segurança.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {benefits.map((item) => (
            <article
              key={item.title}
              className="card-glow card-hover rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow transition-transform group-hover:scale-110">
                <item.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-base font-semibold sm:text-lg">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
