/// <reference path="./base.d.ts" />
/// <reference path="../wx/wx.d.ts" />

declare interface WxmlViewElementProps extends WxmlElementProps {
  /**
   * 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果
   * @default none
   *
   */
  'hover-class'?: string;

  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   * @default false
   * @since 1.5.0
   */
  'hover-stop-propagation'?: boolean;

  /**
   * 按住后多久出现点击态，单位毫秒
   * @default 50
   *
   */
  'hover-start-time'?: number;

  /**
   * 手指松开后点击态保留时间，单位毫秒
   * @default 400
   *
   */
  'hover-stay-time'?: number;

  /**
   * 动画对象
   */
  animation?: Animation;
}

declare interface WxmlScrollViewElementProps extends WxmlElementProps {
  /**
   * 允许横向滚动
   * @default false
   *
   */
  'scroll-x'?: boolean;

  /**
   * 允许纵向滚动
   * @default false
   *
   */
  'scroll-y'?: boolean;

  /**
   * 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
   * @default 50
   *
   */
  'upper-threshold'?: number;

  /**
   * 距底部/右边多远时（单位px），触发 scrolltolower 事件
   * @default 50
   *
   */
  'lower-threshold'?: number;

  /**
   * 设置竖向滚动条位置
   *
   *
   */
  'scroll-top'?: number;

  /**
   * 设置横向滚动条位置
   *
   *
   */
  'scroll-left'?: number;

  /**
   * 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
   *
   *
   */
  'scroll-into-view'?: string;

  /**
   * 在设置滚动条位置时使用动画过渡
   * @default false
   *
   */
  'scroll-with-animation'?: boolean;

  /**
   * iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
   * @default false
   *
   */
  'enable-back-to-top'?: boolean;

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   *
   *
   */
  bindscrolltoupper?: EventHandle;

  /**
   * 滚动到底部/右边，会触发 scrolltolower 事件
   *
   *
   */
  bindscrolltolower?: EventHandle;

  /**
   * 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
   *
   *
   */
  bindscroll?: EventHandle;
}

declare interface WxmlSwiperElementProps extends WxmlElementProps {
  /**
   * 是否显示面板指示点
   * @default false
   *
   */
  'indicator-dots'?: boolean;

  /**
   * 指示点颜色
   * @default rgba(0, 0, 0, .3)
   * @since 1.1.0
   */
  'indicator-color'?: Color;

  /**
   * 当前选中的指示点颜色
   * @default #000000
   * @since 1.1.0
   */
  'indicator-active-color'?: Color;

  /**
   * 是否自动切换
   * @default false
   *
   */
  autoplay?: boolean;

  /**
   * 当前所在页面的 index
   * @default 0
   *
   */
  current?: number;

  /**
   * 自动切换时间间隔
   * @default 5000
   *
   */
  interval?: number;

  /**
   * 滑动动画时长
   * @default 500
   *
   */
  duration?: number;

  /**
   * 是否采用衔接滑动
   * @default false
   *
   */
  circular?: boolean;

  /**
   * 滑动方向是否为纵向
   * @default false
   *
   */
  vertical?: boolean;

  /**
   * current 改变时会触发 change 事件，event.detail = {current: current, source: source}
   *
   *
   */
  bindchange?: EventHandle;
}

declare interface WxmlSwiperItemElementProps extends WxmlElementProps {}

declare interface WxmlMovableViewElementProps extends WxmlElementProps {
  /**
   * movable-view的移动方向，属性值有all、vertical、horizontal、none
   * @default none
   *
   */
  direction?: string;

  /**
   * movable-view是否带有惯性
   * @default false
   *
   */
  inertia?: boolean;

  /**
   * 超过可移动区域后，movable-view是否还可以移动
   * @default false
   *
   */
  'out-of-bounds'?: boolean;

  /**
   * 定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画
   *
   *
   */
  x?: number;

  /**
   * 定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画
   *
   *
   */
  y?: number;

  /**
   * 阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快
   * @default 20
   *
   */
  damping?: number;

  /**
   * 摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值
   * @default 2
   *
   */
  friction?: number;
}

declare interface WxmlMovableAreaElementProps
  extends WxmlMovableViewElementProps {
  /**
   * 宽度
   * @default 10px
   */
  width?: string;
  /**
   * 高度
   * @default 10px
   */
  height?: string;
}

declare interface WxmlCoverViewElementProps extends WxmlElementProps {}

declare interface WxmlCoverImageElementProps extends WxmlElementProps {
  /**
   * 图标路径，支持临时路径、网络地址。暂不支持base64格式。
   *
   * tip: 只支持css transition动画，transition-property只支持transform (translateX, translateY)与opacity。
   * tip: 只可嵌套在原生组件map、video、canvas、camera内，避免嵌套在其他组件内。
   * tip: 事件模型遵循冒泡模型，但不会冒泡到原生组件。
   * tip: 文本建议都套上cover-view标签，避免排版错误。
   * tip: 只支持基本的定位、布局、文本样式。不支持设置单边的border、opacity、background-image等。
   * tip: 建议子节点不要溢出父节点
   */
  src: string;
}

declare interface WxmlIconElementProps extends WxmlElementProps {
  /**
   * icon的类型，有效值：success, success_no_circle, info, warn, waiting, cancel, download, search, clear
   *
   *
   */
  type?: string;

  /**
   * icon的大小，单位px
   * @default 23
   *
   */
  size?: number;

  /**
   * icon的颜色，同css的color
   *
   *
   */
  color?: Color;
}

declare interface WxmlTextElementProps extends WxmlElementProps {
  /**
   * 文本是否可选
   * @default false
   * @since 1.1.0
   */
  selectable?: boolean;

  /**
   * 显示连续空格
   * @default false
   * @since 1.4.0
   *
   * ensp  中文字符空格一半大小
   * emsp  中文字符空格大小
   * nbsp  根据字体设置的空格大小
   */
  space?: 'ensp' | 'emsp' | 'nbsp';

  /**
   * 是否解码
   * @default false
   * @since 1.4.0
   */
  decode?: boolean;
}

declare interface WxmlRichTextElementProps extends WxmlElementProps {
  /**
   * 节点列表 / HTML String
   * @default []
   * @since 1.4.0
   */
  nodes?: Array<any> | string;
}

declare interface WxmlProgressElementProps extends WxmlElementProps {
  /**
   * 百分比0~100
   * @default 无
   *
   */
  percent?: Float;

  /**
   * 在进度条右侧显示百分比
   * @default false
   *
   */
  'show-info'?: boolean;

  /**
   * 进度条线的宽度，单位px
   * @default 6
   *
   */
  'stroke-width'?: number;

  /**
   * 进度条颜色 （请使用 activeColor）
   * @default #09BB07
   *
   */
  color?: Color;

  /**
   * 已选择的进度条的颜色
   *
   *
   */
  activeColor?: Color;

  /**
   * 未选择的进度条的颜色
   *
   *
   */
  backgroundColor?: Color;

  /**
   * 进度条从左往右的动画
   * @default false
   *
   */
  active?: boolean;
}

declare interface WxmlButtonElementProps extends WxmlElementProps {
  /**
   * 按钮的大小
   * @default default
   *
   */
  size?: 'default' | 'mini';

  /**
   * 按钮的样式类型
   * @default default
   *
   */
  type?: 'primary' | 'default' | 'warn';

  /**
   * 按钮是否镂空，背景色透明
   * @default false
   *
   */
  plain?: boolean;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;

  /**
   * 名称前是否带 loading 图标
   * @default false
   *
   */
  loading?: boolean;

  /**
   * 用于 <form/> 组件，点击分别会触发 <form/> 组件的 submit/reset 事件
   *
   * submit  提交表单
   * reset  重置表单
   *
   */
  'form-type'?: 'submit' | 'reset';

  /**
   * 微信开放能力
   *
   * contact  打开客服会话  1.1.0
   * share  触发用户转发，使用前建议先阅读使用指引  1.2.0
   * getUserInfo  获取用户信息，可以从bindgetuserinfo回调中获取到用户信息  1.3.0
   * getPhoneNumber  获取用户手机号，可以从bindgetphonenumber回调用获取到用户信息，具体说明  1.2.0
   *
   */
  'open-type'?: 'contact' | 'share' | 'getUserInfo' | 'getPhoneNumber';

  /**
   * 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果
   * @default button-hover
   *
   */
  'hover-class'?: string;

  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   * @default false
   *
   */
  'hover-stop-propagation'?: boolean;

  /**
   * 按住后多久出现点击态，单位毫秒
   * @default 20
   *
   */
  'hover-start-time'?: number;

  /**
   * 手指松开后点击态保留时间，单位毫秒
   * @default 70
   *
   */
  'hover-stay-time'?: number;

  /**
   * 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同wx.getUserInfo
   *
   * @since open-type="getUserInfo'
   */
  bindgetuserinfo?: Handler;

  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
   * @default en
   * @since open-type="getUserInfo"
   */
  lang?: string;

  /**
   * 会话来源
   *
   * @since open-type="contact"
   */
  'session-from'?: string;

  /**
   * 会话内消息卡片标题
   * @default 当前标题
   * @since open-type="contact"
   */
  'send-message-title'?: string;

  /**
   * 会话内消息卡片点击跳转小程序路径
   * @default 当前分享路径
   * @since open-type="contact"
   */
  'send-message-path'?: string;

  /**
   * 会话内消息卡片图片
   * @default 截图
   * @since open-type="contact"
   */
  'send-message-img'?: string;

  /**
   * 显示会话内消息卡片
   * @default false
   * @since open-type="contact"
   */
  'show-message-card'?: boolean;

  /**
   * 客服消息回调
   *
   * @since open-type="contact"
   */
  bindcontact?: Handler;

  /**
   * 获取用户手机号回调
   *
   * @since open-type="getphonenumber"
   */
  bindgetphonenumber?: Handler;
}

declare interface WxmlCheckboxGroupElementProps extends WxmlElementProps {
  /**
   * <checkbox-group/>中选中项发生改变是触发 change 事件，detail = {value:[选中的checkbox的value的数组]}
   *
   *
   */
  bindchange?: EventHandle;
}

declare interface WxmlCheckboxElementProps extends WxmlElementProps {
  /**
   * <checkbox/>标识，选中时触发<checkbox-group/>的 change 事件，并携带 <checkbox/> 的 value
   */
  value?: string;
  /**
   * 当前是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * radio的颜色，同css的color
   */
  color?: Color;
}

declare interface WxmlFormElementProps extends WxmlElementProps {
  /**
   *
   * @default 是否返回 formId 用于发送模板消息
   *
   */
  'report-submit'?: boolean;

  /**
   *
   * @default 携带 form 中的数据触发 submit 事件，event.detail = {value : {'name': 'value'} , formId: ''}
   *
   */
  bindsubmit?: EventHandle;

  /**
   *
   * @default 表单重置时会触发 reset 事件
   *
   */
  bindreset?: EventHandle;
}

declare interface WxmlInputElementProps extends WxmlElementProps {
  /**
   * 输入框的初始内容
   *
   *
   */
  value?: string;

  /**
   * input 的类型
   * @default "text"
   *
   * text  文本输入键盘
   * number  数字输入键盘
   * idcard  身份证输入键盘
   * digit  带小数点的数字键盘
   */
  type?: 'text' | 'number' | 'idcard' | 'digit';

  /**
   * 是否是密码类型
   * @default false
   *
   */
  password?: boolean;

  /**
   * 输入框为空时占位符
   *
   *
   */
  placeholder?: string;

  /**
   * 指定 placeholder 的样式
   *
   *
   */
  'placeholder-style'?: string;

  /**
   * 指定 placeholder 的样式类
   * @default "input-placeholder"
   *
   */
  'placeholder-class'?: string;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;

  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   * @default 140
   *
   */
  maxlength?: number;

  /**
   * 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
   * @default 0
   *
   */
  'cursor-spacing'?: number;

  /**
   * (即将废弃，请直接使用 focus )自动聚焦，拉起键盘
   * @default false
   *
   */
  'auto-focus'?: boolean;

  /**
   * 获取焦点
   * @default false
   *
   */
  focus?: boolean;

  /**
   * 设置键盘右下角按钮的文字
   * @default "done"
   * @since 1.1.0
   *
   * send  右下角按钮为“发送”
   * search  右下角按钮为“搜索”
   * next  右下角按钮为“下一个”
   * go  右下角按钮为“前往”
   * done  右下角按钮为“完成”
   */
  'confirm-type'?: 'send' | 'search' | 'next' | 'go' | 'done';

  /**
   * 点击键盘右下角按钮时是否保持键盘不收起
   * @default false
   * @since 1.1.0
   */
  'confirm-hold'?: boolean;

  /**
   * 指定focus时的光标位置
   *
   * @since 1.5.0
   */
  cursor?: number;

  /**
   * 当键盘输入时，触发input事件，event.detail = {value, cursor}，处理函数可以直接 return 一个字符串，将替换输入框的内容。
   *
   *
   */
  bindinput?: EventHandle;

  /**
   * 输入框聚焦时触发，event.detail = {value: value}
   *
   *
   */
  bindfocus?: EventHandle;

  /**
   * 输入框失去焦点时触发，event.detail = {value: value}
   *
   *
   */
  bindblur?: EventHandle;

  /**
   * 点击完成按钮时触发，event.detail = {value: value}
   *
   *
   */
  bindconfirm?: EventHandle;
}

declare interface WxmlLabelElementProps extends WxmlElementProps {
  /**
   *
   * @default 绑定控件的 id
   *
   */
  for?: string;
}

/**
 * 普通选择器：mode = selector
 */
declare interface WxmlSelectorPickerElementProps extends WxmlElementProps {
  mode: 'selector';
  /**
   * mode为 selector 或 multiSelector 时，range 有效
   * @default []
   */
  range?: Array<string | { [key: string]: any }>;
  /**
   * 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
   *
   *
   */
  'range-key'?: string;
  /**
   * value 的值表示选择了 range 中的第几个（下标从 0 开始）
   * @default 0
   *
   */
  value?: number;

  /**
   * value 改变时触发 change 事件，event.detail = {value: value}
   *
   *
   */
  bindchange?: EventHandle;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;
}

/**
 * 普通选择器：mode = multiSelector
 */
declare interface WxmlMultiSelectorPickerElementProps extends WxmlElementProps {
  /**
   * @since 1.4.0
   */
  mode: 'multiSelector';
  /**
   * mode为 selector 或 multiSelector 时，range 有效。二维数组，长度表示多少列，数组的每项表示每列的数据，如[["a","b"], ["c","d"]]
   * @default []
   */
  range?: Array<Array<string | { [key: string]: any }>>;
  /**
   * 当 range 是一个 二维Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
   *
   *
   */
  'range-key'?: string;
  /**
   * value 每一项的值表示选择了 range 对应项中的第几个（下标从 0 开始）
   * @default []
   *
   */
  value?: Array<number>;

  /**
   * value 改变时触发 change 事件，event.detail = {value: value}
   *
   *
   */
  bindchange?: EventHandle;

  /**
   * 某一列的值改变时触发 columnchange 事件，event.detail = {column: column, value: value}，column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标
   */
  bindcolumnchange?: EventHandle;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;
}

/**
 * 普通选择器：mode = time
 */
declare interface WxmlTimePickerElementProps extends WxmlElementProps {
  mode: 'time';

  /**
   * 表示选中的时间，格式为"hh:mm"
   */
  value?: string;

  /**
   * 表示有效时间范围的开始，字符串格式为"hh:mm"
   */
  start?: string;

  /**
   * 表示有效时间范围的结束，字符串格式为"hh:mm"
   */
  end?: string;

  /**
   * value 改变时触发 change 事件，event.detail = {value: value}
   */
  bindchange?: EventHandle;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;
}

/**
 * 普通选择器：mode = date
 */
declare interface WxmlDatePickerElementProps extends WxmlElementProps {
  mode: 'date';

  /**
   * 表示选中的日期，格式为"YYYY-MM-DD"
   * @default 0
   */
  value?: string;

  /**
   * 表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"
   */
  start?: string;

  /**
   * 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"
   */
  end?: string;

  /**
   * 有效值 year,month,day，表示选择器的粒度
   * @default day
   */
  fields?: 'year' | 'month' | 'day';

  /**
   * value 改变时触发 change 事件，event.detail = {value: value}
   */
  bindchange?: EventHandle;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;
}

/**
 * 普通选择器：mode = region
 */
declare interface WxmlRegionPickerElementProps extends WxmlElementProps {
  /**
   * @since 1.4.0
   */
  mode: 'region';

  /**
   * 表示选中的日期，格式为"YYYY-MM-DD"
   * @default []
   */
  value?: Array<string>;

  /**
   * 可为每一列的顶部添加一个自定义的项
   * @since 1.5.0
   */
  'custom-item'?: string;

  /**
   * value 改变时触发 change 事件，event.detail = {value: value}
   */
  bindchange?: EventHandle;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;
}

/**
 * 从底部弹起的滚动选择器，现支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器。
 */
type WxmlPickerElementProps =
  | WxmlSelectorPickerElementProps
  | WxmlMultiSelectorPickerElementProps
  | WxmlDatePickerElementProps
  | WxmlTimePickerElementProps
  | WxmlRegionPickerElementProps;

declare interface WxmlPickerViewElementProps extends WxmlElementProps {
  /**
   *
   * @default 数组中的数字依次表示 picker-view 内的 picker-view-colume 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。
   *
   */
  value?: number | Array<any>;

  /**
   *
   * @default 设置选择器中间选中框的样式
   *
   */
  'indicator-style'?: string;

  /**
   * 1.1.0
   * @default 设置选择器中间选中框的类名
   *
   */
  'indicator-class'?: string;

  /**
   * 1.5.0
   * @default 设置蒙层的样式
   *
   */
  'mask-style'?: string;

  /**
   * 1.5.0
   * @default 设置蒙层的类名
   *
   */
  'mask-class'?: string;

  /**
   *
   * @default 当滚动选择，value 改变时触发 change 事件，event.detail = {value: value}；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）
   *
   */
  bindchange?: EventHandle;
}

declare interface WxmlRadioGroupElementProps extends WxmlElementProps {
  /**
   * <radio-group/> 中的选中项发生变化时触发 change 事件，event.detail = {value: 选中项radio的value}
   *
   *
   */
  bindchange?: EventHandle;
}

declare interface WxmlRadioElementProps extends WxmlElementProps {
  /**
   * <radio/> 标识。当该<radio/> 选中时，<radio-group/> 的 change 事件会携带<radio/>的value
   */
  value?: string;
  /**
   * 当前是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * radio的颜色，同css的color
   */
  color?: Color;
}

declare interface WxmlSliderElementProps extends WxmlElementProps {
  /**
   * 最小值
   * @default 0
   *
   */
  min?: number;

  /**
   * 最大值
   * @default 100
   *
   */
  max?: number;

  /**
   * 步长，取值必须大于 0，并且可被(max - min)整除
   * @default 1
   *
   */
  step?: number;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;

  /**
   * 当前取值
   * @default 0
   *
   */
  value?: number;

  /**
   * 背景条的颜色（请使用 backgroundColor）
   * @default #e9e9e9
   *
   */
  color?: Color;

  /**
   * 已选择的颜色（请使用 activeColor）
   * @default #1aad19
   *
   */
  'selected-color'?: Color;

  /**
   * 已选择的颜色
   * @default #1aad19
   *
   */
  activeColor?: Color;

  /**
   * 背景条的颜色
   * @default #e9e9e9
   *
   */
  backgroundColor?: Color;

  /**
   * 是否显示当前 value
   * @default false
   *
   */
  'show-value'?: boolean;

  /**
   * 完成一次拖动后触发的事件，event.detail = {value: value}
   *
   *
   */
  bindchange?: EventHandle;
}

declare interface WxmlSwitchElementProps extends WxmlElementProps {
  /**
   * 是否选中
   * @default false
   *
   */
  checked?: boolean;

  /**
   * 样式，有效值：switch, checkbox
   * @default switch
   *
   */
  type?: string;

  /**
   * checked 改变时触发 change 事件，event.detail={ value:checked}
   *
   *
   */
  bindchange?: EventHandle;

  /**
   * switch 的颜色，同 css 的 color
   *
   *
   */
  color?: Color;
}

declare interface WxmlTextareaElementProps extends WxmlElementProps {
  /**
   * 输入框的内容
   *
   *
   */
  value?: string;

  /**
   * 输入框为空时占位符
   *
   *
   */
  placeholder?: string;

  /**
   * 指定 placeholder 的样式
   *
   *
   */
  'placeholder-style'?: string;

  /**
   * 指定 placeholder 的样式类
   * @default textarea-placeholder
   *
   */
  'placeholder-class'?: string;

  /**
   * 是否禁用
   * @default false
   *
   */
  disabled?: boolean;

  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   * @default 140
   *
   */
  maxlength?: number;

  /**
   * 自动聚焦，拉起键盘。
   * @default false
   *
   */
  'auto-focus'?: boolean;

  /**
   * 获取焦点
   * @default false
   *
   */
  focus?: boolean;

  /**
   * 是否自动增高，设置auto-height时，style.height不生效
   * @default false
   *
   */
  'auto-height'?: boolean;

  /**
   * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
   * @default false
   *
   */
  fixed?: boolean;

  /**
   * 指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
   * @default 0
   *
   */
  'cursor-spacing'?: number;

  /**
   * 指定focus时的光标位置
   *
   * @since 1.5.0
   */
  cursor?: number;

  /**
   * 是否显示键盘上方带有”完成“按钮那一栏
   * @default true
   * @since 1.6.0
   */
  'show-confirm-bar'?: boolean;

  /**
   * 输入框聚焦时触发，event.detail = {value: value}
   *
   *
   */
  bindfocus?: EventHandle;

  /**
   * 输入框失去焦点时触发，event.detail = {value, cursor}
   *
   *
   */
  bindblur?: EventHandle;

  /**
   * 输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}
   *
   *
   */
  bindlinechange?: EventHandle;

  /**
   * 当键盘输入时，触发 input 事件，event.detail = {value, cursor}， bindinput 处理函数的返回值并不会反映到 textarea 上
   *
   *
   */
  bindinput?: EventHandle;

  /**
   * 点击完成时， 触发 confirm 事件，event.detail = {value: value}
   *
   *
   */
  bindconfirm?: EventHandle;
}

declare interface WxmlNavigatorElementProps extends WxmlElementProps {
  /**
   * 应用内的跳转链接
   *
   *
   */
  url?: string;

  // 在哪个目标上发生跳转，默认当前小程序
  target?: string;

  // 当target="miniProgram"时有效，打开的页面路径，如果为空则打开首页
  path?: string;

  /**
   *  当target="miniProgram"时有效，要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版），
   *  仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版
   */
  version?: string;

  // 当target="miniProgram"时有效，跳转小程序成功
  bindsuccess?: EventHandle;

  // 当target="miniProgram"时有效，跳转小程序失败
  binderror?: EventHandle;

  // 当target="miniProgram"时有效，跳转小程序完成
  bindcomplete?: EventHandle;

  // 当target="miniProgram"时有效，要打开的小程序 appId
  'app-id': string;

  /**
   * 当target="miniProgram"时有效，需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
   */
  'extra-data'?: Object;

  /**
   * 跳转方式
   * @default navigate
   *
   * navigate  对应 wx.navigateTo 的功能
   * redirect  对应 wx.redirectTo 的功能
   * switchTab  对应 wx.switchTab 的功能
   * reLaunch  对应 wx.reLaunch 的功能  1.1.0
   * navigateBack  对应 wx.navigateBack 的功能  1.1.0
   *
   */
  'open-type'?:
    | 'navigate'
    | 'redirect'
    | 'switchTab'
    | 'reLaunch'
    | 'navigateBack';

  /**
   * 当 open-type 为 'navigateBack' 时有效，表示回退的层数
   *
   *
   */
  delta?: number;

  /**
   * 指定点击时的样式类，当hover-class="none"时，没有点击态效果
   * @default navigator-hover
   *
   */
  'hover-class'?: string;

  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   * @default false
   * @since 1.5.0
   */
  'hover-stop-propagation'?: boolean;

  /**
   * 按住后多久出现点击态，单位毫秒
   * @default 50
   *
   */
  'hover-start-time'?: number;

  /**
   * 手指松开后点击态保留时间，单位毫秒
   * @default 600
   *
   */
  'hover-stay-time'?: number;
}

declare interface WxmlAudioElementProps extends WxmlElementProps {
  /**
   * 要播放音频的资源地址
   *
   *
   */
  src?: string;

  /**
   * 是否循环播放
   * @default false
   *
   */
  loop?: boolean;

  /**
   * 是否显示默认控件
   * @default false
   *
   */
  controls?: boolean;

  /**
   * 默认控件上的音频封面的图片资源地址，如果 controls 属性值为 false 则设置 poster 无效
   *
   *
   */
  poster?: string;

  /**
   * 默认控件上的音频名字，如果 controls 属性值为 false 则设置 name 无效
   * @default 未知音频
   *
   */
  name?: string;

  /**
   * 默认控件上的作者名字，如果 controls 属性值为 false 则设置 author 无效
   * @default 未知作者
   *
   */
  author?: string;

  /**
   * 当发生错误时触发 error 事件，detail = {errMsg: MediaError.code}
   *
   *
   */
  binderror?: EventHandle;

  /**
   * 当开始/继续播放时触发play事件
   *
   *
   */
  bindplay?: EventHandle;

  /**
   * 当暂停播放时触发 pause 事件
   *
   *
   */
  bindpause?: EventHandle;

  /**
   * 当播放进度改变时触发 timeupdate 事件，detail = {currentTime, duration}
   *
   *
   */
  bindtimeupdate?: EventHandle;

  /**
   * 当播放到末尾时触发 ended 事件
   *
   *
   */
  bindended?: EventHandle;
}

declare interface WxmlImageElementProps extends WxmlElementProps {
  /**
   * 图片资源地址
   *
   *
   */
  src?: string;

  /**
   * 图片裁剪、缩放的模式
   * @default 'scaleToFill'
   *
   * 缩放  scaleToFill  不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
   * 缩放  aspectFit  保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
   * 缩放  aspectFill  保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
   * 缩放  widthFix  宽度不变，高度自动变化，保持原图宽高比不变
   * 裁剪  top  不缩放图片，只显示图片的顶部区域
   * 裁剪  bottom  不缩放图片，只显示图片的底部区域
   * 裁剪  center  不缩放图片，只显示图片的中间区域
   * 裁剪  left  不缩放图片，只显示图片的左边区域
   * 裁剪  right  不缩放图片，只显示图片的右边区域
   * 裁剪  top left  不缩放图片，只显示图片的左上边区域
   * 裁剪  top right  不缩放图片，只显示图片的右上边区域
   * 裁剪  bottom left  不缩放图片，只显示图片的左下边区域
   * 裁剪  bottom right  不缩放图片，只显示图片的右下边区域
   *
   */
  mode?:
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'widthFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';

  /**
   * 图片懒加载。只针对page与scroll-view下的image有效
   * @default false
   * @since 1.5.0
   */
  'lazy-load'?: boolean;

  /**
   * 当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'}
   *
   *
   */
  binderror?: HandleEvent;

  /**
   * 当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'}
   *
   *
   */
  bindload?: HandleEvent;
}

declare interface WxmlVideoElementProps extends WxmlElementProps {
  direction?: number;
  /**
   * 要播放视频的资源地址
   *
   *
   */
  src?: string;

  /**
   * 指定视频初始播放位置
   *
   * @since 1.6.0
   */
  'initial-time'?: number;

  /**
   * 指定视频时长
   *
   * @since 1.1.0
   */
  duration?: number;

  /**
   * 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
   * @default true
   *
   */
  controls?: boolean;

  /**
   * 弹幕列表
   *
   *
   */
  'danmu-list'?: Object | Array<any>;

  /**
   * 是否显示弹幕按钮，只在初始化时有效，不能动态变更
   * @default false
   *
   */
  'danmu-btn'?: boolean;

  /**
   * 是否展示弹幕，只在初始化时有效，不能动态变更
   * @default false
   *
   */
  'enable-danmu'?: boolean;

  /**
   * 是否自动播放
   * @default false
   *
   */
  autoplay?: boolean;

  /**
   * 是否循环播放
   * @default false
   * @since 1.4.0
   */
  loop?: boolean;

  /**
   * 是否静音播放
   * @default false
   * @since 1.4.0
   */
  muted?: boolean;

  /**
   * 在非全屏模式下，是否开启亮度与音量调节手势
   * @default false
   * @since 1.6.0
   */
  'page-gesture'?: boolean;

  /**
   * 当开始/继续播放时触发play事件
   *
   *
   */
  bindplay?: EventHandle;

  /**
   * 当暂停播放时触发 pause 事件
   *
   *
   */
  bindpause?: EventHandle;

  /**
   * 当播放到末尾时触发 ended 事件
   *
   *
   */
  bindended?: EventHandle;

  /**
   * 播放进度变化时触发，event.detail = {currentTime: '当前播放时间'} 。触发频率应该在 250ms 一次
   *
   *
   */
  bindtimeupdate?: EventHandle;

  /**
   * 当视频进入和退出全屏是触发，event.detail = {fullScreen: '当前全屏状态'}
   *
   * @since 1.4.0
   */
  bindfullscreenchange?: EventHandle;

  /**
   * 当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖
   * @default contain
   *
   */
  objectFit?: string;

  /**
   * 默认控件上的音频封面的图片资源地址，如果 controls 属性值为 false 则设置 poster 无效
   *
   *
   */
  poster?: string;
}

declare interface WxmlCameraElementProps extends WxmlElementProps {
  /**
   * 前置或后置，值为front, back
   * @default back
   *
   */
  'device-position'?: string;

  /**
   * 闪光灯，值为auto, on, off
   * @default auto
   *
   */
  flash?: string;

  /**
   * 摄像头在非正常终止时触发，如退出后台等情况
   *
   *
   */
  bindstop?: EventHandle;

  /**
   * 用户不允许使用摄像头时触发
   *
   *
   */
  binderror?: EventHandle;
}

declare interface WxmlMapElementProps extends WxmlElementProps {
  /**
   * 中心经度
   *
   *
   */
  longitude?: number;

  /**
   * 中心纬度
   *
   *
   */
  latitude?: number;

  /**
   * 缩放级别，取值范围为5-18
   * @default 16
   *
   */
  scale?: number;

  /**
   * 标记点
   *
   *
   */
  markers?: Array<{
    /**
     * 标记点id
     * marker点击事件回调会返回此id
     */
    id?: number;
    /**
     * 纬度
     * 浮点数，范围 -90 ~ 90
     */
    latitude: number;
    /**
     * 经度
     * 浮点数，范围 -180 ~ 180
     */
    longitude: number;
    /**
     * 标注点名
     */
    title?: string;
    /**
     * 显示的图标
     * 项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径
     */
    iconPath: string;
    /**
     * 旋转角度
     * 顺时针旋转的角度，范围 0 ~ 360，默认为 0
     */
    rotate?: number;
    /**
     * 标注的透明度
     * 默认1，无透明
     */
    alpha?: number;
    /**
     * 默认为图片实际宽度
     */
    width?: number;
    /**
     * 默认为图片实际高度
     */
    height?: number;
    /**
     * 自定义标记点上方的气泡窗口
     * @since 1.2.0
     */
    callout?: {
      /**
       * 文本
       */
      content?: string;
      /**
       * 文本颜色
       */
      color?: string;
      /**
       * 文字大小
       */
      fontSize?: number;
      /**
       * callout边框圆角
       */
      borderRadius?: number;
      /**
       * 背景色
       */
      bgColor?: Color;
      /**
       * 文本边缘留白
       */
      padding?: string;
      /**
       *
       */
      boxShadow?: string;
      /**
       * 'BYCLICK':点击显示; 'ALWAYS':常显
       */
      display?: 'BYCLICK' | 'ALWAYS';
    };
    /**
     * 为标记点旁边增加标签
     * 可识别换行符，x,y原点是marker对应的经纬度
     * @since 1.2.0
     */
    label?: {
      color?: Color;
      fontSize?: string;
      content?: string;
      x?: number;
      y?: number;
    };
    /**
     * 经纬度在标注图标的锚点，默认底边中点
     * {x, y}，x表示横向(0-1)，y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点
     * @since 1.2.0
     */
    anchor?: { x?: number; y?: number };
  }>;

  /**
   * 即将移除，请使用 markers
   *
   *
   */
  covers?: Array<any>;

  /**
   * 路线
   *
   *
   */
  polyline?: Array<{
    /**
     * 经纬度数组
     */
    points: Array<{
      latitude: number;
      longitude: number;
    }>;
    /**
     * 线的颜色
     * 8位十六进制表示，后两位表示alpha值，如：#000000AA
     */
    color?: Color;
    /**
     * 线的宽度
     */
    width?: number;
    /**
     * 是否虚线
     * @default false
     */
    dottedLine?: boolean;
    /**
     * 带箭头的线
     * 默认false，开发者工具暂不支持该属性
     * @since 1.2.0
     */
    arrowLine?: boolean;
    /**
     * 更换箭头图标
     * 在arrowLine为true时生效
     * @since 1.2.0
     */
    arrowIconPath?: string;
    /**
     * 线的边框颜色
     * @since 1.2.0
     */
    borderColor?: string;
    /**
     * 线的厚度
     * @since 1.2.0
     */
    borderWidth?: number;
  }>;

  /**
   * 圆
   *
   *
   */
  circles?: Array<{
    /**
     * 纬度
     * 浮点数，范围 -90 ~ 90
     */
    latitude: number;
    /**
     * 经度
     * 浮点数，范围 -180 ~ 180
     */
    longitude: number;
    /**
     * 描边的颜色
     * 8位十六进制表示，后两位表示alpha值，如：#000000AA
     */
    color?: Color;
    /**
     * 填充颜色
     * 8位十六进制表示，后两位表示alpha值，如：#000000AA
     */
    fillColor?: Color;
    /**
     * 半径
     */
    radius: number;
    /**
     * 描边的宽度
     */
    strokeWidth: number;
  }>;

  /**
   * 控件
   *
   *
   */
  controls?: Array<{
    /**
     * 距离地图的左边界多远
     * @default 0
     */
    left?: number;
    /**
     * 距离地图的上边界多远
     * @default 0
     */
    top?: number;
    /**
     * 控件宽度
     * 默认为图片宽度
     */
    width?: number;
    /**
     * 控件高度
     * 默认为图片高度
     */
    height?: number;
  }>;

  /**
   * 缩放视野以包含所有给定的坐标点
   *
   *
   */
  'include-points'?: Array<any>;

  /**
   * 显示带有方向的当前定位点
   *
   *
   */
  'show-location'?: boolean;

  /**
   * 点击标记点时触发
   *
   *
   */
  bindmarkertap?: EventHandle;

  /**
   * 点击标记点对应的气泡时触发
   *
   * @since 1.2.0
   */
  bindcallouttap?: EventHandle;

  /**
   * 点击控件时触发
   *
   *
   */
  bindcontroltap?: EventHandle;

  /**
   * 视野发生变化时触发
   *
   *
   */
  bindregionchange?: EventHandle;

  /**
   * 点击地图时触发
   *
   *
   */
  bindtap?: EventHandle;

  /**
   * 在地图渲染更新完成时触发
   *
   * @since 1.6.0
   */
  bindupdated?: EventHandle;
}

declare interface WxmlCanvasElementProps extends WxmlElementProps {
  /**
   * canvas 组件的唯一标识符
   *
   *
   */
  'canvas-id'?: string;

  /**
   * 当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新
   * @default false
   *
   */
  'disable-scroll'?: boolean;

  /**
   * 手指触摸动作开始
   *
   *
   */
  bindtouchstart?: EventHandle;

  /**
   * 手指触摸后移动
   *
   *
   */
  bindtouchmove?: EventHandle;

  /**
   * 手指触摸动作结束
   *
   *
   */
  bindtouchend?: EventHandle;

  /**
   * 手指触摸动作被打断，如来电提醒，弹窗
   *
   *
   */
  bindtouchcancel?: EventHandle;

  /**
   * 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动
   *
   *
   */
  bindlongtap?: EventHandle;

  /**
   * 当发生错误时触发 error 事件，detail = {errMsg: 'something wrong'}
   *
   *
   */
  binderror?: EventHandle;
}

declare interface WxmlOpenDataElementProps extends WxmlElementProps {
  /**
   * 开放数据类型
   *
   *
   */
  type?: 'groupName';

  /**
   * 当 type="groupName" 时生效, 群id
   *
   *
   */
  'open-gid'?: string;
}

declare interface WxmlWebViewElementProps extends WxmlElementProps {
  /**
   * webview 指向网页的链接。需登录小程序管理后台配置域名白名单。
   * @default none
   *
   */
  src?: string;
}

declare interface WxmlContactButtonElementProps extends WxmlElementProps {
  /**
   * 会话按钮大小，有效值 18-27，单位：px
   * @default 18
   *
   */
  size?: number;

  /**
   * 会话按钮的样式类型
   * @default default-dark
   *
   */
  type?: 'default-dark' | 'default-light';

  /**
   * 用户从该按钮进入会话时，开发者将收到带上本参数的事件推送。本参数可用于区分用户进入客服会话的来源。
   *
   *
   */
  'session-from'?: string;
}
