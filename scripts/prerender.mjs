import { readFileSync, writeFileSync } from 'node:fs';
import { renderServices, renderSteps, renderFaqs, renderPagination, diagram, escape } from '../src/render.js';
import { reviews, referencePrice, whatsappUrl, media } from '../src/content.js';
const icon = name => {
 const paths = { right:'M4 12h16m-6-6 6 6-6 6', left:'M20 12H4m6-6-6 6 6 6', down:'M12 4v16m-6-6 6 6 6-6', up:'M12 20V4m-6 6 6-6 6 6', external:'M6 18 18 6M6 6h12v12', plus:'M12 5v14M5 12h14' };
 return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${paths[name]}"/></svg>`;
};
// Genera contenido semántico: servicios y FAQ también funcionan sin JavaScript.
export function prerender() {
 let html = readFileSync('index.html', 'utf8');
 const slots = { 'service-list': renderServices(), 'process-steps': renderSteps(), 'faq-list': renderFaqs(), 'review-pagination': renderPagination(), 'service-diagram': diagram() };
 for (const [id, contents] of Object.entries(slots)) {
  const start = `<!-- render:${id} -->`, end = `<!-- /render:${id} -->`;
  if (html.includes(start)) html = html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}${contents}${end}`);
  else html = html.replace(new RegExp(`(<(?:div|ol)[^>]*id="${id}"[^>]*>)`), `$1${start}${contents}${end}`);
 }
 html = html.replace(/(<blockquote id="review-quote">)[\s\S]*?(<\/blockquote>)/, `$1«${escape(reviews[0].quote)}»$2`);
 html = html.replace(/(<p id="review-author">)[\s\S]*?(<\/p>)/, `$1${escape(reviews[0].author)}$2`);
 html = html.replace(/(<p class="price" id="reference-price">)[\s\S]*?(<\/p>)/, `$1${escape(referencePrice)}$2`);
 html = html.replace(/(<a\b[^>]*data-whatsapp[^>]*href=")[^"]*(")/g, (match, before, after) => {
  const service = before.match(/data-service="([^"]*)"/)?.[1];
  return before + escape(whatsappUrl(service || '')) + after;
 });
 const assetNames = { 'cuidado-en-casa.webp':'hero', 'cuidado-en-casa-movil.webp':'heroMobile', 'respiratoria-en-casa.webp':'respiratory', 'vida-cotidiana.webp':'life', 'atencion-familiar-en-casa.webp':'care', 'equipo-ilustrativo.webp':'team', 'kineplanet-logo.png':'logo' };
 // Las vinculaciones permanecen en el HTML, para poder volver a cambiar las rutas.
 html = html.replace(/<(?:img|source|link|meta)\b[^>]*>/g, tag => {
  let key = tag.match(/data-media="([^"]+)"/)?.[1];
  if (!key) {
   key = Object.entries(assetNames).find(([name]) => tag.includes(`/public/images/${name}`))?.[1];
   if (key) tag = tag.replace(/^<(\w+)/, `<$1 data-media="${key}"`);
  }
  if (!key || !media[key]) return tag;
  return tag.replace(/\b(src|srcset|href|content)="[^"]*"/, (match, attribute) => `${attribute}="${escape(media[key])}"`);
 });
 html = html.replace(/(<(?:p|span) class="image-type")[^>]*>/, `$1 style="background-image:url('${escape(media.life)}')">`);
 // Un solo sistema de iconos, también en el HTML servido sin JavaScript.
 const glyphs = { '↗':'external', '→':'right', '←':'left', '↓':'down', '↑':'up', '+':'plus' };
 html = html.replace(/>([↗→←↓↑+])</g, (_, glyph) => `>${icon(glyphs[glyph])}<`);
 html = html.replace(/Instagram ↗/g, `Instagram ${icon('external')}`);
 html = html.replace(/Consultar por WhatsApp ↗/g, `Consultar por WhatsApp ${icon('external')}`);
 html = html.replace(/<span class="background-word"[^>]*>[^<]*<\/span>/g, '');
 html = html.replace(/<br\s*\/?>\s*/g, '<br /> ');
 // Asset URLs are relative to the HTML, also when opened directly from a folder.
 html = html.replace(/\b(href|src|srcset|content)="\/(public|src)\//g, '$1="./$2/');
 writeFileSync('index.html', html);
 console.log('Contenido estático actualizado.');
}
prerender();
