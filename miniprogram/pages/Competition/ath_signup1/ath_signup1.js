// pages/Competition/main/ath_signup1.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    ath_submit: function(e){
        var ins = this.data.ins 
        var name = this.data.name 
        var sid = this.data.sid 
        var gender = this.data.gender
        var gameid = this.data.gameid 
        var list = this.data.list
        if(this.data.game_type != '体教部'){
            var type = this.data.type
            var temp = {
                ins : ins ,
                name : name,
                sid : sid,
                gender : gender,
                type : type 
            }
            list.push(temp)
            this.setData({
                list : list 
            })
            wx.cloud.callFunction({
                name : 'httppost',
                data : {
                    url : app.globalData.baseurl + 'match_second_competitor_sign_up/',
                    data : {
                        student_id : sid,
                        name : name,
                        gender : gender,
                        college : ins,
                        type : type,
                        match_id : gameid 
                    }
                },
                success:(res) =>{  
                }
            })
        }
        else{
            var temp = {
                ins : ins ,
                name : name,
                sid : sid,
                gender : gender,
            }
            list.push(temp)
            this.setData({
                list : list 
            })
            wx.cloud.callFunction({
                name : 'httppost',
                data : {
                    url : app.globalData.baseurl + 'match_first_competitor_sign_up/',
                    data : {
                        student_id : sid,
                        name : name,
                        gender : gender,
                        college : ins,
                        match_id : gameid 
                    }
                },
                success:(res) =>{  
                }
            })
        }
        var list = this.data.list
        wx.redirectTo({
            url: '../signup/signup?list=' + JSON.stringify(list)
        })
    },

    check_ins: function(e) {
        this.setData({
            ins : e.detail
        })
    },
    check_name: function(e) {
        this.setData({
            name : e.detail
        })
    },
    check_sid: function(e) {
        this.setData({
            sid : e.detail
        })
    },
    select_gender: function(e) {
        this.setData({
            gender : e.detail 
        })
    },
    select_type: function(e) {
        this.setData({
            type : e.detail
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var list = JSON.parse(options.list)
        var gameid = options.gameid
        var game_type = options.game_type

        this.setData({
            list : list,
            gameid : gameid,
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