# Apertura desde carpeta · 4 noviembre 2026

El usuario detectó que el HTML se veía mal con doble clic. Se reprodujo el problema: las rutas `/src/...` y `/public/...` se resolvían contra `C:\`, y el módulo de entrada no podía ejecutarse desde `file://`.

La página principal y `dist/index.html` usan ahora rutas relativas al documento. Las fuentes CSS son relativas a la hoja de estilos. La precarga de fuentes se aplica solo por HTTP: Chrome rechaza esa precarga CORS desde archivos locales, aunque sí permite cargar las mismas fuentes desde el CSS local.

`scripts/browser-bundle.mjs` genera `src/site.js` como un script clásico encapsulado. Empaqueta los cinco módulos locales de la página mediante fábricas con ámbito independiente y valida la sintaxis antes de escribir. El empaquetador acepta sus importaciones nombradas y exportaciones declarativas; rechaza ciclos, importaciones externas y sintaxis de módulos que no soporta. No introduce una dependencia de compilación.

Se conservan los módulos editables. `node scripts/build.mjs` prerenderiza el contenido, genera `site.js` y actualiza `dist/`. El JavaScript y GSAP se ejecutan en orden con `defer`, tanto por HTTP como al abrir un archivo.

Para abrir con doble clic se mantiene el HTML junto a `src/` y `public/`. Se puede trasladar la carpeta completa. No hace falta iniciar Node para ver la página ya construida.

`scripts/qa-local.cjs` verificó la apertura directa de ambos HTML y la vista por HTTP: Lora y Manrope cargadas, imágenes completas, menú móvil, cambio de reseña, pasos del proceso y ampliación final de la galería. No hubo errores JavaScript ni recursos fallidos. Resultados y capturas en `docs/qa-local/`.
