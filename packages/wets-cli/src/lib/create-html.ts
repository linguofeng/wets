import { formatPageName } from '../utils';

export const createHtml = (name: string, title?: string) => {
  const template = [];
  template.push(`<view class="${name}-page">`);
  template.push(
    `  <text>${title || formatPageName(name).concat(' Page')}</text>`,
  );
  template.push('</view>');
  template.push('');
  return template.join('\n');
};
