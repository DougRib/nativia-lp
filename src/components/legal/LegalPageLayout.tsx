import { Navbar } from "@/components/landing/Navbar";
import { BackToSiteButton } from "@/components/legal/BackToSiteButton";
import { legalNavigation, type LegalDocument } from "@/data/legal-content";

type LegalPageLayoutProps = {
  document: LegalDocument;
};

/**
 * Layout das páginas institucionais (Sobre, Política de Privacidade, Termos, LGPD).
 *
 * Reutiliza o `Navbar` da landing para garantir consistência visual e os mesmos
 * efeitos futuristas (underline gradiente, glow, ripple). Diferenças:
 *  - Os links exibidos são os de navegação legal (legalNavigation), não as
 *    seções da landing.
 *  - `activeHref` é fixado no path do documento atual (não há scrollspy: cada
 *    documento é uma página única, não uma seção de uma página longa).
 *  - O slot `rightAction` recebe o BackToSiteButton no lugar do CTA comercial.
 *
 * `pt-24` no <main> compensa a altura do Navbar fixo (anteriormente o header
 * era sticky inline e não precisava dessa folga).
 */
export function LegalPageLayout({ document }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        links={legalNavigation}
        activeHref={document.path}
        rightAction={<BackToSiteButton />}
      />

      <main className="pt-24 sm:pt-28">
        {/*
          Cabeçalho do documento: centralizado em mobile/tablet para um visual
          equilibrado, e à esquerda em desktop, onde a largura permite
          alinhamento natural de leitura.
        */}
        <section className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:text-left">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Documento institucional
          </p>
          <h1 className="mb-2 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {document.title}
          </h1>
          <p className="mx-auto mb-3 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            {document.lead}
          </p>
          <p className="text-sm text-muted-foreground">
            Última atualização: <strong className="font-semibold text-foreground">{document.updatedAt}</strong>
          </p>
        </section>

        <section className="mx-auto max-w-4xl space-y-4 px-4 pb-10 sm:space-y-4 sm:px-6 sm:pb-14 lg:px-8">
          {document.sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-border bg-card/35 p-5 sm:p-7">
              <h2 className="mb-3 text-xl font-semibold sm:text-2xl">{section.title}</h2>

              <div className="space-y-3">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${section.title}-paragraph-${paragraphIndex + 1}`}
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {section.bulletPoints.map((bulletPoint, bulletIndex) => (
                    <li
                      key={`${section.title}-bullet-${bulletIndex + 1}`}
                      className="flex gap-2 text-sm text-muted-foreground sm:text-base"
                    >
                      <span className="mt-1 text-primary" aria-hidden="true">•</span>
                      <span>{bulletPoint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-border bg-card/30">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} NativIA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
