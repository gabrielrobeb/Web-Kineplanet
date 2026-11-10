// Configuración editorial. Sin secretos ni datos privados.
// Cambia estas variables para actualizar TODOS los accesos a WhatsApp.
export const contact = {
  whatsapp: '56933965202',
  message: 'Hola, me gustaría consultar por una atención de kinesiología a domicilio. La comuna es: ____ y la atención que necesito es: ____.',
  email: 'contacto@kineplanet.cl',
  phones: ['+56 2 2278 8544', '+56 9 3396 5201', '+56 9 3396 5202'],
};

export const media = {
  logo: './public/images/kineplanet-logo.png', // PNG auténtico; sustituible por el SVG original.
  hero: './public/images/cuidado-en-casa.webp',
  heroMobile: './public/images/cuidado-en-casa-movil.webp',
  heroBanner: './public/images/hero-casa-cielo.webp',
  heroBannerMobile: './public/images/hero-casa-cielo-movil.webp',
  heroVideo: '', // Ruta de un MP4 o WebM real, cuando esté disponible. El hero se mantiene como poster.
  respiratory: './public/images/respiratoria-en-casa.webp',
  life: './public/images/vida-cotidiana.webp',
  care: './public/images/atencion-familiar-en-casa.webp',
  team: './public/images/equipo-ilustrativo.webp',
  teamRespiratory: './public/images/retrato-respiratoria-ilustrativo.webp',
  teamTrauma: './public/images/retrato-traumatologica-ilustrativo.webp',
  teamNeuro: './public/images/retrato-neurologica-ilustrativo.webp',
};

// href queda reservado para las páginas secundarias futuras.
// Mientras sea null, el enlace abre una consulta real contextualizada por WhatsApp.
export const services = [
  { id: 'respiratoria', title: 'Respiratoria', audience: 'Niños y adultos', description: 'Atención respiratoria en casa, con un trato cercano para niños, adultos y sus familias. Adaptamos la terapia a la evaluación y a la indicación médica cuando corresponda.', image: 'respiratory', alt: 'Escena ilustrativa de una profesional atendiendo a un niño junto a su madre en casa.', diagram: 'lungs', href: null },
  { id: 'traumatologica', title: 'Traumatológica', audience: 'Lesiones y postoperatorios', description: 'Rehabilitación después de una lesión o cirugía, y atención musculoesquelética. Trabajamos la movilidad y la función con objetivos definidos según tu evaluación e indicación médica.', image: 'hero', alt: 'Escena ilustrativa de un ejercicio de movilidad acompañado en el hogar.', diagram: 'joint', href: null },
  { id: 'neurologica', title: 'Neurológica', audience: 'Movimiento y autonomía', description: 'Acompañamos a personas con condiciones neurológicas y a sus familias. La atención se enfoca en la movilidad, el equilibrio y las actividades cotidianas, según cada evaluación.', image: 'life', alt: 'Escena ilustrativa de una persona mayor caminando acompañada en el jardín de su hogar.', diagram: 'brain', href: null },
];

export const complementary = [
  { id: 'personas-mayores', title: 'Personas mayores', short: 'Más apoyo para su autonomía.', description: 'Activación motora, fortalecimiento, equilibrio y marcha. Acompañamos a las personas mayores y orientamos a sus familias para trabajar objetivos significativos en su propio entorno.', href: null },
  { id: 'estimulacion-temprana', title: 'Estimulación temprana', short: 'Acompañar sus primeros movimientos.', description: 'Actividades adaptadas a la etapa de desarrollo de lactantes y niños pequeños. Una atención personalizada que también orienta a madres, padres y cuidadores.', href: null },
  { id: 'masajes', title: 'Masajes', short: 'Un espacio para tu bienestar.', description: 'Masajes de relajación y descontracturantes en la comodidad de tu hogar. Consulta cuál es la atención adecuada para tu necesidad y las condiciones del servicio.', href: null },
];

export const steps = [
  { title: 'Te escuchamos.', text: 'Cuéntanos por WhatsApp qué atención necesitas y en qué comuna. Puedes escribir por ti o por un familiar.' },
  { title: 'Lo coordinamos contigo.', text: 'Confirmamos cobertura, disponibilidad, valor y requisitos. Asignamos al profesional considerando tu necesidad y ubicación.' },
  { title: 'Nos conocemos en casa.', text: 'En la primera visita, el kinesiólogo evalúa tu situación y escucha tus objetivos, considerando la indicación médica cuando corresponde.' },
  { title: 'Trazamos tu plan.', text: 'Definimos una atención personalizada y te explicamos cómo acompañar el proceso. Los objetivos se ajustan a tu condición y evolución.' },
];

export const faqs = [
  { question: '¿Atienden en mi comuna?', answer: 'Realizamos atención a domicilio en Santiago. Escríbenos tu comuna por WhatsApp para confirmar cobertura y disponibilidad antes de coordinar una visita.' },
  { question: '¿Cuál es el valor de una sesión?', answer: 'El valor de referencia es $30.000 CLP por sesión. El valor definitivo, los descuentos y las condiciones aplicables se confirman antes de coordinar tu atención.' },
  { question: '¿Necesito una orden médica?', answer: 'Depende del motivo de consulta. Para atención por dolor agudo o rehabilitación postoperatoria se requiere orden médica. Al consultar, te orientamos sobre los requisitos de tu atención y la documentación que corresponda.' },
  { question: '¿Cuánto dura una sesión?', answer: 'Como referencia, la atención respiratoria dura aproximadamente 40 minutos y las demás terapias, unos 50 minutos. La primera sesión puede ser más extensa porque incluye la evaluación inicial. La duración se confirma según la atención requerida.' },
  { question: '¿Cómo se coordina la atención?', answer: 'Escríbenos por WhatsApp indicando tu comuna y qué necesitas. Revisamos la disponibilidad y coordinamos al profesional, el horario, el valor y los requisitos contigo o con el familiar que organiza la atención.' },
  { question: '¿Qué formas de pago aceptan?', answer: 'Puedes pagar en efectivo, por transferencia o mediante Webpay con tarjeta de crédito o débito. Confirmamos contigo el medio de pago y sus condiciones al coordinar.' },
];

// Fragmentos textuales de reseñas públicas verificadas en https://kineplanet.cl/
// el 04-11-2026. Se conserva el texto del fragmento y el autor; no se usan fotos ni métricas clínicas.
export const reviews = [
  { quote: 'buenos profesionales, y la atención personalizada y a domicilio.', author: 'Rodrigo García', date: '16 de octubre de 2025', source: 'https://kineplanet.cl/' },
  { quote: 'nos explicaba todo con peras y manzanas', author: 'Pamela Contreras Neira', date: '12 de diciembre de 2025', source: 'https://kineplanet.cl/' },
  { quote: 'desde la comodidad de la casa', author: 'Elisa Vildosola', date: '27 de noviembre de 2025', source: 'https://kineplanet.cl/' },
];

export const referencePrice = '$30.000'; // Confirmar su vigencia antes de publicar.
export const pendingValidation = {
  totalVisits: 'Más de 40.000 atenciones: cifra suministrada por el cliente, incorporada a su solicitud.',
  price: 'Validar $30.000 por sesión y condiciones antes del lanzamiento.',
  team: 'Sustituir retratos generados por fotografías y perfiles autorizados.',
  agreements: 'Confirmar vigencia y condiciones. No se publican marcas ni porcentajes.',
};

export function whatsappUrl(service = '') {
  const message = service ? `Hola, me gustaría consultar por ${service.toLowerCase()} a domicilio. La comuna es: ____.` : contact.message;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
