import { formatPageName } from '../utils';

export const createPug = (name: string, title?: string) => {
  const template = [];
  template.push(`view.${name}-page`);
  template.push(`  text ${title || formatPageName(name).concat(' Page')}`);
  template.push('');
  return template.join('\n');
};
