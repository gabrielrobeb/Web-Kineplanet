const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4180',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  assert(await page.evaluate(()=>document.fonts.check('17px "Cabinet Grotesk"')&&document.fonts.check('60px Newsreader')));
  assert.equal(await page.evaluate(()=>window.ScrollTrigger.getAll().length),2);
  const sections=await page.locator('main>section').evaluateAll(nodes=>nodes.map(node=>node.classList[0]));
  assert.deepEqual(sections,['hero','care-intro','specialties','complementary','process','everyday','life-story','team','testimonials','practical','faq','closing']);
  const fullText=await page.locator('main').innerText();assert(!fullText.includes('haceque'));
  const glyphs=await page.locator('.service-toggle,.extra-sign,.team-plus,.hero-actions>*>span,.review-controls>button').evaluateAll(nodes=>nodes.filter(node=>/[↗→←↓↑+]/.test(node.textContent)).length);
  assert.equal(glyphs,0);
  const sizes=[];
  for(const [name,width,height]of [['desktop',1440,900],['tablet',768,1024],['mobile',390,844],['small',320,740]]){
   await page.setViewportSize({width,height});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(250);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),name+' overflow');
   const headings=await page.locator('h1,h2').evaluateAll(nodes=>nodes.map(node=>{
    const positions=[];const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
     if(!walker.currentNode.textContent.trim())continue;
     const range=document.createRange();range.selectNodeContents(walker.currentNode);
     for(const rect of range.getClientRects())if(rect.width>0&&!positions.some(top=>Math.abs(top-rect.top)<3))positions.push(rect.top);
    }
    return{text:node.innerText,lines:positions.length};
   }));
   assert.equal(headings[0].lines,2,name+' hero');
   if(width===768)assert(headings.every(h=>h.lines<=2),JSON.stringify(headings.filter(h=>h.lines>2)));
   sizes.push({name,width,headings});
   await page.screenshot({path:`docs/qa/${name}-hero.jpg`,quality:85});
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);
  assert.equal(await page.evaluate(()=>window.ScrollTrigger.getAll().length),0);
  assert.deepEqual(errors,[]);
  fs.writeFileSync('docs/qa/refinement.json',JSON.stringify({sections,sizes,errors,gsap:'Two triggers on desktop; none with reduced motion',fonts:'Newsreader and Cabinet Grotesk loaded'},null,2));
  console.log('PASS: Same 12 sections and content. New local fonts loaded. Two GSAP triggers; none in reduced motion. SVG controls. No overflow at four widths. Hero in two lines. Tablet headings checked.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
