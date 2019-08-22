/// <reference types="wets-types/wx" />

import { DocumentNode } from 'graphql';
import { print } from 'graphql/language/printer';

import { Middleware, ComposedMiddleware } from 'koa-compose';
import * as compose from 'koa-compose';

export interface IRequestOption {
  headers: { [key: string]: string | number };
  url?: string;
}

export interface IRequest {
  options: IRequestOption;
  send(data: string, request?: any): Promise<any>;
}

class Request implements IRequest {
  options: IRequestOption = {
    headers: {},
  };

  constructor(private readonly url: string) {}

  send(data: string, request?: any) {
    return new Promise((resolve, reject) => {
      const req = request || wx.request;
      req({
        url: this.options.url || this.url,
        method: 'POST',
        header: this.options.headers,
        data,
        success: (res: any) => {
          if (res.data.errors) {
            reject(res.data.errors);
          } else {
            resolve(res.data.data);
          }
        },
        fail: reject,
      });
    });
  }
}

export interface INetworkInterfaceOption {
  url: string;
  request?: any;
}

export interface INetworkInterface {
  options: INetworkInterfaceOption;
  use(fn: Middleware<IRequest>);
  send(data: string): Promise<any>;
}

class NetworkInterface implements INetworkInterface {
  private middlewares: Array<Middleware<IRequest>> = [];
  private fn: ComposedMiddleware<IRequest> = null;

  constructor(public readonly options: INetworkInterfaceOption) {}

  use(fn: Middleware<IRequest>) {
    this.middlewares.push(fn);
  }

  send(data: string) {
    if (!this.fn) {
      this.fn = compose(this.middlewares);
    }
    const req = new Request(this.options.url);
    return this.fn(req).then(() => req.send(data, this.options.request));
  }
}

export const createNetworkInterface = (
  options: INetworkInterfaceOption,
): INetworkInterface => new NetworkInterface(options);

export interface IClientOption {
  networkInterface: INetworkInterface;
}

export class Client {
  constructor(private readonly options: IClientOption) {}

  mutate(document: DocumentNode, variables: { [key: string]: any }) {
    return this.query(document, variables);
  }

  query(document: DocumentNode, variables: { [key: string]: any }) {
    const query = print(document);
    return this.options.networkInterface.send(
      JSON.stringify({
        query,
        variables: variables || {},
      }),
    );
  }
}
