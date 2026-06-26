import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/data/landing-content";
// Import via Vite garante hash de cache + resolução correta no build de produção.
// O bug anterior usava uma string literal "src/assets/..." que não passa pelo bundler.
import logo from "@/assets/nativia-logo1.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-16 md:grid-cols-4 md:gap-10 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-2 text-lg font-bold">
            <img
              src={logo}
              alt="NativIA"
              width={150}
              height={45}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            IA corporativa privada com execução on-premise.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Produto</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Institucional</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="/sobre" className="hover:text-foreground">
                Sobre
              </a>
            </li>
            <li>
              <a
                href="/politica-de-privacidade"
                className="hover:text-foreground"
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="/termos-de-uso" className="hover:text-foreground">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="/lgpd" className="hover:text-foreground">
                LGPD
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Contato</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:contato@nativia.com.br"
                className="break-all hover:text-foreground sm:break-normal"
              >
                contato@nativia.com.br
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+551140000000" className="hover:text-foreground">
                +55 (11) 4000-0000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              São Paulo · Brasil
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NativIA. Todos os direitos reservados.
      </div>
    </footer>
  );
}
