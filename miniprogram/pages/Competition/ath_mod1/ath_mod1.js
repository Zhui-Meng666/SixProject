// pages/Competition/ath_mod1/ath_mod1.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    mod_finished: function(e) {
        // 完成修改，上传并返回
        var list = this.data.list
        var name = this.data.name
        var sid = this.data.sid
        var ins = this.data.ins
        var gender = this.data.gender
        var game_type = this.data.game_type
        if (game_type != '体教部'){
            var type = this.data.type
        }
        for(var i=0;i<list.length;i++){
            if(list[i].sid == sid){
                list[i].name = name
                list[i].ins = ins
                list[i].gender = gender
                if (game_type != '体教部'){
                    list[i].game_type = game_type
                }
                break
            }
        }
        // 体教部比赛
        if (game_type == '体教部'){
            wx.cloud.callFunction({
                name : 'httppost',
                data : {
                    url : app.globalData.baseurl + 'match_first_competitor_sign_up_update/',
                    data : {
                        student_id : sid,
                        name : name,
                        gender : gender,
                        college : ins,
                        match_id : this.data.gameid
                    }
                },
                success:(res) => {
                }
            })
        }

        // 非体教部比赛
        else{
            wx.cloud.callFunction({
                name : 'httppost',
                data : {
                    url : app.globalData.baseurl + 'match_second_competitor_sign_up_update/',
                    data : {
                        student_id : sid,
                        name : name,
                        gender : gender,
                        college : ins,
                        type : type,
                        match_id : this.data.gameid
                    }
                },
                success:(res) => {
                }
            })
        }
        wx.redirectTo({
          url: '../signup/signup?list=' + JSON.stringify(list) 
        })
    },
    nameInput(event){
        this.setData({name : event.detail})
      },
    sidInput(event){
        this.setData({sid : event.detail})
    },
    insInput(e){
        this.setData({ins : e.detail})
    },
    onChange(event){
        this.setData({gender:event.detail})
    },
    onClick(event){
        const {gender} = event.currentTarget.dataset
        this.setData({gender : gender})
    },
    select_type(event){
        this.setData({type : event.detail})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var ath = JSON.parse(options.ath)
        var list = JSON.parse(options.list)
        var gameid = JSON.parse(options.gameid)
        var game_type = options.game_type
        this.setData({
            name : ath.name,
            ins : ath.ins,
            sid : ath.sid,
            gender : ath.gender,
            gameid : gameid,
            list : list,
            game_type : game_type
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