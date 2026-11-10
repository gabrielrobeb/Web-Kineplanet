const{chromium}=require('playwright');const fs=require('node:fs');const sharp=require('sharp');
const out='docs/reference-motion';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 for(const[name,url]of [['fulcrum','https://fulcrumphysio.framer.website/'],['stridewell','https://gleaming-galaxy-812468.framer.app/']]){
  const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});await page.waitForTimeout(2500);
  const headings=await page.locator('h1,h2,h3').evaluateAll(nodes=>nodes.map(n=>({text:n.innerText.replace(/\s+/g,' '),y:Math.round(n.getBoundingClientRect().top+scrollY)})));
  fs.writeFileSync(`${out}/${name}-headings.json`,JSON.stringify(headings,null,2));console.log(name,JSON.stringify(headings));
  if(name==='fulcrum'){
   const frames=[];
   for(const y of [0,180,360,600,900,1250]){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(500);const path=`${out}/fulcrum-${y}.jpg`;await page.screenshot({path,quality:80});frames.push(path);}
   const thumbs=await Promise.all(frames.map(async(path,i)=>({input:await sharp(path).resize({width:480}).toBuffer(),left:i%3*480,top:Math.floor(i/3)*300})));
   await sharp({create:{width:1440,height:600,channels:3,background:'#777'}}).composite(thumbs).jpeg().toFile(`${out}/fulcrum-scroll.jpg`);
  }else{
   for(const[key,pattern]of [['process',/Sixty|four moves/i],['outcomes',/Measured/i],['team',/Five|one team/i]]){
    const h=headings.find(h=>pattern.test(h.text));if(!h)continue;
    const samples=[];
    for(const[k,dy]of [0,400,900,1500,2200,3000].entries()){
     await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),h.y-80+dy);await page.waitForTimeout(450);const path=`${out}/${key}-${k}.jpg`;await page.screenshot({path,quality:80});samples.push(path);
    }
    const thumbs=await Promise.all(samples.map(async(path,i)=>({input:await sharp(path).resize({width:480}).toBuffer(),left:i%3*480,top:Math.floor(i/3)*300})));
    await sharp({create:{width:1440,height:600,channels:3,background:'#777'}}).composite(thumbs).jpeg().toFile(`${out}/${key}-sheet.jpg`);
   }
   const story=page.getByText('Patient stories',{exact:true}).first();if(await story.count()){
    await story.scrollIntoViewIfNeeded();await page.waitForTimeout(500);await page.screenshot({path:`${out}/testimonials.jpg`,quality:85});
    await page.waitForTimeout(2200);await page.screenshot({path:`${out}/testimonials-after.jpg`,quality:85});
   }
  }
  await page.close();
 }
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
