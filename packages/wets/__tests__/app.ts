import { App } from '../src';

@App.Conf({})
export class MyApp extends App {
  a: number;

  onLaunch() {
    const app = <MyApp>getApp();
    app.a = 123;

    wx.login({
      success: res => {
        console.log(res);
      },
    });
  }
}
