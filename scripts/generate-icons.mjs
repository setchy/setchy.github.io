// Generates src/styles/icons.css: Font Awesome SVG paths as CSS mask data-URIs.
// Scans src/ for fa-{solid,brands,regular} fa-{name} usages and maps each name
// to the SVG extracted from the installed @fortawesome package.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = `${root}/src`;
const famDir = {
  solid: `${root}/node_modules/@fortawesome/fontawesome-free/svgs/solid`,
  brands: `${root}/node_modules/@fortawesome/fontawesome-free/svgs/brands`,
  regular: `${root}/node_modules/@fortawesome/fontawesome-free/svgs/regular`,
};

// collect icon usages from source
const out = execSync('grep -rhoE "fa-(solid|brands|regular) fa-[a-z0-9-]+" ' + srcDir, { maxBuffer: 10 * 1024 * 1024 }).toString();
const icons = new Map(); // name -> family
for (const m of out.matchAll(/fa-(solid|brands|regular) fa-([a-z0-9-]+)/g)) {
  if (!icons.has(m[2])) icons.set(m[2], m[1]);
}
// manual additions not caught by the two-class grep (e.g. fa-1x, bare classes)
// explicit list to be safe:
const force = {
  'rss': 'solid', 'instagram': 'brands', 'facebook': 'brands', 'github': 'brands',
  'youtube': 'brands', 'linkedin-in': 'brands', 'x-twitter': 'brands', 'untappd': 'brands',
  'moon': 'solid', 'sun': 'solid',
};
for (const [n, f] of Object.entries(force)) if (!icons.has(n)) icons.set(n, f);

const enc = (svg) => 'data:image/svg+xml,' + encodeURIComponent(svg.replace(/<!---?[\s\S]*?-->/g, '').trim());

const missing = [];
let rules = '';
for (const [name, fam] of [...icons.entries()].sort()) {
  const file = `${famDir[fam]}/${name}.svg`;
  let svg = null;
  if (readdirSync(famDir[fam]).includes(`${name}.svg`)) {
    svg = readFileSync(file, 'utf8');
  } else {
    // fallback: try other families
    for (const [f2, d] of Object.entries(famDir)) {
      if (d === famDir[fam]) continue;
      if (readdirSync(d).includes(`${name}.svg`)) {
        svg = readFileSync(`${d}/${name}.svg`, 'utf8');
        break;
      }
    }
  }
  if (!svg) { missing.push(name); continue; }
  rules += `.fa-${name} {\n  -webkit-mask-image: url("${enc(svg)}");\n  mask-image: url("${enc(svg)}");\n}\n\n`;
}

const css = `/* ============================================================
   Generated icon set — Font Awesome SVG paths as CSS masks.
   Rendered with currentColor so icons inherit their element's color.
   Regenerate: node /private/tmp/opencode/gen-icons.mjs
   ============================================================ */
.fa-solid,
.fa-brands {
  display: inline-block;
  width: 1.25em;
  height: 1em;
  background-color: currentColor;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  vertical-align: -0.125em;
}

${rules}`;

writeFileSync(`${root}/src/styles/icons.css`, css);
console.log(`generated icons.css with ${icons.size} icons (${rules.split('\n\n').length - 1} rules)`);
if (missing.length) console.log('MISSING (no svg found):', missing.join(', '));