# Orden vigente del homepage · 6 noviembre 2026

La revisión v14 aplica esta secuencia en el DOM y en la lectura:

1. Hero
2. Equipo
3. Credenciales
4. Testimonios
5. Carrusel horizontal
6. Servicios
7. Proceso
8. Precios
9. Preguntas frecuentes
10. Blog
11. Newsletter

## Bloques retirados

Por indicación del usuario se eliminan «También estamos para acompañarte» y «En tu casa. Con todo coordinado», junto con sus acordeones y beneficios. El intermedio «Para seguir con lo tuyo» también sale de la secuencia para mantener el recorrido indicado. El HTML anterior queda conservado en `before-order-v14/index.html`.

## Contenido conservado

- Hero, Equipo, Credenciales, Testimonios, Proceso, Preguntas frecuentes, Blog y Newsletter conservan íntegro su marcado.
- Credenciales mantiene «Desde 2012» y «+40.000 atenciones», con el formato adaptado de Stats 8.
- El carrusel pasa a ser una sección principal, `#vida-en-casa`, inmediatamente después de Testimonios. Conserva la frase, el énfasis después de la pausa, las cuatro imágenes y el acercamiento final. La animación sigue midiendo su posición real al cambiar la distribución.
- Servicios reúne las tres especialidades: respiratoria, traumatológica y neurológica. Se mantienen el acordeón, los diagramas y las consultas contextuales por WhatsApp.
- Proceso conserva la línea de tiempo de cuatro pasos.
- Precios conserva «Agenda tu evaluación», la fotografía integrada, el valor referencial y el botón de WhatsApp. Queda seguido directamente por Preguntas frecuentes.
- Blog conserva sus tres guías. Newsletter sigue como espacio reservado, sin recibir correos ni simular suscripciones.

La navegación conserva sus destinos existentes. No se añaden etiquetas pequeñas ni aclaraciones decorativas.

## Verificación

`scripts/qa-order-v14.cjs` comprueba el orden, los bloques ausentes, la conservación de las ocho secciones intactas y de Especialidades/Evaluación, las anclas, el carrusel horizontal y su ampliación final, el avance del proceso, servicios y reseñas, cinco anchos, movimiento reducido, lectura sin JavaScript y apertura local/HTTP. Capturas y resultados en `qa-order-v14/`.
