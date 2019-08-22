import * as path from 'path';
import * as fs from 'fs-extra';

import { createTs } from './';

export const createApp = async (appPath: string, name: string) => {
  await fs.ensureDir(path.join(appPath, 'src'));
  await fs.writeFile(
    path.join(appPath, 'src', 'app.ts'),
    createTs(name, 'app'),
  );

  const entryFilePath = path.join(appPath, 'src', 'index.ts');
  await fs.ensureFile(entryFilePath);
  const entryFile = await fs.readFile(entryFilePath, 'utf-8');
  const entryFileLines = entryFile.split('\n').filter(line => !!line.trim());
  entryFileLines.push(`export * from './app';`);
  entryFileLines.push('');
  await fs.writeFile(entryFilePath, entryFileLines.join('\n'));
};
