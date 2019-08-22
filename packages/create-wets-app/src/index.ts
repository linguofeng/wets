#!/usr/bin/env node

import * as path from 'path';
import * as fs from 'fs-extra';
import { Command } from 'commander';
import chalk from 'chalk';
import * as validateProjectName from 'validate-npm-package-name';
import * as spawn from 'cross-spawn';

const { cyan, green, red } = chalk;

const packageJson = require('../package.json');

let projectName;

const program = new Command('create-wets-app')
  .version(packageJson.version)
  .arguments('<project-directory>')
  .option('--template <template>', '模板文件格式，支持html与pug，默认html', /^(html|pug)$/i, 'html')
  .usage(`${green('<project-directory>')}`)
  .action(name => projectName = name)
  .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${cyan(program.name())} ${green('<project-directory>')}`,
  );
  console.log();
  console.log('For example:');
  console.log(`  ${cyan(program.name())} ${green('my-react-app')}`);
  console.log();
  console.log(
    `Run ${cyan(`${program.name()} --help`)} to see all options.`,
  );
  process.exit(1);
}

const printValidationResults = (results: string[]) => {
  if (typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(red(`  *  ${error}`));
    });
  }
};

const checkAppName = appName => {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.error(
      `Could not create a project called ${red(
        `"${appName}"`,
      )} because of npm naming restrictions:`,
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }
};

const isSafeToCreateProjectIn = root => {
  const validFiles = [
    '.DS_Store',
    'Thumbs.db',
    '.git',
    '.gitignore',
    '.idea',
    'README.md',
    'LICENSE',
    'web.iml',
    '.hg',
    '.hgignore',
    '.hgcheck',
  ];
  return fs.readdirSync(root).every(file => validFiles.indexOf(file) >= 0);
};

const install = dependencies => new Promise((resolve, reject) => {
  const args = ['add', '--dev'];
  spawn('yarn', args.concat(dependencies), { stdio: 'inherit' })
    .on('close', code => {
      if (code !== 0) {
        reject({
          command: `yarn ${args.join(' ')}`,
        });
        return;
      }
      resolve();
    });
});

const createApp = async name => {
  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(appName);

  await fs.ensureDir(name);

  if (!isSafeToCreateProjectIn(root)) {
    console.log(
      `The directory ${green(name)} contains files that could conflict.`,
    );
    console.log('Try using a new directory name.');
    process.exit(1);
  }

  console.log(`Creating a new wets app in ${green(root)}.`);
  console.log();

  await fs.writeFile(
    path.join(root, 'package.json'),
    JSON.stringify({
      name: appName,
      version: '0.1.0',
      private: true,
    }, null, 2),
  );

  process.chdir(root);

  try {
    await install(['typescript', 'tslib', 'wets', 'wets-types', 'wets-cli']);
    const init = await import(path.resolve(process.cwd(), 'node_modules', 'wets-cli', 'dist', 'init.js'));
    await init.default(root, {
      template: program.template,
    });
  } catch (error) {
    if (error.command) {
      console.log(`  ${cyan(error.command)} has failed.`);
    }
    console.error(error);
    process.exit(1);
  }
};

createApp(projectName);
