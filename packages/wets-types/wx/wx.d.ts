declare interface StringKeyMap {
  [key: string]: any;
}

declare interface BoundingClientRect {
  [key: string]: any;
  id: any; // 节点的ID
  dataset: any; // 节点的dataset
  left: any; // 节点的左边界坐标
  right: any; // 节点的右边界坐标
  top: any; // 节点的上边界坐标
  bottom: any; // 节点的下边界坐标
  width: any; // 节点的宽度
  height: any; // 节点的高度
}

declare interface NodesRef {
  fields: (
    fields: {
      /**
       * 是否返回节点id
       */
      id?: any;

      /**
       * 是否返回节点dataset
       */
      dataset?: any;

      /**
       * 是否返回节点布局位置（left right top bottom）
       */
      rect?: any;

      /**
       * 是否返回节点尺寸（width height）
       */
      size?: any;

      /**
       * 是否返回节点的 scrollLeft scrollTop ，节点必须是scroll-view或者viewport
       */
      scrollOffset?: any;

      /**
       * 指定属性名列表，返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值， id class style 和事件绑定的属性值不可获取）
       */
      properties?: any[];
    },
    cb?: CallbackFn<{
      dataset: any; // 节点的dataset
      width: any; // 节点的宽度
      height: any; // 节点的高度
      scrollLeft: any; // 节点的水平滚动位置
      scrollTop: any; // 节点的竖直滚动位置
      scrollX: any; // 节点 scroll-x 属性的当前值
      scrollY: any; // 节点 scroll-x 属性的当前值
      [key: string]: any;
    }>,
  ) => SelectorQuery;

  scrollOffset: (
    cb: CallbackFn<{
      id: any; // 节点的ID
      dataset: any; // 节点的dataset
      scrollLeft: any; // 节点的水平滚动位置
      scrollTop: any; // 节点的竖直滚动位置
    }>,
  ) => SelectorQuery;

  boundingBoundingClientRect: (
    cb: CallbackFn<BoundingClientRect | Array<BoundingClientRect>>,
  ) => SelectorQuery;
  [key: string]: (...args: any[]) => any;
}

declare interface SelectorQuery {
  /**
   * 参考下面详细介绍
   */
  in(object: any): SelectorQuery;

  /**
   * 参考下面详细介绍
   */
  select(selector: any): NodesRef;

  /**
   * 参考下面详细介绍
   */
  selectAll(selector: any): NodesRef;

  /**
   * 参考下面详细介绍
   */
  selectViewport(selector?: any): NodesRef;

  /**
   * 参考下面详细介绍
   */
  exec(callback?: CallbackFn<any>): void;
}

declare interface Animation {
  /**
   * 透明度，参数范围 0~1
   */
  opacity?: any;

  /**
   * 颜色值
   */
  backgroundColor?: any;

  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  width?: any;

  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  height?: any;

  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  top?: any;

  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  left?: any;

  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  bottom?: any;

  /**
   * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
   */
  right?: any;

  /**
   * deg的范围-180~180，从原点顺时针旋转一个deg角度
   */
  rotate(deg: number): Animation;

  /**
   * deg的范围-180~180，在X轴旋转一个deg角度
   */
  rotateX(deg: number): Animation;

  /**
   * deg的范围-180~180，在Y轴旋转一个deg角度
   */
  rotateY(deg: number): Animation;

  /**
   * deg的范围-180~180，在Z轴旋转一个deg角度
   */
  rotateZ(deg: number): Animation;

  /**
   * 同transform-function rotate3d
   */
  rotate3d(x: number, y: number, z: number, deg: number): Animation;

  /**
   * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
   */
  scale(sx: number, sy?: number): Animation;

  /**
   * 在X轴缩放sx倍数
   */
  scaleX(sx: number): Animation;

  /**
   * 在Y轴缩放sy倍数
   */
  scaleY(sy: number): Animation;

  /**
   * 在Z轴缩放sy倍数
   */
  scaleZ(sz: number): Animation;

  /**
   * 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数
   */
  scale3d(sx: number, sy: number, sz: number): Animation;

  /**
   * 一个参数时，表示在X轴偏移tx，单位px；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
   */
  translate(tx: number, ty?: number): Animation;

  /**
   * 在X轴偏移tx，单位px
   */
  translateX(tx: number): Animation;

  /**
   * 在Y轴偏移tx，单位px
   */
  translateY(tx: number): Animation;

  /**
   * 在Z轴偏移tx，单位px
   */
  translateZ(tx: number): Animation;

  /**
   * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
   */
  translate3d(tx: number, ty: number, tz: number): Animation;

  /**
   * 参数范围-180~180；一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
   */
  skew(ax: number, ay?: number): Animation;

  /**
   * 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度
   */
  skewX(ax: number): Animation;

  /**
   * 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度
   */
  skewY(ay: number): Animation;

  /**
   * 同transform-function matrix
   */
  matrix(
    a: number,
    b: number,
    c: number,
    d: number,
    tx: number,
    ty: number,
  ): Animation;

  /**
   * 同transform-function matrix3d
   */
  matrix3d(...arg: any[]): Animation;

  export(option?: any): any;

  step(option?: any): any;
}

declare interface CanvasContext {
  [key: string]: (...args: any[]) => any;
}

declare interface Callback<T> {
  /**
   * 收到开发者服务成功返回的回调函数
   */
  success?: (res: T) => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: (...args: any[]) => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (...args: any[]) => void;
}

declare interface CallbackWithSuccess<T> extends Callback<T> {
  /**
   * 收到开发者服务成功返回的回调函数
   */
  success: (res: T) => void;
}

/**
 * 返回一个 requestTask 对象，通过 requestTask，可中断请求任务。
 */
declare interface RequestTask {
  /**
   * 中断请求任务
   * @since 1.4.0
   */
  abort: () => void;
}

declare interface Task {
  /**
   * 监听上传进度变化
   * @since 1.4.0
   */
  onProgressUpdate: (
    cb: (res: {
      /**
       * 上传进度百分比
       */
      progress: number;
      /**
       * 已经上传的数据长度，单位 Bytes
       */
      totalBytesSent: number;
      /**
       * 预期需要上传的数据总长度，单位 Bytes
       */
      totalBytesExpectedToSend: number;
    }) => void,
  ) => void;
  /**
   * 中断上传任务
   * @since 1.4.0
   */
  abort: () => void;
}

declare interface GetStorageResult<T> {
  errMsg: string;
  /**
   * key对应的内容
   */
  data: T;
}

declare interface GetStorageInfoResult {
  /**
   * 当前storage中所有的key
   */
  keys: string[];
  /**
   * 当前占用的空间大小, 单位kb
   */
  currentSize: number;
  /**
   * 限制的空间大小，单位kb
   */
  limitSize: number;
}

declare type NavigateOption = {
  url: string;
} & Callback<void>;

declare interface CallbackFn<T> {
  (res: T): void;
}

declare interface CallbackOptical<T> {
  /**
   * 收到开发者服务成功返回的回调函数
   */
  success?: (res?: T) => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: (...args: any[]) => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (...args: any[]) => void;
}

declare interface ImageDetail {
  /**
   * 图片宽度，单位px
   */
  width: number;

  /**
   * 图片高度，单位px
   */
  height: number;

  /**
   * 返回图片的本地路径
   */
  path: string;
}

declare interface ImageFile {
  /**
   * 本地文件路径
   */
  path?: string;
  /**
   * 本地文件路径
   */
  size?: number;
}

declare interface chooseImageResult {
  /**
   * 图片的本地文件路径列表
   */
  tempFilePaths?: string[];
  /**
   * 图片的本地文件列表，每一项是一个 File 对象
   */
  tempFiles?: ImageFile[];
}

declare interface chooseImageOption {
  /**
   * 最多可以选择的图片张数，默认9
   */
  count?: number;
  /**
   * original 原图，compressed 压缩图，默认二者都有
   */
  sizeType?: string[];
  /**
   * album 从相册选图，camera 使用相机，默认二者都有
   */
  sourceType?: string[];
}

declare interface previewOption {
  /**
   * 当前显示图片的链接，不填则默认为 urls 的第一张
   */
  current?: string;
  /**
   * 需要预览的图片链接列表
   */
  urls?: string[];
}

declare interface WebSocketRequestOption {
  /**
   * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
   */
  url: string;
  /**
   * HTTP Header , header 中不能设置 Referer
   */
  header?: StringKeyMap;
  /**
   * 默认是GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   */
  method?: string;
  /**
   * 子协议数组
   */
  protocols?: string[];
}

declare interface WebSocketRequestSendOption {
  /**
   * 客户端发送或者服务器返回的消息
   */
  data: String | ArrayBuffer;
}

declare interface WebSocketMessageResult extends WebSocketRequestSendOption {}

declare interface WebSocketCloseOption {
  code?: number;
  reason?: string;
}

declare interface RequestOption {
  /**
   * 开发者服务器接口地址
   */
  url: string;
  /**
   * 请求的参数
   */
  data?: StringKeyMap | string;
  /**
   * 设置请求的 header，header 中不能设置 Referer。
   */
  header?: StringKeyMap;
  /**
   * （需大写）有效值：
   */
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT';
  /**
   * 如果设为json，会尝试对返回的数据做一次 JSON.parse
   * @default json
   */
  dataType?: string;
}

declare interface RequestResult {
  /**
   * 开发者服务器返回的数据
   *
   * 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
   * 对于 header['content-type'] 为 application/json 的数据，会对数据进行 JSON 序列化
   * 对于 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
   */
  data: object | string;
  /**
   * 开发者服务器返回的 HTTP 状态码
   */
  statusCode: number;
  /**
   * 开发者服务器返回的 HTTP Response Header
   * @since 1.2.0
   */
  header: StringKeyMap;
}

declare interface LoginResult {
  /**
   * 调用结果
   */
  errMsg: string;
  /**
   * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
   */
  code: string;
}

declare interface GetUserInfoOption {
  /**
   * 是否带上登录态信息
   * @since 1.1.0
   */
  withCredentials?: boolean;
  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。
   * @since 1.3.0
   */
  lang?: string;
}

declare interface GetUserInfoResult {
  /**
   * 用户信息对象，不包含 openid 等敏感信息
   */
  userInfo: {
    /**
     * 用户昵称
     */
    nickName: string;
    /**
     * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
     */
    avatarUrl: string;
    /**
     * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
     */
    gender: string;
    /**
     * 用户所在城市
     */
    city: string;
    /**
     * 用户所在省份
     */
    province: string;
    /**
     * 用户所在国家
     */
    country: string;
    /**
     * 用户的语言，简体中文为zh_CN
     */
    language: string;
  };

  /**
   * 不包括敏感信息的原始数据字符串，用于计算签名。
   */
  rawData: string;

  /**
   * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档 signature。
   */
  signature: string;

  /**
   * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
   */
  encryptedData: string;

  /**
   * 加密算法的初始向量，详细见加密数据解密算法
   */
  iv: string;
}

declare interface SetStorageOption {
  /**
   * 本地缓存中的指定的 key
   */
  key: string;
  /**
   * 需要存储的内容
   */
  data: any;
}

declare interface GetStorageOption {
  /**
   * 本地缓存中的指定的 key
   */
  key: string;
}

declare interface RequestPaymentOption {
  /**
   * 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
   */
  timeStamp: string;
  /**
   * 随机字符串，长度为32个字符以下。
   */
  nonceStr: string;
  /**
   * 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
   */
  package: string;
  /**
   * 签名算法，暂支持 MD5
   */
  signType: string;
  /**
   * 签名,具体签名方案参见小程序支付接口文档;
   */
  paySign: string;
}

declare interface RequestPaymentResult {
  errMsg: string;
}

declare interface GetLocationOption {
  /**
   * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
   */
  type?: string;
  /**
   * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
   * @since 1.6.0
   */
  altitude?: boolean;
}

declare interface GetLocationResult {
  /**
   * 纬度，浮点数，范围为-90~90，负数表示南纬
   */
  latitude: number;
  /**
   * 经度，浮点数，范围为-180~180，负数表示西经
   */
  longitude: number;
  /**
   * 速度，浮点数，单位m/s
   */
  speed: number;
  /**
   * 位置的精确度
   */
  accuracy: number;
  /**
   * 高度，单位 m
   * @since 1.2.0
   */
  altitude: number;
  /***
   * 垂直精度，单位 m（Android 无法获取，返回 0）
   * @since 1.2.0
   */
  verticalAccuracy: number;
  /**
   * 水平精度，单位 m
   * @since 1.2.0
   */
  horizontalAccuracy: number;
}

declare interface Wx {
  [key: string]: (...args: any[]) => any;

  /**
   * 发起网络请求。
   * 使用前请先阅读 https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-network.html
   */
  request(options: RequestOption & Callback<RequestResult>): RequestTask;

  /**
   * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data 。使用前请先阅读说明。
   * 如页面通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。
   */
  uploadFile(
    options: {
      /**
       * 开发者服务器 url
       */
      url: string;
      /**
       * 要上传文件资源的路径
       */
      filePath: string;
      /**
       * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
       */
      name: string;
      /**
       * HTTP 请求 Header, header 中不能设置 Referer
       */
      header?: StringKeyMap;
      /**
       * HTTP 请求中其他额外的 form data
       */
      formData?: StringKeyMap;
    } & Callback<{
      /**
       * 开发者服务器返回的数据
       */
      data: string;
      /**
       * 开发者服务器返回的 HTTP 状态码
       */
      statusCode: number;
    }>,
  ): Task;

  /**
   * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。使用前请先阅读说明。
   */
  downloadFile(
    options: {
      /**
       * 下载资源的 url
       */
      url: string;
      /**
       * HTTP 请求 Header，header 中不能设置 Referer
       */
      header?: StringKeyMap;
    } & Callback<{
      /**
       * 临时文件路径，下载后的文件会存储到一个临时文件
       */
      tempFilePath: string;
      /**
       * 开发者服务器返回的 HTTP 状态码
       */
      statusCode: number;
    }>,
  ): Task;

  /**
   *
   * 创建一个 WebSocket 连接
   */
  connectSocket(
    options: WebSocketRequestOption & CallbackOptical<Object | string | number>,
  ): any;

  /**
 * 监听WebSocket连接打开事件。
 * wx.onSocketOpen(function(res){
           console.log('WebSocket连接已打开！')
       })
 */
  onSocketOpen(cb: CallbackFn<Object | string | number>): any;

  /**
 * onSocketError 监听WebSocket错误。
 * wx.onSocketError(function(res){
          console.log('WebSocket连接打开失败，请检查！')
       })
 */
  onSocketError(cb: CallbackFn<Object | string | number>): any;

  /**
   * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
   */
  sendSocketMessage(
    options: WebSocketRequestSendOption &
      CallbackOptical<Object | string | number>,
  ): any;

  /**
   * onSocketMessage 监听WebSocket接受到服务器的消息事件。
   */
  onSocketMessage(cb: (res: WebSocketMessageResult) => void): any;

  /**
   * 关闭WebSocket连接。
   */
  closeSocket(option?: WebSocketCloseOption & CallbackOptical<any>): any;

  /**
   * 监听WebSocket关闭。
   */
  onSocketClose(cb: CallbackFn<any>): any;

  /**
 * 从本地相册选择图片或使用相机拍照。
 * wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
                  // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
           var tempFilePaths = res.tempFilePaths
          }
        })
 */
  chooseImage(options: chooseImageOption & Callback<chooseImageResult>): any;

  /**
   * 预览图片。
   */
  previewImage(options: previewOption & CallbackOptical<any>): any;

  /**
   * 获取图片信息
   */
  getImageInfo(
    options: {
      /**
       * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
       */
      src: string;
    } & CallbackOptical<ImageDetail>,
  ): any;

  /**
 * 基础库 1.2.0 开始支持，低版本需做兼容处理
 保存图片到系统相册。需要用户授权 scope.writePhotosAlbum
 */
  saveImageToPhotosAlbum(
    options: {
      /**
       * 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
       */
      filePath: string;
    } & CallbackOptical<{
      /**
       * 调用结果
       */
      errMsg: string;
    }>,
  ): any;

  /**
 * 注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getRecorderManager 接口
 开始录音。当主动调用wx.stopRecord，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。当用户离开小程序时，此接口无法调用。
 此接口 需要用户授权 scope.record
 */
  startRecord(options: CallbackOptical<{ tempFilePath: string }>): any;

  /**
   * 主动调用停止录音。
   */
  stopRecord(): any;

  /**
 * 基础库 1.6.0 开始支持，低版本需做兼容处理

 获取全局唯一的录音管理器 recorderManager。

 recorderManager
 */
  getRecorderManager(): {
    /**
     * 录音开始事件
     */
    onStart: CallbackFn<CallbackFn<any>>;
    /**
     * 录音停止事件，会回调文件地址
     */
    onStop: CallbackFn<CallbackFn<{ tempFilePath: string }>>;
    /**
     * 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件
     */
    onFrameRecorded: CallbackFn<
      CallbackFn<{ frameBuffer: ArrayBuffer; isLastFrame: boolean }>
    >;
    /**
     * 录音错误事件, 会回调错误信息
     */
    onError: CallbackFn<CallbackFn<{ errMsg: string }>>;
    /**
     * 录音暂停事件
     */
    onPause: CallbackFn<CallbackFn<any>>;
    /**
     *
     暂停录音
     */
    pause: CallbackFn<any>;
    /**
     * 继续录音
     */
    resume: CallbackFn<any>;
    /**
     * 停止录音
     */
    stop: CallbackFn<any>;

    /**
     * 开始录音
     const options = {
          duration: 10000,
          sampleRate: 44100,
          numberOfChannels: 1,
          encodeBitRate: 192000,
          format: 'aac',
          frameSize: 50
        }
     */
    start: CallbackFn<{
      /**
       * 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
       */
      duration?: number;
      /**
       * 采样率，有效值 8000/16000/44100
       */
      sampleRate?: number;
      /**
       * 录音通道数，有效值 1/2
       */
      numberOfChannels?: number;
      /**
         * encodeBitRate 编码码率，有效值见下表格
         * 其中，采样率和码率有一定要求，具体有效值如下：
         采样率	编码码率
         8000	16000 ~ 48000
         11025	16000 ~ 48000
         12000	24000 ~ 64000
         16000	24000 ~ 96000
         22050	32000 ~ 128000
         24000	32000 ~ 128000
         32000	48000 ~ 192000
         44100	64000 ~ 320000
         48000	64000 ~ 320000
         */
      encodeBitRate?: number;
      /**
       * 音频格式，有效值 aac/mp3
       */
      format?: string;
      /**
       * 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
       */
      frameSize?: number;
    }>;
  };

  /**
 * wx.playVoice(OBJECT)
 注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口

 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
 */
  playVoice(
    options: { filePath: string; duration?: number } & CallbackOptical<any>,
  ): any;

  /**
   * pauseVoice
   * 暂停正在播放的语音。再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 wx.stopVoice。
   */
  pauseVoice(): any;

  /**
   * 结束播放语音。
   */
  stopVoice(): any;

  /**
 * 注意：1.2.0 版本开始，本接口不再维护。建议使用能力更强的 wx.getBackgroundAudioManager 接口

 获取后台音乐播放状态。
 */
  getBackgroundAudioPlayerState(
    options: CallbackOptical<{
      /**
       * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
       */
      duration?: any;
      /**
       * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
       */
      currentPosition?: any;
      /**
       * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
       */
      status?: any;
      /**
       * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
       */
      downloadPercent?: any;
      /**
       * 歌曲数据链接，只有在当前有音乐播放时返回
       */
      dataUrl?: any;
    }>,
  ): void;

  /**
   * 使用后台播放器播放音乐，对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户点击“显示在聊天顶部”时，音乐不会暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。
   */

  playBackgroundAudio(
    options: {
      /**
       * 音乐链接，目前支持的格式有 m4a, aac, mp3, wav
       */
      dataUrl: string;
      /**
       * 	音乐标题
       */
      title?: string;

      /**
       * 封面URL
       */
      coverImgUrl?: string;
    } & CallbackOptical<any>,
  ): any;

  /**
   * 暂停播放音乐。
   */
  pauseBackgroundAudio(): any;

  /**
   * 控制音乐播放进度。
   */
  seekBackgroundAudio(
    options: { position: number } & CallbackOptical<any>,
  ): any;

  /**
   * stopBackgroundAudio
   * 停止播放音乐。
   */
  stopBackgroundAudio(): any;

  /**
   * 监听音乐播放。
   */
  onBackgroundAudioPlay(cb: CallbackFn<any>): void;

  /**
   * 监听音乐暂停。
   */
  onBackgroundAudioPause(cb: CallbackFn<any>): void;

  /**
   * 监听音乐停止。
   */
  onBackgroundAudioStop(cb: CallbackFn<any>): void;

  /**
 * 基础库 1.2.0 开始支持，低版本需做兼容处理

 获取全局唯一的背景音频管理器 backgroundAudioManager。
 */
  getBackgroundAudioManager(): {
    /**
     * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
     */
    readonly duration: number;
    /**
     * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
     */
    readonly currentTime: number;

    /**
     * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
     */
    readonly paused: boolean;

    /**
     * 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav
     */
    src: string;
    /**
     * 音频开始播放的位置（单位：s）
     */
    startTime: number;

    /**
     * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
     */
    readonly buffered: number;

    /**
     * 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
     */
    title: string;

    /**
     * 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    epname: string;

    /**
     * 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    singer: string;

    /**
     * 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
     */
    coverImgUrl: string;

    /**
     * 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
     */
    webUrl: string;

    /**
     * play		播放
     */
    play(): any;

    /**
     * 		暂停
     */
    pause(): any;

    /**
     * 		停止
     */
    stop(): any;
    /**
     * 	跳转到指定位置，单位 s
     */
    seek(position: any): any;
    /**
     * 	背景音频进入可以播放状态，但不保证后面可以流畅播放
     */
    onCanplay(cb: CallbackFn<any>): void;
    /**
     * 	  onPlay	callback	背景音频播放事件
     */
    onPlay(cb: CallbackFn<any>): void;
    /**
     * 	 onPause	callback	背景音频暂停事件
     */
    onPause(cb: CallbackFn<any>): void;
    /**
     * 	 onStop	callback	背景音频停止事件
     */
    onStop(cb: CallbackFn<any>): void;
    /**
     * 	  onEnded	callback	背景音频自然播放结束事件
     */
    onEnded(cb: CallbackFn<any>): void;
    /**
     * onTimeUpdate	callback	背景音频播放进度更新事件
     */
    onTimeUpdate(cb: CallbackFn<any>): void;
    /**
     * 	 onPrev	callback	用户在系统音乐播放面板点击上一曲事件（iOS only）
     */
    onPrev(cb: CallbackFn<any>): void;
    /**
     * 	 onNext	callback	用户在系统音乐播放面板点击下一曲事件（iOS only）
     */
    onNext(cb: CallbackFn<any>): void;

    /**
     * 背景音频播放错误事件
     * errcode 说明
     errCode	说明
     10001	系统错误
     10002	网络错误
     10003	文件错误
     10004	格式错误
     -1	未知错误
     */
    onError(cb: CallbackFn<any>): any;
    /**
     * 	音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     */
    onWaiting(cb: CallbackFn<any>): any;
    /**
     * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     */
    onWaiting(cb: CallbackFn<any>): any;
  };

  /**
 *   wx.createAudioContext(audioId, this)
 注意：1.6.0 版本开始，本接口不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口
 创建并返回 audio 上下文 audioContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 &lt;audio/&gt; 组件
 audioContext
 audioContext 通过 audioId 跟一个 &lt;audio/&gt; 组件绑定，通过它可以操作对应的 &lt;audio/&gt; 组件。
 audioContext 对象的方法列表：

 */
  createAudioContext(
    audioId: string,
    ctx?: any,
  ): {
    /**
     * 音频的地址
     */
    setSrc(src?: any): any;

    /**
     * 播放
     */
    play(): any;

    /**
     * 暂停
     */
    pause(): any;

    /**
     * 跳转到指定位置，单位 s
     */
    seek(postion: number): any;
  };

  /**
 *   wx.createInnerAudioContext()

 基础库 1.6.0 开始支持，低版本需做兼容处理

 创建并返回内部 audio 上下文 innerAudioContext 对象。本接口是 wx.createAudioContext 升级版。
 innerAudioContext
 innerAudioContext 对象的属性列表：

 */
  createInnerAudioContext(): {
    /**
     * 音频的数据链接，用于直接播放。
     */
    src?: string;

    /**
     * 开始播放的位置（单位：s），默认 0
     */
    startTime?: number;

    /**
     * 是否自动开始播放，默认 false
     */
    autoplay?: boolean;

    /**
     * 是否循环播放，默认 false
     */
    loop?: boolean;

    /**
     * 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true
     */
    obeyMuteSwitch?: boolean;

    /**
     * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
     */
    duration?: number;

    /**
     * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6 位
     */
    currentTime?: number;

    /**
     * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
     */
    paused?: boolean;

    /**
     * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
     */
    buffered?: number;

    /**
     * 播放
     */
    play(): any;

    /**
     * 暂停
     */
    pause(): any;

    /**
     * 停止
     */
    stop(): any;

    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): any;

    /**
     * 销毁当前实例
     */
    destroy(): any;

    /**
     * 音频进入可以播放状态，但不保证后面可以流畅播放
     */
    onCanplay?: CallbackFn<any>;

    /**
     * 音频播放事件
     */
    onPlay?: CallbackFn<any>;

    /**
     * 音频暂停事件
     */
    onPause?: CallbackFn<any>;

    /**
     * 音频停止事件
     */
    onStop?: CallbackFn<any>;

    /**
     * 音频自然播放结束事件
     */
    onEnded?: CallbackFn<any>;

    /**
     * 音频播放进度更新事件
     */
    onTimeUpdate?: CallbackFn<any>;

    /**
     * 音频播放错误事件
     */
    onError?: CallbackFn<any>;

    /**
     * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     */
    onWaiting?: CallbackFn<any>;

    /**
     * 音频进行 seek 操作事件
     */
    onSeeking?: CallbackFn<any>;

    /**
     * 音频完成 seek 操作事件
     */
    onSeeked?: CallbackFn<any>;
  };

  /**
 *   wx.chooseVideo(OBJECT)
 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。


 */
  chooseVideo(
    options: {
      /**
       * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
       */
      sourceType?: string[];

      /**
       * 是否压缩所选的视频源文件，默认值为true，需要压缩
       */
      compressed?: boolean;

      /**
       * 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
       */
      maxDuration?: number;

      /**
       * 默认调起的为前置还是后置摄像头。front: 前置，back: 后置，默认 back
       */
      camera?: string;
    } & Callback<{
      /**
       * 选定视频的临时文件路径
       */
      tempFilePath?: any;

      /**
       * 选定视频的时间长度
       */
      duration?: any;

      /**
       * 选定视频的数据量大小
       */
      size?: any;

      /**
       * 返回选定视频的长
       */
      height?: any;

      /**
       * 返回选定视频的宽
       */
      width?: any;
    }>,
  ): any;

  /**
 *   wx.saveVideoToPhotosAlbum(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 保存视频到系统相册。需要用户授权 scope.writePhotosAlbum


 */
  saveVideoToPhotosAlbum(
    options: {
      /**
       * 视频文件路径，可以是临时文件路径也可以是永久文件路径
       */
      filePath: string;
    } & Callback<{
      /**
       * 调用结果
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.createVideoContext(videoId, this)
 创建并返回 video 上下文 videoContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 &lt;video/&gt; 组件
 videoContext
 videoContext 通过 videoId 跟一个 video 组件绑定，通过它可以操作一个 video 组件。
 videoContext 对象的方法列表：

 */
  createVideoContext(
    videoId: string,
    ctx?: any,
  ): {
    /**
     * 播放
     */
    play(): any;

    /**
     * 暂停
     */
    pause(): any;

    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): any;

    /**
     * 发送弹幕，danmu 包含两个属性 text, color。
     */
    sendDanmu(danmu: { text: any; color: any }): any;

    /**
     * 设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5
     */
    playbackRate(rate: any): void;

    /**
     * 进入全屏
     */
    requestFullScreen(): any;

    /**
     * 退出全屏
     */
    exitFullScreen(): any;
  };

  /**
 *   wx.createCameraContext(this)

 基础库 1.6.0 开始支持，低版本需做兼容处理

 创建并返回 camera 上下文 cameraContext 对象，cameraContext 与页面的 camera 组件绑定，一个页面只能有一个camera，通过它可以操作对应的 &lt;camera/&gt; 组件。
 在自定义组件下，第一个参数传入组件实例this，以操作组件内 &lt;camera/&gt; 组件
 cameraContext
 cameraContext 对象的方法列表：

 */
  createCameraContext(
    ctx?: any,
  ): {
    /**
     * 拍照，可指定质量，成功则返回图片
     */
    takePhoto(
      options: {
        /**
         * 成像质量，值为high, normal, low，默认normal
         */
        quality?: string;
      } & Callback<any>,
    ): any;

    /**
     * 开始录像
     */
    startRecord(
      options: {
        /**
         * 超过30s或页面onHide时会结束录像，res = { tempThumbPath, tempVideoPath }
         */
        timeoutCallback?: CallbackFn<{
          tempThumbPath?: any;
          tempVideoPath?: any;
        }>;
      } & Callback<any>,
    ): any;

    /**
     * 结束录像，成功则返回封面与视频
     */
    stopRecord(
      options: Callback<{ tempThumbPath?: any; tempVideoPath?: any }>,
    ): void;
  };

  /**
 *   wx.openBluetoothAdapter(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 初始化小程序蓝牙模块，生效周期为调用wx.openBluetoothAdapter至调用wx.closeBluetoothAdapter或小程序被销毁为止。
 在小程序蓝牙适配器模块生效期间，开发者可以正常调用下面的小程序API，并会收到蓝牙模块相关的on回调。
 OBJECT参数说明：

 Bug & Tip
 tip: 基础库版本 1.1.0 开始支持，低版本需做兼容处理
 tip: 在没有调用wx.openBluetoothAdapter的情况下调用小程序其它蓝牙模块相关API，API会返回错误，错误码为10000
 bug: 在用户蓝牙开关未开启或者手机不支持蓝牙功能的情况下，调用wx.openBluetoothAdapter会返回错误，错误码为10001，表示手机蓝牙功能不可用；此时小程序蓝牙模块已经初始化完成，可通过wx.onBluetoothAdapterStateChange监听手机蓝牙状态的改变，也可以调用蓝牙模块的所有API。

 */
  openBluetoothAdapter(options: Callback<any>): any;

  /**
 *   wx.closeBluetoothAdapter(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 关闭蓝牙模块，使其进入未初始化状态。调用该方法将断开所有已建立的链接并释放系统资源。建议在使用小程序蓝牙流程后调用，与wx.openBluetoothAdapter成对调用。
 OBJECT参数说明：

 */
  closeBluetoothAdapter(options: Callback<any>): any;

  /**
 *   wx.getBluetoothAdapterState(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 获取本机蓝牙适配器状态
 OBJECT参数说明：

 */
  getBluetoothAdapterState(
    options: Callback<{
      /**
       * 是否正在搜索设备
       */
      discovering?: boolean;

      /**
       * 蓝牙适配器是否可用
       */
      available?: boolean;

      /**
       * 成功：ok，错误：详细信息
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.onBluetoothAdapterStateChange(CALLBACK)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 监听蓝牙适配器状态变化事件
 CALLBACK参数说明：

 */
  onBluetoothAdapterStateChange(
    cb: CallbackFn<{
      /**
       * 蓝牙适配器是否可用
       */
      available?: boolean;

      /**
       * 蓝牙适配器是否处于搜索状态
       */
      discovering?: boolean;
    }>,
  ): any;

  /**
 *   wx.startBluetoothDevicesDiscovery(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
 OBJECT参数说明：

 services参数说明：某些蓝牙设备会广播自己的主 service 的 uuid。如果这里传入该数组，那么根据该 uuid 列表，只搜索发出广播包有这个主服务的蓝牙设备，建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。

 */
  startBluetoothDevicesDiscovery(
    options?: {
      /**
       * 蓝牙设备主 service 的 uuid 列表
       */
      services?: any[];

      /**
       * 是否允许重复上报同一设备， 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
       */
      allowDuplicatesKey?: boolean;

      /**
       * 上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
       */
      interval?: number;
    } & Callback<{ errMsg?: string }>,
  ): any;

  /**
 *   wx.stopBluetoothDevicesDiscovery(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。
 OBJECT参数说明：

 */
  stopBluetoothDevicesDiscovery(options: Callback<{ errMsg?: string }>): any;

  /**
 *   wx.getBluetoothDevices(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 获取在小程序蓝牙模块生效期间所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备。

 Bug & Tip
 tip: Mac系统可能无法获取advertisData及RSSI，请使用真机调试
 tip: 开发者工具和 Android 上获取到的deviceId为设备 MAC 地址，iOS 上则为设备 uuid。因此deviceId不能硬编码到代码中
 tip: 注意该接口获取到的设备列表为小程序蓝牙模块生效期间所有搜索到的蓝牙设备，若在蓝牙模块使用流程结束后未及时调用 wx.closeBluetoothAdapter 释放资源，会存在调用该接口会返回之前的蓝牙使用流程中搜索到的蓝牙设备，可能设备已经不在用户身边，无法连接。
 tips: 蓝牙设备在被搜索到时，系统返回的 name 字段一般为广播包中的LocalName字段中的设备名称，而如果与蓝牙设备建立连接，系统返回的 name 字段会改为从蓝牙设备上获取到的GattName。若需要动态改变设备名称并展示，建议使用localName字段。

 */
  getBluetoothDevices(
    options: Callback<{
      errMsg?: string;
      devices?: Array<{
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name?: string;

        /**
         * 用于区分设备的 id
         */
        deviceId?: string;

        /**
         * 当前蓝牙设备的信号强度
         */
        RSSI?: number;

        /**
         * 当前蓝牙设备的广播数据段中的ManufacturerData数据段 （注意：vConsole 无法打印出 ArrayBuffer 类型数据）
         */
        advertisData?: ArrayBuffer;

        /**
         * 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段
         */
        advertisServiceUUIDs?: any[];

        /**
         * 当前蓝牙设备的广播数据段中的LocalName数据段
         */
        localName?: string;
        uuid?: any;
      }>;
    }>,
  ): any;

  /**
 *   wx.onBluetoothDeviceFound(CALLBACK)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 监听寻找到新设备的事件

 Bug & Tip
 tip: Mac系统可能无法获取advertisData及RSSI，请使用真机调试
 tip: 开发者工具和 Android 上获取到的deviceId为设备 MAC 地址，iOS 上则为设备 uuid。因此deviceId不能硬编码到代码中
 tip: 若在onBluetoothDeviceFound回调了某个设备，则此设备会添加到 wx.getBluetoothDevices 接口获取到的数组中

 */
  onBluetoothDeviceFound(
    cb?: CallbackFn<
      Array<{
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name?: string;

        /**
         * 用于区分设备的 id
         */
        deviceId?: string;

        /**
         * 当前蓝牙设备的信号强度
         */
        RSSI?: number;

        /**
         * 当前蓝牙设备的广播数据段中的ManufacturerData数据段 （注意：vConsole 无法打印出 ArrayBuffer 类型数据）
         */
        advertisData?: ArrayBuffer;

        /**
         * 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段
         */
        advertisServiceUUIDs?: any[];

        /**
         * 当前蓝牙设备的广播数据段中的LocalName数据段
         */
        localName?: string;
      }>
    >,
  ): any;

  /**
 *   wx.getConnectedBluetoothDevices(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 根据 uuid 获取处于已连接状态的设备
 Bug & Tip
 tip: 开发者工具和 Android 上获取到的deviceId为设备 MAC 地址，iOS 上则为设备 uuid。因此deviceId不能硬编码到代码中

 */
  getConnectedBluetoothDevices(
    options: {
      /**
       * 蓝牙设备主 service 的 uuid 列表
       */
      services?: any[];
    } & Callback<{
      errMsg?: string;
      /**
       * 搜索到的设备列表
       */
      devices?: Array<{
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name: string;
        /**
         * 用于区分设备的 id
         */
        deviceId: string;
      }>;
    }>,
  ): any;

  /**
 *   wx.createBLEConnection(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 连接低功耗蓝牙设备。

 若小程序在之前已有搜索过某个蓝牙设备，并成功建立链接，可直接传入之前搜索获取的deviceId直接尝试连接该设备，无需进行搜索操作。

 OBJECT参数说明：

 */
  createBLEConnection(
    options: {
      /**
       * 蓝牙设备 id，参考 getDevices 接口
       */
      deviceId: string;
    } & Callback<{
      /**
       * 成功：ok，错误：详细信息
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.closeBLEConnection(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 断开与低功耗蓝牙设备的连接
 OBJECT参数说明：

 */
  closeBLEConnection(
    options: {
      /**
       * 蓝牙设备 id，参考 getDevices 接口
       */
      deviceId: string;
    } & Callback<{
      /**
       * 成功：ok，错误：详细信息
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.onBLEConnectionStateChange(CALLBACK)

 基础库 1.1.1 开始支持，低版本需做兼容处理

 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
 CALLBACK参数说明：

 */
  onBLEConnectionStateChange(
    cb: CallbackFn<{
      /**
       * 蓝牙设备 id，参考 device 对象
       */
      deviceId?: string;

      /**
       * 连接目前的状态
       */
      connected?: boolean;
    }>,
  ): any;

  /**
 *   wx.getBLEDeviceServices(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 获取蓝牙设备所有 service（服务）
 OBJECT参数说明：

 */
  getBLEDeviceServices(
    options: {
      /**
       * 蓝牙设备 id，参考 getDevices 接口
       */
      deviceId: string;
    } & Callback<{
      /**
       * 设备服务列表
       */
      services?: Array<{
        /**
         * 蓝牙设备服务的 uuid
         */
        uuid?: string;

        /**
         * 该服务是否为主服务
         */
        isPrimary?: boolean;
      }>;

      /**
       * 成功：ok，错误：详细信息
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.getBLEDeviceCharacteristics(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 获取蓝牙设备某个服务中的所有 characteristic（特征值）
 OBJECT参数说明：

 */
  getBLEDeviceCharacteristics(
    options: {
      /**
       * 蓝牙设备 id，参考 device 对象
       */
      deviceId: string;

      /**
       * 蓝牙服务 uuid
       */
      serviceId: string;
    } & Callback<{
      /**
       * 设备特征值列表
       */
      characteristics?: Array<{
        /**
         * 蓝牙设备特征值的 uuid
         */
        uuid?: string;

        /**
         * 该特征值支持的操作类型
         */
        properties?: object;

        /**
         * 该特征值是否支持 read 操作
         */
        read?: boolean;

        /**
         * 该特征值是否支持 write 操作
         */
        write?: boolean;

        /**
         * 该特征值是否支持 notify 操作
         */
        notify?: boolean;

        /**
         * 该特征值是否支持 indicate 操作
         */
        indicate?: boolean;
      }>;

      /**
       * 成功：ok，错误：详细信息
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.readBLECharacteristicValue(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持read才可以成功调用，具体参照 characteristic 的 properties 属性
 OBJECT参数说明：

 */
  readBLECharacteristicValue(
    options: {
      /**
       * 蓝牙设备 id，参考 device 对象
       */
      deviceId: string;

      /**
       * 蓝牙特征值对应服务的 uuid
       */
      serviceId: string;

      /**
       * 蓝牙特征值的 uuid
       */
      characteristicId: string;
    } & Callback<{
      /**
       * 设备特征值信息
       */
      characteristic?: {
        /**
         * 蓝牙设备特征值的 uuid
         */
        characteristicId?: string;

        /**
         * 蓝牙设备特征值对应服务的 uuid
         */
        serviceId?: string;

        /**
         * 蓝牙设备特征值对应的二进制值
         */
        value?: ArrayBuffer;
      };

      /**
       * 成功：ok，错误：详细信息
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.writeBLECharacteristicValue(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
 tips: 并行调用多次读写接口存在读写失败的可能性
 OBJECT参数说明：

 */
  writeBLECharacteristicValue(
    options: {
      /**
       * 蓝牙设备 id，参考 device 对象
       */
      deviceId: string;

      /**
       * 蓝牙特征值对应服务的 uuid
       */
      serviceId: string;

      /**
       * 蓝牙特征值的 uuid
       */
      characteristicId: string;

      /**
       * 蓝牙设备特征值对应的二进制值
       */
      value: ArrayBuffer;
    } & Callback<{
      /**
       * 成功：ok，错误：详细信息
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.notifyBLECharacteristicValueChange(OBJECT)

 基础库 1.1.1 开始支持，低版本需做兼容处理

 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持notify或者indicate才可以成功调用，具体参照 characteristic 的 properties 属性
 另外，必须先启用notify才能监听到设备 characteristicValueChange 事件
 OBJECT参数说明：

 */
  notifyBLECharacteristicValueChange(
    options: {
      /**
       * 蓝牙设备 id，参考 device 对象
       */
      deviceId: string;

      /**
       * 蓝牙特征值对应服务的 uuid
       */
      serviceId: string;

      /**
       * 蓝牙特征值的 uuid
       */
      characteristicId: string;

      /**
       * true: 启用 notify; false: 停用 notify
       */
      state: boolean;
    } & Callback<{
      /**
       * 成功：ok，错误：详细信息
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.onBLECharacteristicValueChange(CALLBACK)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
 CALLBACK参数说明：

 */
  onBLECharacteristicValueChange(
    cb: CallbackFn<{
      /**
       * 蓝牙设备 id，参考 device 对象
       */
      deviceId?: string;

      /**
       * 特征值所属服务 uuid
       */
      serviceId?: string;

      /**
       * 特征值 uuid
       */
      characteristicId?: string;

      /**
       * 特征值最新的值 （注意：vConsole 无法打印出 ArrayBuffer 类型数据）
       */
      value?: ArrayBuffer;
    }>,
  ): any;

  /**
 *   wx.startBeaconDiscovery(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 开始搜索附近的iBeacon设备
 OBJECT参数说明：

 */
  startBeaconDiscovery(
    options: {
      /**
       * iBeacon设备广播的 uuids
       */
      uuids: string[];
    } & Callback<{
      /**
       * 调用结果
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.stopBeaconDiscovery(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 停止搜索附近的iBeacon设备
 OBJECT参数说明：

 */
  stopBeaconDiscovery(
    options: Callback<{
      /**
       * 调用结果
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.getBeacons(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 获取所有已搜索到的iBeacon设备
 OBJECT参数说明：

 */
  getBeacons(
    options: Callback<{
      /**
       * iBeacon 设备列表
       */
      beacons?: Array<{
        /**
         * iBeacon 设备广播的 uuid
         */
        uuid?: string;

        /**
         * iBeacon 设备的主 id
         */
        major?: string;

        /**
         * iBeacon 设备的次 id
         */
        minor?: string;

        /**
         * 表示设备距离的枚举值
         */
        proximity?: number;

        /**
         * iBeacon 设备的距离
         */
        accuracy?: number;

        /**
         * 表示设备的信号强度
         */
        rssi?: number;
      }>;

      /**
       * 调用结果
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.onBeaconUpdate(CALLBACK)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 监听 iBeacon 设备的更新事件
 CALLBACK返回参数说明：

 */
  onBeaconUpdate(
    cb: CallbackFn<
      Array<{
        /**
         * iBeacon 设备广播的 uuid
         */
        uuid?: string;

        /**
         * iBeacon 设备的主 id
         */
        major?: string;

        /**
         * iBeacon 设备的次 id
         */
        minor?: string;

        /**
         * 表示设备距离的枚举值
         */
        proximity?: number;

        /**
         * iBeacon 设备的距离
         */
        accuracy?: number;

        /**
         * 表示设备的信号强度
         */
        rssi?: number;
      }>
    >,
  ): any;

  /**
 *   wx.onBeaconServiceChange(CALLBACK)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 监听 iBeacon 服务的状态变化
 CALLBACK返回参数说明：

 */
  onBeaconServiceChange(
    options: CallbackFn<{
      /**
       * 服务目前是否可用
       */
      available?: boolean;

      /**
       * 目前是否处于搜索状态
       */
      discovering?: boolean;
    }>,
  ): any;

  /**
 *   wx.getNetworkType(OBJECT)
 获取网络类型。


 */
  getNetworkType(
    options: Callback<{
      /**
       * 网络类型;
       */
      networkType?: string;
    }>,
  ): any;

  /**
 *   wx.onNetworkStatusChange(CALLBACK)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 监听网络状态变化。
 CALLBACK返回参数：

 */
  onNetworkStatusChange(
    cb: CallbackFn<{
      /**
       * 当前是否有网络连接
       */
      isConnected?: boolean;

      /**
     * 网络类型
     *
     * networkType 有效值：

     值	说明
     wifi	wifi 网络
     2g	2g 网络
     3g	3g 网络
     4g	4g 网络
     none	无网络
     unknown	Android下不常见的网络类型
     */
      networkType?: string;
    }>,
  ): any;

  /**
 *   wx.setScreenBrightness(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 设置屏幕亮度。


 */
  setScreenBrightness(
    options: {
      /**
       * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
       */
      value: number;
    } & Callback<any>,
  ): any;

  /**
   * 设置是否保持常亮状态。仅在当前小程序生效，离开小程序后设置失效。
   */
  setKeepScreenOn(
    options: { keepScreenOn: boolean } & Callback<{ errMsg?: string }>,
  ): void;

  /**
 *   wx.getScreenBrightness(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 获取屏幕亮度。


 */
  getScreenBrightness(
    options: Callback<{
      /**
       * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
       */
      value?: number;
    }>,
  ): any;

  /**
 *   wx.vibrateLong(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 使手机发生较长时间的振动（400ms）


 */
  vibrateLong(options: Callback<any>): any;

  /**
 *   wx.vibrateShort(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 使手机发生较短时间的振动（15ms）


 */
  vibrateShort(options: Callback<any>): any;

  /**
 * 定义
 创建 canvas 绘图上下文（指定 canvasId）。在自定义组件下，第二个参数传入组件实例this，以操作组件内 <canvas/> 组件

 Tip: 需要指定 canvasId，该绘图上下文只作用于对应的 <canvas/>
 */
  createCanvasContext(canvasId: string, ctx?: any): CanvasContext;

  /**
   * 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
   */
  canvasToTempFilePath(options: {
    /**
     * 画布x轴起点（默认0）
     */
    x?: number;

    /**
     * 画布y轴起点（默认0）
     */
    y?: number;

    /**
     * 画布宽度（默认为canvas宽度-x）
     */
    width?: number;

    /**
     * 画布高度（默认为canvas高度-y）
     */
    height?: number;

    /**
     * 输出图片宽度（默认为width）
     */
    destWidth?: number;

    /**
     * 输出图片高度（默认为height）
     */
    destHeight?: number;

    /**
     * 画布标识，传入 <canvas/> 的 cavas-id
     */
    canvasId: string;
  }): void;

  /**
 *   wx.getSystemInfo(OBJECT)
 获取系统信息
 */
  getSystemInfo(
    options: Callback<{
      /**
       * 1.5.0
       */
      brand?: any;

      /**
       * 手机型号
       */
      model?: any;

      /**
       * 设备像素比
       */
      pixelRatio?: any;

      /**
       * 1.1.0 屏幕宽度
       */
      screenWidth?: any;

      /**
       * 1.1.0 屏幕高度
       */
      screenHeight?: any;

      /**
       * 可使用窗口宽度
       */
      windowWidth?: any;

      /**
       * 可使用窗口高度
       */
      windowHeight?: any;

      /**
       * 微信设置的语言
       */
      language?: any;

      /**
       * 微信版本号
       */
      version?: any;

      /**
       * 操作系统版本
       */
      system?: any;

      /**
       * 客户端平台
       */
      platform?: any;

      /**
       * 1.5.0用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
       */
      fontSizeSetting?: string;

      /**
       * 1.1.0 客户端基础库版本
       */
      SDKVersion?: any;
    }>,
  ): any;

  /**
 *   wx.getSystemInfoSync()
 获取系统信息同步接口
 同步返回参数说明：

 */
  getSystemInfoSync(): {
    /**
     * 1.5.0 	手机品牌
     */
    brand?: any;

    /**
     * 手机型号
     */
    model?: any;

    /**
     * 设备像素比
     */
    pixelRatio?: any;

    /**
     * 1.1.0 屏幕宽度
     */
    screenWidth?: any;

    /**
     * 1.1.0 屏幕高度
     */
    screenHeight?: any;

    /**
     * 可使用窗口宽度
     */
    windowWidth?: any;

    /**
     * 可使用窗口高度
     */
    windowHeight?: any;

    /**
     * 微信设置的语言
     */
    language?: any;

    /**
     * 微信版本号
     */
    version?: any;

    /**
     * 操作系统版本
     */
    system?: any;

    /**
     * 客户端平台
     */
    platform?: any;

    /**
     * 1.5.0用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
     */
    fontSizeSetting?: any;

    /**
     * 1.1.0 	客户端基础库版本
     */
    SDKVersion?: any;
  };

  /**
 * canIUse
 *  判断小程序的API，回调，参数，组件等是否在当前版本可用。

 String参数说明： 使用${API}.${method}.${param}.${options}或者${component}.${attribute}.${option}方式来调用，例如：

 ${API} 代表 API 名字
 ${method} 代表调用方式，有效值为return, success, object, callback
 ${param} 代表参数或者返回值
 ${options} 代表参数的可选值
 ${component} 代表组件名字
 ${attribute} 代表组件属性
 ${option} 代表组件属性的可选值
 *
 */
  canIUse(op: string): any;

  /**
 *   wx.onAccelerometerChange(CALLBACK)
 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 wx.stopAccelerometer 停止监听。
 CALLBACK返回参数：

 */
  onAccelerometerChange(
    options: CallbackFn<{
      /**
       * X 轴
       */
      x?: number;

      /**
       * Y 轴
       */
      y?: number;

      /**
       * Z 轴
       */
      z?: number;
    }>,
  ): any;

  /**
 *   wx.startAccelerometer(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 开始监听加速度数据。


 */
  startAccelerometer(options?: Callback<any>): any;

  /**
 *   wx.stopAccelerometer(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 停止监听加速度数据。


 */
  stopAccelerometer(options?: Callback<any>): any;

  /**
 *   wx.onCompassChange(CALLBACK)
 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用wx.stopCompass停止监听。
 CALLBACK返回参数：

 */
  onCompassChange(
    cb: CallbackFn<{
      /**
       * 面对的方向度数
       */
      direction?: number;
    }>,
  ): any;

  /**
 *   wx.startCompass(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 开始监听罗盘数据。


 */
  startCompass(options: Callback<any>): any;

  /**
 *   wx.stopCompass(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 停止监听罗盘数据。


 */
  stopCompass(options?: Callback<any>): any;

  makePhoneCall(options: { phoneNumber: string } & Callback<any>): void;

  /**
 *   wx.scanCode(OBJECT)
 调起客户端扫码界面，扫码成功后返回对应的结果
 Object 参数说明：

 */
  scanCode(
    options: {
      /**
       * 是否只能从相机扫码，不允许从相册选择图片
       */
      onlyFromCamera?: boolean;
    } & Callback<{
      /**
       * 所扫码的内容
       */
      result?: any;

      /**
       * 所扫码的类型
       */
      scanType?: any;

      /**
       * 所扫码的字符集
       */
      charSet?: any;

      /**
       * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
       */
      path?: any;
    }>,
  ): any;

  /**
 *   wx.setClipboardData(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 设置系统剪贴板的内容


 */
  setClipboardData(
    options: {
      /**
       * 需要设置的内容
       */
      data: string;
    } & Callback<any>,
  ): any;

  /**
 *   wx.getClipboardData(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 获取系统剪贴板内容


 */
  getClipboardData(
    options: Callback<{
      /**
       * 剪贴板的内容
       */
      data?: string;
    }>,
  ): any;

  /**
 * 基础库 1.4.0 开始支持，低版本需做兼容处理

 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
 */
  onUserCaptureScreen(cb: CallbackFn<any>): any;

  /**
 *   wx.addPhoneContact(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式，写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。


 */
  addPhoneContact(
    options: {
      /**
       * 头像本地文件路径
       */
      photoFilePath?: string;

      /**
       * 昵称
       */
      nickName?: string;

      /**
       * 姓氏
       */
      lastName?: string;

      /**
       * 中间名
       */
      middleName?: string;

      /**
       * 名字
       */
      firstName: string;

      /**
       * 备注
       */
      remark?: string;

      /**
       * 手机号
       */
      mobilePhoneNumber?: string;

      /**
       * 微信号
       */
      weChatNumber?: string;

      /**
       * 联系地址国家
       */
      addressCountry?: string;

      /**
       * 联系地址省份
       */
      addressState?: string;

      /**
       * 联系地址城市
       */
      addressCity?: string;

      /**
       * 联系地址街道
       */
      addressStreet?: string;

      /**
       * 联系地址邮政编码
       */
      addressPostalCode?: string;

      /**
       * 公司
       */
      organization?: string;

      /**
       * 职位
       */
      title?: string;

      /**
       * 工作传真
       */
      workFaxNumber?: string;

      /**
       * 工作电话
       */
      workPhoneNumber?: string;

      /**
       * 公司电话
       */
      hostNumber?: string;

      /**
       * 电子邮件
       */
      email?: string;

      /**
       * 网站
       */
      url?: string;

      /**
       * 工作地址国家
       */
      workAddressCountry?: string;

      /**
       * 工作地址省份
       */
      workAddressState?: string;

      /**
       * 工作地址城市
       */
      workAddressCity?: string;

      /**
       * 工作地址街道
       */
      workAddressStreet?: string;

      /**
       * 工作地址邮政编码
       */
      workAddressPostalCode?: string;

      /**
       * 住宅传真
       */
      homeFaxNumber?: string;

      /**
       * 住宅电话
       */
      homePhoneNumber?: string;

      /**
       * 住宅地址国家
       */
      homeAddressCountry?: string;

      /**
       * 住宅地址省份
       */
      homeAddressState?: string;

      /**
       * 住宅地址城市
       */
      homeAddressCity?: string;

      /**
       * 住宅地址街道
       */
      homeAddressStreet?: string;

      /**
       * 住宅地址邮政编码
       */
      homeAddressPostalCode?: string;
    } & Callback<any>,
  ): any;

  /**
 *   wx.showToast(OBJECT)
 显示消息提示框
 */
  showToast(
    options: {
      /**
       * 提示的内容
       */
      title: string;

      /**
       * 自定义图标的本地路径，image 的优先级高于 icon
       */
      image?: string;

      /**
       * 提示的延迟时间，单位毫秒，默认：1500
       */
      duration?: number;

      /**
       * 是否显示透明蒙层，防止触摸穿透，默认：false
       */
      mask?: boolean;
    } & Callback<any>,
  ): any;

  /**
 *   wx.showLoading(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框


 */
  showLoading(
    options: {
      /**
       * 提示的内容
       */
      title: string;

      /**
       * 是否显示透明蒙层，防止触摸穿透，默认：false
       */
      mask?: boolean;
    } & Callback<any>,
  ): any;

  /**
 *   wx.hideToast()
 隐藏消息提示框

 */
  hideToast(): any;

  /**
   *   隐藏 loading 提示框
   */
  hideLoading(): void;

  /**
   *  显示模态弹窗
   */
  showModal(
    options: {
      /**
       * 提示的标题
       */
      title: string;

      /**
       * 提示的内容
       */
      content: string;

      /**
       * 是否显示取消按钮，默认为 true
       */
      showCancel?: boolean;

      /**
       * 取消按钮的文字，默认为"取消"，最多 4 个字符
       */
      cancelText?: string;

      /**
       * 取消按钮的文字颜色，默认为"#000000"
       */
      cancelColor?: string;

      /**
       * 确定按钮的文字，默认为"确定"，最多 4 个字符
       */
      confirmText?: string;

      /**
       * 确定按钮的文字颜色，默认为"#3CC51F"
       */
      confirmColor?: string;
    } & Callback<{
      /**
       * 为 true 时，表示用户点击了确定按钮
       */
      confirm?: boolean;

      /**
       * 1.1.0 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
       */
      cancel?: boolean;
    }>,
  ): void;

  /**
 *   wx.showActionSheet(OBJECT)
 显示操作菜单
 */
  showActionSheet(
    options: {
      /**
       * 按钮的文字数组，数组长度最大为6个
       */
      itemList: string[];

      /**
       * 按钮的文字颜色，默认为"#000000"
       */
      itemColor?: string;
    } & Callback<{
      /**
       * 用户点击的按钮，从上到下的顺序，从0开始
       */
      tapIndex: number;
    }>,
  ): any;

  /**
 *   wx.createAnimation(OBJECT)
 创建一个动画实例Animation。调用实例的方法来描述动画。最后通过动画实例的export方法导出动画数据传递给组件的Animation属性。
 注意: 方法每次调用后会清掉之前的动画操作


 */
  createAnimation(options?: {
    /**
     * 400 动画持续时间，单位ms
     */
    duration?: number;

    /**
     * "linear" 定义动画的效果
     */

    timingFunction?: string;

    /**
     * 0 动画延迟时间，单位 ms
     */
    delay?: number;

    /**
     * "50% 50% 0" 设置transform-origin
     */
    transformOrigin?: string;
  }): Animation;

  /**
   * 将页面滚动到目标位置。
   */
  pageScrollTo(option: { scrollTop: number; duration?: number }): any;

  /**
 * 在 Page 中定义 onPullDownRefresh 处理函数，监听该页面用户下拉刷新事件。

 需要在 config 的window选项中开启 enablePullDownRefresh。
 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
 */
  onPullDownRefresh(cb: CallbackFn<any>): void;

  /**
 * 基础库 1.5.0 开始支持，低版本需做兼容处理

 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
 */
  startPullDownRefresh(options: Callback<{ errMsg?: string }>): void;

  /**
   * 停止当前页面下拉刷新。
   */
  stopPullDownRefresh(): void;

  /**
 *   wx.setTopBarText(OBJECT)

 基础库 1.4.3 开始支持，低版本需做兼容处理

 动态设置置顶栏文字内容，只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容。注意：调用成功后，需间隔 5s 才能再次调用此接口，如果在 5s 内再次调用此接口，会回调 fail，errMsg："setTopBarText: fail invoke too frequently"
 */
  setTopBarText(
    options: {
      /**
       * 置顶栏文字内容
       */
      text: string;
    } & Callback<any>,
  ): any;

  /**
 *   wx.setNavigationBarTitle(OBJECT)
 动态设置当前页面的标题。


 */
  setNavigationBarTitle(
    options: {
      /**
       * 页面标题
       */
      title: string;
    } & Callback<any>,
  ): any;

  /**
   * 在当前页面显示导航条加载动画。
   */
  showNavigationBarLoading(): any;

  /**
   * 隐藏导航条加载动画。
   */
  hideNavigationBarLoading(): any;

  /**
   * wx.addCard(OBJECT)
   * 基础库 1.1.0 开始支持，低版本需做兼容处理
   * 批量添加卡券。
   */
  addCard(
    options: {
      /**
       * 需要添加的卡券列表，列表内对象说明请参见请求对象说明
       */
      cardList: Array<{
        /**
         * 卡券 Id
         */
        cardId?: string;

        /**
         * 卡券的扩展参数
         */
        cardExt?: string;
      }>;
    } & Callback<{
      /**
       * 卡券添加结果列表，列表内对象说明请详见返回对象说明
       */
      cardList: Array<{
        /**
         * 加密 code，为用户领取到卡券的code加密后的字符串，解密请参照：code 解码接口
         */
        code?: string;

        /**
         * 用户领取到卡券的Id
         */
        cardId?: string;

        /**
         * 用户领取到卡券的扩展参数，与调用时传入的参数相同
         */
        cardExt?: string;
        /**
         * 是否成功
         */
        isSuccess?: boolean;
      }>;
    }>,
  ): any;

  /**
 * 基础库 1.6.0 开始支持，低版本需做兼容处理

 获取设备内是否录入如指纹等生物信息的接口
 */
  checkIsSoterEnrolledInDevice(
    option: {
      /**
     * 	认证方式
     *
     *  fingerPrint	指纹识别
     facial	人脸识别（暂未支持）
     speech	声纹识别（暂未支持）
     */
      checkAuthMode: string;
    } & Callback<{
      /**
       * 是否已录入信息
       */
      isEnrolled?: boolean;
      errMsg?: string;
    }>,
  ): void;

  /**
 *   wx.startSoterAuthentication(OBJECT)

 基础库 1.5.0 开始支持，低版本需做兼容处理

 开始 SOTER 生物认证
 https://mp.weixin.qq.com/debug/wxadoc/dev/api/startSoterAuthentication.html

 */
  startSoterAuthentication(
    options: {
      /**
       * 请求使用的可接受的生物认证方式
       */
      requestAuthModes: string[];

      /**
       * 挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键是别信息，将作为result_json的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行授权确认，则可以将订单号填入此参数。
       */
      challenge: string;

      /**
       * 验证描述，即识别过程中显示在界面上的对话框提示内容
       */
      authContent?: string;
    } & Callback<{
      /**
       * 错误码
       */
      errCode?: number;

      /**
       * 生物认证方式
       */
      authMode?: string;

      /**
       * 在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）（仅Android支持，本次认证的指纹ID）
       */
      resultJSON?: string;

      /**
       * 用SOTER安全密钥对result_json的签名(SHA256withRSA/PSS, saltlen=20)
       */
      resultJSONSignature?: string;

      /**
       * 接口调用结果
       */
      errMsg?: string;
    }>,
  ): any;

  /**
   * 获取本机支持的 SOTER 生物认证方式
   */
  checkIsSupportSoterAuthentication(
    option: Callback<{
      /**
     * 该设备支持的可被SOTER识别的生物识别方式
     *
     *
     * fingerPrint	指纹识别
     facial	人脸识别（暂未支持）
     speech	声纹识别（暂未支持）
     */
      supportMode?: string[];
      errMsg?: string;
    }>,
  ): void;

  /**
   * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。
   */
  reportAnalytics(eventName: string, data: object): void;

  /**
 *   wx.openCard(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 查看微信卡包中的卡券。


 */
  openCard(
    options: {
      /**
       * 需要打开的卡券列表，列表内参数详见openCard 请求对象说明
       */
      cardList: Array<{
        /**
         * 需要打开的卡券 Id
         */
        cardId?: string;

        /**
         * 由 addCard 的返回对象中的加密 code 通过解密后得到，解密请参照：code 解码接口
         */
        code?: string;
      }>;
    } & Callback<any>,
  ): any;

  /**
 *   wx.chooseInvoiceTitle(OBJECT)

 基础库 1.5.0 开始支持，低版本需做兼容处理

 选择用户的发票抬头。
 需要用户授权 scope.invoiceTitle


 */
  chooseInvoiceTitle(
    options: Callback<{
      /**
       * 抬头类型（0：单位，1：个人）
       */
      type?: string;

      /**
       * 抬头名称
       */
      title?: string;

      /**
       * 抬头税号
       */
      taxNumber?: string;

      /**
       * 单位地址
       */
      companyAddress?: string;

      /**
       * 手机号码
       */
      telephone?: string;

      /**
       * 银行名称
       */
      bankName?: string;

      /**
       * 银行账号
       */
      bankAccount?: string;

      /**
       * 接口调用结果
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.openSetting(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 调起客户端小程序设置界面，返回用户设置的操作结果。
 注：设置界面只会出现小程序已经向用户请求过的权限。
 Object 参数说明：

 */
  openSetting(
    options: Callback<{
      /**
       * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见 scope 列表
       */
      authSetting?: object;
    }>,
  ): any;

  /**
 * 基础库 1.3.0 开始支持，低版本需做兼容处理

 iOS 微信客户端 6.5.9 版本开始支持，Android 客户端即将在 6.5.10 版本开始支持，请先使用 iOS 客户端进行调试

 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
 */
  navigateBackMiniProgram(
    options: {
      /**
       * 需要返回给上一个小程序的数据，上一个小程序可在 App.onShow() 中获取到这份数据。详情
       * https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/app.html
       */
      extraData: object;
    } & Callback<any>,
  ): void;

  /**
 *   wx.navigateToMiniProgram(OBJECT)

 基础库 1.3.0 开始支持，低版本需做兼容处理
 iOS 微信客户端 6.5.9 版本开始支持，Android 客户端即将在 6.5.10 版本开始支持，请先使用 iOS 客户端进行调试

 打开同一公众号下关联的另一个小程序。


 */
  navigateToMiniProgram(
    options: {
      /**
       * 要打开的小程序 appId
       */
      appId: string;

      /**
       * 打开的页面路径，如果为空则打开首页
       */
      path?: string;

      /**
       * 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。详情
       */
      extraData?: object;

      /**
       * 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release
       */
      envVersion?: string;
    } & Callback<{
      /**
       * 调用结果
       */
      errMsg?: string;
    }>,
  ): any;

  /**
 *   wx.getWeRunData(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 获取用户过去三十天微信运动步数，需要先调用 wx.login 接口。
 需要用户授权 scope.werun


 */
  getWeRunData(
    options: Callback<{
      /**
       * 调用结果
       */
      errMsg?: string;

      /**
       * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
       */
      encryptedData?: string;

      /**
       * 加密算法的初始向量，详细见加密数据解密算法
       */
      iv?: string;
    }>,
  ): any;

  /**
 *   wx.getSetting(OBJECT)

 基础库 1.2.0 开始支持，低版本需做兼容处理

 获取用户的当前设置。
 注：返回值中只会出现小程序已经向用户请求过的权限。
 Object 参数说明：

 */
  getSetting(
    options: Callback<{
      /**
       * 用户授权结果，其中 key 为 scope 值，value 为 Bool 值，表示用户是否允许授权，详见 scope 列表
       */
      authSetting?: object;
    }>,
  ): any;

  /**
 *   wx.saveFile(OBJECT)
 保存文件到本地。注意：saveFile 会把临时文件移动，因此调用成功后传入的 tempFilePath 将不可用


 */
  saveFile(
    options: {
      /**
       * 需要保存的文件的临时路径
       */
      tempFilePath: string;
    } & Callback<{
      /**
       * 文件的保存路径
       */
      savedFilePath?: any;
    }>,
  ): any;

  /**
 *   wx.getSavedFileList(OBJECT)
 获取本地已保存的文件列表


 */
  getSavedFileList(
    options: Callback<{
      /**
       * 接口调用结果
       */
      errMsg?: string;

      /**
       * 文件列表
       */
      fileList?: Array<{
        /**
         * 文件的本地路径
         */
        filePath?: string;

        /**
         * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         */
        createTime?: number;

        /**
         * 文件大小，单位B
         */
        size?: number;
      }>;
    }>,
  ): any;

  /**
 *   wx.getSavedFileInfo(OBJECT)
 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件，若需要获取临时文件信息，请使用 wx.getFileInfo 接口。


 */
  getSavedFileInfo(
    options: {
      /**
       * 文件路径
       */
      filePath: string;
    } & Callback<{
      /**
       * 接口调用结果
       */
      errMsg?: string;

      /**
       * 文件大小，单位B
       */
      size?: number;

      /**
       * 文件保存时的时间戳，从1970/01/01 08:00:00 到该时刻的秒数
       */
      createTime?: number;
    }>,
  ): any;

  /**
 *   wx.removeSavedFile(OBJECT)
 删除本地存储的文件


 */
  removeSavedFile(
    options: {
      /**
       * 需要删除的文件路径
       */
      filePath: string;
    } & Callback<any>,
  ): any;

  /**
 *   wx.openDocument(OBJECT)
 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx


 */
  openDocument(
    options: {
      /**
       * 文件路径，可通过 downFile 获得
       */
      filePath: string;

      /**
       * 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
       */
      fileType?: string;
    } & Callback<any>,
  ): any;

  /**
   * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
   */
  navigateTo(options: NavigateOption): void;

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   */
  switchTab(options: NavigateOption): void;

  /**
   * 关闭当前页面，跳转到应用内的某个页面。
   */
  redirectTo(options: NavigateOption): void;

  /**
   * 关闭所有页面，打开到应用内的某个页面。
   */
  reLaunch(options: NavigateOption): void;

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
   */
  navigateBack(options?: { delta: number }): void;

  /**
   * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
   * 本地数据存储的大小限制为 10MB
   */
  setStorage(options: SetStorageOption & CallbackWithSuccess<void>): void;

  /**
   * 设置是否打开调试开关，此开关对正式版也能生效。
   */
  setEnableDebug(options: { enableDebug: boolean } & Callback<any>): void;

  /**
   * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   * @param {string} key 本地缓存中的指定的 key
   * @param {string | Object} data 需要存储的内容
   */
  setStorageSync(key: string, data: any): void;

  /**
   * 从本地缓存中异步获取指定 key 对应的内容。
   *
   */
  getStorage<T = any>(
    options: GetStorageOption & CallbackWithSuccess<GetStorageResult<T>>,
  ): void;

  /**
   * 从本地缓存中同步获取指定 key 对应的内容。
   */
  getStorageSync<T = any>(key: string): T;

  /**
   * 异步获取当前storage的相关信息
   */
  getStorageInfo(options: CallbackWithSuccess<GetStorageInfoResult>): void;

  /**
   * 同步获取当前storage的相关信息
   */
  getStorageInfoSync(): GetStorageInfoResult;

  /**
   * 从本地缓存中异步移除指定 key
   */
  removeStorage<T = any>(
    options: { key: string } & CallbackWithSuccess<GetStorageResult<T>>,
  ): void;

  /**
   * 从本地缓存中同步移除指定 key
   */
  removeStorageSync(key: string): void;

  /**
   * 清理本地数据缓存。
   */
  clearStorage(): void;

  /**
   * 同步清理本地数据缓存
   */
  clearStorageSync(): void;

  /**
   * 调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。
   * 注：调用 login 会引起登录态的刷新，之前的 sessionKey 可能会失效。
   */
  login(options: Callback<LoginResult>): void;

  /**
   * 通过上述接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用wx.checkSession接口检测当前用户登录态是否有效。登录态过期后开发者可以再调用wx.login获取新的用户登录态。
   */
  checkSession(options: Callback<void>): void;

  /**
   * 获取第三方平台自定义的数据字段。
   */
  getExtConfig(cb: Callback<any>): void;

  /**
   * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
   */
  authorize(options: { scope: string } & Callback<{ errMsg?: string }>): void;

  /**
   * 获取第三方平台自定义的数据字段的同步接口。
   */
  getExtConfigSync(): any;
  /**
   * 发起微信支付。
   */
  requestPayment(
    options: RequestPaymentOption & CallbackWithSuccess<RequestPaymentResult>,
  ): void;

  showShareMenu(
    options: {
      /**
       * 是否使用带 shareTicket 的转发详情
       */
      withShareTicket?: boolean;
    } & Callback<any>,
  ): any;

  hideShareMenu(options: Callback<any>): any;

  updateShareMenu(
    options: {
      /**
       * 是否使用带 shareTicket 的转发详情
       */
      withShareTicket?: boolean;
    } & Callback<any>,
  ): any;

  getShareInfo(
    options: {
      /**
       * shareTicket
       */
      shareTicket: string;
    } & Callback<{
      /**
       * 错误信息
       */
      errMsg?: string;

      /** encryptedData 解密后为一个 JSON 结构，包含字段如下：
       * openGId	群对当前小程序的唯一 ID
       * 包括敏感数据在内的完整转发信息的加密数据，详细见加密数据解密算法
       */
      encryptedData?: string;

      /**
       * 加密算法的初始向量，详细见加密数据解密算法
       */
      iv?: string;
    }>,
  ): any;

  /**
 *   wx.chooseAddress(OBJECT)

 基础库 1.1.0 开始支持，低版本需做兼容处理

 调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
 需要用户授权 scope.address


 */
  chooseAddress(
    options: Callback<{
      /**
       * 调用结果
       */
      errMsg?: string;

      /**
       * 收货人姓名
       */
      userName?: string;

      /**
       * 邮编
       */
      postalCode?: string;

      /**
       * 国标收货地址第一级地址
       */
      provinceName?: string;

      /**
       * 国标收货地址第二级地址
       */
      cityName?: string;

      /**
       * 国标收货地址第三级地址
       */
      countyName?: string;

      /**
       * 详细收货地址信息
       */
      detailInfo?: string;

      /**
       * 收货地址国家码
       */
      nationalCode?: string;

      /**
       * 收货人手机号码
       */
      telNumber?: string;
    }>,
  ): any;

  /**
   * 返回一个SelectorQuery对象实例。可以在这个实例上使用select等方法选择节点，并使用boundingBoundingClientRect等方法选择需要查询的信息。
   */
  createSelectorQuery(): SelectorQuery;

  /**
 *   wx.createMapContext(mapId, this)
 创建并返回 map 上下文 mapContext 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 &lt;map/&gt; 组件
 mapContext
 mapContext 通过 mapId 跟一个 &lt;map/&gt; 组件绑定，通过它可以操作对应的 &lt;map/&gt; 组件。
 mapContext 对象的方法列表

 */
  createMapContext(
    mapId: string,
    ctx?: any,
  ): {
    /**
     * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
     */
    getCenterLocation?: Callback<{ longitude: any; latitude: any }>;

    /**
     * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
     */
    moveToLocation?: any;

    /**
     * 平移marker，带动画
     */
    translateMarker?: {
      /**
       * 指定marker
       */
      markerId: number;

      /**
       * 指定marker移动到的目标点
       */
      destination: object;

      /**
       * 移动过程中是否自动旋转marker
       */
      autoRotate: boolean;

      /**
       * marker的旋转角度
       */
      rotate: number;

      /**
       * 动画持续时长，默认值1000ms，平移与旋转分别计算
       */
      duration?: number;

      /**
       * 动画结束回调函数
       */
      AnimationEnd?: (...res: any[]) => any;

      fail: (...res: any[]) => any;
    };

    /**
     * 缩放视野展示所有经纬度
     */
    includePoints?: {
      /**
       * 要显示在可视区域内的坐标点列表，[{latitude, longitude}]
       */
      points: any[];

      /**
       * 坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上,右,下,左]，安卓上只能识别数组第一项，上下左右的padding一致。开发者工具暂不支持padding参数。
       */
      padding?: any[];
    };

    /**
     * 获取当前地图的视野范围
     */
    getRegion?: Callback<{ southwest: any; northeast: any }>;

    /**
     * 获取当前地图的缩放级别
     */
    getScale?: Callback<{ scale: any }>;
  };

  /**
   * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
   */
  getLocation(
    options: GetLocationOption & CallbackWithSuccess<GetLocationResult>,
  ): void;

  /**
   * 打开地图选择位置。
   * 需要用户授权 scope.userLocation
   */
  chooseLocation(
    options: Callback<{
      /**
       * 位置名称
       */
      name: string;
      /**
       * 详细地址
       */
      address: string;
      /**
       * 纬度，浮点数，范围为-90~90，负数表示南纬
       */
      latitude: number;
      /**
       * 经度，浮点数，范围为-180~180，负数表示西经
       */
      longitude: number;
    }>,
  ): void;

  /**
   * 使用微信内置地图查看位置。
   * 需要用户授权 scope.userLocation
   */
  openLocation(
    options: {
      /**
       * 纬度，范围为-90~90，负数表示南纬
       */
      latitude: number;
      /**
       * 经度，范围为-180~180，负数表示西经
       */
      longitude: number;
      /**
       * 缩放比例，范围5~18，默认为18
       */
      scale?: number;
      /**
       * 位置名
       */
      name?: string;
      /**
       * 地址的详细说明
       */
      address?: string;
    } & Callback<void>,
  ): void;

  /**
   * 获取用户信息，withCredentials 为 true 时需要先调用 wx.login 接口。
   * 需要用户授权 scope.userInfo
   */
  getUserInfo(
    options: GetUserInfoOption & CallbackWithSuccess<GetUserInfoResult>,
  ): void;
}

/**
 * wx全局对象
 */
declare const wx: Wx;
