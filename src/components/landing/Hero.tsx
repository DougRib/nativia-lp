import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { heroHighlights } from "@/data/landing-content";
import heroImg from "@/assets/hero.png";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-hero pb-16 pt-12 sm:pb-10 sm:pt-30 lg:pb-16 lg:pt-30"
    >
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="reveal-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              IA privada · On-premise · LGPD
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-[1.08] sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              A IA corporativa que{" "}
              <span className="text-gradient">nunca expõe</span> os dados da sua
              empresa.
            </h1>

            <p className="mb-7 max-w-xl text-base text-muted-foreground sm:mb-8 sm:text-lg">
              NativIA é uma plataforma de inteligência artificial privada que
              processa documentos e gera insights dentro do seu próprio ambiente.
              Segurança, governança e produtividade sem vazamento de informação.
            </p>

            <div className="mb-1 flex flex-col flex-wrap gap-3 sm:flex-row">
              <ButtonLink href="#contato" size="lg" className="w-full sm:w-auto">
                Agendar demonstração
                <ArrowRight className="ml-1 h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="#contato"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Falar com especialista
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            <div className="animate-float absolute -inset-4 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
            <div className="hero-image-glow pointer-events-none absolute -inset-[1px] z-10 rounded-2xl" />
            <img
              src={heroImg}
              alt="Visualização da NativIA processando documentos corporativos com segurança"
              width={1536}
              height={1024}
              loading="eager"
              className="relative z-0 h-auto w-full rounded-2xl border border-border/70 shadow-card-elevated"
            />
          </div>
        </div>

        <div className="mt-5 sm:mt-5">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary sm:mb-3">
              Segurança por padrão
            </p>
            <p className="mx-auto mb-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:mb-2 sm:text-base">
              Arquitetura preparada para operação corporativa com privacidade,
              controle técnico e conformidade desde a origem dos dados até a
              resposta da IA.
            </p>
          </div>

          <div className="mx-auto max-w-5xl rounded-2xl border border-border/75 bg-card/30 p-2 backdrop-blur-sm">
            <div className="grid sm:grid-cols-3">
              {heroHighlights.map((highlight, index) => (
                <article
                  key={highlight.label}
                  className={`flex items-start gap-3 rounded-xl p-2 sm:p-2 ${
                    index > 0
                      ? "border-t border-border/70 sm:border-l sm:border-t-0 sm:border-border/80"
                      : ""
                  }`}
                >
                  <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/45 bg-primary/10 text-primary shadow-[0_0_22px_-14px_oklch(0.78_0.16_200)]">
                    <highlight.icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{highlight.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
