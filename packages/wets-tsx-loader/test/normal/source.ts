export default
`
import { Page } from 'wets';
import { connect } from 'wets-redux';
import { graphql, gql } from 'wets-graphql';

interface Data {
  vouchers: any[];
}

@Page.Conf({
  navigationBarTitleText: '选择代金券',
})
@connect((state: any) => ({ vouchers: state.user.voucherUnavailableList.nodes }))
/**
 * 不可用代金券列表
 */
export class VoucherUnavailableListPage extends Page<any, Data> {
  render() {
    const renderData = this.data.vouchers;
    const renderConst = 'lxc';
    return (
      <view className="page">
        {this.data.vouchers.length > 0 ? (
          <view>
            <view className="title">无可用代金券</view>
            <view className="page__bd">
              {this.data.vouchers.map((item) => (
                <view key={item.id} className={\`item \${item.status !== 0 ? 'expired' : ''}\`}>
                  <view className="semicircle" />
                  <view className="value">
                    ¥ <text>{item.amount / 100}</text>
                  </view>
                  <view className="info">
                    <text>{item.name}</text>
                    <text>订单高于{item.enough / 100}元可用</text>
                    <text>有效期：{item.startTime}-{item.endTime}</text>
                  </view>
                  <view className="trapezoid-box">
                    {item.status === 1 && (
                      <view className="trapezoid">
                        <text>已使用</text>
                      </view>
                    )}
                    {item.status === 2 && (
                      <view className="trapezoid">
                        <text>已过期</text>
                      </view>
                    )}
                  </view>
                  <view className="semicircle" />
                </view>
              ))}
            </view>
          </view>
        ) : (
          <view className="empty">
            <view className="semicircle" />
            <text className="left">¥</text>
            <text className="right">券</text>
            <text className="tips">无无效代金券</text>
            <view className="semicircle" />
          </view>
        )}
      </view>
    );
  }
}
`