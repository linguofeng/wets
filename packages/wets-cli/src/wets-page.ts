import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { Command } from 'commander';
import { prompt } from 'inquirer';

import { createPage, Tpl, deletePage } from './lib';

const { red, green } = chalk;

// tslint:disable-next-line:no-var-requires
const packageJson = require('../package.json');
const root = process.cwd();
const ownPath = path.join(root, 'node_modules', packageJson.name);

const exitWithMessage = (msg: string) => {
  console.log();
  console.log(msg);
  console.log();
  process.exit(1);
};

if (!fs.pathExistsSync(ownPath)) {
  exitWithMessage(`请在 ${red('wets')} 项目里执行.`);
}

const page = new Command('page');

page
  .command('list')
  .description('查看所有页面')
  .action(() => {
    console.log('TBD');
  });

page
  .command('add <pageName>')
  .option('--title [title]', '页面的标题')
  .option(
    '--template <template>',
    '模板文件格式，支持html、pug、jsx，默认html',
    /^(html|pug|jsx)$/i,
    'html',
  )
  .description('新增一个页面')
  .action(
    async (pageName: string, options: { title: string; template: string }) => {
      try {
        await createPage(
          root,
          pageName,
          options.template as Tpl,
          options.title,
        );
      } catch (error) {
        exitWithMessage(error.message);
      }
    },
  );

page
  .command('remove <pageName>')
  .option('-f, --force', '强制删除')
  .description('删除一个页面')
  .action(async (pageName: string, options: { force: boolean }) => {
    const pagePath = path.join(root, 'src', 'pages', pageName);
    if (await fs.pathExists(pagePath)) {
      const { isRemove } = options.force
        ? { isRemove: true }
        : await prompt([
          {
            type: 'confirm',
            name: 'isRemove',
            message: `确定要删除 ${green(pageName)} 页面`,
            default: false,
          },
        ]);
      if (isRemove) {
        console.log(`正在删除 ${green(pageName)} 页面`);
        await deletePage(root, pageName);
        console.log(`删除 ${green(pageName)} 页面成功`);
      }
    } else {
      exitWithMessage(`${red(pageName)} 页面不存在.`);
    }
  });

// page
//   .command('rename <oldName> <newName>')
//   .description('重命名一个页面')
//   .action((_oldName: string, _newName: string) => {
//   });

page.parse(process.argv);
