declare interface WxTarget {
  /**
   * 事件源组件的id
   */
  id: string;
  /**
   * 当前组件的类型
   */
  tagName: string;
  /**
   * 事件源组件上由data-开头的自定义属性组成的集合
   */
  dataset: {
    [key: string]: any;
  };
}

declare interface WxTouch {
  /**
   *触摸点的标识符
   */
  identifier: number;
  /**
   * 距离文档左上角的距离，文档的左上角为原点 ，横向为X轴，纵向为Y轴
   */
  pageX: number;
  /**
   * 距离文档左上角的距离，文档的左上角为原点 ，横向为X轴，纵向为Y轴
   */
  pageY: number;
  /**
   * 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为X轴，纵向为Y轴
   */
  clientX: number;
  /**
   * 距离页面可显示区域（屏幕除去导航条）左上角距离，横向为X轴，纵向为Y轴
   */
  clientY: number;
}

declare interface WxCanvasTouch {
  /**
   * 触摸点的标识符
   */
  identifier: number;
  /**
   * 距离 Canvas 左上角的距离，Canvas 的左上角为原点 ，横向为X轴，纵向为Y轴
   */
  x: number;
  /**
   * 距离 Canvas 左上角的距离，Canvas 的左上角为原点 ，横向为X轴，纵向为Y轴
   */
  y: number;
}

declare interface WxBaseEvent {
  /**
   * 事件类型
   */
  type:
    | 'touchstart'
    | 'touchmove'
    | 'touchcancel'
    | 'touchend'
    | 'tap'
    | 'longtap'
    | 'longtap'
    | 'transitionend'
    | 'animationstart'
    | 'animationiteration'
    | 'animationend'
    | 'message';
  /**
   * 事件生成时的时间戳
   */
  timeStamp: number;
  /**
   * 触发事件的组件的一些属性值集合
   */
  target: WxTarget;
  /**
   * 当前组件的一些属性值集合
   */
  currentTarget: WxTarget;
  /**
   * 额外的信息
   */
  detail: { [key: string]: any };
}

declare interface WxTouchEvent extends WxBaseEvent {
  /**
   * 触摸事件，当前停留在屏幕中的触摸点信息的数组
   */
  touches: Array<WxTouch | WxCanvasTouch>;
  /**
   * 触摸事件，当前变化的触摸点信息的数组
   */
  changedTouches: Array<WxTouch | WxCanvasTouch>;
}

declare type Color = string;
declare type Float = number;
declare type EventHandle = (event: WxBaseEvent | WxTouchEvent) => void;
declare type Handler = (event: WxBaseEvent | WxTouchEvent) => void;
declare type HandleEvent = (event: WxBaseEvent | WxTouchEvent) => void;

declare interface WxmlElementProps {
  /**
   * key for react list item
   */
  key?: string | number;
  /**
   * 组件的唯一标示
   * 保持整个页面唯一
   */
  id?: string;
  /**
   * 组件的样式类
   * 在对应的 WXSS 中定义的样式类
   */
  className?: string;
  /**
   * 组件的内联样式
   * 可以动态设置的内联样式
   */
  style?: string;
  /**
   * 组件是否显示
   * 所有组件默认显示
   */
  hidden?: boolean;

  /*------------- bind 事件 ------------*/

  /**
   * 手指触摸动作开始
   */
  bindtouchstart?: (event: WxTouchEvent) => void;
  /**
   * 手指触摸后移动
   */
  bindtouchmove?: (event: WxTouchEvent) => void;
  /**
   * 手指触摸动作被打断，如来电提醒，弹窗
   */
  bindtouchcancel?: (event: WxTouchEvent) => void;
  /**
   * 手指触摸动作结束
   */
  bindtouchend?: (event: WxTouchEvent) => void;
  /**
   * 手指触摸后马上离开
   */
  bindtap?: (event: WxBaseEvent) => void;
  /**
   * 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发
   * @since 1.5.0
   */
  bindlongpress?: (event: WxBaseEvent) => void;
  /**
   * 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）
   */
  bindlongtap?: (event: WxBaseEvent) => void;
  /**
   * 会在 WXSS transition 或 wx.createAnimation 动画结束后触发
   */
  bindtransitionend?: (event: WxBaseEvent) => void;
  /**
   * 会在一个 WXSS animation 动画开始时触发
   */
  bindanimationstart?: (event: WxBaseEvent) => void;
  /**
   * 会在一个 WXSS animation 一次迭代结束时触发
   */
  bindanimationiteration?: (event: WxBaseEvent) => void;
  /**
   * 会在一个 WXSS animation 动画完成时触发
   */
  bindanimationend?: (event: WxBaseEvent) => void;
  /**
   * 网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息
   */
  bindmessage?: (event: WxBaseEvent) => void;
  /**
   * 网页加载成功时候触发此事件。e.detail = { src }
   */
  bindload?: (event: WxBaseEvent) => void;
  /**
   * 网页加载失败的时候触发此事件。e.detail = { src }
   */
  binderror?: (event: WxBaseEvent) => void;

  /*------------- catch 事件 ------------*/

  /**
   * 手指触摸动作开始
   */
  catchtouchstart?: (event: WxTouchEvent) => void;
  /**
   * 手指触摸后移动
   */
  catchtouchmove?: (event: WxTouchEvent) => void;
  /**
   * 手指触摸动作被打断，如来电提醒，弹窗
   */
  catchtouchcancel?: (event: WxTouchEvent) => void;
  /**
   * 手指触摸动作结束
   */
  catchtouchend?: (event: WxTouchEvent) => void;
  /**
   * 手指触摸后马上离开
   */
  catchtap?: (event: WxBaseEvent) => void;
  /**
   * 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发
   * @since 1.5.0
   */
  catchlongpress?: (event: WxBaseEvent) => void;
  /**
   * 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）
   */
  catchlongtap?: (event: WxBaseEvent) => void;
  /**
   * 会在 WXSS transition 或 wx.createAnimation 动画结束后触发
   */
  catchtransitionend?: (event: WxBaseEvent) => void;
  /**
   * 会在一个 WXSS animation 动画开始时触发
   */
  catchanimationstart?: (event: WxBaseEvent) => void;
  /**
   * 会在一个 WXSS animation 一次迭代结束时触发
   */
  catchanimationiteration?: (event: WxBaseEvent) => void;
  /**
   * 会在一个 WXSS animation 动画完成时触发
   */
  catchanimationend?: (event: WxBaseEvent) => void;
}
