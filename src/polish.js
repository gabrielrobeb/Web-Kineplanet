// Occasional entrances and immediate, interruptible controls.
export function initPolish({reduceMotion}) {
 const root=document.documentElement;
 const ease=getComputedStyle(root).getPropertyValue('--ease-out').trim();
 const drawerEase=getComputedStyle(root).getPropertyValue('--ease-drawer').trim();
 const entranceAnimations=new Set(),uiAnimations=new Map(),disclosures=new Map();
 let keyboard=false;
 const isInstant=()=>keyboard||reduceMotion.matches;
 root.dataset.input='pointer';

 function finishEntrances(){for(const animation of entranceAnimations)animation.finish();entranceAnimations.clear();}
 function finishUI(){for(const animation of uiAnimations.values())animation.finish();uiAnimations.clear();for(const controller of disclosures.values())controller.finish();}
 document.addEventListener('keydown',event=>{
  if(event.metaKey||event.ctrlKey||event.altKey)return;
  keyboard=true;root.dataset.input='keyboard';finishEntrances();finishUI();
 },true);
 function usePointer(){keyboard=false;root.dataset.input='pointer';}
 document.addEventListener('pointerdown',usePointer,true);
 document.addEventListener('pointermove',event=>{if(event.movementX||event.movementY)usePointer();},{passive:true});

 function entrance(element,{delay=0,duration=500,distance=16,scale=1}={}){
  if(isInstant()||!element||element.getBoundingClientRect().bottom<0)return;
  const animation=element.animate([
   {opacity:.06,transform:`translateY(${distance}px) scale(${scale})`},
   {opacity:1,transform:'translateY(0) scale(1)'},
  ],{duration,delay,easing:ease,fill:'backwards'});
  entranceAnimations.add(animation);
  animation.finished.then(()=>entranceAnimations.delete(animation)).catch(()=>entranceAnimations.delete(animation));
 }
 const groups=new Map();
 function observe(selector,children=null,options={}){
  document.querySelectorAll(selector).forEach(element=>groups.set(element,{children,options}));
 }
 observe('.team .section-top',':scope>h2,:scope>p,:scope>div');
 observe('.specialties-intro',':scope>h2,:scope>p');
 observe('.service-diagram',null,{distance:10,duration:650});
 observe('.service-list',null,{distance:14,duration:500});
 observe('.team-panels',null,{distance:14,duration:550});
 observe('.reviews-heading,.review-layout,.faq-intro,.faq-list',null,{distance:12,duration:450});
 observe('.closing-content',':scope>h2,:scope>p,:scope>a',{distance:14,duration:600});
 observe('.credentials-heading,.blog .section-top',':scope>h2,:scope>p',{distance:12,duration:500});
 observe('.credentials-numbers',null,{distance:12,duration:500});
 observe('.blog-article,.newsletter-copy,.newsletter-form',null,{distance:12,duration:450});
 observe('.evaluation-layout',null,{distance:14,duration:500});
 // Small screens read the gallery as a vertical photo sequence.
 if(matchMedia('(max-width:600px)').matches)observe('.life-frame',null,{distance:12,duration:600});
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(!entry.isIntersecting)continue;
   const {children,options}=groups.get(entry.target);
   const elements=children?[...entry.target.querySelectorAll(children)]:[entry.target];
   elements.forEach((element,index)=>entrance(element,{...options,delay:index*60}));
   observer.unobserve(entry.target);
  }
 },{threshold:.12,rootMargin:'0px 0px -24px 0px'});
 for(const element of groups.keys())observer.observe(element);

 // Native details keep their semantics; only pointer actions animate the reflow.
 document.querySelectorAll('details').forEach(details=>{
  const summary=details.querySelector('summary');
  let animation,wanted=details.open,version=0;
  function commit(){
   ++version;animation?.cancel();animation=null;details.open=wanted;
   details.style.height='';details.style.overflow='';
  }
  function change(open,instant=isInstant()){
   wanted=open;
   if(instant){commit();return;}
   const start=details.getBoundingClientRect().height;
   animation?.cancel();
   details.style.height='';details.style.overflow='hidden';
   details.open=true;
   const end=open?details.getBoundingClientRect().height:summary.getBoundingClientRect().height+parseFloat(getComputedStyle(details).borderTopWidth)+parseFloat(getComputedStyle(details).borderBottomWidth);
   details.style.height=`${start}px`;
   const token=++version;
   animation=details.animate([{height:`${start}px`},{height:`${end}px`}],{duration:open?240:180,easing:ease,fill:'forwards'});
   animation.finished.then(()=>{if(token===version)commit();}).catch(()=>{});
   if(open){const content=details.querySelector('.service-body,.extra-body,.blog-body,:scope>p');if(content){const old=uiAnimations.get(content);old?.cancel();const fade=content.animate([{opacity:.35,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:200,easing:ease});uiAnimations.set(content,fade);fade.finished.then(()=>{if(uiAnimations.get(content)===fade)uiAnimations.delete(content);}).catch(()=>{});}}
  }
  disclosures.set(details,{change,finish:()=>{if(animation)commit();}});
  summary.addEventListener('click',event=>{
   event.preventDefault();
   const open=!wanted;
   if(open&&details.name){for(const[other,controller]of disclosures){if(other!==details&&other.name===details.name&&other.open)controller.change(false,true);}}
   change(open,event.detail===0||isInstant());
  });
  details.addEventListener('toggle',()=>{if(!animation)wanted=details.open;});
 });

 // The menu reverses from its rendered state rather than restarting an entrance.
 const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#mobile-menu');
 let menuAnimation,menuVersion=0;
 function setMenu(open,{instant=isInstant(),returnFocus=false}={}){
  const wasOpen=toggle.getAttribute('aria-expanded')==='true';
  if(!open&&menu.hidden)return;
  const current=getComputedStyle(menu),opacity=menu.hidden?0:current.opacity,transform=menu.hidden?'translateY(-8px) scale(.985)':current.transform;
  menuAnimation?.cancel();uiAnimations.delete(menu);const version=++menuVersion;
  toggle.setAttribute('aria-expanded',String(open));
  if(!open&&(returnFocus||menu.contains(document.activeElement))&&wasOpen)toggle.focus({preventScroll:true});
  menu.inert=!open;menu.setAttribute('aria-hidden',String(!open));
  if(instant){menu.hidden=!open;menu.style.opacity='';menu.style.transform='';menuAnimation=null;return;}
  menu.hidden=false;
  menuAnimation=menu.animate([{opacity,transform},{opacity:open?1:0,transform:open?'translateY(0) scale(1)':'translateY(-8px) scale(.985)'}],{duration:open?220:150,easing:drawerEase,fill:'forwards'});
  uiAnimations.set(menu,menuAnimation);
  menuAnimation.finished.then(()=>{
   if(version!==menuVersion)return;
   menu.hidden=!open;menuAnimation.cancel();uiAnimations.delete(menu);menuAnimation=null;
  }).catch(()=>{});
 }
 toggle.addEventListener('click',event=>setMenu(toggle.getAttribute('aria-expanded')!=='true',{instant:event.detail===0||isInstant()}));
 menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false,{instant:true,returnFocus:true})));
 document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false,{instant:true,returnFocus:true});});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))setMenu(false);});
 matchMedia('(min-width:801px)').addEventListener('change',()=>setMenu(false,{instant:true}));

 function reviewChanged(instant=false,direction=1){
  const elements=[document.querySelector('#review-quote'),document.querySelector('#review-author')];
  elements.forEach((element,index)=>{
   const old=uiAnimations.get(element),current=getComputedStyle(element);
   const opacity=old?current.opacity:.25,transform=old?current.transform:`translateX(${direction*8}px)`;
   old?.cancel();uiAnimations.delete(element);
   if(instant)return;
   const animation=element.animate([{opacity,transform},{opacity:1,transform:'translateX(0)'}],{duration:220,delay:index*25,easing:ease});
   uiAnimations.set(element,animation);animation.finished.then(()=>{if(uiAnimations.get(element)===animation)uiAnimations.delete(element);}).catch(()=>{});
  });
 }
 function diagramChanged(){
  if(isInstant())return;
  const svg=document.querySelector('#service-diagram svg');
  const animation=svg.animate([{opacity:.2,transform:'translateY(4px) scale(.985)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:200,easing:ease});
  uiAnimations.set(svg,animation);animation.finished.then(()=>uiAnimations.delete(svg)).catch(()=>{});
 }
 reduceMotion.addEventListener('change',()=>{if(reduceMotion.matches){finishEntrances();finishUI();}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){finishEntrances();finishUI();}});
 return{isInstant,reviewChanged,diagramChanged};
}
