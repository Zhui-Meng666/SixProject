// miniprogram/pages/index/index.js
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        msglist : [
            {
                title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代",
                img_src : "../../images/Cat.jpeg",
                url : 'https://www.baidu.com'
            },
            { 
                title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱",
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
                msg : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                // video_src : '../../videos/1.mp4',
                video_src : 'https://v.douyin.com/RC8XYgW/'
            },
            {
                name : '456',
                msg : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                cover_src : '../../images/home-unclick.png',
                video_src : '../../videos/2.mp4',
            },
            {
                name : '000',
                msg : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                cover_src : '../../images/like.png',
                video_src : '../../videos/3.mp4',
            },
            {
                name : '0331',
                msg : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                cover_src : '../../images/me-click.png',
                video_src : '../../videos/4.mp4',
            },
        ],
        all_videos : [
            {
                name : '123',
                msg : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                cover_src : '../../images/Cat.jpeg',
                video_src : '',
            },
            {
                name : '456',
                msg : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                cover_src : '../../images/home-unclick.png',
                video_src : '',
            },
            {
                name : '000',
                msg : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                cover_src : '../../images/like.png',
                video_src : '',
            },
            {
                name : '0331',
                msg : '哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
                cover_src : '../../images/me-click.png',
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

    bottom_click : function(e) {
        let id = Number(e.currentTarget.id)
        switch(id){
            case 0:
                wx.navigateTo({
                    url: './index.wxml',
                })
                break
            case 1:
                wx.navigateTo({
                    url: '',
                })
                break
            case 2:
                wx.navigateTo({
                    url: '',
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
          url: './video_play/video_play?vid='+vid,
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
    // http: function(e) {
    //     let that = this
    //     wx.cloud.callFunction({
    //         // 要调用的云函数名称
    //         name: 'httprequest',
    //         // 传递给云函数的参数
    //         data: {
    //             url: 'http://www.baidu.com/s',
    //             data: {
    //                 wd: '书包'
    //             }
    //         },
    //         success: res => {
    //             console.log("成功", res)
    //             that.setData({
    //                 openid: res.result.openid
    //             })
    //         },
    //         fail: err => {
    //             console.log("错误", err);
    //         },
    //         complete: () => {
    //             console.log('完成 ');
    //         }
    //     })
    // },

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