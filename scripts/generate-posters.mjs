import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = resolve(__dirname, '..', 'public');
const postersDir = resolve(publicDir, 'posters');

// Create posters directory if it doesn't exist
if (!existsSync(postersDir)) {
  mkdirSync(postersDir, { recursive: true });
}

const videos = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

for (const video of videos) {
  const inputPath = resolve(publicDir, `${video}.mp4`);
  const outputPath = resolve(postersDir, `${video}-poster.webp`);

  if (!existsSync(inputPath)) {
    console.warn(`⚠ Video not found: ${inputPath}, skipping.`);
    continue;
  }

  try {
    // Extract first frame as WebP at quality 80
    execSync(
      `ffmpeg -y -i "${inputPath}" -vframes 1 -q:v 80 "${outputPath}"`,
      { stdio: 'pipe' }
    );
    console.log(`✓ Generated poster: posters/${video}-poster.webp`);
  } catch (err) {
    console.error(`✗ Failed to generate poster for ${video}.mp4:`, err.message);
  }
}

console.log('\nDone! Poster images are in public/posters/');
