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
    const dt = this.data.dt;
    return (
      <view className="page">
        <view className="empty">
        </view>
        {
          dt < 1 ? (
            dt > 0 ?
              (<text>if 1</text>) : (<text>if 0</text>)
          ) : (
            dt > 3 ? (<text>if 4</text>) : (<text>if 2</text>)
          )
        }
        {
          dt > 0 ? (
            dt > 1 && <text>if 2</text>
          ) : (
            dt > -3 ? (<text>-1</text>) : (<text>if -4</text>)
          )
        }
        {
          dt === 0 ? (<view className="dt===0" />) : (
            dt === 1 ? <view className="dt===1" /> : <view className="dt>1" />
          )
        }
      </view>
    );
  }
}
`;
