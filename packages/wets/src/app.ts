/// <reference types="wets-types/wx/app" />

import { PageConfig } from './page';


export interface SubPackagesConfig {
  /**
   * 分包根目录
   */
  root: string;
  /**
   * 分包别名，分包预下载时可以使用
   */
  name?: string;
  /**
   * 分包页面路径，相对与分包根目录
   */
  pages: string[];
  /**
   * 分包是否是独立分包
   */
  independent?: boolean;
}
export interface AppConfig {
  /**
   * 设置默认页面的窗口配置
   */
  window?: {
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
  };
  /**
   * 设置底部 tab 的配置
   */
  tabBar?: {
    /**
     * tab 上的文字默认颜色
     */
    color: string;
    /**
     * tab 上的文字选中时的颜色
     */
    selectedColor: string;
    /**
     * tab 的背景色
     */
    backgroundColor: string;
    /**
     * tabbar上边框的颜色， 仅支持 black/white
     */
    borderStyle?: string;
    /**
     * tab 的列表，详见 list 属性说明，最少2个、最多5个 tab
     */
    list: Array<{
      /**
       * 页面路径，必须在 pages 中先定义
       */
      pagePath: string;
      /**
       * tab 上按钮文字
       */
      text: string;
      /**
       * 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效
       */
      iconPath?: string;
      /**
       * 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效
       */
      selectedIconPath?: string;
    }>;
    /**
     * 可选值 bottom、top
     */
    position?: 'bottom' | 'top';
  };
  /**
   * 设置网络超时时间
   */
  networkTimeout?: {
    /**
     * wx.request的超时时间，单位毫秒，默认为：60000
     */
    request?: number;
    /**
     * wx.connectSocket的超时时间，单位毫秒，默认为：60000
     */
    connectSocket?: number;
    /**
     * wx.uploadFile的超时时间，单位毫秒，默认为：60000
     */
    uploadFile?: number;
    /**
     * wx.downloadFile的超时时间，单位毫秒，默认为：60000
     */
    downloadFile?: number;
  };
  /**
   * 可以在开发者工具中开启 debug 模式，在开发者工具的控制台面板，调试信息以 info 的形式给出，其信息有Page的注册，页面路由，数据更新，事件触发 。 可以帮助开发者快速定位一些常见的问题。
   */
  debug?: boolean;
  /**
   * 第三方平台
   */
  ext?: {
    /**
     * 配置 extAppid
     * extAppid 是授权调试的 AppID ，例如开发者在此处填写的是 wxf9c4501a76931b33 那么在 extEnable 为真的情况下，后续的开发逻辑都会基于 wxf9c4501a76931b33 来运行。
     */
    appid: string;
    /**
     * 开发自定义的数据字段
     * ext 字段是开发自定义的数据字段，在小程序中可以通过 wx.getExtConfigSync 或者 wx.getExtConfig 获取到这些配置信息。
     */
    config?: {
      [key: string]: any;
    };
    /**
     * 单独设置每个页面的 json
     * extPages 是一个对象，对象中的每个 key 应该是该小程序模板 app.json 中定义的页面，每个 key 对应的 value 是 page.json 中所规定的各项配置。
     * 当开发者设置这个配置以后，小程序框架会对应的修改相对应的 page 的配置信息。
     */
    pages?: {
      [page: string]: PageConfig;
    };
  };
  /**
   * appjson里扩展pages
   */
  pages?: string[],
    /**
   * appjson里扩展subpackages
   */
  subPackages?: SubPackagesConfig[];
  // 小程序之间跳转白名单appId配置
  navigateToMiniProgramAppIdList?: string[];
}


export class App implements AppInstance {
  /**
   * app.json文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。
   */
  static Conf(config?: AppConfig) {
    return (target: { new (args: any): App }) => {};
  }
}
