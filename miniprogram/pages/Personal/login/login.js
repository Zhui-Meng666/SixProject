// pages/Personal/login/login.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    gender: '0',
    result1: [],
    result2: [],
    identify: 0,
    loading: false
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

  submit: function (e) {
    this.setData({
      stuid: e.detail.value
    })
  },

  onChange: function (e) {
    this.setData({
      gender: e.detail
    })
  },

  showPopup: function (e) {
    this.setData({
      show: true
    })
  },

  onClose: function (e) {
    this.setData({
      show: false,
      identify:this.data.result1.length+this.data.result2.length
    })
  },

  onChange1: function (e) {
    this.setData({
      result1: e.detail
    })
  },

  onChange2: function (e) {
    this.setData({
      result2: e.detail
    })
  },

  register: function (e) {
    this.setData({
      loading: true
    })
    var submitdata = {
      stuid: this.data.stuid,
      gender: this.data.gender,
      identify: this.data.result1.concat(this.data.result2)
    }
    console.log(submitdata)
    wx.cloud.callFunction({
      name: 'register',
      data: submitdata,
      success: (res) => {
        console.log('成功', res)
        this.setData({
          loading: false
        })
        Toast.success('登录成功')
        wx.redirectTo({
          url: '../main/main',
        })
      },
      fail: (err) => {
        console.log('失败', err)
      }
    })
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