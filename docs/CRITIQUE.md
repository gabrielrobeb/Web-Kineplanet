# Revisión visual

Este documento registra la primera propuesta. El usuario la consideró demasiado genérica; el refinamiento posterior de tipografía, color y componentes se documenta en `AUTHENTICITY.md`. Las puntuaciones siguientes son históricas y no describen la aprobación del usuario.

## ROUND 1

Seen in one second: una atención en casa, con el mensaje editorial en primer plano.

Idea (one sentence): la atención se mueve hacia el hogar para acompañar la vida cotidiana.

Live thing: seleccionar especialidad e iniciar una consulta contextual por WhatsApp; explorar las etapas al hacer scroll.

Layout words by section: hero=inmersivo / introducción=editorial / servicios=acordeón ilustrado / complementarios=bandas / proceso=goniómetro / cotidiano=tipografía fotográfica / galería=secuencia horizontal / equipo=paneles / reseñas=cita / práctico=valor / FAQ=lista / cierre=fotografía / footer=contactos.

Scores: design 7.8 · usability 7.2 · creativity 7.2 · content 7.7 → overall 7.49.

Caps applied: reglas de legibilidad pendientes; el resultado inicial todavía no se considera final.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `mobile-fold.jpg`: el recorte del hero deja fuera el rostro de la paciente. Generar un encuadre vertical propio y mantener ambos rostros visibles.
2. `tablet-page-01.jpg` y `tablet-page-02.jpg`: la introducción y el título de preguntas llegan a tres líneas. Ajustar el ancho y escala de tablet.
3. `desktop-page-01.jpg`: párrafos y logística se leen pequeños respecto de la escala editorial. Llevar los textos de lectura a 16 px y notas a 13 px.

Además: conservar la legibilidad del logo original sin el filtro que aplana su símbolo. Mantener todo el contenido visible antes de disparar las apariciones, para que una animación pendiente no deje huecos.

## ROUND 2

Seen in one second: atención cercana y en casa; la acción principal se distingue inmediatamente.

Idea (one sentence): acompañar la vida cotidiana desde el hogar, con coordinación clara y trato humano.

Live thing: especialidades con ilustración y consulta contextual; etapas de atención vinculadas al goniómetro.

Layout words by section: hero=inmersivo / introducción=editorial / servicios=acordeón ilustrado / complementarios=bandas / proceso=goniómetro / cotidiano=tipografía fotográfica / galería=secuencia horizontal / equipo=paneles / reseñas=cita / práctico=valor / FAQ=lista / cierre=fotografía / footer=contactos.

Scores: design 8.0 · usability 8.3 · creativity 7.3 · content 7.8 → overall 7.93.

Caps applied: creatividad limitada a 7.3 porque adapta recursos conocidos de las referencias; fotografías y perfiles explícitamente provisionales. No se atribuye una evaluación externa.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `scenes/reduced-desktop.jpg`: el logo del footer conserva una altura fija y se deforma. Aplicar altura automática y comprobar su proporción con el original.
2. `mobile-page-01.jpg`: el acceso flotante compite con otros CTA y con algunos controles de acordeón. Ocultarlo cuando hay otro acceso a WhatsApp completamente visible.
3. `mobile-fold.jpg`: la imagen horizontal deja un encuadre débil de ambos rostros. Integrar la variante vertical y colocar el titular debajo de los rostros.

## ROUND 3 — Final

Seen in one second: una profesional y una paciente en su hogar, con un titular legible y contacto directo.

Idea (one sentence): la casa conecta el servicio de Kineplanet con aquello que cada persona quiere seguir compartiendo.

Live thing: elegir atención, consultar por WhatsApp, abrir dudas y recorrer las etapas; el scroll se puede revertir.

Layout words by section: hero=inmersivo / introducción=editorial / servicios=acordeón ilustrado / complementarios=bandas / proceso=goniómetro / cotidiano=tipografía fotográfica / galería=secuencia horizontal / equipo=paneles / reseñas=cita / práctico=valor / FAQ=lista / cierre=fotografía / footer=contactos.

Scores: design 8.1 · usability 8.5 · creativity 7.3 · content 7.8 → overall 8.03.

Caps applied: recursos inspirados en referencias conocidas y material fotográfico provisional; sin afirmaciones de originalidad absoluta ni de calidad clínica demostrada.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `desktop-7.jpg` y `mobile-7.jpg`: los profesionales todavía son personajes ilustrativos. Reemplazar por retratos y perfiles autorizados cuando existan.
2. `desktop-0.jpg` y `mobile-0.jpg`: el logo PNG original tiene detalle y tipografía pequeña propios de su archivo. Sustituir por el SVG oficial si se consigue; no reconstruirlo de manera aproximada.
3. `desktop-9.jpg`: el valor y las condiciones requieren confirmación comercial. Conservar su carácter referencial hasta validarlos.

Se revisaron las capturas de escritorio, tablet y móvil; las hojas de ambas escenas a intervalos de 10%; y la composición con movimiento reducido. Los resultados funcionales se guardan en `docs/qa/results.json`. Las excepciones del medidor visual se explican en `DESIGN.md`; no corresponden a contenido clínico inventado ni a errores de interacción.
