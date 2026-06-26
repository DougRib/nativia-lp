import { useRef, type SyntheticEvent } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/landing-content";
import { RevealSection } from "@/components/ui/reveal-section";

// Atraso (ms) antes de rolar o item para a viewport após abrir.
// Espera a animação de expansão (faq-content grid-template-rows) terminar
// para que o cálculo de scroll considere a altura final, não a inicial.
const FAQ_SCROLL_DELAY_MS = 380;

// Offset que compensa a navbar fixa (h-16 + padding) ao centralizar o item.
// Usado pelo rAF + scrollTo manual em vez do scrollIntoView nativo, que
// ignora navbars fixas e cola o topo do item ao topo do viewport.
const NAVBAR_OFFSET_PX = 96;

export function FAQ() {
  // Mantém referência da última timeout para cancelar antes de criar nova,
  // evitando concorrência quando o usuário abre/fecha vários itens rapidamente.
  const scrollTimerRef = useRef<number | null>(null);

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    const details = event.currentTarget;
    if (!details.open) return;

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    // Aguarda a animação CSS expandir o conteúdo antes de calcular posição.
    scrollTimerRef.current = window.setTimeout(() => {
      const rect = details.getBoundingClientRect();
      // Se o item já está bem posicionado (entre 1/3 e 2/3 da viewport),
      // não rola — evita o "pulinho" desconfortável quando não há necessidade.
      const isComfortablyVisible =
        rect.top > NAVBAR_OFFSET_PX && rect.bottom < window.innerHeight * 0.85;

      if (isComfortablyVisible) return;

      const targetTop = window.scrollY + rect.top - NAVBAR_OFFSET_PX;
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }, FAQ_SCROLL_DELAY_MS);
  }

  return (
    <RevealSection
      id="faq"
      className="border-t border-border bg-card/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Perguntas frequentes
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
            Respostas para áreas técnica e de negócio
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              onToggle={handleToggle}
              className="faq-item group rounded-xl border border-border bg-card px-4 transition-colors hover:border-primary/40 sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-sm font-semibold sm:text-base">
                {item.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
                  aria-hidden="true"
                />
              </summary>
              <div className="faq-content">
                <p className="faq-content-inner pb-4 text-sm text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
