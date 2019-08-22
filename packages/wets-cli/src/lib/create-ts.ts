import { formatPageName } from '../utils';

/*
import { Page } from 'wets';

import './home.page.css';
import './home.page.html';

@Page.Conf({
  navigationBarTitleText: 'HomePage',
})
export class HomePage extends Page {
  render() {
    return (
      <view className="home-page">
        <text>Home Page</text>
      </view>
    );
  }
}
*/
/*
import { App } from 'wets';

export class MyApp extends App {
}
*/
export const createTs = (
  name: string,
  tpl: 'html' | 'pug' | 'jsx' | 'app',
  title?: string,
) => {
  const template = [];
  if (tpl === 'app') {
    template.push("import { App } from 'wets';");
    template.push('');
    template.push(`export class ${formatPageName(name)} extends App {`);
    template.push('}');
    template.push('');
  } else {
    template.push("import { Page } from 'wets';");
    template.push('');
    template.push(`import './${name}.page.css';`);
    if (tpl === 'html') {
      template.push(`import './${name}.page.html';`);
    } else if (tpl === 'pug') {
      template.push(`import './${name}.page.pug';`);
    }
    template.push('');
    template.push('@Page.Conf({');
    template.push(
      `  navigationBarTitleText: '${title ||
        formatPageName(name).concat('Page')}',`,
    );
    template.push('})');
    template.push(`export class ${formatPageName(name)}Page extends Page {`);
    if (tpl === 'jsx') {
      template.push('  render() {');
      template.push('    return (');
      template.push(`      <view className="${name}-page">`);
      template.push(`        <text>${formatPageName(name)} Page</text>`);
      template.push('      </view>');
      template.push('    );');
      template.push('  }');
    } else {
      template.push('');
    }
    template.push('}');
    template.push('');
  }
  return template.join('\n');
};
