# Kineplanet

Sitio de kinesiología a domicilio. La única portada activa es index.html.

## Vista previa

Con Node.js 22 o posterior:

    node scripts/serve.mjs

El servidor abre en http://localhost:4173 por defecto. También puedes abrir index.html directamente junto a sus carpetas src y public.

## Compilación

    node scripts/build.mjs
    node scripts/serve.mjs dist

Publica el contenido de dist en un hosting estático.

## Edición

El contenido de la portada se edita en index.html. Los estilos y la interacción están en src/redesign.css y src/redesign.js. Las imágenes y fuentes están en public. La línea de tiempo se compila desde src/redesign-timeline-entry.js.
