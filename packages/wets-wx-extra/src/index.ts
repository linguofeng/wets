/// <reference types="wets-types/wx" />

declare interface Wx {
  request(options: RequestOption): Promise<RequestResult & RequestTask>;

  login(): Promise<LoginResult>;

  getUserInfo(options?: GetUserInfoOption): Promise<GetUserInfoResult>;

  checkSession(): Promise<void>;

  setStorage(options: SetStorageOption): Promise<void>;

  getStorage<T = any>(options: GetStorageOption): Promise<GetStorageResult<T>>;

  requestPayment(options: RequestPaymentOption): Promise<RequestPaymentResult>;

  getLocation(options: GetLocationOption): Promise<GetLocationResult>;
}

if (wx) {
  const methods = {};
  [
    'request',
    'getLocation',
    'login',
    'getUserInfo',
    'checkSession',
    'requestPayment',
    'setStorage',
    'getStorage',
  ].forEach(method => {
    methods[method] = wx[method];
    Object.defineProperty(wx, method, {
      get: () => (options: any) => {
        if (options && typeof options.success === 'function') {
          methods[method](options);
        } else if (method === 'request') {
          return new Promise((resolve, reject) => {
            const requestTask = methods[method]({
              ...options,
              success: res => {
                resolve({
                  ...res,
                  ...requestTask,
                });
              },
              fail: reject,
            });
          });
        } else {
          return new Promise((resolve, reject) => {
            methods[method]({
              ...options,
              success: resolve,
              fail: reject,
            });
          });
        }
      },
    });
  });
}
