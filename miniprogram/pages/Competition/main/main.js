// pages/Competition/main/main.js
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

        
        games : [
            {
                name : '男单锦标赛',
                host : '体教部',
                state : '准备中',
                info : '没有简介。。。。。。。。。。。。。。'
            },
            {
                name : '男单锦标赛',
                host : '羽协',
                state : '准备中',
                info : '没有简介。。。。。。。。。。。。。。'
            },
            {
                name : '女单锦标赛',
                host : '体教部',
                state : '进行中',
                info : '没有简介。。。。。。。。。。。。。。',
                com_info : '23 VS 24',
                field : '场地6',
                time : '15:00 - 15:30'
            },
            {
                name : '混合双打锦标赛',
                host : '体教部',
                state : '已完成',
                info : '没有简介。。。。。。。。。。。。。。',
                res_score_1 : 2,
                res_score_2 : 1,
                com_1 : '信息',
                com_2 : '经济',
                free : ['雒勖博         -30km', 'ABC            -10km']
            },
        ],
        acts : [
            {
                name : '科普知识',
                date : '2021-10-27',
                site : '羽毛球馆',
                sb : 100,
                n_people : 30,
                m_people : 50,
                info : '没有介绍。。。。。。。',
                img_src : '../../../images/Cat.jpeg',
                signed : false
            },
            {
                name : '科普知识',
                date : '2021-10-27',
                site : '羽毛球馆',
                sb : 100,
                n_people : 30,
                m_people : 50,
                info : '没有介绍。。。。。。。',
                img_src : '../../../images/Cat.jpeg',
                signed : true
            }
        ]

    },

    search_change: function(e) {
        this.setData({
            value : e.detail,
        })
    },
    onSearch1: function(e) {
        var text = this.data.value
    },
    signup_ath1: function(e){
        wx.navigateTo({
          url: './ath_signup1',
        })
    },
    signup_ath2: function(e){
        wx.navigateTo({
          url: './ath_signup2',
        })
    },
    signup_ref: function(e){
        wx.navigateTo({
          url: './ref_signup',
        })
    },
    start_game: function(e){
        wx.navigateTo({
          url: '../score/score',
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
    toAct(event){
        // let idx = event.detail.index
        // console.log(idx)
        // let act = this.data.acts[idx];
        // act.signed = !act.signed;
        // let acts = this.data.acts;
        // acts[idx] = act;
        // this.setData({
        //     acts : acts
        // })
        wx.navigateTo({
          url: '../Activity/details/details',
        })
    },
    toCan(event){
        wx.navigateTo({
            url: '../Activity/details/details',
          })
    },
    add_act: function(e){
        wx.navigateTo({
          url: '../Activity/release/release',
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