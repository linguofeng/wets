export default
`<view>
  <text no="{{1}}" nostr="{{'1'}}" str="{{'true'}}" str1="{{true}}" bindtap="onClick" data="{{name}}">
          {{(name || '1')}}
        </text>
  <view>
    <button bindtap="onClick" wx:if="{{null > 0}}">{{'rootname'}}</button>
    <block wx:for-item="i" wx:for="{{counter.spus}}"><text>item {{null && null}}</text></block>
    <view class="list">
      <text>list {{'rootname'}}</text> {{counter.spus[0]}}

      <text>item {{counter.spus[0].name && counter.spus[0].name}}</text>

    </view>
    Button 的 temaplate {{onClick}}
  </view>
  <view>
    <button bindtap="onClick2" wx:if="{{null > 0}}">{{'rootname'}}</button>
    <block wx:for-item="i" wx:for="{{counter.spus}}"><text>item {{null && null}}</text></block>
    <view class="list">
      <text>list {{'rootname'}}</text> {{counter.spus[0]}}

      <text>item {{counter.spus[0].name && counter.spus[0].name}}</text>

    </view>
    Button 的 temaplate {{onClick}}
  </view>
</view>`;
