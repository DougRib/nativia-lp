/**
 * Gera /public/og-image.jpg (1200x630) — imagem usada como preview no
 * LinkedIn, WhatsApp, Slack e cards do Twitter quando alguém compartilha
 * o link da landing.
 *
 * Estratégia:
 *  1. Cria um fundo escuro com um gradiente sutil ciano (a paleta do site).
 *  2. Sobrepõe um título grande + tagline curta + URL no rodapé via SVG.
 *  3. Exporta como JPEG quality 85 — formato universalmente aceito por
 *     scrapers de meta tags (algumas plataformas ignoram WebP/AVIF em OG).
 *
 * Como rodar:
 *   npm run generate-og
 */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "..", "public", "og-image.jpg");

const WIDTH = 1200;
const HEIGHT = 630;

// SVG sobreposto: cabeçalho "NativIA", título grande, tagline, e URL no rodapé.
// As fontes usadas (Plus Jakarta Sans / Inter) podem não estar disponíveis no
// renderer do sharp; usamos a família genérica "sans-serif" como fallback
// confiável que produz tipografia limpa em qualquer sistema.
const svgOverlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1a2e" />
      <stop offset="60%" stop-color="#0f1e3a" />
      <stop offset="100%" stop-color="#0d2542" />
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Fundo + glows futuristas -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow2)" />

  <!-- Grid sutil tipo PCB -->
  <g stroke="#22d3ee" stroke-opacity="0.08" stroke-width="1">
    <line x1="0" y1="158" x2="${WIDTH}" y2="158" />
    <line x1="0" y1="316" x2="${WIDTH}" y2="316" />
    <line x1="0" y1="474" x2="${WIDTH}" y2="474" />
    <line x1="300" y1="0" x2="300" y2="${HEIGHT}" />
    <line x1="600" y1="0" x2="600" y2="${HEIGHT}" />
    <line x1="900" y1="0" x2="900" y2="${HEIGHT}" />
  </g>

  <!-- Badge -->
  <rect x="80" y="80" width="320" height="44" rx="22"
        fill="#0a1a2e" stroke="#22d3ee" stroke-opacity="0.5" stroke-width="1.5" />
  <circle cx="100" cy="102" r="4" fill="#22d3ee" />
  <text x="116" y="108" font-family="sans-serif" font-size="16"
        font-weight="600" fill="#cbd5e1" letter-spacing="0.5">
    IA PRIVADA · ON-PREMISE · LGPD
  </text>

  <!-- Título principal -->
  <text x="80" y="240" font-family="sans-serif" font-size="68"
        font-weight="800" fill="#f1f5f9">
    A IA corporativa que
  </text>
  <text x="80" y="320" font-family="sans-serif" font-size="68"
        font-weight="800" fill="#22d3ee">
    nunca expõe seus dados.
  </text>

  <!-- Tagline -->
  <text x="80" y="400" font-family="sans-serif" font-size="28"
        font-weight="400" fill="#94a3b8">
    Análise de documentos com IA privada, on-premise,
  </text>
  <text x="80" y="440" font-family="sans-serif" font-size="28"
        font-weight="400" fill="#94a3b8">
    sem chamadas externas. Conformidade LGPD por design.
  </text>

  <!-- Rodapé com URL -->
  <line x1="80" y1="540" x2="1120" y2="540"
        stroke="#22d3ee" stroke-opacity="0.3" stroke-width="1" />
  <text x="80" y="585" font-family="sans-serif" font-size="22"
        font-weight="700" fill="#22d3ee" letter-spacing="2">
    NATIV/IA
  </text>
  <text x="1120" y="585" font-family="sans-serif" font-size="20"
        font-weight="400" fill="#94a3b8" text-anchor="end">
    nativia-lp.vercel.app
  </text>
</svg>
`;

async function main() {
  await mkdir(dirname(OUTPUT), { recursive: true });

  await sharp(Buffer.from(svgOverlay))
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(OUTPUT);

  console.log(`✓ OG image gerada em ${OUTPUT} (1200x630)`);
}

main().catch((error) => {
  console.error("Erro ao gerar OG image:", error);
  process.exit(1);
});
