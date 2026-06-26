/**
 * Gera os favicons da NativIA a partir de src/assets/nativia-icon.png.
 *
 * Browsers modernos escolhem o ícone "mais adequado" entre os declarados
 * em <link rel="icon">. Cobrimos os tamanhos canônicos:
 *
 *   - 32×32  PNG  → favicon padrão para abas de browser desktop.
 *   - 192×192 PNG → Android home screen, PWA install prompt.
 *   - 512×512 PNG → splash screens e maskable icons (Android).
 *   - 180×180 PNG → apple-touch-icon (Safari iOS adiciona à tela inicial).
 *
 * O ícone original tem proporção 395×299 — sharp redimensiona com
 * `fit: contain` + fundo transparente para evitar distorção (mantém
 * proporção e centraliza no quadrado).
 *
 * Como rodar:
 *   npm run generate-favicon
 */
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, stat } from "node:fs/promises";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(__dirname, "..", "src", "assets", "nativia-icon.png");
const PUBLIC_DIR = join(__dirname, "..", "public");

// Tamanho → nome de arquivo. Cada entrada vira um `<link>` no index.html.
const VARIANTS = [
  { size: 32, name: "favicon-32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192.png" },
  { size: 512, name: "android-chrome-512.png" },
];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function generate({ size, name }) {
  const outputPath = join(PUBLIC_DIR, name);

  await sharp(SOURCE)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    // PNG quality: 90 é alto suficiente para preservar nitidez do ícone.
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(outputPath);

  const info = await stat(outputPath);
  console.log(`  ✓ ${name.padEnd(28)} ${size}×${size}  ${formatBytes(info.size).padStart(10)}`);
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });

  console.log("Gerando favicons NativIA a partir de nativia-icon.png\n");
  for (const variant of VARIANTS) {
    await generate(variant);
  }
  console.log("\nConcluído.");
}

main().catch((error) => {
  console.error("Erro ao gerar favicons:", error);
  process.exit(1);
});
