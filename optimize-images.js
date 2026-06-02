import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Disable sharp cache to prevent Windows EBUSY file locking errors when unlinking/renaming files
sharp.cache(false);

const imagesDir = './public/images';
const MAX_DIMENSION = 1200; // Max width or height in pixels

async function main() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);
  
  // 1. Process source image files (.png, .jpg, .jpeg)
  const targetExtensions = ['.png', '.jpg', '.jpeg'];
  const sourceFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return targetExtensions.includes(ext);
  });

  if (sourceFiles.length > 0) {
    console.log(`Found ${sourceFiles.length} raw images to convert & resize (${targetExtensions.join(', ')})...`);
    for (const file of sourceFiles) {
      const inputPath = path.join(imagesDir, file);
      const outputName = file.substring(0, file.lastIndexOf('.')) + '.webp';
      const outputPath = path.join(imagesDir, outputName);

      const stats = fs.statSync(inputPath);
      const sizeBefore = stats.size;

      console.log(`Optimizing ${file} (${(sizeBefore / (1024 * 1024)).toFixed(2)} MB)...`);

      try {
        await sharp(inputPath)
          .resize({
            width: MAX_DIMENSION,
            height: MAX_DIMENSION,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 75 })
          .toFile(outputPath);

        const statsAfter = fs.statSync(outputPath);
        console.log(`Saved ${outputName} (${(statsAfter.size / 1024).toFixed(1)} KB) - Reduced by ${((1 - statsAfter.size / sizeBefore) * 100).toFixed(1)}%`);
        
        // Delete original raw source file to save space
        fs.unlinkSync(inputPath);
        console.log(`Deleted original source file: ${file}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }

  // 2. Resize already-converted WebP files that are too large (to fix existing assets)
  // Clean up any stray temp files first
  const cleanFiles = fs.readdirSync(imagesDir);
  cleanFiles.forEach(file => {
    if (file.startsWith('temp_')) {
      try { fs.unlinkSync(path.join(imagesDir, file)); } catch (e) {}
    }
  });

  // Fetch the current set of webp files, ignoring any temp files
  const currentFiles = fs.readdirSync(imagesDir);
  const webpFiles = currentFiles.filter(file => file.toLowerCase().endsWith('.webp') && !file.startsWith('temp_'));
  console.log(`Checking ${webpFiles.length} WebP images for resolution resizing...`);

  for (const file of webpFiles) {
    const filePath = path.join(imagesDir, file);
    try {
      const metadata = await sharp(filePath).metadata();
      
      if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
        console.log(`WebP ${file} is too large (${metadata.width}x${metadata.height}px). Resizing down to ${MAX_DIMENSION}px...`);
        
        const tempPath = path.join(imagesDir, `temp_${file}`);
        
        await sharp(filePath)
          .resize({
            width: MAX_DIMENSION,
            height: MAX_DIMENSION,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 75 })
          .toFile(tempPath);
          
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        
        const statsNew = fs.statSync(filePath);
        console.log(`Resized ${file} successfully. New size: ${(statsNew.size / 1024).toFixed(1)} KB`);
      }
    } catch (err) {
      console.error(`Error resizing WebP ${file}:`, err);
    }
  }

  console.log('All image optimization and cleanup completed successfully!');
}

main().catch(console.error);
