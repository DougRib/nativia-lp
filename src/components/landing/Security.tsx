import { securityItems, securityTags } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function Security() {
  return (
    <RevealSection
      id="seguranca"
      className="border-t border-border py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/*
          Layout vertical em todas as resoluções — segue o mesmo padrão de
          Benefits / TechHighlights / Use Cases:
            1) Cabeçalho centralizado (label + h2 + descrição + tags).
            2) Grid de cards abaixo.
          Anteriormente esta seção usava split horizontal (texto-cards lado
          a lado) só em lg+, o que destoava do ritmo visual das demais.
        */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Segurança & Conformidade
          </p>
          <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-5xl">
            A confiança que decisões executivas exigem
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A NativIA foi projetada com privacidade por padrão. Nada de envio de
            dados para terceiros, nada de surpresas em auditoria.
          </p>

          {/*
            Tags de conformidade renderizadas como chips horizontais centralizados.
            `flex` (não `inline-flex`) + `justify-center` mantém o conjunto centrado
            mesmo quando há quebra de linha em viewports estreitos.
          */}
          <div className="flex flex-wrap justify-center gap-2">
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

        {/*
          4 cards em 1 linha no desktop (lg+), 2x2 em tablet (sm+), 1 coluna em mobile.
          securityItems tem exatamente 4 itens, então lg:grid-cols-4 entrega
          uma faixa simétrica e respirada — ideal para o conteúdo conciso.
        */}
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {securityItems.map((item) => (
            <article
              key={item.title}
              className="card-hover rounded-2xl border border-border bg-card p-6 sm:p-7"
            >
              <item.icon
                className="mb-3 h-6 w-6 text-primary"
                aria-hidden="true"
              />
              <h3 className="mb-1 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
