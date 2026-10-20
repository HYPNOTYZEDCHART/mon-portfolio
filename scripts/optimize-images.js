import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const folders = [
  './assets/img/portfolio',
  './assets/img/person',
  './assets/img/profile',
  './assets/img/services'
];

for (const dir of folders) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, base + '.webp');
      
      const inputSize = fs.statSync(inputPath).size;
      await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);
      const outputSize = fs.statSync(outputPath).size;
      console.log(`[Optimized] ${dir}/${file} (${Math.round(inputSize / 1024)}KB) -> ${base}.webp (${Math.round(outputSize / 1024)}KB)`);
    }
  }
}
console.log('Image optimization complete.');
