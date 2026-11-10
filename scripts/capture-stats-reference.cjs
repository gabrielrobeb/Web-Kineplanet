const {chromium}=require('playwright');const fs=require('node:fs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const out='docs/reference-stats-8';fs.mkdirSync(out,{recursive:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto('https://pro.reactbits.dev/docs/blocks/stats/stats-8',{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:'Toggle theme',exact:true}).click();
 const iframe=page.locator('iframe[title="Preview"]');await iframe.waitFor({timeout:30000});await iframe.scrollIntoViewIfNeeded();await page.waitForTimeout(2500);
 const frame=iframe.contentFrame();console.log('Public preview:',await frame.locator('body').innerText());
 const geometry=await frame.locator('h1,h2,h3,p,span,svg').evaluateAll(els=>els.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{tag:e.tagName,text:e.tagName==='svg'?null:e.textContent,rect:r.toJSON(),font:s.font,color:s.color,bg:s.background,animation:s.animationName}}));fs.writeFileSync(`${out}/visible-geometry.json`,JSON.stringify(geometry,null,2));
 await iframe.screenshot({path:`${out}/desktop.jpg`,quality:90});
 await page.setViewportSize({width:428,height:1000});await iframe.scrollIntoViewIfNeeded();await page.waitForTimeout(700);await iframe.screenshot({path:`${out}/mobile.jpg`,quality:90});
 console.log('Public elements:',JSON.stringify(geometry).slice(0,6000));
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
