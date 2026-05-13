import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/landing-content";
import { ButtonLink } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary shadow-glow">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="text-gradient">NativIA</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
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

        <div className="flex items-center gap-2">
          <ButtonLink
            href="#contato"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Agendar demonstração
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
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
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
              className="mt-2 text-center"
            >
              Agendar demonstração
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
