# wets-tsx-loader

使用JSX语法写小程序

## 功能介绍

* 使用JSX语法写小程序
* 支持组件
* 支持常量
* 支持render中设置变量
* 支持代码格式化

## 升级记录

2.0.0 支持组件嵌套, 修复单元表达式的bug

## 接入方式

该loader目前只支持wets框架

```
{
  test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('wets-loader'),
      },
      {
        loader: require.resolve('wets-tsx-loader'),
        options: {
          // 输出格式化wxml
          format: true,
        },
      },
    ],
  exclude: /node_modules/,
},

```

## 条件判断

``` JSX
<view className="page">
  {
    dt < 1 ? (
      dt > 0 ?
        (<text>if 1</text>) : (<text>if 0</text>)
    ) : (
      dt > 3 ? (<text>if 4</text>) : (<text>if 2</text>)
    )
  }
  {
    dt > 0 ? (
      dt > 1 && <text>if 2</text>
    ) : (
      dt > -3 ? (<text>-1</text>) : (<text>if -4</text>)
    )
  }
  {
    dt === 0 ? (<view className="dt===0" />) : (
      dt === 1 ? <view className="dt===1" /> : <view className="dt>1" />
    )
  }
</view>
```
``` WXML
<view class="page">
  <view class="empty">
  </view>
  <block wx:if="{{dt < 1}}">
    <text wx:if="{{dt > 0}}">if 1</text>
    <text wx:if="{{!(dt > 0)}}">if 0</text>
  </block>
  <block wx:if="{{!(dt < 1)}}">
    <text wx:if="{{dt > 3}}">if 4</text>
    <text wx:if="{{!(dt > 3)}}">if 2</text>
  </block>
  <text wx:if="{{(dt > 0) && (dt > 1)}}">if 2</text>
  <block wx:if="{{!(dt > 0)}}">
    <text wx:if="{{dt > (-3)}}">-1</text>
    <text wx:if="{{!(dt > (-3))}}">if -4</text>
  </block>
  <view class="dt===0" wx:if="{{dt === 0}}"></view>
  <block wx:if="{{!(dt === 0)}}">
    <view class="dt===1" wx:if="{{dt === 1}}"></view>
    <view class="dt>1" wx:if="{{!(dt === 1)}}"></view>
  </block>
</view>

```

## 循环 map

```
{this.data.vouchers.map((item) => (
  <view key={item.id} bindtap={this.log}>
    123
  </view>
))}
```
```
<block wx:for-item="item" wx:for="{{vouchers}}" wx:key="id">
  <view bindtap="log">
    123
  </view>
</block>
```

## 组件


组件必须放在含有components字段的目录下,否则会解析失败

```
import Button from './components/index';

...

<view>
  <Button str={str} str1={str1} name="打卡机asdfhasdf" onClick={this.onClick}>123123123 {renderData}</Button>
</view>
```

```
<view>
  <button str="{{'true'}}" str1="{{true}}" bindtap="onClick" wx:if="{{null > 0}}">{{'打卡机asdfhasdf'}}</button> 123123123 {{onClick}}
</view>

```




