# El cuidado se siente mejor en casa

**Proceso vigente, 6 de noviembre de 2026:** línea de tiempo central con cuatro tarjetas alternadas, adaptada con código propio desde la vista pública de How It Works 6 de React Bits Pro. Sustituye al goniómetro; conserva los cuatro pasos existentes. En móvil las tarjetas se apilan y la línea permanece detrás. `PROCESS-TIMELINE-2026-11-06.md` documenta esta revisión.

**Hero vigente, 6 de noviembre de 2026:** la revisión por secciones comienza con una portada fotográfica basada en la referencia del usuario: cielo, navegación transparente, degradado azul y titular central. `HERO-2026-11-06.md` documenta el cambio; sustituye el anterior hero arqueado. Las otras secciones conservan su contenido.

**Orden vigente, 6 de noviembre de 2026:** Hero → Equipo → Credenciales → Testimonios → Carrusel horizontal → Servicios → Proceso → Precios → Preguntas frecuentes → Blog → Newsletter. Se retiraron «También estamos para acompañarte», «En tu casa. Con todo coordinado» y el intermedio «Para seguir con lo tuyo». El carrusel es ahora una sección propia y conserva su animación completa. Credenciales usa dos cifras grandes sobre un trazo de movimiento tenue, adaptación de Stats 8; `STATS-8-2026-11-06.md` documenta esa revisión. `STRUCTURE-2026-11-06.md` documenta el orden actual. Newsletter queda reservada para una integración futura por indicación del usuario.

Preferencia editorial del usuario: evitar microetiquetas decorativas y aclaraciones pequeñas innecesarias en las próximas revisiones.

Refinamiento vigente: 4 de noviembre de 2026. La composición actual se documenta en `MOTION-V3.md` y el pulido de animación en `EMIL-MOTION.md`; sustituyen las decisiones de composición y movimiento descritas más abajo. Incluyen el orden actualizado, hero arqueado de Fulcrum, beneficios, proceso más lento, galería de cuatro imágenes y formatos de equipo y reseñas de Stridewell. El refinamiento tipográfico anterior se conserva en `AUTHENTICITY.md` y las capturas anteriores en `before-authenticity/`, `before-motion-v3/` y `before-emil/`.

## Idea y argumento

La atención se acerca a la vida cotidiana: el hogar es el centro del relato. La marca se expresa en personas acompañadas, movimientos pequeños y una coordinación comprensible, sin promesas clínicas.

Inventario propio: Kineplanet; fundación en 2012; atención domiciliaria; Santiago; familia que coordina; uniforme gris; seis servicios; prioridad respiratoria, postoperatoria y personas mayores; coordinación según comuna y disponibilidad; WhatsApp sin formulario; azul y verde de la marca; valor referencial por confirmar.

La página responde, en orden: qué hacemos y dónde → por qué atender en casa → cuál es la atención que buscas → otros momentos de cuidado → cómo coordinamos → qué importa en tu día a día → acompañamiento en distintas etapas → trato profesional y humano → reseñas públicas → cobertura, precio y convenios → dudas → contacto.

## Sistema visual

Tipografía vigente: **Manrope en todo el sitio**, por indicación del usuario de extender la fuente del hero al resto de la página. Los tres tokens de familia (texto, display y carácter) apuntan a Manrope; se conservan los tamaños, pesos e interlineados de cada componente. Lora ya no se declara ni se precarga. `TYPE-TRIALS.md` conserva la exploración anterior, sustituida por esta decisión.

- Blanco neutro `#F3F5F4`, blanco `#FFFFFF`, fondos secundarios grises azulados.
- Azul Kineplanet interpretado como `#164C68`; tinta `#193B4B`; acento verde `#C8DF62` reservado para acciones y el goniómetro.
- Manrope para titulares, lectura, cifras, servicios, etapas, citas y controles. Fuente variable local con licencia OFL. Los tamaños y espaciados conservan la jerarquía existente.
- Márgenes fluidos entre 23 y 88 px, según dispositivo. La composición de móvil es vertical.
- Fotografía cálida, entornos domésticos, uniformes grises, gestos contenidos.
- Botones rectangulares con radio de 5 px. Acordeones abiertos, con separadores y sin contenedores de tarjeta. Los servicios complementarios conservan sus franjas redondeadas. Las capas de contraste están limitadas a las fotografías.

## Referencias adaptadas

| Referencia | Interpretación en Kineplanet |
| --- | --- |
| Foundry | Hero de pantalla completa con foto de atención en casa, navegación sobre la imagen y contenido central. |
| Fulcrum | Dos líneas serif de gran escala que se desplazan en sentidos opuestos al avanzar el scroll, con movimiento suave de la fotografía. |
| Stridewell | Introducción breve con goniómetro; acordeones de servicios con ilustración pertinente; primera atención por etapas y aguja; bandas redondeadas; fotografía dentro de palabras; paneles de retratos y carrusel manual de reseñas. |
| Therapy Care | Jerarquía editorial serif; se retiró la palabra decorativa detrás de las reseñas durante el refinamiento de autenticidad. |
| Auvexa | Frase que se enfatiza por palabras, fotografías que avanzan horizontalmente y última imagen que crece hasta llenar el viewport. |

La composición se adapta expresamente a lo solicitado: no se reproduce la oferta deportiva, el mapa de dolor, las métricas ni el contenido clínico de las referencias. No se usa el tape de Recoil.

La exploración con `design-taste-frontend` produjo la dirección `sentence-as-layout`, seed `1923964020`. Sus propuestas de hero casi vacío y pasos a pantalla completa se sustituyen por las composiciones explícitas de Foundry, Fulcrum y Stridewell que exige el brief. Se conserva la idea tipográfica de imagen dentro de una frase en «Lo cotidiano».

## Movimiento

El goniómetro sirve para explicar el proceso; la galería muestra el vínculo entre atención y vida diaria. Se conserva el scroll nativo y `requestAnimationFrame` de esas escenas. GSAP y ScrollTrigger 3.13.0, alojados localmente, controlan dos gestos acotados: escala y atenuación de la imagen del hero, y énfasis progresivo de la frase. No hay captura de rueda ni desplazamiento automático.

La introducción dura aproximadamente 600 ms y no captura clics. Solo cinco grupos tienen aparición suave, de 650 ms; el resto permanece quieto. Respuesta de botones de 160–200 ms. Curva principal `cubic-bezier(.23,1,.32,1)`. La preferencia de movimiento reducido se respeta también al cambiar durante la sesión.

El control útil principal es la elección de especialidad, que actualiza la ilustración y permite iniciar una consulta pertinente. Los bloques de FAQ y servicios existen en el HTML; el contenido principal sigue accesible si JavaScript no ejecuta.

## Fotografías

Todos los originales fueron generados para esta propuesta, no provienen de bancos de imágenes ni representan atenciones o profesionales reales. Cada escena está descrita en los textos alternativos y existe una aclaración visible bajo equipo y en el pie de página. Son cuatro escenas más un encuadre móvil del hero. Los WebP son derivados optimizados de esos originales, sin alteraciones estéticas adicionales.

No hay video real disponible. El hero admite reemplazo por video mediante `media.heroVideo`. No se añade metraje ajeno para simular atenciones propias.

## Excepciones justificadas de la inspección estilística

- `gradient-text`: el brief pide palabras con fotografías en su interior; se implementa con recorte de una imagen, sin gradiente de texto.
- `gradient`: únicamente scrims neutros sobre fotografías, para contraste; no hay fondos decorativos degradados.
- `eyebrow`: el detector asocia enlaces funcionales como «Consultar por mi comuna» con títulos de la siguiente columna o sección. No son etiquetas superiores ni subtítulos; se revisaron visualmente en sus posiciones reales.
- `icon-cards`: los iconos detectados en las franjas son controles de acordeón, no iconos sobre tarjetas de beneficios. Son SVG de una misma familia y peso.
- `card-rows`: el brief exige listas expandibles y retratos en paneles; las filas detectadas son esos controles, no tarjetas decorativas de beneficios.
- `headline-lines` en reseñas: la cita grande es un `blockquote`, no un titular; su composición puede ocupar más de dos líneas en móvil.
- Los tamaños tipográficos cambian de forma fluida y algunos controles tienen símbolos en otro tamaño. No constituyen estilos editoriales adicionales.
- El carrusel y los servicios expandibles conservan sus convenciones de control. Las imágenes de las escenas comparten una única familia de luz y color.
