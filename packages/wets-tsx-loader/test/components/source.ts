export default
`import Button from './components/index';
import Btn from './components/button';
import Button1 from './r/button';
import Button2 from './ra/button';
import { FloatingActionButton } from '../../components/floating-action-button';
export class View {
  onClick() {
    console.log('onclick');
  }

  render() {
    const renderData = this.onClick;
    const renderTest = this.data.name || '1';
    const str = "true";
    const str1 = true;
    const no = 1;
    const nostr = '1';
    const index = this.index;
    return (
      <view>
        <text no={no} nostr={nostr} str={str} str1={str1} bindtap={renderData} data={this.data.name}>hello</text>
        <Button str={str} str1={str1} name="打卡机asdfhasdf"  onClick={this.onClick}>
          child text
        </Button>
        <Btn
          obj={this.data.obj}
          test={this.data.list[this.item.index]}
          test2={this.data.list.index}
          test3={renderTest}
          test4="a c v"
        ></Btn>
      </view>
    );
  }
}`;
