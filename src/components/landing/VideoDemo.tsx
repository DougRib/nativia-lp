import { Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { videoDemo } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

export function VideoDemo() {
  const hasVideo = Boolean(videoDemo.videoSrc);

  return (
    <RevealSection id="demo" className="border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            {videoDemo.eyebrow}
          </p>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-5xl">
            {videoDemo.title}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {videoDemo.description}
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="hero-image-glow pointer-events-none absolute -inset-[1px] z-10 rounded-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card-elevated">
            {/*
              TODO_VIDEO: Quando o vídeo estiver pronto, defina `videoDemo.videoSrc`
              em `src/data/landing-content.ts` apontando para o arquivo .mp4
              (ex.: importado de `src/assets/` ou servido em `public/videos/`).
              O <video> abaixo já consome o src e o poster.
            */}
            <video
              className="aspect-video w-full bg-black object-cover"
              poster={videoDemo.posterUrl}
              controls={hasVideo}
              preload="none"
              playsInline
            >
              {hasVideo && <source src={videoDemo.videoSrc} type="video/mp4" />}
              Seu navegador não suporta vídeo HTML5.
            </video>

            {/* Overlay quando ainda não há vídeo: deixa o lugar claro para troca. */}
            {!hasVideo && (
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="pointer-events-auto flex flex-col items-center gap-4 rounded-xl border border-border/70 bg-card/85 px-6 py-5 text-center backdrop-blur-sm">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                    <Play className="h-6 w-6" />
                  </div>
                  <p className="max-w-xs text-sm text-muted-foreground">
                    Demonstração ao vivo disponível sob agendamento.
                  </p>
                  <ButtonLink href={videoDemo.ctaHref} size="sm">
                    {videoDemo.ctaLabel}
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
