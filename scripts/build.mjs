import { cpSync, mkdirSync } from 'node:fs';
import {bundleBrowser} from './browser-bundle.mjs';
bundleBrowser('src/redesign-timeline-entry.js', 'src/redesign-timeline.js');
mkdirSync('dist', { recursive: true });
for (const file of ['index.html', 'servicios', 'convenios', 'equipo', 'contacto', 'blog', 'robots.txt', 'sitemap.xml', 'src', 'public']) cpSync(file, `dist/${file}`, { recursive: true });
console.log('Homepage listo en dist/. Vista previa: node scripts/serve.mjs dist');
