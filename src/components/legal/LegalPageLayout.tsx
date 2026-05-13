import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { legalNavigation, type LegalDocument } from "@/data/legal-content";
import logo from "@/assets/nativia-logo1.png";

type LegalPageLayoutProps = {
  document: LegalDocument;
};

export function LegalPageLayout({ document }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="NativIA"
              width={132}
              height={40}
              loading="eager"
              className="h-8 w-auto sm:h-9"
            />
          </a>

          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {legalNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-muted-foreground transition hover:bg-card hover:text-foreground",
                  item.href === document.path && "bg-card text-foreground",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ButtonLink href="/#top" variant="outline" size="sm" className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </ButtonLink>
        </div>
      </header>

      <main className="py-10 sm:py-14">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Documento institucional
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {document.title}
          </h1>
          <p className="mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {document.lead}
          </p>
          <p className="text-sm text-muted-foreground">
            Última atualização: <strong className="font-semibold text-foreground">{document.updatedAt}</strong>
          </p>
        </section>

        <section className="mx-auto mt-10 max-w-4xl space-y-8 px-4 sm:mt-12 sm:space-y-10 sm:px-6 lg:px-8">
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
                      <span className="mt-1 text-primary">•</span>
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
