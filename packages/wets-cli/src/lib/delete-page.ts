import * as path from 'path';
import * as fs from 'fs-extra';

export const deletePage = async (appPath: string, name: string) => {
  await fs.remove(path.join(appPath, 'src', 'pages', name));

  const entryFilePath = path.join(appPath, 'src', 'index.ts');
  await fs.ensureFile(entryFilePath);
  const entryFile = await fs.readFile(entryFilePath, 'utf-8');
  const entryFileLines = entryFile
    .split('\n')
    .filter(line => !!line.trim())
    .filter(line => line.indexOf(`/pages/${name}/`) === -1);
  entryFileLines.push('');
  await fs.writeFile(entryFilePath, entryFileLines.join('\n'));
};
