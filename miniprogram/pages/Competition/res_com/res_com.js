// pages/Competition/res_com/res_com.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        res : [
            {
                id : '001',
                com1 : '小明',
                com2 : '小红',
                type : '男子单打',
                create_time : '2021-10-21',
                referee : '销量',
                totalscore : {score1:12, score2:13}
            },
            {
                id : '002',
                com1 : '小明',
                com2 : '小红',
                type : '男子单打',
                create_time : '2021-10-21',
                referee : '销量',
                totalscore : {score1:12, score2:13}
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            matchid : options.matchid
        })
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + 'match_single_result_info_show/',
                data : {
                    match_id : matchid
                }
            },
            success:(res)=>{
                var games = res.result.data
                this.setData({
                    res : games 
                })
            }
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