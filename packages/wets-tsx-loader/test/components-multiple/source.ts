export default
`import Button from './components/button';
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
        <text no={no} nostr={nostr} str={str} str1={str1} bindtap={renderData} data={this.data.name}>
          {renderTest}
        </text>
        <Button list={this.data.counter.spus} str={str} str1={str1} name="rootname"  onClick={this.onClick}>Button 的 temaplate {renderData}</Button>
        <Button list={this.data.counter.spus} str={str} str1={str1} name="rootname"  onClick={this.onClick2}>Button 的 temaplate {renderData}</Button>
      </view>
    );
  }
}`;
