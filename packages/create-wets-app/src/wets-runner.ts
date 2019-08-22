#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as spawn from 'cross-spawn';
import chalk from 'chalk';

const args = process.argv.slice(2);

const bin = path.join(process.cwd(), 'node_modules', '.bin', 'wets');
if (fs.existsSync(bin)) {
  spawn(bin, args, { stdio: 'inherit' });
} else {
  console.log();
  console.log(`请在 ${chalk.red('wets')} 项目里执行.`);
  console.log();
  process.exit(1);
}
