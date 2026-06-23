// post-build.mjs
// Copies dist/index.html into each route subdirectory so GitHub Pages
// serves a real HTTP 200 for /about, /products, etc.
// Injects route-specific SEO titles, descriptions, and canonical URLs
// so Googlebot and crawlers see optimized metadata immediately.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = 'dist';
const srcFile = join(distDir, 'index.html');

if (!existsSync(srcFile)) {
  console.error(`❌ Error: ${srcFile} not found. Build project first.`);
  process.exit(1);
}

const template = readFileSync(srcFile, 'utf8');

// Route-specific metadata mapping (matches App.jsx)
const routeMetadata = {
  about: {
    title: 'Our Story & Leadership | Opésh Overseas',
    description: 'Learn about Opésh Overseas, our Delhi corporate desk, Bhilwara sourcing and logistics hub, direct-to-source principles, and leadership team.',
  },
  products: {
    title: 'Export Product Catalog | Opésh Overseas',
    description: 'Explore our verified export catalog of certified herbal extracts, organic moringa, Makrana marble plates, hand-cast brassware, and handcrafted textiles.',
  },
  compliance: {
    title: 'Quality & Trade Certifications | Opésh Overseas',
    description: 'View our trade certifications including IEC, MSME, FSSAI, ISO 22000, and GMP compliance. Standard batch Certificates of Analysis and lab audits.',
  },
  logistics: {
    title: 'Sourcing & Shipping Logistics | Opésh Overseas',
    description: 'Learn about our B2B shipping logistics, packaging standards at Bhilwara, and port transit timelines to Mundra and Nhava Sheva (JNPT).',
  },
  contact: {
    title: 'Request B2B Quote & Sourcing | Opésh Overseas',
    description: 'Initiate B2B procurement. Contact our Delhi corporate desk or Bhilwara sourcing office for FOB/CIF quotes on Ayurveda, textiles, and handicrafts.',
  },
  careers: {
    title: 'Careers & Partnerships | Opésh Overseas',
    description: 'Join our growing global export team and sourcing specialists network in Delhi, Bhilwara, and manufacturing hubs across India.',
  },
  terms: {
    title: 'Terms & Conditions | Opésh Overseas',
    description: 'Read the terms of service, B2B contract guidelines, liability provisions, and legal jurisdiction of Opésh Overseas under Bhilwara, Rajasthan.',
  },
  privacy: {
    title: 'Privacy Policy | Opésh Overseas',
    description: 'Understand how we protect corporate buyer data, communication logs, specification sheets, and inquiry history at Opésh Overseas.',
  },
  sitemap: {
    title: 'Sitemap | Opésh Overseas',
    description: 'Full directory of pages, export categories, and trade compliance documents of Opésh Overseas.',
  },
};

const defaultDesc = "Premier B2B export house with corporate offices in Delhi and sourcing operations in Bhilwara, Rajasthan, connecting India's finest Ayurveda, textiles, and handicrafts with global buyers.";

console.log('📄 Post-build: Generating optimized index.html files for all routes...\n');

for (const [route, meta] of Object.entries(routeMetadata)) {
  const dir = join(distDir, route);
  const dest = join(dir, 'index.html');

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const canonicalUrl = `https://opeshoverseas.com/${route}`;

  let html = template;

  // 1. Inject canonical and OG URL
  html = html.replace(
    '<link rel="canonical" href="https://opeshoverseas.com/" />',
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    '<meta property="og:url" content="https://opeshoverseas.com/" />',
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    '<meta property="twitter:url" content="https://opeshoverseas.com/" />',
    `<meta property="twitter:url" content="${canonicalUrl}" />`
  );

  // 2. Inject Page Title
  html = html.replace(
    '<title>Opésh Overseas | Premier B2B Sourcing & Global Export House</title>',
    `<title>${meta.title}</title>`
  );
  html = html.replace(
    '<meta property="og:title" content="Opésh Overseas | Premier B2B Sourcing & Global Export House" />',
    `<meta property="og:title" content="${meta.title}" />`
  );
  html = html.replace(
    '<meta property="twitter:title" content="Opésh Overseas | Premier B2B Sourcing & Global Export House" />',
    `<meta property="twitter:title" content="${meta.title}" />`
  );

  // 3. Inject Page Description
  html = html.replace(
    `<meta name="description" content="${defaultDesc}" />`,
    `<meta name="description" content="${meta.description}" />`
  );
  html = html.replace(
    `<meta property="og:description" content="${defaultDesc}" />`,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    `<meta property="twitter:description" content="${defaultDesc}" />`,
    `<meta property="twitter:description" content="${meta.description}" />`
  );

  writeFileSync(dest, html, 'utf8');
  console.log(`  ✅  dist/${route}/index.html (SEO optimized)`);
}

console.log('\n✓ All routes generated and SEO-optimized successfully.\n');

