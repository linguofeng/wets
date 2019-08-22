import { Page } from '../src';

@Page.Conf({
  navigationBarTitleText: '',
})
export class HomePage extends Page {
  onShareAppMessage() {
    return {
      title: '',
      path: '',
    };
  }

  render() {
    return (
      <view>
        <text>hello</text>
      </view>
    );
  }
}
