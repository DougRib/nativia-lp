import { ArrowRight, Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { navLinks as defaultNavLinks } from "@/data/landing-content";
import { ButtonLink } from "@/components/ui/button";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/cn";
import logo from "@/assets/nativia-logo1.webp";

// Tempo (ms) que a classe .nav-link-clicked permanece no link após o clique.
// Sincronizado com a duração do keyframe `nav-link-ripple` em styles.css.
const RIPPLE_DURATION_MS = 650;

// Duração da animação de saída do drawer mobile, sincronizada com o keyframe
// `drawer-exit` em styles.css. Usada para atrasar o unmount enquanto a animação
// de fechamento ainda está rodando.
const DRAWER_EXIT_DURATION_MS = 240;

export type NavbarLink = {
  href: string;
  label: string;
};

type NavbarProps = {
  /**
   * Lista de links exibidos. Default: links da landing.
   * Para páginas institucionais, passe `legalNavigation`.
   */
  links?: readonly NavbarLink[];

  /**
   * Href ativo "forçado" (ex.: a página legal atual).
   * Sobrepõe o scrollspy quando definido — útil para indicar a rota corrente.
   */
  activeHref?: string;

  /**
   * Habilita scrollspy via IntersectionObserver para detectar
   * automaticamente qual seção está visível. Use `true` apenas na landing.
   */
  enableScrollSpy?: boolean;

  /**
   * Slot do canto direito (CTA na landing, "Voltar ao site" nas legais).
   * Se omitido, o CTA padrão "Agendar demonstração" é renderizado.
   * IMPORTANTE: o consumidor é responsável pela responsividade — em mobile
   * o navbar fica deliberadamente "limpo" e os CTAs migram para o drawer.
   */
  rightAction?: ReactNode;
};

export function Navbar({
  links = defaultNavLinks,
  activeHref,
  enableScrollSpy = false,
  rightAction,
}: NavbarProps) {
  // `open` reflete a intenção do usuário (clicou no hambúrguer ou em "X").
  const [open, setOpen] = useState(false);

  /**
   * Máquina de estado de 3 valores que controla o ciclo de vida do drawer:
   *   - "closed":  drawer não está no DOM.
   *   - "open":    drawer no DOM tocando animação de entrada.
   *   - "closing": drawer ainda no DOM tocando animação de saída
   *                (aguardando timer para desmontar).
   *
   * Centralizar em UM ÚNICO estado evita o anti-pattern de chamar
   * setState sincronamente dentro do useEffect (que dispara o warning
   * "Calling setState synchronously within an effect" do React 19).
   */
  const [drawerState, setDrawerState] = useState<"closed" | "open" | "closing">(
    "closed",
  );

  // Snapshot do último valor de `open` que o render viu — usado para
  // detectar transições durante o próprio render (padrão oficial do React:
  // https://react.dev/reference/react/useState#storing-information-from-previous-renders).
  const [lastOpenSeen, setLastOpenSeen] = useState(false);

  // Reage à transição open↔fechado DURANTE o render. Isso é seguro porque:
  //   1. A atualização só dispara quando há mudança real (`open !== lastOpenSeen`).
  //   2. React descarta o render atual e re-renderiza imediatamente — não
  //      cria efeito colateral pós-commit.
  //   3. Converge em ≤2 passes (não vira loop).
  if (open !== lastOpenSeen) {
    setLastOpenSeen(open);
    if (open) {
      setDrawerState("open");
    } else if (drawerState === "open") {
      setDrawerState("closing");
    }
  }

  // Link recentemente clicado — usado para acionar a animação ripple
  // sem precisar de refs em cada link individual.
  const [clickedHref, setClickedHref] = useState<string | null>(null);

  // Hrefs memoizados para evitar re-execução do hook a cada render
  // (a identidade do array muda, mas o conteúdo não).
  const hrefs = useMemo(() => links.map((link) => link.href), [links]);

  // Scrollspy roda apenas quando habilitado (landing). Em páginas legais,
  // o estado ativo vem do prop `activeHref`.
  const spyHref = useActiveSection(enableScrollSpy ? hrefs : []);
  const currentActiveHref = activeHref ?? spyHref;

  const handleLinkClick = useCallback(
    (href: string) => () => {
      // Fecha o menu mobile imediatamente (UX: parece responsivo).
      setOpen(false);
      // Dispara o ripple visual neste link específico.
      setClickedHref(href);
    },
    [],
  );

  // Limpa o estado de "clicado" depois do ripple, garantindo que a animação
  // possa ser reativada em cliques sucessivos no mesmo link.
  useEffect(() => {
    if (!clickedHref) return;
    const timer = window.setTimeout(
      () => setClickedHref(null),
      RIPPLE_DURATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [clickedHref]);

  // Effect EXCLUSIVO para gerenciar o timer de unmount após o fechamento.
  // Não chama setState sincronamente — só agenda um setTimeout assíncrono.
  useEffect(() => {
    if (drawerState !== "closing") return;
    const timer = window.setTimeout(
      () => setDrawerState("closed"),
      DRAWER_EXIT_DURATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [drawerState]);

  const shouldRender = drawerState !== "closed";
  const isClosing = drawerState === "closing";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <nav className="navbar-shell pointer-events-auto relative mx-auto flex h-16 max-w-7xl items-center justify-between overflow-hidden rounded-2xl bg-background/75 px-4 backdrop-blur-xl sm:px-6">
        <div className="absolute inset-0 grid-bg opacity-35 [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)]" />

        <a
          href="/#top"
          className="relative flex items-center gap-2 text-lg font-bold"
          aria-label="NativIA — voltar ao início"
        >
          <img
            src={logo}
            alt=""
            width={132}
            height={40}
            loading="eager"
            className="h-8 w-auto sm:h-9"
          />
        </a>

        {/*
          Links desktop — visíveis apenas a partir de `lg` (1024px+).
          Abaixo disso o navbar fica deliberadamente limpo (logo + hambúrguer)
          e os links vão para o drawer. Isso evita o "esmagamento" que ocorria
          no range 768–1023px com 7 links + CTAs disputando espaço.
        */}
        <div className="relative hidden items-center gap-1 text-sm lg:flex">
          {links.map((link) => {
            const isActive = link.href === currentActiveHref;
            const isClicked = link.href === clickedHref;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                className={cn(
                  "nav-link",
                  isActive && "nav-link-active",
                  isClicked && "nav-link-clicked",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="relative flex items-center gap-2">
          {/*
            Slot do consumidor (CTA na landing, "Voltar ao site" nas legais).
            Cada consumidor controla sua própria responsividade — o navbar não
            força visibilidade aqui para manter a flexibilidade do slot.
          */}
          {rightAction ?? <DefaultRightAction />}

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            onClick={() => setOpen((current) => !current)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 text-foreground transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
          >
            {/*
              Crossfade simples entre os ícones via opacidade controlada,
              evitando o "salto" visual de unmount/mount entre Menu e X.
            */}
            <span className="relative grid h-5 w-5 place-items-center">
              <Menu
                className={cn(
                  "absolute h-5 w-5 transition-all duration-200",
                  open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
                )}
                aria-hidden="true"
              />
              <X
                className={cn(
                  "absolute h-5 w-5 transition-all duration-200",
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
                )}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </nav>

      {shouldRender && (
        <div
          id="mobile-nav-menu"
          className={cn(
            "mobile-drawer pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-primary/25 bg-background/95 backdrop-blur-xl lg:hidden",
            isClosing ? "mobile-drawer-closing" : "mobile-drawer-open",
          )}
        >
          <div className="flex flex-col gap-1 px-4 py-4 text-sm">
            {links.map((link, index) => {
              const isActive = link.href === currentActiveHref;
              const isClicked = link.href === clickedHref;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick(link.href)}
                  className={cn(
                    "nav-link justify-start",
                    isActive && "nav-link-active",
                    isClicked && "nav-link-clicked",
                    "mobile-drawer-item",
                  )}
                  // Atraso escalonado nos itens reforça a sensação de "deslizar para dentro".
                  // CSS custom property lida com isso de forma performática (sem refs).
                  style={{ "--drawer-item-delay": `${index * 40}ms` } as React.CSSProperties}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}

            {/*
              CTA vive dentro do drawer no mobile/tablet, mantendo o navbar
              limpo. Em desktop (lg+) o drawer nem é renderizado, então este
              CTA não compete com o `rightAction` da navbar.
            */}
            <ButtonLink
              href="/#contato"
              onClick={() => setOpen(false)}
              className="mobile-drawer-item mt-3 border border-primary/60 bg-primary/10 text-center text-foreground hover:bg-primary/20"
              style={{ "--drawer-item-delay": `${links.length * 40}ms` } as React.CSSProperties}
            >
              Agendar demonstração
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * CTA padrão (usado quando o consumidor não fornece um `rightAction`).
 * Visível apenas em desktop (lg+) — em mobile/tablet o CTA fica dentro
 * do drawer, mantendo o navbar limpo e profissional.
 *
 * Wrapper `<span>` necessário: o `buttonClassName` base aplica `inline-flex`
 * que entra em conflito no cascade com `hidden` aplicado direto no botão
 * (a regra `.inline-flex` aparece depois de `.hidden` no CSS gerado pelo
 * Tailwind v4 e acaba vencendo). Controlar visibilidade no wrapper
 * elimina o conflito de display.
 */
function DefaultRightAction() {
  return (
    <span className="hidden lg:inline-flex">
      <ButtonLink
        href="/#contato"
        size="sm"
        className="border border-primary/60 bg-primary/10 text-foreground shadow-[0_16px_30px_-24px_oklch(0.78_0.16_200)] hover:bg-primary/20"
      >
        Agendar demonstração
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </ButtonLink>
    </span>
  );
}
