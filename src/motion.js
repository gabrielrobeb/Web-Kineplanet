
export function initMotion({reduceMotion,smallScreen}){
 const $=selector=>document.querySelector(selector);
 const clamp=n=>Math.min(1,Math.max(0,n));
 const smooth=n=>n*n*(3-2*n);
 const lerp=(a,b,t)=>a+(b-a)*t;
 const hero=$('.hero');
 const story=$('.life-story'),statement=$('.life-statement'),frames=[...document.querySelectorAll('.life-frame')];
 const normalWords=[...document.querySelectorAll('.word-normal')],boldWords=[...document.querySelectorAll('.word-bold')];
 const floating=$('.floating-contact'),closing=$('.newsletter')||$('.closing'),painSection=$('.testimonials');
 const painTrack=$('.pain-track');
 const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger;
 const desktop=()=>!reduceMotion.matches&&!smallScreen.matches;
 let bounds,scheduled=false,storyStarted=false,textTimeline,painTween,painSeen=false,currentPain=8,painTrackWidth=painTrack.clientWidth;

 function resetWords(){textTimeline?.kill();normalWords.forEach(word=>word.style.opacity='1');boldWords.forEach(word=>word.style.opacity='0');storyStarted=false;}
 function emphasize(){
  if(storyStarted||!desktop())return;storyStarted=true;
  if(gsap){textTimeline=gsap.timeline({delay:1}).to(boldWords,{opacity:1,duration:.4,stagger:.13,ease:'power2.out'},0).to(normalWords,{opacity:0,duration:.4,stagger:.13,ease:'power2.out'},0);}
  else{boldWords.forEach((word,i)=>word.animate([{opacity:0},{opacity:1}],{duration:400,delay:1000+i*130,fill:'forwards'}));}
 }
 function configure(){
  document.documentElement.classList.toggle('motion-enabled',!reduceMotion.matches);
  document.querySelectorAll('.scene').forEach(scene=>{scene.classList.toggle('is-live',desktop());scene.classList.toggle('is-rest',!desktop());});
  resetWords();
 }
 configure();

 function measure(){
  bounds={
   heroTop:hero.getBoundingClientRect().top+scrollY,heroTravel:Math.max(1,hero.offsetHeight-innerHeight),
   storyTop:story.getBoundingClientRect().top+scrollY,storyTravel:Math.max(1,story.offsetHeight-innerHeight),
   frameWidth:frames[0].offsetWidth,frameHeight:frames[0].offsetHeight,stageHeight:$('.life-stage').clientHeight,
   closingTop:closing.getBoundingClientRect().top+scrollY,
   links:[...document.querySelectorAll('[data-whatsapp]:not(.floating-contact)')].map(a=>{const r=a.getBoundingClientRect();return{top:r.top+scrollY,bottom:r.bottom+scrollY,height:r.height}}).filter(a=>a.height>0),
  };painTrackWidth=painTrack.clientWidth;paintPain(currentPain);update();
 }
 function update(){
  scheduled=false;if(!bounds)return;const y=scrollY,W=innerWidth,H=innerHeight,isDesktop=desktop();
  if(isDesktop){
   const p=clamp((y-bounds.storyTop)/bounds.storyTravel);
   if(y>=bounds.storyTop-2&&y<bounds.storyTop+bounds.storyTravel+H)emphasize();
   if(y<bounds.storyTop-H*.5&&storyStarted)resetWords();
   const intro=smooth(clamp((p-.20)/.08)),travel=clamp((p-.28)/.52),zoom=smooth(clamp((p-.82)/.16));
   statement.style.transform=`translateY(${-intro*H*.27}px)`;statement.style.opacity=String(1-clamp((p-.70)/.11));
   const fw=bounds.frameWidth,fh=bounds.frameHeight,target=(frames.length-1)*(fw+28)-(W-fw)/2;
   const x=lerp(W*.52,-target,travel),startY=bounds.stageHeight*.43;
   frames.forEach((frame,i)=>{
    let tx=x,ty=0,sx=1,sy=1;
    if(i===frames.length-1&&zoom>0){tx=x-(W-fw)/2*zoom;ty=-startY*zoom;sx=lerp(1,W/fw,zoom);sy=lerp(1,H/fh,zoom);}
    frame.style.opacity=String(intro);frame.style.transformOrigin='top left';frame.style.transform=`translate3d(${tx}px,${ty}px,0) scale(${sx},${sy})`;
    frame.style.clipPath=i===0&&intro<1?`inset(0 ${(1-intro)*100}% 0 0)`:'';
    frame.querySelector('img').style.transform=i===frames.length-1?`scale(${Math.max(1,sy/sx)},${Math.max(1,sx/sy)})`:'';
   });
  }else{
   statement.style.transform='';statement.style.opacity='';
   frames.forEach(frame=>{frame.style.transform='';frame.style.opacity='';frame.style.clipPath='';frame.querySelector('img').style.transform='';});
  }
  const contactVisible=bounds.links.some(link=>link.top>=y+20&&link.bottom<=y+H-10);
  const withinHero=y<bounds.heroTop+bounds.heroTravel+H*.8;
  const withinStory=isDesktop&&y>=bounds.storyTop-H*.2&&y<bounds.storyTop+bounds.storyTravel+H;
  floating.classList.toggle('is-hidden',contactVisible||withinHero||withinStory||y+H>bounds.closingTop+100);
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
 function paintPain(value){
  currentPain=value;
  const rounded=Math.round(value);$('#pain-current').textContent=String(rounded);
  $('#pain-marker').style.transform=`translate3d(${value/10*painTrackWidth}px,0,0) translateX(-50%)`;$('#pain-fill').style.transform=`scaleX(${(8-value)/6})`;
  $('#pain-caption').textContent=value<=2.05?'Ejemplo: final · 2':`Ejemplo: ${value>7.8?'inicio · ':''}${rounded}`;
 }
 function animatePain({instant=false}={}){
  painTween?.kill();if(reduceMotion.matches||instant){paintPain(2);return;}
  const state={value:painSeen?currentPain:8};
  // A rapid review change continues the marker instead of jumping back to eight.
  if(currentPain<=2.05){state.value=8;paintPain(8);}
  if(gsap)painTween=gsap.to(state,{value:2,duration:Math.max(.35,2.2*(state.value-2)/6),delay:state.value===8?.35:0,ease:'power2.inOut',onUpdate:()=>paintPain(state.value)});
  else paintPain(2);
 }
 if(reduceMotion.matches)paintPain(2);
 const painObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&!painSeen){painSeen=true;animatePain();}})},{threshold:.3});painObserver.observe(painSection);
 if(gsap&&ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',measure,{passive:true});
 const reset=()=>{configure();measure();ScrollTrigger?.refresh();if(reduceMotion.matches)animatePain({instant:true});};reduceMotion.addEventListener('change',reset);smallScreen.addEventListener('change',reset);
 document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{measure();ScrollTrigger?.refresh()}));
 new ResizeObserver(measure).observe(document.querySelector('main'));
 document.fonts.ready.then(()=>{measure();ScrollTrigger?.refresh()});addEventListener('load',measure,{once:true});measure();
 return{refresh:measure,animatePain};
}
