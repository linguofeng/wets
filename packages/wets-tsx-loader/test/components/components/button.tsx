export const Button = (props: any) => (
  <view>
    {
      props.obj > 0 && <button bindtap={props.onClick}>{props.name}</button>
    }
    {
      props.obj.child > 0 && <button bindtap={props.onClick}>{props.name}</button>
    }
    <view className="test">
      {props.test}
      {props.test3 > 1}
      {props.test4}
    </view>
  </view>
);
