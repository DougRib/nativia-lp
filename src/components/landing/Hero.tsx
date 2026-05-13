import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { heroHighlights } from "@/data/landing-content";
import heroImg from "@/assets/hero-nativia.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-hero pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
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

          <div className="mb-8 flex flex-col flex-wrap gap-3 sm:mb-10 sm:flex-row">
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {heroHighlights.map((highlight) => (
              <div key={highlight.label} className="flex items-center gap-2">
                <highlight.icon className="h-4 w-4 text-primary" />
                {highlight.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative order-first lg:order-none">
          <div className="animate-float absolute -inset-4 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
          <img
            src={heroImg}
            alt="Visualização da NativIA processando documentos corporativos com segurança"
            width={1536}
            height={1024}
            loading="eager"
            className="relative h-auto w-full rounded-2xl border border-border shadow-card-elevated"
          />
        </div>
      </div>
    </section>
  );
}
