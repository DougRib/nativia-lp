import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type BackToSiteButtonProps = {
  /** Destino do "voltar". Default: âncora #top na home. */
  href?: string;
  /** Texto do botão. Customizável caso o contexto exija outro rótulo. */
  label?: string;
  className?: string;
};

/**
 * Botão "Voltar ao site" usado no header das páginas institucionais.
 *
 * Combina:
 *  - Shimmer (linha de luz diagonal) que cruza o botão no hover via `.btn-back::before`.
 *  - Ícone "←" que desliza ligeiramente para a esquerda (`-3px`) no hover/focus,
 *    reforçando a direção do movimento.
 *  - Versão responsiva: em mobile usa `size="sm"` e `aria-label`, em desktop
 *    o texto fica visível ao lado do ícone.
 *
 * Implementação separada em componente próprio para manter consistência
 * caso o botão precise ser reutilizado em outros pontos (ex.: erro 404).
 */
export function BackToSiteButton({
  href = "/#top",
  label = "Voltar ao site",
  className,
}: BackToSiteButtonProps) {
  return (
    <ButtonLink
      href={href}
      variant="outline"
      size="sm"
      aria-label={label}
      className={cn("btn-back group", className)}
    >
      <ArrowLeft className="btn-back-icon h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </ButtonLink>
  );
}
