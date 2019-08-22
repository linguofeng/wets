import { Page } from "wets";

import "./home.page.css";

@Page.Conf({
  navigationBarTitleText: "HomePage",
})
export class HomePage extends Page {
  onTap(e: WxBaseEvent) {
    console.log(e.currentTarget);

    this.setData({
      a: 123
    });
  }

  render() {
    return <view bindtap={this.onTap} />;
  }
}
