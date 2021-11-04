/**
 *
 * Clone all i18n locale translation files recursively and
 * replace translation values with object path to actual property.
 * For use with t function of i18next
 *
 * Ex:
 * ```diff
 * -    t('login.auth.welcome')
 *
 * +    import tLogin from '@generated/i18n/views/login.json'
 * +    //...later
 * +    t(tLogin.auth.welcome)
 * ```
 */

import fs from 'fs';
import path from 'path';
import type { DeepObject } from '@vnphanquang/common';

function getTypeOfVariable(variable: unknown): string {
  if (variable === null) return 'null';
  if (Array.isArray(variable)) return 'array';
  return typeof variable;
}

function extractObjectPathMap<T>(object: DeepObject<T>, ...parentKeys: string[]): DeepObject<string> {
  const map: DeepObject<string> = {};
  for (const [key, value] of Object.entries(object)) {
    if (getTypeOfVariable(value) === 'object') {
      map[key] = extractObjectPathMap(value as DeepObject<T>, ...[...parentKeys, key]);
    } else {
      map[key] = [...parentKeys, key].join('.');
    }
  }
  return map;
}
function op(inputDir: string, outputDir: string): void {
  const children = fs.readdirSync(inputDir);
  if (children.length && !fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  for (const child of children) {
    const absPath = path.join(inputDir, child);
    const stats = fs.statSync(absPath);
    if (stats.isDirectory()) {
      op(absPath, path.join(outputDir, child));
    } else if (stats.isFile() && path.extname(child) === '.json') {
      const jsonRaw = fs.readFileSync(absPath, { encoding: 'utf-8' });
      const jsonObject = JSON.parse(jsonRaw);
      const pathMap = extractObjectPathMap(jsonObject);
      const outputPath = path.join(outputDir, child);
      fs.writeFileSync(
        outputPath,
        JSON.stringify(pathMap, null, 2), // spacing level = 2
        { encoding: 'utf-8' },
      );
      // console.log(pathMap, outputPath);
    }
  }
}

const inputDir = path.resolve(__dirname, '../../', './src/locales/en');
const outputDir = path.resolve(__dirname, '../../', './src/generated');
op(inputDir, outputDir);
