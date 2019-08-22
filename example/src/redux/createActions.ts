import { ThunkAction } from 'redux-thunk';

const CAPS = /(?!^)([A-Z])/g;

export interface IActions {
  [key: string]: string[] | ((...args: any[]) => ThunkAction<any, any, any, any>);
}

export const createActions = (actions: IActions, prefix = '') => {
  return Object.keys(actions).reduce((obj: any, actionName: string) => {
    const type = `${prefix}_${actionName.replace(CAPS, '_$1')}`.toUpperCase();
    const action = actions[actionName];
    if (Array.isArray(action)) {
      obj[actionName] = (...args: any[]) => ({
        type,
        payload: action.reduce((a: any, b: any, c: any) => {
          const o = a || {};
          o[b] = args[c];
          return o;
        }, null),
      });
    } else {
      obj[actionName] = action;
    }
    obj[actionName].toString = () => type;
    return obj;
  }, {});
};
