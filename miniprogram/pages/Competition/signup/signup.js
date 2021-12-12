// pages/Entertainment/signup/signup.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        athlete : [
            {
                sid : '2019',
                name : '小明',
                ins : '信息管理与工程学院',
                gender : '男'
            }
        ],
    },

    // 增加运动员
    add_item : function(e){
        var list = JSON.stringify(this.data.athlete)
        var gameid = this.data.gameid
        var game_type = this.data.game_type
        wx.navigateTo({
            url: '../ath_signup1/ath_signup1?list='+list + '&gameid=' + gameid + '&game_type=' + game_type,
        })
    },
    submit : function(e){
        wx.redirectTo({
          url: '../main/main',
        })
    },
    mod : function(e){
        let idx = e.currentTarget.dataset.index;
        let ath = JSON.stringify(this.data.athlete[idx]);
        let gameid = this.data.gameid 
        let game_type = this.data.game_type // 主办方
        var list = JSON.stringify(this.data.athlete)

        wx.navigateTo({
            url: '../ath_mod1/ath_mod1?ath=' + ath + '&list='+list + '&gameid=' + JSON.stringify(gameid) + '&game_type=' + game_type,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        if(options.list){
            var list = JSON.parse(options.list)
            this.setData({
                athlete : list 
            })
        }
        this.setData({
            gameid : options.gameid,
            game_type : options.game_type
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
    onShow: function (options) {
        
        
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