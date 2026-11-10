# Pulido de movimiento · 4 noviembre 2026

Aplicación de `emil-design-eng` y las recetas de `animate` sobre la versión 3. La estructura, los textos, los datos ilustrativos y el bloque de precios se conservan. No se incorpora un loader ni una dependencia nueva.

## Decisiones

| Antes | Ahora | Propósito |
| --- | --- | --- |
| Llegada de la portada sin una entrada coordinada | `@starting-style`: titular 650 ms, soporte 500 ms, desfases de 80/140 ms | Presentar la portada sin ocultarla tras una carga ni esperar JavaScript |
| Grupos de contenido estáticos | Entradas únicas de 450–650 ms, desplazamientos de 10–18 px, desfase de 60 ms dentro del grupo | Marcar el ritmo de la lectura al llegar a cada sección |
| Menú instantáneo | 220 ms al entrar, 150 ms al salir, origen junto al control | Conservar el vínculo espacial con el botón y permitir invertir la acción |
| Acordeones instantáneos | 240 ms para abrir, 180 ms para cerrar, altura medida y contenido con entrada de 200 ms | Evitar saltos durante la lectura; conservar `details` y `summary` nativos |
| Equipo animado mediante flex/altura durante 550–650 ms | Máscaras y traslación de 280 ms, retratos con tamaño constante y sin deformación | Mostrar la expansión sin recalcular el diseño durante toda la transición |
| Sustitución inmediata de la foto del goniómetro | Fondo anterior conservado, nueva imagen decodificada antes de fundir durante 240 ms | Evitar flashes o imágenes vacías al cambiar de etapa |
| Reseña con una animación que podía acumularse | Transición cancelable de 220 ms, texto/autor/enlace coordinados con desfases de 25 ms | Mantener la respuesta al pulsar varias veces |
| Indicador de dolor actualizando posición y ancho | Traslación del marcador y escala de la pista; continúa desde su posición actual si se interrumpe | Reducir el trabajo de diseño y evitar reinicios durante una transición |

Las curvas reutilizan `--ease-out` y el nuevo token `--ease-drawer`. La portada conserva su gesto de Fulcrum, con un seguimiento de scroll de 0,28 s. La entrada de la primera fotografía y el crecimiento de la cuarta usan un comienzo y un cierre suaves; se preservan el segundo de pausa, el énfasis progresivo y el orden de las cuatro imágenes.

Las entradas se ejecutan una sola vez y no bloquean interacción. Los contenidos parten visibles en el HTML; si JavaScript no está disponible, la página conserva su composición estática. No se añaden animaciones repetitivas ni efectos de seguimiento del cursor.

## Interrupción y accesibilidad

- Las acciones por teclado omiten animación en menú, acordeones, paneles, reseñas y escala. Al comenzar a usar el teclado se completan las entradas pendientes.
- El estado de los controles cambia de inmediato. Los paneles conservan botones nativos, estado expandido y foco visible dentro de su máscara.
- El menú se vuelve inerte durante la salida y puede reabrirse antes de terminar. Escape y navegación cierran de inmediato.
- Un acordeón puede invertir su dirección desde la altura que tenga en pantalla; al terminar se retiran las medidas temporales.
- El hover solo se activa con ratón y dispositivo de puntero preciso; los paneles usan una intención breve de 60 ms para evitar cambios accidentales al cruzarlos.
- Con movimiento reducido no se ejecutan entradas, desplazamientos de controles ni escenas fijadas. El cambio de preferencia durante la sesión completa las transiciones pendientes.
- Las transiciones de pulsación duran 140 ms y usan escala 0,97. Nunca se usa escala cero.

La altura de los acordeones es la única animación nueva de reflujo: es necesaria para desplazar el contenido que sigue, y está limitada a 180–240 ms. Las aperturas de los retratos usan `clip-path`, traslación y opacidad; sus fotografías conservan una proporción constante.

## Archivos y verificación

`src/polish.js` contiene las entradas, controles e interrupciones. `src/polish.css` extiende los tokens y define las máscaras y estados de interacción. `src/motion.js` mantiene las escenas narrativas y el indicador. `src/main.js` conecta los cambios de contenido.

`scripts/qa-emil.cjs` comprueba cambios rápidos de dirección, tres paneles con ratón y teclado, ausencia de alturas residuales, interrupciones de reseñas, galería final a pantalla completa, cuatro anchos, menú móvil, movimiento reducido en vivo y funcionamiento sin JavaScript. Las capturas y resultados se guardan en `qa-emil/`; la comprobación general está en `qa-emil-regression/`.

La disminución de dolor sigue siendo una demostración identificada como ilustrativa. Los retratos siguen identificados como imágenes ilustrativas.
