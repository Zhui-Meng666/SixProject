// pages/Competition/main/ref_signup.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    name_input(event){
        this.setData({name : event.detail})
    },
    sid_input(event){
        this.setData({sid : event.detail})
    },
    tel_input(event){
        this.setData({tel : event.detail})
    },
    ins_input(event){
        this.setData({ins : event.detail})
    },
    role_input(event){
        this.setData({role : event.detail})
    },
    submit: function(e){
        var match_id = this.data.gameid
        wx.cloud.callFunction({
            name : 'httppost',
            data : {
                url : app.globalData.baseurl + "match_referee_sign_up/",
                data : {
                    student_id : this.data.sid,
                    name : this.data.name,
                    mobile_phone : this.data.tel,
                    college : this.data.ins,
                    role : this.data.role,
                    match_id : match_id
                }
            },
            success:(res)=>{
                wx.navigateBack({
                  delta: 1,
                })
            },
            fail: (err)=>{
                console.log(err)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.gameid)
        this.setData({
            gameid : options.gameid
        })
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