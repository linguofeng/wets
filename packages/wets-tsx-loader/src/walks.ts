import * as fs from 'fs';
import * as path from 'path';
import * as walk from 'acorn/dist/walk';

import { parse } from './components';
import { write } from './utils/log';

function getCacheObj() {
  return {
    value: '',
    ele: null,
    if: null,
    extra: null,
  };
}

export function isConstValue(value: any) {
  return (
    (typeof value !== 'object' && typeof value !== 'function') || value === null
  );
}

/**
 * 给表达式加括号
 * @param {*} node
 * @param {*} str
 * @returns
 */
function parseExpression(node: any, str: any) {
  if (
    typeof str === 'string' &&
    node.type.indexOf('Expression') !== -1 &&
    node.type !== 'MemberExpression'
  ) {
    return `(${str})`;
  }
  return str;
}

/**
 *  "_a": "this.data.item",
 *  "comment": "_a.comment",  => "comment": "this.data.item.comment"
 *
 * @param {*} data
 */
export function parseRenderDataConst(data: any) {
  const keys = Object.keys(data);
  let done = true;
  keys.forEach(k => {
    let value = data[k];
    if (typeof value !== 'string') {
      return;
    }

    if (value.length && value[0] === '-') {
      value = value.slice(1);
    }
    const repalceKey = keys.find(key => value.indexOf(key) !== -1);
    if (repalceKey) {
      done = false;
      const newValue =
        data[repalceKey][0] === '-' && value.indexOf(repalceKey) !== 0
          ? data[repalceKey].slice(1)
          : data[repalceKey];
      data[k] =
        value === repalceKey ? newValue : value.replace(repalceKey, newValue);
      if (data[k][0] !== '-') {
        data[k] = '-' + data[k] + '';
      }
    }
  });
  if (!done) {
    return parseRenderDataConst(data);
  }
  return data;
}

function getValue(obj, name) {
  const list = name.split('.');
  let ret;
  list.reduce((data, e) => {
    if (data) {
      ret = data[e];
      return ret;
    }
  }, obj);
  return ret;
}

// 设置全局常量 和 components
function setGlobalConst(node: any, st: any, c: any) {
  if (!st.constants) {
    st.constants = {};
  }
  if (node.type === 'VariableDeclaration') {
    node.declarations.forEach(e => {
      // 常量判断
      if (
        e.type === 'VariableDeclarator' &&
        e.init &&
        e.init.type !== 'CallExpression' &&
        e.init.type !== 'ObjectExpression'
      ) {
        const valuObj = getCacheObj();
        c(e.init, valuObj);
        try {
          const value = eval(valuObj.value);
          if (isConstValue(value)) {
            st.constants[e.id.name] = value;
          }
        } catch (e) {
          // console.log(valuObj.value, 'ignore')
        }
      }

      // 组件判断
      if (
        (e.type === 'VariableDeclarator' &&
          getValue(e, 'init.callee.name') === 'require' &&
          getValue(e, 'init.arguments.0.value') &&
          getValue(e, 'init.arguments.0.value').indexOf('components') > -1) ||
        st.componentsName
      ) {
        let component;
        let componentPath;
        try {
          component = fs.readFileSync(
            path.resolve(
              path.dirname(st.filePath),
              getValue(e, 'init.arguments.0.value') + '.tsx',
            ),
          );
          componentPath = path.resolve(
            path.dirname(st.filePath),
            getValue(e, 'init.arguments.0.value') + '.tsx',
          );
          // tslint:disable-next-line:no-empty
        } catch (e) {}
        try {
          component = fs.readFileSync(
            path.resolve(
              path.dirname(st.filePath),
              getValue(e, 'init.arguments.0.value') + '/index.tsx',
            ),
          );
          componentPath = path.resolve(
            path.dirname(st.filePath),
            getValue(e, 'init.arguments.0.value') + '/index.tsx',
          );
          // tslint:disable-next-line:no-empty
        } catch (e) {}
        if (!component) {
          // tslint:disable-next-line:no-console
          console.error(
            'can not find ',
            e.id.name,
            getValue(e, 'init.arguments.0.value'),
          );
        }
        if (!st.components) {
          st.components = {};
        }

        st.components[e.id.name] = parse({
          code: component.toString(),
          name: e.id.name,
          filePath: componentPath,
          parentsName: st.componentsName,
          st,
        });

        write(e.id.name + '.json', st.components[e.id.name]);
      }
    });
  }
}

/**
 * 解决a ? b : c; 中含有标签, 标签的条件混合
 */
function handleConditionalEleIf(
  faCondition: string,
  childCondition: string,
  fail: boolean,
) {
  const eleIf = faCondition;
  if (childCondition) {
    const regx = /{{(.*?)}}/;
    const result = childCondition.match(regx);
    if (result && result[1]) {
      if (fail) {
        return `(${fail ? '!' : ''}(${eleIf})) && (${result[1]})`;
      }
      return `(${eleIf}) && (${result[1]})`;
    }
  }
  if (fail) {
    return `!(${eleIf})`;
  }
  return eleIf;
}

const walkers = {
  JSXElement(node, st, c) {
    const ele = {
      name:
        (node.openingElement && node.openingElement.name.name) ||
        getValue(node, 'openingElement.name.object.name'),
      attribute: {},
      children: [],
      data: [],
    };
    // 标签自己的数据, map参数
    if (st.eleData) {
      ele.data = st.eleData;
      delete st.eleData;
    }
    if (!st.ele) {
      st.ele = ele;
    }
    for (const attribute of node.openingElement.attributes) {
      c(attribute, ele);
    }

    for (const child of node.children) {
      const childObj = getCacheObj();
      c(child, childObj);
      ele.children.push(childObj.ele || childObj.value);
      // 条件判断可能会产生两个子元素
      if (childObj.extra) {
        ele.children.push(childObj.extra);
        delete childObj.extra;
      }
    }
  },
  JSXAttribute(node, st, c) {
    const valueObj = getCacheObj();
    if (node.value.type === 'Literal') {
      valueObj.value = node.value.value;
    } else {
      c(node.value, valueObj);
      valueObj.value = valueObj.value;
    }
    let name = node.name.name;
    if (name === 'key') {
      name = 'wx:key';
      const regx = /{{(.*?)}}/;
      const result = valueObj.value.match(regx)[1];
      valueObj.value = result.split('.').pop();
    }
    // // 事件处理
    // if (name.slice(0, 4) === 'bind' || name.slice(0, 5) === 'catch') {
    //   const regx = /{{(.*?)}}/;
    //   const result = valueObj.value.match(regx);
    //   valueObj.value = result && result[1];
    //   valueObj.value = valueObj.value.replace('this.', '');
    // }
    if (name === 'className') {
      name = 'class';
    }

    name.toLowerCase();
    st.attribute[name] = valueObj.value;
  },
  JSXExpressionContainer(node, st, c) {
    c(node.expression, st);
    st.value = `{{${st.value}}}`;
  },
  BinaryExpression(node, st, c) {
    const leftObj = getCacheObj();
    const rightObj = getCacheObj();
    c(node.left, leftObj);
    c(node.right, rightObj);
    st.value = `${parseExpression(
      node.left,
      leftObj.value,
    )} ${node.operator} ${parseExpression(node.right, rightObj.value)}`;
  },
  ConditionalExpression(node, st, c) {
    const testObj = getCacheObj();
    const consequentObj = getCacheObj();
    const alternateObj = getCacheObj();
    c(node.test, testObj);
    c(node.consequent, consequentObj);
    c(node.alternate, alternateObj);
    if (consequentObj.ele || alternateObj.ele) {
      if (consequentObj.extra) {
        const blockEle = {
          name: 'block',
          attribute: {
            'wx:if': `{{${testObj.value}}}`,
          },
          children: [],
          data: [],
        };
        blockEle.children.push(consequentObj.ele);
        blockEle.children.push(consequentObj.extra);
        st.ele = blockEle;
      } else if (consequentObj.ele) {
        const eleIf = handleConditionalEleIf(
          testObj.value,
          consequentObj.ele.attribute['wx:if'],
          false,
        );
        consequentObj.ele.attribute['wx:if'] = `{{${eleIf}}}`;
        st.ele = consequentObj.ele;
      } else {
        st.value = `{{${parseExpression(
          node.test,
          testObj.value,
        )} && ${consequentObj.value}}}`;
      }

      if (alternateObj.extra) {
        const blockEle = {
          name: 'block',
          attribute: {
            'wx:if': `{{!(${testObj.value})}}`,
          },
          children: [],
          data: [],
        };
        blockEle.children.push(alternateObj.ele);
        blockEle.children.push(alternateObj.extra);
        if (st.ele) {
          st.extra = blockEle;
        } else {
          st.ele = blockEle;
        }
      } else if (alternateObj.ele) {
        const eleIf = handleConditionalEleIf(
          testObj.value,
          alternateObj.ele.attribute['wx:if'],
          true,
        );
        alternateObj.ele.attribute['wx:if'] = `{{${eleIf}}}`;
        st.extra = alternateObj.ele;
      } else {
        st.extra = `{{!${parseExpression(
          node.test,
          testObj.value,
        )} && ${alternateObj.value}}}`;
      }
    } else {
      st.value = `${testObj.value} ? ${consequentObj.value} : ${alternateObj.value}`;
    }
  },
  TemplateLiteral(node, st, c) {
    const list = []
      .concat(node.expressions)
      .map(e => ({ ...e, isExpressions: true }))
      .concat(node.quasis)
      .sort((a, b) => a.start - b.start)
      .map(e => {
        const obj = getCacheObj();
        c(e, obj);
        if (!e.isExpressions) {
          return `'${obj.value}'`;
        }
        if (obj.value.indexOf(' ') > -1) {
          return `(${obj.value})`;
        }
        return obj.value;
      })
      .filter(e => e.length > 2)
      .join(' + ');
    st.value = list;
  },
  TemplateElement(node, st, c) {
    st.value = node.value.raw;
  },
  UnaryExpression(node, st, c) {
    const arg = getCacheObj();
    c(node.argument, arg);
    st.value = `${node.operator}${parseExpression(node.argument, arg.value)}`;
  },
  LogicalExpression(node, st, c) {
    const leftObj = getCacheObj();
    const rightObj = getCacheObj();
    c(node.left, leftObj);
    c(node.right, rightObj);
    if (rightObj.ele) {
      rightObj.ele.attribute['wx:if'] = `{{${leftObj.value}}}`;
      st.ele = rightObj.ele;
    } else {
      st.value = `(${leftObj.value} ${node.operator} ${rightObj.value})`;
    }
  },
  MemberExpression(node, st, c) {
    const obj = getCacheObj();
    const propObj = getCacheObj();
    c(node.object, obj);
    c(node.property, propObj);
    st.value = node.computed
      ? `${obj.value}[${propObj.value}]`
      : `${obj.value}.${propObj.value}`;
  },
  ThisExpression(node, st, c) {
    st.value = 'this';
  },
  Identifier(node, st, c) {
    st.value = node.name;
  },
  Literal(node, st, c) {
    // st.value = node.raw.replace('\n', '').trim();
    st.value = typeof node.value === 'string' ? `'${node.value}'` : node.value;
  },
  JSXText(node, st, c) {
    st.value = node.raw;
  },
  // for function map
  CallExpression(node, st, c) {
    c(node.callee, st);
    if (node.arguments) {
      for (const i of node.arguments) {
        c(i, st);
      }
    }
    if (st.value && st.value.slice && st.value.slice(-3) === 'map') {
      const params = node.arguments[0].params.map(e => e.name);
      const blockEle = {
        name: 'block',
        attribute: {},
        children: [],
        data: params,
      };
      if (params[1]) {
        blockEle.attribute['wx:for-index'] = params[1];
      }
      if (params[0]) {
        blockEle.attribute['wx:for-item'] = params[0];
      }
      blockEle.attribute['wx:for'] = `{{${st.value.slice(0, -4)}}}`;
      if (st.ele && st.ele.attribute['wx:key']) {
        blockEle.attribute['wx:key'] = st.ele.attribute['wx:key'];
        delete st.ele.attribute['wx:key'];
      }
      blockEle.children.push(st.ele);
      st.ele = blockEle;
    }
  },
  // 遍历render中定义的遍历,放到renderData中
  Function(node, st, c) {
    if (node.id) {
      c(node.id, st, 'Pattern');
    }
    for (const i of node.params) {
      c(i, st, 'Pattern');
    }
    const params = node.params.map(e => e.name);
    st.eleData = params;

    c(node.body, st, node.expression ? 'ScopeExpression' : 'ScopeBody');

    if (st.isRender && st.root) {
      const vars = {};
      node.body.body.filter(e => e.type === 'VariableDeclaration').forEach(e =>
        e.declarations.forEach(varItem => {
          const key = varItem.id.name;
          const valueObj = getCacheObj();
          c(varItem.init, valueObj);
          vars[key] = valueObj.value;
        }),
      );

      // '\'true\'' => 'true'
      Object.keys(vars).forEach(key => {
        let value = vars[key];
        if (
          value.length &&
          value[0] === "'" &&
          value[value.length - 1] === "'"
        ) {
          value = value.slice(1, -1);
          vars[key] = value;
        }
      });
      st.renderData = parseRenderDataConst(vars);
    }
    delete st.isRender;
  },
  ReturnStatement(node, st, c) {
    if (node.argument) {
      c(node.argument, st, 'Expression');
    }
    if (node.argument && node.argument.type === 'JSXElement') {
      st.isRender = true;
    }
  },
  // get data
  AssignmentExpression(node, st, c) {
    const leftObj = getCacheObj();
    c(node.left, leftObj);
    if (leftObj.value === '_this.data') {
      const dataObj = { isData: true, data: {} };
      c(node.right, dataObj);
      st.data = dataObj.data;
    } else {
      c(node.right, st);
    }
  },
  ObjectExpression(node, st, c) {
    for (const item of node.properties) {
      let newSt = st;
      if (st.isData) {
        if (!st.data) {
          st.data = {};
        }
        if (item.value.type === 'ArrayExpression') {
          st.data[item.key.name] = [];
        } else if (item.value.type !== 'ObjectExpression') {
          st.data[item.key.name] = true;
        } else {
          const dataObj = { isData: true, data: {} };
          newSt = dataObj;
          st.data[item.key.name] = dataObj.data;
        }
      }
      c(item, newSt);
    }
  },
  // 获取全局常量
  Program(node, st, c) {
    for (let i = 0, list = node.body; i < list.length; i += 1) {
      const stmt = list[i];
      setGlobalConst(stmt, st, c);
      c(stmt, st, 'Statement');
    }
  },
};

export default { ...walk.base, ...walkers };
