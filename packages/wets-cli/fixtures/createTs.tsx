import { Page } from 'wets';

import './home.page.css';

@Page.Conf({
  navigationBarTitleText: 'HomePage',
})
export class HomePage extends Page {
  render() {
    return (
      <view className="home-page">
        <text>Home Page</text>
      </view>
    );
  }
}
