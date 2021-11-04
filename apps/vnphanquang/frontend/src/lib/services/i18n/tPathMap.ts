import type { TFunction } from 'i18next';

import type { DeepObject } from '@vnphanquang/common';
import type { I18NS } from '@vnphanquang/i18n';

export type PathMap = DeepObject<string>;

function getTypeOfVariable(variable: unknown): string {
  if (variable === null) return 'null';
  if (Array.isArray(variable)) return 'array';
  return typeof variable;
}

function extractTranslation<T extends PathMap>(t: TFunction, ns: I18NS, paths: T, ...parentKeys: string[]): T {
  const map: PathMap = {};
  for (const [key, path] of Object.entries(paths)) {
    if(getTypeOfVariable(path) === 'object') {
      map[key] = extractTranslation(t, ns, path as T, ...[...parentKeys, key]);
    } else {
      map[key] = path ? t(`${ns}:${path}`) : '';
    }
  }
  return map as T;
}

export function tPathMap<T extends PathMap>(t: TFunction, ns: I18NS, pathMap: T): T {
  return extractTranslation<T>(t, ns, pathMap);
}
