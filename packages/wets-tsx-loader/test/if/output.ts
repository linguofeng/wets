export default
`<view class="page">
  <view class="empty">
  </view>
  <block wx:if="{{dt < 1}}"><text wx:if="{{dt > 0}}">if 1</text><text wx:if="{{!(dt > 0)}}">if 0</text></block>
  <block wx:if="{{!(dt < 1)}}"><text wx:if="{{dt > 3}}">if 4</text><text wx:if="{{!(dt > 3)}}">if 2</text></block>
  <text wx:if="{{(dt > 0) && (dt > 1)}}">if 2</text>
  <block wx:if="{{!(dt > 0)}}"><text wx:if="{{dt > (-3)}}">-1</text><text wx:if="{{!(dt > (-3))}}">if -4</text></block>
  <view class="dt===0" wx:if="{{dt === 0}}"></view>
  <block wx:if="{{!(dt === 0)}}">
    <view class="dt===1" wx:if="{{dt === 1}}"></view>
    <view class="dt>1" wx:if="{{!(dt === 1)}}"></view>
  </block>
</view>`;
