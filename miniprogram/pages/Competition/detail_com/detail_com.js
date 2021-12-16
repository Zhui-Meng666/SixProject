// pages/Competition/detail_com/detail_com.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        match: '20211201',
        single_match : [
            {
                id : 1,
                com1 : 'Faker',
                com2 : 'Showmaker',
                type : '男子单打',
                create_time : '比赛时间',
                referee : 'Xiaohu',
                totalscore : {
                    score1 : 0,
                    score2 : 0
                },
            }
        ]
    },

    start_game: function(e){
        var idx = 0 
        // var idx = e.currentTarget.dataset.index 
        var game = this.data.single_match[idx]
        var subdata = {
            name: this.data.name ,
            match_id: this.data.match, //比赛号
            singleid: game.id,  //小比赛ID
            com1: game.com1,
            com2: game.com2,
            college1 : '信息',
            college2 : '经济'
        }
        wx.navigateTo({
          url: '../score/score?subdata='+JSON.stringify(subdata),
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // var data = JSON.parse(options.data)
        this.setData({
            // single_match : data.single_match,
            match_id : 1, 
            name : '求王争霸赛' 
            // single_match : data.single_match,
            // match_id : data.match, 
            // name : options.name 
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