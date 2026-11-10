const{chromium}=require('playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 fs.mkdirSync('docs/qa-v3',{recursive:true});
 await page.goto('http://127.0.0.1:4180/?v=3',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
 const go=async(selector,progress=0)=>{await page.evaluate(({selector,progress})=>{const el=document.querySelector(selector);scrollTo(0,el.getBoundingClientRect().top+scrollY+(el.offsetHeight-innerHeight)*progress)},{selector,progress});await page.waitForTimeout(180)};
 const screenshot=async(name)=>page.screenshot({path:`docs/qa-v3/${name}.jpg`,quality:85});
 const facts={loader:await page.locator('.intro-loader').count(),frames:await page.locator('.life-frame').count(),sections:await page.locator('main>section').evaluateAll(els=>els.map(e=>e.className))};
 await screenshot('hero-initial');await go('.hero',.5);await screenshot('hero-middle');await go('.hero',1);await screenshot('hero-full');
 await page.locator('.trust-strip').scrollIntoViewIfNeeded();await screenshot('trust-benefits');
 await page.locator('.specialties').scrollIntoViewIfNeeded();await screenshot('services');
 facts.process=[];
 for(const p of [.1,.35,.6,.9]){await go('.process',p);facts.process.push(await page.locator('.process-step.is-active h3').innerText());await screenshot(`process-${p}`)}
 await page.locator('.everyday').scrollIntoViewIfNeeded();await screenshot('everyday');
 await go('.life-story',0);await screenshot('story-phrase');await page.waitForTimeout(2200);await screenshot('story-bold');
 for(const p of [.25,.45,.6,.78,.98]){await go('.life-story',p);await screenshot(`story-${p}`)}
 await go('.team');await screenshot('team');await page.locator('.team-panel').nth(1).click();await page.waitForTimeout(750);await screenshot('team-second');
 await go('.testimonials');await page.waitForTimeout(2800);await screenshot('testimonials');facts.pain=await page.locator('#pain-current').innerText();
 await page.locator('#review-next').click();facts.review=await page.locator('#review-author').innerText();
 facts.sizes=[];
 for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);const result=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+2&&getComputedStyle(e).position!=='absolute'&&!e.closest('.life-story')}).map(e=>e.className).slice(0,10)}));facts.sizes.push(result);if(width===390){await screenshot('mobile-hero');for(const sel of ['.care-intro','.process','.everyday','.life-story','.team','.testimonials']){await page.locator(sel).scrollIntoViewIfNeeded();await screenshot(`mobile-${sel.slice(1)}`)}}}
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(150);facts.reduced=await page.locator('.process').evaluate(e=>({height:e.offsetHeight,window:innerHeight,position:getComputedStyle(e.firstElementChild).position}));
 await page.locator('.life-story').scrollIntoViewIfNeeded();await screenshot('reduced-gallery');
 facts.errors=errors;fs.writeFileSync('docs/qa-v3/results.json',JSON.stringify(facts,null,2));console.log(JSON.stringify(facts,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
