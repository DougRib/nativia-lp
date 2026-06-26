import { useEffect, useState } from "react";

/**
 * Hook que detecta qual seção da página está visível no viewport e retorna
 * o href correspondente (no formato "#id"). Funciona como "scrollspy" —
 * usado pelo Navbar para destacar o link da seção atual em tempo real.
 *
 * Implementação:
 *  - Usa IntersectionObserver para observar todos os elementos cujos IDs
 *    estejam presentes nos hrefs fornecidos (ex.: "#beneficios" -> id="beneficios").
 *  - `rootMargin` puxa a "linha de foco" para ~35% do topo do viewport,
 *    fazendo com que a seção seja marcada como ativa quando seu topo passa
 *    pelo terço superior — comportamento padrão de scrollspy em landings.
 *  - `threshold` baixo (0.01) garante detecção mesmo em seções muito altas.
 *
 * Acessibilidade / preferências:
 *  - Não opera se IntersectionObserver não existir (browsers muito antigos)
 *    nem durante SSR — degradação silenciosa, sem quebrar a UI.
 */
export function useActiveSection(hrefs: readonly string[]): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    // Extrai apenas os hrefs que apontam para âncoras internas ("#algo").
    // Links externos ou de página (ex.: "/sobre") são ignorados pelo scrollspy.
    const anchorHrefs = hrefs.filter((href) => href.startsWith("#"));
    if (anchorHrefs.length === 0) {
      return;
    }

    // Mapeia id -> href para reverter o lookup quando a seção entra em viewport.
    const idToHref = new Map<string, string>();
    const observedElements: Element[] = [];

    for (const href of anchorHrefs) {
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        idToHref.set(id, href);
        observedElements.push(element);
      }
    }

    if (observedElements.length === 0) {
      return;
    }

    // Mantém o conjunto de seções atualmente "visíveis" (intersecting).
    // Quando há mais de uma simultânea, escolhemos a mais próxima do topo —
    // dá uma sensação de transição suave conforme a página rola.
    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleIds.add(id);
          } else {
            visibleIds.delete(id);
          }
        }

        if (visibleIds.size === 0) {
          return;
        }

        // Escolhe a seção visível com menor `top` (mais próxima do topo do viewport).
        let topMostId: string | null = null;
        let topMostTop = Number.POSITIVE_INFINITY;

        for (const id of visibleIds) {
          const element = document.getElementById(id);
          if (!element) continue;
          const top = element.getBoundingClientRect().top;
          if (top < topMostTop) {
            topMostTop = top;
            topMostId = id;
          }
        }

        if (topMostId) {
          const nextHref = idToHref.get(topMostId);
          if (nextHref) {
            setActiveHref(nextHref);
          }
        }
      },
      {
        // Corte de viewport: "ativa" antes da seção atingir o topo absoluto.
        // -35% no topo desloca a "linha sensora" para abaixo do header fixo.
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.01,
      },
    );

    for (const element of observedElements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [hrefs]);

  return activeHref;
}
