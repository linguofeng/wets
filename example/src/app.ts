import 'wets-wx-extra';
import { App } from "wets";
import { Provider, Client, createNetworkInterface } from "wets-graphql";

import configureStore from "./redux/configureStore";

const networkInterface = createNetworkInterface({
  url: '',
});

const client = new Client({
  networkInterface
});

const store = configureStore();

@App.Conf({
  window: {
    navigationBarTitleText: "MyApp"
  }
})
@Provider({
  store,
  client
})
export class MyApp extends App {
  onLaunch(options: OnLaunchOptions) {}
}
