import fs from 'fs';
import path from 'path';

import { generateJSON } from './generate.json';
import { generateTypescript } from './generate.ts';

function operation(inputDir: string, outputDir: string): void {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  generateJSON(inputDir, outputDir);
  generateTypescript(outputDir);
}

const inputDir = path.resolve(__dirname, '../../src/routes');
const outputDir = path.resolve(__dirname, '../../src/lib/generated/routing');

operation(inputDir, outputDir);
