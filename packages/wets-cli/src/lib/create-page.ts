import * as path from 'path';
import * as fs from 'fs-extra';

import { createHtml, createPug, createCss, createTs } from './';
import { nameError, pageExists } from './errors';

export type Tpl = 'html' | 'pug' | 'jsx';

export const createPage = async (
  appPath: string,
  name: string,
  tpl: Tpl,
  title?: string,
) => {
  if (/[^a-z-]+|-$/.test(name)) {
    throw nameError(name);
  }

  const pagePath = path.join(appPath, 'src', 'pages', name);
  if (await fs.pathExists(pagePath)) {
    throw pageExists(name);
  }
  await fs.ensureDir(pagePath);

  const page = path.join(pagePath, `${name}.page.`);

  if (tpl === 'html' || tpl === 'pug') {
    await fs.writeFile(
      page.concat(tpl),
      tpl === 'html' ? createHtml(name, title) : createPug(name, title),
    );
  }
  await fs.writeFile(page.concat('css'), createCss(name));
  await fs.writeFile(
    page.concat(tpl === 'jsx' ? 'tsx' : 'ts'),
    createTs(name, tpl, title),
  );

  const entryFilePath = path.join(appPath, 'src', 'index.ts');
  await fs.ensureFile(entryFilePath);
  const entryFile = await fs.readFile(entryFilePath, 'utf-8');
  const entryFileLines = entryFile.split('\n').filter(line => !!line.trim());
  entryFileLines.push(`export * from './pages/${name}/${name}.page';`);
  entryFileLines.push('');
  await fs.writeFile(entryFilePath, entryFileLines.join('\n'));
};
