/* tslint:disable:no-string-literal */
import { Store, Unsubscribe } from 'redux';
import { App, Page } from 'wets';

import shallowEqual from './shallowEqual';

export interface Constructor<T> {
  new(...args: any[]): T;
}

declare var getApp: () => {
  store: Store<any>;
};

export interface PageWillReceiveData {
  pageWillReceiveData(nextData: any): void;
}

export function Provider(store: Store<any>) {
  return <T extends Constructor<App>>(AppConstructor: T) => {
    return class ReduxProvider extends AppConstructor {
      store = store;
    };
  };
}

const defaultMapStateToData: any = (state, options) => ({});
const defaultMapDispatchToProps: any = dispatch => ({ dispatch });

export function connect(
  mapStateToData = defaultMapStateToData,
  mapDispatchToProps = defaultMapDispatchToProps
) {
  return <T extends Constructor<Page>>(PageConstructor: T) => {
    return class ReduxConnect extends PageConstructor {
      public props = mapDispatchToProps(getApp().store.dispatch);

      public unsubscribe?: Unsubscribe;
      public pageWillReceiveData?: (nextData: any) => void;

      onLoad(options: { [key: string]: any }) {
        const app = getApp();
        if (!app.store) {
          throw new Error('Store对象不存在');
        }
        let data;
        const handleChange = () => {
          const state = app.store.getState();
          const nextData = mapStateToData(state, options);
          const dataChanged = !shallowEqual(data, nextData);
          data = nextData;
          if (dataChanged) {
            this.setData(nextData);
            if (this.pageWillReceiveData) {
              this.pageWillReceiveData(nextData);
            }
          }
        };
        this.unsubscribe = app.store.subscribe(handleChange);
        handleChange();
        if (super['onLoad']) {
          super['onLoad'](options);
        }
      }

      onUnload() {
        if (super['onUnload']) {
          super['onUnload']();
        }
        if (this.unsubscribe) {
          this.unsubscribe();
        }
      }
    };
  };
}
