// miniprogram/pages/index/index.js
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bottom_active : 'home',
        msglist : [
            {
                title: "公告：多地首套房贷利率上浮 热。。。",
                img_src : "../../images/Cat.jpeg",
                url : 'https://www.baidu.com'
            },
            { 
                title: "公告：悦如公寓三周年生日。。。",
                img_src : "../../images/Cat.jpeg",
                url : '../Personal/main'
            },
            { 
                title: "公告：你想和一群有志青年一起过生日嘛？",
                img_src : "../../images/Cat.jpeg",
                url : '../Personal/main'
            }
        ],
        videos : [
            {
                name : '123',
                msg : '哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                // video_src : '../../videos/1.mp4',
                video_src : 'https://v.douyin.com/RC8XYgW/'
            },
            {
                name : '456',
                msg : '哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                video_src : '../../videos/2.mp4',
            },
            {
                name : '000',
                msg : '哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                video_src : '../../videos/3.mp4',
            },
            {
                name : '0331',
                msg : '哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                video_src : '../../videos/4.mp4',
            },
        ],
        all_videos : [
            {
                name : '123',
                msg : '哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                video_src : '',
            },
            {
                name : '456',
                msg : '哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                video_src : '',
            },
            {
                name : '000',
                msg : '哈哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                video_src : '',
            },
            {
                name : '0331',
                msg : '哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                video_src : '',
            },
        ],
        bottom_list : [
            {
                name : '主页',
                img_src : '../../images/home-click.png'
            },
            {
                name : '赛事',
                img_src : '../../images/competition-unclick.png'
            },
            {
                name : '娱乐',
                img_src : '../../images/entertainment-unclick.png'
            },
            {
                name : '我的',
                img_src : '../../images/me-unclick.png'
            }
        ]
    },

    getid: function (e) {
    },
    onChange: function (e) {
        this.setData({
            value: e.detail,
        })
    },
    onSearch: function (e) {
        var newlist = []
        var text = this.data.value
        var list = this.data.videos
        var len = list.length
        for (let i = 0; i < len; ++i) {
            if (list[i].name.indexOf(text) != -1) {
                newlist.push(list[i])
            }
        }
        this.setData({
            videos: newlist
        })
    },
    onFocus: function (e) {
        this.setData({
            showcancel: true
        })
    },
    onCancel: function (e) {
        this.setData({
            videos : this.data.all_videos
        })
    },
    to_home(event){
        wx.redirectTo({
          url: '../index/index',
        })
    },
    to_game(event){
        wx.redirectTo({
          url: '../Competition/main/main',
        })
    },
    to_entertainment(event){
        wx.redirectTo({
          url: '../Entertainment/main/main',
        })
    },
    to_personal(event){
        wx.redirectTo({
          url: '../Personal/main/main',
        })
    },
    bottom_click(event) {
        let id = event.detail.index
        console.log(id)
        switch(id){
            case 0:
                wx.navigateTo({
                    url: './index',
                })
                break
            case 1:
                wx.navigateTo({
                    url: '../Competition/main/main',
                })
                break
            case 2:
                wx.navigateTo({
                    url: '../Entertainment/main/main',
                })
                break
            case 3:
                wx.navigateTo({
                    url: '../Personal/main/main',
                })
                break
        }
    },
    video_click : function(e){
        let vid = e.currentTarget.id
        wx.navigateTo({
          url: '../Popular_Sci/video_play/video_play?vid='+vid,
        })
    },
    news_click : function(e){
        let idx = e.currentTarget.dataset.index 
        let url = this.data.msglist[idx].url 
        console.log(url)
        wx.navigateTo({
          url: String(url)
        })
    },

    onChangeBottom : function(event){
        console.log(event.detail)
        this.setData({
            bottom_active : event.detail
        })
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad: function (options) {

    // },

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