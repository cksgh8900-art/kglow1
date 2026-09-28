/**
 * Build-time prerender: renders <App/> to static HTML and injects it into
 * dist/index.html so search engines and no-JS crawlers (e.g. Naver Yeti)
 * receive fully-rendered content. React takes over on the client after load.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import App from './src/App';

const distIndex = new URL('./dist/index.html', import.meta.url);

// Render the app to static HTML
let markup = renderToStaticMarkup(React.createElement(App));

// Make prerendered content visible before hydration by stripping
// framer-motion's initial hidden styles (opacity:0 / translate transforms).
markup = markup
  .replace(/opacity:\s*0(?=[;"])/g, 'opacity:1')
  .replace(/transform:\s*translateY\([^)]*\)\s*;?/g, '')
  .replace(/transform:\s*translateX\([^)]*\)\s*;?/g, '');

const tpl = readFileSync(distIndex, 'utf8');
const injected = tpl.replace(
  /<div id="root"><\/div>/,
  `<div id="root">${markup}</div>`
);

if (injected === tpl) {
  console.error('[prerender] WARNING: #root placeholder not found, nothing injected');
  process.exit(1);
}

writeFileSync(distIndex, injected);
console.log(`[prerender] Injected ${markup.length} bytes of prerendered HTML into dist/index.html`);
