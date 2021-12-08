//app.js
import SDK from "./sdk/Easemob-chat-miniProgram-3.6.3";
const env = 'mengyanzhiya-7g39qvgfa47d0969';
const appKey = '1161211202125309#sufeba';
//实例化SDK对象
const WebIM = wx.WebIM = SDK;
WebIM.conn = new WebIM.connection({
  appKey: appKey,
  https: true, //是否使用HTTPS 
  url: 'wss://im-api-wechat.easemob.com/websocket', // socket server (3.0 SDK)
  apiUrl: 'https://a1.easemob.com', // rest server
  heartBeatWait: 30000, //心跳间隔
  autoReconnectNumMax: 5, //自动重连次数
  useOwnUploadFun: false // 是否使用自己的上传方式（如将图片文件等上传到自己的服务器，构建消息时只传url）
});
WebIM.conn.listen({
  onOpened: function () {}, //连接成功回调 
  onClosed: function () {}, //连接关闭回调
  onTextMessage: function (message) {}, //收到文本消息
  onEmojiMessage: function (message) {}, //收到表情消息
  onPictureMessage: function (message) {}, //收到图片消息
  onCmdMessage: function (message) {}, //收到命令消息
  onAudioMessage: function (message) {}, //收到音频消息
  onPresence: function (message) {}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
  onInviteMessage: function (message) {}, //处理群组邀请
  onOnline: function () {}, //本机网络连接成功
  onOffline: function () {}, //本机网络掉线
  onError: function (message) {}, //失败回调
  onRecallMessage: function (message) {}, //收到撤回消息回调
  onCreateGroup: function (message) {}, //创建群组成功回执（需调用createGroupNew）
  onMutedMessage: function (message) {}, //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: env,
        traceUser: true,
      })
    }

    this.globalData = {
      appKey: appKey,
      registered: true,
      bsurl: '',
      getPageHeight: function () {
        let systemInfo = wx.getSystemInfoSync()
        // px转换到rpx的比例
        let pxToRpxScale = 750 / systemInfo.windowWidth;
        // window的高度
        let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
        return ktxWindowHeight
      }
    }

    //获取openid
    // wx.cloud.callFunction({
    //   // 要调用的云函数名称
    //   name: 'getopenid',
    //   // 传递给云函数的参数
    //   data: {},
    //   success: (res) => {
    //     // console.log("成功", res)
    //     this.globalData.openid = res.result.openid
    //     wx.cloud.callFunction({
    //       // 要调用的云函数名称
    //       name: 'findopenid',
    //       // 传递给云函数的参数
    //       data: {
    //         id: res.result.openid
    //       },
    //       success: (res) => {
    //         // console.log("成功", res)
    //         var data = res.result.data
    //         if (data.length) {
    //           this.globalData.registered = true
    //         }
    //       },
    //       fail: (err) => {
    //         console.log("错误", err);
    //       }
    //     })
    //   },
    //   fail: (err) => {
    //     console.log("错误", err);
    //   }
    // })
  }
})