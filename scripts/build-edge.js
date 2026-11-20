/**
 * Build script to generate the ArvanCloud Edge Computing bundle.
 * Embeds dist/index.html into edge/worker.js and writes dist/edge-worker.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
const workerTemplatePath = path.join(rootDir, 'edge', 'worker.js');
const outputWorkerPath = path.join(rootDir, 'dist', 'edge-worker.js');

if (!fs.existsSync(distHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Please run "npm run build" first.');
  process.exit(1);
}

if (!fs.existsSync(workerTemplatePath)) {
  console.error(`Error: Edge worker template not found at ${workerTemplatePath}`);
  process.exit(1);
}

const htmlContent = fs.readFileSync(distHtmlPath, 'utf8');
const workerTemplate = fs.readFileSync(workerTemplatePath, 'utf8');

// Escape backticks and ${} expressions in HTML so template string in JS stays valid
const escapedHtml = htmlContent
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\${/g, '\\${');

let bundledWorker = workerTemplate.replace('__INJECT_INDEX_HTML__', escapedHtml);

// If ORIGIN_URL environment variable is provided, inject it into the worker
const originUrl = process.env.ORIGIN_URL ? process.env.ORIGIN_URL.trim().replace(/\/+$/, '') : null;
if (originUrl) {
  bundledWorker = bundledWorker.replace(
    /const ORIGIN_URL = ['"][^'"]*['"];/,
    `const ORIGIN_URL = '${originUrl}';`
  );
}

// Ensure dist directory exists
if (!fs.existsSync(path.join(rootDir, 'dist'))) {
  fs.mkdirSync(path.join(rootDir, 'dist'), { recursive: true });
}

fs.writeFileSync(outputWorkerPath, bundledWorker, 'utf8');

const stats = fs.statSync(outputWorkerPath);
console.log(` ArvanCloud Edge Worker bundle generated successfully:`);
console.log(`   Path: ${outputWorkerPath}`);
console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
if (originUrl) {
  console.log(`   Injected ORIGIN_URL: ${originUrl}`);
}
