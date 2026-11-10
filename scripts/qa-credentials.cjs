const{chromium}=require('playwright');const{pathToFileURL}=require('node:url');const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const order=['hero','equipo','credenciales','servicios','testimonios','proceso','precios','preguntas','blog','newsletter'];
function sections(html){const body=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1],out={};let depth=0,start;for(const t of body.matchAll(/<\/?section\b[^>]*>/g)){if(t[0].startsWith('</')){if(--depth===0){const section=body.slice(start,t.index+t[0].length);out[section.match(/data-home-section="([^"]+)"/)[1]]=section;}}else{if(depth===0)start=t.index;depth++;}}return out;}
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const out='docs/qa-credentials-8';fs.mkdirSync(out,{recursive:true});
 const before=sections(fs.readFileSync('docs/before-credentials-8/index.html','utf8')),after=sections(fs.readFileSync('index.html','utf8'));
 for(const key of order.filter(k=>k!=='credenciales'))assert.equal(after[key],before[key],`${key} unchanged`);
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[],failed=[],sizes=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>{if(r.failure()?.errorText!=='net::ERR_ABORTED')failed.push(r.url());});
 const local=pathToFileURL(path.resolve('index.html')).href;await page.goto(local,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 assert.deepEqual(await page.locator('main>section').evaluateAll(els=>els.map(e=>e.dataset.homeSection)),order);
 assert(await page.locator('[data-home-section="equipo"]').evaluate(e=>e.nextElementSibling.id==='credenciales'));
 assert.equal(await page.locator('.credentials-numbers>div').count(),2);assert.equal(await page.locator('.credentials-numbers dd').allTextContents().then(v=>v.join('|')),'Desde2012|+40.000');
 assert.equal(await page.locator('.evaluation-visit').count(),1);assert.equal(await page.locator('.timeline-card').count(),4);
 for(const[width,height]of[[1440,900],[1024,900],[768,1024],[700,900],[390,844],[320,740]]){
  await page.setViewportSize({width,height});await page.locator('#credenciales').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY,behavior:'instant'}));await page.waitForTimeout(800);
  const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,stats:[...document.querySelectorAll('.credentials-numbers dd')].map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,right:r.right};})}));sizes.push(state);assert(state.scrollWidth<=width+1);assert(state.stats.every(s=>s.x>=0&&s.right<=width+1));
  if(width>700)assert.equal(state.stats[0].y,state.stats[1].y);else assert(state.stats[1].y>state.stats[0].y+70);
  assert(await page.locator('.credentials-numbers').evaluate(e=>getComputedStyle(e).opacity==='1'));
  if([1440,1024,390,320].includes(width))await page.locator('#credenciales').screenshot({path:`${out}/${width}.jpg`,quality:85});
 }
 await page.emulateMedia({reducedMotion:'reduce'});assert(await page.locator('.credentials-numbers dd').evaluateAll(els=>els.every(e=>getComputedStyle(e).animationName==='none')));
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(local,{waitUntil:'networkidle'});assert.equal(await nojs.locator('.credentials-numbers dd').allTextContents().then(v=>v.join('|')),'Desde2012|+40.000');
 await page.goto('http://127.0.0.1:4180/?v=13#credenciales',{waitUntil:'networkidle'});assert.deepEqual(await page.locator('main>section').evaluateAll(els=>els.map(e=>e.dataset.homeSection)),order);
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);fs.writeFileSync(`${out}/results.json`,JSON.stringify({order,sizes,otherSectionsUnchanged:9,errors,failed,nojs:true,reducedMotion:true,fileAndHttp:true},null,2));console.log('PASS: two supplied facts, credentials immediately after team, nine other sections unchanged, six widths, file and HTTP, no JavaScript and reduced motion.');
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
