export const createCss = (name: string) => {
  const template = [];
  template.push(`.${name}-page {`);
  template.push('}');
  template.push('');
  return template.join('\n');
};
