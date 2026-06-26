/**
 * Script one-off de conversão PNG → WebP para os assets da landing.
 *
 * Por que WebP em vez de PNG:
 *  - Compressão lossy do WebP é ~70-90% menor que PNG sem perda visual
 *    perceptível para screenshots e fotos.
 *  - Suporte universal em browsers modernos (>95% global, 2026).
 *
 * Como rodar:
 *   npm run convert-images
 * (ou diretamente: `node scripts/convert-images.mjs`)
 *
 * O script:
 *  1. Procura todos os PNGs em src/assets/ e src/assets/sistema/.
 *  2. Gera um .webp ao lado de cada PNG (mantendo PNG original).
 *  3. Reporta tamanho antes/depois para cada arquivo.
 *
 * Mantemos os PNGs originais como source-of-truth. Os imports do código
 * apontam diretamente para o .webp gerado.
 */
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const ASSET_DIRS = ["src/assets", "src/assets/sistema"];

// Pasta de saída por arquivo de entrada. Por padrão grava ao lado do PNG.
// `quality` controla agressividade da compressão lossy (1-100). 82 é o
// sweet spot entre qualidade e tamanho para screenshots de UI.
const WEBP_QUALITY = 82;

async function isFile(path) {
  try {
    const info = await stat(path);
    return info.isFile();
  } catch {
    return false;
  }
}

async function findPngs(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`[skip] diretório não encontrado: ${dir}`);
      return [];
    }
    throw error;
  }

  const results = [];
  for (const entry of entries) {
    if (entry.isFile() && extname(entry.name).toLowerCase() === ".png") {
      results.push(join(dir, entry.name));
    }
  }
  return results;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function convert(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, ".webp");

  const inputStat = await stat(pngPath);

  // `effort: 6` é o máximo do encoder libwebp — mais lento, melhor compressão.
  await sharp(pngPath)
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(webpPath);

  const outputStat = await stat(webpPath);

  const reduction = (
    100 *
    (1 - outputStat.size / inputStat.size)
  ).toFixed(1);

  console.log(
    `  ✓ ${basename(pngPath).padEnd(28)} ` +
      `${formatBytes(inputStat.size).padStart(10)} → ` +
      `${formatBytes(outputStat.size).padStart(10)}  ` +
      `(-${reduction}%)`,
  );
}

async function main() {
  console.log(`Convertendo PNG → WebP (quality=${WEBP_QUALITY})\n`);

  for (const dir of ASSET_DIRS) {
    const pngs = await findPngs(dir);
    if (pngs.length === 0) continue;

    console.log(`[${dir}]`);
    for (const png of pngs) {
      if (!(await isFile(png))) continue;
      await convert(png);
    }
    console.log("");
  }

  console.log("Concluído.");
}

main().catch((error) => {
  console.error("Erro durante a conversão:", error);
  process.exit(1);
});
