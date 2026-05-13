import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/landing-content";
import { ButtonLink } from "@/components/ui/button";
import logo from "@/assets/nativia-logo1.png";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <nav className="navbar-shell pointer-events-auto relative mx-auto flex h-16 max-w-7xl items-center justify-between overflow-hidden rounded-2xl bg-background/75 px-4 backdrop-blur-xl sm:px-6">
        <div className="absolute inset-0 grid-bg opacity-35 [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)]" />

        <a href="#top" className="relative flex items-center gap-2 text-lg font-bold">
          <img
            src={logo}
            alt="NativIA"
            width={132}
            height={40}
            loading="eager"
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <div className="relative hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="relative flex items-center gap-2">
          <ButtonLink
            href="#contato"
            size="sm"
            className="hidden border border-primary/60 bg-primary/10 text-foreground shadow-[0_16px_30px_-24px_oklch(0.78_0.16_200)] hover:bg-primary/20 sm:inline-flex"
          >
            Agendar demonstração
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((current) => !current)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-primary/25 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-muted-foreground transition hover:bg-card hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-2 border border-primary/60 bg-primary/10 text-center text-foreground hover:bg-primary/20"
            >
              Agendar demonstração
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
