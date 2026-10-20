import fs from 'fs';
import path from 'path';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let errors = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const srcMatches = [...content.matchAll(/src=["']([^"']+)["']/g)];
  for (const match of srcMatches) {
    const src = match[1];
    if (src.startsWith('http') || src.startsWith('//') || src.startsWith('data:')) continue;
    const cleanSrc = decodeURIComponent(src.split('?')[0].split('#')[0]);
    const resolved = path.resolve('.', cleanSrc.startsWith('/') ? '.' + cleanSrc : cleanSrc);
    if (!fs.existsSync(resolved)) {
      console.error(`[BROKEN SRC] in ${file}: ${src} -> ${resolved}`);
      errors++;
    }
  }

  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/g)];
  for (const match of hrefMatches) {
    const href = match[1];
    if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('https://wa.me')) continue;
    const cleanHref = decodeURIComponent(href.split('?')[0].split('#')[0]);
    if (!cleanHref) continue;
    const resolved = path.resolve('.', cleanHref.startsWith('/') ? '.' + cleanHref : cleanHref);
    if (!fs.existsSync(resolved)) {
      console.error(`[BROKEN HREF] in ${file}: ${href} -> ${resolved}`);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log('✅ ALL local src and href links are 100% VALID across all HTML files.');
} else {
  console.error(`❌ Found ${errors} broken references.`);
  process.exit(1);
}
