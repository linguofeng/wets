import { IState as IUserState } from './modules/user';

export interface IState {
  user: IUserState;
}

export interface IReduxAction<IData = any> {
  type?: string;
  payload?: any;
  data?: IData;
  variables?: any;
  errors?: any[] | null;
}

export type GraphQLQueryFunction = (
  variables?: { [key: string]: any },
) => Promise<any>;

export type GraphQLMutationFunction<P = any, R = any> = (
  params?: { variables: P },
) => Promise<R>;
