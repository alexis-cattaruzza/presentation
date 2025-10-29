// src/scripts/optimize-images.mjs
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const PROJECT_ROOT = path.resolve(".");
const INPUT_DIR = path.join(PROJECT_ROOT, "public", "images", "original");   // dossier source
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "images", "optimized"); // dossier cible

const widths = [320, 640, 960, 1280];
const quality = 72; // ajuster 60-80 selon besoin

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function basenameNoExt(filename) {
  return path.parse(filename).name;
}

async function processImage(file) {
  const input = path.join(INPUT_DIR, file);
  const name = basenameNoExt(file);

  for (const w of widths) {
    // webp
    await sharp(input).resize({ width: w }).webp({ quality }).toFile(path.join(OUTPUT_DIR, `${name}-${w}.webp`));
    // avif
    await sharp(input).resize({ width: w }).avif({ quality }).toFile(path.join(OUTPUT_DIR, `${name}-${w}.avif`));
    // jpeg
    await sharp(input).resize({ width: w }).jpeg({ quality }).toFile(path.join(OUTPUT_DIR, `${name}-${w}.jpg`));
  }

  // LQIP placeholder (tiny blurred jpeg)
  await sharp(input).resize(16).blur().jpeg({ quality: 40 }).toFile(path.join(OUTPUT_DIR, `${name}-placeholder.jpg`));
}

async function run() {
  try {
    // ensure dirs
    await ensureDir(INPUT_DIR);
    await ensureDir(OUTPUT_DIR);

    const files = await fs.readdir(INPUT_DIR);
    const images = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

    if (images.length === 0) {
      console.log("Aucune image trouvée dans", INPUT_DIR);
      return;
    }

    console.log(`Found ${images.length} images — processing...`);
    for (const file of images) {
      console.log("Processing", file);
      try {
        await processImage(file);
      } catch (err) {
        console.error("Erreur processing", file, err);
      }
    }
    console.log("Done — optimized images written to", OUTPUT_DIR);
  } catch (err) {
    console.error("Script failed:", err);
    process.exit(1);
  }
}

run();
