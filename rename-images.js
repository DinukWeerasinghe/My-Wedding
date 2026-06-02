import fs from 'fs';
import path from 'path';

const imagesDir = './public/images';

const mappings = {
  'home_photo.c881da68d3cf7b9dab07': 'home_photo',
  'photo1.65cd987bc86654a16c94': 'photo1',
  'photo10.c881da68d3cf7b9dab07': 'photo10',
  'photo11.7892a6d8745a7c02f7d6': 'photo11',
  'photo12.8c94156b0a6c2297a62b': 'photo12',
  'photo2.3d6a2a329b03b079fb95': 'photo2',
  'photo3.090eae98f27e86000181': 'photo3',
  'photo4.79ad4c593c7971828169': 'photo4',
  'photo5.bb2925991ed5b526170e': 'photo5',
  'photo6.a68d48b383b9499d6188': 'photo6',
  'photo7.eaf26b9868f5fa3e5e54': 'photo7',
  'photo8.93dfdec8d7f9131146fd': 'photo8',
  'photo9.19ca8d36b05343bc5902': 'photo9',
  'rsvp.7892a6d8745a7c02f7d6': 'rsvp',
};

function main() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Directory not found: ${imagesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir);

  files.forEach(file => {
    // Find if the file starts with any of our mapping keys
    const matchKey = Object.keys(mappings).find(key => file.startsWith(key));
    
    if (matchKey) {
      const ext = path.extname(file);
      const newName = mappings[matchKey] + ext;
      const oldPath = path.join(imagesDir, file);
      const newPath = path.join(imagesDir, newName);

      console.log(`Renaming: ${file} -> ${newName}`);
      fs.renameSync(oldPath, newPath);
    }
  });

  console.log('Cleanup and renaming completed!');
}

main();
