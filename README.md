# NativIA LP

Landing page institucional e comercial da **NativIA** — plataforma de IA corporativa privada com execução **on-premise**, focada em análise inteligente de documentos com privacidade por padrão (LGPD).

## Stack

- **React 19** + **TypeScript 6**
- **Vite 8** (com bindings nativos `@rolldown/binding-win32-*` para Windows)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Zod 4** para validação de formulários
- **Lucide React** para ícones
- **Sharp** (devDep) para pipeline de imagens

## Requisitos

- Node.js `20.19+` ou `22.12+`
- npm com `optionalDependencies` habilitado (Windows precisa dos bindings `rolldown`)

## Scripts

```bash
# Desenvolvimento (porta 5174 com strictPort — não migra para outra)
npm run dev

# Build de produção (tsc -b && vite build)
npm run build

# Preview do build (também em 5174)
npm run preview

# Lint em JSON (consumido por ferramentas externas)
npm run lint

# Conversão PNG → WebP para todos os assets visuais
npm run convert-images

# Regenera /public/og-image.jpg (1200×630 usado em cards de compartilhamento)
npm run generate-og

# Regenera favicons da marca (32, 180, 192, 512) a partir de nativia-icon.png
npm run generate-favicon
```

## Estrutura

```
src/
├── App.tsx                     # Roteamento manual com popstate
├── main.tsx
├── styles.css                  # Tailwind v4 + utilitários customizados
│
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx          # Reutilizado em landing E páginas legais
│   │   ├── Hero.tsx
│   │   ├── PainSolution.tsx
│   │   ├── Benefits.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── VideoDemo.tsx
│   │   ├── UseCases.tsx        # Bento grid + linhas de circuito SVG
│   │   ├── TechHighlights.tsx
│   │   ├── Security.tsx
│   │   ├── Compare.tsx
│   │   ├── SocialProof.tsx
│   │   ├── FAQ.tsx             # <details> com smooth scroll on toggle
│   │   ├── ContactForm.tsx     # Validação Zod + multi-erro
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── legal/
│   │   ├── LegalPageLayout.tsx
│   │   └── BackToSiteButton.tsx
│   └── ui/
│       ├── button.tsx          # Inclui variante "gradient-border"
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── label.tsx
│       ├── reveal-section.tsx  # IntersectionObserver-based fade-in
│       └── scroll-to-top-button.tsx
│
├── data/
│   ├── landing-content.ts      # Conteúdo das seções + showcase de imagens
│   └── legal-content.ts        # Conteúdo das 4 páginas institucionais
│
├── lib/
│   ├── cn.ts                   # Helper de className condicional
│   ├── contact-schema.ts       # Schema Zod do formulário
│   └── use-active-section.ts   # Hook de scrollspy
│
├── pages/
│   ├── LandingPage.tsx
│   └── LegalDocumentPage.tsx
│
├── services/
│   └── contact-service.ts      # POST do lead
│
└── assets/                     # PNG originais (source of truth)
    ├── *.webp                  # Gerados via `npm run convert-images`
    └── sistema/                # Screenshots do produto
```

## Roteamento

Roteamento manual em [App.tsx](src/App.tsx) baseado em `window.location.pathname` + listener `popstate` (suporta back/forward do navegador).

| Path | Página |
|------|--------|
| `/` | Landing |
| `/sobre` | Quem somos |
| `/politica-de-privacidade` | Política LGPD |
| `/termos-de-uso` | Termos |
| `/lgpd` | Programa LGPD |

Em produção, o [vercel.json](vercel.json) reescreve qualquer path desconhecido para `/index.html` (suporte a deep-links após reload).

## Variáveis de ambiente

```bash
# Endpoint que recebe o POST do formulário de contato.
# Em dev, sem essa variável, o payload é logado no console.
# Em produção sem ela, o submit lança erro amigável.
VITE_CONTACT_ENDPOINT="https://seu-endpoint-de-leads"
```

## Pipeline de assets

Todos os PNGs grandes são convertidos para **WebP** via `npm run convert-images` (sharp, quality=82, effort=6). Reduz `hero.png` de 1.83 MB → 132 KB (-93%) sem perda visual perceptível.

Os imports do código apontam diretamente para `.webp`. Os PNGs originais permanecem em `/src/assets/` como source-of-truth — se quiser regerar com qualidade diferente, ajuste `WEBP_QUALITY` em [scripts/convert-images.mjs](scripts/convert-images.mjs).

### OG image

A imagem de preview para LinkedIn/WhatsApp ([public/og-image.jpg](public/og-image.jpg)) é gerada programaticamente em [scripts/generate-og-image.mjs](scripts/generate-og-image.mjs) — basta editar o SVG embarcado e rodar `npm run generate-og`.

### Favicons

Quatro tamanhos (32, 180, 192, 512) são gerados a partir de `src/assets/nativia-icon.png` por [scripts/generate-favicon.mjs](scripts/generate-favicon.mjs). Browsers escolhem o melhor candidato automaticamente.

## Segurança

- **CSP** em duas camadas:
  - `<meta http-equiv="Content-Security-Policy">` em [index.html](index.html) (defesa em profundidade).
  - HTTP headers completos (incluindo `frame-ancestors`, que `<meta>` ignora) em [vercel.json](vercel.json).
- **Headers adicionais (vercel.json):** HSTS (`max-age=2y; includeSubDomains; preload`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` desabilitando câmera/microfone/geolocation/FLoC.
- **Validação de formulário** com Zod ([src/lib/contact-schema.ts](src/lib/contact-schema.ts)) — agrupa erros por campo e renderiza inline.
- Nenhum secret no client; endpoints externos passam pelo proxy `VITE_CONTACT_ENDPOINT`.

## SEO

- `<title>`, `<meta name="description">`, canonical, Open Graph completo, Twitter Card e `<meta name="robots" content="index, follow, max-image-preview:large">` em [index.html](index.html).
- **JSON-LD** `SoftwareApplication` enriquecido com `featureList`, `inLanguage`, `screenshot`, `publisher.Organization` aninhada.
- [public/robots.txt](public/robots.txt) e [public/sitemap.xml](public/sitemap.xml) com as 5 URLs públicas.
- Heading hierarchy estrita: um `<h1>` por página, `<h2>` por seção.
- Alt text descritivo em todas as imagens.

## Performance

- Bundle JS ~326 KB (~99 KB gzip) — sem dependências de UI pesadas.
- Imagens em WebP (~85% menores que os PNGs originais).
- Preconnect + preload para Google Fonts (Inter + Plus Jakarta Sans).
- `loading="lazy"` em imagens fora do hero; `loading="eager"` no hero.
- Cache-Control imutável (`max-age=1y`) para `/assets/*` (todos com hash).
- Animações respeitam `prefers-reduced-motion`.

## Acessibilidade

- Foco visível com `focus-visible:outline` em todos os interativos.
- `aria-label`, `aria-current`, `aria-expanded`, `aria-controls`, `aria-describedby`, `aria-live` aplicados conforme o caso.
- Modal de zoom do bento grid: `role="dialog"`, `aria-modal="true"`, foco gerenciado, Esc fecha, scroll do body trava.
- Drawer mobile: `aria-expanded`/`aria-controls` no toggle, foco trapped.
- `prefers-reduced-motion: reduce` desliga keyframes infinitas e transições longas (WCAG 2.3.3).

## Deploy

Pré-configurado para **Vercel** via [vercel.json](vercel.json) (headers, cache, rewrites de SPA). Para outros hosts:

- Aplicar os headers do `vercel.json` (CSP, HSTS, etc) na configuração do servidor.
- Garantir que paths não-asset reescrevam para `/index.html`.
- Servir o conteúdo de `dist/` como estático.

## Troubleshooting (Windows)

Se aparecer `Cannot find native binding` (rolldown), execute uma reinstalação limpa:

```powershell
Get-Process node,npm -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json
npm cache clean --force
npm install --include=optional
npm run dev
```

Se `Remove-Item` falhar com `EACCES`, reinicie o Windows e tente novamente no PowerShell.

Se a porta `5174` estiver ocupada por outra instância do Vite:

```powershell
# Descobre o PID que segura a porta
Get-NetTCPConnection -LocalPort 5174 | Select-Object OwningProcess

# Encerra o processo (ajustar PID conforme retornado acima)
Stop-Process -Id <PID> -Force
```
