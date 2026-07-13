#!/usr/bin/env node
/*
 * Wersjonowanie zasobów (cache-busting) dla statycznego landing page'a.
 *
 * Skrypt nie wymaga żadnych zależności (czysty Node). Przechodzi po wskazanych
 * plikach (HTML/CSS), znajduje odwołania do lokalnych zasobów (styles.css,
 * main.js oraz obrazków w assets/) i dopisuje do nich parametr `?v=<hash>`,
 * gdzie `<hash>` to skrót treści danego pliku. Dzięki temu po każdej zmianie
 * treści pliku zmienia się też jego URL — przeglądarka i CDN są zmuszone
 * pobrać nową wersję, a niezmienione pliki nadal korzystają z cache.
 *
 * Operacja jest idempotentna: istniejący parametr `?v=` jest usuwany przed
 * policzeniem nowego, więc skrypt można uruchamiać wielokrotnie.
 *
 * Źródła w repo pozostają „czyste" (bez hashy) — skrypt uruchamiany jest
 * w pipeline GitHub Actions tuż przed deployem (patrz .github/workflows/static.yml).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;

// Pliki, w których przepisujemy odwołania do zasobów.
const FILES_TO_PROCESS = ['index.html', 'styles.css'];

// Identyfikator wdrożenia służy osadzonej stronie do wykrywania nowej wersji
// bez konieczności zmieniania adresu src po stronie właściciela iframe.
const sourceVersion = process.env.GITHUB_SHA || ['index.html', 'styles.css', 'main.js']
  .map(file => fs.readFileSync(path.join(ROOT, file)))
  .reduce((hash, content) => hash.update(content), crypto.createHash('sha256'))
  .digest('hex');
const appVersion = sourceVersion.slice(0, 12);

// Krótki, deterministyczny skrót treści pliku.
const hashCache = new Map();
function hashOf(absPath) {
  if (hashCache.has(absPath)) return hashCache.get(absPath);
  const buf = fs.readFileSync(absPath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 10);
  hashCache.set(absPath, hash);
  return hash;
}

// Czy ścieżka jest lokalna (a nie http(s), //, #, data:, mailto: itp.)?
function isLocalAsset(ref) {
  return /^(styles\.css|main\.js|assets\/[^"')?#]+)/.test(ref);
}

// Dopisuje ?v=<hash> do lokalnej ścieżki, usuwając wcześniejszy parametr query.
function versionize(ref) {
  const pathPart = ref.replace(/[?#].*$/, '');         // sama ścieżka pliku
  const fragMatch = ref.match(/#.*$/);                 // zachowaj fragment (#...)
  const fragment = fragMatch ? fragMatch[0] : '';

  const absPath = path.join(ROOT, pathPart);
  if (!fs.existsSync(absPath)) return ref; // brak pliku — zostaw bez zmian

  return `${pathPart}?v=${hashOf(absPath)}${fragment}`;
}

function versionizeSrcset(srcset) {
  return srcset.split(',').map(candidate => {
    const trimmed = candidate.trim();
    if (!trimmed) return candidate;

    const parts = trimmed.split(/\s+/);
    const ref = parts.shift();
    if (!isLocalAsset(ref)) return candidate;

    return [versionize(ref), ...parts].join(' ');
  }).join(', ');
}

function processFile(file) {
  const absFile = path.join(ROOT, file);
  let content = fs.readFileSync(absFile, 'utf8');
  let count = 0;

  // 1) Atrybuty HTML: href="..." / src="..." / srcset="..."
  content = content.replace(/\b(href|src|srcset)=("|')([^"']+)\2/g, (m, attr, q, ref) => {
    if (!isLocalAsset(ref)) return m;
    count++;
    const nextRef = attr === 'srcset' ? versionizeSrcset(ref) : versionize(ref);
    return `${attr}=${q}${nextRef}${q}`;
  });

  // 2) CSS url(...) — z apostrofami, cudzysłowami lub bez.
  content = content.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m, q, ref) => {
    if (!isLocalAsset(ref)) return m;
    count++;
    return `url(${q}${versionize(ref)}${q})`;
  });

  if (file === 'index.html') {
    content = content.replace(
      /(<meta name="app-version" content=")[^"]+(" \/>)/,
      `$1${appVersion}$2`
    );
  }

  fs.writeFileSync(absFile, content);
  console.log(`  ${file}: zwersjonowano ${count} odwołań`);
}

console.log('Wersjonowanie zasobów (cache-busting)…');
for (const file of FILES_TO_PROCESS) {
  processFile(file);
}
fs.writeFileSync(
  path.join(ROOT, 'version.json'),
  `${JSON.stringify({ version: appVersion })}\n`
);
console.log(`  version.json: wersja ${appVersion}`);
console.log('Gotowe.');
