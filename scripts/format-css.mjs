import { readFileSync, writeFileSync } from 'node:fs';
const input = readFileSync('src/styles.css', 'utf8')
 .replace(/\/\* taste-skill-ignore:[\s\S]*?\*\//g, '')
 .replace(/\n[\t ]+/g, '\n');
let output = '', depth = 0, quote = '', comment = false;
const newline = () => { output = output.trimEnd() + '\n' + '  '.repeat(Math.max(0,depth)); };
for (let i=0;i<input.length;i++) {
 const char=input[i], next=input[i+1];
 if (comment) { output+=char; if(char==='*'&&next==='/'){output+=next;i++;comment=false;newline();} continue; }
 if (quote) { output+=char; if(char===quote&&input[i-1]!=='\\')quote='';continue; }
 if(char==='/'&&next==='*'){comment=true;output+='/*';i++;continue;}
 if(char==='"'||char==="'"){quote=char;output+=char;continue;}
 if(char==='{'){output=output.trimEnd()+' {';depth++;newline();}
 else if(char==='}'){depth--;newline();output+='}';newline();}
 else if(char===';'){output+=';';newline();}
 else if(char==='\n'||char==='\r'){if(!output.endsWith('\n')&&!/\n\s*$/.test(output))output+=' ';}
 else output+=char;
}
writeFileSync('src/styles.css',output.trimEnd()+'\n');
