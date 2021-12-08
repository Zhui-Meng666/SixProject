// pages/Personal/login/login.js
import Toast from '@vant/weapp/toast/toast';
let app = getApp()
let conn = wx.WebIM.conn
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    stuid: '',
    gender: '0',
    loading: false,
    butwidth: 200
  },

  onchange: function (e) {
    var value = e.detail
    if (value.length != 10) {
      this.setData({
        errmess: '学号格式错误'
      })
    } else {
      this.setData({
        errmess: ''
      })
    }
  },

  submitid: function (e) {
    this.setData({
      stuid: e.detail.value
    })
  },

  submitintro: function (e) {
    this.setData({
      userintro: e.detail.value
    })
  },

  onChange: function (e) {
    this.setData({
      gender: e.detail
    })
  },

  register: function (e) {
    if (this.data.stuid.length != 10) {
      Toast.fail('学号格式错误')
      return -1
    }
    if (wx.canIUse('getUserProfile')) {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            butwidth: 300,
            loading: true,
          })
          var submitdata = {
            openid: app.globalData.openid,
            student_id: this.data.stuid,
            gender: this.data.gender,
            introduction: this.data.userintro,
            avatar: this.data.userInfo.avatarUrl,
            nickname: this.data.userInfo.nickName
          }
          var options = {
            username: app.globalData.openid,
            password: "123456",
            nickname: this.data.userInfo.nickName,
            appKey: app.globalData.appKey,
            success: function () {
              app.globalData.registered = true
              Toast.success('登录成功')
              wx.redirectTo({
                url: '../../index/index',
              })
            },
            error: function (err) {
              let errorData = err.data;
              if (errorData.error === 'duplicate_unique_property_exists') {
                Toast.fail('已注册！')
                app.globalData.registered = true
                wx.redirectTo({
                  url: '../../index/index',
                })
              } else if (errorData.error === 'illegal_argument') {
                if (errorData.error_description === 'USERNAME_TOO_LONG') {
                  console.log('用户名超过64个字节！')
                } else {
                  console.log('用户名不合法！')
                }
              } else if (errorData.error === 'unauthorized') {
                console.log('注册失败，无权限！')
              } else if (errorData.error === 'resource_limited') {
                console.log('您的App用户注册数量已达上限,请升级至企业版！')
              }
            },
          };
          conn.registerUser(options);
          wx.cloud.callFunction({
            name: 'register',
            data: {
              openid: app.globalData.openid
            },
            success: (res) => {
              this.setData({
                loading: false,
                butwidth: 200
              })
            },
            fail: (err) => {
              console.log('失败', err)
            }
          })
        },
        fail: (err) => {
          console.log('出错', err)
        }
      })
    } else {
      Toast.fail('请升级微信版本')
      return -1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})