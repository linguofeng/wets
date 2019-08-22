export default
`<view class="page">
  <view wx:if="{{vouchers.length > 0}}">
    <view class="title">无可用代金券</view>
    <view class="page__bd">
      <block wx:for-item=\"item\" wx:for=\"{{vouchers}}\" wx:key=\"id\">
        <view class=\"{{'item ' + (item.status !== 0 ? 'expired' : '')}}\">
          <view class=\"semicircle\"></view>
          <view class=\"value\">
            ¥ <text>{{item.amount / 100}}</text>
          </view>
          <view class=\"info\">
            <text>{{item.name}}</text>
            <text>订单高于{{item.enough / 100}}元可用</text>
            <text>有效期：{{item.startTime}}-{{item.endTime}}</text>
          </view>
          <view class=\"trapezoid-box\">
            <view class=\"trapezoid\" wx:if=\"{{item.status === 1}}\">
              <text>已使用</text>
            </view>
            <view class=\"trapezoid\" wx:if=\"{{item.status === 2}}\">
              <text>已过期</text>
            </view>
          </view>
          <view class=\"semicircle\"></view>
        </view>
      </block>
    </view>
  </view>
  <view class="empty" wx:if="{{!(vouchers.length > 0)}}">
    <view class="semicircle"></view>
    <text class="left">¥</text>
    <text class="right">券</text>
    <text class="tips">无无效代金券</text>
    <view class="semicircle"></view>
  </view>
</view>`;
