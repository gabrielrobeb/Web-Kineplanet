# Refinamiento de autenticidad

El usuario pidió mantener la estructura y confirmó que la principal sensación de IA provenía de la combinación de tipografía, colores y componentes. Se preservaron fotografías, textos factuales, secciones, orden y funciones. No se añadieron métricas, testimonios ni credenciales.

## Decisiones aplicadas

- Newsreader sustituye la serif gruesa anterior. Su peso más ligero y el espaciado menos cerrado dan una voz editorial más humana.
- Cabinet Grotesk diferencia servicios, proceso y controles de los titulares narrativos. La misma serif ya no ocupa cada elemento de la página.
- El azul toma un papel estructural en proceso y precio; el verde se concentra en acciones, estado activo y aguja. El fondo principal pasa a un blanco neutro.
- Navegación blanca continua con el PNG original, sin una placa aislada alrededor del logo.
- Servicios y FAQ usan listas abiertas con reglas funcionales. Los textos conservan el mismo contenido, y el área completa del resumen sigue siendo pulsable.
- Las franjas complementarias y los retratos expandibles se mantienen, con tipografía sans y menos redondeo repetido.
- Se retiró el gran «Confianza» decorativo y se compuso la reseña como una cita editorial con controles discretos.
- Todos los símbolos de controles se convierten a SVG durante el prerender. Flechas y signos de apertura comparten trazo y proporciones.
- GSAP aporta dos gestos de scroll; la mayoría del contenido permanece quieta. Las escenas nativas existentes continúan siendo reversibles y tienen alternativa móvil y de movimiento reducido.

La selección limitada por la estructura, con semilla 78, dio Cabinet Grotesk; hero Cinematic Center; texto con imagen, acordeones y carrusel; escala de imagen y revelado progresivo. Las decisiones abiertas se aplicaron sin introducir otras secciones o cambiar la finalidad del homepage.

## Verificación

Las pruebas de integración existentes comprobaron los seis servicios, seis preguntas, navegación por teclado, menú, reseñas, paneles y todos los accesos a WhatsApp; no hubo errores de JavaScript ni recursos locales fallidos. Se revisaron 1440, 768, 390 y 320 px, sin desbordamiento horizontal. Los resultados y capturas se guardan en `docs/qa/`.

El detector de Impeccable se ejecutó una vez, según su procedimiento. Su salida original está en `authenticity-detector.json`:

- Se corrigió el fondo alternativo de retratos a azul oscuro: el texto blanco conserva contraste si una foto no carga. Las fotos además tienen una capa inferior de contraste.
- Se neutralizó el fondo principal para evitar el tinte crema dominante.
- Las alertas de padding corresponden a contenedores de lista; los resúmenes interiores tienen 24–28 px de espacio real sobre el texto, comprobados visualmente.
- El recorte de fotografía dentro de «Lo cotidiano» viene del brief. No usa un gradiente de texto y tiene alternativa de texto sólido.

Las fotografías y los retratos continúan siendo generados y se identifican como ilustrativos. Ese contenido sigue pendiente de sustitución por material real; el usuario pidió concentrar este pase en el sistema visual.
