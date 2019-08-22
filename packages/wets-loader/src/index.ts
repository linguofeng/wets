import * as path from 'path';
import * as ts from 'typescript';
import * as tsloader from 'ts-loader';
import * as R from 'ramda';
import { minify } from 'uglify-js';

const relativePath = R.curryN(2, path.posix.relative);

/**
 * 生成代码
 * @param name App | Page | Component
 * @param className 类名
 * @param libPath lib.js的路径
 */
const genCode = (
  name: 'App' | 'Page' | 'Component',
  className: string,
  libPath: string,
) => {
  switch (name) {
    case 'App':
      return minify(`${name}(new (require('${libPath}').${className})());`)
        .code;

    case 'Page':
      return minify(`var config = new (require('${libPath}').${className})();
        if (config.initialData) { config.data = Object.assign({}, config.initialData, config.data); }
        Page(config);`).code;
    case 'Component':
      return minify(`var config = new (require('${libPath}').${className})();
        if (config.initialData) { config.data = Object.assign({}, config.initialData, config.data);}
        if (config.props) { config.properties = Object.assign({}, config.props); }
        Component(config)`).code;
    default:
      return '';
  }
};

// 解析属性的值，有可能是字符串、数字、对象、数据、布尔等
// 支持嵌套解析（递归）
const parsePropertiesValue = R.cond([
  [
    R.propEq('kind', ts.SyntaxKind.NumericLiteral),
    R.compose(
      Number,
      R.prop('text'),
    ),
  ],
  [R.propEq('kind', ts.SyntaxKind.StringLiteral), R.prop('text')],
  [R.propEq('kind', ts.SyntaxKind.TrueKeyword), () => true],
  [R.propEq('kind', ts.SyntaxKind.FalseKeyword), () => false],
  [
    R.propEq('kind', ts.SyntaxKind.ObjectLiteralExpression),
    R.compose(
      R.mergeAll,
      R.map(({ name: { text: key }, initializer }) => ({
        [key]: parsePropertiesValue(initializer),
      })),
      R.prop('properties'),
    ),
  ],
  [
    R.propEq('kind', ts.SyntaxKind.ArrayLiteralExpression),
    R.compose(
      R.map(it => parsePropertiesValue(it)),
      R.prop('elements'),
    ),
  ],
  [R.T, R.identity],
]);

// 解析属性
const parseProperties = R.compose(
  R.mergeAll,
  R.flatten,
  R.map(({ name: { text: key }, initializer }) => ({
    [key]: parsePropertiesValue(initializer),
  })),
  R.flatten,
  R.map(R.prop('properties')),
);

// 解析装饰模式
const parseDecorator = (decoratorName: string) =>
  R.compose(
    R.mergeAll,
    R.map((data: any) => ({
      ...data,
      args: parseProperties(data.args),
    })),
    R.filter(R.propEq('name', decoratorName)),
    R.map(
      ({
        pos,
        end,
        expression: {
          expression: { text, name },
          arguments: args,
        },
      }) => ({
        pos,
        end,
        name: text || name.text,
        args,
      }),
    ),
  );

const parser = (name: string) =>
  R.compose<any, any, any, any, any>(
    R.head,
    R.map(({ name: { text: className }, decorators }) => ({
      className,
      decorator: decorators ? parseDecorator(name)(decorators) : null,
    })),
    R.filter(R.propEq('kind', ts.SyntaxKind.ClassDeclaration)),
    R.prop('statements'),
  );

/**
 * 解析entry获取pages
 */
const getPages = R.compose(
  R.map(path.dirname),
  R.match(/pages[\/a-z-]+/g),
  ts.sys.readFile,
);

/**
 * 获取当前page的路径
 */
const getPagePath = R.compose<string, string, string, string[], string>(
  R.head,
  R.match(/pages[\/a-z-]+/),
  R.replace(/\\/g, '/'),
  path.dirname,
);

module.exports = function(source) {
  const cwd = path.dirname(this.resourcePath);
  if (R.test(/app\.tsx?$/, this.resourcePath)) {
    // 生成`app.json`
    const sourceFile = ts.createSourceFile(
      this.resourcePath,
      source,
      ts.ScriptTarget.ES2017,
      false,
    );
    const { className, decorator } = parser('Conf')(sourceFile);

    const config = decorator ? decorator.args : {};
    const pages = getPages(this._compilation.options.entry);
    this.emitFile(
      'app.json',
      JSON.stringify(
        R.mergeWith(
          R.concat,
          { pages },
          R.pipe(
            R.dissoc('ext'),
            R.dissoc('index'),
          )(config),
        ),
        null,
        2,
      ),
    );

    // 第三方平台配置 ext.json
    if (config.ext) {
      this.emitFile(
        'ext.json',
        JSON.stringify(
          {
            extEnable: true,
            extAppid: config.ext.appid,
            ext: config.ext.config,
            extPages: config.ext.pages,
          },
          null,
          2,
        ),
      );
    }

    // 生成`app.js`
    const libPath = relativePath(cwd, this._compilation.options.output.filename).slice(3);
    this.emitFile('app.js', genCode('App', className, libPath));

    // 删除@App.Conf({...})
    if (decorator && decorator.pos && decorator.end) {
      source = source.slice(0, decorator.pos) + source.slice(decorator.end);
    }
  } else if (R.test(/[a-z-]+\.page\.tsx?$/, this.resourcePath)) {
    const sourceFile = ts.createSourceFile(
      this.resourcePath,
      source,
      ts.ScriptTarget.ES2017,
      false,
    );
    const { className, decorator } = parser('Conf')(sourceFile);

    // PageConfig
    const config = decorator ? decorator.args : null;

    // src/pages/home/home.ts => pages/home
    // src/pages/pay/result/index.page.ts => pages/pay/result
    const pagePath = getPagePath(this.resourcePath);
    if (!pagePath) {
      throw new Error(`${this.resourcePath} 不在\`pages\`目录下!!`);
    }

    // 生成`page.js`文件
    const libPath = relativePath(pagePath, this._compilation.options.output.filename).slice(
      3,
    );
    this.emitFile(`${pagePath}.js`, genCode('Page', className, libPath));

    // 生成`page.json`配置文件
    if (config && Object.keys(config).length > 0) {
      this.emitFile(`${pagePath}.json`, JSON.stringify(config, null, 2));
    }

    // 删除`@Page.Conf({...})`
    if (decorator && decorator.pos && decorator.end) {
      source = source.slice(0, decorator.pos) + source.slice(decorator.end);
    }
  } else if (
    R.test(/components\/.*\.tsx?$/, this.resourcePath.replace(/\\/g, '/'))
  ) {
    tsloader.call(this, '');
    return;
  }

  tsloader.call(this, source);
};
