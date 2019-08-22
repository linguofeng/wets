import chalk from 'chalk';

const { red, yellow, green } = chalk;

export const nameError = (name: string) =>
  new Error(
    [
      `${red(name)} 不能包含除了小字字母与减号外的其它字符，且不能以减号结束.`,
      '',
      '正确的例子：',
      '',
      `    $ ${yellow('wets page add')} ${green('login')}`,
      `    $ ${yellow('wets page add')} ${green('login-success')}`,
    ].join('\n'),
  );

export const pageExists = (name: string) =>
  new Error(`${red(name)} 页面已存在.`);
