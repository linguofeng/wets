import * as path from 'path';
import * as fs from 'fs-extra';

import init from '../src/init';

describe('test init', () => {
  it('init html', async () => {
    const appPath = path.join(__dirname, 'html');
    await fs.remove(appPath);
    await fs.ensureDir(appPath);
    await fs.writeFile(path.join(appPath, 'package.json'), '{}');
    await init(appPath, {
      template: 'html',
    });
    await fs.remove(appPath);
  });

  it('init pug', async () => {
    const appPath = path.join(__dirname, 'pug');
    await fs.remove(appPath);
    await fs.ensureDir(appPath);
    await fs.writeFile(path.join(appPath, 'package.json'), '{}');
    await init(appPath, {
      template: 'pug',
    });
    await fs.remove(appPath);
  });

  it('init jsx', async () => {
    const appPath = path.join(__dirname, 'jsx');
    await fs.remove(appPath);
    await fs.ensureDir(appPath);
    await fs.writeFile(path.join(appPath, 'package.json'), '{}');
    await init(appPath, {
      template: 'jsx',
    });
    await fs.remove(appPath);
  });
});
