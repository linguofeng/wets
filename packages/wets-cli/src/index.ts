#!/usr/bin/env node

import * as program from 'commander';

import start from './start';
import build from './build';

program.version('0.1.0');

program
  .command('start')
  .description('启动wets项目')
  .action(start);

program
  .command('build')
  .option('-p, --prod', '构建为生产环境')
  .description('构建wets项目')
  .action(build);

program.command('page', '页面管理');

program.parse(process.argv);
