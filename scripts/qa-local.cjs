const{chromium}=require('playwright');const{pathToFileURL}=require('node:url');const path=require('node:path');const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const results=[];fs.mkdirSync('docs/qa-local',{recursive:true});
 for(const[name,url]of[['root-file',pathToFileURL(path.resolve('index.html')).href],['dist-file',pathToFileURL(path.resolve('dist/index.html')).href],['http','http://127.0.0.1:4180/?v=6']]){
  const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[],failed=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  await page.goto(url,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(350);await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  const facts=await page.evaluate(async()=>{await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode().catch(()=>{});}));return{fonts:[...document.fonts].map(font=>({family:font.family,status:font.status})),images:[...document.images].filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src),motion:document.documentElement.classList.contains('motion-enabled'),team:!!document.querySelector('.team-motion'),bundle:[...document.scripts].map(s=>({src:s.src,type:s.type}))};});
  results.push({name,facts,errors,failed});fs.writeFileSync('docs/qa-local/results.json',JSON.stringify(results,null,2));
  assert.deepEqual(errors,[],name);assert.deepEqual(failed,[],name);assert.deepEqual(facts.images,[],name);assert(facts.fonts.every(f=>f.status==='loaded'),name);assert(facts.motion&&facts.team,`${name}: scripts did not initialize`);
  await page.screenshot({path:`docs/qa-local/${name}-desktop.jpg`,quality:85});
  await page.locator('#review-next').click();assert.equal(await page.locator('#review-author').innerText(),'Pamela Contreras Neira');
  const process=await page.locator('.process').evaluate(e=>({top:e.offsetTop,travel:e.offsetHeight-innerHeight}));await page.evaluate(y=>scrollTo(0,y),process.top+process.travel*.9);await page.waitForTimeout(300);assert.equal(await page.locator('.process-step.is-active h3').innerText(),'Trazamos tu plan.');
  const story=await page.locator('.life-story').evaluate(e=>({top:e.offsetTop,travel:e.offsetHeight-innerHeight}));await page.evaluate(y=>scrollTo(0,y),story.top+story.travel);await page.waitForTimeout(300);const last=await page.locator('.life-frame-last').boundingBox();assert(Math.abs(last.x)<3&&Math.abs(last.width-1440)<3&&Math.abs(last.height-900)<3,name);
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:`docs/qa-local/${name}-mobile.jpg`,quality:85});
  await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert(await page.locator('#mobile-menu').evaluate(e=>e.hidden));
  await page.close();console.log(`PASS: ${name} — fonts, photos, menu, reviews and scroll scenes.`);
 }
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
