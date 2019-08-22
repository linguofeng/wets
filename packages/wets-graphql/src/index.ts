import { DocumentNode } from 'graphql';
import { App, Page } from 'wets';
import { Client, createNetworkInterface } from './client';
import { parser, DocumentType } from './parser';

export interface Constructor<T> {
  new (...args: any[]): T;
}

const CAPS = /(?!^)([A-Z])/g;

declare var getApp: () => {
  client: Client;
  store?: {
    dispatch: (action: any) => void;
  };
};

export { Client, createNetworkInterface };

export interface ProviderOption {
  client: Client;
  store?: {
    dispatch: (action: any) => void;
  };
}

export function Provider(options: ProviderOption) {
  return <T extends Constructor<App>>(AppConstructor: T) => {
    const { store, client } = options;
    return class GraphQLProvider extends AppConstructor {
      store = store;
      client = client;
    };
  };
}

export interface OperationOptionOption {
  variables?: { [key: string]: any };
}

export interface OperationOption {
  name?: string;
  options?: (
    ownOptions: any,
  ) => OperationOptionOption | Promise<OperationOptionOption>;
  props?: (ownOptions: any) => any;
  skip?: boolean | ((ownOptions: any) => boolean);
}

export interface MutationOpts {
  variables?: { [key: string]: any };
  payload?: { [key: string]: any };
}

export interface VariableOption {
  [key: string]: any;
}

export interface FetchOption {
  noDispatch?: boolean;
}

// 转换Page的Options到GraphQL的Options
// 主要是传参给GraphQL发起请求
const defaultMapOptionsToOptions = (
  options: any,
): OperationOptionOption => ({});

const defaultMapPropsToProps = ({ ownOptions, ...props }) => props;

const defaultStore = {
  dispatch: () => {},
};

const dispatch = action => {
  const { store = defaultStore } = getApp();
  store.dispatch(action);
};

// 绑定方法到props上
const mapOperationToProps = (
  name: string,
  type: DocumentType,
  document: DocumentNode,
) => {
  if (type === DocumentType.Mutation) {
    return {
      [name]: (mutationOpts?: MutationOpts) => {
        const { variables, payload } = mutationOpts || ({} as any);
        dispatch({
          type: `GQL_${name.replace(CAPS, '_$1').toUpperCase()}_LOADING`,
          variables,
          payload,
        });
        return getApp()
          .client.mutate(document, variables)
          .then(data => {
            dispatch({
              type: `GQL_${name.replace(CAPS, '_$1').toUpperCase()}_SUCCESS`,
              variables,
              payload: {
                ...payload,
                ...data,
              },
            });
            return data;
          })
          .catch(errors => {
            dispatch({
              type: `GQL_${name.replace(CAPS, '_$1').toUpperCase()}_ERROR`,
              variables,
              errors,
              payload,
            });
            throw errors;
          });
      },
    };
  }
  return {
    [name]: {
      refetch: (
        variables: VariableOption = {},
        options: FetchOption = { noDispatch: false },
        payload?: { [key: string]: any },
      ) => {
        if (!options.noDispatch) {
          dispatch({
            type: `GQL_${name.replace(CAPS, '_$1').toUpperCase()}_LOADING`,
            variables,
            payload,
          });
        }
        return getApp()
          .client.query(document, variables)
          .then(data => {
            if (!options.noDispatch) {
              dispatch({
                type: `GQL_${name.replace(CAPS, '_$1').toUpperCase()}_SUCCESS`,
                variables,
                data,
                payload: {
                  ...payload,
                  ...data,
                },
              });
            }
            return data;
          })
          .catch(errors => {
            if (!options.noDispatch) {
              dispatch({
                type: `GQL_${name.replace(CAPS, '_$1').toUpperCase()}_ERROR`,
                variables,
                errors,
                payload,
              });
            }
            throw errors;
          });
      },
    },
  };
};

export function graphql(
  document: DocumentNode,
  operationOptions: OperationOption = {},
) {
  return <T extends Constructor<Page>>(PageConstructor: T) => {
    const mapOptionsToOptions =
      operationOptions.options || defaultMapOptionsToOptions;
    const mapPropsToProps = operationOptions.props || defaultMapPropsToProps;
    const operation = parser(document);
    const name = operationOptions.name || operation.name;
    const props = mapOperationToProps(name, operation.type, document);
    const skip =
      typeof operationOptions.skip === 'function'
        ? operationOptions.skip
        : (ownOptions: any) => operationOptions.skip;
    return class GraphQL extends PageConstructor {
      onLoad(ownOptions: any) {
        this.props = {
          ...this.props,
          ...mapPropsToProps({ ownOptions, ...props }),
        };
        if (operation.type === DocumentType.Query && !skip(ownOptions)) {
          Promise.resolve(mapOptionsToOptions(ownOptions)).then(
            ({ variables }) => {
              this.props[name].refetch(variables);
            },
          );
        }
        if (super['onLoad']) {
          super['onLoad'](ownOptions);
        }
      }
    };
  };
}
