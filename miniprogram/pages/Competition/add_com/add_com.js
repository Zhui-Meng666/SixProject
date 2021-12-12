// pages/Competition/add_com/add_com.js
let app = getApp()
Page({
    data: {
      
    },
    name_input: function(e) {
        this.setData({
          name : e.detail 
        })
    },
    address_input: function(e) {
      this.setData({
        address : e.detail 
      })
    },
    intro_input: function(e) {
      this.setData({
        intro : e.detail 
      })
    },
    type_input: function(e) {
      this.setData({
        type : e.detail 
      })
    },
    start_time: function(e) {
        this.setData({
          start_time : e.detail
        })
    },
    end_time: function(e) {
      this.setData({
          end_time : e.detail
      })
    },
    submit: function(e){
        var name = this.data.name 
        var address = this.data.address
        var intro = this.data.intro
        var type = this.data.type
        var start_time = this.data.start_time
        var end_time = this.data.end_time
        var openid = app.globalData.openid 
        wx.cloud.callFunction({
            name : 'httppost',
            data : {
                url : app.globalData.baseurl + 'match_release/',
                data : {
                    openid : openid,
                    name : name,
                    start_time : start_time,
                    end_time : end_time,
                    address : address,
                    introduction : intro,
                    type : type
                }
            },
            success:(res)=>{
                this.setData({
                  game : res.data 
                })
            },
            fail:(err)=>{
                console.log(err)
            }
        })
        wx.navigateBack({
          delta: 1,
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