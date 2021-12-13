// pages/Competition/detail_com/detail_com.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        single_match : [
            {
                id : '001',
                com1 : '小明',
                com2 : '小红',
                type : '男子单打',
                create_time : '比赛时间',
                referee : '销量',
                totalscore : {
                    score1 : 12,
                    score2 : 13
                },
            }
        ]
    },

    start_game: function(e){
        var subdata = {
            name: '',
            match_id: '', //比赛号
            singleid: '',  //小比赛ID
            college1: '',
            college2: '',
            com1: '',
            com2: ''
        }
        wx.navigateTo({
          url: '../score/score?subdata='+JSON.stringify(subdata),
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