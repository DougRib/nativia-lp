import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn } from "lucide-react";
import { systemShowcase } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";
import { cn } from "@/lib/cn";

/** Item do showcase que está sendo exibido em zoom (null = modal fechado). */
type ZoomedItem = (typeof systemShowcase)[number] | null;

/**
 * Symmetric Bento Grid (inspirado no padrão da Aceternity UI) com:
 *  - "Frame" externo envolvendo todos os cartões.
 *  - Linhas de circuito SVG animadas correndo atrás dos cartões.
 *  - Click-to-zoom em cada imagem com modal acessível (Esc + clique fora).
 *
 * Responsividade do bento:
 *  - Mobile (<sm): 1 coluna.
 *  - Tablet (sm–lg): 2 colunas.
 *  - Desktop (lg+): grid 4x2 simétrico — células "lg" em diagonais opostas.
 */
export function UseCases() {
  const [zoomed, setZoomed] = useState<ZoomedItem>(null);

  return (
    <RevealSection
      id="casos"
      className="border-t border-border bg-card/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Casos de uso
          </p>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-5xl">
            O sistema em ação
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Um tour visual pelas telas reais da plataforma — do acesso seguro à
            análise multimodal, tudo dentro do seu ambiente.
          </p>
        </div>

        {/*
          Frame externo: envolve todos os cards, recebe as linhas de circuito
          atrás do grid (z-index controlado via `isolate` + `relative z-10` no grid).
          `overflow-hidden` é importante para conter o SVG das linhas dentro
          dos cantos arredondados.
        */}
        <div className="bento-frame relative isolate overflow-hidden rounded-3xl border border-border bg-card/40 p-3 sm:p-5 lg:p-6">
          {/* Camada de trás: trilhos do circuito (sutil, atrás dos cards). */}
          <CircuitLines variant="rails" />

          <div className="relative z-10 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4">
            {systemShowcase.map((item) => (
              <BentoCard
                key={item.title}
                image={item.image}
                alt={item.alt}
                eyebrow={item.eyebrow}
                title={item.title}
                description={item.description}
                size={item.size}
                onZoom={() => setZoomed(item)}
              />
            ))}
          </div>

          {/*
            Camada da frente: pacotes de luz animados SOBRE os cards. Como têm
            `pointer-events: none` e opacidade controlada, não interferem nos
            cliques mas aparecem como linhas de neon viajando pelo bento —
            o efeito "circuito impresso vivo" pedido pelo usuário.
          */}
          <CircuitLines variant="pulses" />
        </div>
      </div>

      {zoomed && (
        <ImageZoomModal item={zoomed} onClose={() => setZoomed(null)} />
      )}
    </RevealSection>
  );
}

type BentoCardProps = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  /** "lg" = ocupa 2 colunas em desktop; "sm" = 1 coluna. */
  size: "sm" | "lg";
  onZoom: () => void;
};

function BentoCard({
  image,
  alt,
  eyebrow,
  title,
  description,
  size,
  onZoom,
}: BentoCardProps) {
  const isLarge = size === "lg";

  return (
    <article
      className={cn(
        "bento-card group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500",
        isLarge && "lg:col-span-2",
      )}
    >
      {/*
        Imagem dentro de um <button> para ficar clicável + acessível por teclado.
        O hint visual `ZoomIn` aparece no hover/focus, indicando ao usuário que
        é possível ampliar.
      */}
      <button
        type="button"
        onClick={onZoom}
        aria-label={`Ampliar imagem: ${title}`}
        className="group/zoom relative block w-full overflow-hidden bg-background text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Gradiente de baixo para cima — melhora contraste com painel de texto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/90 to-transparent"
        />

        {/* Hint "clique para ampliar" — só aparece no hover/focus do botão. */}
        <span
          aria-hidden="true"
          className="absolute cursor-pointer right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-primary/50 bg-background/70 text-primary opacity-0 backdrop-blur-md transition-all duration-300 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>

      <div className="relative flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}

// Rotas dos paths — mantidas centralizadas para que rails e pulses
// usem exatamente a mesma geometria (alinhamento visual perfeito).
const CIRCUIT_PATHS = [
  "M 40 60 L 580 60 L 580 360 L 1160 360",
  "M 1160 60 L 1160 280 L 40 280 L 40 660",
  "M 40 660 L 620 660 L 620 460 L 1160 460 L 1160 700",
  "M 380 60 L 380 200 L 820 200 L 820 660",
] as const;

const PULSE_STROKES = [
  "oklch(0.85 0.18 195)",
  "oklch(0.78 0.16 200)",
  "oklch(0.88 0.18 195)",
  "oklch(0.78 0.16 200)",
] as const;

type CircuitLinesProps = {
  /**
   * - "rails": trilhos estáticos sutis (vão ATRÁS dos cards).
   * - "pulses": pacotes de luz animados (vão na FRENTE dos cards, com
   *   pointer-events:none para não bloquear cliques).
   */
  variant: "rails" | "pulses";
};

/**
 * SVG de linhas de circuito que envolvem o bento grid.
 *
 * Renderizado em DUAS instâncias:
 *  1. `variant="rails"` no fundo do frame — trilhos estáticos cyan suaves
 *     que sugerem o "circuito impresso" mesmo quando nada está animando.
 *  2. `variant="pulses"` no topo do frame — paths animados com
 *     `stroke-dasharray` longo + `stroke-dashoffset` em loop, criando o
 *     efeito de "pacotes de luz" viajando por cima dos cards.
 *
 * Aparece só em `lg+`: nos breakpoints menores os cards empilham
 * verticalmente e a geometria das linhas perde o sentido.
 */
function CircuitLines({ variant }: CircuitLinesProps) {
  const isPulses = variant === "pulses";

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "circuit-svg absolute inset-0 hidden h-full w-full lg:block",
        isPulses ? "pointer-events-none z-20 opacity-95" : "z-0 opacity-100",
      )}
      viewBox="0 0 1200 720"
      preserveAspectRatio="none"
    >
      <defs>
        {/*
          Glow halo cyan ao redor do trail: blur amplo cria a aura
          "neon", mas o stroke original (SourceGraphic) é mantido por
          cima preservando nitidez no núcleo — sem isso o trail dilui
          completamente sobre as imagens dos screenshots.
        */}
        <filter id="circuit-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="4" result="blurHalo" />
          <feMerge>
            <feMergeNode in="blurHalo" />
            <feMergeNode in="blurHalo" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {isPulses ? (
        // strokeWidth controlado por CSS (.circuit-pulse) — evita conflito
        // com a animação `circuit-flow` que define a espessura final.
        <g fill="none" filter="url(#circuit-glow)">
          {CIRCUIT_PATHS.map((d, index) => (
            <path
              key={d}
              d={d}
              className={`circuit-pulse circuit-pulse-${index + 1}`}
              stroke={PULSE_STROKES[index]}
            />
          ))}
        </g>
      ) : (
        <g
          stroke="oklch(0.78 0.16 200 / 0.22)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        >
          {CIRCUIT_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      )}
    </svg>
  );
}

/**
 * Modal acessível para ampliar a imagem do card clicado.
 *
 * Características:
 *  - `role="dialog"` + `aria-modal="true"` + label descritiva.
 *  - Tecla Esc fecha (via useEffect global).
 *  - Clique no backdrop fecha; clique dentro do conteúdo é ignorado
 *    (stopPropagation).
 *  - Foco vai automaticamente para o botão de fechar ao abrir, garantindo
 *    operação por teclado.
 *  - Trava o scroll do body enquanto aberto.
 */
function ImageZoomModal({
  item,
  onClose,
}: {
  item: NonNullable<ZoomedItem>;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Esc fecha; foco vai para o botão de fechar; scroll trava.
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  // Portal para document.body — necessário porque o ancestral `RevealSection`
  // aplica `transform` no wrapper, e `position: fixed` dentro de um ancestral
  // transformado passa a ser relativo ao ancestral, não ao viewport. O portal
  // escapa essa hierarquia e o `inset-0` fica corretamente colado no viewport.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${item.title}`}
      className="image-zoom-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/*
        Container do conteúdo: stopPropagation evita que cliques na imagem
        propaguem para o backdrop e disparem o close indevidamente.
      */}
      <div
        className="image-zoom-content relative flex max-h-full w-full max-w-6xl flex-col gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary sm:text-base">
            {item.eyebrow}
          </p>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar imagem ampliada"
            className="image-zoom-close inline-flex items-center cursor-pointer gap-2 rounded-full border border-primary/50 bg-card/80 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-md transition hover:border-primary hover:bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Fechar
          </button>
        </div>

        <img
          src={item.image}
          alt={item.alt}
          className="h-auto max-h-[80vh] w-full rounded-2xl border border-border object-contain shadow-card-elevated"
        />

        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          {item.title} — pressione Esc ou clique fora para fechar
        </p>
      </div>
    </div>,
    document.body,
  );
}
