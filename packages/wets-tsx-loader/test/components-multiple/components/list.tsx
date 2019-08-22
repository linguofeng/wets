export const Button = (props: any) => (
  <view className="list">
    <text>list {props.nameList}</text>
    {props.top}
    {props.children}
  </view>
);
