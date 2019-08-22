export default `import { Page } from 'wets';
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
    return (
      <view className="page">
        <view className="empty">
          {\`str1 \${this.data.str2} str3 \${this.data.str4}\`}
        </view>
      </view>
    );
  }
}
`