// miniprogram/pages/index/index.js
let app = getApp()
let conn = wx.WebIM.conn

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bottom_active : 'home',
        newslist : [],
        videos : [],
        all_videos : [],
        bottom_list: [{
                name: '主页',
                img_src: '../../images/home-click.png'
            },
            {
                name: '赛事',
                img_src: '../../images/competition-unclick.png'
            },
            {
                name: '娱乐',
                img_src: '../../images/entertainment-unclick.png'
            },
            {
                name: '我的',
                img_src: '../../images/me-unclick.png'
            }
        ]
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
            videos: this.data.all_videos
        })
    },
    to_home(event) {
        wx.redirectTo({
            url: '../index/index',
        })
    },
    to_game(event) {
        wx.redirectTo({
          url: '../Competition/main/main',
        })
    },
    to_entertainment(event) {
        wx.redirectTo({
            url: '../Entertainment/main/main',
        })
    },
    to_personal(event) {
        wx.redirectTo({
            url: '../Personal/main/main',
        })
    },
    bottom_click(event) {
        let id = event.detail.index
        console.log(id)
        switch (id) {
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

    // 点击视频封面跳转
    video_click: function (e) {
        let vid = e.currentTarget.dataset.index 
        // console.log(vid)
        let videos = this.data.videos

        let ids = [videos[vid].id]
        for(let i=0;i<videos.length;i++){
            if(i==vid){
                continue
            }
            else{
                ids.push(videos[i].id)
            }
        }
        // console.log(ids)
        wx.navigateTo({
            url: '../Popular_Sci/video_play/video_play?vids=' + JSON.stringify(ids) 
        })
    },
    news_click: function (e) {
        let idx = e.currentTarget.dataset.index
        let url = this.data.newslist[idx].push_link 
        // console.log(url)
        wx.navigateTo({
            url: url
        })
    },

    onChangeBottom: function (event) {
        console.log(event.detail)
        this.setData({
            bottom_active: event.detail
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
        // 推送
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + 'scientific_push_article/',
            },
            success: (res) => {
                // console.log(res)
                this.setData({
                    msglist : res.result.data 
                })
            },
            fail:(err) => {
                console.log(err)
            }
        })

        // 视频封面
        wx.cloud.callFunction({
            name : 'httprequest',
            data : {
                url : app.globalData.baseurl + 'scientific_video_show/'
            },
            success : (res) => {
                // console.log(res)
                this.setData({
                    videos : res.result.results,
                    all_videos : res.result.results
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