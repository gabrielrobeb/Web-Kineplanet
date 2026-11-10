const{chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:768,height:1024}});
 await page.goto('http://127.0.0.1:4180',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 for(const[name,selector]of[['tablet-services','.specialties'],['tablet-team','.team']]){
  await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(750);await page.screenshot({path:`docs/qa/${name}.jpg`,quality:85});
 }
 await page.setViewportSize({width:1440,height:900});await page.locator('.care-intro').scrollIntoViewIfNeeded();await page.waitForTimeout(750);await page.screenshot({path:'docs/qa/desktop-intro-final.jpg',quality:85});
 console.log('Capturas finales guardadas.');
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exitCode=1});
