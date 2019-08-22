export default
`
import { Page } from 'wets';
import { connect } from 'wets-redux';
import { graphql, gql } from 'wets-graphql';
import Button from '../components/components/';

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
  log(){
    console.log(1);
  }
  render() {
    const renderData = this.data.vouchers;
    const renderConst = 'lxc';
    return (
      <view className="page">
        {this.data.vouchers.map((item) => (
          <view key={item.id} bindtap={this.log}>
            123
          </view>
        ))}
        {this.data.vouchers.map((item) => (
            <Button key={item.id} onClick={this.log} fail={renderConst} name={item.name} id={item.id} str={item.str}>
              456aaa
            </Button>
          ))}
      </view>
    );
  }
}
`;
