export const Button = (props: any) => (
  <view>
    {
      props.id > 0 && <button str={props.str} str1={props.str1} bindtap={props.onClick}>{props.name}</button>
    }
    {props.children}
    <view className="btn-child-text">{props.children}</view>
  </view>
);
