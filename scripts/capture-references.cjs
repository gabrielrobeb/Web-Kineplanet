const { chromium } = require('playwright');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
 fs.mkdirSync('docs/references', { recursive: true });
 const targets = [ ['foundry','https://www.foundryphysio.com/'], ['stridewell','https://gleaming-galaxy-812468.framer.app/'], ['therapy-care','https://therapy-care-wbs.framer.website/'], ['auvexa','https://auvexa.framer.website/'], ['fulcrum','https://fulcrumphysio.framer.website/'] ];
 for (const [name, url] of targets) {
  const page = await browser.newPage({ viewport: { width:1440, height:900 } });
  try {
   await page.goto(url, { waitUntil:'domcontentloaded', timeout:45000 });
   await page.waitForTimeout(3000);
   await page.screenshot({ path:`docs/references/${name}.jpg`, quality:75 });
   console.log(`${name}: captura guardada`);
  } catch (error) { console.log(`${name}: ${error.message}`); }
  await page.close();
 }
 await browser.close();
})();
