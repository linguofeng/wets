export default
`<view class="page">
  <block wx:for-item="item" wx:for="{{vouchers}}" wx:key="id">
    <view bindtap="log">
      123
    </view>
  </block>
  <block wx:for-item="item" wx:for="{{vouchers}}" wx:key="id">
    <view>
      <button str="{{item.str}}" str1="{{null}}" bindtap="log" wx:if="{{item.id > 0}}">{{item.name}}</button> 456aaa

      <view class="btn-child-text">
        456aaa
      </view>
    </view>
  </block>
</view>`;
