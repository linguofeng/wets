import List from './list';
import {Item} from './item';

export const Button = (props: any) => (
  <view>
    {
      props.obj > 0 && <button bindtap={props.onClick}>{props.name}</button>
    }
    {
      props.list.map(i => {
        <Item />
      })
    }
    <List nameList={props.name} top={props.list[0]}>
      <Item itemname={props.list[0].name}/>
    </List>
    {props.children}
  </view>
);
