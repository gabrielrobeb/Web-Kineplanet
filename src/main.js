import{media,reviews,services,referencePrice,whatsappUrl}from './content.js';
import{diagram}from './render.js';
import{initMotion}from './motion.js';
import{initPolish}from './polish.js';
import{initProcessTimeline}from './process-timeline.js';
import { initTeamCarousel } from './team-carousel.js';
document.documentElement.classList.add('js');
const reduceMotion=matchMedia('(prefers-reduced-motion:reduce)'),smallScreen=matchMedia('(max-width:600px)');
const polish=initPolish({reduceMotion});
initTeamCarousel({ reduceMotion });
document.querySelectorAll('[data-whatsapp]').forEach(link=>{link.href=whatsappUrl(link.dataset.service||'');link.target='_blank';link.rel='noopener noreferrer'});
document.querySelector('#reference-price').textContent=referencePrice;document.querySelector('#copyright-year').textContent=new Date().getFullYear();
if(media.heroVideo&&!reduceMotion.matches){const video=document.createElement('video');Object.assign(video,{src:media.heroVideo,poster:media.hero,muted:true,autoplay:true,loop:true,playsInline:true});video.setAttribute('aria-hidden','true');video.addEventListener('error',()=>video.remove(),{once:true});video.addEventListener('playing',()=>document.querySelector('#hero-photo').style.display='none',{once:true});document.querySelector('.hero-media').prepend(video);}
document.querySelectorAll('.service-item').forEach((item,index)=>item.addEventListener('toggle',()=>{if(!item.open)return;document.querySelectorAll('.service-item').forEach(other=>{if(other!==item)other.open=false});document.querySelector('#service-diagram').innerHTML=diagram(services[index].diagram);polish.diagramChanged()}));
let reviewIndex=0,motion;
function showReview(index,animate=true){const direction=index>=reviewIndex?1:-1;reviewIndex=(index+reviews.length)%reviews.length;const instant=!animate||polish.isInstant();const review=reviews[reviewIndex],quote=document.querySelector('#review-quote');quote.textContent=`«${review.quote}»`;document.querySelector('#review-author').textContent=review.author;document.querySelectorAll('[data-review]').forEach((button,i)=>button.setAttribute('aria-current',String(i===reviewIndex)));polish.reviewChanged(instant,direction);if(animate)motion?.animatePain({instant});}
document.querySelector('#review-prev').addEventListener('click',()=>showReview(reviewIndex-1));document.querySelector('#review-next').addEventListener('click',()=>showReview(reviewIndex+1));document.querySelectorAll('[data-review]').forEach(button=>button.addEventListener('click',()=>showReview(Number(button.dataset.review))));showReview(0,false);
motion=initMotion({reduceMotion,smallScreen});
initProcessTimeline({reduceMotion});
