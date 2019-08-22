export default
`<view>
  <text no="{{1}}" nostr="{{'1'}}" str="{{'true'}}" str1="{{true}}" bindtap="onClick" data="{{name}}">hello</text>
  <view>
    <button str="{{'true'}}" str1="{{true}}" bindtap="onClick" wx:if="{{null > 0}}">{{'打卡机asdfhasdf'}}</button> child text

    <view class="btn-child-text">
      child text
    </view>
  </view>
  <view>
    <button bindtap="null" wx:if="{{obj > 0}}">{{null}}</button>
    <button bindtap="null" wx:if="{{obj.child > 0}}">{{null}}</button>
    <view class="test">
      {{list[item.index]}} {{(name || '1') > 1}} {{'a c v'}}
    </view>
  </view>
</view>`;
