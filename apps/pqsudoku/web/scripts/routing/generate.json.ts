import fs from 'fs';
import path from 'path';

import type { DeepObject } from '../../src/lib/types/DeepObject';

const EXCLUDED_FILES = ['__layout.svelte', '__error.svelte'];
const EXTENSIONS = ['.svelte'];

function extractRouteMapping(inputDir: string, currentPath = '', level = 0): DeepObject<string> {
  const children = fs.readdirSync(inputDir);

  const map: DeepObject<string> = {};

  for (const child of children) {
    const absPath = path.join(inputDir, child);
    const stats = fs.statSync(absPath);

    if (stats.isDirectory()) {
      const nextPath = `${currentPath}/${child}`;
      const childMap = extractRouteMapping(absPath, nextPath, level + 1);
      if (Object.keys(childMap).length) {
        if (!childMap['index']) {
          // if folder does not have a index file,
          // then generate a __path field
          childMap['__path'] = nextPath;
        }
        map[child] = childMap;
      }
    } else {
      if (EXTENSIONS.every((ext) => !child.endsWith(ext))) continue;
      if (EXCLUDED_FILES.includes(child)) continue;

      const routeKey = path.basename(child).replace('.svelte', '');
      let routeName = routeKey;
      if (routeKey === 'index') {
        // no explicit `index`
        routeName = '';
      }
      let nextPath = currentPath;
      if (routeName) {
        nextPath += `/${routeName}`;
      }

      if (!nextPath && level === 0) {
        // root level index route
        nextPath = '/';
      }

      map[routeKey] = nextPath;
    }
  }

  return map;
}


export function generateJSON(inputDir: string, outputDir: string) {
  const map = extractRouteMapping(inputDir);
  const outputPath = path.resolve(outputDir, 'routes.json');
  fs.writeFileSync(
    outputPath,
    JSON.stringify(map, null, 2), // spacing level = 2
    { encoding: 'utf-8' },
  );
}
