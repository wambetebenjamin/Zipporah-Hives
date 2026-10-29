import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
const roots = ['app', 'components', 'lib'];
let failures = 0;
async function check(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) await check(file);
    else if (/\.(tsx?|jsx?)$/.test(item.name)) {
      const text = await readFile(file, 'utf8');
      if (text.includes('\u2014')) { console.error(`${file}: em dash in application source`); failures++; }
      if (/lorem ipsum/i.test(text)) { console.error(`${file}: placeholder copy`); failures++; }
    }
  }
}
for (const root of roots) await check(root);
if (failures) process.exitCode = 1;
else console.log('Copy audit passed.');
