/// <reference types="wets-types/jsx" />
/// <reference types="wets-types/wx/page" />

export interface PageConfig {
  /**
   * 导航栏背景颜色，如"#000000"
   */
  navigationBarBackgroundColor?: string;
  /**
   * 导航栏标题颜色，仅支持 black/white
   */
  navigationBarTextStyle?: string;
  /**
   * 导航栏标题文字内容
   */
  navigationBarTitleText?: string;
  /**
   * 窗口的背景色
   */
  backgroundColor?: string;
  /**
   * 下拉背景字体、loading 图的样式，仅支持 dark/light
   */
  backgroundTextStyle?: string;
  /**
   * 是否开启下拉刷新，详见页面相关事件处理函数。
   */
  enablePullDownRefresh?: boolean;
  /**
   * 设置为 true 则页面整体不能上下滚动；只在 page.json 中有效，无法在 app.json 中设置该项
   */
  disableScroll?: boolean;
  /**
   * 页面上拉触底事件触发时距页面底部距离，单位为px
   * @default 50
   */
  onReachBottomDistance?: number;

  /**
   * 使用组件
   */
  usingComponents?: {
    [key: string]: string;
  };
}

export class Page<TypeProps = any, TypeData = any>
  implements PageInstance<TypeData> {
  /**
   * 每一个小程序页面也可以使用.json文件来对本页面的窗口表现进行配置。 页面的配置比app.json全局配置简单得多，只是设置 app.json 中的 window 配置项的内容，页面中配置项会覆盖 app.json 的 window 中相同的配置项。
   * 页面的.json只能设置 window 相关的配置项，以决定本页面的窗口表现，所以无需写 window 这个键
   */
  static Conf(config?: PageConfig) {
    return (target: { new (args: any): Page }) => {};
  }

  public initialData: { [key in keyof TypeData]?: TypeData[key] };

  public options: { [key: string]: any };

  public props: TypeProps;

  // 使用上层的context，这个地方主要是去使用
  public context: any;

  data: TypeData;

  setData: (
    data: { [key in keyof TypeData]?: TypeData[key] },
    callback?: () => void,
  ) => void;

  public render?(): JSX.Element;
}
