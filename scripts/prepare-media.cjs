// Utilidad de desarrollo: requiere sharp. No se usa en la web ni en el build.
const sharp = require('sharp');
const path = require('node:path');
const source = process.argv[2];
if (!source) throw new Error('Uso: node scripts/prepare-media.cjs <carpeta-de-originales>');
const files = {
 'exec-3e6599e7-9d7b-4e5b-8c1a-de82bac1d12d.png': 'cuidado-en-casa',
 'exec-1e5d8887-9ae6-4a3f-8533-f115dd14ee16.png': 'respiratoria-en-casa',
 'exec-2d741d0e-2e46-48ff-bc10-2974b1e8f323.png': 'vida-cotidiana',
 'exec-b2a58982-4d7a-436b-9ad8-49b7bad6827f.png': 'equipo-ilustrativo',
};
Promise.all(Object.entries(files).map(async ([file, name]) => {
 const result = await sharp(path.join(source, file)).webp({ quality: 84, effort: 6 }).toFile(`public/images/${name}.webp`);
 console.log(`${name}: ${Math.round(result.size / 1024)} KB`);
})).catch(error => { console.error(error); process.exitCode = 1; });
