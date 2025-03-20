import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source (where you develop)
const SOURCE_DIR = path.resolve(__dirname, '../src/components/ui');
// Target (your source of truth repository) 
const TARGET_DIR = path.resolve(__dirname, '../../components/src');

// Check if source directory exists
if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`Source directory ${SOURCE_DIR} does not exist!`);
  process.exit(1);
}

// Create target directory if it doesn't exist
fs.ensureDirSync(TARGET_DIR);

// Copy components from playground to components package
const components = fs.readdirSync(SOURCE_DIR);

if (components.length === 0) {
  console.warn('No components found in source directory!');
  process.exit(0);
}

components.forEach(component => {
  const src = path.join(SOURCE_DIR, component);
  const dest = path.join(TARGET_DIR, component);
  
  if (!fs.statSync(src).isDirectory()) return;
  
  fs.copySync(src, dest);
  console.log(`✅ Saved ${component} to components package`);
});

console.log(`\n🎉 Successfully copied ${components.length} components to packages/components/src`);