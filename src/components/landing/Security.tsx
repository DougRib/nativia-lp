import { securityItems, securityTags } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function Security() {
  return (
    <RevealSection id="seguranca" className="border-t border-border py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Segurança & Conformidade
          </p>
          <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-5xl">
            A confiança que decisões executivas exigem
          </h2>
          <p className="mb-7 text-base text-muted-foreground sm:mb-8 sm:text-lg">
            A NativIA foi projetada com privacidade por padrão. Nada de envio de dados para
            terceiros, nada de surpresas em auditoria.
          </p>

          <div className="inline-flex flex-wrap gap-2">
            {securityTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {securityItems.map((item) => (
            <article key={item.title} className="card-hover rounded-2xl border border-border bg-card p-6">
              <item.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-1 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
