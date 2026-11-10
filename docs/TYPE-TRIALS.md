# Pruebas tipográficas · 4 noviembre 2026

**Elección confirmada por el usuario: opción 3 / C, Lora + Manrope.** Es la combinación predeterminada, también sin JavaScript. Se retiró el comparador y los parámetros antiguos ya no cambian las fuentes. La configuración vigente está en `src/styles.css` y `src/typography.css`; el código de pruebas se conserva en `type-trials/archive/`. Lo que sigue documenta la exploración previa.

El usuario pidió probar otras fuentes. La combinación Newsreader / Cabinet Grotesk queda disponible como referencia; aún no hay una alternativa elegida como definitiva. Las opciones solo se aplican mediante el parámetro `fuentes`.

| Opción | Titulares | Lectura / controles | Intención |
| --- | --- | --- | --- |
| `clara` | Instrument Sans | Instrument Sans | Directa y sobria; una sola familia con pesos distintos |
| `caracter` | Bricolage Grotesque | DM Sans | Mayor personalidad en los titulares y lectura neutra |
| `calida` | Lora | Manrope | Voz editorial más cálida, acompañada de una sans legible |
| `actual` | Newsreader | Cabinet Grotesk | Referencia de la versión anterior |

La recomendación inicial es `clara`: su silueta más directa distingue esta propuesta del lenguaje editorial anterior sin cargar la lectura. Es una valoración visual de estas composiciones, no una afirmación del proveedor.

## Roles y ajuste

Se mantienen hero de dos líneas, títulos de sección, titulares funcionales del proceso, cita, cuerpo, rótulos y cifras. La lectura conserva sus medidas de 47ch en servicios, 46ch en los pasos y hasta 65ch en párrafos generales. Los pesos de controles y texto siguen diferenciados; no se modifica la jerarquía ni se agregan roles.

Las familias no son una restricción de marca confirmada: el usuario rechazó explícitamente la combinación vigente. El logo conserva su imagen original. Se ajustan tamaño, interlínea y espaciado por combinación; la opción con serif no hereda las mismas medidas del titular sans. Los titulares funcionales y las reseñas de `calida` usan Manrope para preservar el contraste entre secciones.

Se revisan las tildes, ñ, signos de apertura y cifras en las fuentes Latin. No se usan pesos sintéticos. En móvil se calibra el hero para conservar dos líneas y el cierre para evitar texto recortado. Las fotografías, colores, secuencia de scroll, loader desactivado y precio se mantienen.

## Uso

- `http://127.0.0.1:4180/?fuentes=clara`
- `http://127.0.0.1:4180/?fuentes=caracter`
- `http://127.0.0.1:4180/?fuentes=calida`
- `http://127.0.0.1:4180/?fuentes=actual`

El comparador permite cambiar sin recargar y conserva el progreso dentro de las escenas fijadas. Incluye el botón «Actual». La cruz oculta el panel y deja un botón para volver a abrirlo. El estado queda en la URL, sin cambiar la elección tipográfica de otras pestañas ni usar almacenamiento persistente.

La página normal, sin el parámetro, conserva la tipografía anterior y no muestra controles de comparación. `src/type-preview.js` resuelve la selección antes del primer renderizado y precarga únicamente los archivos principales de esa selección; `src/type-preview.css` declara las fuentes y los ajustes de cada opción. Al cambiar se vuelven a medir las escenas y los pies de los retratos.

## Procedencia

Los WOFF2 Latin y las licencias OFL se guardan en `public/fonts/`. Las fuentes se sirven localmente; la página no consulta servicios externos para mostrar texto. Los CSS originales de distribución también se conservan. DM Sans ya estaba incluido en el proyecto.

- Instrument Sans: https://github.com/google/fonts/tree/main/ofl/instrumentsans
- Bricolage Grotesque: https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque
- Lora: https://github.com/google/fonts/tree/main/ofl/lora
- Manrope: https://github.com/google/fonts/tree/main/ofl/manrope

## Verificación

`scripts/qa-type-trials.cjs` compara las cuatro combinaciones a 1440, 768, 390 y 320px, revisa familias calculadas, altura del hero, desbordes y recursos. Prueba los cambios consecutivos manteniendo el progreso de «El primer paso», el cierre y reapertura del panel y la ausencia de controles de prueba en la página normal.

Chrome confirmó las fuentes reales del hero con `CSS.getPlatformFontsForNode`: Instrument Sans, Bricolage Grotesque y Lora, todas fuentes web; no se mostraba Arial como sustituto. Las capturas están en `type-trials/`. Los escaneos tipográficos de Impeccable se guardan como `before-detector.json` y `after-detector.json`.

El escaneo inicial no encontró avisos. El final señala Instrument Sans como fuente frecuente: se conserva como alternativa neutra de comparación, sin presentarla como una identidad distintiva. B y C ofrecen voces diferentes y ninguna opción se establece todavía como definitiva. La revisión visual corrigió, además, el espaciado demasiado cerrado de los nuevos titulares y unos pocos píxeles recortados en el cierre móvil.
