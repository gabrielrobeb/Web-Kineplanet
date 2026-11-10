# Kineplanet — Homepage

Homepage completo de kinesiología a domicilio en Santiago, construido en HTML, CSS y JavaScript. GSAP y ScrollTrigger 3.13.0 se sirven localmente para dos gestos de scroll. No hay formularios obligatorios ni páginas secundarias vacías.

## Abrir el proyecto

Para verla, abre `index.html` con doble clic. También funciona `dist/index.html`. Mantén el HTML junto a sus carpetas `src` y `public`; no copies el HTML por separado.

Para editar, regenerar y usar la vista previa por servidor se necesita Node.js 22 o posterior.

```sh
node scripts/serve.mjs
```

Abrir http://localhost:4173. Para crear y revisar la versión de producción:

```sh
node scripts/build.mjs
node scripts/serve.mjs dist
```

El servidor se limita a la interfaz local. Publicar el contenido de `dist/` en cualquier hosting estático. Las rutas relativas y el script clásico generado permiten abrir la página con `file://`, servirla por HTTP o alojarla en una subcarpeta.

Los módulos editables permanecen en `src/`. Después de modificar JavaScript, ejecuta `node scripts/build.mjs`: regenera `src/site.js` y actualiza `dist/`. No edites `site.js` directamente.

## Orden de la página

Hero → Equipo → Credenciales → Testimonios → Carrusel horizontal → Servicios → Proceso → Precios → Preguntas frecuentes → Blog → Newsletter.

Credenciales sigue el formato de Stats 8, adaptado a «Desde 2012» y «+40.000 atenciones». Ver `docs/STATS-8-2026-11-06.md`.

El carrusel horizontal es una sección propia después de Testimonios y conserva sus cuatro imágenes. Servicios contiene las tres especialidades; se retiraron «También estamos para acompañarte» y «En tu casa. Con todo coordinado». «Para seguir con lo tuyo» también sale de la secuencia. El proceso usa una línea de tiempo con cuatro tarjetas, adaptada con código propio al patrón público de How It Works 6; ver `docs/PROCESS-TIMELINE-2026-11-06.md`. Inmediatamente después aparece «Agenda tu evaluación», adaptación de Pricing 11 con fotografía de atención domiciliaria; ver `docs/EVALUATION-11-2026-11-06.md`. Blog contiene tres guías dentro de la página. Newsletter reserva su espacio como «Próximamente», sin recibir correos ni simular suscripciones. El orden actual está en `docs/STRUCTURE-2026-11-06.md`.

## Editar contenido

- **WhatsApp:** modificar `contact.whatsapp` y `contact.message` en `src/content.js`. El número se escribe con código de país, sin espacios ni `+`. El build actualiza también los enlaces estáticos, disponibles sin JavaScript.
- **Servicios, FAQ, etapas, reseñas y precio:** editar los arrays y variables de `src/content.js`, luego ejecutar `node scripts/build.mjs`.
- **Titulares, textos introductorios, navegación y cierre:** editar `index.html`. Los bloques entre comentarios `render:…` se regeneran desde `src/content.js`; no editarlos directamente.
- **Fotografías:** sustituir los WebP de `public/images/` conservando sus nombres. También se pueden cambiar sus rutas en `media` de `src/content.js` y ejecutar el build. Mantener textos alternativos fieles a las nuevas imágenes.
- **Logo:** se usa el PNG auténtico descargado del sitio actual, sin reconstrucción vectorial. Reemplazarlo por el SVG original cuando esté disponible; actualizar `media.logo` y el tipo de archivo en el servidor si fuese necesario.
- **Video del hero:** configurar `media.heroVideo` con un MP4 o WebM real. La foto es el poster y la alternativa ante movimiento reducido o fallo de reproducción. No hay reproducción con audio.
- **Páginas futuras:** los servicios tienen `href: null`. Cuando exista una página publicada, asignar su URL; hasta entonces los enlaces abren una consulta real por WhatsApp. La navegación de empresa, equipo, convenios y contacto lleva a secciones existentes.

## Antes de publicar

1. Confirmar número de prueba, valor de $30.000 CLP y condiciones de coordinación.
2. Confirmar duración, medios de pago y requisitos de orden médica.
3. Sustituir las fotografías generadas por material autorizado y los retratos de muestra por perfiles reales. Hoy se identifican como ilustrativos; no hay nombres ni credenciales inventados.
4. Confirmar convenios y descuentos antes de publicar marcas o porcentajes. Hoy solo se invita a consultar por beneficios.
5. La cifra de más de 40.000 atenciones, suministrada por el cliente, se muestra en Credenciales; confirmar su vigencia antes de publicar.
6. Configurar dominio definitivo, URL canónica y URL absoluta de `og:image` según el hosting. El documento incluye título y descripción locales, sin atribuirse el dominio productivo.

## Interacciones y accesibilidad

- Acordeones semánticos con `details` y `summary`; funcionan sin JavaScript.
- WhatsApp directo, con consulta contextual según especialidad.
- Menú móvil con Escape y devolución del foco.
- Reseñas manuales, sin rotación automática, con anuncios de cambio accesibles.
- Paneles del equipo por clic, teclado y hover de mouse.
- Scroll nativo: proceso con línea de tiempo y cuatro tarjetas alternadas, seguido de una galería horizontal cuya última foto llena la pantalla. No se captura la rueda.
- En móvil, las escenas se convierten en una composición vertical de lectura normal.
- `prefers-reduced-motion` elimina las escenas fijadas, el desplazamiento y la introducción.
- Las apariciones se ejecutan cuando el elemento ya entra en pantalla; ningún contenido espera oculto a que se active una animación.
- Manrope, fotografías y GSAP servidos localmente. Toda la página usa la misma familia tipográfica del hero. No se cargan analítica, trackers ni bibliotecas desde CDN. Las licencias de las fuentes se incluyen en `public/fonts/`.

Los criterios visuales y fuentes de contenido están en `docs/DESIGN.md` y `docs/SOURCES.md`. Las pruebas y capturas se guardan en `docs/qa/`.

## QA opcional

`scripts/qa.cjs` usa Playwright y sharp únicamente como herramientas de desarrollo. Con esos paquetes instalados, iniciar el servidor de producción y ejecutar:

```sh
node scripts/qa.cjs
```

La URL por defecto para QA es `http://127.0.0.1:4180`; se puede cambiar mediante `QA_URL`. El build y la web no necesitan esos paquetes.

`node scripts/qa-local.cjs` comprueba también los dos HTML abiertos directamente desde la carpeta, además de la vista HTTP. Los resultados se guardan en `docs/qa-local/`.
