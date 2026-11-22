import fs from 'node:fs';
import path from 'node:path';
import { optimize } from 'svgo';
import * as cheerio from 'cheerio';

const ICONS_DIR = path.resolve('icons');
const OUT_DIR = path.resolve('packages/elite-icons-react/src/icons');
const INDEX_FILE = path.resolve('packages/elite-icons-react/src/index.ts');
const DOCS_META = path.resolve('apps/docs/src/iconsMeta.json');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(DOCS_META), { recursive: true });

// Strips spaces, apostrophes, and invalid characters so TypeScript never breaks
const toPascalCase = (str) => {
  const cleaned = str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return /^[0-9]/.test(cleaned) ? `Icon${cleaned}` : cleaned;
};

const svgFiles = fs.readdirSync(ICONS_DIR).filter((f) => f.endsWith('.svg'));
const exportsList = [`export { createEliteIcon } from './createEliteIcon';`];
const metadataList = [];

for (const file of svgFiles) {
  const rawName = path.basename(file, '.svg');
  const componentName = toPascalCase(rawName);
  const rawSvg = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');

  const { data: cleanSvg } = optimize(rawSvg, {
    plugins: ['preset-default', 'removeDimensions'],
  });

  const $ = cheerio.load(cleanSvg, { xmlMode: true });
  const iconNodes = [];
  $('svg')
    .children()
    .each((_, el) => {
      iconNodes.push([el.tagName, el.attribs]);
    });

  const componentCode = `import { createEliteIcon } from '../createEliteIcon';

export const ${componentName} = createEliteIcon('${componentName}', ${JSON.stringify(iconNodes)});
`;
  fs.writeFileSync(path.join(OUT_DIR, `${componentName}.tsx`), componentCode);

  exportsList.push(`export { ${componentName} } from './icons/${componentName}';`);
  metadataList.push({ name: rawName, componentName, svg: cleanSvg });
}

fs.writeFileSync(INDEX_FILE, exportsList.join('\n') + '\n');
fs.writeFileSync(DOCS_META, JSON.stringify(metadataList, null, 2));
console.log(`Generated ${svgFiles.length} EliteIcons.`);
