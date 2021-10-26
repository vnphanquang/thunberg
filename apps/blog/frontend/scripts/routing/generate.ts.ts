/* eslint-disable no-useless-escape */
import fs from 'fs';
import path from 'path';

export function generateTypescript(outputDir: string) {
  const outputPath = path.resolve(outputDir, 'index.ts');

  const ts =
`export { default as AppRoutes } from './routes.json';

export function route(path: string, ...args: string[]): string {
  const params = path.match(/\[[a-zA-Z]+\]/g) ?? [];
  for (const i in params) {
    path = path.replace(params[i], args[i]);
  }
  return path;
}
`;

  fs.writeFileSync(
    outputPath,
    ts,
    { encoding: 'utf-8' },
  );
}
