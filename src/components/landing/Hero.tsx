import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { heroHighlights } from "@/data/landing-content";
import heroImg from "@/assets/hero.png";

export function Hero() {
  return (
    <section
      id="top"
      // `pt-24` em mobile garante que o conteúdo (badge + h1) fique abaixo da
      // navbar fixa. A navbar ocupa ~76px do topo (12px do top-3 + 64px do h-16);
      // anteriormente `pt-12` (48px) deixava o badge escondido atrás da navbar
      // em telas pequenas. A partir de sm, `pt-30` já dá folga suficiente.
      className="relative overflow-hidden bg-gradient-hero pb-16 pt-24 sm:pb-10 sm:pt-30 lg:pb-16 lg:pt-30"
    >
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          {/*
            Em mobile/tablet (<lg) o layout é coluna única — centralizamos
            o conteúdo (badge, h1, parágrafo, CTAs) para um visual equilibrado.
            A partir de lg o conteúdo retoma o alinhamento à esquerda, próprio
            do split horizontal lado a lado com a imagem.
          */}
          <div className="reveal-up text-center lg:text-left">
            {/*
              Badge futurista:
              - `.hero-badge` fornece borda gradiente cônica animada (mesma técnica
                de mask-composite do botão), glow ciano pulsante e backdrop blur.
              - Estrutura interna mantida: dot pulsante + texto.
              - O dot piscante reforça a sensação de "sistema ao vivo".
            */}
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_oklch(0.78_0.16_200/0.8)]" />
              <span className="font-medium tracking-wide">IA privada · On-premise · LGPD</span>
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-[1.08] sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              A IA corporativa que{" "}
              <span className="text-gradient">nunca expõe</span> os dados da sua
              empresa.
            </h1>

            <p className="mx-auto mb-7 max-w-xl text-base text-muted-foreground sm:mb-8 sm:text-lg lg:mx-0">
              NativIA é uma plataforma de inteligência artificial privada que
              processa documentos e gera insights dentro do seu próprio ambiente.
              Segurança, governança e produtividade sem vazamento de informação.
            </p>

            {/*
              CTAs com intenções diferenciadas:
              - "Agendar demonstração" → leva ao formulário estruturado (#contato),
                ideal para leads no topo do funil que querem ver o produto.
              - "Falar com especialista" → abre o e-mail diretamente, atendendo
                quem já tem perguntas específicas e prefere conversa direta.
              Anteriormente ambos apontavam para #contato, criando redundância
              sem ganho de segmentação.
            */}
            {/*
              Ambos os CTAs usam a variante `gradient-border` — borda cônica
              animada em ciano (cor primary do projeto) que acelera + preenche
              o interior com glow radial no hover. Visual unificado e moderno;
              a diferenciação de intenção segue pelo texto e pelo destino.
            */}
            <div className="mb-1 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <ButtonLink
                href="#contato"
                size="lg"
                variant="gradient-border"
                className="w-full sm:w-auto"
              >
                Agendar demonstração
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href="mailto:contato@nativia.com.br?subject=Quero%20falar%20com%20um%20especialista%20NativIA"
                size="lg"
                variant="gradient-border"
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
