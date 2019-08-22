import * as path from 'path';
import * as ts from 'typescript';
import * as tsloader from 'ts-loader';
import * as R from 'ramda';
import * as fs from 'fs';
import * as acorn from 'acorn-jsx';
import * as walk from 'acorn/dist/walk';
import * as loaderUtils from 'loader-utils';
import { html as htmlBeautify } from 'js-beautify';

import walkers, { isConstValue, parseRenderDataConst } from './walks';
import { transformEleTOComponent } from './components';
import { write } from './utils/log';

/**
 * 处理member
 * @returns
 */
function parseMember() {
  return R.map(({ name: { text }, body, type, kind, pos, end }) => ({
    name: text,
    type,
    body,
    kind,
    pos,
    end,
  }));
}

/**
 * 获取类成员
 * @param name
 */
function getMember(name: string) {
  return R.compose<any, any, any, any>(
    // R.prop('body'),
    R.head,
    R.filter(R.propEq('name', name)),
    R.prop('members'),
  );
}

/**
 * 处理class
 * @param {String} [name]
 * @returns
 */
function parseClassNode() {
  return R.compose<any, any, any, any, any>(
    R.head,
    R.map(({ name: { text: className }, decorators, members }) => ({
      className,
      members: members && parseMember()(members),
    })),
    R.filter(R.propEq('kind', ts.SyntaxKind.ClassDeclaration)),
    R.prop('statements'),
  );
}

function parseImportLines() {
  return R.compose<any, any, any>(
    R.filter(R.propEq('kind', ts.SyntaxKind.ImportDeclaration)),
    R.prop('statements'),
  );
}

/**
 * 获取当前page的路径
 */
const getPagePath = R.compose<string, string, string, string[], string>(
  R.head,
  R.match(/pages[\/a-z-]+/),
  R.replace(/\\/g, '/'),
  path.dirname,
);

/**
 * 生成语法树并遍历
 * 输出结构树
 * @param {string} code
 * @returns
 */
function walkCode(code: string, filePath: string) {
  const ast = acorn.parse(code, {
    plugins: { jsx: true },
  });

  write('ast.json', ast);

  const state = {
    ele: null,
    data: {}, // page data
    renderData: {}, // render中data
    root: true,
    constants: {}, // 全局常量
    filePath,
    components: {},
  };

  walk.simple(ast, {}, walkers, state);

  write('tree.json', state);

  transformEleTOComponent(state.ele, state.components, state);

  state.renderData = parseRenderDataConst(state.renderData);

  write('tree-after.json', state);

  return state;
}

/**
 * 翻译成小程序识别的变量
 * @param name
 * @param eleData
 * @param data
 */
function parseVariable(name: string, eleData: any, data: any) {
  if (!name) {
    return name;
  }
  const regx = /{{(.*?)}}/;
  const result = name.match(regx);
  let expressionBody = result && result[1];
  if (expressionBody) {
    expressionBody = expressionBody.replace(/'(\w|\.|\s)*'/g, '');
    const varsRegx = /\b(\w|\.|\')*\b/g;
    const vars = expressionBody
      .match(varsRegx)
      .filter((e: string) => e && isNaN(Number(e)));

    // 检查变量是否存在
    if (vars.length) {
      vars.forEach(key => {
        if (key.indexOf('this.data') !== -1) {
          // const realKey = key.replace('this.data.', '').split('.')[0];
          // const inData = !!data.data[realKey];
          // if (!inData) {
          //   throw new Error(`data中不存在的变量: ${key}`);
          // }
        } else {
          let realKey = key.split('.')[0];
          const inEleData = eleData.filter(e => e === realKey).length > 0;
          const inRenderData = Object.keys(data.renderData).some(e => {
            if (e.indexOf('.') > -1) {
              if (key.indexOf(e) === 0) {
                const next = key[key.indexOf(e) + e.length];
                if (next === '.' || next === undefined || next === '[') {
                  realKey = e;
                  return true;
                }
              }
              return false;
            }
            return e.indexOf(realKey) === 0;
          });
          if (inRenderData) {
            name = name.replace(realKey, data.renderData[realKey]);
          }
          if (!inEleData && !inRenderData) {
            // 常量判断
            if (Object.keys(data.constants).indexOf(key) !== -1) {
              let newValue = data.constants[key];
              if (typeof newValue === 'string') {
                newValue = `'${newValue}'`;
              }
              name = name.replace(key, newValue);
            } else {
              // 组件参数不赋值默认 null
              const firstKey = key
                .split('.')[0]
                .split('__')[0]
                .split('_')
                .slice(0, -1)
                .join('_');
              if (data.componentsList.includes(firstKey)) {
                name = name.replace(key, null);
              }
            }
          }
        }
      });
    }
  }
  if (typeof name === 'string') {
    name = name.replace(/this\.data\./g, '');
    name = name.replace(/this\./g, '');
  }
  return name;
}

/**
 * 检查render data 并格式化变量
 * @param {*} rootSt
 */
function parseRenderData(rootSt: any) {
  const { data, renderData } = rootSt;
  Object.keys(renderData).forEach(key => {
    const value = renderData[key];
    const varsRegx = /\b(\w|\.|\'|[\u4e00-\u9fa5])*\b/g;
    if (typeof value !== 'string') {
      rootSt.constants[key] = value;
      delete renderData[key];
      return;
    }

    // 区分map的item
    if (value[0] === '-') {
      renderData[key] = value.slice(1);
      return;
    }

    // 表达式
    if (
      value.match(varsRegx) &&
      value.match(varsRegx).filter(e => e.length).length > 1
    ) {
      try {
        const newValue = eval(value);
        rootSt.constants[key] = newValue;
        delete renderData[key];
        return;
      } catch (e) {
        // render 中的表达式放到wxml中的时候需要加() 否则会出现a || b > c 的情况
        if (value && value[0] !== '(') {
          renderData[key] = `(${value})`;
        }
        // throw new Error(`render中只允许常量表达式: ${value}`);
      }
    }
    if (value.indexOf('this') === -1) {
      if (
        rootSt.constants &&
        Object.keys(rootSt.constants).indexOf(value) !== -1
      ) {
        renderData[key] = rootSt.constants[value];
        return;
      }

      if (isConstValue(value)) {
        rootSt.constants[key] = value;
        delete renderData[key];
        return;
      }
      throw new Error(`不是data中的变量也不是常量: ${value}`);
    } else {
      // const realVar = value.replace('this.data.', '').split('.')[0];
      // if (realVar) {
      //   const inData = !!data[realVar];
      //   if (!inData) {
      //     throw new Error(`不是data中的变量: ${value}`);
      //   }
      // }
    }
  });
}

/**
 * 遍历结构树 生成sxml
 * @param {*} stateTree
 * @param {*} data
 * @returns
 */
function assemblewxml(stateTree: any, data: any) {
  if (stateTree.name) {
    const ele = stateTree;
    const attr = Object.keys(ele.attribute)
      .map(key => {
        let value = parseVariable(ele.attribute[key], stateTree.data, data);
        // 事件处理
        if (key.slice(0, 4) === 'bind' || key.slice(0, 5) === 'catch') {
          const regx = /{{(.*?)}}/;
          const result = value.match(regx);
          value = result && result[1];
          value = value.replace('this.', '');
        }
        return `${key}="${value}"`;
      })
      .join(' ');
    const children = ele.children
      .map(c => {
        if (typeof c === 'string') {
          return parseVariable(c, stateTree.data, data);
        }
        // 作用域传递到子节点
        c.data = c.data.concat(ele.data);
        return assemblewxml(c, data);
      })
      .join('')
      .trim();
    return `<${ele.name} ${attr}>${children}</${ele.name}>`;
  }
}

// 不输出文件 展示用于测试
export function transform(source, format = true, filePath: string) {
  const query = { format };
  const sourceFile = ts.createSourceFile(
    'index.tsx',
    source,
    ts.ScriptTarget.ES2016,
    false,
  );
  const page = parseClassNode()(sourceFile);

  const jsCode = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.Preserve,
      target: ts.ScriptTarget.ES2016,
    },
  });
  write('js.js', jsCode.outputText.slice(1, -1));

  const state = walkCode(jsCode.outputText, filePath);

  parseRenderData(state);

  write('tree-parsed.json', state);

  let wxml = assemblewxml(state.ele, {
    data: state.data,
    renderData: state.renderData,
    constants: state.constants,
    componentsList: Object.keys(state.components),
  });
  wxml = htmlBeautify(wxml, {
    indent_size: query.format ? 2 : 0,
    eol: query.format ? '\n' : ' ',
  });
  const componentsImports = parseImportLines()(sourceFile);
  if (componentsImports.length) {
    const lines = [];
    componentsImports.forEach(e => {
      lines.push(source.slice(e.pos, e.end));
    });
    lines.forEach(e => {
      if (e.indexOf('components') > -1) {
        source = source.replace(e, `\nimport ${e.split(' ').pop()}`);
      }
    });
  }
  // TODO debug
  // console.log(wxml);
  return wxml;
}

export default function tsx_loader(source) {
  const query = loaderUtils.getOptions(this) || {};
  if (R.test(/[a-z-]+\.page\.tsx/, this.resourcePath)) {
    const sourceFile = ts.createSourceFile(
      this.resourcePath,
      source,
      ts.ScriptTarget.ES2016,
      false,
    );
    const page = parseClassNode()(sourceFile);

    const pagePath = getPagePath(this.resourcePath);
    if (!pagePath) {
      throw new Error(`${this.resourcePath} 不在\`pages\`目录下!!`);
    }

    const jsCode = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.Preserve,
        target: ts.ScriptTarget.ES2016,
      },
    });

    const state = walkCode(jsCode.outputText, this.resourcePath);
    parseRenderData(state);

    let wxml = assemblewxml(state.ele, {
      data: state.data,
      renderData: state.renderData,
      constants: state.constants,
      componentsList: Object.keys(state.components),
    });
    wxml = htmlBeautify(wxml, {
      indent_size: query.format ? 2 : 0,
      eol: query.format ? '\n' : ' ',
    });

    if (!query.format) {
      wxml = wxml.replace(/>(\s*)</g, e => e.replace(/(\s*)/g, ''));
    }

    // 生成`wxml.js`文件
    this.emitFile(`${pagePath}.wxml`, wxml);

    const render = getMember('render')(page);

    // 删除render
    if (render && render.pos && render.end) {
      source = source.slice(0, render.pos) + source.slice(render.end);
    }

    // 删除组件引用
    const componentsImports = parseImportLines()(sourceFile);
    if (componentsImports.length) {
      const lines = [];
      componentsImports.forEach(e => {
        lines.push(source.slice(e.pos, e.end));
      });
      lines.forEach(e => {
        if (e.indexOf('components') > -1) {
          source = source.replace(e, `\nimport ${e.split(' ').pop()}`);
        }
      });
    }
  }
  return source;
}
