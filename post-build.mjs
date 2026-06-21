// post-build.mjs
// Copies dist/index.html into each route subdirectory so GitHub Pages
// serves a real HTTP 200 for /about, /products, etc.
// Googlebot and crawlers then see a valid page instead of a 404.

import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = 'dist';
const srcFile = join(distDir, 'index.html');

// All SPA routes that need their own index.html
const routes = [
  'about',
  'products',
  'compliance',
  'logistics',
  'contact',
  'careers',
  'terms',
  'privacy',
  'sitemap',
];

console.log('📄 Post-build: Copying index.html to all route directories...\n');

for (const route of routes) {
  const dir = join(distDir, route);
  const dest = join(dir, 'index.html');

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  copyFileSync(srcFile, dest);
  console.log(`  ✅  dist/${route}/index.html`);
}

console.log('\n✓ All routes now return HTTP 200 to Googlebot.\n');
