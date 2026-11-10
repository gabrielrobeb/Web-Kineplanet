# Proceso: línea de tiempo

Adaptación propia de la vista pública de [How It Works 6 de React Bits Pro](https://pro.reactbits.dev/docs/blocks/how-it-works/how-it-works-6), por indicación del usuario. No se instaló el bloque Pro ni se utilizó su código privado. La implementación conserva el proyecto estático, su apertura desde carpeta y sus fuentes y colores actuales.

Cuatro tarjetas alternadas a izquierda y derecha sobre una línea central discontinua. Al avanzar el scroll, la línea se completa en azul y el nodo de la etapa activa emite un pulso suave. Su fotografía acompaña con un acercamiento leve; el texto permanece estable. La entrada de cada tarjeta responde directamente al scroll y se revierte al subir.

Los pasos conservan el contenido de Kineplanet: Te escuchamos; Lo coordinamos contigo; Nos conocemos en casa; Trazamos tu plan. Las fotografías existentes son ilustrativas. En móvil las tarjetas ocupan el ancho disponible y cubren la línea, visible entre etapas, siguiendo la composición de la referencia.

La sección usa flujo normal, sin fijar el scroll. El resto de las nueve secciones principales permanece idéntico. La galería que cierra Proceso también se conserva.

`src/process-timeline.js` mide las etapas al cargar, cambiar el ancho o finalizar la carga de fuentes. El scroll actualiza transformaciones mediante requestAnimationFrame. Los pulsos CSS solo se ejecutan para una etapa activa visible y se pausan al ocultar la pestaña. Movimiento reducido elimina desplazamientos y pulsos, completa la línea y mantiene la lectura. El contenido sigue disponible sin JavaScript.

Verificación con `scripts/qa-process-timeline.cjs`: cuatro etapas, progreso y retroceso, fotografías cargadas, apertura local y HTTP, anchos 1440/1024/768/390/320, apilado móvil, ausencia de desbordamiento, movimiento reducido, lectura sin JavaScript y comparación de las otras nueve secciones. Capturas y resultados en `docs/qa-process-timeline/`.
