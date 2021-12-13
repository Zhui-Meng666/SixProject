// pages/Competition/main/main.js
let app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activate_1 : 0,
        activate_2 : 0,
        genders : '男',
        ins : ['信息学院', '经济学院', '数学学院', '统计学院', '金融学院', '法学院'],
        show_signup_ath : false,
        show_signup_ref : false,
        show_select_ins : false,
        bottom_active : 'game',

        games : [],
        acts : []
    },

    toAct: function (e) {
        var id = '1' //活动id
        wx.navigateTo({
          url: '../../Activity/details/details?id='+id+'&type=0',  //type = 0表示报名
        })
    },

    toCan: function (e) {
        var id = '1' //活动id
        wx.navigateTo({
          url: '../../Activity/details/details?id='+id+'&type=1',  //type = 1表示取消报名
        })
    },

    search_change: function(e) {
        this.setData({
            value : e.detail,
        })
    },
    onSearch1: function(e) {
        var text = this.data.value
    },
    signup_ath: function(e){
        let idx = e.currentTarget.dataset.index 
        let games = this.data.games
        let gameid = games[idx].id
        let game_type = games[idx].type 
        wx.navigateTo({
            url : '../signup/signup?gameid=' + JSON.stringify(gameid) + '&game_type=' + game_type
        })
    },

    signup_ref: function(e){
        let idx = e.currentTarget.dataset.index 
        let games = this.data.games
        let gameid = games[idx].id
        wx.navigateTo({
          url: '../ref_signup/ref_signup?gameid=' + gameid,
        })
    },
    start_game: function(e){
        wx.navigateTo({
          url: '../detail_com/detail_com',
        })
    },
    open_select_ins: function(e){
        this.setData({
            show_select_ins : true
        })
    },
    select_gender(event){
        this.setData({
            checked : event.detail
        })
    },
    select_ins(event){
        const {picker, value, index} = event.detail;
        this.setData({
            ins_selected : value
        })
    },
    // select_proj(event){
    //     const {}
    // },
    close_select_ins: function(e){
        this.setData({
            show_select_ins : false
        })
    },
    close_signup_ath: function(e){
        this.setData({
            show_signup_ath : false
        })
    },
    close_signup_ref: function(e){
        this.setData({
            show_signup_ref : false
        })
    },
    check_ins:function(e) {

    },
    check_name:function(e){

    },
    check_sid:function(e){

    },
    to_home(event){
        wx.redirectTo({
          url: '../../index/index',
        })
    },
    to_game(event){
        wx.redirectTo({
          url: './main',
        })
    },
    to_entertainment(event){
        wx.redirectTo({
          url: '../../Entertainment/main/main',
        })
    },
    to_personal(event){
        wx.redirectTo({
          url: '../../Personal/main/main',
        })
    },
    
    add_act: function(e){
        wx.navigateTo({
          url: '../../Activity/release/release',
        })
    },
    add_com: function(e){
        wx.navigateTo({
          url: '../add_com/add_com',
        })
    },
    res_com: function(e) {
        wx.navigateTo({
          url: '../res_com/res_com',
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
        var openid = app.globalData.openid
        // 所有比赛
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + "match_show/",
            },
            success:(res)=>{
                console.log(res)
                this.setData({
                    games : res.result.data 
                })
            },
            fail:(err)=>{
                console.log(err)
            }
        })

        // 所有活动
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + 'activity_show/',
            },
            success:(res)=>{
                this.setData({
                    acts : res.result.data
                })
            }
        })
        // 已经报名的活动
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + 'activity_have_sign_up_show/',
                data : {
                    openid : openid
                }
            },
            success:(res)=>{
                this.setData({
                    acts_signed : res.result.data 
                })
            }
        })
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