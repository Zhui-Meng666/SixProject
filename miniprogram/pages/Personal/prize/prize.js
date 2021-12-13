// pages/Personal/prize/prize.js
let app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        prizes : [],
        sb_src : '../../../images/sufecoin.png',
        total_sb : 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var openid = app.globalData.openid 
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url: app.globalData.baseurl + 'user_prize/',
                data : {
                    openid : openid
                }
            },
            success:(res)=>{
                this.setData({
                    prizes : res.result.data 
                })
            },
            fail : (res) => {
                console.log(res)
            }
        })
        let total_sb = 0
        for(let i=0;i<this.data.prizes.length;i++){
            total_sb += this.data.prizes[i].sufe_currency
        }
        this.setData({
            total_sb : total_sb
        })
    },

    onPost: function (event) {

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
        // var openid = app.globalData.openid 
        // wx.cloud.callFunction({
        //     name : 'httprequest',
        //     data : {
        //         url: app.globalData.baseurl + 'user_prize/',
        //         data : {
        //             openid : openid
        //         }
        //     },
        //     success:(res)=>{
        //         this.setData({
        //             prizes : res.data 
        //         })
        //     },
        //     fail : (res) => {
        //         console.log(res)
        //     }
        // })
        // let total_sb = 0
        // for(let i=0;i<this.data.prizes.length;i++){
        //     total_sb += this.data.prizes[i].sufe_currency
        // }
        // this.setData({
        //     total_sb : total_sb
        // })
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