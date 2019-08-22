declare interface PageInstance<Data> {
  /**
   * 开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问
   */
  [key: string]: any;

  /**
   * 页面的初始数据
   */
  data?: Data;
  /**
   * route 字段可以获取到当前页面的路径。
   * @since 1.2.0
   */
  route?: string;
  /**
   * 生命周期函数--监听页面加载
   * 一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
   *
   * @param query  其他页面打开当前页面所调用的 query 参数
   */
  onLoad?: (query: { [key: string]: any }) => void;
  /**
   * 生命周期函数--监听页面初次渲染完成
   * 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
   * 对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。详见生命周期
   */
  onReady?: () => void;
  /**
   * 生命周期函数--监听页面显示
   * 每次打开页面都会调用一次。
   */
  onShow?: () => void;
  /**
   * 生命周期函数--监听页面隐藏
   * 当navigateTo或底部tab切换时调用
   */
  onHide?: () => void;
  /**
   * 生命周期函数--监听页面卸载
   * 当redirectTo或navigateBack的时候调用。
   */
  onUnload?: () => void;
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 监听用户下拉刷新事件。
   * 需要在app.json的window选项中或页面配置中开启enablePullDownRefresh。
   * 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
   */
  onPullDownRefresh?: () => void;
  /**
   * 页面上拉触底事件的处理函数
   * 监听用户上拉触底事件。
   * 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
   * 在触发距离内滑动期间，本事件只会被触发一次。
   */
  onReachBottom?: () => void;
  /**
   * 用户点击右上角转发
   * 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
   * 用户点击转发按钮的时候会调用
   * 此事件需要 return 一个 Object，用于自定义转发内容
   */
  onShareAppMessage?: (params: {
    /**
     * 当前小程序名称
     */
    title: string;
    /**
     * 当前页面 path ，必须是以 / 开头的完整路径
     */
    path: string;
  }) => void;
  /**
   * 页面滚动触发事件的处理函数
   * 监听用户滑动页面事件。
   * 参数为 Object，包含以下字段：
   */
  onPageScroll?: (params: {
    /**
     * 页面在垂直方向已滚动的距离（单位px）
     */
    scrollTop: number;
  }) => void;
  /**
   * setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。
   *
   * object 以 key，value 的形式表示将 this.data 中的 key 对应的值改变成 value。 callback 是一个回调函数，在这次setData对界面渲染完毕后调用。
   * 其中 key 可以非常灵活，以数据路径的形式给出，如 array[2].message，a.b.c.d，并且不需要在 this.data 中预先定义。
   *
   * 注意：
   * 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
   * 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
   * 请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题。
   */
  setData: (
    data: { [key in keyof Data]?: Data[key] },
    callback?: () => void,
  ) => void;
}

/**
 * 当前页面栈
 */
declare const getCurrentPages: () => PageInstance<any>[];
