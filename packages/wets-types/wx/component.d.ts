declare interface ComponentInstance<Props, Data> {
  [key: string]: any;

  /**
   * @desc 对外属性列表
   */
  properties?: Props;

  /**
   * @desc 组件内部数据
   */
  data?: Data;

  /**
   * @desc 自定义事件列表
   */
  methods?: {
    [key: string]: Function;
  };

  /**
   * @desc 组件间代码复用机制
   */
  behavior?: String | Array<any>;

  /**
   * @desc 生命周期函数
   */
  created?: Function;

  /**
   * @desc 生命周期函数
   */
  attached?: Function;

  /**
   * @desc 生命周期函数
   */
  ready?: Function;

  /**
   * @desc 生命周期函数
   */
  moved?: Function;

  /**
   * @desc 生命周期函数
   */
  detached?: Function;

  /**
   * @desc 组件关系
   */
  relations?: Object;

  /**
   * @desc 外部样式类，就是一个className数组
   */
  externalClasses?: String | Array<any>;

  /**
   * @desc 一些配置选项
   */
  options?: {
    [key: string]: any;
  };

  /**
   * @desc 组件生命周期选项，都放在这个里面去做声明
   */
  lifetimes?: Object;

  /**
   * @desc 组件所在页面的生命周期声明对象
   */
  pageLifetimes?: Object;

  /**
   * @desc 定义段过滤器，用户自定义组件扩展
   */
  definitionFilter?: Function;
}
