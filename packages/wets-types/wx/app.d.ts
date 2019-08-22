declare interface OnLaunchOptions {
  /**
   * 打开小程序的路径
   */
  path: string;
  /**
   * 打开小程序的query
   */
  query: { [key: string]: any };
  /**
   * 打开小程序的场景值
   */
  scene: number;
  /**
   * shareTicket，详见 获取更多转发信息
   */
  shareTicket: string;
  /**
   * 当场景为由从另一个小程序或公众号或App打开时，返回此字段
   */
  referrerInfo: {
    /**
     * 来源小程序或公众号或App的 appId，详见下方说明
     *
     * 以下场景支持返回 referrerInfo.appId：
     * 场景值  场景  appId 信息含义
     * 1020  公众号 profile 页相关小程序列表  返回来源公众号 appId
     * 1035  公众号自定义菜单  返回来源公众号 appId
     * 1036  App 分享消息卡片  返回来源应用 appId
     * 1037  小程序打开小程序  返回来源小程序 appId
     * 1038  从另一个小程序返回  返回来源小程序 appId
     * 1043  公众号模板消息  返回来源公众号 appId
     */
    appId: string;
    /**
     * 来源小程序传过来的数据，scene=1037或1038时支持
     */
    extraData: { [key: string]: any };
  };
}

/**
 * getApp() 获取到
 */
declare interface AppInstance {
  /**
   * 开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问
   */
  [key: string]: any;

  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch?: (options: OnLaunchOptions) => void;

  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow?: (options: OnLaunchOptions) => void;

  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide?: () => void;

  /**
   * 错误监听函数
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError?: (err: any) => void;
}

/**
 * App 实例
 */
declare const getApp: () => AppInstance;
