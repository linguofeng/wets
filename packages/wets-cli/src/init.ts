import * as path from 'path';
import * as fs from 'fs-extra';

import { createApp, createPage } from './lib';

type TemplateType = 'html' | 'pug' | 'jsx';

export interface InitOption {
  appName?: string;
  template: TemplateType;
}

export default async (appPath: string, options: InitOption) => {
  const appPackage = await require(path.resolve(appPath, 'package.json'));

  appPackage.scripts = {
    start: 'wets start',
    build: 'wets build',
    'build:prod': 'wets build -p',
  };

  await fs.writeFile(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2),
  );

  await fs.copy(path.join(__dirname, '..', 'template'), appPath);
  await fs.move(
    path.join(appPath, 'gitignore'),
    path.join(appPath, '.gitignore'),
  );

  await createApp(appPath, options.appName || 'MyApp');
  await createPage(appPath, 'home', options.template);
};
