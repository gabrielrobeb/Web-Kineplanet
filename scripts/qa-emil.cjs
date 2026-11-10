const{chromium}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  fs.mkdirSync('docs/qa-emil',{recursive:true});
  const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[],results=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4180')&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto('http://127.0.0.1:4180/?v=4',{waitUntil:'networkidle'});
  await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  const go=async(selector,p=0)=>{await page.evaluate(({selector,p})=>{const e=document.querySelector(selector);scrollTo(0,e.getBoundingClientRect().top+scrollY+(e.offsetHeight-innerHeight)*p)},{selector,p});await page.waitForTimeout(350);};
  await page.screenshot({path:'docs/qa-emil/hero.jpg',quality:85});
  await go('.team');await page.waitForTimeout(800);await page.screenshot({path:'docs/qa-emil/team-first.jpg',quality:85});
  for(const index of [1,2,0]){await page.locator('.team-panel').nth(index).locator('.team-vertical').click();await page.waitForTimeout(350);assert.equal(await page.locator('.team-panel').nth(index).getAttribute('aria-expanded'),'true');}
  const frozen=await page.locator('.team-panel').evaluateAll(els=>els.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height,mask:getComputedStyle(e).clipPath})));
  assert(frozen.every(e=>Math.abs(e.w-frozen[0].w)<1&&Math.abs(e.h-frozen[0].h)<1));
  await page.keyboard.press('Tab');await page.locator('.team-panel').nth(2).focus();assert.equal(await page.locator('.team-panel').nth(2).getAttribute('aria-expanded'),'true');
  assert.equal(await page.locator('.team-panel').nth(2).evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  results.push('Equipo: máscaras sin cambios de dimensiones; tres paneles por clic y foco inmediato por teclado.');
  await go('.specialties');await page.locator('#traumatologica summary').click();await page.waitForTimeout(50);await page.locator('#traumatologica summary').click();await page.waitForTimeout(40);await page.locator('#traumatologica summary').click();await page.waitForTimeout(300);assert(await page.locator('#traumatologica').evaluate(e=>e.open&&e.style.height===''));
  await page.locator('#respiratoria summary').focus();await page.keyboard.press('Enter');assert(await page.locator('#respiratoria').evaluate(e=>e.open&&e.style.height===''));assert(!await page.locator('#traumatologica').evaluate(e=>e.open));
  await go('.faq');const faq=page.locator('.faq-item').nth(2);await faq.locator('summary').click();await page.waitForTimeout(300);assert(await faq.evaluate(e=>e.open));await faq.locator('summary').click();await page.waitForTimeout(220);assert(!await faq.evaluate(e=>e.open));
  results.push('Acordeones: apertura/cierre y reversión rápida sin alturas residuales; respuesta instantánea por teclado.');
  await go('.testimonials');await page.waitForTimeout(700);await page.locator('#review-next').click();await page.waitForTimeout(80);await page.locator('#review-next').click();await page.waitForTimeout(2600);assert.equal(await page.locator('#pain-current').innerText(),'2');
  await page.screenshot({path:'docs/qa-emil/review.jpg',quality:85});await page.locator('#review-prev').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#pain-current').innerText(),'2');assert.equal(await page.locator('#review-quote').evaluate(e=>e.getAnimations().filter(a=>a.playState==='running').length),0);
  results.push('Reseñas: cambios consecutivos cancelan la transición anterior y el teclado no reproduce la animación.');
  for(const p of [0,.25,.6,.78,.98]){await go('.life-story',p);if(p===0)await page.waitForTimeout(2300);await page.screenshot({path:`docs/qa-emil/story-${p}.jpg`,quality:80});}
  const last=await page.locator('.life-frame-last').boundingBox();assert(Math.abs(last.x)<3&&Math.abs(last.width-1440)<3&&Math.abs(last.height-900)<3);
  const process=await page.locator('.process').evaluate(e=>({top:e.offsetTop,travel:e.offsetHeight-innerHeight}));for(const p of [.1,.4,.7,.95]){await page.evaluate(y=>scrollTo(0,y),process.top+process.travel*p);await page.waitForTimeout(300);assert(await page.locator('.process-photo-image').evaluate(e=>e.complete&&e.naturalWidth>0));}
  await page.screenshot({path:'docs/qa-emil/process.jpg',quality:85});results.push('Hero, goniómetro y galería conservan sus secuencias; cuarta foto completa sin deformación.');
  for(const [width,height]of [[1440,900],[768,1024],[390,844],[320,740]]){
   await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(300);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow ${width}`);
   if(width===390){
    await page.locator('.menu-toggle').click();await page.waitForTimeout(60);await page.locator('.menu-toggle').click();await page.waitForTimeout(40);await page.locator('.menu-toggle').click();await page.waitForTimeout(270);assert(!await page.locator('#mobile-menu').evaluate(e=>e.hidden||e.inert));await page.screenshot({path:'docs/qa-emil/mobile-menu.jpg',quality:85});await page.keyboard.press('Escape');assert(await page.locator('#mobile-menu').evaluate(e=>e.hidden));
    for(const s of ['.care-intro','.team','.testimonials']){await go(s);await page.waitForTimeout(600);await page.screenshot({path:`docs/qa-emil/mobile-${s.slice(1)}.jpg`,quality:85});}
    for(const i of [1,2,0]){await page.locator('.team-panel').nth(i).locator('.team-vertical').click();await page.waitForTimeout(320);assert.equal(await page.locator('.team-panel').nth(i).getAttribute('aria-expanded'),'true');}
   }
  }
  results.push('Sin desborde a 1440, 768, 390 y 320px; menú reversible y paneles táctiles con geometría estable.');
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(120);assert.equal(await page.locator('html').evaluate(e=>e.classList.contains('motion-enabled')),false);await go('.team');assert.equal(await page.locator('.team-panel').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  const reduced=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});await reduced.goto('http://127.0.0.1:4180',{waitUntil:'networkidle'});assert.equal(await reduced.locator('#pain-current').innerText(),'2');assert.equal(await reduced.locator('.hero-content').evaluate(e=>e.getAnimations().length),0);
  const nojs=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});await nojs.goto('http://127.0.0.1:4180',{waitUntil:'networkidle'});assert.equal(await nojs.locator('.service-item').count(),3);assert.equal(await nojs.locator('.faq-item').count(),6);assert.equal(await nojs.locator('.team-panel').count(),3);
  results.push('Movimiento reducido al cargar y durante la sesión; contenido y controles nativos sin JavaScript.');
  assert.deepEqual(errors,[]);fs.writeFileSync('docs/qa-emil/results.json',JSON.stringify({date:new Date().toISOString(),results,errors},null,2));console.log(results.map(x=>`PASS: ${x}`).join('\n'));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
