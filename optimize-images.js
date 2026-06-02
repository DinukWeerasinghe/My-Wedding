import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = './public/images';

async function main() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG images to convert...`);

  let totalSizeBefore = 0;
  let totalSizeAfter = 0;

  for (const file of pngFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputName = file.substring(0, file.lastIndexOf('.')) + '.webp';
    const outputPath = path.join(imagesDir, outputName);

    const stats = fs.statSync(inputPath);
    const sizeBefore = stats.size;
    totalSizeBefore += sizeBefore;

    console.log(`Converting ${file} (${(sizeBefore / (1024 * 1024)).toFixed(2)} MB)...`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const statsAfter = fs.statSync(outputPath);
      const sizeAfter = statsAfter.size;
      totalSizeAfter += sizeAfter;

      console.log(`Saved ${outputName} (${(sizeAfter / (1024)).toFixed(2)} KB) - Reduced by ${((1 - sizeAfter / sizeBefore) * 100).toFixed(1)}%`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }

  console.log('--------------------------------------------------');
  console.log(`Total Size Before: ${(totalSizeBefore / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Size After: ${(totalSizeAfter / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Reduction: ${((1 - totalSizeAfter / totalSizeBefore) * 100).toFixed(1)}%`);
}

main().catch(console.error);
