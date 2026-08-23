import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, '.logo-assets');

async function trimAndSave(svgPath, outPath, width) {
  const buf = await sharp(svgPath, { density: 600 }).resize({ width }).png().toBuffer();
  await sharp(buf).trim().toFile(outPath);
}

await trimAndSave(path.join(root, 'public/brand/logo-mono-black.svg'), path.join(outDir, 'logo-header.png'), 1200);
await trimAndSave(path.join(root, 'public/brand/logo-stacked.svg'), path.join(outDir, 'logo-cover.png'), 900);
console.log('Logo assets written to', outDir);
