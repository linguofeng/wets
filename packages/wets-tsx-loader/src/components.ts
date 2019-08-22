import * as path from 'path';
import * as ts from 'typescript';
import * as tsloader from 'ts-loader';
import walkers, { isConstValue } from './walks';
import * as acorn from 'acorn-jsx';
import * as walk from 'acorn/dist/walk';
import * as loaderUtils from 'loader-utils';
import { html as htmlBeautify } from 'js-beautify';
import * as fs from 'fs';
import * as deepcopy from 'deepcopy';

import { write } from './utils/log';

function getCacheObj() {
  return {
    value: '',
    ele: null,
    if: null,
  };
}

interface IParse {
  code: string; // 组件代码
  name: string; // 组件名称. webpack给的
  filePath: string; // 父组件文件位置
  parentsName: string; // 父组件名称
  st: any; // root st
}

interface IEle {
  name: string;
  attribute: {
    [key: string]: string;
  };
  children: Array<string | IEle>;
  data: string[];
}

interface IComponent {
  ele: IEle;
  componentsName: string;
  components: {
    [key: string]: IComponent;
  };
  noList: number[];
}
interface IState {
  ele: IEle;
  data: any;
  root: boolean;
  constants: {
    [key: string]: string | number | boolean;
  };
  renderData: {
    [key: string]: string | number | boolean;
  };
  filePath: string;
  components: {
    [key: string]: IComponent;
  };
}

/**
 * 转换
 */
function transformPropsName(component: IComponent, name?: string) {
  const propsName = component.componentsName;
  let replaceFun;
  if (name) {
    replaceFun = (str: string) => str.replace(new RegExp(propsName, 'g'), name);
  } else {
    replaceFun = (str: string) =>
      str.replace(/props\.\b/g, (...arg) => {
        if (arg[2].indexOf('props.children') === -1) {
          return `${propsName}.`;
        }
        return arg[0];
      });
  }
  const transformEle = (ele: IEle) => {
    Object.keys(ele.attribute).forEach(
      key => (ele.attribute[key] = replaceFun(ele.attribute[key])),
    );
    ele.children.forEach(
      (v, i) =>
        typeof v === 'string'
          ? (ele.children[i] = replaceFun(v))
          : (ele.children[i] = transformEle(v)),
    );
    return ele;
  };
  transformEle(component.ele);
}

function getArgValue(str: string) {
  const result = str.match(/{{(.*?)}}/);
  return result ? `-${result[1]}` : str;
}

function copyComponents(component: IComponent, name: string) {
  const newOne = deepcopy(component) as IComponent;
  const replaceFun = (str: string) =>
    str.replace(new RegExp(newOne.componentsName, 'g'), name);

  const transformEle = (ele: IEle) => {
    Object.keys(ele.attribute).forEach(
      key => (ele.attribute[key] = replaceFun(ele.attribute[key])),
    );
    ele.children.forEach(
      (v, i) =>
        typeof v === 'string'
          ? (ele.children[i] = replaceFun(v))
          : (ele.children[i] = transformEle(v)),
    );
    return ele;
  };
  transformEle(newOne.ele);
  Object.keys(newOne.components).forEach(key => {
    const nameList = newOne.components[key].componentsName.split('__');
    nameList[nameList.length - 2] = name;
    const newName = nameList.join('__');
    newOne.components[key] = copyComponents(newOne.components[key], newName);
  });
  newOne.componentsName = name;
  return newOne;
}
/**
 * 遍历dom树中的组件ele替换成真正的组件内容, 并获取prop传值
 */
export function transformEleTOComponent(
  ele: IEle,
  components: { [key: string]: IComponent },
  st: IState,
) {
  if (components[ele.name]) {
    const propsEle = { ...ele };
    const theComponents = components[ele.name];
    theComponents.noList.push(1);
    const no = theComponents.noList.length;

    const replaceComponents = copyComponents(
      theComponents,
      `${theComponents.componentsName}_${no}`,
    );

    // 取 传递的参数
    const argList = Object.keys(propsEle.attribute).reduce((pre, key) => {
      pre[`${replaceComponents.componentsName}.${key}`] = getArgValue(
        propsEle.attribute[key],
      );
      return pre;
    }, st.renderData);

    // 执行替换
    ele.attribute = replaceComponents.ele.attribute;
    ele.children = replaceComponents.ele.children;
    ele.name = replaceComponents.ele.name;
    ele.data = replaceComponents.ele.data;

    const renderFun = (e: IEle) => {
      e.children.forEach((v, i) => {
        if (v === '{{props.children}}') {
          e.children.splice(i, 1, ...propsEle.children);
        } else if (
          (v as IEle).name &&
          !replaceComponents.components[(v as IEle).name]
        ) {
          renderFun(v as IEle);
        }
      });
    };

    // 组件 children template渲染
    renderFun(ele);

    transformEleTOComponent(
      replaceComponents.ele,
      replaceComponents.components,
      st,
    );
  }
  ele.children.forEach(e => {
    if ((e as IEle).name) {
      transformEleTOComponent(e as IEle, components, st);
    }
  });
}

export function parse({ code, name, filePath, parentsName, st }: IParse) {
  const jsCode = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.Preserve,
      target: ts.ScriptTarget.ES2017,
    },
  });

  const ast = acorn.parse(jsCode.outputText, {
    plugins: { jsx: true },
  });

  write(name + '-ast.json', ast);

  const state = {
    ele: null,
    data: {},
    renderData: {},
    root: true,
    constants: {},
    filePath,
    componentsName: parentsName ? `${parentsName}__${name}` : name,
    components: {},
    noList: [],
  };

  walk.simple(ast, {}, walkers, state);

  // 将组件中变量名字替换 props => componentsName
  transformPropsName(state);

  return {
    ele: state.ele,
    componentsName: state.componentsName,
    components: state.components,
    noList: state.noList,
  };
}
