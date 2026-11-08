// Turns the high-resolution scans in originals/ into the watermarked,
// size-capped images that are published in public/artworks/.
import { existsSync } from 'node:fs';
import { mkdir, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const originalsDir = path.join(root, 'originals');
const outputDir = path.join(root, 'public/artworks');
const tempDir = path.join(root, 'public/.artworks-tmp');
const manifestPath = path.join(root, 'src/config/artwork-images.json');
const logoPath = path.join(root, 'public/images/waterlili-creation-logo.png');

const variants = {
  card: { longEdge: 700, quality: 72 },
  large: { longEdge: 1400, quality: 78 },
};
const watermark = { widthRatio: 0.24, minWidth: 96, opacity: 0.4, marginRatio: 0.02 };
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp']);

const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true });

async function listArtworkFolders() {
  if (!existsSync(originalsDir)) return [];
  const entries = await readdir(originalsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(byName);
}

async function listImages(slug) {
  const files = await readdir(path.join(originalsDir, slug));
  return files
    .filter((file) => supportedExtensions.has(path.extname(file).toLowerCase()))
    .sort(byName);
}

async function buildWatermark(imageWidth) {
  const width = Math.min(
    imageWidth,
    Math.max(watermark.minWidth, Math.round(imageWidth * watermark.widthRatio)),
  );
  const { data, info } = await sharp(logoPath)
    .resize({ width })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let alpha = 3; alpha < data.length; alpha += 4) {
    data[alpha] = Math.round(data[alpha] * watermark.opacity);
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
}

async function buildVariant(sourcePath, outputPath, { longEdge, quality }) {
  // Metadata (camera, location, colour profile) is dropped because it is not kept explicitly.
  const { data: resized, info } = await sharp(sourcePath)
    .rotate()
    .resize({
      width: longEdge,
      height: longEdge,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toColourspace('srgb')
    .png({ compressionLevel: 1 })
    .toBuffer({ resolveWithObject: true });

  const logo = await buildWatermark(info.width);
  const margin = Math.round(Math.min(info.width, info.height) * watermark.marginRatio);

  await sharp(resized)
    .composite([
      {
        input: logo.data,
        left: info.width - logo.info.width - margin,
        top: info.height - logo.info.height - margin,
      },
    ])
    .webp({ quality })
    .toFile(outputPath);

  return { width: info.width, height: info.height };
}

const slugs = await listArtworkFolders();

// A fresh checkout has no originals: without this, it would erase the published images.
if (slugs.length === 0) {
  console.error('No artwork folders found in originals/. Nothing was changed.');
  process.exit(1);
}

await rm(tempDir, { recursive: true, force: true });

try {
  const manifest = {};

  for (const slug of slugs) {
    const files = await listImages(slug);
    if (files.length === 0) {
      console.warn(`Skipping ${slug}: no images found.`);
      continue;
    }

    await mkdir(path.join(tempDir, slug), { recursive: true });
    manifest[slug] = [];

    for (const [index, file] of files.entries()) {
      const prefix = String(index + 1).padStart(2, '0');
      const sourcePath = path.join(originalsDir, slug, file);
      const image = {};

      for (const [name, options] of Object.entries(variants)) {
        const fileName = `${prefix}-${name}.webp`;
        const size = await buildVariant(
          sourcePath,
          path.join(tempDir, slug, fileName),
          options,
        );
        image[name] = { src: `/artworks/${slug}/${fileName}`, ...size };
      }

      manifest[slug].push(image);
    }

    console.log(`${slug}: ${files.length} image(s)`);
  }

  await rm(outputDir, { recursive: true, force: true });
  await rename(tempDir, outputDir);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
} finally {
  await rm(tempDir, { recursive: true, force: true });
}
