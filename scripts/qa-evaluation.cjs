const{chromium}=require('playwright');const{pathToFileURL}=require('node:url');const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
function sections(html){const body=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1],out=[];let depth=0,start;for(const t of body.matchAll(/<\/?section\b[^>]*>/g)){if(t[0].startsWith('</')){if(--depth===0)out.push(body.slice(start,t.index+t[0].length));}else{if(depth===0)start=t.index;depth++;}}return out;}
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const out='docs/qa-evaluation-photo';fs.mkdirSync(out,{recursive:true});
 const before=sections(fs.readFileSync('docs/before-evaluation-photo/index.html','utf8')),after=sections(fs.readFileSync('index.html','utf8'));
 assert.equal(after.length,10);assert.deepEqual(after.filter((_,i)=>i!==6),before.filter((_,i)=>i!==6));
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],failed=[],sizes=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>{if(r.failure()?.errorText!=='net::ERR_ABORTED')failed.push({url:r.url(),error:r.failure()?.errorText});});
 const local=pathToFileURL(path.resolve('index.html')).href;await page.goto(local,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 assert(await page.locator('#proceso').evaluate(e=>e.nextElementSibling.matches('[data-home-section="precios"]')&&e.children.length===1));
 assert(await page.locator('.evaluation').evaluate(e=>e.nextElementSibling.matches('.everyday')));
 assert.equal(await page.locator('.timeline-card').count(),4);assert.equal(await page.locator('.life-frame').count(),4);
 assert.equal(await page.locator('[class*="evaluation-phone"]').count(),0);
 const cta=page.locator('.evaluation-cta');assert.equal(await cta.innerText(),'Agendar mi evaluación');
 const url=new URL(await cta.getAttribute('href'));assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/56933965202');assert(url.searchParams.get('text').includes('evaluación de kinesiología'));
 assert.equal(await page.locator('#reference-price').innerText(),'$30.000');assert.equal(await page.locator('.evaluation-checklist li').count(),3);
 const go=async()=>{await page.locator('.evaluation').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY,behavior:'instant'}));await page.waitForTimeout(800);};
 for(const[width,height]of[[1440,1000],[1024,1000],[901,1000],[900,1000],[768,1024],[390,844],[320,740]]){
  await page.setViewportSize({width,height});await go();
  const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,photo:document.querySelector('.evaluation-visit').getBoundingClientRect().toJSON(),cards:[...document.querySelectorAll('.evaluation-card')].map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth};})}));sizes.push(state);
  assert(state.scrollWidth<=width+1);assert(state.cards.every(c=>c.scrollWidth<=c.clientWidth+1));
  assert(await page.locator('.evaluation-visit img').evaluate(e=>e.complete&&e.naturalWidth>0));
  if(width>900){assert.equal(state.cards[0].y,state.cards[1].y);assert(Math.abs(state.photo.x+state.photo.width/2-width/2)<1);assert(Math.abs(state.cards[0].x+state.cards[0].width-state.photo.x)<1);assert(Math.abs(state.cards[1].x-state.photo.right)<1);}
  else{assert(Math.abs(state.photo.y-state.cards[0].y-state.cards[0].height)<1);assert(Math.abs(state.cards[1].y-state.photo.bottom)<1);assert.equal(state.cards[0].x,state.cards[1].x);}
  if([1440,1024,390,320].includes(width)){await page.locator('.evaluation').screenshot({path:`${out}/${width}.jpg`,quality:85});}
 }
 await page.setViewportSize({width:1440,height:1000});await go();await cta.focus();assert.equal(await cta.evaluate(e=>e===document.activeElement),true);assert.equal(await cta.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
 await page.emulateMedia({reducedMotion:'reduce'});await go();assert.equal(await cta.evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(local,{waitUntil:'networkidle'});assert((await nojs.locator('.evaluation-cta').getAttribute('href')).startsWith('https://wa.me/'));assert.equal(await nojs.locator('.evaluation-checklist li').count(),3);
 await page.goto('http://127.0.0.1:4180/?v=12#agenda-tu-evaluacion',{waitUntil:'networkidle'});assert.equal(await page.locator('.evaluation-card').count(),2);assert.equal(await page.locator('.evaluation-visit').count(),1);
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);fs.writeFileSync(`${out}/results.json`,JSON.stringify({sizes,errors,failed,otherSectionsUnchanged:9,immediatelyAfterTimeline:true,oldScenesPreservedAfter:true,whatsapp:true,localAndHttp:true,reducedMotion:true,nojs:true,noDevice:true},null,2));
 console.log('PASS: Home-visit composition without device, 7 widths, integrated photo on desktop and mobile, keyboard, reduced motion, file and HTTP, working WhatsApp destination. Nine other sections unchanged.');
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
