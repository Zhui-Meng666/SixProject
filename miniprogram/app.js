//app.js
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
        env: 'mengyanzhiya-7g39qvgfa47d0969',
        traceUser: true,
      })
    }

    this.globalData = {
      registered: false,
      bsurl: '',
      getPageHeight: function () {
        let systemInfo = wx.getSystemInfoSync()
        // px转换到rpx的比例
        let pxToRpxScale = 750 / systemInfo.windowWidth;
        // 状态栏的高度
        let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
        // 导航栏的高度
        let navigationHeight = 44 * pxToRpxScale
        // window的高度
        let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
        // 屏幕的高度
        let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
        // 底部tabBar的高度
        let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight
        return ktxWindowHeight
      }
    }

    // 获取openid
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getopenid',
      // 传递给云函数的参数
      data: {},
      success: res => {
        // console.log("成功", res)
        this.globalData.openid = res.result.openid
        // wx.cloud.callFunction({
        //   // 要调用的云函数名称
        //   name: 'findopenid',
        //   // 传递给云函数的参数
        //   data: {
        //     openid: res.result.openid
        //   },
        //   success: res => {
        //     console.log("成功", res)
        //     var data = res.result.data
        //     if (data) {
        //       this.globalData.registered = true
        //     }
        //   },
        //   fail: err => {
        //     console.log("错误", err);
        //   }
        // })
      },
      fail: err => {
        console.log("错误", err);
      }
    })
  }
})