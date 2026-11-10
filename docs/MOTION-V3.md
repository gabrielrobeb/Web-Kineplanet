# Revisión de composición y movimiento · 4 noviembre 2026

Se aplican los once puntos del usuario sobre la versión de autenticidad. No se usa Sites. Se conservan las fuentes locales, el logo y la paleta azul/verde. Los precios se mantienen sin rediseñar.

## Composición

Orden: hero → trayectoria → beneficios → especialidades → primera atención → servicios complementarios → actividades cotidianas → galería horizontal → equipo → reseñas → cobertura y precios → preguntas → contacto.

La trayectoria incorpora «Desde 2012» y «+40.000 atenciones», datos proporcionados por el cliente. Los cuatro beneficios explican situaciones propias del servicio: evitar traslados, asignación según atención/comuna, evaluación antes del plan y orientación a familiares. Se usa la composición de cuatro paneles de «Measured, not guessed», sin trasladar sus resultados clínicos.

Especialidades conserva ilustraciones anatómicas y acordeones. Se refinan proporciones, estados, encuadres y espaciado. «Para seguir con lo tuyo» relaciona la imagen tipográfica con pasear, compartir y cuidar el jardín.

## Referencias observadas

- Fulcrum: https://fulcrumphysio.framer.website/
- Stridewell: https://gleaming-galaxy-812468.framer.app/

Las capturas de las referencias están en `reference-motion/`. Se inspeccionaron las escenas en distintos desplazamientos, incluyendo goniómetro, beneficios, equipo y reseñas.

## Escenas

- Se retira el loader del HTML y de JavaScript. La página aparece directamente.
- Hero: ventana arqueada central que se abre hasta cubrir la pantalla, con las dos líneas desplazándose en sentidos opuestos. La fotografía final muestra una sesión domiciliaria. GSAP/ScrollTrigger, scrub directo y scroll nativo. Recorrido de 430svh.
- Primera atención: goniómetro semicircular, fotografía circular en el pivote, punta y grados móviles. Cuatro pasos con intervalos iguales y pausas inicial/final, a lo largo de 500svh. El movimiento es reversible.
- Galería: la frase completa aparece sola sobre azul. Después de un segundo se enfatizan las palabras, sucesivamente, mediante superposición de pesos reales sin desplazamiento tipográfico. El primer 20% del recorrido queda reservado a la frase. Luego entran cuatro fotografías desde el centro hacia la derecha. La cuarta lleva el mensaje desde su entrada; el último tramo amplía esa imagen hasta cubrir la pantalla. Recorrido total de 800svh.
- Equipo: tres retratos recortados de la imagen ilustrativa existente, panel activo en color y paneles cerrados en gris con rótulos verticales. Funciona con ratón, clic, foco de teclado y táctil.
- Reseñas: cita en sans de gran tamaño, autor y enlace a la reseña real; demostración numérica 8 → 2 y marcador sobre escala 0–10. Animación de 2,2s al entrar en pantalla o cambiar de reseña.

Los valores de dolor son **ilustrativos**, asumidos para demostrar el diseño. No son resultados reales ni se atribuyen a los autores de reseñas. La aclaración es visible junto al indicador y bajo la escala. Los retratos también están identificados como ilustrativos y no inventan identidades ni credenciales.

En pantallas de hasta 600px las escenas se componen verticalmente. Con movimiento reducido se presentan estáticas, las descripciones de los pasos quedan visibles y la escala muestra el estado final sin animación. El HTML prerenderizado mantiene servicios, FAQ, reseña y WhatsApp sin JavaScript.

## Implementación y revisión

`src/experience.css` contiene las composiciones de esta revisión; `src/motion.js` coordina escenas, medidas y alternativas de movimiento reducido. `src/main.js` conserva las interacciones de navegación y contenido. Imágenes, fuentes y GSAP se sirven localmente.

El detector de Impeccable se ejecutó una vez, con salida en `qa-v3/detector.json`. Se corrigieron los dos contrastes señalados: azul de texto `#216DA3` y valor inicial `#728A94`. Las advertencias de padding corresponden al encuadre fotográfico del hero, líneas de los acordeones y la pista de la escala; el contenido interior tiene separación visible, comprobada en navegador.

Las capturas y los resultados de integración vigentes se guardan en `qa-v3-integrated/`. Se comprueban 1440, 768, 390 y 320px, reversibilidad, cuatro imágenes, pausa antes del énfasis, menú/servicios/FAQ por teclado, paneles, reseñas, WhatsApp, recursos y ausencia de JavaScript.
