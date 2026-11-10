import{writeFileSync}from'node:fs';
const fonts=[
 {name:'instrument-sans',query:'Instrument+Sans:wght@400..700',repo:'instrumentsans'},
 {name:'bricolage-grotesque',query:'Bricolage+Grotesque:opsz,wght@12..96,400..800',repo:'bricolagegrotesque'},
 {name:'lora',query:'Lora:wght@400..700',repo:'lora'},
 {name:'manrope',query:'Manrope:wght@400..800',repo:'manrope'},
];
await Promise.all(fonts.map(async font=>{
 const response=await fetch(`https://fonts.googleapis.com/css2?family=${font.query}&display=swap`,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}});
 if(!response.ok)throw Error(`${font.name}: ${response.status}`);
 const css=await response.text(),faces=css.match(/@font-face\s*\{[^}]+\}/g)||[];
 const face=faces.find(face=>face.includes('U+0000-00FF'))||faces.at(-1);
 const url=face?.match(/url\(([^)]+)\)/)?.[1];if(!url)throw Error(`No Latin source for ${font.name}`);
 const[asset,license]=await Promise.all([fetch(url),fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${font.repo}/OFL.txt`)]);
 if(!asset.ok||!license.ok)throw Error(`Failed font/license: ${font.name}`);
 const bytes=Buffer.from(await asset.arrayBuffer());if(bytes.toString('ascii',0,4)!=='wOF2')throw Error(`Invalid WOFF2: ${font.name}`);
 writeFileSync(`public/fonts/${font.name}-variable.woff2`,bytes);
 writeFileSync(`public/fonts/OFL-${font.name}.txt`,await license.text());
 writeFileSync(`public/fonts/${font.name}-source.css`,css);
 console.log(`${font.name}: ${bytes.length} bytes, Latin WOFF2 and OFL saved`);
}));
